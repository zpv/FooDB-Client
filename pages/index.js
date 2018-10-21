import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

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
            {props.shows.map(({show}) => (
                <PostLink key={show.id} id={show.id} name={show.name}></PostLink>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('ENDPOINT')
    const data = await res.json()
  
    console.log(`Data fetched. Count: ${data.length}`)
  
    return {
      shows: data
    }
  }

export default Index