const setupCountdown = () => {
  const daysEl = document.getElementById("days");
  if (!daysEl) {
    return;
  }

  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const ctaText = document.querySelector(".cta-text");
  const ctaButton = document.querySelector(".cta-button");
  const registerButton = document.querySelector(".play-button");

  const countdownDate = new Date("2026-01-21T10:00:00").getTime();
  const countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      secondsEl.innerText = "00";

      if (ctaText) {
        ctaText.textContent = "Time is Over ⌛";
      }

      if (ctaButton) {
        ctaButton.removeAttribute("href");
      }

      // Disable the register button
      if (registerButton) {
        registerButton.removeAttribute("href");
        registerButton.style.pointerEvents = "none";
        registerButton.style.opacity = "0.5";
        registerButton.style.cursor = "not-allowed";
        const playText = registerButton.querySelector(".play-text");
        if (playText) {
          playText.textContent = "REGISTRATION CLOSED";
        }
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days.toString().padStart(2, "0");
    hoursEl.innerText = hours.toString().padStart(2, "0");
    minutesEl.innerText = minutes.toString().padStart(2, "0");
    secondsEl.innerText = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
};

const setupIntersectionObserver = () => {
  const rulesSection = document.getElementById("rules-section");
  if (!rulesSection) {
    return;
  }

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

const setupSmoothScroll = () => {
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (!anchors.length) {
    return;
  }

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
};

const setupTrueFocus = () => {
  const container = document.getElementById("trueFocusContainer");
  if (!container) {
    return;
  }

  const words = container.querySelectorAll(".focus-word");
  const brackets = container.querySelector(".focus-brackets");
  let currentIndex = 0;
  const animationDuration = 0.5;
  const pauseBetweenAnimations = 1;
  let isManualMode = false;

  if (!words.length) {
    return;
  }

  const updateFocus = (index) => {
    words.forEach((word) => word.classList.remove("active"));

    if (index >= 0 && index < words.length) {
      words[index].classList.add("active");

      if (brackets) {
        const wordRect = words[index].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        brackets.style.left = `${wordRect.left - containerRect.left}px`;
        brackets.style.top = `${wordRect.top - containerRect.top}px`;
        brackets.style.width = `${wordRect.width}px`;
        brackets.style.height = `${wordRect.height}px`;
        brackets.classList.add("active");
      }
    }
  };

  setInterval(() => {
    if (!isManualMode) {
      currentIndex = (currentIndex + 1) % words.length;
      updateFocus(currentIndex);
    }
  }, (animationDuration + pauseBetweenAnimations) * 1000);

  words.forEach((word, index) => {
    word.addEventListener("mouseenter", () => {
      isManualMode = true;
      currentIndex = index;
      updateFocus(index);
    });

    word.addEventListener("mouseleave", () => {
      isManualMode = false;
    });
  });

  updateFocus(0);
};

const setupEncryptedSubtitle = () => {
  const subtitle = document.getElementById("encryptedSubtitle");
  if (!subtitle) {
    return;
  }

  const originalText = subtitle.textContent;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
  let revealedChars = 0;
  const revealDelayMs = 50;

  subtitle.textContent = originalText
    .split("")
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
  subtitle.classList.add("encrypting");

  setTimeout(() => {
    const revealInterval = setInterval(() => {
      if (revealedChars >= originalText.length) {
        clearInterval(revealInterval);
        subtitle.classList.remove("encrypting");
        subtitle.classList.add("revealed");
        return;
      }

      subtitle.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index <= revealedChars) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      revealedChars += 1;
    }, revealDelayMs);
  }, 500);
};

const setupCarousel = () => {
  const track = document.getElementById("carouselTrack");
  const indicatorsContainer = document.getElementById("carouselIndicators");
  const cards = document.querySelectorAll(".carousel-card");

  if (!track || !indicatorsContainer || !cards.length) {
    return;
  }

  const firstCardClone = cards[0].cloneNode(true);
  track.appendChild(firstCardClone);

  let currentIndex = 0;
  const totalCards = cards.length;
  let autoPlayInterval;

  cards.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".carousel-indicator");

  const updateCarousel = (instant = false) => {
    const cardWidth = cards[0].offsetWidth;
    const computedStyle = window.getComputedStyle(track);
    const gap = parseFloat(computedStyle.gap) || 32;
    const offset = -currentIndex * (cardWidth + gap);

    if (instant) {
      track.style.transition = "none";
    }

    track.style.transform = `translateX(${offset}px)`;

    if (instant) {
      track.offsetHeight;
      track.style.transition = "";
    }

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex % totalCards);
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateCarousel();
    resetAutoPlay();
  };

  const nextSlide = () => {
    currentIndex += 1;
    updateCarousel();

    if (currentIndex === totalCards) {
      setTimeout(() => {
        currentIndex = 0;
        updateCarousel(true);
      }, 500);
    }
  };

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      if (!document.hidden) {
        nextSlide();
      }
    }, 4000);
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  };

  window.addEventListener("resize", () => {
    updateCarousel();
  });

  startAutoPlay();
  updateCarousel();
};

const setupTeamSize = () => {
  const teamSizeSelect = document.querySelector('select[name="team_size"]');
  const loginContainer = document.getElementById("login-container");
  const form = document.getElementById("hackathonForm");

  if (!teamSizeSelect || !loginContainer || !form) {
    return;
  }

  teamSizeSelect.addEventListener("change", () => {
    loginContainer.innerHTML = "";
    const teamSize = parseInt(teamSizeSelect.value, 10);

    for (let i = 1; i <= 3; i += 1) {
      const inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group", "input-group--full");

      const input = document.createElement("input");
      input.type = "text";
      input.name = `login_${i}`;
      input.classList.add("login-input");
      input.required = i <= teamSize;

      const label = document.createElement("label");
      label.textContent = `Login Member ${i}`;

      inputGroup.appendChild(input);
      inputGroup.appendChild(label);
      loginContainer.appendChild(inputGroup);

      inputGroup.style.display = i <= teamSize ? "block" : "none";
    }
  });

  form.addEventListener("submit", (event) => {
    const teamSize = parseInt(teamSizeSelect.value, 10);
    const loginInputs = document.querySelectorAll(".login-input");
    const hiddenLogins = document.querySelectorAll("input[type=hidden]");
    let filledInputs = 0;

    loginInputs.forEach((input, index) => {
      if (input.value.trim() !== "") {
        filledInputs += 1;
        hiddenLogins[index].value = input.value.trim();
      }
    });

    if (filledInputs !== teamSize) {
      event.preventDefault();
      alert(`Vous devez entrer ${teamSize} login(s) exactement.`);
    }
  });
};

const setupFormSubmission = () => {
  const form = document.getElementById("hackathonForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  if (!form || !confirmationMessage) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        confirmationMessage.style.display = "block";
        confirmationMessage.innerHTML = "<h3>Registration Successful!</h3>";
        form.reset();

        setTimeout(() => {
          window.location.href = "/home.html";
        }, 7000);
      } else {
        alert("Erreur lors de l'envoi");
      }
    } catch (error) {
      alert("Erreur de connexion");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupCountdown();
  setupIntersectionObserver();
  setupSmoothScroll();
  setupTrueFocus();
  setupEncryptedSubtitle();
  setupCarousel();
  setupTeamSize();
  setupFormSubmission();
});
