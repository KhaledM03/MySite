"use client";

import { useEffect } from "react";

// A hello for anyone curious enough to open the developer console.
export default function ConsoleHello() {
  useEffect(() => {
    if (window.__khaledSaidHello) return;
    window.__khaledSaidHello = true;
    console.log(
      "%cHey, fellow engineer 👋%c\nYou opened the console, so you might like the source too:\nhttps://github.com/KhaledM03/MySite\n\nWant to talk? khaledmousa216@gmail.com",
      "font: 600 16px Georgia, serif; color: #b84531;",
      "font: 13px ui-sans-serif, system-ui, sans-serif; color: inherit;",
    );
  }, []);

  return null;
}
