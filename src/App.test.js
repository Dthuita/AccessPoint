// import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/jest-dom';
//api
import Pokedex from 'pokeapi-js-wrapper';
//component
import App from './App';
 
jest.mock('pokeapi-js-wrapper', () => {
  return({
    Pokedex: function() {
      return {
        getPokedexsList: function() {
          return Promise.resolve({results: [{name: "kanto"}, {name: "tokyo "}, {name: "migos "}]})
        },
        getPokedexByName: function(pokedexName) {
          return Promise.resolve({
            pokemon_entries: [
              {entry_number: 1, pokemon_species: {name: "Steve"}}, 
              {entry_number: 2, pokemon_species: {name: "Charizard"}},
              {entry_number: 3, pokemon_species: {name: "Mr. Mime"}}
            ]
          });
        },
        getPokemonByName: function(name) {
          return Promise.resolve({
            "abilities": [
              {
                "ability": {
                  "name": "limber",
                }
              },
              {
                "ability": {
                  "name": "imposter",
                }
              }
            ],
            name: "Pikachu",
            types: [{type: {name: "grass"}}],
            weight: 50,
            height: 50,
            stats: [{base_stat: 50}, {base_stat: 50}, {base_stat: 50}, {base_stat: 50}, {base_stat: 50}, {base_stat: 50}]
          })
        },
        getTypeByName: function(type) {
          return Promise.resolve({
            double_damage_from: [
              {name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/'},
              {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'},
              {name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/'},
              {name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/'},
              {name: 'ice', url: 'https://pokeapi.co/api/v2/type/15/'}
            ]
          })
        }

      }
    }
  })
});


describe('test for basic functionality', ()=> {
  it("renders without crashing", () => {
    render(<App />);
  });
})


describe('test for basic functionality for homepage', ()=> {
  beforeEach(async() => {
    await waitFor(() => {
      render(<App />)
    })
  })
  test('pokeApi fetch for pokedex names', async() => {
    // const pokedex = new Pokedex(); --> why does this not work??
    // const hold = await pokedex.getPokedexsList()
    // console.log(hold); --> should console log {results: [{name: "Region"}, {name: "Minecraft "}]}
  })
  test('that pokedex buttons render', async() => {
    const homeButtons = await screen.findAllByTestId('pokedexButton');
    expect(homeButtons).toHaveLength(3)
  })
  //fire click event and change pages test
  test('that pokedex buttons click function works', async() => {
    const clickedButton = await screen.findAllByTestId('pokedexButton');
    await waitFor(async () => {
      fireEvent.click(clickedButton[0]);
      screen.debug();
      await waitFor(async () => {
        expect(screen.getByTestId("jumbotronName")).toBeInTheDocument() 
        expect(screen.getByTestId("poke_comp")).toBeInTheDocument() 
      })
    })
  })
})

