import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

//api
import { Pokedex } from 'pokeapi-js-wrapper';
//component
import HomePage from './pages/Homepage'
import App from './App';

const pokedex = new Pokedex();

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('test for basic functionality', ()=> {
  it("renders without crashing", () => {
    render(<App />);
  });
})


describe('test for basic functionality for homepage', ()=> {
  test('pokeApi fetch for pokedex names', async() => {
    const res = await pokedex.getPokedexsList();
    expect(res.results).toHaveLength(32);
  })
  test('that pokedex buttons render', async() => {
    render(<App />);
    const homeButtons = await screen.findAllByTestId('pokedexButton');
    expect(homeButtons).toHaveLength(32)
  })
  //fire click event and change pages test
  test('that pokedex buttons render', async() => {
    const user = userEvent.setup();
    console.log(user);
    render(<App />);
    const homeButtons = await screen.findAllByTestId('pokedexButton');
    const idk = await user.click(homeButtons);
    console.log(idk)
    // expect(homeButtons).toHaveLength(32)
  })
})

describe('test for functionality for pokePage', ()=> {
  // test.each([
  //   ['national'],
  //   ['kanto'],
  //   ['original-johto'],
  //   ['hoenn'],
  //   ['original-sinnoh'],
  //   ['extended-sinnoh'],
  //   ['updated-johto'],
  //   ['original-unova'],
  //   ['updated-unova'],
  //   ['conquest-gallery'],
  //   ['kalos-central'],
  //   ['kalos-coastal'],
  //   ['kalos-mountain'],
  //   ['updated-hoenn'],
  //   ['original-alola'],
  //   ['original-melemele'],
  //   ['original-akala'],
  //   ['original-ulaula'],
  //   ['original-poni'],
  //   ['updated-alola'],
  //   ['updated-melemele'],
  //   ['updated-akala'],
  //   ['updated-ulaula'],
  //   ['updated-poni'],
  //   ['letsgo-kanto'],
  //   ['galar'],
  //   ['isle-of-armor'],
  //   ['crown-tundra'],
  //   ['hisui'],
  //   ['paldea'],
  //   ['teal-mask'],  
  //   ['indigo-disk'],
  // ])('pokeApi fetch for pokemon in %s pokedex', async(s) => {//unessacary test on api??
  //   const res = await pokedex.getPokemonByName(s);
  //   expect(res.results).toHaveLength(32);
  // })
  // test('that pokedex buttons render', async() => {
  //   render(<App />);
  //   const homeButtons = await screen.findAllByTestId('pokedexButton');
  //   expect(homeButtons).toHaveLength(32)
  // })
  //fire click event and change pages test
})