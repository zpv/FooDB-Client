import { Component } from 'react'
import { signIn } from '../../lib/auth'
import Layout from '../../components/MyLayout.js'
import Error from '../../components/Error.js'

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
            const error = await signIn(email, password)
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
                {this.state.error && <Error message={this.state.error} />}
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="email" name="email" />
                    <input type="password" placeholder="password" name="password" />
                    <button type="submit">Submit</button>
                    <style jsx>{`
                        form {
                            padding-bottom: 20px;
                            margin-bottom: 20px;
                            text-align: center;
                        }
                        h1 {
                            font-size: 20px;
                        }
                        span {
                            font-size: 10px;
                            color: red;
                        }
                        input,
                            button {
                            display: block;
                            margin: auto;
                            margin-top: 5px;
                            margin-bottom: 5px;
                        }
                  `}
                    </style>
                </form>
            </Layout>
        )
    }

}

export default SignIn