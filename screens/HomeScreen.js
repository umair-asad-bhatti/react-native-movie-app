import { StyleSheet, FlatList, View, Text, TouchableOpacity, TextInput } from 'react-native'
import MovieCard from '../components/MovieCard'
import Loading from './Loading';
import React from 'react'
import { useState, useEffect } from 'react';
import utility from '../utility/utility';
import { MaterialIcons } from '@expo/vector-icons';


export default function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState('');
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const nextPage = () => {

        setLoading(true)
        setPage((prev) => prev + 1)
    }
    const prevPage = () => {
        if (page > 1) {

            setLoading(true)
            setPage((prev) => prev - 1)
        }
    }
    useEffect(() => {
        utility.fetchMovies(page).then(r => {
            setMovies(r.results)
            setLoading(false)
        })
    }, [page, loading])

    if (loading) {
        return (<Loading />)
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
                <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                    {
                        <TouchableOpacity onPress={prevPage}>
                            <MaterialIcons name="navigate-before" size={30} color="white" />

                        </TouchableOpacity>

                    }
                    {


                        <TouchableOpacity onPress={() => setPage(1)}>
                            {/* <Text style={{ color: 'white' }}>Go to first page</Text> */}
                            <Text style={{ color: 'white', marginTop: 3 }}>{page}</Text>
                        </TouchableOpacity>

                    }

                    {

                        <TouchableOpacity onPress={nextPage}>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </TouchableOpacity>

                    }
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
    pagination: {
        flex: 0.05,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',

    }
})