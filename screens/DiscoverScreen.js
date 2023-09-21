import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import utility from '../utility/utility';
export default function DiscoverScreen() {
    const [movies, setMovies] = useState('');
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        utility.fetchMovies(page).then(r => {
            setMovies(r.results)
            console.log(movies);
            setLoading(false)
        })
    }, [page, loading])
    return (
        <View style={styles.discover_screen_container}>
            <Text style={{ color: 'white' }}>Discover</Text>
            <View style={{ marginTop: 10, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    horizontal={true}
                    data={movies}
                    renderItem={({ item }) => {
                        return (
                            < MovieCard SinglMovie={item} />
                        )
                    }}
                />
            </View>

            <View style={{ marginTop: 10, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    horizontal={true}
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
    discover_screen_container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'black'
    }
})