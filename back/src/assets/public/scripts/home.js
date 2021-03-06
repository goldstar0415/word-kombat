$(document).ready(function() {

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
});
