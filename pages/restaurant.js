import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Grid, Card } from 'semantic-ui-react'

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

const Restaurant = (props) => (
    <Layout auth={props.auth}>
    <h1>{props.name}</h1>
    <Grid stackable columns={2}>
        <Grid.Column floated='left' width={12}>
        
        <Card.Group>
        {props.data.map(menuItem => (
            <Content key={menuItem.name} food={menuItem}/>
        ))}
        </Card.Group>
        
        </Grid.Column>
        <Grid.Column floated='right' width={4}>
        
        </Grid.Column>
        </Grid>
    </Layout>
)

Restaurant.getInitialProps = async function (context) {
    const { id, name } = context.query
    const {data} = await get(`/restaurants/${id}/menu-items`)
    const auth = isAuthenticated(context);

    return { data, name, auth }
}

export default Restaurant