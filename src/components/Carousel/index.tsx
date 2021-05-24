import React, { useRef } from 'react'
import WeatherCard from '../WeatherCard'
import { ReactComponent as ButtonIcon } from './icons/button.svg'
import { CarouselContainer, Button, CardList } from './carousel.styles'
import { ICarouselProps } from './interfaces'
import { useOnScreen } from '../../hooks/onScreen'

const Carousel: React.FC<ICarouselProps> = ({ data }) => {
  const myRef: any = useRef<HTMLDivElement>(null)
  const [leftCardRef, leftCard] = useOnScreen<HTMLDivElement>()
  const [rightCardRef, rightCard] = useOnScreen<HTMLDivElement>()

  const scroll = (scrollOffset: number = 174): void => {
    myRef.current.scrollLeft = Number(myRef.current.scrollLeft) + scrollOffset
  }

  return (
    <CarouselContainer>
      <Button onClick={() => scroll(-174)} disabled={leftCard}>
        <ButtonIcon />
      </Button>
      <CardList ref={myRef}>
        <div ref={leftCardRef}>
          <WeatherCard {...data[0]} />
        </div>
        {data.slice(1, data.length - 1).map((element) => (
          <div key={element.time}>
            <WeatherCard {...element} />
          </div>
        ))}
        <div ref={rightCardRef}>
          <WeatherCard {...data[data.length - 1]} />
        </div>
      </CardList>
      <Button onClick={() => scroll()} disabled={rightCard}>
        <ButtonIcon />
      </Button>
    </CarouselContainer>
  )
}

export default Carousel
