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
    /**
     * Will return a readable TimeStamp.
     * First gets the accumulated time from the state.
     * Then for each variable we want to show in the result
     * (In this case Seconds, Minutes and Hours) it
     * calculates the total amount and returns it as 1 string.
    */
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
    /**
     * Checks the state of the timerId property
     * to see if the timer is running
     */
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
    /**
     * Will start the timer
     * First sets an interval so every 50 milliseconds it will
     * call the onTick() method
     * so every 50 millisecond the timerId property will be updated
     * the time will be collected and set in the state.
    */
    onStart()
    {
        const timerId = this.setInterval(this.onTick, 50);
        const lastTick = new Date().getTime();
        this.setState({ timerId, lastTick });
    }
    /**
     * To Stop the Timer from Running
     * Will first clear the interval so it will not
     * keep updating every 50 millisecond
     * It will collect the time so it can save it for
     * when the timer is restarted.
    */
    onStop()
    {
        this.clearInterval(this.state.timerId);
        const state = { timerId: undefined };
        this.setState(state);
        this.collectTime();
    }
    /**
     * Will first collect the currrent time
     * and then it fetches the property lastTick
     * which contains the previous time
     * it will then subtract the 2 to see the elapsed time
     * and then set the accumulatedTime property to this new value
    */
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
                <Text style={styles.DetailsBody}>{strings('MyRide.Phone')}: {this.props.navigation.state.params[0].userPhone}</Text>
                <Text style={styles.DetailsBody}>Email: {this.props.navigation.state.params[0].userEmail}</Text>
                <Text style={styles.DetailsHeader}>Start: </Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Time"]} - {this.props.navigation.state.params[0]["Date"]}</Text>
                <Text style={styles.DetailsHeader}>{strings('MyRide.Start_Place')}: </Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Street"]} {this.props.navigation.state.params[0]["Nr"]}</Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["Postal_Code"]} {this.props.navigation.state.params[0]["City"]}</Text>
                <Text style={styles.DetailsHeader}>{strings('MyRide.Estimated_End')}: </Text>
                <Text style={styles.DetailsBody}>{this.props.navigation.state.params[0]["End_Time"]} - {this.props.navigation.state.params[0]["End_Date"]}</Text>
                <Text style={styles.DetailsHeader}>{strings('MyRide.Drop_Off')}: </Text>
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
                  <Text style={styles.ButtonText}>{strings('MyRide.End_Ride')}</Text>
                </TouchableHighlight>
            </View>
        </View>
    </View>
      </ScrollView>
      </ImageBackground>
		);
    }
    
    /**
     * Will actually send the mail to the Meteor backend
     * Will first fill the options value by calling the
     * calculateCosts function.
     * After this it will call the Meteor function sendmail.factuur,
     * which handles sending a mail
     */
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
    /**
     * Will Set an Object called options with the info needed
     * to send the mail and calculates the total cost
     *
     */
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
    /**
     * Will fetch all the confirmed Drivers 
     * and calculate the total distance that the are away from the ride adres
     * by going through the array with a for loop.
     */
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
