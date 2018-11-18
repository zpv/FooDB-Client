import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Grid, Card, Icon } from 'semantic-ui-react'

const restaurantInfoCardStyle = {
    margin: '0 auto'
}

const Content = (props) => (
    <Card fluid>
    <Card.Content>
        <Card.Header>{props.review.title}</Card.Header>
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

const RestaurantReviews = (props) => (
    <Layout auth={props.auth}>
    <h1>{props.name} Reviews</h1>
    <Grid stackable columns={2} divided>
        <Grid.Column width={12}>
        
        <Card.Group>
        {props.data.map(review => (
            <Content key={review.review_id} review={review}/>
        ))}
        </Card.Group>
        
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
        </Grid.Column>
        </Grid>
    </Layout>
)

RestaurantReviews.getInitialProps = async function (context) {
    const { id, name } = context.query
    const {data} = await get(`/restaurants/${id}/rest-reviews`)
    const auth = isAuthenticated(context);

    return { data, name, auth }
}

export default RestaurantReviews