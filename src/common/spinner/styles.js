import styled, { keyframes } from 'styled-components';
export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  flex: 1;
  &:after {
    content: '';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: ${props =>
      `${props.theme.spinner.border} transparent ${props.theme.spinner.border}  transparent`};
    animation: ${spin} 1.2s linear infinite;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(Wrapper)`
  height: 50vh;
`;
