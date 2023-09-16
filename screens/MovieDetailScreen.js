import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { A } from '@expo/html-elements';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
export default function MovieDetailScreen({ route }) {
    const { id } = route.params
    const [SingleMovieDetail, setSingleMovieDetail] = useState("")
    const [loading, setloading] = useState(true)
    const navigation = useNavigation()
    useEffect(() => {
        const fetchMovieDetail = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=115a80b1f5855a7a34cb5deeeefee1a2`)
            const data = await response.json();
            setSingleMovieDetail(data)
            setloading(false)
        }

        fetchMovieDetail().then(r => console.log('Movie detail fetched'))

    }, [id])
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <ScrollView style={styles.movie_detail_screen_container}>
            <View style={{ flex: 1, marginTop: 20, padding: 10 }}>
                <View style={{ paddingHorizontal: 40 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={{ textAlign: 'center', color: 'white', borderWidth: 1, borderColor: 'red',paddingVertical:5,borderRadius:10 }}>Go back</Text>
                    </TouchableOpacity>

                </View>
                <Image resizeMode='center' style={{ width: '100%', height: 400 }} source={{ uri: `https://image.tmdb.org/t/p/w500/${SingleMovieDetail.poster_path} ` }} />
                <Text style={styles.movie_title} >{SingleMovieDetail.title}</Text>
                <A style={{ ...styles.movie_title, fontSize: 12 }} href={SingleMovieDetail.homepage}>
                    {SingleMovieDetail.homepage}
                </A>
                <View style={styles.movie_genre_container}>
                    {

                        SingleMovieDetail.genres?.map((genre, index) => {
                            return (

                                <Text key={index} style={styles.color_gray}>{genre.name},</Text>

                            )
                        })

                    }
                </View>
                <View style={styles.movie_info_container}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Text style={styles.color_gray}>{SingleMovieDetail.release_date}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <MaterialIcons name="star-rate" size={20} color="gray" />
                        <Text style={styles.color_gray}>
                            {SingleMovieDetail.vote_average}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <AntDesign name="clockcircleo" size={15} color="gray" />
                        <Text style={styles.color_gray}>
                            {SingleMovieDetail.runtime} Min
                        </Text>
                    </View>
                </View>
                <Text style={{ ...styles.color_gray, ...styles.movie_overview }}>{SingleMovieDetail.overview}</Text>
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({

    movie_detail_screen_container: {
        backgroundColor: 'black',
        flex: 1
    },

    movie_title: {
        color: 'white',
        fontSize: 20,
        marginTop: 20,
        paddingHorizontal: 40,
    },
    movie_genre_container: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 5,
        paddingHorizontal: 40,

    },
    movie_info_container: {
        flex: 0.2,
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 40,
    },
    color_gray: {
        color: 'gray'
    },
    movie_overview: {
        fontSize: 14,
        marginTop: 20,
        paddingHorizontal: 40,
    }
})
