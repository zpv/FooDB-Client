import React, { Component } from 'react'
import Router from 'next/router'
import { Card, Divider, Button } from 'semantic-ui-react'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../lib/auth'
import { createOrder } from '../services/orderApi'

const Item = (props) => (
  <span>
    <b>{props.name}</b><span style={{float: 'right'}}>${props.price}</span>
  </span>
)

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {items: [], count: 0, total: 0}
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  addItem = (item) => {
    item.key = this.state.count

    let items = [...this.state.items];
    items.push(item);

    let total = 0
    for (item of items) {
      total += parseFloat(item.price)
    }

    this.setState({total: total.toFixed(2)})

    this.setState({ items });
    this.setState((state)=>({count: state.count + 1}))
  }

  handleCheckout = async (e) => {
    e.preventDefault()
    if (redirectUnauthenticated('/user/register')) {
      return false
    }
    const {order_id} = await createOrder(this.props.restaurantId, this.state.items, getJwt()) 

    if (order_id) {
      Router.push(`/order/${order_id}`)
    }
  }

  render() {
    return (<>
      <Card>
        <Card.Content>
          <Card.Header>
            Your Cart
          </Card.Header>
          <Divider />
          {this.state.items.map(menuItem => (
            <div key={menuItem.key}>
            <Item  name={menuItem.name} price={menuItem.price}></Item>
            <Divider/>
            </div>
          ))}
          <div style={{display: 'flex'}}>
          <Button onClick={this.handleCheckout}>
          Checkout
         </Button>
          <span style={{width: '100%', textAlign: 'right', alignSelf: 'center'}}>Subtotal: ${this.state.total}</span>
          </div>
        </Card.Content>

        

      </Card>

      </>
    )
  }
}