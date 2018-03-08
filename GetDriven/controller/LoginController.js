import Meteor from 'react-native-meteor';
import {strings} from '..//locales/i18n.js';
/**
* Checks if the Login has a Valid Email Address and Password.
* Meteor has it's own User scheme setup and has several functions you can use.
* more info on : https://guide.meteor.com/accounts.html
* The Email is being set to lowercase so as with every other site
* there is no difference between INFO@GETDRIVEN.BE and info@getdriven.be
* @param {String} Email - "The Email of the User"
* @param {String} Password - "The Password of the User"
* @param {Object} Navigation - "The Navigation Object. This is just being passed so it can navigate to the HomeMenu.
* it is from an external module : https://www.npmjs.com/package/react-navigation"
*/
export function ValidLogin(Email, Password,Navigation)
{
    return Meteor.loginWithPassword(Email.toLowerCase(),Password,(err)  =>
    {
        if(err)
        {
            alert(strings('LoginScreen.InvalidLogin'));
        }
        else
        {
            Navigation.navigate('HomeMenu');
        }
    });
}