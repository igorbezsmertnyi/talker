import React, { Component } from 'react'
import style from './style.css'

const AssistentBtn = ({ handleClick }) => (
  <button className={style.assistentBtn}
          onClick={handleClick}
          type="button">
    <div className={style.assistentBtn__circl}></div>
  </button>
)

export default AssistentBtn
