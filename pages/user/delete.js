import { Component } from 'react'
import { deregisterUser } from '../../lib/auth' // todo: change this to deleteUser
import Layout from '../../components/MyLayout.js' // todo: not sure if I need a Layout
import { Form, Button, Message } from 'semantic-ui-react'

class Delete extends Component {
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
       //ß const password_confirmation = event.target.elements.password_confirmation.value;

        if (!email || !password) {
            this.setState({
                error: "Please complete all the fields."
            });
        // } else if (password != password_confirmation) {
        //     this.setState({
        //         error: "Passwords do not match."
        //     }) 
        } else {
            const error = await deregisterUser(email) 
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
                <h1>Delete Profile</h1>
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
                    <Button type="submit">Delete Account</Button>

                </Form>
            </Layout>
        )
    }

}

export default Delete