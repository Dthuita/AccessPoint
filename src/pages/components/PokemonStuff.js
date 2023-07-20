import React, { useMemo, useState, useEffect } from 'react';
import { Pokedex } from  'pokeapi-js-wrapper';
import { useNavigate } from 'react-router-dom';

const PokemonStuff = () => {
    //rip images from online for pokedexes?? maybe

    const [pokedexData, setPokedexData] = useState([]);
    const [selectedPokedex, setselectedPokedex] = useState(null);
    const nav = useNavigate();


    const pokedex = useMemo( () => new Pokedex(), [])

    const fetchData = async() => {
        const hold = await pokedex.getPokedexsList()
        setPokedexData( hold.results );
        console.log(hold);
    }
    const selectPokedex = async(pokedexName) => {
        setselectedPokedex(pokedexName);
    }

    useEffect( () => {
        fetchData();
    }, [])

    return(
        <>
        <div> <h1>Choose a Pokedex: </h1> </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {
                pokedexData.map( (item) => {
                    return (
                        <div key={item.name} style={{margin: '10px', padding: '5px'}}>
                            <button data-testid='pokedexButton' onClick={ () => {
                                    selectPokedex(item)
                                    //selectedPokedex state var doesn't update fast enough??
                                    nav('/pokemon', {state: {pokedexName: item.name, pokedexURL: item.url}})
                                } 
                            } style={{borderRadius: '25px'}}>
                                <h2>{item.name}</h2> 
                            </button>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default PokemonStuff;