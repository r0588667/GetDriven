import React from 'react';
import styles from '../styles/Styles.js';
import { strings } from '..//locales/i18n.js';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput, ImageBackground } from 'react-native';
import { ValidLogin } from '../controller/LoginController.js'
import Meteor from 'react-native-meteor';
import App from '../App.js'
export default class LoginScreen extends React.Component {

    static navigationOptions = () => ({
        title: 'Login Page',
        headerTintColor: '#ffffff',
        headerStyle:
            {
                backgroundColor: '#000000',
            },

    });
    constructor(props) {
        super(props);
         /* For admin -> cntrl + : to uncomment*/ this.state = { Email: "", Password: ""};
        // /* For admin -> cntrl + : to uncomment*/ this.state = { Email: "info@getdriven.be", Password: "GetDriven123!"};
        // /* For driver -> cntrl + : to uncomment*/this.state = { Email: "driver@test.be", Password: "abc&1"};
        ///* demo shit */ this.state = { Email: "", Password: ""};
        this.validateLogin = this.validateLogin.bind(this);
    }
    /**
     * Is called by pressing the Login Button. Calls the method ValidLogin
     * Which is a method in the LoginController
     * The Navigation is passed so after successfully logging in we can navigate to the HomeMenu
    */
    validateLogin() {
        ValidLogin(this.state.Email, this.state.Password, this.props.navigation);
    }
    render() {
        if(this.props.navigation.state.params != undefined)
        {
            Meteor.logout();
        }
        return (
            <ImageBackground
                source={require('../images/LogoGetDriven.jpg')}
                style={styles.backgroundImage}>
                <ScrollView style={styles.ScrollView}>

                    <Text style={styles.DefaultText}>{strings('LoginScreen.Email')}</Text>
                    <TextInput
                        style={styles.DefaultTextInput}
                        editable={true}
                        keyboardType='email-address'
                        onChangeText={(value) => this.setState({ Email: value })}
                    />
                    <Text style={styles.DefaultText}> {strings('LoginScreen.Password')}</Text>
                    <TextInput
                        style={styles.DefaultTextInput}
                        editable={true}
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({ Password: value })}
                    />
                    <TouchableHighlight style={styles.MenuButton} onPress={() =>this.validateLogin()}>
                        <Text style={styles.ButtonText}>Log in</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.MenuButton} onPress={() => this.props.navigation.navigate("CustomerRegistration")}>
                        <Text style={styles.ButtonText}>{strings('LoginScreen.Register')}</Text>
                    </TouchableHighlight>
                </ScrollView>
            </ImageBackground>

        );
    }
    
}
