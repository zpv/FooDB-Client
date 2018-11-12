import { Component } from 'react'
import { createUser } from '../../services/userApi'
import Layout from '../../components/MyLayout.js'
import Error from '../../components/Error.js'

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
        const password = event.target.elements.password.value;
        const password_confirmation = event.target.elements.password_confirmation.value;

        if (!name || !email || !phone || !password) {
            this.setState({
                error: "Please complete all the fields."
            });
        } else if (password != password_confirmation) {
            this.setState({
                error: "Passwords do not match."
            });
        } else {
            createUser(name, email, password, phone)
        }
    }
    render() {
        return (
            <Layout>
                <h1>Register for An Account</h1>
                {this.state.error && <Error message={this.state.error} />}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="name" name="name" />
                    <input type="email" placeholder="email" name="email" />
                    <input type="tel" placeholder="phone (no dashes)" name="phone" pattern="^\d{10}$"/>
                    <input type="password" placeholder="password" name="password" />
                    <input
                        type="password"
                        placeholder="confirm password"
                        name="password_confirmation"
                    />
                    <span>{`Password, 8 characters min`}</span>
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

export default Register