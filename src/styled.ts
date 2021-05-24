import baseStyled, { ThemedStyledInterface } from 'styled-components'

export const theme = {
  media: {
    laptop: '(max-width: 1366px)',
    tablet: '(max-width: 805px)',
    tabletS: '(max-width: 700px)',
    phone: '(max-width: 520px)'
  },
  color: {
    accent: '#373AF5',
    secondary: {
      active: '#8083A4',
      hover: '#8083A499'
    },
    baseStong: '#2C2D76',
    critic: '#E5596D',
    baseWeak: '#FFFFFF'
  },
  font: 'Ubuntu, sans-serif'
}

export type Theme = typeof theme

export const styled = baseStyled as ThemedStyledInterface<Theme>
