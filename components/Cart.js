import React, { Component } from 'react'
import { Card, Divider, Button } from 'semantic-ui-react'

const Item = (props) => (
  <span>
    <b>{props.name}</b><span style={{float: 'right'}}>${props.price}</span>
  </span>
)

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (<>
      <Card>
        <Card.Content>
          <Card.Header>
            Your Cart
          </Card.Header>
          <Divider />
          <Item name='Item1' price='2.50'></Item>
          <Divider />
          <Item name='Item2' price='2.50'></Item>
          <Divider />
          <div style={{display: 'flex'}}>
          <Button>
          Checkout
         </Button>
          <span style={{width: '100%', textAlign: 'right', alignSelf: 'center'}}>Subtotal: $3.75</span>
          </div>
        </Card.Content>

        

      </Card>

      </>
    )
  }
}