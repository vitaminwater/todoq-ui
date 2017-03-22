import styled from 'styled-components';

export const Log = styled.div`
  position: relative;
  padding: 30pt 10pt 30pt 10pt;
  ${props => props.first ? '' : 'border-bottom: 2px dashed #E0E0E0;'}
`;

export const LogIcon = styled.img`
  margin: 20pt;
  height: 40pt;
`;

export const LogDate = styled.div`
  position: absolute;
  top: 5pt; left: 5pt;
  color: #a0a0a0;
  font-size: 0.9em;
`;
