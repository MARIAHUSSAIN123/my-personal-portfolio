// ===== TYPED TEXT =====
var typed = new Typed(".typed-text", {
  strings: [
    "AI Data Scientist",
    "Full Stack Developer",
    "Freelancer",
    "Content Creator",
    "Graphic Designer"
  ],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1500,
  loop: true
});

// ===== ACTIVE NAV LINK ON SCROLL (Optimized via RequestAnimationFrame) =====
const sections = document.querySelectorAll("section");
const navLinksScroll = document.querySelectorAll(".nav-links a");
let isTicking = false;

window.addEventListener("scroll", () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      let current = "";
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollPos >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinksScroll.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
      });

      isTicking = false;
    });
    isTicking = true;
  }
});

// ===== SKILL RING ANIMATION =====
const RING_CIRCUMFERENCE = 326.7256;
const skillCards = document.querySelectorAll(".skill-card");

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const percent = +card.getAttribute("data-percent");
      const ring = card.querySelector(".ring-fg");
      if (ring) {
        const offset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * percent / 100);
        ring.style.strokeDashoffset = offset;
      }
      ringObserver.unobserve(card);
    }
  });
}, { threshold: 0.4 });

skillCards.forEach(card => ringObserver.observe(card));

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== PROJECT CARD 3D TILT ON HOVER =====
const tiltCards = document.querySelectorAll(".project-card");
tiltCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});

// ===== CURSOR GLOW (Hardware Accelerated via RAF) =====
const glow = document.querySelector(".cursor-glow");
if (glow) {
  let mouseX = 0, mouseY = 0;
  let glowTicking = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!glowTicking) {
      window.requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        glowTicking = false;
      });
      glowTicking = true;
    }
  });
}

// ===== COUNTER ANIMATION (Triggered on Scroll View) =====
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      counter.textContent = "0";

      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.textContent;
        const increment = target / 100;

        if (count < target) {
          counter.textContent = Math.ceil(count + increment);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== NAVBAR TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      toggle.classList.toggle("active");
    });
  }
});

// ===== CHAT FUNCTIONS =====
function toggleChat() {
  const chat = document.getElementById("chatbox");
  if (!chat) return;
  chat.style.display = window.getComputedStyle(chat).display === "none" ? "flex" : "none";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");
  if (!input || !chatBody || input.value.trim() === "") return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("user-msg");
  userMsg.textContent = input.value;
  chatBody.appendChild(userMsg);

  input.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-msg");
    botMsg.textContent = "Thanks for your message! Maria will contact you soon.";
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}
