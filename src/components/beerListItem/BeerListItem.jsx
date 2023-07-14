import React from 'react'
import cl from './BeerListItem.module.css'
import MyBtn from '../UI/btn/MyBtn'

function BeerListItem({ children, id, beer, name, img, selected = false, ...props }) {
  const beerListItemClasses = [cl.beer_list_item]
  if (selected) beerListItemClasses.push(cl.active)
  return (
    <div {...props} className={beerListItemClasses.join(' ')}>
      <p>{id}</p>
      <div className={cl.img_holder}>
        <img src={img} alt="beer img" />
      </div>
      <div className={cl.description}>
        <h2>{name}</h2>
        <p>ADV: {beer.abv}</p>
        <p>PH: {beer.ph}</p>
        <p>SRM: {beer.srm}</p>
        <p>Description: {beer.description}</p>
        <br />
        <p>Food pairing: {beer.food_pairing.map((food, index) => <span key={index}>{food}. </span>)}</p>
        <br />
        <p>Tagline: {beer.tagline}</p>
        <br />
        {children}
      </div>
    </div>
  )
}

export default BeerListItem