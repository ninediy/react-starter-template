import styled from 'styled-components';

import { GREEN_C } from './styles/color';

export const PostBox = styled.div`
  padding: 10px;
  border: 1px solid #333;
  margin-top: 5px;
  transition: 0.3s all;
  cursor: pointer;
  &:hover {
    background: ${props => (props.hovColor ? props.hovColor : GREEN_C)};
  }
`;
