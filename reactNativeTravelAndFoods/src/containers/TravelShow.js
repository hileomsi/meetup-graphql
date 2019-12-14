import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, FlatList } from 'react-native';

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const Page = styled.View`
  flex: 1;
  background-color: #F5F5F5;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 18px;
  margin-top: 15px;
`;

const Subtitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-top: 25px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #AAAAAA;
  padding-vertical: 15px;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  flex: 1;
`;

/**
|--------------------------------------------------
| GraphQL
|--------------------------------------------------
*/

const GET_COUNTRY = gql`
  query($id: ID!) {
    Country(id: $id) {
      name
      description
      foods {
        id
        name
        scores
      }
    }
  }
`;

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/
export default function TravelShow(props) {
  const { navigation } = props;
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: {
      id: navigation.getParam('id'),
    }
  });

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Aconteceu algum erro... I'm sorry</Text>;
  return (
    <Page>
      <Title>{data.Country.name}</Title>
      <Description>{data.Country.description}</Description>
      <Subtitle>Comidas</Subtitle>
      <FlatList
        data={data.Country.foods}
        renderItem={({ item }) => (
          <ItemContainer key={item.id}>
            <ItemTitle>{item.name}</ItemTitle>
          </ItemContainer>
        )}
        keyExtractor={item => item.id}
      />
    </Page>
  );
}

TravelShow.navigationOptions = {
  title: 'Detalhes',
};
