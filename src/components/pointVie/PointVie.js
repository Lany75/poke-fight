import React from 'react';
import './PointVie.css';

const PointVie = ({ pokemon }) => {

  const idVieActuel = 'vie-actuel-' + pokemon.nom;
  const idViePerdue = 'vie-perdue-' + pokemon.nom;

  return (
    <div className='nbr-pv' >

      <div className='point-vie-actuel' id={idVieActuel}></div>
      <div className='point-vie-perdue' id={idViePerdue}></div>

    </div >
  )
}

export default PointVie;