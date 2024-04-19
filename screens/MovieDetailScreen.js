import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { A } from '@expo/html-elements';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';
import utility from '../utility/utility';//utility having helper functions
export default function MovieDetailScreen({ route }) {
    const { id, category } = route.params
    const [SingleMovieDetail, setSingleMovieDetail] = useState("")
    const [movieTrailer, setMovieTrailer] = useState("")
    const [loading, setloading] = useState(true)
    const navigation = useNavigation()
    // fetch the details of the movie along with youtube key for trailer
    useEffect(() => {
        utility.fetchMovieOrTvDetail(id, category).then(r => {
            setSingleMovieDetail(r)
            setloading(false)

        })
        utility.fetchMovieOrTvTrailer(id, category).then(r => {
            setMovieTrailer(r.results[0]?.key)
        })
    }, [id])

    if (loading) {
        return (<View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>

            <Loading size={'large'} />
        </View>
        )
    }
    return (
        <ScrollView style={styles.movie_detail_screen_container}>
            <View style={{ flex: 1, marginTop: 20, padding: 10 }}>

                <Image resizeMode='cover' style={{ width: '100%', height: 400 }} source={{ uri: `https://image.tmdb.org/t/p/w500/${SingleMovieDetail.poster_path} ` }} />
                <Text style={styles.movie_title} >{SingleMovieDetail.title ? SingleMovieDetail.title : SingleMovieDetail.name}</Text>
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
                        <Text style={styles.color_gray}>{SingleMovieDetail.release_date ? SingleMovieDetail.release_date : SingleMovieDetail.first_air_date}</Text>
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
                <A style={styles.movie_trailer_btn} href={`https://www.youtube.com/watch?v=${movieTrailer}`}>
                    watch trailer
                </A>
                <View >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ textAlign: 'center', color: 'white', borderWidth: 1, borderColor: 'white', paddingVertical: 5, borderRadius: 10 }}>Go back</Text>
                    </TouchableOpacity>
                </View>
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
    },
    movie_genre_container: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginVertical: 10
    },
    movie_info_container: {
        flex: 0.3,
        flexDirection: 'row',
        gap: 20,


    },
    color_gray: {
        color: 'gray'
    },
    movie_overview: {
        fontSize: 14,
        marginVertical: 20,

    },
    movie_trailer_btn: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#28282B'
    }
})
