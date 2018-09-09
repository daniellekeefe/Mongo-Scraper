var deleteButton;
var notesButton;

$(document).ready(function(){      
    displaySaved(); 
 });


const displaySaved = function() {
    $.ajax({
        type:"GET",
        url:"/display-saved/"
    }).then(function(response) {
        console.log(response);

        const savedArticleResults = $("#savedArticles");
        savedArticleResults.empty();

        for (i = 0; i < response.length; i++) {
            const savedArticle = response[i];

            deleteButton = $("<button>")
                .addClass("deleteButton")
                .text("Delete")
                .attr("id", savedArticle._id);

            notesButton = $("<button>")
                .addClass("notesButton")
                .text("Notes")
                .attr("id", savedArticle._id);

            const title = $("<div>")
                .addClass("title")
                .text(savedArticle.title)
                .append(deleteButton)
                .append(notesButton);

            const link = $("<a>")
                .addClass("link")
                .text(savedArticle.link)
                .attr("href", savedArticle.link)
                .attr("target", "_blank");

            const summary = $("<p>")
                .addClass("summary")
                .text(savedArticle.summary)

            const listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            savedArticleResults.append(listItem);
        }

        $(".deleteButton").on("click", function() {
            var articleId = $(this).attr('id');
            console.log("Article ID: " + articleId);
        
            $.ajax({
                type: "PUT",
                url: "/delete-from-saved/" + articleId,
            }).then(function(response) {
                console.log(JSON.stringify(response));
                displaySaved();
            });
        });
        //$(".deleteButton").off("click");
        
        $(".notesButton").on("click", function() {
            console.log("notesButton clicked")
            $("#results-modal").modal("toggle");
        });

    });
};


