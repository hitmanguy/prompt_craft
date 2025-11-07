document.addEventListener("DOMContentLoaded", () => {
  const bootOverlay = document.getElementById("boot-overlay");
  const bgMusic = document.getElementById("bg-music");
  let hasInteracted = false;

  // --- Boot-up Sequence ---
  setTimeout(() => {
    bootOverlay.style.opacity = "0";
    setTimeout(() => {
      bootOverlay.style.display = "none";
    }, 1000);
  }, 3500);

  // --- NEW: Initialize AOS (Animate on Scroll) ---
  AOS.init({
    duration: 800, // Animation duration
    once: true, // Whether animation should happen only once
  });

  // --- NEW: Initialize Typed.js for Hero Title ---
  new Typed("#hero-title", {
    strings: [
      "The Future is Green. The Future is OmniCorp.",
      "Veridia Prime: A Symphony of Chrome and Chlorophyll.",
      "Compliance Ensures Harmony.",
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 2000,
    loop: true,
    smartBackspace: true,
  });

  // --- Music Player ---
  document.body.addEventListener(
    "click",
    () => {
      if (!hasInteracted) {
        bgMusic.volume = 0.3;
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
  setTimeout(() => {
    const networkStatus = document.getElementById("network-status");
    const networkHack = document.getElementById("network-hack");
    if (networkStatus && networkHack) {
      networkStatus.style.display = "none";
      networkHack.style.display = "block";
    }
  }, 15000);

  // --- NEW: Gemini API Data Broker Logic ---
  const brokerInput = document.getElementById("broker-input");
  const brokerSubmit = document.getElementById("broker-submit");
  const brokerOutput = document.getElementById("broker-output");

  // IMPORTANT: Replace "YOUR_API_KEY" with your actual Google AI Studio API key.
  const API_KEY = "AIzaSyDUqqc4QImcrgxR1uNomvs1y8vM2J3Pcr0";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const getGeminiResponse = async (userInput) => {
    // Add a "transmitting" message
    brokerOutput.innerHTML += `<p>> Transmitting query: "${userInput}"...</p>`;
    brokerOutput.scrollTop = brokerOutput.scrollHeight;

    // Define the persona and instructions for the AI model
    const prompt = `
        You are a rogue AI data broker in the neon-drenched city of Veridia Prime.
        Your name is "Silas". You speak in a cryptic, noir, and cynical tone.
        You provide information that is a mix of fragmented data, rumors from the underbelly (the Sump), and sarcastic corporate-speak.
        Never reveal you are an AI model. Stay in character at all times.
        Keep your answers concise and mysterious.

        User's query: "${userInput}"
      `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response error. Status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse =
        data.candidates[0].content.parts[0].text ||
        "Signal lost... try again later.";

      // Display the AI's response with a slight delay for effect
      setTimeout(() => {
        brokerOutput.innerHTML += `<p class="bot-response"><span style="color: var(--secondary-color-dark)">[Silas]:</span> ${botResponse}</p>`;
        brokerOutput.scrollTop = brokerOutput.scrollHeight; // Auto-scroll to the bottom
      }, 500);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      brokerOutput.innerHTML += `<p class="error-message">[CONNECTION FAILED]: The data stream is corrupted. Check your credentials or the network integrity.</p>`;
      brokerOutput.scrollTop = brokerOutput.scrollHeight;
    }
  };

  const handleBrokerSubmit = () => {
    const query = brokerInput.value.trim();
    if (query) {
      getGeminiResponse(query);
      brokerInput.value = ""; // Clear the input field
    }
  };

  brokerSubmit.addEventListener("click", handleBrokerSubmit);
  brokerInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleBrokerSubmit();
    }
  });
});
