import React from 'react'
import cl from './Loader.module.css'

function Loader() {
  return (
    <div className={cl.loader_holder}>
      <div className={cl.loader}></div>
    </div>
  )
}

export default Loader