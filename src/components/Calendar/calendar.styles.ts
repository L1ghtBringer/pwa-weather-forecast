import styled from 'styled-components'

export const CalendarCard = styled.div<{ styleUser?: string }>`
  width: 252px;
  font-family: Ubuntu;
  user-select: none;
  background-color: #fff;
  border: 2px solid rgba(128, 131, 164, 0.06);
  box-shadow: 0px 2px 4px rgba(4, 5, 73, 0.16),
    14px 14px 20px rgba(5, 6, 114, 0.08);
  border-radius: 8px;
  ${(props) => props.styleUser};
`

interface IButton {
  padding?: string
  isDate?: boolean
  today?: boolean
  selected?: boolean
  thisMonth?: boolean
}

export const Button = styled.button<IButton>`
  background-color: transparent;
  outline: none;
  border: 0;
  cursor: pointer;
  padding: ${(props) => props.padding};
  ${(props) =>
    props.isDate &&
    `
    width: 33px;
    height: 33px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      transition: background 0.4s;
    }
  `}
  &:disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.25);
    color: ${(props) => props.today && '#373AF550'};
  }
  ${(props) =>
    props.isDate &&
    !props.thisMonth &&
    `
    color: rgba(0, 0, 0, 0.25);
  `}
  ${(props) =>
    props.isDate &&
    props.today &&
    `
    color: #373AF5;
    font-weight: 700;
  `}
  ${(props) =>
    props.isDate &&
    props.selected &&
    `
    color: #fff;
    font-weight: 700;
    border-radius: 50%;
    background-color: #373AF5;
    &:hover{
      background-color: #373AF5;
    }
  `}
`

export const Header = styled.header`
  display: flex;
  padding: 0 1.2em;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  span {
    line-height: 40px;
    font-weight: 500;
  }
`

export const Table = styled.table`
  margin: 0 auto;
  width: 90%;
  font-size: 14px;
  border-collapse: collapse;
  th {
    font-weight: 600;
    line-height: 40px;
  }
`

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  button {
    line-height: 38px;
    color: #373af5;
    font-weight: 600;
  }
  button:disabled {
    color: #373af560;
  }
`
