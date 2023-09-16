import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigation()
    const openMenu = () => {
        setIsOpen(true)
    }
    const closeMenu = () => {
        setIsOpen(false)
    }
    const goToHomeScreen = () => {
        navigation.navigate("HomeScreen")
        setIsOpen(false)
    }
    const goToDiscoverScreen = () => {
        navigation.navigate("DiscoverScreen")
        setIsOpen(false)
    }
    return (
        <>
            <View style={styles.header_container}>
                <View style={styles.header_menu}>
                    <Ionicons onPress={openMenu} name="menu" size={30} color="white" />
                    <Text style={styles.app_logo}>Movies Info</Text>
                </View>
            </View>
            {/* side menu */}
            <View style={[styles.side_menu, !isOpen ? styles.left500 : styles.show]}>
                <View style={{ flex: 0.05, justifyContent: 'center', alignItems: 'flex-end', padding: 10 }}>

                    <AntDesign onPress={closeMenu} name="closesquareo" size={30} color="white" />
                </View>
                <View style={{ marginTop: '50%', flex: 0.5, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity onPress={goToHomeScreen} style={styles.menu_item}>
                        <Text style={styles.menu_item}>HomeScreen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToDiscoverScreen} style={styles.menu_item}>
                        <Text style={styles.menu_item}>Discover</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </>
    )
}
const styles = StyleSheet.create({
    app_logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    header_container: {
        height: 50,
        paddingHorizontal: 20,

    },
    header_menu: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    side_menu: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 200,
        zIndex: 99999,
        backgroundColor: '#28282B',

    },
    left500: {
        left: -500
    },
    show: {
        left: 0
    },
    menu_item: {
        fontSize: 16,
        color: 'white',

    }
})