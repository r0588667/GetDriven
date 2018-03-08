import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight, Image, ImageBackground } from 'react-native';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import { checkString, checkNumber, checkPassword, checkEmail, checkPhoneNumber, checkDate, checkBankNumber, checkSocialSec, checkPostalNumber } from '../controller/RegexController.js'
import Meteor from 'react-native-meteor';
import { Accounts } from 'react-native-meteor'
import { CheckValidDriver } from '../controller/DRegistrationController.js'
import PhoneInput from 'react-native-phone-input'
import DatePicker from 'react-native-datepicker'
export default class DriverRegistration extends React.Component {

    static navigationOptions = {
        title: 'DriverRegistration',
        headerTintColor: '#ffffff',
        headerStyle:
            {
                backgroundColor: '#000000',
            },
    };
    constructor(props) {
        super(props);
        this.state = {
            Name: "", First_Name: "", Email: "", Checker: false, Street: "", Nr: "", Postal_Code: "", City: "", Password: ""
            , Birth_Date: new Date(), SocialSec: "", Account_Number: "", ShowPassHints: false, User: Meteor.user()
        };        this.createDriver = this.createDriver.bind(this);
    }
    /**
     * Is called by pressing the submit button on the bottom of the page. Calls the method CheckValidDriver.
     * Which is a method in the DRegistrationController. Works the same way as RideRegistration/CustomerRegistration
     * The User is passed so the HomeMenu page knows which User is logged in. Otherwise it seems to forget the User.
     * The Navigation is passed so after creating a successfull Driver we can navigate back to the HomeMenu
     */
    createDriver = () => {
        CheckValidDriver(this.state.Name, this.state.First_Name, this.state.Email, this.refs.phone, this.state.Street, this.state.Nr,
            this.state.Postal_Code, this.state.City, this.state.SocialSec, this.state.Account_Number,
            this.state.Birth_Date, this.state.Password, this.props.navigation,this.state.User);
    }
    render() {
        var PasswordHints = null;
        if (this.state.ShowPassHints) {
            PasswordHints =
                <View>
                    <Text style={styles.OptionalText}>{strings('CustomerRegistration.LengthCheck')}</Text>
                    <Text style={styles.OptionalText}>{strings('CustomerRegistration.CharCheck')}</Text>
                    <Text style={styles.OptionalText}>{strings('CustomerRegistration.NumCheck')}</Text>
                </View>
        }
        return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.Name')}</Text>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            onChangeText={(value) => this.setState({ Name: value })}
                        />
                        <Image
                            source={(checkString(this.state.Name)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.First_Name')}</Text>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            onChangeText={(value) => this.setState({ First_Name: value })}
                        />
                        <Image
                            source={(checkString(this.state.First_Name)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.Email')}</Text>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            keyboardType='email-address'
                            onChangeText={(value) => this.setState({ Email: value })}
                        />
                        <Image
                            source={(checkEmail(this.state.Email)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.Phone_Number')}</Text>
                    <View style={styles.InputView}>
                        <PhoneInput ref='phone'
                            value={"+32"}
                            style={{ width: '90%', backgroundColor: 'transparent', marginLeft: '2.5%' }}
                            onChangePhoneNumber={(value) => this.setState({ Checker: true })}
                        />
                        <Image
                            source={(checkPhoneNumber(this.refs.phone, this.state.Checker)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <View style={styles.InputView}>
                        <Text style={styles.StreetText}>{strings('DriverRegistration.Street')}</Text>
                        <Text style={styles.NrText}>{strings('DriverRegistration.Nr')}</Text>
                    </View>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.StreetInput}
                            editable={true}
                            onChangeText={(value) => this.setState({ Street: value })}
                        />
                        <Image
                            source={(checkString(this.state.Street)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                        <TextInput
                            style={styles.NrInput}
                            editable={true}
                            keyboardType='numeric'
                            onChangeText={(value) => this.setState({ Nr: value })}
                        />
                        <Image
                            source={(checkNumber(this.state.Nr)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <View style={styles.InputView}>
                        <Text style={styles.StreetText}>{strings('DriverRegistration.City')}</Text>
                        <Text style={styles.NrText}>{strings('DriverRegistration.Postal_Code')}</Text>
                    </View>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.StreetInput}
                            editable={true}
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
                            onChangeText={(value) => this.setState({ Postal_Code: value })}
                        />
                        <Image
                            source={(checkPostalNumber(this.state.Postal_Code)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.SocialSec_Number')}</Text>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            keyboardType='numeric'
                            onChangeText={(value) => this.setState({ SocialSec: value })}
                        />
                        <Image
                            source={(checkSocialSec(this.state.SocialSec)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.Account_Number')}</Text>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            keyboardType='default'
                            onChangeText={(value) => this.setState({ Account_Number: value })}
                        />
                        <Image
                            source={(checkBankNumber(this.state.Account_Number)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.Birth_Date')}</Text>
                    <View style={styles.InputView}>
                        <DatePicker date={this.state.Birth_Date}
                            mode="date"
                            androidMode='spinner'
                            placeholder="Select Date" confirmBtnText={strings('DriverRegistration.DateConfirm')} cancelBtnText={strings('DriverRegistration.DateCancel')}
                            onDateChange={(date) => { this.setState({ Birth_Date: date }) }} />
                        <Image
                            source={(checkDate(this.state.Birth_Date)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <Text style={styles.DefaultText}>{strings('DriverRegistration.Password')}</Text>
                    <TouchableHighlight style={styles.OptionalButton} onPress={() => this.setState({ ShowPassHints: (this.state.ShowPassHints) ? false : true })}>
                        <Text style={styles.OptionalButtonText}>{strings('DriverRegistration.Show_Password_Hints')}</Text>
                    </TouchableHighlight>
                    {PasswordHints}
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.DefaultTextInput}
                            editable={true}
                            secureTextEntry={true}
                            keyboardType='default'
                            onChangeText={(value) => this.setState({ Password: value })}
                        />
                        <Image
                            source={(checkPassword(this.state.Password)) ? require('../images/check.png') : require('../images/cross.png')}
                            style={styles.CheckerImage}
                        />
                    </View>
                    <TouchableHighlight style={styles.MenuButton} onPress={() => this.createDriver()}>
                        <View>
                            <Text style={styles.ButtonText}>Submit</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </ImageBackground>
        );
    }
}
