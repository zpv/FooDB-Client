import Layout from '../components/MyLayout.js'
import {get} from '../lib/request'

const Content = (props) => (
    <div>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium} />
    </div>
)

const Post = (props) => (
    <Layout>
       <Content show={props.show}/>
    </Layout>
)

Post.getInitialProps = async function (context) {
    const { id } = context.query
    const {data} = await get(`/restaurants/id/${id}`)

    console.log(`Fetched show: ${data.name}`)

    return { data }
}

export default Post