document.addEventListener("DOMContentLoaded", () => {
  const bootOverlay = document.getElementById("boot-overlay");
  const bgMusic = document.getElementById("bg-music");
  let hasInteracted = false;

  // --- Boot-up Sequence ---
  setTimeout(() => {
    bootOverlay.style.opacity = "0";
    setTimeout(() => {
      bootOverlay.style.display = "none";
    }, 1000); // Wait for fade-out to finish
  }, 3500); // Match this with your loading animation duration

  // --- Music Player ---
  // Browsers require user interaction to play audio
  document.body.addEventListener(
    "click",
    () => {
      if (!hasInteracted) {
        bgMusic.volume = 0.3; // Set a reasonable volume
        bgMusic.play();
        hasInteracted = true;
      }
    },
    { once: true }
  );

  // --- Theme Switcher ---
  const themeToggle = document.getElementById("theme-toggle");
  const docHtml = document.documentElement;

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      docHtml.classList.remove("dark-mode");
      docHtml.classList.add("light-mode");
    } else {
      docHtml.classList.remove("light-mode");
      docHtml.classList.add("dark-mode");
    }
  });

  // --- Tabbed Content for Survival Guide ---
  window.openTab = function (evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  };

  // --- Secret Access Panel ---
  const secretTrigger = document.getElementById("secret-access-trigger");
  const secretPanel = document.getElementById("secret-panel");
  const closeSecretPanel = document.getElementById("close-secret-panel");

  secretTrigger.addEventListener("click", () => {
    secretPanel.classList.add("active");
  });

  closeSecretPanel.addEventListener("click", () => {
    secretPanel.classList.remove("active");
  });

  // --- Hidden Data Dashboard Feature ---
  // A little "hack" effect that triggers after a delay
  setTimeout(() => {
    const networkStatus = document.getElementById("network-status");
    const networkHack = document.getElementById("network-hack");
    networkStatus.style.display = "none";
    networkHack.style.display = "block";
  }, 15000); // 15 seconds after page load
});
