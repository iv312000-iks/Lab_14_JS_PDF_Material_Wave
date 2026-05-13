"use strict";

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function () {
  const element = document.getElementById("resume");

  const originalWidth = element.style.width;

  const originalTransform = element.style.transform;

  element.style.width = "1200px";
  element.style.transform = "scale(1)";

  const options = {
    margin: 0,

    filename: "resume.pdf",

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,

      useCORS: true,

      scrollX: 0,
      scrollY: 0,
    },

    jsPDF: {
      unit: "px",

      format: [1200, 1700],

      orientation: "portrait",
    },

    pagebreak: {
      mode: ["avoid-all"],
    },
  };

  html2pdf()
    .set(options)
    .from(element)
    .save()
    .then(function () {
      element.style.width = originalWidth;

      element.style.transform = originalTransform;
    });
});

const editableElements = document.querySelectorAll(".editable");

editableElements.forEach(function (element, index) {
  const defaultText = element.innerHTML;

  if (localStorage.getItem("editable-" + index)) {
    element.innerHTML = localStorage.getItem("editable-" + index);
  }

  element.addEventListener("input", function () {
    localStorage.setItem("editable-" + index, element.innerHTML);

    localStorage.setItem("default-" + index, defaultText);
  });
});

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {
  editableElements.forEach(function (element, index) {
    const defaultText = localStorage.getItem("default-" + index);

    if (defaultText) {
      element.innerHTML = defaultText;
    }

    localStorage.removeItem("editable-" + index);
  });
});

const rippleElements = document.querySelectorAll(".ripple");

rippleElements.forEach(function (element) {
  element.addEventListener("click", function (event) {
    const circle = document.createElement("span");

    const diameter = Math.max(element.clientWidth, element.clientHeight);

    const radius = diameter / 2;

    circle.style.width = diameter + "px";

    circle.style.height = diameter + "px";

    circle.style.left = event.clientX - element.offsetLeft - radius + "px";

    circle.style.top = event.clientY - element.offsetTop - radius + "px";

    circle.classList.add("wave");

    const oldRipple = element.querySelector(".wave");

    if (oldRipple) {
      oldRipple.remove();
    }

    element.appendChild(circle);
  });
});
