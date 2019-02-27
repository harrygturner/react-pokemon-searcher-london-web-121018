import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from '../components/PokemonForm'
import { Search, Label, Image } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: ['Pokemons are loading...'],
    isLoading: false,
    results: [],
    value: ''
  }

  fetchPokemon = () => {
    fetch('http://localhost:3000/pokemon')
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pokemons: data,
          results: data
        })
      })
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  resetComponent = () => this.setState({
    isLoading: false,
    results: [...this.state.pokemons],
    value: ''
  })

  handleSearchChange = (e, { value } ) => {
    this.setState({
      isLoading: true,
      value
    })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.pokemons, isMatch),
      })
    }, 300)
  }

  handleResultSearch = (e, { result }) => {
    this.setState({
      value: result.name
    })
  }

  resultRenderer = (pokemon) => {
    return (
      <div key={ pokemon.id }> 
        <Image spaced='right' style={{ position: 'relative', width: '20%' }} src={pokemon.sprites.front} /> 
        <Label content={ pokemon.name } /> 
      </div>
    );
  }

  handleNewPokemon = (newPokemon) => {
    this.setState({
      pokemons: [...this.state.pokemons, newPokemon],
      results: [...this.state.results, newPokemon]
    })
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <div style={{ margin: '0px 10px' }}>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search 
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          resultRenderer={this.resultRenderer}
          results={results}
          value={value}
          {...this.props}
        />
        <br />
        <PokemonCollection pokemons={this.state.results} />
        <br />
        <PokemonForm handleNewPokemon={this.handleNewPokemon} />
      </div>
    )
  }
}

export default PokemonPage
