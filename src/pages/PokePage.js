import React, { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { Pokedex } from  'pokeapi-js-wrapper';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { useNavigate } from 'react-router-dom';
import { useLottie } from 'lottie-react'
import pokeLoad from '../imgs/animation_lkmvphvy.json'

import Radar from 'react-d3-radar';
import '../App.css'

                                                                                                  
const typeImgs = { //use type as index to fetch the img url
  'grass': `https://naramsim.github.io/Colosseum/images/types/grass.svg`,
  'normal': `https://naramsim.github.io/Colosseum/images/types/normal.svg`,
  'fire': `https://naramsim.github.io/Colosseum/images/types/fire.svg`,
  'water': `https://naramsim.github.io/Colosseum/images/types/water.svg`,
  'electric': `https://naramsim.github.io/Colosseum/images/types/electric.svg`,
  'ice': `https://naramsim.github.io/Colosseum/images/types/ice.svg`,
  'fighting': `https://naramsim.github.io/Colosseum/images/types/fighting.svg`,
  'poison': `https://naramsim.github.io/Colosseum/images/types/poison.svg`,
  'ground': `https://naramsim.github.io/Colosseum/images/types/ground.svg`,
  'flying': `https://naramsim.github.io/Colosseum/images/types/flying.svg`,
  'psychic': `https://naramsim.github.io/Colosseum/images/types/psychic.svg`,
  'bug': `https://naramsim.github.io/Colosseum/images/types/bug.svg`,
  'rock': `https://naramsim.github.io/Colosseum/images/types/rock.svg`,
  'ghost': `https://naramsim.github.io/Colosseum/images/types/ghost.svg`,
  'dark': `https://naramsim.github.io/Colosseum/images/types/dark.svg`,
  'dragon': `https://naramsim.github.io/Colosseum/images/types/dragon.svg`,
  'steel': `https://naramsim.github.io/Colosseum/images/types/steel.svg`,
  'fairy': `https://naramsim.github.io/Colosseum/images/types/fairy.svg`
} 

const PokePage = () => {
  const { state } = useLocation();
  const { pokedexName, pokedexURL } = state;

  const [pokemons, setPokemons] = useState([]);
  const pokedex = useMemo( () => new Pokedex({
    cache: true,
    // cacheImages: true
  }), [])

  const getPokemons = async() => {
    //fetch data for pokemons
    const data = await pokedex.getPokedexByName(pokedexName);
    const accEntry = await pokedex.getPokedexByName('national');

    console.log({data})

    for(let i=0; i<data.pokemon_entries.length; i++){
      const trueEntry = accEntry.pokemon_entries.find( d => {
        if(d.pokemon_species.name === data.pokemon_entries[i].pokemon_species.name)
          return d.entry_number;
      })

      //if img still look garbage switch from .gif to .png
      setPokemons( (oldList) => [...oldList, {
        name: data.pokemon_entries[i].pokemon_species.name,
        entry_num: trueEntry.entry_number,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/showdown/sprites/pokemon/${trueEntry.entry_number}.png`
      }])
    }

  }

  console.log(pokemons)

  useEffect(()=> {
    getPokemons();
  },[])

  const nav = useNavigate()

  return (
    <>
        <div className='p-3 mb-4' style={{display: 'flex', justifyContent: 'space-around'}}> 
          <button className='btn btn-outline-dark' style={{height: '50px'}} onClick={()=> nav('/')}>Home</button>
          <p className='display-3' data-testId='pokedexName'>{pokedexName}</p>
          <button className='btn btn-outline-dark' style={{height: '50px'}} onClick={()=> nav('/')}>Back</button>
        </div>
      {/* render pokemon components */}
      <div className='pokemonContainer' data-testid='poke_container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        { 
          pokemons.map( (poke, ind) => <PokeComponent data-testid={`poke_comp`+ind} key={poke.entry_num} poke={poke} /> )
        }
      </div>
    </>
  )
}
//component for basic pokemon info
const PokeComponent = ({poke}) => {
  // const [show, setShow] = useState(false);
  const [pokeDetails, setPokeDetails] = useState(null);
  const [show, setShow] = useState(false);

  const pokedex = useMemo( () => new Pokedex({
    cache: true,
  }), [])


  const options = {
    animationData: pokeLoad,
    loop: true,
  };
  const Lottie = useLottie(options);

  const closeModal = () => {
    setShow(false);
  }
  async function viewDetailsHandler(){
    //show modal
    setShow(true);
    //get general info for pokemon
    const data = await pokedex.getPokemonByName(poke.name);//everything except evos and weakness
    console.log('data: ',data)

    //get pokemon color
    const res_color = await pokedex.getPokemonSpeciesByName(poke.name);
    console.log('color: ',res_color)
    const poke_color = res_color.color.name;

    //get fighting strat based on type
    const types = data.types.map(x => x.type.name)
    const typeStrat = await Promise.all(types.map(async(x) => {
      const hold = await pokedex.getTypeByName(x)
      console.log('getTypeByName: ', hold)
      return hold.damage_relations;
    }));
    console.log('typeStrat: ',typeStrat)

    console.log({data, typeStrat, poke_color})
    setPokeDetails({data, typeStrat, poke_color});
  }
  function defaultStillImage(ev){
    ev.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/showdown/sprites/pokemon/${poke.entry_num}.png`
    console.log('fixed img src');
  }
  let customModal='';
  console.log({pokeDetails})

  if(pokeDetails){
    try{
      Lottie.destroy()	
      const RadarDomainArr = [
        pokeDetails.data.stats[0].base_stat,
        pokeDetails.data.stats[1].base_stat,
        pokeDetails.data.stats[2].base_stat,
        pokeDetails.data.stats[3].base_stat,
        pokeDetails.data.stats[4].base_stat,
        pokeDetails.data.stats[5].base_stat
      ]
      const colorSet = {
        red: '#FF7F50',
        green: '#90EE90',
        brown: '#B8860B',
        blue: '#00CED1',
        yellow: '#FFD700',
        black: '#191970',
        white: '#FFDEAD',
        purple: '#9932CC',
        gray: '#A9A9A9',
        pink: '#FFB6C1'
      }
      let colorBg = colorSet[pokeDetails.poke_color];

      customModal = (
        <div className="modal" tabIndex="-1" style={{display: 'block'}}>
          <div className="modal-dialog modal-xl ">
            <div className="modal-content mx-auto" style={{background: `linear-gradient(25deg, ${colorBg} 15%, black 100%)`}}>
              <div className="modal-header" style={{display: 'flex', flexDirection: 'column'}}>
                <h2 className="modal-title display-3" style={{color: 'white'}}>{poke.name}</h2>
              </div>
              <div className="modal-body" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div id={'p_'+poke.name} style={{margin: '50px', padding:'0p'}}> 
                  <img style={{width: '200px', height: '200px'}} src={`https://raw.github.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.entry_num}.png`} />
                  <h5 style={{marginTop: '30px'}}><i style={{textAlign: 'center', marginTop: '40px', color: 'white'}}>0{poke.entry_num}</i></h5>
                </div>
                <div style={{marginTop: '30px'}}>
                  <div id={'p_'+poke.name}  style={{display: 'block', margin: 'auto', width: '300px', height: '300px'}}>
                    <Radar
                      width={200}
                      height={200}
                      padding={5}
                      marginTop={20}
                      domainMax={Math.max(...RadarDomainArr)}

                      data={{
                        variables: [
                          {key: 'HP', label: 'HP'},
                          {key: 'Attack', label: 'Attack'},
                          {key: 'Defense', label: 'Defense'},
                          {key: 'Special-Attack', label: 'Special-Attack'},
                          {key: 'Special-Defense', label: 'Special-Defense'},
                          {key: 'Speed', label: 'Speed'},
                        ],
                        sets: [
                          {
                            // key: 'me',
                            // label: 'My Scores',
                            values: {
                              'HP': pokeDetails.data.stats[0].base_stat,
                              'Attack': pokeDetails.data.stats[1].base_stat,
                              'Defense': pokeDetails.data.stats[2].base_stat,
                              'Special-Attack': pokeDetails.data.stats[3].base_stat,
                              'Special-Defense': pokeDetails.data.stats[4].base_stat,
                              'Speed': pokeDetails.data.stats[5].base_stat,
                            }
                          }
                        ],
                      }}
                    />
                  </div>
                  <h5 style={{marginTop: '50px', textAlign: 'left', color: 'white'}}>Height: {pokeDetails.data.height}'</h5>
                  <hr/><h5 style={{textAlign: 'left', color: 'white'}}>Weight: {pokeDetails.data.weight} lbs</h5>
                  <hr/><h5 style={{textAlign: 'left', color: 'white'}}>Abilities: {pokeDetails.data.abilities.map(x => x.ability.name).join(', ')}</h5>
                  <hr/><h5 style={{textAlign: 'left', color: 'white'}}>Type:  
                  {pokeDetails.data.types.map(x => { 
                    return <img key={x.type.name} style={{marginLeft: '10px'}} src={`${typeImgs[x.type.name]}`} />
                  })} </h5>
                  <hr/>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <table>{/* x2 damage from */}
                    <tbody><tr>
                      <th style={{color: 'white'}}>Weakest Against:  </th>
                      <td> 
                        {console.log(pokeDetails.typeStrat)}
                        {pokeDetails.typeStrat.map( w => {
                          return w.double_damage_from.map(x => 
                            <img key={x.name} style={{margin: '5px'}} src={`${typeImgs[x.name]}`} />
                          )
                        })} 
                      </td>
                    </tr></tbody>
                    </table>
                    <table>{/* x2 damage to */}
                    <tbody><tr>
                      <th style={{color: 'white'}}>Strongest Against:  </th>
                      <td> 
                        {console.log(pokeDetails.typeStrat)}
                        {pokeDetails.typeStrat.map( w => {
                          return w.double_damage_to.map(x => 
                            <img key={x.name} style={{margin: '5px'}} src={`${typeImgs[x.name]}`} />
                          )
                        })} 
                      </td>
                    </tr></tbody>
                    </table>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}/*data-bs-dismiss="modal"*/ style={{color: 'white'}}>Close</button>
              </div>
            </div>
          </div>
        </div>)
    }catch(e){
      console.error(e)
    }
  }else{
    customModal =
    <div className="modal" tabIndex="-1" id={poke.name + 'Modal'} style={{ backgroundColor: 'transparent', border: 'none', marginTop: '100px', display: 'block'}}>
    <div className="modal-dialog modal-sm" style={{ backgroundColor: 'transparent', border: 'none'}}>
      <div className="modal-content mx-auto" style={{backgroundColor: 'transparent', border: 'none'}}>
          <div className='modal-body'>{Lottie.View}</div>
      </div>
    </div>
    </div>
  }

  return (
    <>
      <div className="card" style={{margin: '20px', borderRadius: '25px', background: 'transparent'}}>
        <img className="card-img-top" onError={defaultStillImage} src={poke.img} style={{width: '300px', height: '350px',  imageRendering: 'crisp-edges' }} />
        <div className="card-body">
          <p className='display-5'>{poke.name}</p>
          <p><i>{poke.entry_num}</i></p>
          <button type="button" className="btn btn-outline-dark" 
          data-testid={'viewDetails' + poke.entry_num} //data-bs-toggle="modal" data-bs-target= {'#'+ poke.name + 'Modal'} 
          onClick={viewDetailsHandler}>
            View Details
          </button>
        </div>
      </div>
      {show ? customModal : null}
    </>
  );

}

export default PokePage