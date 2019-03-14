import styled, { keyframes } from 'styled-components';

const loaderRotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  `;

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  &:before {
    position: absolute;
    content: '';
    top: 0%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 500rem;
    border: 0.2em solid rgba(0, 0, 0, 0.1);
  }
  &:after {
    position: absolute;
    content: '';
    top: 0%;
    left: 50%;
    width: 100%;
    height: 100%;
    animation: ${loaderRotate} 0.6s linear;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: #767676 transparent transparent;
    border-style: solid;
    border-width: 0.2em;
    box-shadow: 0px 0px 0px 1px transparent;
  }
`;
