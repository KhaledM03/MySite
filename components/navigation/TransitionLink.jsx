"use client";

function isModifiedClick(event) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export default function TransitionLink({ transitionLabel, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedClick(event) ||
      props.target === "_blank" ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const destination = new URL(props.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    document.documentElement.dataset.transitioning = "true";
    if (transitionLabel) document.documentElement.dataset.transitionLabel = transitionLabel;
    event.currentTarget.closest(".project-card")?.classList.add("is-transitioning");
  };

  return (
    <a {...props} onClick={handleClick} data-transition-link>
      {children}
    </a>
  );
}
