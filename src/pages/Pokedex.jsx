import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

const Pokedex = () => {

  const { trainer } = useSelector(state => state)
  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelected, setTypeSelected] = useState('All pokemons')

  const navigate = useNavigate()

  useEffect(() => {
    if (typeSelected !== "All pokemons") {
      // hacer la petición de los pokemons por tipo
      axios.get(typeSelected)
        .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
        .catch(err => console.log(err))
    } else {
      // hacer la petición de todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=999999999'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  }, [typeSelected]
  )

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
  },
    []
  )
  const handleSubmit = e => {
    e.preventDefault()
    const input = e.target.search.value.trim().toLowerCase()
    navigate(`/pokedex/${input}`)
  }
  const handleChange = e => {
    setTypeSelected(e.target.value)
    setPage(1)
  }
  // Lógica de paginación
  const [page, setPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(12)
  const initialPoke = (page - 1) * pokePerPage
  const finalPoke = page * pokePerPage
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

  return (
    <div>

<div className='container__banner'>
		
<img className='image3' src="./Home/banner.png" alt="" />
      
      <img className='image2' src="./Home/pokedex2.png" alt="" />
	</div>
       
      
     
      <h2 className='welcome'> <span className='name__trainer'>Welcome {trainer}</span>, here you can find your favorite pokemon.</h2>
      <div className='search__container'>
      <div className='input__container'>
      <form onSubmit={handleSubmit}>
        <input className='search' id='search' type="text"  placeholder=' Find a pokemon here...'/>
        <button className='buttom__search'>Search</button>
      </form>
      </div>
      <div className='select__container'>
      <select onChange={handleChange} className="select__pkm">
        <option value='All pokemons'>All pokemons</option>
        {
        types?.map(type =>(
        <option key={type.url} value={type.url}>{type.name}
        </option>
        ))
        }
      </select>
      </div>
      </div>
      <Pagination
      page = {page}
      maxPage={maxPage}
      setPage={setPage}
      />
      <div className='poke-container'>
        {pokemons?.slice(initialPoke, finalPoke).map(poke => (
          <PokeCard
          key = {poke.url}url={poke.url}
          />
        )
        )
                    }
      </div>
      <Pagination
      page={page}
      maxPage={maxPage}
      setPage={setPage}/>
    </div>)
}
export default Pokedex