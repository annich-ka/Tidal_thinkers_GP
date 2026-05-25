const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const newsletter = document.querySelector("[data-newsletter]");
const problemCards = document.querySelectorAll(".problem-card");
const navLinks = document.querySelectorAll(".site-nav a[href]");
const actionScrollSections = document.querySelectorAll("[data-action-scroll]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopHeaderQuery = window.matchMedia("(min-width: 981px)");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value) {
  return value * value * (3 - 2 * value);
}

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 180);

  const heroBottom = hero?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY;
  const headerClearance = header ? header.offsetHeight + 24 : 88;
  const isPastHero = desktopHeaderQuery.matches && heroBottom <= headerClearance;

  header?.classList.toggle("is-past-hero", isPastHero);
}

function resetActionScroll(section) {
  const panels = section.querySelectorAll("[data-action-panel]");

  section.classList.remove("is-ready");
  panels.forEach((panel) => {
    panel.removeAttribute("aria-hidden");
    panel.classList.remove("is-active");
    panel.removeAttribute("style");

    panel.querySelector(".action-scroll__copy")?.removeAttribute("style");
    panel.querySelector(".action-scroll__visual")?.removeAttribute("style");
    panel.querySelector(".action-scroll__visual img")?.removeAttribute("style");
  });
}

function updateActionScroll() {
  actionScrollSections.forEach((section) => {
    const panels = [...section.querySelectorAll("[data-action-panel]")];
    const dots = [...section.querySelectorAll("[data-action-target]")];
    const indexLabel = section.querySelector("[data-action-index]");
    const shouldStack = window.innerWidth <= 980 || reducedMotionQuery.matches;

    if (!panels.length || shouldStack) {
      resetActionScroll(section);
      return;
    }

    section.classList.add("is-ready");

    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const exactIndex = progress * (panels.length - 1);
    const activeIndex = clamp(Math.round(exactIndex), 0, panels.length - 1);

    if (indexLabel) {
      indexLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    }

    panels.forEach((panel, index) => {
      const diff = index - exactIndex;
      const presence = clamp(1 - Math.abs(diff), 0, 1);
      const easedPresence = smoothstep(presence);
      const copyOpacity = clamp(1 - Math.abs(diff) * 1.55, 0, 1);
      const copy = panel.querySelector(".action-scroll__copy");
      const visual = panel.querySelector(".action-scroll__visual");
      const image = panel.querySelector(".action-scroll__visual img");
      const isActive = index === activeIndex;

      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
      panel.style.zIndex = String(10 + Math.round(easedPresence * 10) + index);

      if (copy) {
        copy.style.setProperty("--copy-opacity", copyOpacity.toFixed(3));
        copy.style.setProperty("--copy-y", `${Math.round(diff * 46)}px`);
      }

      if (visual) {
        const hiddenAmount = Math.round((1 - easedPresence) * 100);
        const clipTop = diff >= 0 ? hiddenAmount : 0;
        const clipBottom = diff < 0 ? hiddenAmount : 0;

        visual.style.setProperty("--visual-opacity", presence > 0 ? "1" : "0");
        visual.style.setProperty("--visual-y", `${Math.round(diff * 22)}px`);
        visual.style.setProperty("--clip-top", `${clipTop}%`);
        visual.style.setProperty("--clip-bottom", `${clipBottom}%`);
      }

      if (image) {
        image.style.setProperty("--visual-scale", (1.025 - easedPresence * 0.025).toFixed(3));
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  });
}

function updatePageState() {
  updateHeaderState();
  updateActionScroll();
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

actionScrollSections.forEach((section) => {
  const dots = section.querySelectorAll("[data-action-target]");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const panels = section.querySelectorAll("[data-action-panel]");
      const targetIndex = Number(dot.getAttribute("data-action-target"));

      if (!panels.length || Number.isNaN(targetIndex)) {
        return;
      }

      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 0);
      const targetY = sectionTop + (scrollable * targetIndex) / Math.max(panels.length - 1, 1);

      window.scrollTo({
        top: targetY,
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      });
    });
  });
});

updatePageState();
window.addEventListener("scroll", updatePageState, { passive: true });
window.addEventListener("resize", updatePageState);
reducedMotionQuery.addEventListener("change", updatePageState);
desktopHeaderQuery.addEventListener("change", updatePageState);
