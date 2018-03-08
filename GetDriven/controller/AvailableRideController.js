import Meteor, { createContainer, MeteorListView, header } from 'react-native-meteor';


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