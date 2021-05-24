import React from 'react'
import { FillFieldsContainer } from './fillfields.styles'
import cloud from './icons/cloud.svg'

const FillFields: React.FC = () => {
  return (
    <FillFieldsContainer>
      <img src={cloud} alt="cloud-icon" />
      <h2>Fill in all the fields and the weather will be displayed</h2>
    </FillFieldsContainer>
  )
}

export default FillFields
