import { View, Text, FlatList, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
export default function SearchScreen() {
  const [searchQuery, setSetsearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchMovies = async () => {
      const uri = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
      const response = await fetch(uri);
      const data = await response.json()
      setMovies(data.results);
      setLoading(false)
    }
    fetchMovies().then(r => console.log('fetched'))
  }, [searchQuery])
  if (loading) {
    return <Loading />
  }
  return (
    <View style={styles.search_screen_container}>
      <View style={{ flex: 0.1, alignItems: 'center' }}>
        <TextInput onChangeText={setSetsearchQuery} value={searchQuery} placeholder='Search Movie' style={styles.search_filed} />
      </View>
      <View style={{ marginTop: 30, width: '100%', flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
        {
          searchQuery && movies.length > 0 ?
            <FlatList
              numColumns={'4'}
              data={movies}
              renderItem={({ item }) => {
                return (
                  < MovieCard SinglMovie={item} />
                )
              }}
            /> :
            <ScrollView style={{ marginTop: '50%' }}>
              <Text style={{ color: 'white', fontSize: 16 }}>No result...</Text>
              <Text style={{ color: 'white', fontSize: 16 }}>Try searching something</Text>
            </ScrollView>
        }
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
    height: 40,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  }
})
