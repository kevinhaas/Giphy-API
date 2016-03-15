// Giphy API
// Kevin Haas 2016

// make api corner image a sticky footer in that spot

var apiKey = "dc6zaTOxFJmzC";

var maxResults = "25";

var buttons = ["music", "computers", "food", "fractals", "phish", "guitar", "dreams", "boston terrier", "dogs and cats", "coffee", "venture bros"];

// into fade
$("#topRightDiv, #bottomRightDiv, #searchArea, #buttonDiv, #results, #instructions").hide();
$("#introImg").fadeOut(4000);
$("#topRightDiv, #bottomRightDiv, #searchArea, #buttonDiv, #results, #instructions").delay(3300).fadeIn(3000);

function loadButtons() {
    
    for (var i = 0; i < buttons.length; i++) {
        $("#buttonDiv").append("<div data-search='" + buttons[i] + "' class='button badge'>" + buttons[i]);  
    }
}

// click and enter key funcs
document.onkeyup = function (playerInput) {
    if (playerInput.keyCode == 13) {
        
        var newBtn = $("#searchField").val().trim();
        
        buttons.push(this);
        $("#buttonDiv").append("<div data-search='" + newBtn + "' class='button badge'>" + newBtn);
        $("#searchField").val("");
    }
}

$("#addBtn").on("click", function addBtn() {    
    
    var newBtn = $("#searchField").val().trim();
    
        buttons.push(this);
        $("#buttonDiv").append("<div data-search='" + newBtn + "' class='button badge'>" + newBtn);
        $("#searchField").val("");
        
});

$("#clearBtn").on("click", function clearBtn() { 
    $("#resultDiv").empty(); 
});

$("body").off('click').on("click", ".button", function displayResults() { 
    
    
// allows page to scroll. it's set to hidden at first because the intro gif would show a vertical scroll bar with overflow visible
    $("body").css("overflow", "visible");
    
    var search = $(this).attr("data-search");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=" + maxResults;

    $.ajax({
        url: queryURL, 
        method: 'GET'})
        
     .done(function(response) {
        console.log(response.data);
   
    
        var results = response.data;
        
        
// creation of the results including the rating
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].images.fixed_height.url);
            
            var resultRating = results[i].rating;
            
            var rating = $("<p>").text("Rating: " + resultRating);
            
            var result = $("<img data-still='" + results[i].images.fixed_height_still.url + "' data-anim='" + results[i].images.fixed_height.url + "' class='center-block result'>" + "<p id='rating'>");

            var gifStill = $(result).attr("data-still");
            
            var gifAnim =  $(result).attr("data-anim");
            
            var resultDiv = $("<div class='col-md-4'>")
            
            result.attr("src", gifStill);
            
            resultDiv.append(result);
            
            
            $("#resultDiv").prepend(resultDiv);
            $("#rating").append(rating);
   
// animates the image and stops it on click          
$(document).on("click", ".result", function startStopGif() {

    if ($(this).attr("src") == $(this).data('still') ) {
        $(this).attr("src", $(this).data("anim"));
    }
    else{
        $(this).attr("src", $(this).data("still"));
    }
});
           
    }
            
    });      
});
         
loadButtons();