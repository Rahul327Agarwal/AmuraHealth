export function hexToRgb(hex) {
  // Remove the hash symbol (#) if present
  hex = hex.replace(/^#/, '');

  // Parse the hex value into its individual components (R, G, B)
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB color as a string
  return `rgb(${r}, ${g}, ${b})`;
}
