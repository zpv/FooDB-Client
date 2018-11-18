import { Component } from 'react'
import { signInUser } from '../../lib/auth'
import Layout from '../../components/MyLayout.js'
import { Form, Button, Message } from 'semantic-ui-react'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value;

        if (!email || !password) {
            this.setState({
                error: "Please complete all the fields."
            });
        } else {
            const error = await signInUser(email, password)
            if (error) {
                this.setState({
                    error
                });
            }
        }
    }
    render() {
        return (
            <Layout>
                <h1>Sign in</h1>
                {this.state.error && <Message negative>
                    <Message.Header>An error has occurred.</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>
                        <label>Email</label>
                        <input type="email" placeholder="Email" name="email" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>

                </Form>
            </Layout>
        )
    }

}

export default SignIn