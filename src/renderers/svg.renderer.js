
import darkTheme from '../themes/dark.theme.js';

const LAYOUT = {
  width: 960,
  padding: 24,
  cardGap: 16,
  borderRadius: 16,
  cardRadius: 12,
};

// Current active theme
let currentTheme = darkTheme;

/**
 * Get the current theme
 */
export function getTheme() {
  return currentTheme;
}

