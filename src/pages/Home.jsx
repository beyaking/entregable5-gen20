import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'

const Home = () => {

   const dispatch =  useDispatch()
   const navigate = useNavigate()

const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerGlobal(e.target.name.value.trim()))
    e.target.name.value=''
    navigate('/pokedex')

}


  return (
    <div className='home__container'>
       <img className="image__home" src="Home/pokedex.png" alt="" /> 
       <h1 className='hello__text'> Hello trainer!</h1>
       <p className='home__label'>Enter your name to get started</p>

       <form onSubmit={handleSubmit} >
        <input className='search2' id='name' type="text" placeholder=' Your name...'/>
        <button className='buttom__search2 '>Start</button>
       </form>
       <div className="footer">
        <img src="./Home/footer.png" alt="" /> 

</div>
    </div>
    



  )
}

export default Home