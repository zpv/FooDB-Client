import { Component } from 'react'
import { signUpDriver } from '../../lib/auth'
import { Form, Button, Message } from 'semantic-ui-react'

import Layout from '../../components/MyLayout.js'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const name = event.target.elements.name.value
        const email = event.target.elements.email.value
        const phone = event.target.elements.phone.value;
        const address = event.target.elements.address.value;
        const password = event.target.elements.password.value;
        const password_confirmation = event.target.elements.password_confirmation.value;
        if (!name || !email || !phone || !password || !address) {
            this.setState({
                error: "Please complete all the fields."
            });
        } else if (password != password_confirmation) {
            this.setState({
                error: "Passwords do not match."
            });
        } else {
            const error = await signUpDriver(name, email, password, phone, address)
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
                <h1>Register for A Driver Account</h1>
                {this.state.error && <Message negative>
                    <Message.Header>An error has occurred.</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>Full Name</label>
                    <input type="text" placeholder="Name" name="name" />
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input type="email" placeholder="Email" name="email" />
                    </Form.Field>
                    <Form.Field>
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Phone Number" name="phone" pattern="^\d{10}$"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Address</label>
                    <input type="text" placeholder="Address" name="address"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" />
                    </Form.Field>
                    <Form.Field>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password_confirmation"
                    />                    </Form.Field>
                    
                    <Button type="submit">Submit</Button>
                </Form>
            </Layout>
        )
    }

}

export default Register