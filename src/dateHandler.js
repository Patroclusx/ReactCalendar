export const selectedDates = [];
export const allDatesSelected = [];
export const holidayDates = [];
export const holidayNames = [];
const ukHolidayAPI = 'https://www.gov.uk/bank-holidays.json';

//Fetch JSON from Holidays API
fetch(ukHolidayAPI)
    .then(blob => blob.json())
    .then(data => fetchUKHolidaysDates(data));

//Turn Holidays JSON into array of Date objects
export const fetchUKHolidaysDates = (data) => {
    holidayDates.length = 0;

    /* Possible holidays to fetch:
    * ["england-and-wales"], ["northern-ireland"], ["scotland"]
    */
    let england = data["england-and-wales"].events;

    const englandArray = england.map((items) => {
        holidayNames.push(items.title);
        const [year, month, date] = items.date.split("-"); 
        return new Date(year, month-1, date);
    });

    holidayDates.push(...englandArray);
}

//Checks if given date is in given array
export const isInArray = (array, value) => {
    return array.length > 0 && !!array.find(item => {return item.getTime() === value.getTime()});
}

//Get index of date in given array
export const getIndexOfDate = (array, value) => {
    const date = array.find(item => {return item.getTime() === value.getTime()});
    if(date !== undefined)
        return array.indexOf(date);
    else
        return 0;
}

//Store valid selected dates in an array
export const selectAllDatesInbetween = () => {
    if(selectedDates.length > 0) {
        allDatesSelected.length = 0;

        if(selectedDates.length > 1) { //Check if only one or multiple dates are selected
            //Make sure 'start' is before the 'end' date
            let start = (selectedDates[0] <= selectedDates[1] ? selectedDates[0] : selectedDates[1]);
            let end = (selectedDates[1] >= selectedDates[0] ? selectedDates[1] : selectedDates[0]);

            //Loop through dates from 'start' to 'end'
            for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
                if(day.getDay() !== 0 && day.getDay() !== 6 && !isInArray(holidayDates, day)) //Skip weekends and bank holidays
                allDatesSelected.push(new Date(day));
            }
        } else {
            allDatesSelected.push(selectedDates[0]);
        }
    }
}

/*Manual date selection between two given Date object points
* 'dateB' is optional in case only one date is to be selected
* Returns array of selected dates if successful
*/
export const manualDateSelector = (dateA, dateB) => {
    selectedDates.length = 0;
    allDatesSelected.length = 0;

    if(dateA != null && dateA instanceof Date) {
        if(dateA.getDay() !== 0 && dateA.getDay() !== 6 && !isInArray(holidayDates, dateA)) {
            selectedDates.push(dateA);
        }else{
            return null;
        }
    }
    if(dateB != null && dateB instanceof Date) {
        if(dateB.getDay() !== 0 && dateB.getDay() !== 6 && !isInArray(holidayDates, dateB)) {
            if(selectedDates.length < 2)
                selectedDates.push(dateB);
        }else{
            return null;
        }
    }

    if(selectedDates.length > 0) {
        selectAllDatesInbetween();
        return allDatesSelected;
    }

    return null;
}