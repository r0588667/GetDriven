import React from 'react';
import styles from '../styles/Styles.js';
import {strings} from '..//locales/i18n.js';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Meteor from 'react-native-meteor';
import invariant from 'invariant'
import { StyleSheet, Text, View,TouchableHighlight,TextInput,ScrollView, ImageBackground} from 'react-native';

export default class MyRide extends React.Component {

    static navigationOptions = {
        title: 'My Ride',
        headerTintColor: '#ffffff',
        headerStyle: 
        {
            backgroundColor: '#000000',
        },
      };
	constructor(props) {
        super(props);
        var User = Meteor.user();
        this.state = {
            accumulatedTime : 0,
            User : User,
            total : 0,
            kostenUur : 0,
            vergoeding : 0,
        };
    }
    formatAccumulatedTime()
    {
        const timeInMilliseconds = this.state.accumulatedTime;
        
        // Compute milliseconds
        const milliseconds = Math.floor(timeInMilliseconds % 1000);
        const totalTimeInSeconds = Math.floor(timeInMilliseconds / 1000);

        // Compute seconds
        const seconds = Math.floor(totalTimeInSeconds % 60);
        const totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);

        // Compute minutes
        const minutes = Math.floor(totalTimeInMinutes % 60);
        const totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

        // Compute hours
        const hours = totalTimeInHours;

        // Format values
        const hoursString = hours.toString();
        const minutesString = minutes.toString();
        const secondsString = seconds.toString();

        return `${hoursString}:${minutesString}:${secondsString}`;
    }

    onReset()
    {
        this.onStop();
        this.setState( { accumulatedTime: 0 } );
    }

    isRunning()
    {
        const result = this.state.timerId;

        return result;
    }

    onToggleStartStop()
    {
        if ( this.isRunning() )
        {
            this.onStop();
        }
        else
        {
            this.onStart();
        }
    }

    onStart()
    {
        const timerId = this.setInterval(this.onTick, 50);
        const lastTick = new Date().getTime();
        this.setState({ timerId, lastTick });
    }

    onStop()
    {
        this.clearInterval(this.state.timerId);
        const state = { timerId: undefined };
        this.setState(state);
        this.collectTime();
    }
    collectTime()
    {
        const now = new Date().getTime();
        const lastTick = this.state.lastTick;
        const elapsed = now - lastTick;
        const accumulatedTime = this.state.accumulatedTime + elapsed;
        this.setState({ accumulatedTime, lastTick: now });
    }

    onTick()
    {
        this.collectTime();
    }
    render() {
        var Destination = null;
        if(this.props.navigation.state.params[0]["Des_street"]==null){
            Destination = (
                <View>
                    <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Street"]} {this.props.navigation.state.params[0]["Nr"]}</Text>
                    <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Postal_Code"]} {this.props.navigation.state.params[0]["City"]}</Text>
                </View>
            )
        }else{
            Destination = (
                <View>
                    <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Des_street"]} {this.props.navigation.state.params[0]["Des_nr"]}</Text>
                    <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Des_Postal_Code"]} {this.props.navigation.state.params[0]["Des_City"]}</Text>
                </View>
            )
        }
		return (
            <ImageBackground
                    source={require('../images/LogoGetDriven.jpg')}
                    style={styles.backgroundImage}>
      <ScrollView style={styles.ScrollView}>
        <View>
            <View>
                <Text style={styles.DetailsHeader}>{this.props.navigation.state.params[0].userName} {this.props.navigation.state.params[0].userFirstName}</Text>
                <Text style={styles.DetailsBody}>Phone: {this.props.navigation.state.params[0].userPhone}</Text>
                <Text style={styles.DetailsBody}>Email: {this.props.navigation.state.params[0].userEmail}</Text>
                <Text style={styles.DetailsHeader}>Start: </Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Time"]} - {this.props.navigation.state.params[0]["Date"]}</Text>
                <Text style={styles.DetailsHeader}>Start place: </Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Street"]} {this.props.navigation.state.params[0]["Nr"]}</Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Postal_Code"]} {this.props.navigation.state.params[0]["City"]}</Text>
                <Text style={styles.DetailsHeader}>Estimated End: </Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["End_Time"]} - {this.props.navigation.state.params[0]["End_Date"]}</Text>
                <Text style={styles.DetailsHeader}>Drop off: </Text>
                {Destination}
            </View>
        </View>
        <View>
        <View>
            <View>
                  <Text style={styles.TimerText}>{this.formatAccumulatedTime()}</Text>
            </View>
            <View>
                <TouchableHighlight style={styles.MenuButton} onPress= { () => this.onToggleStartStop()}>
                  <Text style={styles.ButtonText}> {(this.state.timerId) ? "Stop Timer" : "Start Timer"}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.EndRideButton]} onPress= { () => this.sendEmail()}>
                  <Text style={styles.ButtonText}>End Ride</Text>
                </TouchableHighlight>
            </View>
        </View>
    </View>
      </ScrollView>
      </ImageBackground>
		);
    }
    
    sendEmail = () => {
        const options = this.calculateCosts()

        Meteor.call('sendmail.factuur', options, (err, result) => {
            if(err){
                console.log(err.reason);
            } else {
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }
    
    calculateCosts = () => {
        const kostenUur = 20.95*(this.state.accumulatedTime/360);
        const vergoeding = this.getDriverVergoeding();
        const total = kostenUur + vergoeding;

        const options = {
            kostenUur : kostenUur,
            vergoeding : vergoeding,
            total : total,
            email : 'infogetdriven@gmail.com'
        };

        return options;

    }

    getDriverVergoeding = () => {
        let drivers = this.props.navigation.state.params[0]["confirmedDrivers"]
        let sumOfDistance = 0
        for (let item of drivers) {
            sumOfDistance += item.distance;
        }
        let vergoeding = (sumOfDistance*2)/5
        return vergoeding;

    }
}

reactMixin(MyRide.prototype, TimerMixin);
