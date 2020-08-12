import Constants from 'expo-constants';
//Doing it here because: 1 I have to keep the phone screen on at all times otherwise it crashes. 
// 2 The code errors are too vague, debugging becomes harder

import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import { Icon } from 'react-native-elements';
// I had to install 4 libraries more, adapt the react-navigation-stack and accomodate the createAppContainer

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        })
    },
    Dishdetail: {
        screen: Dishdetail,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
});


const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        })
    }
});

const AboutNavigator = createStackNavigator({
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        })
    }
});
const ContactNavigator = createStackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        })
    }
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNav = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor} />
            )
        }
    }, About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor }) => (
                <Icon name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor} />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor} />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor }) => (
                <Icon name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor} />
            )
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
})


const MainNavigator = createAppContainer(MainNav);

class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default Main;