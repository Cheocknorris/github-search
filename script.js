(function() {
    // DO NOT TOUCH
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    // DO NOT TOUCH

    $("button").on("mouseenter", function() {
        $("button").addClass("hover");
        console.log("mouseenter");
    });

    $("button").on("mouseleave", function() {
        $("button").removeClass("hover");
    });

    $("button").on("click", function() {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var userToSearch = $('input[name="user-to-search"]').val();
        var baseUrl = "https://api.github.com";
        var endpoint = "/users/" + userToSearch + "/repos";
        console.log(endpoint);

        $.ajax({
            url: baseUrl + endpoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(response) {
                console.log(response);
                var reposTemplate = Handlebars.templates.repos({
                    //data is the info the html is expecting
                    // response is what we get from the API
                    data: response
                });
                $(".repos-container").html(reposTemplate);
            } // closes success
        }); // closes ajax
    }); // closes event

    $(".repos-container").on("click", ".full-name", function(e) {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var baseUrl = "https://api.github.com";
        // var userToSearch = $('input[name="user-to-search"]').val();
        // console.log(e.target);
        var repo = e.target.innerText;
        console.log("e.target: ", e.target);
        console.log(repo);
        var endpoint = "/repos/" + repo + "/commits";
        $.ajax({
            url: baseUrl + endpoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(response) {
                console.log(response);
                var slicedResponse = response.slice(0, 10);
                var commitsTemplate = Handlebars.templates.commits({
                    //data is the info the html is expecting
                    // response is what we get from the API
                    commits: slicedResponse
                });
                // $(".commits-container").html(commitsTemplate);
                $(e.target)
                    .next()
                    .html(commitsTemplate);
            } // closes success
        });
    }); // closes event
})(); // closes iife`
