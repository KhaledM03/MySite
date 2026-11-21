"use client";

import { useSyncExternalStore } from "react";
import { getAvailability, GRADUATION, hasGraduated } from "@/lib/status";

// The page is prerendered at build time, so the server snapshot uses the build
// date and the browser swaps in today's date right after it loads. Visitors
// always see facts that match the calendar, even long after the last deploy.
const BUILD_DAY = new Date(process.env.NEXT_PUBLIC_BUILD_TIME ?? Date.now()).toDateString();
const subscribe = () => () => {};

function useToday() {
  const day = useSyncExternalStore(subscribe, () => new Date().toDateString(), () => BUILD_DAY);
  return new Date(day);
}

export function Availability() {
  return getAvailability(useToday());
}

export function GraduationFact() {
  const graduated = hasGraduated(useToday());
  return (
    <>
      <dt>{graduated ? "Graduated" : "Graduating"}</dt>
      <dd>{GRADUATION.label}</dd>
    </>
  );
}
