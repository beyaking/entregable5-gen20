import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './styles/pokedexinfo.css'

const PokedexInfo = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(pokemon);
  return (
    <div>

<img className="poke-card__sprite__detail"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />

<article className={`poke-card_detail border__detail `}>

      <header className={`poke-card__header__detail bg-${pokemon?.types[0].type.name}`}>
        
      </header>
      <section className="poke-card__body__detail">
        
        <h3 className={`poke-card__name__detail color-${pokemon?.types[0].type.name}`}>{pokemon?.name} </h3>
        
        <h4 className={`poke-card__id__detail color-${pokemon?.types[0].type.name}`}>N.°{pokemon?.id}</h4>

        <ul className="poke-card__stats-container__datail">
            
              <li className="poke-card__stat">
                <span className="poke-card__label">Height</span>
                <span className={`poke-card__number `}>{pokemon?.height}</span>
              </li>

              <li className="poke-card__stat">
                <span className="poke-card__label">Weight</span>
                <span className={`poke-card__number `}>{pokemon?.weight}</span>
              </li>
            
          </ul>

          

          <ul className="poke-card__stats-container__datail">
            
              <li className="poke-card__stat">
                <span className="poke-card__label">Types</span>
                <ul className="poke-card__types-container">
        <li className={`poke-card__type badge-${pokemon?.types[0]?.type.name}`}>{pokemon?.types[0]?.type.name} </li>
        <li className={`poke-card__type badge-${pokemon?.types[1]?.type.name}`}>{pokemon?.types[1]?.type.name} </li>
        </ul>
              </li>
<li><p></p></li>


              <li className="poke-card__stat">
                
                <span className="poke-card__label">Abilities</span>
                <ul className="poke-card__types-container">
        <li className={`poke-card__type badge-unknown`}>{pokemon?.abilities[0]?.ability.name} </li>
        <li className={`poke-card__type badge-unknown`}>{pokemon?.abilities[1]?.ability.name} </li>
        </ul>
              </li>
            
          </ul>

       
        
      </section>
      <h3 className={`poke-card__name__detail2 color-unknown `}>Stats </h3>
      <footer className="poke-card__footer">
        <div>
          <ul className="poke-card__stats-container">
            {pokemon?.stats.map((stat) => (
              <li className="poke-card__stat" key={stat.stat.name}>
                <span className="poke-card__label__detail">{stat.stat.name} - {stat.base_stat}%</span>
                <progress value={`${stat.base_stat}`} max="100" className="bar"></progress>
                
              </li>
            
            
            ))}
          </ul>

          
        </div>

        <h3 className={`poke-card__name__detail2 color-unknown `}>Movements </h3>

        <ul className="poke-card__stats-container2 ">
            {pokemon?.moves.map((move) => (
              <li className="poke-card__stat" key={move.move.name}>
                <span className="badge-shadow">{move.move.name}</span>
               
                
              </li>
            
            
            ))}
          </ul>

        <div>
          

          
        </div>

      </footer>
    </article>

     
    </div>
  );
};
export default PokedexInfo;
