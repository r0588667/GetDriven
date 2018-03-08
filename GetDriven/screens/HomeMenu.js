import React from 'react';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import Meteor from 'react-native-meteor';
import { Accounts } from 'react-native-meteor'
import Drawer from 'react-native-drawer';
import { ControlPanel, Easing, StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput, Image, ImageBackground } from 'react-native';

export default class HomeMenu extends React.Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        var First_Name = "ERROR";
        var Name = "ERROR";
        var Role = "ERROR";
        /**
        * Is needed because when creating a Ride/Driver the user is set to NULL
        * after creating a Ride/Driver. Giving the user as a parameter with the navigation
        * solves this problem. But looks really bad.
        */
        if(this.props.navigation.state.params != undefined)
        {
        console.log(this.props.navigation.state.params);
        First_Name = this.props.navigation.state.params["User"]["profile"]["First_Name"];
        Name = this.props.navigation.state.params["User"]["profile"]["Name"];
        Role = this.props.navigation.state.params["User"]["profile"]["Type"];
        }
        else
        {
            var User = Meteor.user();
            First_Name = User["profile"]["First_Name"];
            Name = User["profile"]["Name"];
            Role = User["profile"]["Type"];
        }
        this.state = { User: User,First_Name : First_Name, Name : Name, Role : Role};
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    /**
    * Pops everything on the StackNavigator Stack
    * And then goBack() will close the route that it is called from
    * Always going back to the Login Screen
    */
    Logout()
    {
        this.props.navigation.popToTop();
        const Test = true;
        this.props.navigation.goBack({Test});
    }
    render() {
        var CustomerView = null;
        var DriverView = null;
        var AdminView = null;
        if (this.state.Role == "CUSTOMER") {
            CustomerView =
                <View style={styles.ScrollView}>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("RideRegistration")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.RideRegistration')}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("MyRides")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.MyRides')}</Text>
                    </TouchableHighlight>
                </View>
        }
        if (this.state.Role == "DRIVER") {
            DriverView =
                <View style={styles.ScrollView}>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("AvailableRides")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.AvailableRides')}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("MyRides")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.MyRides')}</Text>
                    </TouchableHighlight>
                </View>
        }
        if (this.state.Role == "ADMIN") {
            AdminView =
                <View style={styles.ScrollView}>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("AvailableRides")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.AvailableRides')}</Text>
                    </TouchableHighlight>
                    {/* ride registration en driver registration is enkel voor admin*/}
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("DriverRegistration")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.DriverRegistration')}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("RideRegistration")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.RideRegistration')}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.DrawerButton} onPress={() => this.props.navigation.navigate("MyRides")}>
                        <Text style={styles.ButtonText}>{strings('HomeMenu.MyRides')}</Text>
                    </TouchableHighlight>
                </View>
        }



        var DrawerContent = (
            <View style={styles.Drawer}>
            <View style={styles.DHeader}>
                <Text style={styles.ButtonText}>Menu </Text>
            </View>
                {CustomerView}
                {DriverView}
                {AdminView}
            </View>
        );
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={DrawerContent}
                style={styles.Drawer}
                tweenHandler={Drawer.tweenPresets.parallax}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
            >
                <ImageBackground
                    source={require('../images/b.jpg')}
                    style={styles.backgroundImage}>
                        <View style={styles.Header}>
                            <TouchableHighlight style={styles.headerImageContainer} onPress={() => { this._drawer.open() }}>
                                <Image
                                    style={styles.Logo}
                                    source={require('../images/burger.png')}
                                />
                            </TouchableHighlight>
                            <Text style={styles.HeaderText}>{this.state.First_Name} {this.state.Name} </Text>
                            <TouchableHighlight style={styles.headerImageContainer} onPress={() => { this.Logout()}}>
                                <Image
                                    style={styles.LogoutLogo}
                                    source={require('../images/Logout.png')}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.Container}>
                            <Image
                                style={styles.HomePageImage}
                                source={require('../images/HomePagePhoto.png')}
                            />
                        </View>
                        <View style={styles.BodyText}>
                            <Text style={styles.alineaText}>Welcome {this.state.First_Name} {this.state.Name},</Text>
                            <Text style={styles.alineaText}/>
                            <Text style={styles.alineaText}>Bedankt om te kiezen voor Get Driven, links in het menu kunt u onder "Ride registration" een rit toevoegen. Eens deze bij "My rides" staat kunt u erop klikken om uw chauffeur(s) te kiezen en te bevestigen.</Text>
                            <Text style={styles.alineaText}/>
                            <Text style={styles.alineaText}>Vriendelijke Groeten</Text>
                            <Text style={styles.alineaText}>Get Driven</Text>
                        </View>
                </ImageBackground>
            </Drawer>
        );
    }
}
