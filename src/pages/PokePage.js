import React, { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { Pokedex } from  'pokeapi-js-wrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Radar from 'react-d3-radar';


                                                                                                  
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

  // const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/showdown/sprites/pokemon/other/showdown/1.gif'//replace 1 with entry of pokemon

  const getPokemons = async() => {
    //fetch data for pokemons
    const data = await pokedex.getPokedexByName(pokedexName);
    const accEntry = await pokedex.getPokedexByName('national');

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

  return (
    <>
      <div className='jumbotron'>
        <h1 className='display-4'>{pokedexName}</h1>
      </div>

      <br/>

      {/* render pokemon components */}
      <div className='pokemonContainer' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        { 
          pokemons.map( (poke) => <PokeComponent key={poke.entry_num} poke={poke} /> )
        }
      </div>
    </>
  )
}
//component for basic pokemon info
const PokeComponent = ({poke}) => {
  const [show, setShow] = useState(false);
  const [pokeDetails, setPokeDetails] = useState(null);

  const pokedex = useMemo( () => new Pokedex({
    cache: true,
  }), [])

  async function viewDetailsHandler(){
    //display modal
    setShow(true);
    const data = await pokedex.getPokemonByName(poke.name);//everything except evos and weakness
    console.log(data);
    const types = data.types.map(x => x.type.name)
    const extraData = await Promise.all(types.map(async(x) => {
      const hold = await pokedex.getTypeByName(x)
      return hold.damage_relations;
    }));
    console.log(extraData);
    setPokeDetails({data, extraData});
  }
  function clearModalHandler(poke){
    //display modal
    setShow(false);
  }
  function defaultStillImage(ev){
    ev.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/showdown/sprites/pokemon/${poke.entry_num}.png`
    console.log('fixed img src');
  }
  // console.log(pokeDetails)
  let customModal;

  if(pokeDetails){
    const RadarDomainArr = [
      pokeDetails.data.stats[0].base_stat,
      pokeDetails.data.stats[1].base_stat,
      pokeDetails.data.stats[2].base_stat,
      pokeDetails.data.stats[3].base_stat,
      pokeDetails.data.stats[4].base_stat,
      pokeDetails.data.stats[5].base_stat
    ]
    customModal =
      <Modal size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={show}>
        <Modal.Header style={{justifyContent: 'center'}}>
          <Modal.Title className='display-3'>{poke.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <div style={{margin: '20px', padding:'0p'}}> {/*https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/home/10002.png*/}
            <img style={{width: '200px', height: '200px'}} src={`https://raw.github.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.entry_num}.png`} />
            <h5 className="font-weight-light font-italic" style={{textAlign: 'center', marginTop: '40px'}}>0{poke.entry_num}</h5>
          </div>
          <div style={{marginTop: '30px'}}>
            <div style={{display: 'block', margin: 'auto', width: '300px', height: '300px'}}>
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
            <h5 style={{marginTop: '50px'}}>Height: {pokeDetails.data.height}'</h5>
            <hr/><h5>Weight: {pokeDetails.data.weight} lbs</h5>
            <hr/><h5>Abilities: {pokeDetails.data.abilities.map(x => x.ability.name).join(', ')}</h5>
            <hr/><h5>Type:  
            {pokeDetails.data.types.map(x => { 
              return <img style={{marginLeft: '10px'}} src={`${typeImgs[x.type.name]}`} />
            })} </h5>
            <hr/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <table>{/* x2 damage from */}
              <tr>
                <th>Weakest Against:  </th>
                <td> 
                  {console.log(pokeDetails.extraData)}
                  {pokeDetails.extraData.map( w => {
                    return w.double_damage_from.map(x => 
                      <img style={{margin: '5px'}} src={`${typeImgs[x.name]}`} />
                    )
                  })} 
                </td>
              </tr>
              </table>
              <table>{/* x2 damage to */}
              <tr>
                <th>Strongest Against:  </th>
                <td> 
                  {console.log(pokeDetails.extraData)}
                  {pokeDetails.extraData.map( w => {
                    return w.double_damage_to.map(x => 
                      <img style={{margin: '5px'}} src={`${typeImgs[x.name]}`} />
                    )
                  })} 
                </td>
              </tr>
              </table>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={clearModalHandler} variant='secondary'>Close</Button>
        </Modal.Footer>
      </Modal> 
  }else{
    customModal =
    <Modal show={show} onHide={clearModalHandler}>
      Loading
    </Modal> 
  }

  return (
    <>
      <div style={{border: '2px solid blue', borderRadius: '20px', width: 'fit-content', padding: '10px', marginTop: '25px'}}>
        <img onError={defaultStillImage} src={poke.img} style={{width: '300px', height: '350px',  imageRendering: 'crisp-edges' }}></img>
        <h3>{poke.name}</h3>
        <h5>{poke.entry_num}</h5>
        <Button onClick={viewDetailsHandler} variant='primary'>View Details</Button>
      </div>
      {customModal}
    </>
  );

}

export default PokePage