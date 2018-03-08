import React from 'react';
import styles from '../styles/Styles.js';
import {strings} from '..//locales/i18n.js';
import { StyleSheet, Text, View,TouchableHighlight,ScrollView,TextInput, ImageBackground} from 'react-native';
import Meteor, { createContainer, MeteorListView, header } from 'react-native-meteor';


export default class RideInfo extends React.Component
{
    static navigationOptions = {
        title: 'Ride Info',
        headerTintColor: '#ffffff',
        headerStyle: 
        {
            backgroundColor: '#000000',
        },
      };
	constructor(props) {
		super(props);
        this.state = {ShowOptional : false };
    }

    
    render() {
        var Ride = this.props.navigation.state.params;
        var CustomerInfo = null;
        if(!Ride[1])
        {
            CustomerInfo =
            (
                <View>
                <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Customer_Name')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0].userName} {Ride[0].userFirstName}</Text>
                </View>
                <View>
                <Text style={styles.DetailsHeader}>Email</Text>
                <Text style={styles.DetailsBody}>{Ride[0].userEmail}</Text>
                </View>
                <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Phone')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0].userPhone}</Text>
                </View>
                </View>
            )
        }
        var Drivers = [];
        if(Ride[0]["confirmedDrivers"].length == 0)
        {
            Drivers =
            (
                <Text>{strings('RideInfo.Drivers')}</Text>
            )
        }
        else
        {
            for(var i = 0; i < Ride[0]["confirmedDrivers"].length;i++)
            {
                Drivers.push
                (
                    <View key={i}>
                        <Text style={styles.DetailsBody}>{Ride[0]["confirmedDrivers"][i]["Name"]} {Ride[0]["confirmedDrivers"][i]["First_Name"]}</Text>
                    </View>
                )
            }
        }
        var Destination = null;
        if(this.props.navigation.state.params[0]["Des_street"]==null){
            Destination = (
                <View>
                    <Text style={styles.DetailsBody}>{Ride[0]["Street"]} {Ride[0]["Nr"]}</Text>
                    <Text style={styles.DetailsBody}>{Ride[0]["Postal_Code"]} {Ride[0]["City"]}</Text>
                </View>
            )
        }else{
            Destination = (
                <View>
                    <Text style={styles.DetailsBody}>{Ride[0]["Des_street"]} {Ride[0]["Des_nr"]}</Text>
                    <Text style={styles.DetailsBody}>{Ride[0]["Des_Postal_Code"]} {Ride[0]["Des_City"]}</Text>
                </View>
            )
        }
		return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
            <ScrollView style={styles.ScrollView}>
            <View>
                <Text style={styles.DetailsHeader}>Start</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["Date"]} {Ride[0]["Time"]}</Text>
            </View>
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Start_Place')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["Street"]} {Ride[0]["Nr"]}</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["Postal_Code"]} {Ride[0]["City"]}</Text>
            </View>
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Drop_Off')}</Text>
                {Destination}
            </View>
            {CustomerInfo}
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Estimated_End')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["Date"]} {Ride[0]["Time"]}</Text>
            </View>
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Ride_Type')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["Catagory"]}</Text>
            </View>
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Type_Car')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["TypeCar"]}</Text>
            </View>
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Amount_Drivers')}</Text>
                <Text style={styles.DetailsBody}>{Ride[0]["RequiredDrivers"]}</Text>
            </View>
            <View>
                <Text style={styles.DetailsHeader}>{strings('RideInfo.Confirmed_Drivers')}</Text>
                {Drivers}
            </View>
            </ScrollView>
            </ImageBackground>
            
		);
    }
}