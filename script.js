// =====================================================
// ===== TYPED TEXT =====================================
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    if (typeof Typed !== "undefined") {

        const typedElement =
            document.querySelector(".typed-text");

        if (typedElement) {

            new Typed(".typed-text", {

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

        }

    }

});


// =====================================================
// ACTIVE NAV LINK ON SCROLL
// =====================================================

const sections =
    document.querySelectorAll("section");

const navLinksScroll =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 100;

        if (
            window.pageYOffset >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinksScroll.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// =====================================================
// SKILL RING ANIMATION
// =====================================================

const RING_CIRCUMFERENCE =
    326.7256;


const skillCards =
    document.querySelectorAll(".skill-card");


if ("IntersectionObserver" in window) {

    const ringObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const card =
                        entry.target;

                    const percent =
                        Number(
                            card.getAttribute(
                                "data-percent"
                            )
                        );

                    const ring =
                        card.querySelector(
                            ".ring-fg"
                        );

                    if (ring) {

                        const offset =
                            RING_CIRCUMFERENCE -
                            (
                                RING_CIRCUMFERENCE *
                                percent /
                                100
                            );

                        ring.style.strokeDashoffset =
                            offset;

                    }

                    ringObserver.unobserve(
                        card
                    );

                });

            },
            {
                threshold: 0.4
            }
        );


    skillCards.forEach(card => {

        ringObserver.observe(card);

    });

}


// =====================================================
// SCROLL REVEAL
// =====================================================

const revealEls =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "in-view"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealEls.forEach(el => {

        revealObserver.observe(el);

    });

}


// =====================================================
// PROJECT CARD 3D TILT
// =====================================================

