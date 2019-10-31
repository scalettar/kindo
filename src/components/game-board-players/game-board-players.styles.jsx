import styled from "styled-components";

import {
  kindoP1,
  kindoP2,
} from "../../themes/themes.styles";

const getAvatarStyles = props => {
  if (props.player === 1) return kindoP1;
  else return kindoP2;
};

export const AvatarContainer = styled.div`
  height: 90px;
  width: 90px;
  border-radius: 100px;
  margin-bottom: 10px;
  ${getAvatarStyles}
`;

export const MovesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 10px;
  width: 500px;
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
