import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import Link from 'next/link'

import { getStatus, updateOrder } from '../services/orderApi'
import redirect from '../lib/redirect'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../lib/auth'
import { Divider, Card, Button } from 'semantic-ui-react';
import React, { Component } from 'react'

export default class RestaurantManagers extends Component {
  static async getInitialProps(context) {
    const { id } = context.query
    const { data } = await get(`/restaurants/${id}/orders`, getJwt(context))
  
    return { data }
  }

  constructor(props) {
    super(props)
    this.state = {
      orders: props.data,
    };  
  }
  
  removeOrder = async (id) =>{
  //  e.preventDefault()
    const newState = this.state;
    const index = newState.orders.findIndex(a => a.order_id === id);

    if (index === -1) return;
    newState.orders.splice(index, 1);

    this.setState(newState);
    await updateOrder(id, 'PREPARED') ;
  }

  render() {
    const Order = (props) => (
      <Card fluid>
      <Card.Content>
          <Card.Header>Order #{props.order.order_id} – {props.order.name}</Card.Header>
          <Card.Meta>{props.order.placed_datetime}</Card.Meta>
          <Card.Description>
          {getStatus(props.order)}
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button onClick={() => this.removeOrder(props.order.order_id)} basic color='green'>
              Complete Order
            </Button>
          </Card.Content>
      </Card>
    )

    return (
      <Layout auth>
        <h1>Your Restaurant's Open Orders</h1>
        <Card.Group stackable>
        {this.props.data.map(order => (
            <Order key={order.order_id} order={order}/>
        ))}
        </Card.Group>
      
      </Layout>
      
    )}
  }