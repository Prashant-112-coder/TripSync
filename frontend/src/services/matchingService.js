const normalize = (value = '') => value.toString().trim().toLowerCase();

const toSet = (items = []) => new Set(items.map(normalize).filter(Boolean));

const overlapRatio = (a = [], b = []) => {
  const first = toSet(a);
  const second = toSet(b);
  if (!first.size || !second.size) return 0;
  let shared = 0;
  first.forEach((item) => { if (second.has(item)) shared += 1; });
  return shared / Math.max(first.size, second.size);
};

const parseBudget = (budget = '') => {
  const numbers = budget.toString().replace(/,/g, '').match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  if (!numbers.length) return null;
  return { min: numbers[0], max: numbers.length > 1 ? numbers[1] : numbers[0] };
};

const budgetScore = (a, b) => {
  const first = parseBudget(a);
  const second = parseBudget(b);
  if (!first || !second) return 0.5;
  if (first.max >= second.min && second.max >= first.min) return 1;
  const gap = first.max < second.min ? second.min - first.max : first.min - second.max;
  const base = Math.max(first.max, second.max, 1);
  return Math.max(0, 1 - gap / base);
};

const dateScore = (a, b) => {
  if (!a?.startDate || !a?.endDate || !b?.startDate || !b?.endDate) return 0;
  const start = Math.max(new Date(`${a.startDate}T00:00:00`).getTime(), new Date(`${b.startDate}T00:00:00`).getTime());
  const end = Math.min(new Date(`${a.endDate}T00:00:00`).getTime(), new Date(`${b.endDate}T00:00:00`).getTime());
  if (end < start) return 0;
  const overlapDays = Math.max(1, Math.ceil((end - start) / 86400000) + 1);
  const aDays = Math.max(1, Math.ceil((new Date(`${a.endDate}T00:00:00`).getTime() - new Date(`${a.startDate}T00:00:00`).getTime()) / 86400000) + 1);
  const bDays = Math.max(1, Math.ceil((new Date(`${b.endDate}T00:00:00`).getTime() - new Date(`${b.startDate}T00:00:00`).getTime()) / 86400000) + 1);
  return Math.min(1, overlapDays / Math.min(aDays, bDays));
};

const destinationScore = (a = '', b = '') => {
  const first = normalize(a);
  const second = normalize(b);
  if (!first || !second) return 0;
  if (first === second) return 1;
  const firstParts = first.split(/[ ,]+/).filter(Boolean);
  const secondParts = second.split(/[ ,]+/).filter(Boolean);
  return firstParts.some((part) => part.length > 2 && secondParts.includes(part)) ? 0.7 : 0;
};

export const scoreTripMatch = (trip, candidate) => {
  const destination = destinationScore(trip.destination, candidate.destination);
  const dates = dateScore(trip, candidate);
  const budget = budgetScore(trip.budget, candidate.budget);
  const style = normalize(trip.travelStyle) && normalize(trip.travelStyle) === normalize(candidate.travelStyle) ? 1 : 0;
  const interests = overlapRatio(trip.interests, candidate.interests);
  const activities = overlapRatio(trip.activities, candidate.activities);

  const score = Math.round((destination * 30 + dates * 25 + budget * 15 + style * 10 + interests * 10 + activities * 10));
  const sharedInterests = [...toSet(trip.interests)].filter((item) => toSet(candidate.interests).has(item));
  const sharedActivities = [...toSet(trip.activities)].filter((item) => toSet(candidate.activities).has(item));
  const reasons = [];
  if (destination === 1) reasons.push('Same destination'); else if (destination > 0) reasons.push('Similar destination');
  if (dates === 1) reasons.push('Dates fully overlap'); else if (dates > 0) reasons.push('Dates overlap');
  if (budget === 1) reasons.push('Compatible budget'); else if (budget >= 0.7) reasons.push('Similar budget');
  if (style === 1) reasons.push('Same travel style');
  if (sharedInterests.length) reasons.push(`${sharedInterests.length} shared interest${sharedInterests.length > 1 ? 's' : ''}`);
  if (sharedActivities.length) reasons.push(`${sharedActivities.length} shared activit${sharedActivities.length > 1 ? 'ies' : 'y'}`);

  return { score, reasons, sharedInterests, sharedActivities, breakdown: { destination, dates, budget, style, interests, activities } };
};

export const findMatches = (trip, candidates = []) => candidates
  .filter((candidate) => candidate.id !== trip.id && candidate.status !== 'completed')
  .map((candidate) => ({ ...candidate, match: scoreTripMatch(trip, candidate) }))
  .filter((candidate) => candidate.match.breakdown.destination > 0 && candidate.match.breakdown.dates > 0)
  .sort((a, b) => b.match.score - a.match.score);
