import React from 'react';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput, ImageBackground, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Meteor, { createContainer, MeteorListView, header } from 'react-native-meteor';
import { SaveForCustomer, CheckLength ,CheckState} from '../controller/AvailableDriverController.js';

class AvailableDrivers extends React.Component {
    static navigationOptions = {
        title: 'Available Drivers',
        headerTintColor: '#ffffff',
        headerStyle:
            {
                backgroundColor: '#000000',
            },
        header: { visible: false },
    };
    constructor(props) {
        super(props);
        this.state = { Drivers: [] };
    }
    /**
    * Uses the function CheckLength to see if the Number of Drivers that are selected
    * is equal to the number of Drivers the Customer selected in the Ride Registration page
    * If this is true it fires the SaveForCustomer function in the AvailableDriverController, else
    * it shows the error to the User.
    */
    SaveChanges() {
        if (CheckLength(this.state.Drivers) == this.props.RequiredDrivers) {
            SaveForCustomer(this.state.Drivers, this.props.rideID, this.props.navigation);
        }
        else
        {
            alert("There are not enough Drivers Selected");
        }
    }
    /**
     * Is Used to add the all the Drivers to the the state Array Drivers
     * A Driver consists of the DriverID, a Checker if The Driver is selected to drive the Ride,
     * The First Name and Last Name of the Driver and the Distance it is away from the Riders Adres/
     * When a Driver is already in this array, pressing the button will change it's
     * checker status. False -> True or True -> False. Eventually all the Drivers with property Checker as true
     * will be send to the backend
     * @param {Driver} item 
     */
    AddDriver(item) {
        const DriverID = item.driverid;
        const temp = this.state.Drivers;
        var isEntry = false;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].key == DriverID) {
                isEntry = true;
                temp[i].Checker = (temp[i].Checker) ? false : true;
            }
        }
        if (!isEntry) {
            var obj =
                {
                    key: DriverID,
                    Checker: true,
                    First_Name: item.First_Name,
                    Distance: item.distance,
                    Name: item.Name,
                };
            temp.push(obj);
        }
        this.setState({ Drivers: temp });
    }
    render() {
        var Drivers = this.state.Drivers.map((entry, index) => (
            <View key={index} visibility={entry.Checker}>
                <Text style={styles.InfoText}>{entry.First_Name} {entry.Name}</Text>
            </View>

        ));
        return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
                <ScrollView style={styles.ScrollView}>
                    <TouchableHighlight style={styles.MenuButton} onPress={() => this.SaveChanges()}>
                        <Text style={styles.ButtonText}>Save Changes</Text>
                    </TouchableHighlight>
                    <Text style={styles.InfoText}>Required Drivers : {this.props.RequiredDrivers}</Text>
                    <Text style={styles.InfoText}>Selected Drivers : {CheckLength(this.state.Drivers)}</Text>
                    <View>
                        <FlatList
                            data={this.props.drivers}
                            extraData={this.state}
                            keyExtractor={(item, index) => item.driverid}
                            renderItem={({ item, index }) =>
                                (
                                
                                    <View style={styles.Note}>
                                            <View style={styles.NoteColumn}><Text style={styles.NoteText}>{item.First_Name} {item.Name}</Text></View>
                                            <View style={styles.NoteColumn}><Text style={styles.NoteText}>{item.distance * 2/5} €</Text></View>
                                        <View style={styles.NoteColumn}>
                                            <TouchableHighlight style={[styles.NoteButton,CheckState(item,this.state.Drivers) && styles.chosen]} onPress={() => this.AddDriver(item)}>
                                                <Text style={styles.NoteButtonText}>◇</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )} />
                    </View>
                </ScrollView>
            </ImageBackground>

        );
    }
}
/**
 * Will Wrap the AvailableDrivers class component.
 * Is used to be able to make requests to the Meteor backend
 * In this case it is used to see which rides are available for drivers
 * First we Subscribe to the publish Method AvailableDrivers ==> getRides()
 * We filter to find the ride based on the ride ID and to get the fields drivers
 * being all the drivers who set themself available for the ride and the RequiredDrivers
 * being the number of Drivers the Customer wanted
 * These are being returned into the properties of the AvailableDrivers Component
 * For example you can access the drivers like this : this.props.drivers;
 */
export default createContainer(props => {
    const rideid = props["navigation"]["state"]["params"][0];
    Meteor.subscribe('availableDrivers', rideid);
    const backend = Meteor.collection('rides').find({ _id: rideid }, { fields: { drivers: 1, RequiredDrivers: 1 } });
    return {
        RequiredDrivers: backend[0]["RequiredDrivers"],
        rideID: rideid,
        drivers: backend[0]["drivers"],
    };
}, AvailableDrivers)
