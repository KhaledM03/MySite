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
