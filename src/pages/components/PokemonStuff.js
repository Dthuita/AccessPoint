import React, { useMemo, useState, useEffect } from 'react';
import { Pokedex } from  'pokeapi-js-wrapper';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

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
        <div className='p-3 mb-1 pt-3'>
            <p className='display-3'>Choose a Pokedex:</p>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {
                pokedexData.map( (item) => {
                    return (
                        <div key={item.name} style={{margin: '10px', padding: '20px'}}>
                            <Button style={{borderRadius: '25px', padding: '10px'}} data-testid='pokedexButton' variant="outline-light" onClick={ () => {
                                    selectPokedex(item)
                                    //selectedPokedex state var doesn't update fast enough??
                                    nav('/pokemon', {state: {pokedexName: item.name, pokedexURL: item.url}})
                            } }>
                                <h2>{item.name}</h2> 
                            </Button>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default PokemonStuff;