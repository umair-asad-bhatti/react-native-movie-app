import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import MovieCard from '../components/MovieCard'
import Loading from './Loading';
import React from 'react'
import { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState('');
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const nextPage = () => {
        setLoading(true)
        setPage((prev) => prev + 1)


    }
    const prevPage = () => {
        setLoading(true)
        setPage((prev) => prev - 1)
    }
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=115a80b1f5855a7a34cb5deeeefee1a2&page=${page}`)
            const data = await response.json();
            setMovies(data.results)
            setLoading(false)
        }
        fetchMovies().then(r => console.log('data fetched'))
    }, [page, loading])
    if (loading) {
        return (
            <Loading />
        )
    }

    return (

        <View style={styles.HomeScreen_Container} >
            <View style={{ marginTop: 10, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
            <View style={styles.pagination}>
                <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
                    {
                        page > 1 &&
                        <TouchableOpacity style={styles.btn_container} onPress={prevPage}>
                            <Text style={{ color: 'gray' }}>Previous</Text>
                        </TouchableOpacity>

                    }
                    {

                        page > 1 &&
                        <TouchableOpacity style={styles.btn_container} onPress={() => setPage(1)}>
                            <Text style={{ color: 'gray' }}>Go to first page</Text>
                        </TouchableOpacity>

                    }
                    {

                        page >= 1 &&
                        <TouchableOpacity style={styles.btn_container} onPress={nextPage}>
                            <Text style={{ color: 'gray' }}>Next</Text>
                        </TouchableOpacity>

                    }
                </View>
                <View>
                    <Text style={{ color: 'gray' }}>page = {page}</Text>
                </View>


            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    HomeScreen_Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'black'

    },
    btn_container: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    },
    pagination: {
        flex: 0.06,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row'
    }
})