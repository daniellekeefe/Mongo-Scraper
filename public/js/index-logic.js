var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("floraSlide");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "block"; 
    setTimeout(carousel, 2000); 
}

$("#scrapeButton").on("click", function () {
    $.ajax({
        type:"GET",
        url:"http://localhost:3030/articles"
    }).then(function(response) {
        console.log(response);

        const articleResults = $("#results");
        articleResults.empty();

        for (i =0; i < response.length; i++) {
            const article = response[i];

            const saveButton = $("<button>")
                .addClass("saveButton")
                .text("Save")
                .attr("id", "buttonId" + `${i + 1}`);

            const title = $("<div>")
                .addClass("title")
                .text(article.title)
                .append(saveButton);

            const link = $("<a>")
                .addClass("link")
                .text(article.link)
                .attr("href", article.link)
                .attr("target", "_blank");

            const listItem = $("<li>")
                .addClass("article")
                .attr("id", "articleId" + `${i + 1}`)
                .append(title, link);

            articleResults.append(listItem);
        }
    });
    hideContainer();
    showScrapeResults();
});

const hideContainer = function() {
    $("#container").hide();

};

const showScrapeResults = function() {
    $("#scrapeResults").show(600);
};

