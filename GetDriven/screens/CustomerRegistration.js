import React from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,TouchableHighlight,Image, ImageBackground} from 'react-native';
import styles from '../styles/Styles.js';
import {strings} from '..//locales/i18n.js';
import {Accounts} from 'react-native-meteor'
import PhoneInput from 'react-native-phone-input'
import {checkString,checkNumber,checkPassword,checkEmail,checkPhoneNumber, checkPostalNumber} from '../controller/RegexController.js'
import {CheckValidCustomer,CreateCustomer} from '../controller/CRegistrationController.js'
export default class CustomerRegistration extends React.Component {

    static navigationOptions = {
        title: 'CustomerRegistration',
        headerTintColor: '#ffffff',
        headerStyle: 
        {
            backgroundColor: '#000000',
        },
      };
	constructor(props) {
		super(props);
        this.state = 
        { 
        Email: "",
        Password : "",
        First_Name:"",
        Name : "",
        Street : "", Nr : "", Postal_Code : "", City : "", Phone_Number : "",
        ShowOptional : false,ShowPassHints : false,Company_Name : "", BTW_Nr : "", Checker : false};
    }
    
    /**
     * Is called by pressing the submit button on the bottom of the page. Calls the method CheckValidCustomer.
     * Which is a method in the CRegistrationController. Works the same way as RideRegistration/DriverRegistration
     */
    createCustomer = () =>
    {
        CheckValidCustomer(this.state.Name,this.state.First_Name,this.state.Email,this.refs.phone,this.state.Street
            ,this.state.Nr,this.state.Postal_Code,this.state.City,this.state.Password,this.state.Company_Name,this.state.BTW_Nr,this.props.navigation);
    }
    render() {
        var Optional = null;
        var PasswordHints = null;
        if(this.state.ShowOptional)
        {
        Optional =
        <View>
            <Text style={styles.DefaultText}>{strings('CustomerRegistration.Company_Name')}</Text>
            <TextInput
            style={styles.DefaultTextInput}
            editable = {true}
			onChangeText={(value) => this.setState({Company_Name : value})}
            />
            <Text style={styles.DefaultText}>{strings('CustomerRegistration.BTW_Nr')}</Text>
            <TextInput
            style={styles.DefaultTextInput}
            editable = {true}
            keyboardType = 'numeric'
			onChangeText={(value) => this.setState({BTW_Nr : value})}
            />
        </View>
        }
        if(this.state.ShowPassHints)
        {
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
            <ScrollView>
                <Text style={styles.DefaultText}>{strings('CustomerRegistration.First_Name')}</Text>
                <View style={styles.InputView}>
                    <TextInput
                    style = {styles.DefaultTextInput}
                    editable = {true}
					onChangeText={(value) => this.setState({First_Name : value})}
                    />
                <Image 
                source={ (checkString(this.state.First_Name)) ? require ('../images/check.png') : require('../images/cross.png')}
                style = {styles.CheckerImage}
                />
                </View>
                <Text style={styles.DefaultText}>{strings('CustomerRegistration.Name')}</Text>
                <View style={styles.InputView}>
                    <TextInput
                    style = {styles.DefaultTextInput}
                    editable = {true}
					onChangeText={(value) => this.setState({Name : value})}
                    />
                <Image 
                source={ (checkString(this.state.Name)) ? require ('../images/check.png') : require('../images/cross.png')}
                style = {styles.CheckerImage}
                />
                </View>
                <Text style={styles.DefaultText}>{strings('CustomerRegistration.Email')}</Text>
                <View style={styles.InputView}>
                    <TextInput
                    style = {styles.DefaultTextInput}
                    editable = {true}
                    keyboardType = 'email-address'
					onChangeText={(value) => this.setState({Email : value})}
                    />
                <Image 
                source={ (checkEmail(this.state.Email)) ? require ('../images/check.png') : require('../images/cross.png')}
                style = {styles.CheckerImage}
                />
                </View>
                <Text style={styles.DefaultText}>{strings('CustomerRegistration.Phone_Number')}</Text>
                <View style={styles.InputView}>
                    <PhoneInput
                    style={{width : '90%', backgroundColor : 'transparent', marginLeft:'2.5%'}}
                    onChangePhoneNumber={(value) => this.setState({Checker : true})}
                    ref='phone'
                    initialCountry='be'
                    />
                    <Image 
                    source={ (checkPhoneNumber(this.refs.phone,this.state.Checker)) ? require ('../images/check.png') : require('../images/cross.png')}
                    style = {styles.CheckerImage}
                    />
                </View>
                <View style={styles.InputView}>
                <Text style={styles.StreetText}>{strings('CustomerRegistration.Street')}</Text>
                <Text style={styles.NrText}>{strings('CustomerRegistration.Nr')}</Text>
                </View>
                <View style={styles.InputView}>
                    <TextInput
                    style = {styles.StreetInput}
                    editable = {true}
					onChangeText={(value) => this.setState({Street : value})}
                    />
                    <Image 
                    source={ (checkString(this.state.Street)) ? require ('../images/check.png') : require('../images/cross.png')}
                    style = {styles.CheckerImage}
                    />
                    <TextInput
                    style = {styles.NrInput}
                    editable = {true}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setState({Nr : value})}
                    />
                    <Image 
                    source={ (checkNumber(this.state.Nr)) ? require ('../images/check.png') : require('../images/cross.png')}
                    style = {styles.CheckerImage}
                    />
                </View>
                <View style={styles.InputView}>
                    <Text style={styles.StreetText}>{strings('CustomerRegistration.City')}</Text>
                    <Text style={styles.NrText}>{strings('CustomerRegistration.Postal_Code')}</Text>
                </View>
                <View style={styles.InputView}>
                    <TextInput
                    style = {styles.StreetInput}
                    editable = {true}
					onChangeText={(value) => this.setState({City : value})}
                    />
                    <Image 
                    source={ (checkString(this.state.City)) ? require ('../images/check.png') : require('../images/cross.png')}
                    style = {styles.CheckerImage}
                    />
                    <TextInput
                    editable = {true}
                    style = {styles.NrInput}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setState({Postal_Code : value})}
                    />
                    <Image 
                    source={ (checkPostalNumber(this.state.Postal_Code)) ? require ('../images/check.png') : require('../images/cross.png')}
                    style = {styles.CheckerImage}
                    />
                </View>
                <Text style={styles.DefaultText}>{strings('CustomerRegistration.Password')}</Text>
                    <TouchableHighlight style = {styles.OptionalButton} onPress = {() => this.setState({ShowPassHints : (this.state.ShowPassHints) ? false : true}) }>
                    <Text style = {styles.OptionalButtonText}>{strings('CustomerRegistration.Show_Password_Hints')}</Text>
                    </TouchableHighlight>
                    {PasswordHints}
                <View style={styles.InputView}>
                    <TextInput
                    style = {styles.DefaultTextInput}
                    editable = {true}
                    keyboardType = 'default'
                    secureTextEntry = {true}
					onChangeText={(value) => this.setState({Password : value})}
                    />
                    <Image 
                    source={ (checkPassword(this.state.Password)) ? require ('../images/check.png') : require('../images/cross.png')}
                    style = {styles.CheckerImage}
                    />
                </View>
                    <TouchableHighlight style = {styles.OptionalButton} onPress = {() => this.setState({ShowOptional : (this.state.ShowOptional) ? false : true})}>
                        <Text style = {styles.OptionalButtonText}>{strings('CustomerRegistration.Show_Optional')}</Text>
                    </TouchableHighlight>
                    {Optional}
                    <TouchableHighlight style={styles.MenuButton} onPress={() => this.createCustomer()}>
                    <View>
                        <Text style={styles.ButtonText}>Submit</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
            </ImageBackground>
		);
    }
}