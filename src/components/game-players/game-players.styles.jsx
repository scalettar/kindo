import styled from "styled-components";

import { getP1, getP2, getNeutral } from "../../themes/themes.styles";

const getAvatarStyles = props => {
  if (props.player === props.currentPlayer) {
    if (props.player === 1) return getP1(props.theme);
    else return getP2(props.theme);
  } else return getNeutral(props.theme);
};

export const AvatarContainer = styled.div`
  height: 90px;
  width: 90px;
  border-radius: 100px;
  margin-bottom: 10px;
  ${getAvatarStyles}
`;

export const PipsContainer = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0px 0px 10px 0px;
  width: 500px;
`;
