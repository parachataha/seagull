
const colors = [
  { name: "red", cssVar: "var(--red)" },
  { name: "light-red", cssVar: "var(--light-red)" },
  { name: "dark-red", cssVar: "var(--dark-red)" },

  { name: "orange", cssVar: "var(--orange)" },
  { name: "light-orange", cssVar: "var(--light-orange)" },
  { name: "dark-orange", cssVar: "var(--dark-orange)" },

  { name: "yellow", cssVar: "var(--yellow)" },
  { name: "light-yellow", cssVar: "var(--light-yellow)" },
  { name: "dark-yellow", cssVar: "var(--dark-yellow)" },

  { name: "green", cssVar: "var(--green)" },
  { name: "light-green", cssVar: "var(--light-green)" },
  { name: "dark-green", cssVar: "var(--dark-green)" },

  { name: "teal", cssVar: "var(--teal)" },
  { name: "light-teal", cssVar: "var(--light-teal)" },
  { name: "dark-teal", cssVar: "var(--dark-teal)" },

  { name: "blue", cssVar: "var(--blue)" },
  { name: "light-blue", cssVar: "var(--light-blue)" },
  { name: "dark-blue", cssVar: "var(--dark-blue)" },

  { name: "indigo", cssVar: "var(--indigo)" },
  { name: "light-indigo", cssVar: "var(--light-indigo)" },
  { name: "dark-indigo", cssVar: "var(--dark-indigo)" },

  { name: "purple", cssVar: "var(--purple)" },
  { name: "light-purple", cssVar: "var(--light-purple)" },
  { name: "dark-purple", cssVar: "var(--dark-purple)" },

  { name: "pink", cssVar: "var(--pink)" },
  { name: "light-pink", cssVar: "var(--light-pink)" },
  { name: "dark-pink", cssVar: "var(--dark-pink)" },

  { name: "brown", cssVar: "var(--brown)" },
  { name: "light-brown", cssVar: "var(--light-brown)" },
  { name: "dark-brown", cssVar: "var(--dark-brown)" },

  { name: "gray", cssVar: "var(--gray)" },
  { name: "light-gray", cssVar: "var(--light-gray)" },
  { name: "dark-gray", cssVar: "var(--dark-gray)" },
] as const;

export type ColorName = typeof colors[number]["name"];
export default colors;
