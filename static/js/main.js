const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const newsletter = document.querySelector("[data-newsletter]");
const problemCards = document.querySelectorAll(".problem-card");
const navLinks = document.querySelectorAll(".site-nav a[href]");

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 180);
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

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target
    ) {
      return;
    }

    const targetUrl = new URL(link.href);
    const currentUrl = new URL(window.location.href);
    const isDifferentPage = targetUrl.origin === currentUrl.origin && targetUrl.pathname !== currentUrl.pathname;

    if (!isDifferentPage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    event.preventDefault();
    link.classList.add("is-transitioning");
    document.body.classList.add("is-page-leaving");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 160);
  });
});

function setProblemCardOpen(card, isOpen) {
  const toggle = card.querySelector(".problem-card__toggle");
  const body = card.querySelector(".problem-card__body");

  card.classList.toggle("is-open", isOpen);
  toggle?.setAttribute("aria-expanded", String(isOpen));
  body?.setAttribute("aria-hidden", String(!isOpen));
}

problemCards.forEach((card) => {
  const toggle = card.querySelector(".problem-card__toggle");

  toggle?.addEventListener("click", () => {
    const shouldOpen = !card.classList.contains("is-open");

    problemCards.forEach((otherCard) => {
      setProblemCardOpen(otherCard, false);
    });

    if (shouldOpen) {
      setProblemCardOpen(card, true);
    }
  });
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
