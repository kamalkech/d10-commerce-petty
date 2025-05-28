/**
 * @file
 * JavaScript for the language switcher dropdown.
 */

(function ($, Drupal) {
  "use strict";

  /**
   * Behavior for language switcher redirect functionality.
   */
  Drupal.behaviors.languageSwitcherRedirect = {
    attach: function (context, settings) {
      var languageSwitcher = $("select#language", context);

      if (languageSwitcher.length > 0) {
        // Use once() to ensure the event handler is only attached once.
        languageSwitcher.on("change", function () {
          var selectedOption = $(this).find("option:selected");

          // Get the URL from the selected option.
          // This assumes the option value contains the language URL.
          var redirectUrl = selectedOption.val();

          // If no direct URL is available in the value, you might need to
          // construct it using the language code.
          if (!redirectUrl.startsWith("http") && !redirectUrl.startsWith("/")) {
            let langCode = selectedOption.val();

            // Use Drupal's path logic to create the proper URL.
            // This requires information from Drupal's settings.
            if (
              settings.path &&
              settings.path.currentPath &&
              settings.path.pathPrefix
            ) {
              // Get current path from Drupal settings.
              var currentPath = settings.path.currentPath;
              if (langCode == "en") {
                // Construct new URL without language prefix because en is a default language.
                redirectUrl = "/" + currentPath;
              } else {
                // Construct new URL with language prefix.
                redirectUrl = "/" + langCode + "/" + currentPath;
              }
            } else {
              // Fallback: just use the language code with current location.
              var currentPathname = window.location.pathname;

              // Remove existing language prefix if present.
              var pathParts = currentPathname.split("/").filter(Boolean);
              if (settings.path && settings.path.currentLanguage) {
                var currentLangCode = settings.path.currentLanguage;
                if (pathParts[0] === currentLangCode) {
                  pathParts.shift();
                }
              }

              // Build new URL with selected language prefix.
              redirectUrl = "/" + langCode + "/" + pathParts.join("/");
            }
          }

          // Redirect to the new URL.
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        });
      }
    },
  };
})(jQuery, Drupal);
