// Facts on the homepage that depend on today's date. They are computed from
// the calendar so the site stays correct without anyone editing it.

export const GRADUATION = {
  year: 2028,
  monthIndex: 4, // May (January is 0)
  label: "May 2028",
};

// From August onward, the next internship season is the following summer.
const NEXT_SEASON_STARTS_MONTH_INDEX = 7;

export function getAvailability(date) {
  const summerYear = date.getMonth() >= NEXT_SEASON_STARTS_MONTH_INDEX
    ? date.getFullYear() + 1
    : date.getFullYear();

  // The summer of graduation and everything after it is full-time territory.
  return summerYear < GRADUATION.year
    ? `Summer ${summerYear} internships`
    : "Full-time engineering roles";
}

export function hasGraduated(date) {
  return date >= new Date(GRADUATION.year, GRADUATION.monthIndex + 1, 1);
}

// Courses in progress, by semester. The homepage shows the current one and
// hides the line between semesters. Add a semester here once registered.
export const SEMESTERS = [
  {
    name: "Fall 2026",
    start: new Date(2026, 7, 15),
    end: new Date(2026, 11, 31),
    courses: ["Digital Design (VHDL on FPGA)", "Network Analysis", "Amplifiers", "College Physics II"],
  },
  {
    name: "Spring 2027",
    start: new Date(2027, 0, 1),
    end: new Date(2027, 4, 31),
    courses: ["Microprocessors", "Communications Electronics", "Data Communications & Network Theory", "Engineering Economics"],
  },
];

export function getCurrentSemester(date) {
  return SEMESTERS.find((semester) => date >= semester.start && date <= semester.end) ?? null;
}
