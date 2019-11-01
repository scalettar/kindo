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
const kindoNeutralDark = css`
  background-color: #e1d4ca;
`;
const kindoP1 = css`
  background-color: #5abf84;
`;
const kindoP2 = css`
  background-color: #ffb473;
`;

// THEME: kindoNight
const kindoNightBackground = css`
  background-color: #444444;
`;
const kindoNightEmpty = css`
  box-shadow: 0 0 0 2px #3a3a3a inset;
`;
const kindoNightNeutral = css`
  background-color: #4d4d4d;
`;
const kindoNightNeutralDark = css`
  background-color: #3a3a3a;
`;
const kindoNightP1 = css`
  background-color: #ff6766;
`;
const kindoNightP2 = css`
  background-color: #4db4ff;
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
const caliNeutralDark = css`
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
const cyberNeutralDark = css`
  background-color: #ffffff;
`;
const cyberP1 = css`
  background-color: #00f0ff;
`;
const cyberP2 = css`
  background-color: #fcee09;
`;
// ---------------------------------------------------

export const getBackground = theme => {
  if (theme === "cyber") return cyberBackground;
  else if (theme === "cali") return caliBackground;
  else if (theme === "kindoNight") return kindoNightBackground;
  else return kindoBackground;
};

export const getEmpty = theme => {
  if (theme === "cyber") return cyberEmpty;
  else if (theme === "cali") return caliEmpty;
  else if (theme === "kindoNight") return kindoNightEmpty;
  else return kindoEmpty;
};

export const getNeutral = theme => {
  if (theme === "cyber") return cyberNeutral;
  else if (theme === "cali") return caliNeutral;
  else if (theme === "kindoNight") return kindoNightNeutral;
  else return kindoNeutral;
};

export const getNeutralDark = theme => {
  if (theme === "cyber") return cyberNeutralDark;
  else if(theme === "cali") return caliNeutralDark;
  else if (theme === "kindoNight") return kindoNightNeutralDark;
  else return kindoNeutralDark;
};

export const getP1 = theme => {
  if (theme === "cyber") return cyberP1;
  else if (theme === "cali") return caliP1;
  else if (theme === "kindoNight") return kindoNightP1;
  else return kindoP1;
};

export const getP2 = theme => {
  if (theme === "cyber") return cyberP2;
  else if (theme === "cali") return caliP2;
  else if (theme === "kindoNight") return kindoNightP2;
  else return kindoP2;
};
