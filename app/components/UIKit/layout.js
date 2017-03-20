import { css } from 'styled-components'
import styled from 'styled-components'

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const FullScreen = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
	height: 50pt;
  border-bottom: 1pt dashed #E0E0E0;
`;

export const LayoutParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: stretch;
  justify-content: space-around;
  height: 100%;
`;

export const LayoutChild = styled.div`
  position: relative;
  flex: ${props => props.left ? 0.33 : 0.64};
	z-index: ${props => props.active ? 10 : 0};
  background-color: white;
  margin-top: 10pt;
	${media.desktop`
	  position: absolute;
		width: 100%; height: 100%;
	`}
`;
