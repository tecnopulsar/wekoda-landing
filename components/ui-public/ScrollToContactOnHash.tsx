"use client";

import { useEffect } from "react";

function scrollToContactSection(): boolean {
  const contactSection = document.getElementById("contacto");
  if (!contactSection) return false;
  contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function ScrollToContactOnHash() {
  useEffect(() => {
    if (window.location.hash !== "#contacto") return;

    let attempts = 0;
    const tryScroll = () => {
      if (scrollToContactSection() || attempts >= 10) return;
      attempts += 1;
      window.setTimeout(tryScroll, 50);
    };

    tryScroll();
  }, []);

  return null;
}
