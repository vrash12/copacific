document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = document.querySelectorAll(".site-nav a");

  /* Mobile menu */
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      menuButton.classList.toggle("is-active");
    });
  }

  /* Close mobile menu after clicking a nav link */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("is-open");
      if (menuButton) menuButton.classList.remove("is-active");
    });
  });

  /* Active page indicator */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }
  });
});

/* Compact contact form tabs */
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const formPanels = document.querySelectorAll("[data-form-panel]");

  if (!tabButtons.length || !formPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab-target");

      tabButtons.forEach((tab) => {
        tab.classList.remove("is-active");
      });

      formPanels.forEach((panel) => {
        panel.classList.remove("is-active");
      });

      button.classList.add("is-active");

      const activePanel = document.querySelector(`[data-form-panel="${target}"]`);

      if (activePanel) {
        activePanel.classList.add("is-active");
      }
    });
  });
});

/* =========================
   SERVICE VIDEO SHOWCASE
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const featuredVideo = document.getElementById("featuredServiceVideo");
  const featuredLabel = document.getElementById("featuredVideoLabel");
  const featuredTitle = document.getElementById("featuredVideoTitle");
  const featuredDescription = document.getElementById("featuredVideoDescription");
  const videoOptions = document.querySelectorAll(".service-video-option");

  if (!featuredVideo || !videoOptions.length) return;

  videoOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const videoSrc = button.dataset.videoSrc;
      const videoPoster = button.dataset.videoPoster;
      const videoLabel = button.dataset.videoLabel;
      const videoTitle = button.dataset.videoTitle;
      const videoDescription = button.dataset.videoDescription;

      if (!videoSrc) return;

      videoOptions.forEach((option) => {
        option.classList.remove("is-active");
      });

      button.classList.add("is-active");

      featuredVideo.pause();
      featuredVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4" />`;
      featuredVideo.poster = videoPoster || "";
      featuredVideo.load();

      if (featuredLabel) featuredLabel.textContent = videoLabel || "";
      if (featuredTitle) featuredTitle.textContent = videoTitle || "";
      if (featuredDescription) {
        featuredDescription.textContent = videoDescription || "";
      }
    });
  });
});