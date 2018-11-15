import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated, getJwt } from '../lib/auth'
import { Grid, Card, Icon, Divider } from 'semantic-ui-react'

const restaurantInfoCardStyle = {
    margin: '0 auto'
}

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
    <h1>Order #{props.order.order_id} Details</h1>
    <Grid stackable columns={2} divided>
        <Grid.Column width={4}>
        {props.order_items.map(order_item => (
            <div key={order_item.line_number}>
              <Item  name={order_item.menuitem_name} price={order_item.price}></Item>
              <Divider/>
            </div>
          ))}
        {/* <Card.Group>
        {props.order_items.map(order_item => (
            <Content key={order_item.line_num} order={order_item}/>
        ))}
        </Card.Group> */}
        
        </Grid.Column>
        <Grid.Column floated="right" width={12}>
        </Grid.Column>
        </Grid>
    </Layout>
)

Order.getInitialProps = async function (context) {
    const { id } = context.query
    const { data } = await get(`/orders/${id}`, getJwt(context))
    const { order, order_items } = data
    const auth = isAuthenticated(context);

    return { order, order_items, auth }
}

export default Order