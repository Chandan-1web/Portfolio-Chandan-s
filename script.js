const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

function updateActiveNavLink() {
  let currentSectionId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", () => {
  updateActiveNavLink();
  revealOnScroll();
});

window.addEventListener("load", () => {
  updateActiveNavLink();
  revealOnScroll();
});
