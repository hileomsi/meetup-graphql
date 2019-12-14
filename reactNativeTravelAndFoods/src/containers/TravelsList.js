import React, { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text } from 'react-native';

/**
|--------------------------------------------------
| Components Utils
|--------------------------------------------------
*/
const Touchable = Platform.select({
  ios: () => TouchableOpacity,
  android: () => TouchableNativeFeedback,
})();

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const Page = styled.View`
  flex: 1;
  background-color: #F5F5F5;
`;

const ItemContainer = styled(Touchable)`
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #AAAAAA;
  padding: 15px;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  flex: 1;
`;

const Icon = styled(Feather)`
  font-size: 23px;
  color: #BBBBBB;
`;

/**
|--------------------------------------------------
| Graphql
|--------------------------------------------------
*/
const FETCH_COUNTRIES = gql`
  query {
    allCountries {
      id
      name
    }
  }
`;
/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/
export default function TravelsList(props) {
  const { navigation } = props;
  const { loading, error, data } = useQuery(FETCH_COUNTRIES);
  
  const handleNavigateShow = useCallback((id) => {
    navigation.navigate('TravelShow', { id });
  }, [navigation]);

  if (loading) return <Text>Carregando...</Text>
  if (error) return <Text>Aconteceu um erro... I'm sorry</Text>

  return (
    <Page>
      <FlatList
        data={data.allCountries}
        renderItem={({ item }) => (
          <ItemContainer key={item.id} onPress={() => handleNavigateShow(item.id)}>
            <ItemTitle>{item.name}</ItemTitle>
            <Icon name="chevron-right" />
          </ItemContainer>
        )}
        keyExtractor={item => item.id}
      />
    </Page>
  );
}

TravelsList.navigationOptions = {
  title: 'Viagens',
  // headerRight: () => (
  //   <Button
  //     onPress={() => alert('Adicionar')}
  //     title="Adicionar"
  //   />
  // ),
};
