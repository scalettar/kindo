import { css } from "styled-components";

// ------------------------THEMES---------------------
// Use colorhexa to find new color schemes
// ---------------------------------------------------

// THEME: kindo (Default)
const kindoBackground = css`
  background-color: #f7f1eb;
`;
const kindoEmpty = css`
  box-shadow: 0 0 0 2px #e1d4ca inset;
`;
const kindoNeutral = css`
  background-color: #f0e7df;
`;
const kindoShadow = css`
  background-color: #e1d4ca;
`;
const kindoP1 = css`
  background-color: #5abf84;
`;
const kindoP2 = css`
  background-color: #ffb473;
`;

// THEME: kindoLight
const kindoLightBackground = css`
  background-color: #fafafa;
`;
const kindoLightEmpty = css`
  box-shadow: 0 0 0 2px #ebebeb inset;
`;
const kindoLightNeutral = css`
  background-color: #dbdbdb;
`;
const kindoLightShadow = css`
  background-color: #ebebeb;
`;
const kindoLightP1 = css`
  background-color: #5596f2;
`;
const kindoLightP2 = css`
  background-color: #ff6699;
`;

// THEME: kindoDark
const kindoDarkBackground = css`
  background-color: #444444;
`;
const kindoDarkEmpty = css`
  box-shadow: 0 0 0 2px #3a3a3a inset;
`;
const kindoDarkNeutral = css`
  background-color: #4d4d4d;
`;
const kindoDarkShadow = css`
  background-color: #3a3a3a;
`;
const kindoDarkP1 = css`
  background-color: #ff6766;
`;
const kindoDarkP2 = css`
  background-color: #4db4ff;
`;

// THEME: andromeda
const andromedaBackground = css`
  background-color: #23262e;
  /* background-color: #ffffff; */
`;
const andromedaEmpty = css`
  box-shadow: 0 0 0 2px #333844 inset;
  /* box-shadow: 0 0 0 2px #e1d4ca inset; */
`;
const andromedaNeutral = css`
  background-color: #333844;
  /* background-color: #f0e7df; */
`;
const andromedaShadow = css`
  background-color: #333844;
  /* background-color: #e1d4ca; */
`;
const andromedaP1 = css`
  background-color: #00e8c6;
`;
const andromedaP2 = css`
  background-color: #ff007a;
`;

// THEME: Cali
const caliBackground = css`
  background-color: #ffffff;
`;
const caliEmpty = css`
  box-shadow: 0 0 0 2px #584528 inset;
`;
const caliNeutral = css`
  background-color: #bd8a5e;
`;
const caliShadow = css`
  background-color: #584528;
`;
const caliP1 = css`
  background-color: #b71234;
`;
const caliP2 = css`
  background-color: #008542;
`;

// THEME: Cyber
const cyberBackground = css`
  background-color: #010001;
`;
const cyberEmpty = css`
  box-shadow: 0 0 0 2px #e1d4ca inset;
`;
const cyberNeutral = css`
  background-color: #313639;
`;
const cyberShadow = css`
  background-color: #ffffff;
`;
const cyberP1 = css`
  background-color: #00f0ff;
`;
const cyberP2 = css`
  background-color: #fcee09;
`;

// THEME: Super 
// !!!WARNING!!! This theme is broken. Opacity of last played not visible.
// Possible fix, add a flag in game-tile.styles.jsx for PlayedLastContainer
// background-color based on theme property in this file like 
// const <themeName>Last = css` {...}  `;
const superBackground = css`
  background-color: #ffffff;
`;
const superEmpty = css`
  box-shadow: 0 0 0 2px #cccccc inset;
`;
const superNeutral = css`
  background-color: #ededed;
`;
const superShadow = css`
  background-color: #cccccc;
`;
const superP1 = css`
  background-color: #101010;
`;
const superP2 = css`
  background-color: #ff3c00;
`;

// ---------------------------------------------------

export const getBackground = theme => {
  if (theme === "cyber") return cyberBackground;
  else if (theme === "cali") return caliBackground;
  else if (theme === "kindoDark") return kindoDarkBackground;
  else if (theme === "kindoLight") return kindoLightBackground;
  else if (theme === "andromeda") return andromedaBackground;
  else if (theme === "super") return superBackground;
  else return kindoBackground;
};

export const getEmpty = theme => {
  if (theme === "cyber") return cyberEmpty;
  else if (theme === "cali") return caliEmpty;
  else if (theme === "kindoDark") return kindoDarkEmpty;
  else if (theme === "kindoLight") return kindoLightEmpty;
  else if (theme === "andromeda") return andromedaEmpty;
  else if (theme === "super") return superEmpty;
  else return kindoEmpty;
};

export const getNeutral = theme => {
  if (theme === "cyber") return cyberNeutral;
  else if (theme === "cali") return caliNeutral;
  else if (theme === "kindoDark") return kindoDarkNeutral;
  else if (theme === "kindoLight") return kindoLightNeutral;
  else if (theme === "andromeda") return andromedaNeutral;
  else if (theme === "super") return superNeutral;
  else return kindoNeutral;
};

export const getShadow = theme => {
  if (theme === "cyber") return cyberShadow;
  else if (theme === "cali") return caliShadow;
  else if (theme === "kindoDark") return kindoDarkShadow;
  else if (theme === "kindoLight") return kindoLightShadow;
  else if (theme === "andromeda") return andromedaShadow;
  else if (theme === "super") return superShadow;
  else return kindoShadow;
};

export const getP1 = theme => {
  if (theme === "cyber") return cyberP1;
  else if (theme === "cali") return caliP1;
  else if (theme === "kindoDark") return kindoDarkP1;
  else if (theme === "kindoLight") return kindoLightP1;
  else if (theme === "andromeda") return andromedaP1;
  else if (theme === "super") return superP1;
  else return kindoP1;
};

export const getP2 = theme => {
  if (theme === "cyber") return cyberP2;
  else if (theme === "cali") return caliP2;
  else if (theme === "kindoDark") return kindoDarkP2;
  else if (theme === "kindoLight") return kindoLightP2;
  else if (theme === "andromeda") return andromedaP2;
  else if (theme === "super") return superP2;
  else return kindoP2;
};
