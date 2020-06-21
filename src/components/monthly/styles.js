import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border: ${props => `2px solid ${props.theme.color}`};
`;
export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  display: flex;
  justify-content: space-around;
  text-align: ${props => (props.lang === 'fr-fr' ? 'left' : 'right')};
  border-bottom: ${props => `1px solid ${props.theme.color}`};

  &.today {
    background-color: #2d3edf !important;
    color: white;
  }
`;

export const Td = styled.td`
  text-transform: capitalize;
  border-top: none !important;
  margin: 0 0.5rem;
  flex: 1;

  &.first {
    flex-basis: 0;
    flex-grow: 2.5;
  }
`;
export const Thead = styled.thead`
  & tr {
    background-color: grey;
    color: white;
    /* font-weight: bold; */
  }
`;
