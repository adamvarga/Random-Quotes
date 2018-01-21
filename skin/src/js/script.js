var quotesMachine = {};
quotesMachine = {
    init: function() {
        // Load quotes api and append to dom
        this.getQuotes();
        // Add random background color
        this.randomBackground();
        // Generate maximal 3 new quotes
        this.addQuotes();
    },
    getQuotes: function() {
        var quotesAPI = "https://talaikis.com/api/quotes/random/";
        $.getJSON(quotesAPI, {
            type: "GET",
            dataType: 'json'
        })
                .done(function(data) {
                    $(".quote").html(data.quote);
                    $(".author").html(data.author);
                });
    },
    randomBackground: function() {
        var backgroundColors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
        var randomColors = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        $("body").toggleClass("animate");
        $("body").css("background", randomColors);
    },
    addQuotes: function() {
        var i = 0;
        $this = this;
        $(".new-quote-btn").click(function() {
            $this.getQuotes();
            $this.randomBackground();
            i++;
            if (i == 2) {
                $(this).attr("disabled", true);
                $(this).children("span").text("Tomorrow I'll work for you again");
                $(this).children(".fa-smile-o").show();
            }
        });
    }
};
$(function() {
    quotesMachine.init();
});










