# NeoSarai — Cyberpunk City Interface

## Overview

**NeoSarai** is a cyberpunk‑themed interactive website that acts as the homepage and tourist interface for a fictional high‑tech city. It blends atmospheric visuals, lore, and interactivity to immerse visitors in a futuristic neon world. From virtual districts and street slang to data dashboards and survival tips, NeoSarai invites users to explore the underbelly of a dystopian metropolis — guided by an AI chatbot tour guide.

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (static, no backend)
- **AI Integration:** ChatGPT / Gemini used for content creation, chatbot logic, and prompt generation
- **AI‑Generated Assets:**

  - **Background Images:** Generated using AI art tools (e.g., Midjourney, Leonardo AI)
  - **Videos:** Looping atmospheric videos created with AI video generators
  - **Music:** AI‑generated ambient cyberpunk soundtrack

- **Fonts:** Google Fonts — Orbitron, Share Tech Mono, Inter
- **Design Style:** Glitch, holographic, and neon aesthetics with a dark theme

---

## Features

- **City Telemetry Dashboard:** Real‑time styled data panels (AQI, grid load, traffic, etc.)
- **District Explorer:** Interactive cards describing key areas like Neon Bazaar, Data Spire, and Cloud Temple
- **Local Slang Index:** Learn NeoSarai’s unique dialect and street talk
- **Street Food Stalls:** Futuristic cuisine listings with humorous descriptions
- **Survival Guide:** Tips on “How Not to Get Zeroed” in the city
- **Secret Access Terminal:** Hidden CSS‑only operator console with easter‑egg content
- **AI Chatbot Tour Guide:** An integrated chatbot that acts as the city’s official tour guide, answering questions, suggesting places, and providing lore snippets

---

## Installation & Usage

1. **Download the Repository:**

   ```bash
   git clone https://github.com/hitmanguy/prompt_craft.git
   ```

2. **Open the Project:**
   Navigate to the folder and open `index.html` in any modern browser.

3. **Run Locally:**
   No server required. The entire site runs client‑side.

   ```bash
   open index.html
   ```

4. **Experience the Interface:**

   - Explore districts and hover over cards to read city lore.
   - Access the **AI Chatbot Tour Guide** via the floating assistant icon in the corner.
   - Click **Operator Access** in the footer to open the hidden terminal.
   - Enjoy the immersive **AI‑generated background video and ambient soundtrack.**

---

## How It Works

- **HTML/CSS:** Handles structure, layout, and theming.
- **JavaScript:** Controls interactivity — dynamic panels, chatbot interface, and ambient media playback.
- **Media Integration:** Background videos and sounds loop seamlessly for immersion.
- **Accessibility:** Fully static build with no backend; optimized for performance and offline use.

---

## Folder Structure

```
neosarai/
├── index.html           # Main HTML file
├── style.css            # Theme and layout styling
├── script.js            # Chatbot and interactivity scripts
├── assets/
│   ├── images/          # AI‑generated background art
│   ├── videos/          # Looping ambient videos
│   └── audio/           # Ambient music & effects
└── README.md            # Documentation
```

---

## How to Customize

- Replace assets in the `/assets` folder with your own AI‑generated visuals or soundscapes.
- Edit the `index.html` text sections (districts, slang, food, etc.) to expand the city’s lore.
- Update chatbot prompts in `script.js` to modify personality or tone.

---

## License & Attribution

This project is for educational and creative demonstration purposes. All AI‑generated assets are either created by the team or sourced from open‑licensed platforms. Please credit **NeoSarai Project Team** if you reuse or remix components.

---

## Credits

**Developed By:** divorce
**Creative Direction:** sahil, saarthak, gnan
**AI Design & Assets:** ChatGPT, Gemini, Midjourney, Leonardo AI
**Music & Sound Design:** AI‑Generated Ambient Cyberpunk Suite
**Inspiration:** _Blade Runner_, _Ghost in the Shell_, _Cyberpunk 2077_

---

## Future Enhancements

- Add voice synthesis to the chatbot for audio tours
- Introduce interactive map navigation
- Implement local save data for visitor badges

---

**"The city remembers everything. You only need to remember who you are." — NeoSarai Public Interface v2.9**
