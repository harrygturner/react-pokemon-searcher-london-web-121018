import React from 'react'
import PokemonCard from '../components/PokemonCard'
import { Card } from 'semantic-ui-react'

const PokemonCollection = (props) => {
  return (
    <Card.Group itemsPerRow={6} >
      { props.pokemons.map( pokemon => {
        return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
      } ) }
    </Card.Group>
  )
}

export default PokemonCollection
