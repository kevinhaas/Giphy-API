// Giphy API
// Kevin Haas 2016

//use data attr and .val().trim()

// tooltip for hover that tells you about start/stop with click? or will this be annoying

// intro - make is so everything is dynamically generated and doesn't show up quickly
// when the page loads

// animate buttons on click with css3 dynamically

// make buttons fade in on add. can probably use jQ to set style display:none and then fade in?

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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey;

    $.ajax({
        url: queryURL, 
        method: 'GET'})
        
     .done(function(response) {
        console.log(response.data);
   
    
        var results = response.data;
           
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].images.fixed_height.url);
            
            var result = $("<img data-still='" + results[i].images.fixed_height_still.url + "' data-anim='" + results[i].images.fixed_height.url + "' class='result'>");
            
            var gifStill = $(result).attr("data-still");
            
            var gifAnim =  $(result).attr("data-anim");
            
            result.attr("src", gifStill);
            
            $("#resultDiv").prepend(result);            
           
            
$("body").off('click').on("click", ".result", function startStopGif() {

    if ($(this).attr("src") == $(this).data('still') ) {
        $(this).attr('src', $(this).data('anim'));
    }
    else{
        $(this).attr('src', $(this).data('still'));
    }
        
    
});
            }
            
    });      
});
         
        


loadButtons();

// make the animated/still into a variable that changes onclick