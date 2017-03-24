import styled from 'styled-components';

export const List = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const Item = styled.div`
  background-color: white;
  border-bottom: 1pt dashed #E0E0E0;
`;

export const ActivityIcon = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
`;
