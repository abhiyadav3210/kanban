// Keyboard navigation helpers
export const handleKeyboardNavigation = (e, onEnter, onEscape) => {
  switch (e.key) {
    case "Enter":
    case " ":
      e.preventDefault();
      onEnter?.();
      break;
    case "Escape":
      e.preventDefault();
      onEscape?.();
      break;
  }
};

// Focus management
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  element.addEventListener("keydown", handleTabKey);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener("keydown", handleTabKey);
  };
};

// ARIA announcements
export const announceToScreenReader = (message, priority = "polite") => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.setAttribute("class", "sr-only");
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};
