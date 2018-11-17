import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated, getJwt } from '../lib/auth'
import { Grid, Card, Icon, Divider, Header } from 'semantic-ui-react'
import { getStatus } from '../services/orderApi'
import Maps from '../components/MapContainer'

const Item = (props) => (
  <span>
    <b>{props.name}</b><span style={{float: 'right'}}>${props.price}</span>
  </span>
)

const Content = (props) => (
    <Card fluid>
    <Card.Content>
        <Card.Header>{props.order_item.menuitem_name}</Card.Header>
        <Card.Meta>{props.review.stars} <Icon name="star"/></Card.Meta>
        <Card.Description>
        {props.review.content}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
                <Icon name='user' />
                Temp
          </Card.Content>

    </Card>
)

const Order = (props) => (
    <Layout auth={props.auth}>
    <Header as='h1' icon='food' content={`Order #${props.order.order_id} – ${props.order.name}`} />
  
    <Grid stackable columns={2} divided>
        <Grid.Column width={4}>
        {props.order_items.map(order_item => (
            <div key={order_item.line_number}>
              <Item  name={order_item.menuitem_name} price={order_item.price}></Item>
              <Divider/>
            </div>
          ))}
          <div style={{display: 'flex'}}>
          <span style={{width: '100%', textAlign: 'right', alignSelf: 'center'}}><b>Subtotal:</b> ${props.subtotal.toFixed(2)}</span>
          </div>

        
        </Grid.Column>
        <Grid.Column floated="right" width={12}>
        <Header as='h2'>{getStatus(props.order)}</Header>
        <Maps lat={props.order.lat} lng={props.order.lon} name={props.order.name}/>
        </Grid.Column>
        </Grid>
    </Layout>
)

Order.getInitialProps = async function (context) {
    const { id } = context.query
    const { data } = await get(`/orders/${id}`, getJwt(context))
    const { order, order_items, subtotal } = data
    const auth = isAuthenticated(context);

    return { order, order_items, auth, subtotal }
}

export default Order