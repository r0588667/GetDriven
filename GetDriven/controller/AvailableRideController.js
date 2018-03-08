import Meteor, { createContainer, MeteorListView, header } from 'react-native-meteor';


/**
 * Will Save the Rides the Driver choose to participate in.
 * It will go through each Ride in the Rides Array to see if the
 * Ride has a valid distance. This being a number and larger or equal to 0
 * After this it will make sure the Ride has been checked by the user before
 * calling the Meteor methode
 * @param {Array[]} Rides - "The Array of Available Rides"
 * @param {String} DriverID  - "The Id of the logged in user"
 * @param {Object} Navigation  - "The Navigation Object. This is just being passed so it can navigate back to the HomeMenu.
     * it is from an external module : https://www.npmjs.com/package/react-navigation"
 */
export function SaveForDriver(Rides,DriverID,Navigation)
{
    var Error = false;
    var isChecked = false;
    for(var i = 0; i < Rides.length;i++)
    {
        Error = false;
        const rideId = Rides[i].key;
        const distance = Rides[i].distance;
        if(distance <= 0 || isNaN(distance))
        {
            Error = true;
            break;
        }
        isChecked = Rides[i].checked;
        const First_Name = Rides[i].First_Name;
        const Name = Rides[i].Name;
        if(isChecked)
        {
            if(Error)
            {
                alert("Make sure all Rides have a Distance larger then 0");
            }
            else
            {
            Meteor.call('rides.add.driver.current',rideId, distance,Name,First_Name, (err, result) => {
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
} 