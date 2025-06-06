/**
 * @file
 * JavaScript for the language switcher dropdown.
 */

(function ($, Drupal) {
  "use strict";

  /**
   * Behavior for language switcher redirect functionality.
   */
  Drupal.behaviors.PettyHeroSlider = {
    attach: function (context, settings) {
      var langCode = settings.path.currentLanguage;

      // Hero Slider
      if ($(".hero-carousel", context).length) {
        $(".hero-carousel", context).slick({
          rtl: langCode == "ar" ? true : false,
          dots: true,
          infinite: true,
          speed: 800,
          fade: true,
          cssEase: "ease-in-out",
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          pauseOnFocus: true,
          arrows: true,
          prevArrow: '<button type="button" class="slick-prev">❮</button>',
          nextArrow: '<button type="button" class="slick-next">❯</button>',
          responsive: [
            {
              breakpoint: 800,
              settings: {
                arrows: true,
                dots: true,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: true,
                dots: true,
                autoplaySpeed: 4000,
              },
            },
          ],
        });

        // Optional: Add fade-in animation for content
        $(".hero-carousel").on(
          "beforeChange",
          function (event, slick, currentSlide, nextSlide) {
            $(".hero-content").addClass("fade-out");
          },
        );

        $(".hero-carousel").on(
          "afterChange",
          function (event, slick, currentSlide) {
            $(".hero-content").removeClass("fade-out").addClass("fade-in");
          },
        );
      }
    },
  };
})(jQuery, Drupal);
