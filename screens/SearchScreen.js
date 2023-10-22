import { View, Text, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import utility from '../utility/utility'
export default function SearchScreen() {
  const [searchQuery, setSetsearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [active_category, setActive_category] = useState('movie')
  useEffect(() => {

    utility.fetchSearchedMovieOrTv(searchQuery, active_category).then(r => {
      setMovies(r.results);
      setLoading(false)
    })
  }, [searchQuery, active_category])
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <View style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: 'black', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
        <TouchableOpacity onPress={() => { setMovies([]); setActive_category('movie'); setLoading(true) }} style={[styles.btn_container, active_category == 'movie' ? styles.active_btn : '']}><Text style={{ color: 'white', textAlign: 'center' }}>Movies</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { setMovies([]); setActive_category('tv'); setLoading(true) }} style={[styles.btn_container, active_category == 'tv' ? styles.active_btn : '']}><Text style={{ color: 'white', textAlign: 'center' }}>TV Shows</Text></TouchableOpacity>
      </View >
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
                    <MovieCard category={active_category} SinglMovie={item} />
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
    </>

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
    marginTop: 10,
  },
  active_btn: {
    backgroundColor: 'grey'
  },
  btn_container: {
    flexGrow: 0.5, borderColor: 'white', borderWidth: 1, borderRadius: 5, padding: 5
  }
})
