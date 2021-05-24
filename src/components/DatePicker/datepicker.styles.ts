import styled from 'styled-components'
import { Container } from '../styles'

export const PickerContainer = styled(Container)<{ visible: boolean }>`
  svg {
    position: absolute;
    top: calc(50% - 8px);
    right: 16px;
    cursor: pointer;
    pointer-events: none;
    path {
      fill: #8083a4;
      transition: all 0.4s ease-out;
    }
  }
  &:hover {
    svg {
      path {
        fill: #8083a49c;
      }
    }
  }
  div {
    opacity: 0;
    ${(props) => props.visible && 'opacity: 1'};
    transition: all 0.6s ease-out;
  }
`
