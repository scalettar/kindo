import styled from "styled-components";

import { getEmpty, getNeutralDark, getP1, getP2 } from "../../themes/themes.styles";

const getPipStyles = props => {
  if (props.pipColor === "color") {
    if (props.player === 1) return getP1(props.theme);
    else return getP2(props.theme);
  } else if (props.pipColor === "dark") return getNeutralDark(props.theme);
  else return getEmpty(props.theme);
};

export const PipContainer = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 2px;
  background-color: black;
  ${getPipStyles}
`;
