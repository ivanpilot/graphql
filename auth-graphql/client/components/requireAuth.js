// This is a High Order Component which is the best way to go in React to have in one place a logic to check if a user is currently logged in or not.
// It is a 'helper' component which acts more as a function and that we can call from any other component

import React from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import currentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) => {
    class RequireAuth extends React.Component {
        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.user) { // this data is only accessible because we hook up graphql to the component
                hashHistory.push('/login');
            }
        }

        render() {
            return (<WrappedComponent {...this.props} />)
        }
    }
    
    // We do not want to directly export the component so first we just run the query and attach it to the component
    return graphql(currentUserQuery) (RequireAuth);
}