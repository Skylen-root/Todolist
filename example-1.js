// when a li is clicked in a ul, run this code:
var db = new Firebase("octopus805.firebaseIO.com");
console.log(db);
                      
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed");
});


$("ul").on("click", "span", function(event){
  
  // the 1st "this" refers the span
  $(this).parent().fadeOut(500, function(){
    // the 2nd "this" refers to the li that is fading out
    $(this).remove();
  });
  event.stopPropagation(); //this prevents bubbling
});




$("input[type='text']").keypress(function(event){
  if(event.which === 13){
    var todoText = $(this).val(); // retrieves value from input
    
 
    $(this).val(""); // clears input
    
    // this is a database
    var todoRef = db.push({
      description: todoText
    });
    var key = todoRef = db.push({
      description: todoText
    });
    
    
    // creates new li in ul
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
  }
});





$(".fa-chevron-circle-down").click(function(){
  $("input[type='text']").fadeToggle();
});