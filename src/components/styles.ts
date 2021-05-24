import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  font-family: ${props => props.theme.font};
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  padding: 10px 16px;
  background: rgba(128, 131, 164, 0.06);
  border: 2px solid rgba(128, 131, 164, 0.2);
  border-radius: 8px;
  outline: none;
  color: #2C2D76;
  :hover{
    border: 2px solid #8083A4;
  }
  :focus{
    border: 2px solid #373AF5;
  }
  -webkit-transform: translate3d(0,0,0);
  transition: border 0.4s ease-out;
  cursor: pointer;
`

export const Container = styled.div`
  max-width: 252px;
  width: 100%;
  position: relative;
  img {
    position: absolute;
    pointer-events: none;
  }
  @media ${props => props.theme.media.phone} {
    max-width: 100%;
  }
`
