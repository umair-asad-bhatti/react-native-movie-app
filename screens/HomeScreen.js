import React from 'react'
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading';
import utility from '../utility/utility';


export default function HomeScreen() {
    const [movies, setMovies] = useState([]);
    const [active_category, setActive_category] = useState('movie')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        utility.fetchMoviesOrTv(page, active_category).then(r => {
            if (r.results.length) {
                setMovies([...r.results])
                setLoading(false)
                setPage(page + 1)
            }
        })

    }, [active_category])
    const loadMoreData = () => {
        console.log('end reached');
        setIsFetchingMore(true)
        utility.fetchMoviesOrTv(page, active_category).then(r => {
            if (r.results.length) {
                setMovies([...movies, ...r.results])
                setIsFetchingMore(false)
                setPage(page + 1)
            }
        })
    }
    const handleRefresh = async () => {

        setIsRefreshing(true)
        const response = await fetch(`https://api.themoviedb.org/3/discover/${active_category}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=115a80b1f5855a7a34cb5deeeefee1a2&page=1`)
        const data = await response.json();
        setMovies(data.results)
        setIsRefreshing(false)
    }
    if (loading)
        return <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <Loading size={'large'} />
        </View>
    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingVertical: 20, backgroundColor: 'black', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                <TouchableOpacity onPress={() => { setPage(1); setMovies([]); setActive_category('movie'); setLoading(true) }} style={[styles.btn_container, active_category == 'movie' ? styles.active_btn : '']}><Text style={{ color: 'white', textAlign: 'center' }}>Movies</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setPage(1); setMovies([]); setActive_category('tv'); setLoading(true) }} style={[styles.btn_container, active_category == 'tv' ? styles.active_btn : '']}><Text style={{ color: 'white', textAlign: 'center' }}>TV Shows</Text></TouchableOpacity>
            </View >

            <View style={styles.HomeScreen_Container} >

                <View style={{ marginVertical: 10, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        onRefresh={handleRefresh}
                        refreshing={isRefreshing}
                        onEndReachedThreshold={0.2}
                        onEndReached={loadMoreData}
                        numColumns={'4'}
                        data={movies}
                        renderItem={({ item }) => {
                            return (
                                <MovieCard key={item.id} category={active_category} SinglMovie={item} />
                            )
                        }}
                        keyExtractor={item => item.id}
                    />

                </View>
                <View style={{ backgroundColor: 'black' }}>
                    {
                        isFetchingMore && <Loading />
                    }
                </View>

            </View >

        </View>

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