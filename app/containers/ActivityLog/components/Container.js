import styled from 'styled-components';

const Container = styled.div`
  border-left: 6pt solid ${props => props.color || '#e0e0e0'};
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: stretch;
  align-items: stretch;
  align-content: stretch;
`;
export default Container;
