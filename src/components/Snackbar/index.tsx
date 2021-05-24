import React, { useEffect, useState } from 'react'
import { SnackbarContainer } from './snackbar.styles'
import { Error } from '../../interfaces'
import errorIcon from './icons/error.svg'

let counterTimer: any

const Snackbar: React.FC<{ message?: Error, success?: boolean }> = ({
  message,
  success
}) => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if (message?.text) {
      if (visible) {
        clearTimeout(counterTimer)
        setVisible(prevState => (!prevState))
      }
      setVisible(true)
      counterTimer = setTimeout(() => {
        setVisible(false)
      }, 4000)
    }
  }, [message])

  if (!visible || !message?.text) return null

  return (
    <SnackbarContainer success={success}>
      <img src={errorIcon} alt="icon" />
      <p>{message.text}</p>
    </SnackbarContainer>
  )
}

export default Snackbar
