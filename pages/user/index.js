import Layout from '../../components/MyLayout.js'
import { get } from '../../lib/request'
import redirect from '../../lib/redirect'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../../lib/auth'

const Index = (props) => (
    <Layout auth>
        <h1>User Profile</h1>
        <b>Name: </b>{props.data.name}<br></br>
        <b>Email: </b>{props.data.email}<br></br>
        <b>Phone #: </b>{props.data.phone_num}<br></br>
    </Layout>
)

Index.getInitialProps = async function (context) {
    if (!redirectUnauthenticated(context, '/user/register')) {
        return {}
    }

    const { data } = await get('/users', getJwt(context))

    return { data }
}

export default Index