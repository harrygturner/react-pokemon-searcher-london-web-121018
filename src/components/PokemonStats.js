import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

const PokemonStats = (props) => {

   return props.stats.map( (stat, i) => {
      if( stat.name === 'hp' ) {
         return ( 
            <Card.Content extra key={i} >
               <Icon name="heartbeat" color='red' />
               {stat.value} {stat.name}
            </Card.Content>
         )
      }
   })
}

export default PokemonStats
