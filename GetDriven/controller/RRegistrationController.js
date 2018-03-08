import Meteor from 'react-native-meteor';
import {Accounts} from 'react-native-meteor'
import {strings} from '..//locales/i18n.js';
import { checkString, checkEmail, checkNumber, checkPassword,checkDate, checkDateLater, checkCarString, checkPostalNumber,convertDate} from './RegexController.js';


    /**
     * Checks if every field in the RideRegistration form is filled in correctly. When
     * fields are not filled in correctly then 1 error message will be shown saying which fields were
     * not filled in correctly. Except for the Optional Fields. These are not being checked at the moment.
     * If the Category is a Single ride then the Departure Adres will also be checked for invalid inputs.
     * The var bool will be set to true. it will check every regex function to see if there are any bad inputs
     * If an input is bad then it will be added to the Errormessage String and the bool will be set to false, meaning
     * that an error message will definitely be displayed and the Ride is not valid.
     * @param {Date} x_Departure_Date - The Departure Date.
     * @param {String} x_Street - The Street where the Driver has to go to.
     * @param {Number} x_Nr - The Street Nr.
     * @param {Number} x_Postal_Code - "The Postal Code of the Pickup Adres"
     * @param {String} x_City - "The City of the Pickup Adres"
     * @param {String} x_Time - "The Time the ride begins."
     * @param {String} x_Category - "The Category wether it is single or return."
     * @param {String} x_Driver - "The Amount of Drivers the ride will have."
     * @param {String} x_Des_Street - "The Destination Street."
     * @param {String} x_Des_Nr - "The Destination Number."
     * @param {Number} x_Des_Postal_Code - "The Destination Postal Code."
     * @param {Object} x_Des_City - "The Destination City.
     * @param {String} x_TypeCar - "The Type of Car the Customer drives"
     * @param {Date} x_End_Date - "The Date the ride ends"
     * @param {String} x_End_Time - "The Time the ride ends"
     * @param {Object} Navigation - "The Navigation Object. This is just being passed so it can be used in a later function.
     * it is from an external module : https://www.npmjs.com/package/react-navigation"
     * @param {Meteor User Object} User - "The User. Needs to be passed with the navigation. Otherwise the HomeMenu cannot
     * find the Meteor user after the Meteor call"
     */
export function CheckValidRide(x_Departure_Date,x_Street,x_Nr,x_Postal_Code,x_City
    ,x_Time,x_Category,x_Driver,x_Des_Street,x_Des_Nr,x_Des_Postal_Code,x_Des_City,
    x_TypeCar,x_End_Date,x_End_Time,Navigation,User)
    {
        var bool = true;
        var errorMessage = "Invalid Fields :";
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
        if(x_Category == strings('RideRegistration.Single'))
        {
            if(!checkString(x_Des_Street))
            {
                bool = false;
                errorMessage += " Destination Street,";
            }
            if(!checkNumber(x_Des_Nr))
            {
                bool = false;
                errorMessage += " Destination Nr,";
            }
            if(!checkPostalNumber(x_Des_Postal_Code))
            {
                bool = false;
                errorMessage += " Destination Postal Code,";
            }
            if(!checkString(x_Des_City))
            {
                bool = false;
                errorMessage += " Destination City,";
            }
        }
        if(!checkDateLater(x_Departure_Date))
        {
            bool = false;
            errorMessage += " Departure Date,";
        }
        if(!checkCarString(x_TypeCar))
        {
            bool = false;
            errorMessage += " Type Car,";
        }
        if(bool)
        {
            CreateRide(convertDate(x_Departure_Date),x_Street,x_Nr,x_Postal_Code,x_City
                ,x_Time,x_Category,x_Driver,x_Des_Street,x_Des_Nr,x_Des_Postal_Code,x_Des_City,
                x_TypeCar,convertDate(x_End_Date),x_End_Time,Navigation,User);
        }
        else
        {
            errorMessage = errorMessage.substring(0, errorMessage.length - 1);
            alert(errorMessage);
        }
    }
    
    /**
     * Will only be called if the local bool variable in the ValidRide method returns true
     * Meaning that all fields were filled in correctly. Will add all the info to an @param {Object} rideEntry - and
     * will then call the Meteor function Meteor.call('Rides.create').
     * If there is an error then the @param err will display the reason of the error with an alert to the User.
     * @param {Date} x_Departure_Date - The Departure Date.
     * @param {String} x_Street - The Street where the Driver has to go to.
     * @param {Number} x_Nr - The Street Nr.
     * @param {Number} x_Postal_Code - "The Postal Code of the Pickup Adres"
     * @param {String} x_City - "The City of the Pickup Adres"
     * @param {String} x_Time - "The Time the ride begins."
     * @param {String} x_Category - "The Category wether it is single or return."
     * @param {String} x_Driver - "The Amount of Drivers the ride will have."
     * @param {String} x_Des_Street - "The Destination Street."
     * @param {String} x_Des_Nr - "The Destination Number."
     * @param {Number} x_Des_Postal_Code - "The Destination Postal Code."
     * @param {Object} x_Des_City - "The Destination City.
     * @param {String} x_TypeCar - "The Type of Car the Customer drives"
     * @param {Date} x_End_Date - "The Date the ride ends"
     * @param {String} x_End_Time - "The Time the ride ends"
     * @param {Object} Navigation - "The Navigation Object. This is just being passed so it can navigate back to the HomeMenu.
     * it is from an external module : https://www.npmjs.com/package/react-navigation"
     * @param {Meteor User Object} User - "The User. Needs to be passed with the navigation. Otherwise the HomeMenu cannot
     * find the Meteor user after the Meteor call"
     */
    function CreateRide(x_Departure_Date,x_Street,x_Nr,x_Postal_Code,x_City
        ,x_Time,x_Category,x_Driver,x_Des_Street,x_Des_Nr,x_Des_Postal_Code,x_Des_City,
        x_TypeCar,x_End_Date,x_End_Time,Navigation,User)
    {
        const RideName = "From : "+x_Street+"/"+x_City+" Destination: "+x_Des_Street+"/"+x_Des_City;
        const userID = User._id;
        const rideEntry = {
            Naam : RideName,
            userId : userID,
            userPhone : User["profile"]["Phone_Number"],
            userFirstName : User["profile"]["First_Name"],
            userName : User["profile"]["Name"],
            userEmail : User["username"],
            confirmedByUser : false,
            rideFinished : false,
            confirmedDrivers : [],
            drivers: [],
            Date : x_Departure_Date,
            Street : x_Street,
            Nr : x_Nr,
            Postal_Code : x_Postal_Code,
            City : x_City,
            Time : x_Time,
            Catagory : x_Category, 
            RequiredDrivers : x_Driver,
            Des_street : x_Des_Street,
            Des_nr : x_Des_Nr,
            Des_Postal_Code : x_Des_Postal_Code,
            Des_City : x_Des_City,
            TypeCar : x_TypeCar,
            End_Date : x_End_Date,
            End_Time : x_End_Time
        }
            
            Meteor.call('rides.create', rideEntry, (err, result) => {
              if (err) {
                console.log(err.reason);
              }
              else
              {
                console.log("Navigating to home menu")
                Navigation.navigate('HomeMenu');
              }
            });
    }