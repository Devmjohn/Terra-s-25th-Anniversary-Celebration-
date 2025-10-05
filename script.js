const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Select elements
const exploreBtn = document.querySelector(".btn-universe");
const characterContainer = document.getElementById("characterContainer");
const character = document.getElementById("character");
const chatBox = document.getElementById("chatBox");
const chatMessage = document.getElementById("chatMessage");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const mobileWarning = document.getElementById("mobileWarning");
const closeWarning = document.getElementById("closeWarning");

const messages = [
  "Hi there! I want to tell you the story of a satellite....not just any satellite, but one that has been watching over our planet for twenty-five years. Her name is TERRA.",
  "THE BEGINNING: In December 1999 Terra was launched from California. She was designed to orbit Earth in a sun-synchronous orbit, always crossing the equator around 10:30 a.m., watching in consistent sunlight.",
  "Back then, Terra's mission was simple but bold: to help us understand Earth like never before. She carried five amazing instruments, each studying a part of Earth's system.",
  "1. MODIS - scans the planet every 1-2 days, monitoring clouds, forests, oceans, and fires.",
  "2. ASTER - takes detailed pictures of mountains, glaciers, and volcanoes.",
  "3. MISR - looks at Earth from nine angles to see how smoke, dust, and clouds affect our skies.",
  "4. CERES - measures sunlight entering and leaving Earth, tracking the energy balance.",
  "5. MOPITT - tracks air pollution, especially carbon monoxide globally.",
  "For 25 years, Terra has been our eye in the sky—tracking wildfires, volcanic eruptions, melting glaciers, and pollution, revealing how changes connect across nations.",
  "Terra's data transformed understanding of Earth, guiding climate reports, policies, and disaster responses. From forecasts to climate models, Terra's impact touches everyone.",
  "Originally built for six years, Terra continued orbiting day after day. By 2025, she completed over 100,000 orbits, traveling billions of kilometers.",
  "After 25 years, Terra symbolizes global scientific collaboration. Her data will guide us for decades, reminding us that protecting Earth starts with understanding it.",
  "THANK YOU! That's the story of Terra!",
];

let msgIndex = 0;

// Function to update navigation buttons state
function updateNavButtons() {
  const counter = document.getElementById("counter");

  prevBtn.disabled = msgIndex === 0;
  nextBtn.disabled = msgIndex === messages.length - 1;
  counter.textContent = `${msgIndex + 1}/${messages.length}`;
}

// Function to show the chat box with current message
function showChat() {
  chatBox.classList.add("show");
  chatMessage.textContent = messages[msgIndex];
  updateNavButtons();
}

// Function to show the next message
function showNextMessage() {
  if (msgIndex < messages.length - 1) {
    msgIndex++;
    chatMessage.textContent = messages[msgIndex];
    updateNavButtons();

    // Scroll to section1 on 4th chat (index 3) and change character image
    if (msgIndex === 3) {
      const section1 = document.getElementById("section1");
      if (section1)
        section1.scrollIntoView({ behavior: "smooth", block: "start" });
      character.src = "buzz_point.png";
      character.classList.add("buzzpoint");
    }

    // Scroll to section2 on 9th chat (index 8) and change character image
    if (msgIndex === 8) {
      const section2 = document.getElementById("section2");
      if (section2)
        section2.scrollIntoView({ behavior: "smooth", block: "start" });
      character.src = "buzz_point.png";
      character.classList.add("buzzpoint");
    }

    if (msgIndex === 12) {
      character.src = "buzz.png";
      character.classList.remove("buzzpoint");
    }

    // Reset to original character when going back
    if (msgIndex < 3 || (msgIndex > 3 && msgIndex < 8)) {
      character.src = "buzz.png";
      character.classList.remove("buzzpoint");
    }

    // Hide character after the last message (Thank you message)
    if (msgIndex === messages.length - 1) {
      setTimeout(() => {
        chatBox.classList.remove("show");
        characterContainer.classList.remove("active");
        setTimeout(() => {
          characterContainer.style.display = "none";
          msgIndex = 0; // Reset for next time
          character.src = "buzz.png"; // Reset image
          character.classList.remove("buzzpoint");
        }, 500);
      }, 3000); // Wait 3 seconds before hiding
    }
  }
}

// Function to show the previous message
function showPrevMessage() {
  if (msgIndex > 0) {
    msgIndex--;
    chatMessage.textContent = messages[msgIndex];
    updateNavButtons();

    // Change character image based on message index
    if (msgIndex >= 3 && msgIndex < 8) {
      character.src = "buzz_point.png";
      character.classList.add("buzzpoint");
    } else if (msgIndex >= 8 && msgIndex < 12) {
      character.src = "buzz_point.png";
      character.classList.add("buzzpoint");
    } else {
      character.src = "buzz.png";
      character.classList.remove("buzzpoint");
    }
  }
}

// Show character and first chat on Explore click
exploreBtn.addEventListener("click", () => {
  // Check if screen is desktop size (1024px or larger)
  if (window.innerWidth > 1024) {
    characterContainer.style.display = "flex";
    setTimeout(() => characterContainer.classList.add("active"), 10);
    showChat();
  } else {
    // Show mobile warning by adding the show class
    mobileWarning.classList.add("show");

    // Auto-hide warning after 4 seconds
    setTimeout(() => {
      mobileWarning.classList.remove("show");
    }, 4000);
  }
});

// Close warning button
closeWarning.addEventListener("click", () => {
  mobileWarning.classList.remove("show");
});

// Next button click
nextBtn.addEventListener("click", showNextMessage);

// Previous button click
prevBtn.addEventListener("click", showPrevMessage);

// Optional: click character toggles chat visibility
character.addEventListener("click", () => chatBox.classList.toggle("show"));
