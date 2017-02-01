$(document).ready(function(){

    $(".nav li a").on("click", function(event){

            //See if clicked menu object is currently active
            var isActive = $(".nav li a").hasClass('active');

            //Remove all the active classes
            $(".nav li a").removeClass('active');

            //Set this menu object clicked to be active
            $(this).addClass('active');

            //Collapse the navbar on menu option click
            $(".navbar-collapse").collapse('hide');

    });

});
