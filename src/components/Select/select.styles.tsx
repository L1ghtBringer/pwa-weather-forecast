import styled from 'styled-components'
import { Input, Container } from '../styles'

export const SelectContainer = styled(Container)<{ visible: boolean }>`
  img {
    user-select: none;
    width: 15px;
    height: 8px;
    right: 15px;
    top: calc(50% - 4px);
    ${(props) =>
      props.visible && `
        transform: rotateX(-180deg) translateY(1px);
    `}
    transition: all .5s ease-out;
  }
`

export const OptionContainer = styled.div<{ visible: boolean}>`
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: ${props => props.theme.color.baseWeak};
  border: 2px solid rgba(128, 131, 164, 0.06);
  box-shadow: 0px 2px 4px rgba(4, 5, 73, 0.16), 14px 14px 20px rgba(5, 6, 114, 0.08);
  border-radius: 8px;
  margin-top: 12px;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: all 0.4s ease-out;
  overflow: hidden;
  padding: 10px 6px;
  & > div{
    overflow-y: auto;
    height: ${(props) => (props.visible ? '156px' : '0')};
    transition: all 0.4s ease-out;
    scrollbar-color: #8083A466 transparent;
    scrollbar-width: thin;
    & > div {
      padding: 6px 10px;
      line-height: 24px;
      color: ${props => props.theme.color.baseStong};
    }
  } 
  div::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  div::-webkit-scrollbar-thumb {
    height: 28px;
    background: #8083A466;
    border-radius: 24px;
  }
`

export const Option = styled((props) => <Input as="div" {...props} />)<{ visible?: boolean }>`
  padding: 6px 10px;
  border: none;
  :hover, :focus{
    border: none;
  }
  & + & {
    margin: 6px 0 0; 
  }
  ${props => !props.visible && 'display: none;'}
  background: #fff;
  width: calc(100% - 10px);
  :hover {
    background: rgba(128, 131, 164, 0.06);
    transition: background 0.3s ease-out;
  }
`
