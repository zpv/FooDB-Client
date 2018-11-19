import { Component } from 'react'
import { createReview } from '../../services/orderApi'
import Layout from '../../components/MyLayout.js'
import { get } from '../../lib/request'
import { getJwt } from '../../lib/auth'
import Router from 'next/router'
import { Form, Button, Message } from 'semantic-ui-react'

const slugify = (str) => (
    str.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')            // Trim - from end of text
    )    

class Review extends Component {
    static async getInitialProps(context) {
        const { rid } = context.query
        const { data } = await get(`/restaurants/${rid}/user-rest-reviews`)
        const jwt = getJwt(context)
      
        return { data, rid, jwt }
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
        const title = event.target.elements.title.value;

        if (!stars || !review || !title) {
            this.setState({
                error: "Please complete all the fields."
            });
        } else {
            // TODO: post the review
            const data = await createReview(this.props.rid, title, stars, review, this.props.jwt)
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                Router.push(`/restaurant/${slugify(this.props.data.name)}/${this.props.rid}/reviews`, `/restaurant-reviews?id=${this.props.rid}&name=${this.props.data.name}`)
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
                        <input type="text" placeholder="Stars" name="stars" />
                    </Form.Field>
                    <Form.Field>
                        <label>Review Title</label>
                        <input type="text" placeholder="Review Title" name="title" />
                    </Form.Field>
                    <Form.TextArea label='Review Body' placeholder='Tell us about your experience...' name='review' />
                    <Button type="submit">Submit</Button>

                </Form>
            </Layout>
        )
    }

}

export default Review