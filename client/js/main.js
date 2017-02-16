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

  $('#contactForm').formValidation({
    framework: 'bootstrap',
    err: {
      container: '#messages'
    },
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      subject: {
        validators: {
          notEmpty: {
            message: 'The subject is required and cannot be empty'
          }
        }
      },
      firstname: {
        validators: {
          notEmpty: {
            message: 'Your first name is required and cannot be empty'
          }
        }
      },
      lastname: {
        validators: {
          notEmpty: {
            message: 'Your last name is required and cannot be empty'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'The email address is required and cannot be empty'
          },
          emailAddress: {
            message: 'The email address is not valid'
          }
        }
      },
      phone: {
        validators: {
          notEmpty: {
            message: 'Your phone number is required and cannot be empty'
          },
          stringLength: {
            max: 10,
            message: 'Your number should include an area code and be 10 characters long.'
          }
        }
      },
      message: {
        validators: {
          notEmpty: {
            message: 'The message is required and cannot be empty'
          },
          stringLength: {
            max: 500,
            message: 'The message must be less than 500 characters long'
          }
        }
      }
    }

  }).on('success.form.fv', function(e) {

        console.log("Validating form!");
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // Get the FormValidation instance
        var bv = $form.data('formValidation');
        // Use Ajax to submit form data
        $.post($form.attr('action'), $form.serialize(), function(result) {
          console.log(result);
        }, 'json');
  });

});
