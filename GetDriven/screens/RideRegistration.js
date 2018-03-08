import React from 'react';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import Meteor from 'react-native-meteor';
import MapView from 'react-native-maps'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import { checkString, checkNumber, checkDateLater, checkCarString, checkPhoneNumber, checkPostalNumber } from '../controller/RegexController.js'
import { CheckValidRide } from '../controller/RRegistrationController.js'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput, Image, ImageBackground } from 'react-native';

export default class RideRegistration extends React.Component {

    static navigationOptions = {
        title: 'Ride Registration',
        headerTintColor: '#ffffff',
        headerStyle:
            {
                backgroundColor: '#000000',
            },
    };
    constructor(props) {
        super(props);
        this.state = {
            Departure_Date: new Date(), Street: "", Nr: "", Postal_Code: "", City: "", Time: "22:00",
            Categories: [strings('RideRegistration.Return'), strings('RideRegistration.Single')], Category: strings('RideRegistration.Return')
            , Driver: 1, Des_Street: "", Des_Nr: "", Des_Postal_Code: "", Des_City: "", TypeCar: "", ShowOptional: false
            , End_Date: new Date(), End_Time: "22:00",User : Meteor.user()
        };
    }
    /**
     * Is called by pressing the submit button on the bottom of the page. Calls the method CheckValidRide.
     * Which is a method in the RRegistrationController. Works the same way as CustomerRegistration/DriverRegistration
     */
    addRide = () => {
        
        CheckValidRide(this.state.Departure_Date, this.state.Street, this.state.Nr, this.state.Postal_Code, this.state.City, this.state.Time, this.state.Category,
            this.state.Driver, this.state.Des_Street, this.state.Des_Nr, this.state.Des_Postal_Code, this.state.Des_City, this.state.TypeCar, this.state.End_Date
            , this.state.End_Time, this.props.navigation,this.state.User)


    }
    /**
     * Is called by pressing the Button next to the Pickup/Destination Text. Will set the state of the adres
     * to the given Adres in the CustomerRegistration. Either the Destination adres or the Pickup adres
     * @param {Boolean} input - "A boolean to decide if the Pickup or Destination adres will be set. True for Pickup"
     */
    setHome(input) {
        if (input) {
            this.setState({ Street: this.state.User["profile"]["Street"] });
            this.setState({ Nr: this.state.User["profile"]["Nr"] });
            this.setState({ Postal_Code: this.state.User["profile"]["Postal_Code"] });
            this.setState({ City: this.state.User["profile"]["City"] });
        }
        else {
            this.setState({ Des_Street: this.state.User["profile"]["Street"] });
            this.setState({ Des_Nr: this.state.User["profile"]["Nr"] });
            this.setState({ Des_Postal_Code: this.state.User["profile"]["Postal_Code"] });
            this.setState({ Des_City: this.state.User["profile"]["City"] });
        }
    }
    render() {
        var Optional = null;
        var DestinationView = null;
        if (this.state.ShowOptional) {
            Optional =
                <View>
                    <Text style={styles.DefaultText}>{strings('RideRegistration.End_Date')}</Text>
                    <View style={styles.InputView}>
                        <DatePicker
                            date={this.state.End_Date} mode="date"
                            placeholder="Select Date"
                            confirmBtnText={strings('DriverRegistration.DateConfirm')}
                            cancelBtnText={strings('DriverRegistration.DateCancel')}
                            onDateChange={(date) => { this.setState({ End_Date: date }) }} />
                    </View>
                    <Text style={styles.DefaultText}>{strings('RideRegistration.End_Time')}</Text>
                    <View style={styles.InputView}>
                        <DatePicker
                            date={this.state.End_Time}
                            mode="time"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            minuteInterval={10}
                            onDateChange={(time) => { this.setState({ End_Time: time }); }}
                        />
                    </View>
                </View>
        }
        if(this.state.Category == strings('RideRegistration.Single'))
        {
            DestinationView =
            <View>
            <View style={styles.titleRideR}>
            <Text style={styles.HeaderRideR}>{strings('RideRegistration.Destination')}</Text>
            <TouchableHighlight style={styles.HomeButton} onPress={() => this.setHome(false)}>
                <View style={styles.Wrapper}>
                    <Image
                        source={require('../images/Home.png')}
                        style={styles.HomeImage} />
                </View>
            </TouchableHighlight>
            </View>
            <View style={styles.InputView}>
                <Text style={styles.StreetText}>{strings('RideRegistration.Street')}</Text>
                <Text style={styles.DefaultText}>{strings('RideRegistration.Nr')}</Text>
            </View>
            <View style={styles.InputView}>
                <TextInput
                    style={styles.StreetInput}
                    editable={true}
                    value={this.state.Des_Street}
                    onChangeText={(value) => this.setState({ Des_Street: value })}
                />
                <Image
                    source={(checkString(this.state.Des_Street)) ? require('../images/check.png') : require('../images/cross.png')}
                    style={styles.CheckerImage}
                />
                <TextInput
                    style={styles.NrInput}
                    editable={true}
                    keyboardType='numeric'
                    value={this.state.Des_Nr}
                    onChangeText={(value) => this.setState({ Des_Nr: value })}
                />
                <Image
                    source={(checkNumber(this.state.Des_Nr)) ? require('../images/check.png') : require('../images/cross.png')}
                    style={styles.CheckerImage}
                />
            </View>
            <View style={styles.InputView}>
                <Text style={styles.StreetText}>{strings('RideRegistration.City')}</Text>
                <Text style={styles.DefaultText}>{strings('RideRegistration.Postal_Code')}</Text>
            </View>
            <View style={styles.InputView}>
                <TextInput
                    style={styles.StreetInput}
                    editable={true}
                    value={this.state.Des_City}
                    onChangeText={(value) => this.setState({ Des_City: value })}
                />
                <Image
                    source={(checkString(this.state.Des_City)) ? require('../images/check.png') : require('../images/cross.png')}
                    style={styles.CheckerImage}
                />
                <TextInput
                    editable={true}
                    style={styles.NrInput}
                    keyboardType='numeric'
                    value={this.state.Des_Postal_Code}
                    onChangeText={(value) => this.setState({ Des_Postal_Code: value })}
                />
                <Image
                    source={(checkPostalNumber(this.state.Des_Postal_Code)) ? require('../images/check.png') : require('../images/cross.png')}
                    style={styles.CheckerImage}
                />
            </View>
            </View>
        }
        return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
                <ScrollView style={styles.ScrollView}>
                    <ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.Dropdown}
                        dropdownTextStyle={styles.DropdownText}
                        options={this.state.Categories}
                        onSelect={(idx, value) => this.setState({ Category: value })}
                        value={strings('RideRegistration.Single')}>
                        <Text style={styles.DefaultModalText}>{strings('RideRegistration.ChooseCategory')} {this.state.Category}</Text>
                    </ModalDropdown>
                    <View style={styles.titleRideR}>
                        <Text style={styles.HeaderRideR}>{strings('RideRegistration.PickUp')}</Text>
                        <TouchableHighlight style={styles.HomeButton} onPress={() => this.setHome(true)}>
                            <View style={styles.Wrapper}>
                                <Image
                                    source={require('../images/Home.png')}
                                    style={styles.HomeImage} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.InputView}>
                        <Text style={styles.StreetText}>{strings('RideRegistration.Street')}</Text>
                        <Text style={styles.DefaultText}>{strings('RideRegistration.Nr')}</Text>
                    </View>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.StreetInput}
                            editable={true}
                            value={this.state.Street}
                            onChangeText={(value) => this.setState({ Street: value })}
                        />
                        <Image
                            source={(checkString(this.state.Street)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                        <TextInput
                            style={styles.NrInput}
                            editable={true}
                            value={this.state.Nr}
                            keyboardType='numeric'
                            onChangeText={(value) => this.setState({ Nr: value })}
                        />
                        <Image
                            source={(checkNumber(this.state.Nr)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <View style={styles.InputView}>
                        <Text style={styles.StreetText}>{strings('RideRegistration.City')}</Text>
                        <Text style={styles.DefaultText}>{strings('RideRegistration.Postal_Code')}</Text>
                    </View>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.StreetInput}
                            editable={true}
                            value={this.state.City}
                            onChangeText={(value) => this.setState({ City: value })}
                        />
                        <Image
                            source={(checkString(this.state.City)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                        <TextInput
                            editable={true}
                            style={styles.NrInput}
                            keyboardType='numeric'
                            value={this.state.Postal_Code}
                            onChangeText={(value) => this.setState({ Postal_Code: value })}
                        />
                        <Image
                            source={(checkNumber(this.state.Postal_Code)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    {DestinationView}
                    <Text style={styles.DefaultText}>{strings('RideRegistration.Departure_Date')}</Text>
                    <View style={styles.InputView}>
                        <DatePicker date={this.state.Departure_Date} mode="date"
                            placeholder="Select Date" confirmBtnText={strings('DriverRegistration.DateConfirm')} cancelBtnText={strings('DriverRegistration.DateCancel')}
                            onDateChange={(date) => { this.setState({ Departure_Date: date }) }} />
                        <Image
                            source={(checkDateLater(this.state.Departure_Date)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('RideRegistration.Time')}</Text>
                    <View style={styles.InputView}>
                        <DatePicker
                            date={this.state.Time}
                            mode="time"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            minuteInterval={10}
                            onDateChange={(time) => { this.setState({ Time: time }); }}
                        />
                    </View>
                    <ModalDropdown style = {styles.Modal}
                        dropdownStyle={styles.Dropdown}
                        dropdownTextStyle={styles.DropdownText}
                        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        onSelect={(idx, value) => this.setState({ Driver: value })}
                        value="1" >
                        <Text style={styles.DefaultModalText}>Number of Drivers : {this.state.Driver}</Text>
                    </ModalDropdown>
                    <Text style={styles.DefaultText}>{strings('RideRegistration.TypeOfCar')}</Text>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            onChangeText={(value) => this.setState({ TypeCar: value })}
                        />
                        <Image
                            source={(checkCarString(this.state.TypeCar)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <TouchableHighlight style={styles.OptionalButton} onPress={() => this.setState({ ShowOptional: (this.state.ShowOptional) ? false : true })}>
                        <Text style={styles.OptionalButtonText}>{strings('RideRegistration.Show_Optional')}</Text>
                    </TouchableHighlight>
                    {Optional}
                    <TouchableHighlight style={styles.MenuButton} onPress={() => this.addRide()}>
                        <Text style={styles.ButtonText}>{strings('RideRegistration.Add')}</Text>
                    </TouchableHighlight>
                </ScrollView>
            </ImageBackground>
        );
    }
    _trip_renderRow(rowData) {
        return (
            <Text style={styles.chosenText}>
                {`${rowData.destination}`}
            </Text>
        );
    }

    _trip_renderSeparator(rowID) {
        let key = `spr_${rowID}`;
        return (<View key={key.trip_id} />);
    }

}