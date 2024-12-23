const carousel = document.getElementById("carousel");
const panel = document.querySelector(".carousel-panel");
const prevButton = document.getElementById("carousel-arrow-prev");
const nextButton = document.getElementById("carousel-arrow-next");

nextButton.addEventListener("click", () => {
  var maxScrollLeft = carousel.scrollWidth - carousel.clientWidth + 5;
  var panelWidth = panel.clientWidth;
  console.log("maxScrollLeft: " + maxScrollLeft)
  console.log("carousel.scrollLeft: " + carousel.scrollLeft)
  console.log("panelWidth: " + panelWidth)
  if (maxScrollLeft < carousel.scrollLeft + panelWidth) {
    carousel.scrollLeft -= maxScrollLeft;
  } else {
    carousel.scrollLeft += panelWidth;
  }
});

prevButton.addEventListener("click", () => {
  var maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  var panelWidth = panel.clientWidth;
  console.log("maxScrollLeft: " + maxScrollLeft)
  console.log("carousel.scrollLeft: " + carousel.scrollLeft)
  console.log("panelWidth: " + panelWidth)
  if (0 == carousel.scrollLeft) {
    carousel.scrollLeft += maxScrollLeft;
  } else {
    carousel.scrollLeft -= panelWidth;
  }
});