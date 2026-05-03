// 🔥 CANVAS PARTICLES
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();

    p.y += 0.5;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(animate);
}
animate();


// ==========================

// 🔹 CHAT TOGGLE
// ==========================
function toggleChat() {
  let chat = document.getElementById("chatBox");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

// ==========================
// 🔹 TYPING ANIMATION (HERO)
// ==========================
const words = ["Web Developer", "Software Developer", "AI Developer"];
let i = 0, j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  document.querySelector(".typing").textContent =
    currentWord.substring(0, j);

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// ==========================
// 🔹 ADD MESSAGE FUNCTION
// ==========================
function addMessage(text, sender) {
  let chat = document.getElementById("chatBody");

  let msg = document.createElement("p");

  if (sender === "user") {
    msg.innerHTML = `<b>You:</b> ${text}`;
    msg.style.textAlign = "right";
  } else {
    msg.innerHTML = `<b>AI:</b> ${text}`;
    msg.style.textAlign = "left";
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// ==========================
// 🔹 SEND MESSAGE (AI CALL)
// ==========================
async function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chatBody");

  let userText = input.value.trim();
  if (userText === "") return;

  // Show user message
  addMessage(userText, "user");
  input.value = "";

  // Show typing
  let typingMsg = document.createElement("p");
  typingMsg.innerHTML = `<b>AI:</b> Typing...`;
  typingMsg.id = "typingMsg";
  chat.appendChild(typingMsg);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();

    // Remove typing
    document.getElementById("typingMsg").remove();

    // Show AI reply
    addMessage(data.reply, "bot");

  } catch (error) {
    document.getElementById("typingMsg").remove();
    addMessage("Server error 😢", "bot");
    console.error(error);
  }
}

// ==========================
// 🔹 ENTER KEY SUPPORT
// ==========================
document.getElementById("userInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ==========================
// 🔹 MOBILE MENU
// ==========================
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}

// ==========================
// 🔹 ACTIVE NAV LINK
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ================= SCROLL BUTTON =================
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// ================= NAV SCROLL FIX =================
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth"
    });
  });
});

