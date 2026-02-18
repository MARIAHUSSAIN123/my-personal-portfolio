// ===== TYPED TEXT =====
var typed = new Typed(".typed-text", {
    strings: [
        "Full Stack Developer",
        "Freelancer",
        "Content Creator",
        "Graphic Designer",
        "AI Developer (To Be)"
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


// ===== SKILL BAR ANIMATION =====
const skillCards = document.querySelectorAll(".skill-card");

const animateSkills = () => {
    skillCards.forEach(card => {
        const progress = card.querySelector(".skill-progress");
        const percent = card.getAttribute("data-percent");

        const cardTop = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (cardTop < screenHeight - 100) {
            progress.style.width = percent + "%";
        }
    });
};

window.addEventListener("scroll", animateSkills);


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
