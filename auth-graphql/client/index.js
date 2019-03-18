import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';

// Apollo client is the thing that makes the request to our graphql backend server
// This is the place where we can configure our graphql acts with our backend like fwding cookies for instance

// Network interface is an object allowing to configure what options Apollo Client will pass to our backend server
// by default ApolloClient assune that graphql is available at /graphql but when configuring networkInterface object this assumptions is gone so we need to specify the uri
// opts stands for options. credentials key/value pair says that you are making request to the same origin that the browser is currently on so it is safe to send cookies with the outgoing requests. It says the ApolloClient you should send along cookies when making requests to the backend server.

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
