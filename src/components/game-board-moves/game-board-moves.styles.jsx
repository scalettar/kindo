import styled from "styled-components";

import {
  kindoP1,
  kindoP2,
  kindoNeutral,
  kindoNeutralDark,
  cyberP1,
  cyberP2,
  cyberNeutral,
  cyberNeutralDark
} from "../../themes/themes.styles";

const getPipStyles = props => {
  if (props.theme === "cyber") {
    if (props.pipColor === "color") {
      if (props.player === 1) return cyberP1;
      else return cyberP2;
    } else if (props.pipColor === "dark") return cyberNeutralDark;
    else return cyberNeutral;
  }
  else {
    if (props.pipColor === "color") {
      if (props.player === 1) return kindoP1;
      else return kindoP2;
    } else if (props.pipColor === "dark") return kindoNeutralDark;
    else return kindoNeutral;
  }
};

export const MovesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 500px;
`;

export const PipsContainer = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
`;

export const PipContainer = styled.div`
  width: 13px;
  height: 13px;
  margin-right: 6px;
  border-radius: 2px;
  background-color: black;
  ${getPipStyles}
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
