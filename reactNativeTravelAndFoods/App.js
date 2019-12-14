import React from 'react';
/**
|--------------------------------------------------
| Apollo
|--------------------------------------------------
*/
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
/**
|--------------------------------------------------
| React navigation
|--------------------------------------------------
*/
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
/**
|--------------------------------------------------
| Screens
|--------------------------------------------------
*/
import TravelsListScreen from './src/containers/TravelsList';
import TravelShowScreen from './src/containers/TravelShow';


const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjab55e1y058o0142o5nagl70',
});

function Application() {
  const RootApplication = createAppContainer(
    createStackNavigator({
      TravelsList: TravelsListScreen,
      TravelShow: TravelShowScreen,
    }, {
      initialRouteName: 'TravelsList',
    })
  );

  return (
    <ApolloProvider client={client}>
      <RootApplication />
    </ApolloProvider>
  );
}

export default Application;

