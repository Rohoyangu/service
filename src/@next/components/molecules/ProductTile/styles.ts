import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`

  margin: 0 0 0.5rem 0;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400 !important;
  font-style: normal !important;
  text-decoration: none !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
  color: #111 !important;
`;

export const Wrapper = styled.div`

  padding: 2.5rem;
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;
  text-transform: uppercase;
  font-weight: 400 !important;
  font-style: normal !important;
  text-decoration: none !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
  color: #111 !important;

  :hover {
    background-color: ${props => props.theme.colors.hoverLightBackground};
  }

  ${media.largeScreen`
    padding: 1.8rem;
  `}
`;

export const Title = styled.h4`
  text-transform: uppercase;
  font-weight: normal;
  ${textProps}
`;

export const Price = styled.p`
  ${textProps}
`;

export const Image = styled.div`
  width: auto;
  height: auto;
  max-width: 100%;

  > img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
`;
