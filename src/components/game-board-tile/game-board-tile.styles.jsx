import styled from "styled-components";

import { getP1, getP2, getNeutral } from "../../themes/themes.styles";

const getTileStyles = props => {
  if (props.owner === 1) return getP1(props.theme);
  else if (props.owner === 2) return getP2(props.theme);
  else return getNeutral(props.theme);
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
