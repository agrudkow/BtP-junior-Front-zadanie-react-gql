import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

const httpLink = new HttpLink({ uri: 'https://api.graphcms.com/simple/v1/swapi' })

const defaultOptions = {
  watchQuery: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  },
  mutate: {
    errorPolicy: 'all'
  },
};

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

const ApolloApp = () => (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
)

ReactDOM.render(<ApolloApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
