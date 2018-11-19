import { Component } from 'react'
import { deleteUser } from '../../services/userApi' // todo: change this to deleteUser
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
        if (redirectUnauthenticated('/user/register', context)) {
          return {}
        }
        const jwt = getJwt(context)
        return { jwt }
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
<<<<<<< HEAD
            const error = await deregisterUser(email) 
            if (error) {
=======
            const data = await deleteUser(password, this.props.jwt) 
            if (data.error) {
>>>>>>> a1135970145f4fa917eae0123575afd46c56e99b
                this.setState({
                    error: data.error
                });
            } else {
                signOut()
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