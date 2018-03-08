/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if a Street/City/Name... is valid.
 * Because these fields can have special characters,
 * All the characters between the brackets are usable in the field
 * /^ $/ Starts and ends
 * {1,40} : Is of length 1 minimum and 40 maximum
 * (a-z) -> You can use the Lowercase alphabet
 * (A-Z) -> You can use the Uppercase alphabet
 * [àáâäãåąč....] Al the special that can be used 
 * @param {String} input 
 */
export function checkString(input)
    {
        input = input.trim();
       var pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆ_ ČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð-]{1,40}$/;
        return pattern.test(input);
    }
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the Type Of Car is valid.
 * Works the same way as checkString but a Car's name can contain numbers
 * /^ $/ Starts and ends
 * {1,40} : Is of length 1 minimum and 40 maximum
 * (a-z) -> You can use the Lowercase alphabet
 * (A-Z) -> You can use the Uppercase alphabet
 * (0-9) -> Numbers are allowed
 * [àáâäãåąč....] Al the special that can be used 
 * @param {String} input 
 */
export function checkCarString(input)
    {
        input = input.trim();
       var pattern = /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆ_ ČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð-]{1,40}$/;
        return pattern.test(input);
    }
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the Nr is valid.
 * /^ $/ Starts and ends
 * {1,4} : Is of length 1 minimum and 4 maximum
 * \d : It has to be a number
 * @param {String} input 
 */
export function checkNumber(input)
    {
        var pattern = /^\d{1,4}$/;
        return pattern.test(input);
    }
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the Postal Number is valid.
 * has a var patternBel. so later postal codes for multiple countries can be added
 * /^ $/ -> Starts and ends
 * {4} -> Is of length exactly 4
 * \d -> It has to be a number
 * @param {String} input 
 */
export function checkPostalNumber(input)
{
    var patternBEL = /^\d{4}$/;
    return patternBEL.test(input);
}
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the Password is valid.
 * /^ $/ Starts and ends
 * {5,20} -> Is of length minimum 5 and maximum 20
 * (?=.*\d) -> It has to contain at least 1 number
 * (?=.*[A-Za-z]) -> It has to contain at least 1 Uppercase or LowerCase Letter
 * (?=.*[$@$!%*#?&]) -> It has to contain at least 1 Special Character
 * @param {String} input 
 */
export function checkPassword(input)
    {
        var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,20}$/;
        return pattern.test(input);
    }
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the Email is valid.
 * Is copied from the site : http://emailregex.com/
 * Which holds more info about how the regex works
 * @param {String} input 
 */
export function checkEmail(input)
    {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(input);
    }
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the Bank Number is valid.
 * Is a placeholder regex because we have difficulties knowing
 * if it can validate every bank account number in the world.
 * /^ $/ Starts and ends
 * {16} -> The length is exactly 16 characters
 * (A-Z) -> You can use the Uppercase alphabet
 * (0-9) -> Numbers are allowed
 * @param {String} input 
 */
export function checkBankNumber(input)
{
    var pattern = /^[A-Z0-9]{16}$/
    return pattern.test(input);
}
/**
 * Checks to see if an input follows the rules of the regex.
 * Is used to see if the SocialSec is valid.
 * It follows the European guidelines = XX.XX.XX-XXX.XX
 * /^ $/ Starts and ends
 * ([0-9]{2}) -> 2 Numbers
 * [.] -> The literal Character .
 * (0-9) -> Numbers are allowed
 * @param {String} input 
 */
export function checkSocialSec(input)
{
    var pattern = /^([0-9]{2})[.]([0-9]{2})[.]([0-9]{2})[-]([0-9]{3})[.]([0-9]{2})$/
    return pattern.test(input);
}
/**
 * Checks to see if an input follows the rules.
 * Is used to see if the Phone Number is valid.
 * Uses the isValidNumber() function of the phone number module : 
 * https://github.com/thegamenicorus/react-native-phone-input
 * Has an extra pattern because the isValidNumber() does not check length
 * or checks for special characters
 * /^ $/ Starts and ends
 * ([0-9+]) -> Allows Numbers and the + sign
 * {8,30} -> Length of minimum 8 or maximum 30
 * @param {String} value, - contains the phone number string
 * @param {Boolean} checker - checks if there has been a change. Otherwise it will run the function with value null
 * causing the app to crash
 */
export function checkPhoneNumber(value,checker)
    {
        var pattern = /^[0-9+]{8,30}$/
        if(checker)
        {
            return value.isValidNumber() && pattern.test(value.getValue()) ;
        }
        return false;
    }
/**
 * Checks to see if an input follows the rules.
 * Is used to see if the Birth_Date for the Driver is valid
 * As a driver has to be at least 20 years old to be a valid Driver
 * Gets the current date and gets it year/month/day and puts it into variables
 * first checks if the difference between the input date and now is larger then 20
 * then it will check for each value(year,month,day) if it's larger then now
 * @param {String} input, - contains the Date
 */
export function checkDate(input)
{
    var currentDate = new Date();
    
    input  = new Date(input);
    var maxYear = currentDate.getYear();
    var maxMonthOnMaxYear = currentDate.getMonth();
    var maxDayOnMaxMonthOnMaxYear = currentDate.getDay();
    if (maxYear - input.getYear() > 20) {
        return true;
    }
    if (input.getYear() + 20 == maxYear) {
        if (input.getMonth() < maxMonthOnMaxYear) {
            return true;
        }
        if (input.getMonth() == maxMonthOnMaxYear) {
               var result  = input.toString().split(" ");
               var resultDate = currentDate.toString().split(" ");
            if(parseInt(result[2]) <= parseInt(resultDate[2]))
            {
               return true;
            }
        }
    }
    return false;
}
/**
 * Converts the date timestamp to the XX/XX/XXXX format
 * Is used to display the date in a readable form
 * @param {String} inputFormat
 */
export function convertDate(inputFormat)
{
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }
/**
 * Checks to see if an input follows the rules.
 * Is used to see if the Date is later then now
 * As a driver has to be at least 20 years old to be a valid Driver
 * first uses checkDateLater to convert it to XX/XX/XXXX and then
 * compares if the year is larger then this year.If equal go lower
 * It will return true if the date is later then the current date
 * @param {String} input, - contains the Date
 */
export function checkDateLater(input)
{
    var startdate = convertDate(input).split('/');
    var enddate = convertDate(new Date()).split('/');
    
    if(parseInt(startdate[2]) >= parseInt(enddate[2]))
		{
            if(parseInt(startdate[1]) > parseInt(enddate[1]))
            {
                return true;
            }
			if(parseInt(startdate[1]) == parseInt(enddate[1]))
			{
                if(parseInt(startdate[0]) >= parseInt(enddate[0]))
                {
                    return true;
                }
            }
        }
    return false;
}