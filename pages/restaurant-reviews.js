import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Grid, Card, Icon } from 'semantic-ui-react'

const restaurantInfoCardStyle = {
    margin: '0 auto'
}

const Content = (props) => (
    <Card>
    <Card.Content>
        <Card.Header>{props.food.name}</Card.Header>
        <Card.Meta>{props.food.price}</Card.Meta>
        <Card.Description>
        {props.food.description}
        </Card.Description>
        {/* <style jsx>{`
            div {
                margin-bottom: 5px;
            }
        `}
            
        </style> */}
    </Card.Content>
    </Card>
)

const RestaurantReviews = (props) => (
    <Layout auth={props.auth}>
    <h1>{props.name} Reviews</h1>
    <Grid stackable columns={2} divided>
        <Grid.Column width={12}>
        
        <Card.Group>
        {props.data.map(menuItem => (
            <Content key={menuItem.name} food={menuItem}/>
        ))}
        </Card.Group>
        
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
        <Card style={restaurantInfoCardStyle}>
            <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>
                <span className='date'>Test Placeholder</span>
            </Card.Meta>
            <Card.Description>Lorem ipsum</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Icon name='user' />
                22 Reviews
            </a>
            </Card.Content>
        </Card>
        </Grid.Column>
        </Grid>
    </Layout>
)

RestaurantReviews.getInitialProps = async function (context) {
    const { id, name } = context.query
    const {data} = await get(`/restaurants/${id}/menu-items`)
    const auth = isAuthenticated(context);

    return { data, name, auth }
}

export default RestaurantReviews