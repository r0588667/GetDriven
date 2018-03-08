import React from 'react';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput, ImageBackground, FlatList } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { SaveForDriver } from '../controller/AvailableRideController.js';

class AvailableRides extends React.Component {

    static navigationOptions = {
        title: 'Available Rides',
        headerTintColor: '#ffffff',
        headerStyle:
            {
                backgroundColor: '#000000',
            },
        header: { visible: false },
    };
    constructor(props) {
        super(props);
        this.state = { ShowOptional: false, RideInfo: [] };
        this.AddDeleteTrip = this.AddDeleteTrip.bind(this);
        this.Checker = this.Checker.bind(this);
    }
    /**
     * Adds the KmAway from the Customers given adress to the Ride Object
     * that fills the RideInfo Array.The Ride Object consists of 
     * the rideID, Name, First Name a boolean called Checked to see if the Driver
     * has chosen the ride and the distance.
     * It will go through this array and check with the isEntry boolean if the Ride Object
     * is already in the Array. If it is true. The KmAway will be set 
     * If it is not an entry yet. It will create a Ride Object and add it to the Array
     * @param {Ride} ride 
     * @param {int} KmAway 
     */
    handleIndexStates(ride, KmAway) {
        const rideID = ride._id;
        var temp = this.state.RideInfo;
        var isEntry = false;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].key == rideID) {
                isEntry = true;
                if (KmAway >= 0) {
                    temp[i].distance = KmAway;
                }
            }
        }
        if (!isEntry) {
            var obj =
            {
            key: rideID,
            Name : this.props.TheUser["profile"]["Name"],
            First_Name : this.props.TheUser["profile"]["First_Name"],
            checked : false,
            distance : KmAway,
            };
            temp.push(obj);
        }
        this.setState({ RideInfo: temp });
    }
    /**
     * Will go through each Ride in the Array and
     * check if the objects checked property is true or false
     * @param {Ride} item 
     */
    Checker(item) {
        const temp = this.state.RideInfo;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].key == item._id) {
                return temp[i].checked;
            }
        }
        return false;
    }
        /**
     * It will go through the array and check with the isEntry boolean if the Ride Object
     * is already in the Array. If it is true. Then the checked property will be changed
     * from True -> False or False -> True 
     * If it is not an entry yet. It will create a Ride Object and add it to the Array
     * @param {Ride} ride 
     */
    AddDeleteTrip(ride) {
        const rideID = ride._id;
        var temp = this.state.RideInfo;
        var isEntry = false;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].key == rideID) {
                isEntry = true;
                temp[i].checked = (temp[i].checked) ? false : true;
            }
        }
        if (!isEntry) {
            var obj =
            {
            key: rideID,
            Name : this.props.TheUser["profile"]["Name"],
            First_Name : this.props.TheUser["profile"]["First_Name"],
            checked : true,
            distance : 0,
            };
            temp.push(obj);
        }
        this.setState({ RideInfo: temp });
    }
    /**
     * Is called by pressing the Save Changes button on the top of the page. Calls the SaveForDriver.
     * Which is a method in the AvailableRidesController. Sends the Drivers UserID, The navigation to
     * redirect to the HomeMenu page and the RideInfo Array. Containing all the rides and it's checker property
     */
    SaveChanges() {
        SaveForDriver(this.state.RideInfo, this.props.TheUser["_id"],this.props.navigation);
    }
    render() {
        return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
                <ScrollView style={styles.ScrollView}>
                    <TouchableHighlight style={styles.MenuButton} onPress={() => this.SaveChanges()}>
                        <Text style={styles.ButtonText}>Save Changes</Text>
                    </TouchableHighlight>
                    <View>
                        <FlatList
                            data={this.props.rides}
                            extraData={this.state}
                            keyExtractor={(item, index) => item._id}
                            renderItem={({ item, index }) =>(
                                <View style={styles.Note}>
                                    <View style={styles.NoteColumn}>
                                        <View><Text style={styles.NoteText}>{item.Time}</Text></View>
                                        <View ><Text style={styles.NoteText}>{item.Date}</Text></View>

                                        <View>
                                            <Text style={styles.NoteText}>{item.City}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.NoteColumn}>


                                        <Text style={styles.NoteText} >Km Away</Text>
                                        <TextInput
                                            style={styles.NoteText}
                                            editable={true}
                                            onChangeText={(value) => this.handleIndexStates(item, value)}
                                        />
                                    </View>
                                        <TouchableHighlight style={styles.NoteButton} onPress={() => this.props.navigation.navigate("RideInfo", [item,true])}>
                                            <Text style={styles.NoteButtonText}>Info</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={[styles.NoteButtonRed, this.Checker(item) && styles.chosen]} onPress={() => this.AddDeleteTrip(item)}>
                                            <Text style={styles.NoteButtonText}>✔</Text>
                                        </TouchableHighlight>
                                </View>
                            )} />
                    </View>
                </ScrollView>
            </ImageBackground>

        );
    }
}

