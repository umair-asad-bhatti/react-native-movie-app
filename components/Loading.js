import { View, StyleSheet, ActivityIndicator } from 'react-native'

import React from 'react'

export default function Loading({ size }) {
    return (
        <View>
            <ActivityIndicator size={size} color={'white'} />
        </View>
    )
}
