import Layout from '../../components/MyLayout.js'
import { get } from '../../lib/request'
import Link from 'next/link'

import { getDeliveryStatus, updateOrder } from '../../services/orderApi'
import redirect from '../../lib/redirect'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../../lib/auth'
import { Divider, Card, Button } from 'semantic-ui-react';
import React, { Component } from 'react'

export default class DriverManager extends Component {
  static async getInitialProps(context) {
    const { id } = context.query
    const { data } = await get(`/drivers/${id}/orders`, getJwt(context))
  
    return { data }
  }

  constructor(props) {
    super(props)
    this.state = {
      orders: props.data,
    };  
  }
  
  orderAction = async (id) =>{
  //  e.preventDefault()
    const newState = this.state;
    const index = newState.orders.findIndex(a => a.order_id === id);

    if (index === -1) return;

    if (!newState.orders[index].received_datetime) {
      newState.orders[index].received_datetime = true
      console.log('received!!')
      await updateOrder(id, 'RECEIVED') ;
    } else {
      newState.orders.splice(index, 1);
      await updateOrder(id, 'DELIVERED') ;

    }

    this.setState(newState);
  }

  render() {
    const Order = (props) => (
      <Card fluid>
      <Card.Content>
          <Card.Header>Order #{props.order.order_id} – {props.order.name}</Card.Header>
          <Card.Meta>{props.order.placed_datetime}</Card.Meta>
          <Card.Description>
          {getDeliveryStatus(props.order)}
          
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button onClick={() => this.orderAction(props.order.order_id)} basic color='green'>
              {props.order.received_datetime ? 'Mark as delivered' : 'Mark as picked up'}
            </Button>
          </Card.Content>
      </Card>
    )

    return (
      <Layout auth>
        <h1>Assigned Deliveries</h1>
        <Card.Group stackable>
        {this.props.data.map(order => (
            <Order key={order.order_id} order={order}/>
        ))}
        </Card.Group>
      
      </Layout>
      
    )}
  }
