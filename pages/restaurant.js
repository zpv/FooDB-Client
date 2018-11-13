import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'

const Content = (props) => (
    <div>
        <b>{props.food.name} </b>
        {props.food.price} <br></br>
        {props.food.description}
        <style jsx>{`
            div {
                margin-bottom: 5px;
            }
        `}
            
        </style>
    </div>
)

const Restaurant = (props) => (
    <Layout auth={props.auth}>
        <h1>{props.name}</h1>
        <ul>
        {props.data.map(menuItem => (
            <Content key={menuItem.name} food={menuItem}/>
        ))}
        </ul>
    </Layout>
)

Restaurant.getInitialProps = async function (context) {
    const { id, name } = context.query
    const {data} = await get(`/restaurants/${id}/menu-items`)
    const auth = isAuthenticated(context);

    return { data, name, auth }
}

export default Restaurant