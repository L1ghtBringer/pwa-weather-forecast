import styled from 'styled-components'

export const FillFieldsContainer = styled.div`
  margin-top: 64px;
  text-align: center;
  img {
    width: 160px;
    height: 160px;
  }
  h2 {
    margin: 24px 0 37px;
    font-size: 16px;
    line-height: 24px;
    color: #8083a4;
  }
  @media ${(props) => props.theme.media.tabletS} {
    margin-top: 44px;
    h2 {
      margin: 24px 0 14px;
    }
  }
  @media ${(props) => props.theme.media.phone} {
    margin-top: 39px;
  }
`
