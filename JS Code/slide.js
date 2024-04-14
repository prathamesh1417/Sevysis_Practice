
const form = document.querySelector('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const msg = document.getElementById('message');
const number = document.getElementById('number');
const displayError = (inputField, errorMessage) => {

    let errorElement = inputField.parentElement.querySelector('.error-text');
    if (!errorElement) {
     
        errorElement = document.createElement("div");
        errorElement.classList.add("error-text");
        inputField.parentElement.appendChild(errorElement);
    }
  
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    inputField.style.borderColor = "red";
};


const clearErrors = () => {
    document.querySelectorAll('.error-text').forEach(errorText => {
        errorText.textContent = '';
    });
    const inputFields = [fullname, email, subject, msg];
    inputFields.forEach(field => field.style.borderColor = "");
};



const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function sendEmail() {
    clearErrors(); 


    let valid = true;
    if (!fullname.value.trim()) {
        displayError(fullname, "Name is required.");
        valid = false;
    }
    if (!email.value.trim()) {
        displayError(email, "Email is required.");
        valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        displayError(email, "Please enter a valid email address.");
        valid = false;
    }
    if (!number.value.trim()) {
      
        valid = false;
    }
    if (!subject.value.trim()) {
        displayError(subject, "Subject is required.");
        valid = false;
    }
    if (!msg.value.trim()) {
        displayError(msg, "Message is required.");
        valid = false;
    }
   
    if (valid) {
        const bodyMessage = `Name: ${fullname.value} <br> Email: ${email.value}<br> Number: ${number.value}
        <br> Subject: ${subject.value} <br> Message: ${msg.value}`;
        
        
       
        Email.send({
            SecureToken : "4b985981-407c-4986-b5f6-735991b38e12",
            Password: "F5F3E1ACEB858FED658D2FBBF82892D76D36",
            Authentication: true,
            auth: {
                user: 'prathamesh.184054@gmail.com',
                pass: 'F5F3E1ACEB858FED658D2FBBF82892D76D36'
              },
            DMARC: true,
            To: 'prathamesh.184054@gmail.com',
            From: "prathamesh.184054@gmail.com",
            Port: 2525 ,
            secure: true,
            isTransactional: true,
            spam:false,
            ReplyTo: email.value, 
            Subject: subject.value,
            Body: bodyMessage
        })
    }
    };
    
    
  
    document.getElementById('enquiryForm').addEventListener("submit", (e) => {
        e.preventDefault();
        sendEmail();
    
      
        document.getElementById('enquiryForm').reset();
    });

$(document).ready(function() {
  
    var $slider = $(".slider"),
        $slideBGs = $(".slide__bg"),
        diff = 0,
        curSlide = 0,
        numOfSlides = $(".slide").length-1,
        animating = false,
        animTime = 500,
        autoSlideTimeout,
        autoSlideDelay = 6000,
        $pagination = $(".slider-pagi");
    
    function createBullets() {
      for (var i = 0; i < numOfSlides+1; i++) {
        var $li = $("<li class='slider-pagi__elem'></li>");
        $li.addClass("slider-pagi__elem-"+i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    };
    
    createBullets();
    
    function manageControls() {
      $(".slider-control").removeClass("inactive");
      if (!curSlide) $(".slider-control.left").addClass("inactive");
      if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };
    
    function autoSlide() {
      autoSlideTimeout = setTimeout(function() {
        curSlide++;
        if (curSlide > numOfSlides) curSlide = 0;
        changeSlides();
      }, autoSlideDelay);
    };
    
    autoSlide();
    
    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $slider.css("top");
        $(".slide").removeClass("active");
        $(".slide-"+curSlide).addClass("active");
        setTimeout(function() {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      window.clearTimeout(autoSlideTimeout);
      $(".slider-pagi__elem").removeClass("active");
      $(".slider-pagi__elem-"+curSlide).addClass("active");
      $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
      diff = 0;
      autoSlide();
    }
  
    function navigateLeft() {
      if (animating) return;
      if (curSlide > 0) curSlide--;
      changeSlides();
    }
  
    function navigateRight() {
      if (animating) return;
      if (curSlide < numOfSlides) curSlide++;
      changeSlides();
    }
  
    $(document).on("mousedown touchstart", ".slider", function(e) {
      if (animating) return;
      window.clearTimeout(autoSlideTimeout);
      var startX = e.pageX || e.originalEvent.touches[0].pageX,
          winW = $(window).width();
      diff = 0;
      
      $(document).on("mousemove touchmove", function(e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
        $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
      });
    });
    
    $(document).on("mouseup touchend", function(e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slider-control", function() {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slider-pagi__elem", function() {
      curSlide = $(this).data("page");
      changeSlides();
    });
    
  });