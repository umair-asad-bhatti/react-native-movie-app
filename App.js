
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import HamburgerMenu from './components/HamburgerMenu';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <HamburgerMenu />

        <Stack.Navigator>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name='MovieDetailScreen' component={MovieDetailScreen}
            options={{
              headerShown: false, animation: 'none',
              headerStyle: {
                backgroundColor: 'black'
              },
              headerTintColor: 'white'
            }} />
          <Stack.Screen name='DiscoverScreen' component={DiscoverScreen} options={{ headerShown: false, animation: 'none' }} />
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
