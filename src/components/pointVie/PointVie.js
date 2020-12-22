import React from 'react';
import './PointVie.css';

const PointVie = ({ pokemon }) => {
  const idPoke = "pv" + pokemon.nom;
  return (
    <div className='nbr-pv' id={idPoke}>
      <div>PV</div>
      <div>{pokemon.nbrPv}</div>
    </div >
  )
}

export default PointVie;