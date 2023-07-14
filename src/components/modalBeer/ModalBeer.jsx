import React from 'react'
import cl from './ModalBeer.module.css'
import { IoCloseSharp } from 'react-icons/io5'
import MyBtn from '../UI/btn/MyBtn'

function ModalBeer({ visible = false, setVisible, beer }) {
  const modalClasses = [cl.modalBeer]
  if (visible) {
    modalClasses.push(cl.active);
  }
  return (
    <div className={modalClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.content} onClick={(e) => e.stopPropagation()}>
        <div className={cl.close_btn_holder} onClick={() => setVisible(false)}>
          <IoCloseSharp />
        </div>
        <div className={cl.img_holder}>
          <img src={beer.image_url} alt="beer img" />
        </div>
        <div className={cl.description}>
          <h2>{beer.name}</h2>
          <br />
          <p>ADV: {beer.abv}</p>
          <p>Attenuation level: {beer.attenuation_level}</p>
          <p>Boil volume: {beer.boil_volume.value}</p>
          <p>Brewers tips: {beer.brewers_tips}</p>
          <p>Contributed by: {beer.contributed_by}</p>
          <p>Description: {beer.description}</p>
          <p>EBC: {beer.ebc}</p>
          <p>First brewed: {beer.first_brewed}</p>
          <p>Food pairing: {beer.food_pairing.map((food, index) => <span key={index}>{food}. </span>)}</p>
          <p>IBU: {beer.ibu}</p>
          <br />
          <div className={cl.ingredients_section}>
            <h3>Ingredients: </h3>
            <div>
              <h4>Hops</h4> {beer.ingredients.hops.map((i, index) =>
                <div key={index}>
                  <span>{i.name} </span>
                  <span>{i.add} </span>
                  <span>{i.attribute} </span>
                  <span>{i.amount.value} </span>
                  <span>{i.amount.unit} </span>
                </div>)}
            </div>
            <div>
              <h4>Malt</h4> {beer.ingredients.malt.map((i, index) =>
                <div key={index}>
                  <span>{i.name} </span>
                  <span>{i.amount.value} </span>
                  <span>{i.amount.unit} </span>
                </div>)}
            </div>
            <div><h4>Yeast</h4> {beer.ingredients.yeast}</div>
          </div>
          <br />
          <div>
            <h3>Method</h3>
            <p>Fermentation: {beer.method.fermentation.temp.unit} {beer.method.fermentation.temp.value}</p>
          </div>
          <br />
          <p>PH: {beer.ph}</p>
          <p>SRM: {beer.srm}</p>
          <p>Tagline: {beer.tagline}</p>
          <br /> 
          <MyBtn style={{marginBottom: '3rem'}} onClick={() => setVisible(false)}>Exit</MyBtn>
        </div>
      </div>
    </div>
  )
}

export default ModalBeer