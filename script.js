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
// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section");
const navLinksScroll = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinksScroll.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
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

// ===== SCROLL REVEAL (sections fade up once) =====
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
// ===== CURSOR GLOW =====
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
    if(glow){
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    }
});
// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    counter.innerText = "0";
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
});
// ===== NAVBAR TOGGLE =====
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            nav.classList.toggle("active");
            toggle.classList.toggle("active");
        });
    }
});
function toggleChat(){
    const chat = document.getElementById("chatbox");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}
function sendMessage(){
    const input = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");
    if(input.value.trim() === "") return;
    // User message
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-msg");
    userMsg.innerText = input.value;
    chatBody.appendChild(userMsg);
    // Bot auto reply
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-msg");
    botMsg.innerText = "Thanks for your message! Maria will contact you soon.";
    
    setTimeout(()=>{
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    },800);
    input.value = "";
}
