import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Cart from '../components/Cart'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Grid, Card, Icon } from 'semantic-ui-react'

const restaurantInfoCardStyle = {
    margin: '0 auto'
}

const slugify = (str) => (
str.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')            // Trim - from end of text
)





const Restaurant = (props) =>  {
    let cart;
    const addToCart = (e, {name, price}) => {
        console.log(name, price)
        cart.addItem({name, price})
    }
    const Content = (props) => (
        <Card name={props.food.name} price={props.food.price} onClick={addToCart}>
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
    return (
  
    <Layout auth={props.auth}>
    <h1>Menu</h1>
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
                <Icon name='user' />
                <Link as={`/restaurant/${slugify(props.name)}/${props.id}/reviews`} href={`/restaurant-reviews?id=${props.id}&name=${props.name}`}>
                <a>22 Reviews</a>
                </Link>
            </Card.Content>
        </Card>

        <Cart ref={instance => cart = instance}></Cart>
        </Grid.Column>
        </Grid>
    </Layout>
)}

Restaurant.getInitialProps = async function (context) {
    const { id, name } = context.query
    const {data} = await get(`/restaurants/${id}/menu-items`)
    const auth = isAuthenticated(context);

    return { data, name, auth, id }
}

export default Restaurant