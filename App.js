
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import HamburgerMenu from './components/HamburgerMenu';
import SearchScreen from './screens/SearchScreen';
import * as NavigationBar from 'expo-navigation-bar';
const Stack = createNativeStackNavigator();

export default function App() {
  NavigationBar.setBackgroundColorAsync("black").then((r)=>console.log('color has been set'));
  // NavigationBar.setVisibilityAsync("hidden");
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <NavigationContainer>
        <HamburgerMenu />
        <Stack.Navigator>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name='MovieDetailScreen' component={MovieDetailScreen}
            options={{
              headerShown: false, animation: 'none',
            }} />
          <Stack.Screen name='DiscoverScreen' component={DiscoverScreen} options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false, animation: 'none' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
