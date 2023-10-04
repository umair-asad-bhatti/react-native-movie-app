import React from 'react'
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading';
import utility from '../utility/utility';


export default function HomeScreen() {
    const [movies, setMovies] = useState('');
    const [active_category, setActive_category] = useState('movie')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const nextPage = () => {
        setMovies([])
        setLoading(true)
        setPage((prev) => prev + 1)
    }
    const prevPage = () => {
        if (page > 1) {
            setMovies([])
            setLoading(true)
            setPage((prev) => prev - 1)
        }
    }
    useEffect(() => {
        utility.fetchMoviesOrTv(page, active_category).then(r => {
            setMovies(r.results)
            setLoading(false)
        })

    }, [page, loading, active_category])

    return (
        <>
            <View style={{ paddingVertical: 20, backgroundColor: 'black', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                <TouchableOpacity onPress={() => { setPage(1); setMovies([]); setActive_category('movie'); setLoading(true) }} style={[styles.btn_container, active_category == 'movie' ? styles.active_btn : '']}><Text style={{ color: 'white', textAlign: 'center' }}>Movies</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setPage(1); setMovies([]); setActive_category('tv'); setLoading(true) }} style={[styles.btn_container, active_category == 'tv' ? styles.active_btn : '']}><Text style={{ color: 'white', textAlign: 'center' }}>TV Shows</Text></TouchableOpacity>
            </View >
            {loading && <Loading />}
            <View style={styles.HomeScreen_Container} >

                <View style={{ marginTop: 10, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        numColumns={'4'}
                        data={movies}
                        renderItem={({ item }) => {
                            return (
                                <MovieCard category={active_category} SinglMovie={item} />
                            )
                        }}
                    />

                </View>
                <View style={styles.pagination}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                        {
                            !loading && <TouchableOpacity onPress={prevPage}>
                                <MaterialIcons name="navigate-before" size={30} color="white" />
                            </TouchableOpacity>

                        }
                        {


                            !loading && <TouchableOpacity onPress={() => setPage(1)}>
                                <Text style={{ color: 'white', marginTop: 3 }}>{page}</Text>
                            </TouchableOpacity>

                        }

                        {

                            !loading && <TouchableOpacity onPress={nextPage}>
                                <MaterialIcons name="navigate-next" size={30} color="white" />
                            </TouchableOpacity>

                        }
                    </View>
                </View>
            </View >
        </>

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

    },
    active_btn: {
        backgroundColor: 'grey'
    },
    btn_container: {
        flexGrow: 0.5, borderColor: 'white', borderWidth: 1, borderRadius: 5, padding: 5
    }

})