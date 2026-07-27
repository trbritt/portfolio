export const SITE = {
  title: 'trbritt | notes',
  description:
    'Notes on high performance computing, cryptography, numerical methods, and physics.',
  author: 'Tristan Britt',
  /** The portfolio this blog hangs off. */
  portfolio: 'https://tbritt.xyz',
  email: 'hello@tbritt.xyz',
} as const;

export const NAV = [
  { label: 'posts', href: '/' },
  { label: 'tags', href: '/tags/' },
  { label: 'rss', href: '/rss.xml' },
  { label: '../portfolio', href: SITE.portfolio },
] as const;

/** ISO date for <time datetime>, and the terminal-styled date users see. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function displayDate(date: Date): string {
  return date
    .toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    })
    .toUpperCase();
}

/** Rough reading time; 220wpm is a reasonable pace for technical prose. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
