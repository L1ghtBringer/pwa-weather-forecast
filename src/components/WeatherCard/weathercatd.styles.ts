import styled from 'styled-components'

export const WeatherContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.color.accent};
  border: 2px solid ${(props) => props.theme.color.accent};
  box-shadow: 0px 4px 4px rgba(4, 5, 73, 0.25),
    14px 14px 20px rgba(5, 6, 114, 0.2);
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  user-select: none;
  span {
    font-size: 16px;
    line-height: 24px;
    text-transform: lowercase;
    font-weight: bold;
    color: ${(props) => props.theme.color.baseWeak};
    font-family: Ubuntu;
  }
  span:last-child {
    font-size: 32px;
    line-height: 32px;
    margin-left: auto;
  }
  img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 7px;
  }
`
