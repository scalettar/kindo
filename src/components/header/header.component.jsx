import React from "react";

import {
    HeaderContainer,
    OptionsContainer,
    OptionLink
} from "./header.styles";

const Header = () => (
  <HeaderContainer>
    <OptionsContainer>
      <OptionLink to="/play">PLAY</OptionLink>
      <OptionLink to="/about">ABOUT</OptionLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
