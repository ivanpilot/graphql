import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends React.Component {

    // this component is quite interesting to think about
    // Unlike with Signup and Login that will send you to the right form, with logout you do not want to simply be redirected. First you need to be logged out which require to call a mutation to change the state of the user and only then you want to be redirected to the home page
    // Remember there are various ways to refresh our components following a mutation. One of them is to call querie which is well suited in this situation as right after the mutation returns it refreshes our data by refetching the data and all components associated with a given query will automatically refresh
    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query }]
        }); //passing an empty object as we have no variable to pass in

    }

    renderButtons() {
        const { loading, user } = this.props.data;

        if (loading) { return <div /> }

        if (user) {
            return (
                <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
            )
        } else {
            return (
                <div>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            )
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        className="brand-logo left"
                        to="/"
                    >
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default graphql(mutation) (
    graphql(query) (Header)
);