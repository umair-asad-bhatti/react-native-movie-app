import { View, StyleSheet, ActivityIndicator } from 'react-native'

import React from 'react'

export default function Loading() {
    return (
        <View style={styles.loading_container}>

            <ActivityIndicator size={'large'} color={'white'} />
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

})