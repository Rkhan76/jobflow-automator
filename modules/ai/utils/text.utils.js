export const normalizeText = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
