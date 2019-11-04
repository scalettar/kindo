import styled, { css } from "styled-components";

import { getP1, getP2 } from "../../themes/themes.styles";

const wallSelected = css`
  opacity: 0.7;
`;

const getButtonStyles = props => {
  if (props.currentPlayer === 1) return getP1(props.theme);
  else return getP2(props.theme);
};

const getSelectedStyles = props => {
  if (props.wallSelection === props.wallButtonType) return wallSelected;
};

export const GameWallMenuContainer = styled.div`
  height: 500px;
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const WallMenuButtonContainer = styled.button`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.9;
  }
  ${getButtonStyles}
  ${getSelectedStyles}
`;
