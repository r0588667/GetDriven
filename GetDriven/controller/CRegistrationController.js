import Meteor from 'react-native-meteor';
import {Accounts} from 'react-native-meteor'
import {strings} from '..//locales/i18n.js';
import { checkString, checkEmail, checkNumber, checkPassword, checkPostalNumber } from './RegexController.js';

    /**
     * Checks if every field in the CustomerRegistration form is filled in correctly. When
     * fields are not filled in correctly then 1 error message will be shown saying which fields were
     * not filled in correctly. Except for the Optional Fields. These are not being checked at the moment.
     * the var bool will be set to true. it will check every regex function to see if there are any bad inputs
     * If an input is bad then it will be added to the Errormessage String and the bool will be set to false, meaning
     * that an error message will definitely be displayed and the Customer is not valid.
     * @param {String} x_Name - The Last Name of the new Customer.
     * @param {String} x_First_Name - The First Name of the new Customer.
     * @param {String} x_Email - The Email Address of the new Customer.
     * @param {String} x_Phone_Number - "The Phone Number of the new Customer.The input and checking is handled by the module
     * it came from : https://github.com/thegamenicorus/react-native-phone-input"
     * @param {String} x_Street - "The Street where the new Customer lives."
     * @param {Number} x_Nr - "The Number on the Street where the new Customer lives."
     * @param {Number} x_Postal_Code - "The Postal Code of the new Customer."
     * @param {String} x_City - "The City where the new Customer lives."
     * @param {String} x_Password - "The Password of the new Customer."
     * @param {String} x_Company_Name - "Optional Field : The Company Name of the new Customer."
     * @param {Number} x_BTW_Nr - "Optional Field : The VAT Nr for the new Customer."
     * @param {Object} Navigation - "The Navigation Object. This is just being passed so it can be used in a later function.
     * it is from an external module : https://www.npmjs.com/package/react-navigation"
     */
export function CheckValidCustomer(x_Name,x_First_Name,x_Email,x_Phone_Number,x_Street,x_Nr,x_Postal_Code,x_City,x_Password,x_Company_Name,x_BTW_Nr,Navigation)
{
    var bool = true;
    var errorMessage = "Invalid Fields :";
    if(!checkString(x_Name))
    {
        bool = false;
        errorMessage += " Name,";
    }
    if(!checkString(x_First_Name))
    {
        bool = false;
        errorMessage += " First Name,";
    }
    if(!checkEmail(x_Email.toLowerCase()))
    {
        bool = false;
        errorMessage += " Email,";
    }
    if(!x_Phone_Number.isValidNumber())
    {
        bool = false;
        errorMessage += " Phone Number,";
    }
    if(!checkString(x_Street))
    {
        bool = false;
        errorMessage += " Street,";
    }
    if(!checkNumber(x_Nr))
    {
        bool = false;
        errorMessage += " Nr,";
    }
    if(!checkPostalNumber(x_Postal_Code))
    {
        bool = false;
        errorMessage += " Postal Code,";
    }
    if(!checkString(x_City))
    {
        bool = false;
        errorMessage += " City,";
    }
    if(!checkPassword(x_Password))
    {
        bool = false;
        errorMessage += " Password,";
    }
    if(bool)
    {
        CreateCustomer(x_Name,x_First_Name,x_Email,x_Phone_Number,x_Street,x_Nr,x_Postal_Code,x_City,x_Password,x_Company_Name,x_BTW_Nr,Navigation)
    }
    else
    {
        errorMessage = errorMessage.substring(0, errorMessage.length - 1);
        alert(errorMessage);
    }
}
    /**
     * Will only be called if the local bool variable in the ValidCustomer method returns true
     * Meaning that all fields were filled in correctly. Will add all the info to an @param {Object} profile - and
     * will then call the Meteor function Accounts.createUser. The Type will be set to a "CUSTOMER" so a new Customer is
     * created. If there is an error then the @param err will display the reason of the error with an alert to the User.
     * More info on : https://guide.meteor.com/accounts.html
     * @param {String} x_Name - The Last Name of the new Customer.
     * @param {String} x_First_Name - The First Name of the new Customer.
     * @param {String} x_Email - The Email Address of the new Customer.
     * @param {String} x_Phone_Number - "The Phone Number of the new Customer.The input and checking is handled by the module
     * it came from : https://github.com/thegamenicorus/react-native-phone-input"
     * @param {String} x_Street - "The Street where the new Customer lives."
     * @param {Number} x_Nr - "The Number on the Street where the new Customer lives."
     * @param {Number} x_Postal_Code - "The Postal Code of the new Customer."
     * @param {String} x_City - "The City where the new Customer lives."
     * @param {String} x_Password - "The Password of the new Customer."
     * @param {String} x_Company_Name - "Optional Field : The Company Name of the new Customer."
     * @param {Number} x_BTW_Nr - "Optional Field : The VAT Nr for the new Customer."
     * @param {Object} Navigation - "The Navigation Object. This is just being passed so it can navigate back to the HomeMenu.
     * it is from an external module : https://www.npmjs.com/package/react-navigation"
     */
export function CreateCustomer(x_Name,x_First_Name,x_Email,x_Phone_Number,x_Street,x_Nr,x_Postal_Code,x_City,x_Password,x_Company_Name,x_BTW_Nr,Navigation)
{
    const profile = {
        Name : x_Name,
        First_Name: x_First_Name,
        Street : x_Street,
        Nr : x_Nr,
        Postal_Code : x_Postal_Code,
        City : x_City, 
        Phone_Number : x_Phone_Number.getValue(), 
        Company_Name : x_Company_Name, 
        BTW_Nr : x_BTW_Nr,
        Type : "CUSTOMER"
    }
    return Accounts.createUser({username : x_Email.toLowerCase(),email : x_Email.toLowerCase(),password : x_Password, profile},(err) =>
    {
        if (err)
        {
           alert(err.reason);
        }
        else
        {
            Navigation.navigate('Login');
        }
      });
}