import './App.css'; 
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'; 
import React from 'react';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Outlet/>
      <Navbar/>
    </ApolloProvider >
  );
}

export default App;
