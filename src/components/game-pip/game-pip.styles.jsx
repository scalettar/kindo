import styled from "styled-components";

import {
    kindoP1,
    kindoP2,
    kindoEmpty,
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
    } else {
      if (props.pipColor === "color") {
        if (props.player === 1) return kindoP1;
        else return kindoP2;
      } else if (props.pipColor === "dark") return kindoNeutralDark;
      else return kindoEmpty;
    }
  };
  
export const PipContainer = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 2px;
  background-color: black;
  ${getPipStyles}
`;