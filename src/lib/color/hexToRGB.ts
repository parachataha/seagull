/**
 * @function hexToRGB - A
 * @param hex - A hex value (eg: #FFFFFF)
 * @returns 
 */

function hexToRGB(hex: string): string {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}
