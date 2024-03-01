$(document).ready(function () {
  // Function to check if an element is in the viewport
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle the visibility check and video play
  function handleVideoVisibility() {
    var aboutVideo = document.getElementById("aboutVideo");

    if (isInViewport(aboutVideo)) {
      aboutVideo.play();
      aboutVideo.muted = true; // Mute the video
    } else {
      aboutVideo.pause();
      aboutVideo.muted = false; // Unmute the video
    }
  }

  // Attach an event listener for scrolling to check video visibility
  $(window).scroll(handleVideoVisibility);

  // Initial check on page load
  handleVideoVisibility();

  $("#searchButton").on("click", function () {
    var searchTerm = $("#searchInput").val().trim().toLowerCase();

    if (searchTerm !== "") {
      var foundElement = findElementContainingText(searchTerm);

      if (foundElement) {
        scrollToElement(foundElement);
      } else {
        alert("Text not found on the page.");
      }
    }
  });

  function findElementContainingText(text) {
    var allElements = $("body *");
    var foundElement = null;

    allElements.each(function () {
      var elementText = $(this).text().trim().toLowerCase();

      if (elementText.includes(text)) {
        foundElement = this;
        return false; // Break out of the loop when the first match is found
      }
    });

    return foundElement;
  }

  function scrollToElement(element) {
    $("html, body").animate(
      {
        scrollTop: $(element).offset().top,
      },
      1000
    ); // You can adjust the animation speed (in milliseconds)
  }
});
