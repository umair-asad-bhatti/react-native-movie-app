import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function MovieCard({ SinglMovie, category }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("MovieDetailScreen", { id: SinglMovie.id, category })}>
            <View style={styles.movie_card_container}>
                <Image resizeMode='cover' style={{ width: 80, height: 120 }} source={{ uri: `https://image.tmdb.org/t/p/w500/${SinglMovie.poster_path} ` }} />
                <Text style={styles.movie_title} >{SinglMovie.title ? SinglMovie.title.substr(0, 7) : SinglMovie.name.substr(0, 7)}...</Text>
                <Text style={styles.movie_release_year} >{SinglMovie.release_date ? SinglMovie.release_date : ""}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    movie_card_container: {
        margin: 5
    },
    movie_title: {
        color: 'white',
        fontWeight: 'bold'
    },
    movie_release_year: {
        color: 'gray',
        fontSize: 10
    }
})