const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.getElementById("mobile-menu");

function setMenuOpen(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
  const label = menuToggle.querySelector(".menu-toggle-label");
  if (label) label.textContent = open ? "Close" : "Menu";
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".section-reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  document.documentElement.classList.add("js-reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
}

const sectionLinks = document.querySelectorAll(".rail-nav a");
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.35 },
  );
  sections.forEach((section) => navigationObserver.observe(section));
}

const careerTabs = [...document.querySelectorAll("[data-career-tab]")];
const careerPanels = [...document.querySelectorAll("[data-career-panel]")];

function selectCareerTab(selectedTab, moveFocus = false) {
  const selectedView = selectedTab.dataset.careerTab;
  careerTabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });
  careerPanels.forEach((panel) => {
    panel.hidden = panel.dataset.careerPanel !== selectedView;
  });
  if (moveFocus) selectedTab.focus();
}

careerTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCareerTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    selectCareerTab(careerTabs[(index + direction + careerTabs.length) % careerTabs.length], true);
  });
});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!window.emailjs) {
      formStatus.textContent = "The message service is unavailable. Please email me directly.";
      formStatus.classList.remove("success");
      return;
    }

    const submitButton = contactForm.querySelector("button[type='submit']");
    if (!submitButton) return;
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    formStatus.textContent = "";

    try {
      await window.emailjs.sendForm(
        "service_jpar6tv",
        "template_kzbp726",
        contactForm,
        { publicKey: "2IxypZ9sK4zCy_Xmf" },
      );
      contactForm.reset();
      formStatus.textContent = "Message sent successfully. I’ll get back to you soon.";
      formStatus.classList.add("success");
    } catch (error) {
      console.error("Contact form submission failed.", error);
      formStatus.textContent = "Something went wrong. Please email me directly instead.";
      formStatus.classList.remove("success");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
}
