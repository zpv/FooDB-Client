import Layout from '../../components/MyLayout.js'
import { get } from '../../lib/request'
import Link from 'next/link'

import { getStatus } from '../../services/orderApi'
import redirect from '../../lib/redirect'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../../lib/auth'
import { Divider, Card, Icon, Button } from 'semantic-ui-react';
import { getCookieFromBrowser } from '../../lib/session.js';

const OrderDetailsBtn = (props) => (
    <Link href={'/order?id=' + props.order.order_id} as={'/order/' + props.order.order_id}>
    <Button basic color='gray'>
      Order Details
    </Button>
    </Link>
)

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
        <Icon name='dollar' />
        <a>Total: {props.order.subtotal}</a>
    </Card.Content>
    <Card.Content extra>
    {  (props.restReviews.filter(rev => rev.restaurant_id === props.order.restaurant_id)
            .length > 0 && props.order.delivered_datetime)?
            <>

            <OrderDetailsBtn order={props.order}/>
            <Link href={'/user/review?rid='+props.order.restaurant_id}>

          <Button  basic color='green'>
              Review the Restaurant
            </Button>
            </Link></> : <OrderDetailsBtn order={props.order}/>
    }
     </Card.Content>

    </Card>
)

const Index = (props) => (
    <Layout auth>
        <h1>User Profile</h1>
        <b>Name: </b>{props.data.name}<br/>
        <b>Email: </b>{props.data.email}<br/>
        <b>Phone #: </b>{props.data.phone_num}<br/>
        <b>Address: </b>{props.data.address}<br/><br/>
        <Link href="/user/edit">
            <Button>Edit Profile</Button>  
        </Link>
        <Divider/>
        <h1>Your Past Orders</h1>
        <Card.Group stackable>
        {props.orders.map(order => (
            <Order key={order.order_id} order={order} data={props.data} restReviews={props.restReviews}/>
        ))}
        </Card.Group>
        
    </Layout>
)

Index.getInitialProps = async function (context) {
    if (redirectUnauthenticated('/user/register', context)) {
        return {}
    }

    const { data } = await get('/users', getJwt(context))
    const orders = (await get('/orders/me', getJwt(context))).data
    const restReviews = (await get(`/users/${data.user_id}/rest-reviews`)).data

    return { data, orders, restReviews }
}

export default Index