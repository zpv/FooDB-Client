import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import {get} from '../lib/request'

const PostLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
            <a>{props.name}</a>
        </Link>
    </li>
)

const Index = (props) => (
    <Layout>
        <h1>Food Delivery</h1>
        <ul>
            {props.restaurants.map((restaurant) => (
                <PostLink key={restaurant.restaurant_id} id={restaurant.restaurant_id} name={restaurant.name}></PostLink>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function() {
    const {data} = await get('/restaurants/list')
  
    console.log(`Data fetched. Count: ${data.length}`)

    return {
        restaurants: data
    }
  }

export default Index