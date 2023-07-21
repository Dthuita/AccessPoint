import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'

//component
import App from './App';
 
// api 
import Pokedex from 'pokeapi-js-wrapper';
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
            name: "Pikachu",
            weight: 50,
            height: 50,            
            abilities: [
              { ability: {name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/'} },
              { ability: {name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/'} }
            ],            
            types: [
              {type: {name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/'}},
              // {type: {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'}}
            ],
            stats: [
              {base_stat: 50, stat: {name: 'hp'}}, 
              {base_stat: 50, stat: {name: 'attack'}}, 
              {base_stat: 50, stat: {name: 'defense'}}, 
              {base_stat: 50, stat: {name: 'special-attack'}},
              {base_stat: 50, stat: {name: 'special-defense'}}, 
              {base_stat: 50, stat: {name: 'speed'}}
            ]
          })
        },
        getTypeByName: function(type) {
          return Promise.resolve({
            damage_relations: {
              double_damage_from: [
                {name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/'},
                {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'},
                {name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/'},
                {name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/'},
                {name: 'ice', url: 'https://pokeapi.co/api/v2/type/15/'}
              ],
              double_damage_to: [
                {name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/'},
                {name: 'rock', url: 'https://pokeapi.co/api/v2/type/6/'},
                {name: 'water', url: 'https://pokeapi.co/api/v2/type/11/'}
              ]
            }
          })
        }

      }
    }
  })
});


describe('test that app loads', ()=> {
  test("renders without crashing", () => {
    render(<App />);
  });
  //if test crashes error is caught
})


describe('test for basic functionality for homepage and pokePage', () => {

  beforeEach(async() => {
    await waitFor(() => {
      render(<App />)
    })
  })
  // afterEach(async() => { //no point clearing mocks??? 
  //   jest.clearAllMocks();
  // })

  test('that pokedex buttons render', async() => {
    const homeButtons = await screen.findAllByTestId('pokedexButton');
    expect(homeButtons).toHaveLength(3)
  })
  // fire click event and change pages test
  test('that pokedex buttons click function works and next page loads', async() => {     
    screen.debug();
    const clickedButton = await screen.findAllByTestId('pokedexButton');
    await waitFor(async () => {
      fireEvent.click(clickedButton[0]);
      await waitFor(async () => {
        await expect(screen.getByTestId("jumbotronName")).toBeInTheDocument() 
        await expect(screen.getByTestId("poke_container")).toBeInTheDocument() 
        await expect(screen.getByTestId("viewDetails1")).toBeInTheDocument() 
      })
      screen.debug();//console.logs the pokepage with pokemons previews
      const viewDetailsButton = screen.getByTestId('viewDetails1');
      await waitFor(async () => {
        fireEvent.click(viewDetailsButton);
        // screen.debug();
        await waitFor(async () => {
          screen.debug();
          await expect(screen.getByText('01')).toBeInTheDocument();
          await expect(screen.getByText('Height', {exact: false})).toBeInTheDocument();
          await expect(screen.getByText('Abilities', {exact: false})).toBeInTheDocument();
        })
      })
    })
  })

})

describe('test for fail catches when load fails', () => {

  test('fails pokedex list fetch catch', async() => {
    
  })
})

