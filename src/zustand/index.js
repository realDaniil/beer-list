import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export const useBeerStore = create(
  devtools(
    persist(
      set => ({
        beerList: [],
        loading: false,
        error: null,
        setError: (err) => set({ error: 'list loading error: ', err }),
        setLoading: (boolean) => set({ loading: boolean }),
        createBeerList: (arr) => set({ beerList: arr }),
        filterBeerList: (arr) => set((state) => ({ beerList: state.beerList.filter((beer) => !arr.includes(beer.id)) })),
      }),
      {
        name: 'beer-list-storage'
      }
    )
  )
)