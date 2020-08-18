import Constants from 'expo-constants';
//Doing it here because: 1 I have to keep the phone screen on at all times otherwise it crashes. 
// 2 The code errors are too vague, debugging becomes harder
// I had to install 4 libraries more, adapt the react-navigation-stack and accomodate the createAppContainer

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
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),

})


const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerStyle: {
                backgroundColor: '#f13d3d'
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
                backgroundColor: '#f13d3d'
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
                backgroundColor: '#f13d3d'
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
                backgroundColor: '#f13d3d'
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
                backgroundColor: '#f13d3d'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        })
    }
});

const ReservationNavigator = createStackNavigator({
    Reservation: {
        screen: Reservation,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerStyle: {
                backgroundColor: '#f13d3d'
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

const MainNav = createDrawerNavigator(
    {
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
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                activeTintColor: '#fff',
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

        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact US',
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon name='address-card'
                        type='font-awesome'
                        size={22}
                        color={tintColor} />
                )
            }
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                title: 'Reserve Table',
                drawerLabel: 'Reserve Table',
                drawerIcon: ({ tintColor }) => (
                    <Icon name='cutlery'
                        type='font-awesome'
                        size={24}
                        color={tintColor} />
                )
            }
        }
    }, {
    drawerBackgroundColor: '#ff9090',
    contentComponent: CustomDrawerContentComponent
})


const MainNavigator = createAppContainer(MainNav);

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                {/* <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}> */}
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
        backgroundColor: '#f13d3d',
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);