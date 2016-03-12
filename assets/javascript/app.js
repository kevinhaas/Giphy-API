// Giphy API
// Kevin Haas 2016

//use data attr and .val().trim()

// tooltip for hover that tells you about start/stop with click? or will this be annoying

// intro - make is so everything is dynamically generated and doesn't show up quickly
// when the page loads

// animate buttons on click with css3 dynamically

// make api corner image a sticky footer in that spot

// make buttons into a constructor and push new search to it?

var apiKey = "dc6zaTOxFJmzC";

var buttons = ["music", "computers", "food", "fractals", "phish", "guitar", "dreams", "boston terrier", "dogs and cats", "coffee", "venture bros"];

// into fade
$("#topRightDiv, #bottomRightDiv, #searchArea, #buttonDiv, #results").hide();
$("#introImg").fadeOut(4000);
$("#topRightDiv, #bottomRightDiv, #searchArea, #buttonDiv, #results").delay(3300).fadeIn(3000);

function loadButtons() {
    
    for (var i = 0; i < buttons.length; i++) {
        $("#buttonDiv").append("<div data-search='" + buttons[i] + "' class='button badge'>" + buttons[i]);
        
    }
}

$("#addBtn").on("click", function addBtn() { 
    
    document.onkeyup = function (playerInput) {
        if (playerInput.keyCode == 13) {
         addBtn();
        }
    }
    
    var newBtn = $("#searchField").val().trim();
    
        buttons.push(this);
        $("#buttonDiv").append("<div data-search='" + newBtn + "' class='button badge'>" + newBtn);
        $("#searchField").val("");
        
});

$("#clearBtn").on("click", function clearBtn() { 
    $("#results").empty(); 
});

$("body").off('click').on("click", ".button", function displayResults() { 
    
    
    // allows page to scroll. wasn't visible to begin with because the intro gif would show a vertical scroll bar with overflow visible
    $("body").css("overflow", "visible");
    

    
    var search = $(this).attr("data-search");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey;

    $.ajax({
        url: queryURL, 
        method: 'GET'})
        
     .done(function(response) {
        console.log(response.data);
   
    
        var results = response.data      
             
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].images.fixed_height.url)
            
            var resultDiv = $("<img class='resultDiv'>");
             
            resultDiv.attr("src", response.data[i].images.fixed_height.url);
             
            $("#results").prepend(resultDiv);
        }

    });      
});
         
        


loadButtons();