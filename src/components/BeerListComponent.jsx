import React, { useEffect, useState } from 'react'
import cl from './BeerListComponent.module.css'
import { useBeerStore } from '../zustand'
import BeerListItem from './beerListItem/BeerListItem'
import { FiEdit2 } from 'react-icons/fi'
import { IoCloseSharp } from 'react-icons/io5'
import { BsFillTrashFill } from 'react-icons/bs'
import ModalBeer from './modalBeer/ModalBeer'
import Loader from './UI/loader/Loader'
import MyBtn from './UI/btn/MyBtn'

function BeerListComponent() {
  const { beerList } = useBeerStore()
  const createBeerList = useBeerStore(state => state.createBeerList)
  const filterBeerList = useBeerStore(state => state.filterBeerList)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pageArr = [1, 2, 3, 4]
  const [currentPage, setCurrentPage] = useState(1)
  const downloadList = (page = currentPage) => {
    setCurrentPage(page)
    setLoading(true);
    (async () => {
      try {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=15`)
        const data = await response.json()
        // await new Promise(resolve => setTimeout(resolve, 500))
        createBeerList(data)
      } catch (err) {
        console.log(err)
        setError('Failed to load list')
      } finally {
        setLoading(false)
      }
    })()
  }

  useEffect(() => {
    downloadList()
  }, [])


  const [selectedItems, setSelectedItems] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  const [isOpenModalBeer, setIsOpenModalBeer] = useState(false)
  const [modalBeer, setModalBeer] = useState({})

  const trashBtnHolderClasses = [cl.btn_holder, cl.trash_btn_holder]

  const handleItemClick = id => {
    if (selectMode) {
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter(itemId => itemId !== id))
      } else {
        setSelectedItems([...selectedItems, id])
      }
    }
  }

  const openListItem = name => {
    (async () => {
      const response = await (await fetch(`https://api.punkapi.com/v2/beers?beer_name=${name}`)).json()
      setModalBeer(...response)
      setIsOpenModalBeer(true)
    })()
  }

  if (selectedItems.length) {
    trashBtnHolderClasses.push(cl.active)
  }

  const handleTrashClick = () => {
    if (selectedItems.length) {
      setSelectMode(false)
      filterBeerList(selectedItems)
      setSelectedItems([])
    }
  }

  if (isOpenModalBeer) {
    document.body.style.overflow = 'hidden'
  } else document.body.style.overflow = ''

  return (
    <div className={cl.BeerListComponent}>
      {error && <h2>{error}</h2>}
      {loading ? <Loader /> :
        <>
          {!beerList.length ? (
            error ? <h3>The list is empty</h3> : <><h3>The list is empty</h3><MyBtn onClick={() => downloadList()}>Download more</MyBtn></>
          ) : (
            <>
              {beerList.map(beer => (
                <BeerListItem
                  beer={beer}
                  selected={selectedItems.includes(beer.id)}
                  onClick={() => handleItemClick(beer.id, beer.name)}
                  id={beer.id}
                  key={beer.id}
                  img={beer.image_url}
                  name={beer.name}
                ><MyBtn style={selectMode ? { pointerEvents: 'none', scale: '0' } : null} onClick={() => openListItem(beer.name)}>Read more</MyBtn></BeerListItem>
              ))}
              <div className={cl.pagination}>
                {pageArr.map(p => <div style={currentPage === p ? { pointerEvents: 'none', color: 'white', background: 'coral' } : null} onClick={() => downloadList(p)} key={p}>{p}</div>)}
              </div>
              <div className={cl.btn_holder} onClick={() => {
                setSelectMode(!selectMode)
                setSelectedItems([])
              }}>
                {selectMode
                  ? <IoCloseSharp className={cl.edit_btn} />
                  : <FiEdit2 className={cl.edit_btn} />
                }
              </div>
              <div className={trashBtnHolderClasses.join(' ')}>
                <BsFillTrashFill onClick={() => handleTrashClick()} />
              </div>
            </>

          )
          }
        </>
      }
      {isOpenModalBeer
        &&
        <ModalBeer visible={isOpenModalBeer} beer={modalBeer} setVisible={setIsOpenModalBeer} />
      }
    </div>
  )
}

export default BeerListComponent