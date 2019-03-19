import React from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
        .catch(err => { 
            const errors = err.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        })
    }
    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}
                />
            </div>
        )
    }
}

export default graphql(mutation) (LoginForm);