const tiltCards =
    document.querySelectorAll(
        ".project-card"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) *
                -6;

            const rotateY =
                ((x - centerX) /
                    centerX) *
                6;


            card.style.transform =
                `
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0) rotateX(0) rotateY(0)";

        }
    );

});


// =====================================================
// CURSOR GLOW
// =====================================================

const glow =
    document.querySelector(
        ".cursor-glow"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (!glow) return;

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);


// =====================================================
// COUNTER ANIMATION
// =====================================================

const counters =
    document.querySelectorAll(
        ".counter"
    );


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.getAttribute(
                                "data-target"
                            )
                        );

                    const duration =
                        1300;

                    const startTime =
                        performance.now();


                    const animateCounter =
                        currentTime => {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) /
                                    duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const current =
                                Math.ceil(
                                    target *
                                    eased
                                );


                            counter.innerText =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animateCounter
                                );

                            } else {

                                counter.innerText =
                                    target;

                            }

                        };


                    counter.innerText =
                        "0";


                    requestAnimationFrame(
                        animateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counter.innerText = "0";

        counterObserver.observe(
            counter
        );

    });

}


// =====================================================
// NAVBAR TOGGLE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const toggle =
            document.querySelector(
                ".menu-toggle"
            );

        const nav =
            document.querySelector(
                ".nav-links"
            );


        if (!toggle || !nav) {
            return;
        }


        toggle.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "active"
                );

                toggle.classList.toggle(
                    "active"
                );

            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "active"
                        );

                        toggle.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }
);


// =====================================================
// 🤖 MARIA AI PORTFOLIO CHATBOT
// =====================================================

let chatHistory = [];


// =====================================================
// OPEN / CLOSE CHAT
// =====================================================

function toggleChat() {

    const chat =
        document.getElementById(
            "chatbox"
        );


    if (!chat) {
        return;
    }


    const isOpen =
        chat.style.display === "flex";


    if (isOpen) {

        chat.style.display =
            "none";

    } else {

        chat.style.display =
            "flex";


        setTimeout(() => {

            const input =
                document.getElementById(
                    "userInput"
                );

            if (input) {

                input.focus();

            }

        }, 100);

    }

}


// =====================================================
// SEND CHAT MESSAGE
// =====================================================

async function sendMessage() {

    const input =
        document.getElementById(
            "userInput"
        );

    const chatBody =
        document.getElementById(
            "chatBody"
        );


    if (!input || !chatBody) {
        return;
    }


    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    // Prevent multiple requests
    if (input.disabled) {
        return;
    }


    // =================================================
    // USER MESSAGE
    // =================================================

    const userMsg =
        document.createElement(
            "div"
        );


    userMsg.classList.add(
        "user-msg"
    );


    userMsg.innerText =
        message;


    chatBody.appendChild(
        userMsg
    );


    input.value = "";

    input.disabled = true;


    chatBody.scrollTop =
        chatBody.scrollHeight;


    // =================================================
    // AI THINKING
    // =================================================

    const botMsg =
        document.createElement(
            "div"
        );


    botMsg.classList.add(
        "bot-msg"
    );


    botMsg.innerText =
        "✨ Thinking...";


    chatBody.appendChild(
        botMsg
    );


    chatBody.scrollTop =
        chatBody.scrollHeight;


    // =================================================
    // CALL VERCEL API
    // =================================================

    try {

        const response =
            await fetch(
                "/api/chat",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message:
                            message,

                        history:
                            chatHistory

                    })

                }
            );


        // Check HTTP response
        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "AI RESPONSE:",
            data
        );


        // =================================================
        // CHECK API RESPONSE
        // =================================================

        if (
            !data ||
            !data.success
        ) {

            throw new Error(
                data?.message ||
                "AI service unavailable"
            );

        }


        // =================================================
        // SHOW AI RESPONSE
        // =================================================

        const reply =
            data.reply ||
            "Sorry, I couldn't generate a response.";


        botMsg.innerText =
            reply;


        // =================================================
        // SAVE CHAT HISTORY
        // =================================================

        chatHistory.push({

            role: "user",

            content:
                message

        });


        chatHistory.push({

            role: "assistant",

            content:
                reply

        });


        // Keep last 12 messages
        if (
            chatHistory.length > 12
        ) {

            chatHistory =
                chatHistory.slice(
                    -12
                );

        }


    } catch (error) {

        console.error(
            "CHAT ERROR:",
            error
        );


        botMsg.innerText =
            "⚠️ Sorry, I'm having trouble connecting to the AI right now.";

    }


    // =================================================
    // ENABLE INPUT
    // =================================================

    input.disabled = false;

    input.focus();


    chatBody.scrollTop =
        chatBody.scrollHeight;

}


// =====================================================
// ENTER KEY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById(
                "userInput"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();

                }

            }
        );

    }
);


// =====================================================
// 🌧️ CYAN NEON RAIN
// =====================================================

function createRain() {

    // Respect reduced motion
    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    // Prevent duplicate rain
    if (
        document.querySelector(
            ".rain-layer"
        )
    ) {

        return;

    }


    const rain =
        document.createElement(
            "div"
        );


    rain.className =
        "rain-layer";


    rain.setAttribute(
        "aria-hidden",
        "true"
    );


    // Rain drops
    const dropCount =
        window.innerWidth < 700
            ? 55
            : 105;


    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < dropCount;
        i++
    ) {

        const drop =
            document.createElement(
                "span"
            );


        drop.className =
            "rain-drop";


        const height =
            35 +
            Math.random() * 95;


        const left =
            Math.random() * 110;


        const duration =
            3.2 +
            Math.random() * 4.8;


        const delay =
            -(
                Math.random() *
                duration
            );


        drop.style.left =
            `${left}%`;


        drop.style.setProperty(
            "--drop-height",
            `${height}px`
        );


        drop.style.setProperty(
            "--fall-time",
            `${duration}s`
        );


        drop.style.setProperty(
            "--delay",
            `${delay}s`
        );


        fragment.appendChild(
            drop
        );

    }


    rain.appendChild(
        fragment
    );


    document.body.prepend(
        rain
    );

}


// =====================================================
// START RAIN
// =====================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        createRain
    );

} else {

    createRain();

}


// =====================================================
// HERO PARALLAX
// =====================================================

const hero =
    document.querySelector(
        ".hero"
    );


const aurora =
    document.querySelector(
        ".aurora"
    );


if (
    hero &&
    aurora &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                0.5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                0.5;


            aurora.style.transform =
                `
                translate3d(
                    ${x * 18}px,
                    ${y * 18}px,
                    0
                )
                `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            aurora.style.transform =
                "translate3d(0,0,0)";

        }
    );

}


// =====================================================
// STAGGER ANIMATION
// =====================================================

document.querySelectorAll(
    `
    .skills-container,
    .projects-container,
    .services-container,
    .experience-timeline
    `
).forEach(container => {


    [
        ...container.children
    ].forEach(
        (child, index) => {

            child.style.transitionDelay =
                `
                ${Math.min(
                    index * 70,
                    420
                )}ms
                `;

        }
    );

});


// =====================================================
// PAGE LOADED
// =====================================================

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
