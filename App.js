/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import store from './src/store';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ImageView} from './src/views/ImageView';
import TodoApp from './src/views/TodoApp';
import {AlbumView} from './src/views/AlbumView';
// import {createStore} from 'redux';
import {Provider} from 'react-redux';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen ❤️</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Image Card"
        onPress={() => navigation.navigate('Image')}
      />
      <Button
        title="Go to TodoApp"
        onPress={() => navigation.navigate('TodoApp')}
      />
      <Button
        title="Go to Album"
        onPress={() => navigation.navigate('Album')}
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  const [items, setItems] = useState([]);
  React.useEffect(() => {
    const test = async () => {
      getDropdown();
    };

    test();
  }, []);

  const getDropdown = () => {
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        setItems(res);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Text>Details Screen 👏</Text>
      <ScrollView>
        <FlatList
          data={items}
          renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
        />
      </ScrollView>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

// const initialState = {
//   counter: 0,
// };
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'INCREASE_COUNTER':
//       return {counter: state.counter + 1};
//     case 'DECREASE_COUNTER':
//       return {counter: state.counter - 1};
//   }
//   return state;
// };
//
// const store = createStore(reducer);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Album" component={AlbumView} />
          <Stack.Screen name="Image" component={ImageView} />
          <Stack.Screen name="TodoApp" component={TodoApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
