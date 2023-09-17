import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
export default function SearchScreen() {
  const [searchQuery, setSetsearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const fetchMovies = async () => {
      const uri = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
      const response = await fetch(uri);
      const data = await response.json()
      setMovies(data.results);
    }
    fetchMovies().then(r => console.log('fetched'))
  }, [searchQuery])

  return (
    <View style={styles.search_screen_container}>
      <View style={{ flex: 0.1,alignItems:'center' }}>
        <TextInput onChangeText={setSetsearchQuery} value={searchQuery} placeholder='Search Movie' style={styles.search_filed} />
      </View>
      <View style={{ marginTop: 10, width: '100%', flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
        < FlatList
            numColumns={'4'}
            data={movies}
            renderItem={({ item }) => {
              return (
                < MovieCard SinglMovie={item} />
              )
            }}
          /> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  search_screen_container: {
    height: '100%',
    backgroundColor: 'black',
    flex: 1,
  },
  search_filed: {
    width: '90%',
    backgroundColor: 'white',
    height: 30,
    padding: 5,
    borderRadius: 5,
    marginTop: 20,

  }
})
