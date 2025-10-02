/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

// Set the theme to always light
let setTheme = () => {
  $("html").removeAttr("data-theme");
  $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

import { plotlyLightLayout } from './theme.js';
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Always use light theme for Plotly
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...plotlyLightLayout, ...jsonData.layout.template } : plotlyLightLayout;
        } else {
          jsonData.layout = { template: plotlyLightLayout };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS
  const scssLarge = 925;
  const scssMastheadHeight = 70;

  // Force light theme
  setTheme();

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Init smooth scroll
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });
});

