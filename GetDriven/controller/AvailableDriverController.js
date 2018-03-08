import Meteor, { createContainer, MeteorListView, header } from 'react-native-meteor';



    /**
     * Checks if's the Checker property of a Driver is true or false
     * If it is true it means that the Driver is selected for the Ride. else he is not
     * @param {Driver} item : The Driver that is available for the Ride
     */
export function CheckState(item,Drivers) {
        const DriverID = item.driverid;
        for (var i = 0; i < Drivers.length; i++) {
            if (Drivers[i].key == DriverID) {
                return Drivers[i].Checker;
            }
        }
        return false;
    }
    /**
     * Checks how many Drivers have the property Checker set on true
     * If it is true it means that the Driver is selected for the Ride. else he is not
     * It will go through each Driver in the Array and checks it's Checker property.
     * If it's true it will add it to the Counter and in the end it returns the counter
     * @param {Array[]} Drivers 
     */
export function CheckLength(Drivers)
{
        var counter = 0;
        for(var i = 0; i < Drivers.length;i++)
        {
            if(Drivers[i].Checker)
            {
                counter++;
            }
        }
        return counter;
}
/**
 * 
 * @param {Array[]} Drivers - "The Drivers"
 * @param {String} rideID - "The ID of the Ride"
 * @param {Object} Navigation - "The Navigation Object. This is just being passed so it can navigate back to the HomeMenu.
     * it is from an external module : https://www.npmjs.com/package/react-navigation"
     * @param {Object} User - "The User. Needs to be passed with the navigation. Otherwise the HomeMenu cannot
     * find the Meteor user after the Accounts.createUser call"
 */
export function SaveForCustomer(Drivers,rideID,Navigation)
{
    
    for(var i = 0; i < Drivers.length;i++)
    {
        if(Drivers[i].Checker)
        {
            const driverid = Drivers[i].key;
            const distance = Drivers[i].Distance;
            const First_Name = Drivers[i].First_Name;
            const Name = Drivers[i].Name;
            Meteor.call('rides.add.driver.confirmed',rideID,driverid,distance,Name,First_Name, (err, result) => {
            if(err)
            {
                alert(err.reason);
            }
            else
            {
                Navigation.navigate("HomeMenu");
            }
            });
        }
    } 
}
