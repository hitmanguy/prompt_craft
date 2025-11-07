document.addEventListener("DOMContentLoaded", () => {
  // --- Global Variables & State Management ---
  const API_KEY = "AIzaSyDUqqc4QImcrgxR1uNomvs1y8vM2J3Pcr0"; // IMPORTANT: Add your API key
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;
  let storyState = sessionStorage.getItem("storyState") || "0";

  // --- Initial Setup ---
  AOS.init({ duration: 800, once: true });
  setupBootSequence();
  createParticles();
  setupEventListeners();
  updateUIForState(storyState, true);

  // --- Story Progression & UI Control ---
  function updateStoryState(newState) {
    if (parseInt(storyState) >= parseInt(newState)) return;
    storyState = newState;
    sessionStorage.setItem("storyState", storyState);
    updateUIForState(newState);
    updateMissionProgress(newState);
  }

  function updateUIForState(state, isInitial = false) {
    const missionText = document.getElementById("mission-text");
    const sections = {
      districts: document.getElementById("districts"),
      dataBroker: document.getElementById("data-broker"),
      survivalGuide: document.getElementById("survival-guide"),
    };
    const navLinks = {
      districts: document.querySelector('a[href="#districts"]'),
      dataBroker: document.querySelector('a[href="#data-broker"]'),
      survivalGuide: document.querySelector('a[href="#survival-guide"]'),
      secretAccess: document.getElementById("secret-access-trigger"),
    };

    // Enhanced unlock function with smooth animations
    const unlock = (section, navLink) => {
      if (section && section.classList.contains("locked")) {
        const overlay = section.querySelector(".lock-overlay");
        if (overlay) {
          overlay.classList.add("unlocking");
          setTimeout(() => {
            section.classList.remove("locked");
            section.classList.add("unlock-complete");
          }, 800);
        }
      }
      if (navLink) {
        navLink.classList.remove("locked");
        navLink.classList.add("newly-unlocked");
      }
    };

    // Reset highlights
    document
      .querySelectorAll(".next-objective")
      .forEach((el) => el.classList.remove("next-objective"));

    let currentMission = "";
    let highlightTarget;

    switch (state) {
      case "0":
        currentMission =
          "📖 Read the official city lore to begin your investigation";
        highlightTarget = document.getElementById("lore");
        if (!isInitial) setupTypedJs();
        break;
      case "1":
        currentMission = "🏙️ Explore the city districts to uncover the truth";
        unlock(sections.districts, navLinks.districts);
        highlightTarget = sections.districts;
        break;
      case "2":
        currentMission = "💬 Contact the Data Broker for insider information";
        unlock(sections.dataBroker, navLinks.dataBroker);
        highlightTarget = sections.dataBroker;
        break;
      case "3":
        currentMission =
          "🔓 Access the secret panel - the system is vulnerable";
        Object.values(sections).forEach((s) => unlock(s));
        Object.values(navLinks).forEach((l) => unlock(l));
        highlightTarget = navLinks.secretAccess;
        break;
      case "4":
        currentMission = "✅ Truth revealed. The city is yours to explore";
        Object.values(sections).forEach((s) => unlock(s));
        Object.values(navLinks).forEach((l) => unlock(l));
        break;
    }

    // Smooth mission text update
    if (missionText) {
      missionText.style.opacity = 0;
      setTimeout(() => {
        missionText.textContent = currentMission;
        missionText.style.opacity = 1;
      }, 300);
    }

    if (highlightTarget) {
      setTimeout(() => highlightTarget.classList.add("next-objective"), 500);
    }
  }

  function updateMissionProgress(state) {
    const dots = document.querySelectorAll(".progress-dots .dot");
    dots.forEach((dot, index) => {
      if (index <= parseInt(state)) {
        dot.classList.add("active");
      }
    });
  }

  // --- Enhanced Visual Effects ---
  function createParticles() {
    const container = document.getElementById("particle-container");
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      container.appendChild(particle);
    }
  }

  function typeText(element, text, onComplete) {
    let i = 0;
    element.innerHTML = "";

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        if (onComplete) onComplete();
      }
    }, 30);
  }

  // --- Event Listeners & Observers ---
  function setupEventListeners() {
    // Music Player
    document.body.addEventListener(
      "click",
      () => {
        const bgMusic = document.getElementById("bg-music");
        if (bgMusic && !bgMusic.playing) {
          bgMusic.volume = 0.2;
          bgMusic.play().catch(() => {});
        }
      },
      { once: true }
    );

    // Lore Section Observer
    const loreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && storyState === "0") {
          setTimeout(() => updateStoryState("1"), 2000);
          loreObserver.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    const loreSection = document.getElementById("lore");
    if (loreSection) loreObserver.observe(loreSection);

    // District Cards
    document.querySelectorAll(".district-card").forEach((card) => {
      card.addEventListener("click", () => {
        if (parseInt(storyState) >= 1) {
          openDistrictModal(card.dataset.district, card.dataset.image);
        }
      });
    });

    // Modal Close Events
    setupModalCloseEvents();

    // Data Broker
    const brokerSubmit = document.getElementById("broker-submit");
    const brokerInput = document.getElementById("broker-input");

    if (brokerSubmit && brokerInput) {
      brokerSubmit.addEventListener("click", handleBrokerSubmit);
      brokerInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && parseInt(storyState) >= 2) {
          handleBrokerSubmit();
        }
      });
    }

    // Secret Panel
    const secretTrigger = document.getElementById("secret-access-trigger");
    if (secretTrigger) {
      secretTrigger.addEventListener("click", () => {
        if (parseInt(storyState) >= 3) openSecretPanel();
      });
    }

    // Food Stalls
    document
      .querySelectorAll(".food-stall-card.interactive")
      .forEach((card) => {
        card.addEventListener("click", () => {
          if (parseInt(storyState) >= 3) {
            openFoodModal(card.dataset.stall);
          }
        });
      });
  }

  function setupModalCloseEvents() {
    // District Modal Close
    const modalClose = document.getElementById("modal-close");
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        document.getElementById("district-modal").style.display = "none";
        if (storyState === "1") updateStoryState("2");
      });
    }

    // Food Modal Close
    const foodModalClose = document.getElementById("food-modal-close");
    if (foodModalClose) {
      foodModalClose.addEventListener("click", () => {
        document.getElementById("food-modal").style.display = "none";
      });
    }

    // Secret Panel Close
    const closeSecretPanel = document.getElementById("close-secret-panel");
    if (closeSecretPanel) {
      closeSecretPanel.addEventListener("click", () => {
        document.getElementById("secret-panel").classList.remove("active");
      });
    }
  }

  // --- AI-Powered Features ---
  async function openDistrictModal(districtName, districtImage) {
    const modal = document.getElementById("district-modal");
    const title = document.getElementById("modal-title");
    const image = document.getElementById("modal-image");
    const aiContent = document.getElementById("modal-ai-content");
    const placeholder = document.querySelector(".image-placeholder");

    // Setup modal
    title.textContent = districtName;
    title.dataset.text = districtName;
    aiContent.innerHTML = `<p class="loading-text">🔍 Scanning district data... Decrypting files...</p>`;
    modal.style.display = "flex";

    // Show loading, then image
    placeholder.style.display = "flex";
    image.style.display = "none";

    setTimeout(() => {
      image.src = districtImage || "path/to/your/placeholder-image.jpg";
      placeholder.style.display = "none";
      image.style.display = "block";
      image.classList.add("fade-in");
    }, 2000);

    // AI API Call for district information
    const prompt = `You are a cynical hacker in Veridia Prime. Give a short, atmospheric description of "${districtName}" and current status. Include 3-4 bullet points about Security Level, Contraband Flow, Corporate Influence, etc. Keep it under 150 words total. Make it gritty and revealing.`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) throw new Error("Connection failed");

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;

      setTimeout(() => {
        aiContent.innerHTML = `<div class="district-report">${aiText.replace(
          /\n/g,
          "<br>"
        )}</div>`;
      }, 1000);
    } catch (error) {
      aiContent.innerHTML = `<p class="error-message">⚠️ Signal corrupted. OmniCorp is jamming transmissions.</p>`;
    }
  }

  async function handleBrokerSubmit() {
    const brokerInput = document.getElementById("broker-input");
    const brokerOutput = document.getElementById("broker-output");
    const query = brokerInput.value.trim();

    if (!query) return;

    brokerOutput.innerHTML += `<p class="user-query">> ${query}</p>`;
    brokerInput.value = "";

    const prompt = `You are Silas, a rogue data broker in Veridia Prime. Respond to: "${query}". Be cryptic, cynical, and street-smart. Keep responses under 80 words. Never break character.`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) throw new Error("Connection failed");

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;

      setTimeout(() => {
        brokerOutput.innerHTML += `<p class="silas-response"><span class="silas-name">[Silas]:</span> ${botResponse}</p>`;
        brokerOutput.scrollTop = brokerOutput.scrollHeight;
      }, 800);

      if (storyState === "2") updateStoryState("3");
    } catch (error) {
      brokerOutput.innerHTML += `<p class="error-message">⚠️ Connection lost. Try again.</p>`;
      brokerOutput.scrollTop = brokerOutput.scrollHeight;
    }
  }

  async function openSecretPanel() {
    const panel = document.getElementById("secret-panel");
    const revelation = document.getElementById("final-revelation");

    panel.classList.add("active");

    const prompt = `You are a dying AI consciousness. Reveal the final truth about Project Chimera in Veridia Prime in exactly 2-3 short, haunting sentences. End with "Connection terminated." Make it chilling but brief.`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) throw new Error("Signal corrupted");

      const data = await response.json();
      const truth = data.candidates[0].content.parts[0].text;

      setTimeout(() => {
        typeText(revelation, `> ${truth}`, () => {
          setTimeout(() => {
            revelation.innerHTML += `<br><span class="system-message">// GHOST SIGNAL TERMINATED //</span>`;
          }, 1000);
        });
      }, 1500);
    } catch (error) {
      revelation.innerHTML = `<p class="error-message">⚠️ Memory core corrupted...</p>`;
    } finally {
      if (storyState === "3") updateStoryState("4");
    }
  }

  async function openFoodModal(stallName) {
    const modal = document.getElementById("food-modal");
    const title = document.getElementById("food-modal-title");
    const output = document.getElementById("food-broker-output");
    const avatar = document.getElementById("vendor-avatar");

    title.textContent = stallName;
    modal.style.display = "flex";
    output.innerHTML = "";

    // Set vendor avatar
    avatar.textContent = stallName.includes("Noodle") ? "🍜" : "🍄";

    const prompt = `You are a food vendor in cyberpunk Veridia Prime running "${stallName}". ${
      stallName.includes("Noodle")
        ? "Be tired and jaded."
        : "Be eccentric and speak in riddles."
    } Give a brief greeting (20 words max).`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      const data = await response.json();
      const greeting = data.candidates[0].content.parts[0].text;

      output.innerHTML = `<p class="vendor-message"><span class="vendor-name">[${stallName}]:</span> ${greeting}</p>`;
    } catch (error) {
      output.innerHTML = `<p class="error-message">Vendor seems busy...</p>`;
    }

    setupFoodChat(stallName);
  }

  function setupFoodChat(stallName) {
    const foodSubmit = document.getElementById("food-broker-submit");
    const foodInput = document.getElementById("food-broker-input");
    const output = document.getElementById("food-broker-output");

    // Remove previous listeners
    const newSubmit = foodSubmit.cloneNode(true);
    foodSubmit.parentNode.replaceChild(newSubmit, foodSubmit);

    newSubmit.onclick = async () => {
      const userInput = foodInput.value.trim();
      if (!userInput) return;

      output.innerHTML += `<p class="user-message">> ${userInput}</p>`;
      foodInput.value = "";

      const chatPrompt = `Continue as the ${stallName} vendor. Respond to: "${userInput}". Stay in character. Keep under 30 words.`;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: chatPrompt }] }],
          }),
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;

        setTimeout(() => {
          output.innerHTML += `<p class="vendor-message"><span class="vendor-name">[${stallName}]:</span> ${reply}</p>`;
          output.scrollTop = output.scrollHeight;
        }, 600);
      } catch (error) {
        output.innerHTML += `<p class="error-message">*static*</p>`;
      }
    };

    // Enter key support
    foodInput.onkeyup = (e) => {
      if (e.key === "Enter") newSubmit.click();
    };
  }

  // --- Initialization Functions ---
  function setupBootSequence() {
    const bootOverlay = document.getElementById("boot-overlay");
    setTimeout(() => {
      bootOverlay.style.opacity = "0";
      setTimeout(() => {
        bootOverlay.style.display = "none";
      }, 1000);
    }, 3500);
  }

  function setupTypedJs() {
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
  }

  // Initialize typed.js on load
  setupTypedJs();

  // --- Existing Features ---
  // Tabbed Content for Survival Guide
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

  // Reset story on reload
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("storyState");
  });
});
