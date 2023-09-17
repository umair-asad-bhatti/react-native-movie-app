import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigation()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const goToHomeScreen = () => {
        navigation.navigate("HomeScreen")
        setIsOpen(false)
    }
    const goToDiscoverScreen = () => {
        navigation.navigate("DiscoverScreen")
        setIsOpen(false)
    }
    const goToSearchScreen = () => {
        navigation.navigate("SearchScreen")
        setIsOpen(false)
    }
    return (
        <>
            <View style={styles.header_container}>
                <View style={styles.header_menu}>
                    <Ionicons onPress={toggleMenu} name="menu" size={32} color="white" />
                    <TouchableOpacity onPress={goToHomeScreen}>
                        <Image style={{ width: 35, height: 35 }} source={require("../assets/icon.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToSearchScreen}>
                        <Ionicons name="search-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* side menu */}
            <View style={[styles.side_menu, !isOpen ? styles.left500 : styles.show]}>
                <View style={{ flex: 0.05, justifyContent: 'center', alignItems: 'flex-end', padding: 10 }}>

                    <AntDesign onPress={toggleMenu} name="closesquareo" size={30} color="white" />
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
    header_container: {
        height: 35,
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