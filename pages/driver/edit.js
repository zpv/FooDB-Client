import { Component } from 'react'
import { editDriver } from '../../services/userApi'
import { get } from '../../lib/request'
import { Form, Button, Message } from 'semantic-ui-react'
import { getJwt, isAuthenticated, redirectUnauthenticated } from '../../lib/auth'
import Router from 'next/router'

import Layout from '../../components/MyLayout.js'

class EditDriver extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        };
    }
    
    static async getInitialProps(context) {
      const jwt = getJwt(context)
      const { id } = context.query
     const data  = (await get(`/drivers/${id}`)).data
      return { id, data, jwt }
    }

    handleSubmit = async event => {
        // event.preventDefault();
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
            console.log("HUH")
            const data = await editDriver(name, email, password, phone, address, this.props.jwt)
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                Router.push(`/driver?id=${this.props.id}`)
            }
        }
    }
    render() {
        return (
            <Layout auth did={this.props.id}>
                <h1>Edit Driver Profile</h1>
                {this.state.error && <Message negative>
                    <Message.Header>An error has occurred.</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>Full Name</label>
                    <input type="text" defaultValue={this.props.data.name} placeholder="Name" name="name" />
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input type="email" defaultValue={this.props.data.email} placeholder="Email" name="email" />
                    </Form.Field>
                    <Form.Field>
                    <label>Phone Number</label>
                    <input type="tel" defaultValue={this.props.data.phone_num} placeholder="Phone Number" name="phone" pattern="^\d{10}$"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Address</label>
                    <input defaultValue={this.props.data.address} type="text" placeholder="Address" name="address"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Your Password" name="password"/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password Confirmation</label>
                    <input type="password" placeholder="Re-enter Your Password" name="password_confirmation"/>
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </Layout>
        )
    }

}

export default EditDriver