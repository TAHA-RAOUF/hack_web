// Countdown Timer Section
const setupCountdown = () => {
  const countdownDate = new Date("2025-02-19T10:00:00").getTime();
  const countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";

      document.querySelector(".cta-text").innerHTML = "Time is Over ⌛";

      document.querySelector(".cta-button").removeAttribute("href");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
};

// Animation for Rules
const setupIntersectionObserver = () => {
  const rulesSection = document.getElementById("rules-section");

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        rulesSection.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.5,
  });

  observer.observe(rulesSection);
};

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  setupCountdown();
  setupIntersectionObserver();
});

// Gestion team size

document.addEventListener("DOMContentLoaded", function () {
    const teamSizeSelect = document.querySelector('select[name="team_size"]');
    const loginContainer = document.getElementById("login-container");
    const form = document.querySelector("form");

    teamSizeSelect.addEventListener("change", function () {
        loginContainer.innerHTML = "";
        const teamSize = parseInt(teamSizeSelect.value, 10);

        for (let i = 1; i <= 3; i++) {
            const inputGroup = document.createElement("div");
            inputGroup.classList.add("input-group");

            const input = document.createElement("input");
            input.type = "text";
            input.name = `login_${i}`;
            input.classList.add("login-input");
            input.required = i <= teamSize;

            const label = document.createElement("label");
            label.textContent = `Login Member ${i}`;

            const glowLine = document.createElement("div");
            glowLine.classList.add("glow-line");

            inputGroup.appendChild(input);
            inputGroup.appendChild(label);
            inputGroup.appendChild(glowLine);
            loginContainer.appendChild(inputGroup);

            if (i <= teamSize) {
                inputGroup.style.display = "block";
            } else {
                inputGroup.style.display = "none";
            }
        }
    });

    form.addEventListener("submit", function (event) {
        const teamSize = parseInt(teamSizeSelect.value, 10);
        const loginInputs = document.querySelectorAll(".login-input");
        const hiddenLogins = document.querySelectorAll("input[type=hidden]");
        let filledInputs = 0;

        loginInputs.forEach((input, index) => {
            if (input.value.trim() !== "") {
                filledInputs++;
                hiddenLogins[index].value = input.value.trim();
            }
        });

        if (filledInputs !== teamSize) {
            event.preventDefault();
            alert(`Vous devez entrer ${teamSize} login(s) exactement.`);
        }
    });
});


//particles js ::::
particlesJS("particles-js", {
  particles: {
    number: { value: 90 },
    color: { value: "#00ff88" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 2 },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
    },
  },
});
