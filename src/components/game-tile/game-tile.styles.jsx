import styled from "styled-components";

import { getP1, getP2, getNeutral } from "../../themes/themes.styles";

const getTileStyles = props => {
  if (props.owner === 1) return getP1(props.theme);
  else if (props.owner === 2) return getP2(props.theme);
  else return getNeutral(props.theme);
};

export const PlayedLastContainer = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 2px;
  background-color: black;
  opacity: 15%;
  position: absolute;
  z-index: 2;
`;

export const TileContainer = styled.button`
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
  ${getTileStyles}
`;

// TODO: 
// Make unwallable marker look the way it should.
// Solution:
// a. In vectr, use overlapping shapes to make symbol
// b. Highlight all components and combine with the Add button
// c. Lower color opacity to simulate the opacity css tag used for PlayedLast div
// d. Import the low opacity image and overlay it on the tiles like is done for walls/king
export const UnwallableContainer = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 2px;
  background-color: lightgrey;
  opacity: 75%;
  position: absolute;
  z-index: 1;
`;
