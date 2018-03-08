import React from 'react';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import Meteor from 'react-native-meteor';
import { Accounts, createContainer, MeteorListView } from 'react-native-meteor'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput, Image, ImageBackground, FlatList } from 'react-native';

class MyRides extends React.Component {

    static navigationOptions = {
        title: 'My Rides',
        headerTintColor: '#ffffff',
        headerStyle:
            {
                backgroundColor: '#000000',
            },
    };
    constructor(props) {
        super(props);
        this.state = { UserView: null };
    }
    /**
     * Checks to see if a Driver has been confirmed by the Customer based on it's ID
     * It check each {Object} in the confirmedDrivers property of the ride to see if
     * it has the Driver ID. If it does, it returns true otherwise it loops through each other
     * Object until it eventually returns false
     * @param {Ride} item - The Ride where we check
     * @param {DriverID} ID - "The ID of the Driver we want to check to see if he is a confirmed Driver"
     */
    CheckDriverIsConfirmed(item,ID)
    {
        for(var i = 0; i < item.confirmedDrivers.length;i++)
        {
            if(item.confirmedDrivers[i].driverid == ID)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if a Ride has been confirmed by the user, meaning that he/she
     * has selected his/her drivers. The Ride (item) has a property called
     * confirmedByUser which is set to true if the drivers are chosen
     * In this function if this property is true, it will render only 1 Button
     * with the text Info, if the Customer has not yet chosen it's drivers
     * -> confirmedByUser is false and it will render an extra button => Drivers
     * so he/she can select the Drivers.
     * @param {Ride} item 
     */
    CheckFilledWithDrivers(item) {
        var UserView = null;
        if (item.confirmedByUser) {
            UserView =
                <View style={styles.NoteRow} >
                    <TouchableHighlight style={styles.CheckedButton} onPress={() => this.props.navigation.navigate("RideInfo", [item,false])}>
                        <Text style={styles.NoteButtonText}>Info</Text>
                    </TouchableHighlight>
                </View>
        }
        else {
            UserView =
                <View style={styles.NoteRow} >
                    <TouchableHighlight style={styles.NoteButton} onPress={() => this.props.navigation.navigate("AvailableDrivers", [item._id])}>
                        <Text style={styles.NoteButtonText}>{strings('MyRides.Drivers')}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.NoteButton} onPress={() => this.props.navigation.navigate("RideInfo", [item])}>
                        <Text style={styles.NoteButtonText}>Info</Text>
                    </TouchableHighlight>
                </View>
        }
        return UserView;
    }
    render() {
        if (this.props.navigation.state.params == undefined) {
            var Role = this.props.User.profile.Type;
        }
        else {
            var User = this.props.navigation.state.params;
            var Role = tUser.profile.Type;
        }
        var AdminViewTitleCustomer = null;
        var AdminViewTitleDriver = null;
        var DriverView = 
        (
            <View style={styles.ScrollView}>
                    <FlatList
                        data={this.props.driverrides}
                        extraData={this.state}
                        keyExtractor={(item, index) => item._id}
                        renderItem={({ item, index })  =>
                            this.CheckDriverIsConfirmed(item,this.props.id) && (
                                <View style={styles.Note}>
                                    <View style={styles.NoteColumn}>
                                        <View style={styles.NoteTimeRow}>
                                            <Text style={styles.NoteText}>{item.Time}       {item.Date}</Text>
                                        </View>
                                        <Text style={styles.NoteText}>{item.City}</Text>
                                    </View>
                                    <View style={styles.NoteRow}>
                                        <TouchableHighlight style={styles.NoteButton} onPress={() => this.props.navigation.navigate("MyRide", [item])}>
                                            <Text style={styles.NoteButtonText}>Start</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={styles.NoteButton} onPress={() => this.props.navigation.navigate("RideInfo", [item])}>
                                            <Text style={styles.NoteButtonText}>Info</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )} />
                </View>
        )
        var CustomerView =
        (
        <View style={styles.ScrollView}>
                    <FlatList
                        data={this.props.rides}
                        extraData={this.state}
                        keyExtractor={(item, index) => item._id}
                        renderItem={({ item, index }) => (
                            <View>
                                <View style={styles.Note}>
                                    <View style={styles.NoteColumn}>
                                        <View style={styles.NoteTimeRow}>
                                            <Text style={styles.NoteText}>{item.Time}       {item.Date}</Text>
                                        </View>
                                        <Text style={styles.NoteText}>{item.City}</Text>
                                    </View>
                                    {this.CheckFilledWithDrivers(item)}
                                </View>
                            </View>
                        )} />
            </View>
        )
        if (Role == "CUSTOMER") {
            DriverView = null;
        }
        if (Role == "DRIVER") {
            CustomerView = null;
        }
        if (Role == "ADMIN")
        {
            AdminViewTitleCustomer = 
            (
                <Text style={styles.InfoText} >{strings('MyRides.CustomerRides')}</Text>
            )
            AdminViewTitleDriver = 
            (
                <Text style={styles.InfoText} >{strings('MyRides.DriverRides')}</Text>
            )
        }
        return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
                <ScrollView style={styles.ScrollView}>
                    {AdminViewTitleDriver}
                    {DriverView}
                    {AdminViewTitleCustomer}
                    {CustomerView}
                </ScrollView>
            </ImageBackground>
        );
    }
}
/**
 * Will Wrap the MyRides class component.
 * Is used to be able to make requests to the Meteor backend
 * In this case it is used to see which rides a User has created or where
 * he/she is selected as a Driver.
 * First we Subscribe to the publish Method AvailableDrivers ==> getRides()
 * In EveryRide : We filter the rides so we only get the ones for the specific logged in user
 * (userId : User._id)
 * and we check it's  rideFinished property to filter out the completed Rides
 * ConfirmedRides : will filter the rides based on if it has confirmedRiders.
 * Later in the FlatList it will see if the id of the Driver is the same as
 * the logged in user.
 * The results are being returned into the properties of the MyRides Component
 * For example you can access the driverrides like this : this.props.driverrides;
 */
export default createContainer(params => {
    const handle = Meteor.subscribe('Rides');
    const User = Meteor.user();
    const EveryRide = Meteor.collection('rides').find({ rideFinished: false, userId : User._id});
    const ConfirmedRides = Meteor.collection('rides').find({confirmedDrivers :{$ne : []}});
    return {
        ridesReady: handle.ready(),
        rides: handle.ready() ? EveryRide : [],
        User: User,
        id: User._id,
        driverrides: ConfirmedRides
    };
}, MyRides)
