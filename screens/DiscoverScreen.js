import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function DiscoverScreen() {
    return (
        <View style={styles.discover_screen_container}>
            <Text style={{ color: 'white' }}>Discover</Text>
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