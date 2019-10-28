import styled from "styled-components";

import {
  kindoNeutral,
  kindoP1,
  kindoP2,
  cyberNeutral,
  cyberP1,
  cyberP2
} from "../../themes/themes.styles";

const getTileStyles = props => {
  if (props.theme === "cyber") {
    if (props.owner === 1) return cyberP1;
    else if (props.owner === 2) return cyberP2;
    else return cyberNeutral;
  } else {
    if (props.owner === 1) return kindoP1;
    else if (props.owner === 2) return kindoP2;
    else return kindoNeutral;
  }
};

export const TileContainer = styled.button`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  color: #fafafa;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.9;
  }
  ${getTileStyles}
`;
