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
    </Card>
)

const Index = (props) => (
    <Layout auth did={props.id}>
        <h1>Driver Profile</h1>
        <b>Name: </b>{props.driverdata.name}<br/>
        <b>Email: </b>{props.driverdata.email}<br/>
        <b>Phone #: </b>{props.driverdata.phone_num}<br/>
        <b>Address: </b>{props.driverdata.address}<br/><br/>
        <Link href="/driver">
            <Button>Edit Profile</Button>  
        </Link>
        <Link href="/driver">
            <Button>Delete Profile</Button>
        </Link>    
        <Divider/>
        <h1>Your Past Deliveries</h1>
        <Card.Group stackable>
        {props.data.map(order => (
            <Order key={order.order_id} order={order} />
        ))}
        </Card.Group>
        
    </Layout>
)

Index.getInitialProps = async function (context) {
    const { id } = context.query
    const driverdata  = (await get(`/drivers/${id}`)).data
    const { data } = await get(`/drivers/${id}/orders`, getJwt(context))
  
    return { driverdata, data, id }
}

export default Index