import React from 'react';
import PointVie from '../pointVie/PointVie';
import './Pokemon.css';

const Pokemon = ({ pokemon }) => {

  return (
    <>
      <PointVie pokemon={pokemon} />
      <img className='img-poke' id={pokemon.nom} src={pokemon.photo} alt={pokemon.nom} />
      <div id='nom-poke'>{pokemon.nom}</div>
    </>
  )
}

export default Pokemon;