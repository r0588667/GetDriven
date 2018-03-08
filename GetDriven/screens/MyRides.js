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
                        <Text style={styles.NoteButtonText}>Drivers</Text>
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
                <Text style={styles.InfoText} >My Rides as a Customer</Text>
            )
            AdminViewTitleDriver = 
            (
                <Text style={styles.InfoText} >My Rides as a Driver</Text>
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
