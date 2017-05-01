$(document).ready(function() {

  if(window.sessionStorage.getItem("token") !== null) {
    $("#logout-trigger").css("display", "inline-block");
    $("#signup-trigger").css("display", "none");
    $("#login-trigger").css("display", "none");
  }

  $('.modal').modal();

  // Materialize configuration
  Materialize.updateTextFields();
  $('.tooltipped').tooltip({delay: 50});

  // Scroll button
  $('.scroll-button').click(function() {
    $(this).css("visibility", "hidden");

    $('html, body').animate({
      scrollTop: $(".articles").offset().top
    }, 1500);

  });

  // Scrolling actions
  $(window).scroll(function() {
    
    let offset, opacity, wScroll;
    wScroll = $(this).scrollTop();

    /*
    * Shows scroll button if page is scrolled to top
    * else hide it
    */
    if(wScroll > 0)
      $('.scroll-button').css("visibility", "hidden");
    else
      $('.scroll-button').css("visibility", "visible");

    // Changes opacity of logo in header
    $('.logo').css({
      transform: `translateY(${(wScroll / 2)}px)`,
      filter: `blur(${wScroll / 60}px)`,
      "-webkit-filter": `blur(${wScroll / 60}px)`,
    });

    // Changes brightness of header
    $('header').css({
      filter: `brightness(${100 - wScroll/9}%)`,
      "-webkit-filter": `brightness(${100 - wScroll/9}%)`,
    });

    //  Words pictures
    if(wScroll > ($('.pics').offset().top - $(window).height() / 1.25)) {
      $('.pics figure').each(function(i) {
        setTimeout(function() {
          $('.pics figure').eq(i).addClass('is-showing');
        }, 150 * (i + 1));
      });
    }

    // Periscope
    if (wScroll > ($('.periscope').offset().top - $(window).height())) {
      opacity = (wScroll - $('.periscope').offset().top + 400) / (wScroll / 8);
      $(".periscope > .content").css({"opacity": opacity});
    }

    // Blog posts
    if (wScroll > ($('.blog-posts').offset().top - $(window).height())) {
      offset = Math.min(0, wScroll - $('.blog-posts').offset().top + $(window).height() - 350);
      opacity = 1 - Math.abs(offset / 300);
      
      $(".post:nth-child(1)").css({
        "transform": `translate(${offset}px, ${(-offset * 0.5)}px)`,
        "opacity": opacity
      });
      
      $(".post:nth-child(2)").css({"opacity": opacity});

      $(".post:nth-child(3)").css({
        "transform": `translate(${(Math.abs(offset))}px, ${(-offset * 0.5)}px)`,
        "opacity": opacity
      });
    }

  });

  // Authorization 
  // Sign up 
  $("#signup-btn").click(function() {

    let username = $("#signup .username").val();
    let email = $("#signup .email").val();
    let password = $("#signup .password").val();
    
    let validationStatus = validateUserDetails(username, email, password);

    if(!validationStatus.message) {
      let user = {
        username: username,
        email: email,
        password: password
      };

      $.post("/api/auth/signup", user, res => {
        Materialize.toast("Sign up successfully", 2500, 'rounded');
        let userData = getDataFromToken(res.token);
        userData.token = res.token;
        window.sessionStorage.setItem('user', JSON.stringify(userData));
        window.location.href = "/chat";
      }).fail(error => {
        setValidationError(error.responseJSON, "signup");
      });
    } else {
      setValidationError(validationStatus, "signup");
    }

  });

  // Log in
  $("#login-btn").click(() => {

    let email = $("#login .email").val();
    let password = $("#login .password").val();

    let validationStatus = validateUserDetails("none", email, password);

    if(!validationStatus.message) {
      let user = {
        email: email,
        password: password
      };
      
      $.post("/api/auth/login", user, res => {
        Materialize.toast("Logged in successfully", 2500, 'rounded');
        let userData = getDataFromToken(res.token);
        userData.token = res.token;
        window.sessionStorage.setItem('user', JSON.stringify(userData));
        window.location.href = "/chat";
      }).fail(error => {
        setValidationError(error.responseJSON, "login");
      });
      
    } else {
      setValidationError(validationStatus, "login");
    }
  });

  // Sign up and Log in cancel button
  $('.cancel').click(() => {
    $("#login").modal('close');
    $("#signup").modal('close');
  });

  // Log out
  $("#logout-trigger").click(() => {
    window.sessionStorage.removeItem('user');
    $.post("/api/auth/logout");
  });

});

// Set validation error to appropriate fields
function setValidationError(error, type) {
  if(error.target === 'username') {
    $("#signup input.username").addClass("invalid");
    $("#signup label.username").attr("data-error", error.message);
  } else if(error.target === 'email') {
    $(`#${type} input.email`).addClass("invalid");
    $(`#${type} label.email`).attr("data-error", error.message);
  } else if(error.target === 'password') {
    $(`#${type} input.password`).addClass("invalid");
    $(`#${type} label.password`).attr("data-error", error.message);
  } else {
    Materialize.toast(error.message || "Unknown error", 2500);
  }
}

// Checking credentials
function validateUserDetails(username, email, password) {

  if(!email || !(/^\w+@\w+\.\w+$/gi.test(email))) {
    return {
      target: "email",
      message: "Email is invalid"
    };
  }

  if(!username || !(/^\w{4,30}$/gi.test(username))) {
    return {
      target: "username",
      message: "Username is invalid"
    };
  }

  if(!password || !(/^\S{6,30}$/gi.test(password))) {
    return {
      error: true,
      target: "password",
      message: "Password is invalid"
    };
  }

  return {message: null};

}

// Retrieves data from JWT
function getDataFromToken(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
