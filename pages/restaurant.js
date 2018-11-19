import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Cart from '../components/Cart'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Grid, Card, Icon, Image } from 'semantic-ui-react'

import NProgress from 'nprogress'

const imageStyle = {
    maxHeight: '150px',
    objectFit: 'cover'
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
        NProgress.start()
    }
    const Content = (props) => (
        <Card name={props.food.name} price={props.food.price} onClick={addToCart}>
        <Card.Content>
            <Card.Header>{props.food.name}</Card.Header>
            <Card.Meta>{props.food.price}</Card.Meta>
            <Card.Description>
            {props.food.description}
            </Card.Description>
        </Card.Content>
        </Card>
    )
    return (
  
    <Layout auth={props.auth}>
    <h1>Menu</h1>
    <Grid stackable doubling columns={2} divided>
        <Grid.Column width={12}>
        
        <Card.Group stackable>
        {props.data.map(menuItem => (
            <Content key={menuItem.name} food={menuItem}/>
        ))}
        </Card.Group>
        
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
        {/* <Card.Group doubling stackable> */}
        <Card.Group stackable>
        <Card>
            <Image src={props.img_url} style={imageStyle} />
            <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.category}</span>
            </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user'/>
                <Link as={`/restaurant/${slugify(props.name)}/${props.id}/reviews`} href={`/restaurant-reviews?id=${props.id}&name=${props.name}`}>
                <a>{props.count}</a>
                </Link>
            </Card.Content>
        </Card>
        </Card.Group>
        <Card.Group stackable>
        <Cart ref={instance => cart = instance} restaurantId={props.id}></Cart>
        </Card.Group>  
        {/* </Card.Group> */}
        </Grid.Column>
        </Grid>
    </Layout>
)}

Restaurant.getInitialProps = async function (context) {
    const { id, name } = context.query
    const restaurant_data = (await get(`/restaurants/${id}`)).data
    const {data} = await get(`/restaurants/${id}/menu-items`)
    const auth = isAuthenticated(context);
    const count = await get(`/restaurants/${id}/reviews/count`)

    const {category, img_url} = restaurant_data

    return { data, name, auth, id, category, img_url, count}
}

export default Restaurant