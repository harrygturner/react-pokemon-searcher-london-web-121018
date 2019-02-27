import React, { useState } from 'react'
import { Card, Image } from 'semantic-ui-react'
import PokemonStats from './PokemonStats'

const PokemonCard = (props) => {
  const [imageClicked, setImageClicked] = useState(false)
  const pokemon = props.pokemon

  const handleClick = () => imageClicked ? pokemon.sprites.back : pokemon.sprites.front 
  
  return (
    <Card raised onClick={() => setImageClicked(!imageClicked)}>
        { pokemon.sprites 
          ? <Image src={handleClick()} alt="oh no!" /> 
          : null }
        <Card.Header>{pokemon.name}</Card.Header>
        <Card.Description>
        </Card.Description>
        { pokemon.stats 
          ? <PokemonStats stats={pokemon.stats} /> 
          : null }
    </Card>
  )
  
}

export default PokemonCard