/**
 * Will Wrap the AvailableRides class component.
 * Is used to be able to make requests to the Meteor backend
 * In this case it is used to see which rides are available for drivers
 * First we Subscribe to the publish Method Rides ==> getRides()
 * We filter all the rides from our backend by checking if the user has already confirmed the drivers
 * We get our logged in user and then we check for reach ride
 * if the drivers Array in the Ride Object is larger then 0
 * meaning that there are drivers that already made themself available
 * we check if the user is already in the availabledrivers for this ride
 * if it is not. We add this ride to an array which is the returned
 * These are being returned into the properties of the AvailableRides Component
 * For example you can access the drivers like this : this.props.drivers;
 */
export default createContainer(() => {
    const handle = Meteor.subscribe('Rides');
    const User = Meteor.user();
    const backend = handle.ready() ? Meteor.collection('rides').find({confirmedByUser : false}) : [];
    var filteredBackend = [];
    for(var i = 0; i < backend.length;i++)
    {
        if(backend[i].drivers.length == 0)
        {
            filteredBackend.push(backend[i]);
        }
        else
        {
            var availableDrivers = backend[i].drivers;
            var bool = true;
            for(var j = 0; j < availableDrivers.length;j++)
            {
                if(availableDrivers[j].driverid == User._id)
                {
                    bool = false;
                }
            }
            if(bool)
            {
                filteredBackend.push(backend[i]);
            }
        }
    }
    console.log(filteredBackend);
createContainer.navigationOptions = 
{
    title: 'Available Rides',
    headerTintColor: '#ffffff',
    headerStyle:
        {
            backgroundColor: '#000000',
        },
}
    return {
        TheUser : User,
        isReady: handle.ready(),
        rides: filteredBackend,
    }
}, AvailableRides)


var local_style = StyleSheet.create({
    textInput: {
        borderColor: 'black',
        borderWidth: 2.0,
    },
    textInputAlt: {
        borderColor: 'red',
        borderWidth: 2.0,
    },

    tableEntry:
        {
            flex: 1,
            flexDirection: 'row',
        },
    entryDate:
        {
            width: '25%',
        },
    entryTime:
        {
            width: '15%',
        },
    entryPlace:
        {
            width: '60%',
        },
    ShowOptional:
        {
            flex: 1,
            width: '50%',
            borderRightWidth: 1,
            backgroundColor: '#303030',
        },
    Test:
        {
            backgroundColor: '#a00f14',
        },
    CheckRide:
        {
            flex: 1,
            width: '50%',
            borderRightWidth: 1,
            backgroundColor: '#2ccc31',

        },
    CheckText:
        {
            color: '#BBE0BF',
            textAlign: 'center',
            fontSize: 24,
        },
    Optional:
        {
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
        }
    , InfoText:
        {
            fontSize: 24,
            textAlign: 'center',
        },
    Wrapper:
        {
            flex: 1,
            width: '100%',
            flexDirection: 'row',
        },
    KmText:
        {
            width: '20%',
            textAlign: 'left',
            fontSize: 18,
        },
    KmAway:
        {
            width: '60%',
            textAlign : 'center'
        }
});