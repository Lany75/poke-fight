import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

import './App.css';
import Pokemon from './components/pokemon/Pokemon';

const initialStatePokemon = {
  nom: "",
  attack: 0,
  defense: 0,
  nbrPv: 0,
  photo: ""
}


const App = () => {
  const [pokemon1, setPokemon1] = useState(initialStatePokemon);
  const [pokemon2, setPokemon2] = useState(initialStatePokemon);
  const [tour, setTour] = useState(1);

  let numeroPoke1, numeroPoke2, firstPlayer;

  const getPokemonInfos = (numero, setPokemon) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then(reponse => {
        setPokemon({
          nom: reponse.data.name,
          attack: reponse.data.stats[1].base_stat,
          defense: reponse.data.stats[2].base_stat,
          nbrPv: reponse.data.stats[0].base_stat,
          photo: reponse.data.sprites.other.dream_world.front_default
        })
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }


  const combattre = () => {

    let numTour = tour;

    if (numTour % 2 === 1) {
      // tour impair : poke1 attack poke2
      pokeAttack(pokemon1, pokemon2, setPokemon2)
      numTour++;
      setTour(numTour);
    } else {
      //tour pair : poke2 attack poke1
      pokeAttack(pokemon2, pokemon1, setPokemon1);
      numTour++;
      setTour(numTour);
    }
  }

  const pokeAttack = (attaquant, defenseur, setPokemon) => {
    let attack = (attaquant.attack - defenseur.defense) <= 0 ? 1 : attaquant.attack - defenseur.defense;
    let pv = defenseur.nbrPv - attack;

    setPokemon({
      nom: defenseur.nom,
      attack: defenseur.attack,
      defense: defenseur.defense,
      nbrPv: pv > 0 ? pv : "KO",
      photo: defenseur.photo
    });

    if (pv <= 0) {
      pokeMort(defenseur.nom)
    }
  }

  const pokeMort = (nomPokemon) => {
    const pokemon = document.getElementById(nomPokemon);
    const btnFight = document.getElementById('btn-fight');
    const btnReinit = document.getElementById('btn-reinit');
    const divPv = document.getElementById('pv' + nomPokemon);
    const divResultat = document.getElementById('resultat');

    pokemon.classList.add('poke-mort');
    btnFight.classList.replace('visible', 'invisible');
    btnReinit.classList.replace('invisible', 'visible');
    divPv.style.backgroundColor = "red";
    divResultat.textContent = nomPokemon.toUpperCase() + ' a perdu le combat !!!';
  }

  const reinitialiser = () => {
    numeroPoke1 = Math.floor(Math.random() * Math.floor(151));
    numeroPoke2 = Math.floor(Math.random() * Math.floor(151));

    getPokemonInfos(numeroPoke1, setPokemon1);
    getPokemonInfos(numeroPoke2, setPokemon2);

    const btnFight = document.getElementById('btn-fight');
    const btnReinit = document.getElementById('btn-reinit');
    btnFight.classList.replace('invisible', 'visible');
    btnReinit.classList.replace('visible', 'invisible');

    const imgsPoke = document.getElementsByClassName('img-poke');
    for (let i = 0; i < imgsPoke.length; i++) {
      imgsPoke[i].classList.remove('poke-mort');
    }

    const divsPv = document.getElementsByClassName('nbr-pv');
    for (let i = 0; i < imgsPoke.length; i++) {
      divsPv[i].style.backgroundColor = "greenyellow";
    }

    setTour(1);

    const divResultat = document.getElementById('resultat');
    divResultat.textContent = '';
  }

  React.useEffect(() => {
    numeroPoke1 = Math.floor(Math.random() * Math.floor(151));
    numeroPoke2 = Math.floor(Math.random() * Math.floor(151));
    firstPlayer = Math.floor(Math.random() * Math.floor(2)) === 0 ? "pokemon1" : "pokemon2";
    console.log(firstPlayer);

    getPokemonInfos(numeroPoke1, setPokemon1);
    getPokemonInfos(numeroPoke2, setPokemon2);
  }, []);

  return (
    <div className="App">
      <div id="titre">POKE FIGHT !!!</div>
      <div id='pokemons'>
        <div id='mon-pokemon'>
          <Pokemon pokemon={pokemon1} />
        </div>
        <div id='pokemon-adversaire'>
          <Pokemon pokemon={pokemon2} />
        </div>
      </div>
      <div id='btn-fight' className="visible">
        <Button className="visible" variant="outlined" color="secondary" onClick={combattre}>Fight !!</Button>
      </div>
      <div id='btn-reinit' className="invisible">
        <Button variant="outlined" color="primary" onClick={reinitialiser}>Reinitialiser</Button>
      </div>

      <div id='resultat'></div>
    </div>
  );
}

export default App;
