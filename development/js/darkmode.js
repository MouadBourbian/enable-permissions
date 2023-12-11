document.addEventListener("DOMContentLoaded", function () {
  var toggleButtons = document.querySelectorAll("#toggleButton");
  toggleButtons.forEach(function (toggleButton) {
    toggleButton.addEventListener("click", function () {
      toggleDarkMode();
    });
  });

  chrome.storage.sync.get("darkModeEnabled", function (data) {
    var darkModeEnabled = data.darkModeEnabled;
    setDarkMode(darkModeEnabled);
  });
});

function toggleDarkMode() {
  chrome.storage.sync.get("darkModeEnabled", function (data) {
    var darkModeEnabled = data.darkModeEnabled;
    setDarkMode(!darkModeEnabled);
  });
}

function setDarkMode(enabled) {
  chrome.storage.sync.set({ darkModeEnabled: enabled }, function () {
    var bodies = document.querySelectorAll("body");
    var icons = document.querySelectorAll("#darkModeIcon");
    var links = document.querySelectorAll("a");
    var buttons = document.querySelectorAll("button");
    var img = document.querySelectorAll("img");
    var allIcons = document.querySelectorAll("i");
    var github = document.querySelectorAll(".fa-github");
    var root = document.querySelectorAll(":root");

    bodies.forEach(function (body) {
      if (enabled) {
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
      }
    });

    icons.forEach(function (icon) {
      if (enabled) {
        icon.classList = "fas fa-sun";
      } else {
        icon.classList = "fas fa-moon";
      }
    });

    links.forEach(function (link) {
      if (enabled) {
        link.classList.add("dark-mode");
      } else {
        link.classList.remove("dark-mode");
      }
    });

    buttons.forEach(function (button) {
      if (enabled) {
        button.classList.add("dark-mode");
      } else {
        button.classList.remove("dark-mode");
      }
    });

    img.forEach(function (img) {
      if (enabled) {
        img.classList.add("dark-mode");
      } else {
        img.classList.remove("dark-mode");
      }
    });

    allIcons.forEach(function (icon) {
      if (enabled) {
        icon.classList.add("dark-mode");
      } else {
        icon.classList.remove("dark-mode");
      }
    });

    github.forEach(function (github) {
      if (enabled) {
        github.classList.add("dark-mode");
      } else {
        github.classList.remove("dark-mode");
      }
    });

    root.forEach(function (root) {
      if (enabled) {
        root.classList.add("dark-mode");
      } else {
        root.classList.remove("dark-mode");
      }
    });
  });
}
