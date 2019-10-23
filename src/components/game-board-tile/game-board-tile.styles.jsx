import styled from "styled-components";

export const TileContainer = styled.button`
  width: 18%;
  height: 18%;
  border: 3px solid red;
  border-radius: 5px;
  
  background-color: black;
  color: white;
  border: none;

  &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
  }
`;
