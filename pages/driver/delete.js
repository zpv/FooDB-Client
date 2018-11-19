import { Component } from 'react'
import { deleteDriver } from '../../services/userApi' // todo: change this to deleteUser
import { get } from '../../lib/request'
import Layout from '../../components/MyLayout.js' // todo: not sure if I need a Layout
import { Form, Button, Message } from 'semantic-ui-react'
import { getJwt, redirectUnauthenticated, signOut } from '../../lib/auth'
class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        };
    }

    static async getInitialProps(context) {
        const { id } = context.query
        const data = (await get(`/drivers/${id}`)).data
        const jwt = getJwt(context)
        return { jwt, data}
      }
  

    handleSubmit = async event => {
        event.preventDefault();
        const password = event.target.elements.password.value
        const confirmpassword = event.target.elements.confirmpassword.value;

        if (confirmpassword != password) {
            this.setState({
                error: "Please complete all the fields."
            });
        } else {
            try {
                 await deleteDriver(this.props.data.email, this.props.jwt) 
                 Router.push(`/`)
            } catch (e) {
                this.setState({
                    error: "Something went wrong."
                });
            }
        }
    }

    render() {
        return (
            <Layout auth>
                <h1>Delete Profile</h1>
                {this.state.error && <Message negative>
                    <Message.Header>An error has occurred.</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" name="confirmpassword" />
                    </Form.Field>
                    <Button type="submit">Delete Account</Button>

                </Form>
            </Layout>
        )
    }

}

export default Delete