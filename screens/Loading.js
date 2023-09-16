import { View, Text, StyleSheet, Image } from 'react-native'

import React from 'react'

export default function Loading() {
    return (
        <View style={styles.loading_container}>
            <Text style={styles.loading_text}>Loading</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    loading_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'black'

    },
    loading_text: {
        color: 'white',
        fontSize: 20
    }
})