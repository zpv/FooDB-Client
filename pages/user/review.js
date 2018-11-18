import { Component } from 'react'
import { signInUser } from '../../lib/auth'
import Layout from '../../components/MyLayout.js'
import { get } from '../../lib/request'
import { Form, Button, Message } from 'semantic-ui-react'

class SignIn extends Component {
    static async getInitialProps(context) {
        const { rid } = context.query
        const { data } = await get(`/restaurants/${rid}`)
      
        return { data }
      }
    constructor(props) {
        super(props)
        this.state = {
            error: null
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const stars = event.target.elements.stars.value
        const review = event.target.elements.review.value;

        if (!stars || !review) {
            this.setState({
                error: "Please complete all the fields."
            });
        } else {
            // TODO: post the review
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
                <h1>{"Write a Review For "+this.props.data.name}</h1>
                {this.state.error && <Message negative>
                    <Message.Header>An error has occurred.</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                <Form onSubmit={this.handleSubmit}>
                    
                    <Form.Field>
                        <label>Stars</label>
                        <input type="stars" placeholder="stars" name="stars" />
                    </Form.Field>
                    <Form.Field>
                        <label>Review</label>
                        <input type="review" placeholder="review" name="review" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>

                </Form>
            </Layout>
        )
    }

}

export default SignIn