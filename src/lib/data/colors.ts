const basicColors = [
  { name: "foreground", cssVar: "var(--foreground)" },
  { name: "accent", cssVar: "var(--accent)" },
  { name: "muted", cssVar: "var(--muted)" },
];

const colors = [
  // Reds
  [
    { name: "light-red", cssVar: "var(--light-red)" },
    { name: "red", cssVar: "var(--red)" },
    { name: "dark-red", cssVar: "var(--dark-red)" },
  ],

  // Oranges
  [
    { name: "light-orange", cssVar: "var(--light-orange)" },
    { name: "orange", cssVar: "var(--orange)" },
    { name: "dark-orange", cssVar: "var(--dark-orange)" },
  ],

  // Yellows
  [
    { name: "light-yellow", cssVar: "var(--light-yellow)" },
    { name: "yellow", cssVar: "var(--yellow)" },
    { name: "dark-yellow", cssVar: "var(--dark-yellow)" },
  ],

  // Greens
  [
    { name: "light-green", cssVar: "var(--light-green)" },
    { name: "green", cssVar: "var(--green)" },
    { name: "dark-green", cssVar: "var(--dark-green)" },
  ],

  // Teals
  [
    { name: "light-teal", cssVar: "var(--light-teal)" },
    { name: "teal", cssVar: "var(--teal)" },
    { name: "dark-teal", cssVar: "var(--dark-teal)" },
  ],

  // Blues
  [
    { name: "light-blue", cssVar: "var(--light-blue)" },
    { name: "blue", cssVar: "var(--blue)" },
    { name: "dark-blue", cssVar: "var(--dark-blue)" },
  ],

  // Indigos
  [
    { name: "light-indigo", cssVar: "var(--light-indigo)" },
    { name: "indigo", cssVar: "var(--indigo)" },
    { name: "dark-indigo", cssVar: "var(--dark-indigo)" },
  ],

  // Purples
  [
    { name: "light-purple", cssVar: "var(--light-purple)" },
    { name: "purple", cssVar: "var(--purple)" },
    { name: "dark-purple", cssVar: "var(--dark-purple)" },
  ],

  // Pinks
  [
    { name: "light-pink", cssVar: "var(--light-pink)" },
    { name: "pink", cssVar: "var(--pink)" },
    { name: "dark-pink", cssVar: "var(--dark-pink)" },
  ],

  // Browns
  [
    { name: "light-brown", cssVar: "var(--light-brown)" },
    { name: "brown", cssVar: "var(--brown)" },
    { name: "dark-brown", cssVar: "var(--dark-brown)" },
  ],

  // Grays
  [
    { name: "light-gray", cssVar: "var(--light-gray)" },
    { name: "gray", cssVar: "var(--gray)" },
    { name: "dark-gray", cssVar: "var(--dark-gray)" },
  ],
] as const;

export type ColorName = typeof colors[number][number]["name"] | typeof basicColors[number]["name"];
export { colors, basicColors };
