import styled from 'styled-components'

export const SnackbarContainer = styled.div<{ success?: boolean }>`
  position: fixed;
  right: calc(50% - 170px);
  bottom: 5%;
  width: 340px;
  box-shadow: 1px 2px 8px rgb(4 5 73 / 25%), 1px 10px 18px rgb(5 6 114 / 20%);
  z-index: 2;
  border-radius: 6px;
  padding: 12px;
  background-color: ${(props) => (props.success ? '#4caf50' : '#e5596d')};
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  align-items: center;
  display: flex;
  img {
    width: 20px;
    height: 20px;
    margin: 0 10px 0 3px;
  }
  @media (max-width: 500px) {
    width: 280px;
    right: calc(50% - 140px);
  }
`
