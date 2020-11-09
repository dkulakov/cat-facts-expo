import { StatusBar } from 'expo-status-bar';
import React, { useReducer, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// Api
import { dataFetcher } from './httpUtils';
// Service
import { Fact, getCatFactsRandomUrl } from './factsService';
// Reducer
import { catFactsReducer, Types, CatFactsState } from './reducer';

const initialValue: CatFactsState = {
  status: 'success',
  isFetchingMore: false,
  facts: [],
  error: null,
};

const Item = ({ text }: { text: string }) => (
  <View style={styles.listItem}>
    <Text>{text}</Text>
  </View>
);

export default function App() {
  const [state, dispatch] = useReducer(catFactsReducer, initialValue);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    dispatch({ type: Types.Request });

    dataFetcher(getCatFactsRandomUrl())
      .then((results) => {
        dispatch({ type: Types.Success, payload: { results } });
      })
      .catch((error) => {
        dispatch({ type: Types.Error, payload: { error: error.message } });
      });
  }, []);

  const onPress = (): void => {
    dispatch({ type: Types.RequestMore });

    dataFetcher(getCatFactsRandomUrl())
      .then((results) => {
        dispatch({ type: Types.SuccessMore, payload: { results } });
      })
      .catch((error) => {
        dispatch({ type: Types.ErrorMore, payload: { error: error.message } });
      });
  };

  const renderItem = ({ item }: { item: Fact }) => <Item text={item.text} />;

  return (
    <SafeAreaView style={styles.container}>
      {state.status === 'loading' ? (
        <Text>Loading...</Text>
      ) : state.status === 'error' ? (
        <Text>{state.error}</Text>
      ) : (
        <FlatList<Fact>
          ref={flatListRef}
          data={state.facts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd();
          }}
        />
      )}

      {state.status !== 'loading' && (
        <TouchableOpacity
          style={styles.button}
          disabled={state.isFetchingMore}
          onPress={onPress}
        >
          <Text>Load More</Text>
        </TouchableOpacity>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  listItem: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
