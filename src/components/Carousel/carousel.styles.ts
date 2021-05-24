import styled from 'styled-components'

export const CarouselContainer = styled.div`
    width: 100%;
    margin-top: 54px;
    display: flex;
    align-items: center;
    margin-bottom: -10px;
    box-shadow: 25px 0px 16px -16px rgba(5, 6, 114, 0.2);
    position: relative;
    @media ${props => props.theme.media.tabletS} {
        margin-top: 35px;
    }
    @media ${props => props.theme.media.phone} {
        margin-top: 30px;
    }
    @media ${props => props.theme.media.phone} {
        box-shadow: none;
    }
`

export const CardList = styled.div`
    display: flex;
    overflow-x: auto;
    flex-flow: row nowrap;
    scroll-snap-type: x proximity;
    scroll-behavior: smooth;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        height: 0px;
    }
    > div {
        margin-left: 11px;
        scroll-snap-align: start;
        flex-shrink: 0;
        transform-origin: center center;
        transform: scale(1);
        transition: transform 0.5s;
        padding: 0 0 30px 0;
        width: 174px;
    }
    > div: nth-child(1){
        width: 174px;
    }
`

export const Button = styled.button`
    width: 24px;
    height: 24px;
    background-color: transparent;
    outline: none;
    position: absolute;
    border: 0;
    cursor: pointer;
    top: calc(50% - 19px);
    right: -28px;
    text-align: right;
    svg{
        width: 10px;
        height: 17px;
        path{
            fill: #8083A4;
        }
    }
    :nth-child(1){
        transform: rotateY(-180deg);
        left: -28px;
    }
    :disabled{
        cursor: not-allowed;
        pointer-events: none;
        svg {
            path{
                fill: #8083A466;
            }
        }
    }
    @media ${props => props.theme.media.phone} {
        display: none;
    }
    
`
