import Layout from '../../components/MyLayout.js'
import { get } from '../../lib/request'
import Link from 'next/link'

import { getDeliveryStatus, updateOrder } from '../../services/orderApi'
import redirect from '../../lib/redirect'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../../lib/auth'
import { Divider, Card, Button, Icon, Image } from 'semantic-ui-react';
import React, { Component } from 'react'
import { getCookieFromBrowser } from "../../lib/session"

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
      <Layout auth did>
        <h1>Your Assigned Deliveries</h1>
        <Card.Group stackable>
        {this.props.data.map(order => (
            <Order key={order.order_id} order={order}/>
        ))}
        </Card.Group>
      
      </Layout>
      
    )}
  }



// const imageStyle = {
//   maxHeight: '150px',
//   objectFit: 'cover'
// }
// const slugify = (str) => (str.toString().toLowerCase()
//         .replace(/\s+/g, '-')           // Replace spaces with -
//         .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//         .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//         .replace(/^-+/, '')             // Trim - from start of text
//         .replace(/-+$/, '')            // Trim - from end of text
//     )

// const PostLink = (props) => (
//   <Link as={`/restaurant/${slugify(props.name)}/${props.id}`} href={`/restaurant?id=${props.id}&name=${props.name}`}>
//   <Card>
//           <Image src={props.img} style={imageStyle} />
//           <Card.Content>
//           <Card.Header>{props.name}</Card.Header>
//           <Card.Meta>
//               <span className='date'>{props.category}</span>
//           </Card.Meta>
//           </Card.Content>
//           <Card.Content extra>
//               <Link as={`/restaurant/${slugify(props.name)}/${props.id}/reviews`} href={`/restaurant-reviews?id=${props.id}&name=${props.name}`}>
//               <a>{props.rating} <Icon name="star"/></a>
//               </Link>
//           </Card.Content>
//       </Card>
//   </Link>
// )

//     const Index = (props) => (
//       <Layout auth={props.auth} did={props.did}>
//           <h1>Your Deliveries In Progress</h1>
//           <Card.Group>
          
//           {props.restaurants.map((restaurant) => (
//               <PostLink key={restaurant.restaurant_id} id={restaurant.restaurant_id} name={restaurant.name} rating={restaurant.rating} img={restaurant.img_url} category={restaurant.category}></PostLink>
//           ))}
          
//           </Card.Group>
//       </Layout>
//   )
  
//   Index.getInitialProps = async function(context) {
//       const {data} = await get('/restaurants/list')
//       var id = getCookieFromBrowser("did");
//       if (id === undefined) {
//           id = 0;
//       }
//       console.log(`Data fetched. Count: ${data.length}`)
  
//       return {
//           restaurants: data,
//           auth: isAuthenticated(context),
//           did: id
//       }
//     }
  
//   export default Index
