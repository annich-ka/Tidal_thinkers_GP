const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const newsletter = document.querySelector("[data-newsletter]");

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu?.classList.toggle("is-open", !isOpen);
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuToggle?.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  }
});

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = newsletter.querySelector("[data-form-message]");
  const input = newsletter.querySelector("input[type='email']");

  if (message) {
    message.textContent = "Thanks. We'll keep you posted.";
  }

  if (input instanceof HTMLInputElement) {
    input.value = "";
  }
});

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
