import styled from 'styled-components'

export const OfflineLogo = styled.img<{online: boolean}>`
  position: absolute;
  top: 10px;
  right: 30px;
  display: ${props => props.online ? 'none' : 'block'};
  width: 30px;
  height: 30px;
  @media ${props => props.theme.media.phone} {
    right: 10px;
  }
`

export const ForecastSection = styled.section`
  max-width: 1384px;
  padding: 0 15px 20px;
  width: 100%;
  margin: 0 auto;
  font-family: ${props => props.theme.font};
  @media ${props => props.theme.media.tabletS} {
    padding: 0 10px 40px;
  }
`

export const ForecastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${props => props.theme.media.laptop}{
    flex-direction: column;
  }
`

export const Title = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 775px;
  padding: 65px 0 60px;
  h1 {
    color: ${props => props.theme.color.baseWeak};
    font-size: 102px;
    line-height: 106px;
  }
  h1:last-child {
    margin-left: auto;
  }
  @media ${props => props.theme.media.tablet} {
    max-width: 600px;
    padding: 45px 0 40px;
    h1 {
      font-size: 79px;
      line-height: 83px;
    }
  }
  @media ${props => props.theme.media.tabletS} {
    max-width: 476px;
    padding: 40px 0 30px;
    h1 {
      font-size: 62px;
      line-height: 66px;
    }
  }
  @media ${props => props.theme.media.phone} {
    max-width: 290px;
    padding: 32px 0 24px;
    h1 {
      font-size: 38px;
      line-height: 38px;
    }
  }
`
export const ForecastCard = styled.div`
  max-width: 660px;
  width: 100%;
  min-height: 524px;
  margin-bottom: 50px;
  background: ${props => props.theme.color.baseWeak};
  box-shadow: 0px 4px 4px rgba(4, 5, 73, 0.25),
    14px 14px 20px rgba(5, 6, 114, 0.2);
  border-radius: 8px;
  padding: 50px 58px;
  & > h2{
    font-size: 32px;
    line-height: 32px;
    color: ${props => props.theme.color.baseStong};
    margin-bottom: 32px;
    user-select: none;
  }
  @media ${props => props.theme.media.laptop} {
    margin: 0 auto;
    margin-bottom: 34px;
  }
  @media ${props => props.theme.media.tabletS} {
    max-width: 476px;
    padding: 40px 58px;
    min-height: auto;
  }
  @media ${props => props.theme.media.phone} {
    max-width: 350px;
    padding: 32px 24px;
  }
`

export const FlexInput = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${props => props.theme.media.tabletS} {
    flex-direction: column;
    & > div:nth-child(1){
      margin-bottom: 24px;
    }
  }
`

export const OneCard = styled.div`
  margin-top: 54px;
  img{ 
    width: 160px;
    height: 160px;
    margin-top: -9px;
    margin-bottom: -9px;
  }
  @media ${props => props.theme.media.tabletS} {
    margin-top: 35px;
    margin-bottom: 20px;
  }
  @media ${props => props.theme.media.phone} {
    margin-top: 30px;
  }
`
