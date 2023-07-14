import React from 'react'
import cl from './MyBtn.module.css'

function MyBtn({children, ...props}) {
  return (
    <button className={cl.btn} {...props}>{children}</button>
  )
}

export default MyBtn