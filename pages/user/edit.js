import { Component } from 'react'
import { signUp } from '../../lib/auth'
import { get } from '../../lib/request'
import { Form, Button, Message } from 'semantic-ui-react'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../../lib/auth'

import Layout from '../../components/MyLayout.js'

class EditUser extends Component {
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

      const { data } = await get('/users', getJwt(context))
      return data
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
            const error = await signUp(name, email, password, phone, address)
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
                <h1>Edit User Profile</h1>
                {this.state.error && <Message negative>
                    <Message.Header>An error has occurred.</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>Full Name</label>
                    <input type="text" value={this.props.name} placeholder="Name" name="name" />
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input type="email" value={this.props.email} placeholder="Email" name="email" />
                    </Form.Field>
                    <Form.Field>
                    <label>Phone Number</label>
                    <input type="tel" value={this.props.phone_num} placeholder="Phone Number" name="phone" pattern="^\d{10}$"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Address</label>
                    <input value={this.props.address} type="text" placeholder="Address" name="address"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input type="text" placeholder="Enter Your Password" name="password"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password Confirmation</label>
                    <input type="text" placeholder="Re-enter Your Password" name="password_confirmation"/>
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </Layout>
        )
    }

}

export default EditUser