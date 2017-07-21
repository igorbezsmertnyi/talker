import React, { Component } from 'react'
import style from './style.css'

const SearchModal = ({ assistent, handleClick }) => (
  <div className={style.searchModal}>
    <div onClick={handleClick}
         className={style.searchModal__bg}></div>
    <div className={style.searchModal__modal}>
      <div className={style.searchModal__modal__query}>
        <h3>Search: {assistent.query}</h3>
      </div>
      <div className={style.searchModal__modal__list}>
        {assistent.data.data.items.map((item, key) => (
          <a href={item.link}
             key={key}
             target="_blank">
            <div className={style.searchModal__modal__list__item}>
              <h4>{item.title}</h4>
              <p>{item.snippet}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
)

export default SearchModal
