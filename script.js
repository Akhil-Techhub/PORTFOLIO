// Chat toggle
function toggleChat() {
  let chat = document.getElementById("chatBox");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

// Typing animation
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

  document.querySelector(".typing").textContent = currentWord.substring(0, j);

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

async function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chatBody");

  let userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";

  // typing message
  addMessage("Typing...", "bot");

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();

    // remove "Typing..."
    chat.lastChild.remove();

    addMessage(data.reply, "bot");

  } catch (error) {
    chat.lastChild.remove();
    addMessage("Server error 😢", "bot");
  }
}
// Example (Node backend needed)
fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{role:"user", content:userText}]
  })
})

// Mobile menu
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}

// Active section highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
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
