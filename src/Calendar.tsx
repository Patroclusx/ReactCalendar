import {useEffect} from "react";
import * as date from "./jsx/dateHandler";
import * as React from "react";

const currentDate = new Date();

export default function Calendar () {

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="calendar">

                <div className="month">
                    <i className="fas fa-angle-left prev"></i>
                <div className="date">
                    {/* eslint-disable-next-line */}
                    <h1></h1>
                    <p></p>
                </div>
                    <i className="fas fa-angle-right next"></i>
                </div>

                <div className="weekdays">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div className="sun">Sun</div>
                </div>
                    <div className="days"/>
                </div>
            </div>
        </div>
    );
}


const renderCalendar = () => {
    currentDate.setDate(1); //Set current date

    const monthDays = document.querySelector(".days");

    //Calc indexes of dates to guide the display loops below
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const firstDayIndex = currentDate.getDay() === 0 ? currentDate.getDay() + 6 : currentDate.getDay() - 1;
    const nextDays = 42 - firstDayIndex - lastDay;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    //Display selected month/year and today's date
    document.querySelector(".date h1")!.innerHTML = months[currentDate.getMonth()] + ", " + currentDate.getFullYear();
    document.querySelector(".date p")!.innerHTML = new Date().toDateString();

    date.selectAllDatesInbetween(); //Check if selection(s) are made

    let days = "";

    //Display previous month's last few dates onto selected month
    for (let x = firstDayIndex; x > 0; x--) {
        let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevLastDay - x + 1);
        if (date.isInArray(date.allDatesSelected, day)) { //Separate selected dates
            days += `<div class="prev-date-s">${prevLastDay - x + 1}</div>`;
        } else {
            //Separate sat, sun and bank holidays
            if (day.getDay() === 6)
                days += `<div title="Saturday" class="prev-date">${prevLastDay - x + 1}</div>`;
            else if (day.getDay() === 0)
                days += `<div title="Sunday" class="prev-date">${prevLastDay - x + 1}</div>`;
            else if (date.isInArray(date.holidayDates, day))
                days += `<div title="${date.holidayNames[date.getIndexOfDate(date.holidayDates, day)]}" class="prev-date">${prevLastDay - x + 1}</div>`;
            else
                days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
        }
    }

    //Display selected month's dates
    for (let i = 1; i <= lastDay; i++) {
        let day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        let divClass = (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) ? "today" : "day"; //Separate today from rest
        if (date.isInArray(date.allDatesSelected, day)) { //Separate selected dates
            days += `<div class="${divClass}-s">${i}</div>`;
        } else {
            //Separate sat, sun and bank holidays
            if (day.getDay() === 6)
                days += `<div title="Saturday" class="${divClass}">${i}</div>`;
            else if (day.getDay() === 0)
                days += `<div title="Sunday" class="${divClass}">${i}</div>`;
            else if (date.isInArray(date.holidayDates, day)) {
                days += `<div title="${date.holidayNames[date.getIndexOfDate(date.holidayDates, day)]}" class="${divClass}">${i}</div>`;
            } else
                days += `<div class="${divClass}">${i}</div>`;
        }
    }

    //Display next month's first few dates onto selected month
    for (let j = 1; j <= nextDays; j++) {
        let day = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, j);
        if (date.isInArray(date.allDatesSelected, day)) { //Separate selected dates
            days += `<div class="next-date-s">${j}</div>`;
        } else {
            //Separate sat, sun and bank holidays
            if (day.getDay() === 6)
                days += `<div title="Saturday" class="next-date">${j}</div>`;
            else if (day.getDay() === 0)
                days += `<div title="Sunday" class="next-date">${j}</div>`;
            else if (date.isInArray(date.holidayDates, day))
                days += `<div title="${date.holidayNames[date.getIndexOfDate(date.holidayDates, day)]}" class="next-date">${j}</div>`;
            else
                days += `<div class="next-date">${j}</div>`;
        }
    }

    if(monthDays != null)
        monthDays.innerHTML = days;
};

const init = () => {
    /*INITIAL RENDER OF CALENDAR
    * Must be called again to re-render every time a change occurs
    */
    renderCalendar();

    //Previous and next month selectors
    document.querySelector(".prev")!.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    document.querySelector(".next")!.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    /*Date selector
    * Selects one or two dates points
    * Will only allow days that are neither weekend or bank holiday
    */
    document.querySelector(".days")!.addEventListener("click", (event) => {
        const input = event.target as HTMLElement;
        // eslint-disable-next-line no-restricted-globals
        let dateSelected = input.getAttribute("class");
        // eslint-disable-next-line no-restricted-globals
        let daySelected = Number.parseInt(input.innerHTML);

        if (!isNaN(daySelected)) {
            let selectedDateObj : Date = currentDate;

            if (dateSelected === "day" || dateSelected === "day-s" || dateSelected === "today" || dateSelected === "today-s") {
                selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), daySelected);
            } else if (dateSelected === "prev-date" || dateSelected === "prev-date-s") {
                selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daySelected);
            } else if (dateSelected === "next-date" || dateSelected === "next-date-s") {
                selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, daySelected);
            }

            if (selectedDateObj.getDay() === 0 || selectedDateObj.getDay() === 6) {
                alert("Can't select weekends!");
            } else if (date.isInArray(date.holidayDates, selectedDateObj)) {
                alert("Can't select bank holidays!");
            } else {
                if (date.selectedDates.length < 2 && !date.isInArray(date.allDatesSelected, selectedDateObj)) {
                    date.selectedDates.push(selectedDateObj);
                } else {
                    date.allDatesSelected.length = 0;
                    date.selectedDates.length = 0;
                }
            }
        } else {
            date.allDatesSelected.length = 0;
            date.selectedDates.length = 0;
        }

        renderCalendar();
    });
}