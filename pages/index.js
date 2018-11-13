import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'

const PostLink = (props) => (
    <li>
        <Link as={`/restaurant/${props.id}`} href={`/restaurant?id=${props.id}&name=${props.name}`}>
            <a>{props.name}</a>
        </Link>
    </li>
)

const Index = (props) => (
    <Layout auth={props.auth}>
        <h1>Food Delivery</h1>
        <ul>
            {props.restaurants.map((restaurant) => (
                <PostLink key={restaurant.restaurant_id} id={restaurant.restaurant_id} name={restaurant.name}></PostLink>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function(context) {
    const {data} = await get('/restaurants/list')

    console.log(`Data fetched. Count: ${data.length}`)

    return {
        restaurants: data,
        auth: isAuthenticated(context)
    }
  }

export default Index