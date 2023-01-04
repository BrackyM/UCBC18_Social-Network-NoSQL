const addDate = (date) => {
    let dateString = date.toString();


    // grabbing the last char of a date string and adding the st,nd,rd, and th to each date
    const lastChar = dateString.charAt(dateString.length - 1);

    if (lastChar === '1' && dateString !== '11') {
        dateString = `${dateString}st` ;
    } else if (lastChar === '2' && dateString !== '12'){
        dateString = `${dateString}nd`;
    } else if (lastChar === '3' && dateString !== '13') {
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }

    return dateString;
};

module.exports = (
    timestamp,
    { 
        monthLength = 'short',
        dateSuffix = true
    } = {} ) => {

        const months = {
            0: monthLength === 'short' ? 'Jan' : 'January',
            1: monthLength === 'short' ? 'Feb' : 'February',
            2: monthLength === 'short' ? 'Mar' : 'March',
            3: monthLength === 'short' ? 'Apr' : 'April',
            4: monthLength === 'short' ? 'May' : 'May',
            5: monthLength === 'short' ? 'Jun' : 'June',
            6: monthLength === 'short' ? 'Jul' : 'July',
            7: monthLength === 'short' ? 'Aug' : 'August',
            8: monthLength === 'short' ? 'Sep' : 'September',
            9: monthLength === 'short' ? 'Oct' : 'October',
            10: monthLength === 'short' ? 'Nov' : 'November',
            11: monthLength === 'short' ? 'Dec' : 'December',
        };

        const dateObject = new Date(timestamp);
        const formatMonth = months[dateObject.getMonth()];

        const dayInMonth = dateSuffix
            ? addDate(dateObject.getDate())
            : dateObject.getDate();

        const year = dateObject.getFullYear();
        let hour = dateObject.getHours() > 12
            ? Math.floor(dateObject.getHours() - 12)
            : dateObject.getHours();

        // The "0" hour is actually midnight and will display as "0" but we need to have this changed to "12"    
        if (hour === 0) {
            hour = 12;
        }

        const minutes = (dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes();

        const dayPeriod = dateObject.getHours() >= 12 ? 'pm' : 'am';
        // Creating the Time stamp to call 
        const formatTimeStamp = `${formatMonth} ${dayInMonth}, ${year} at ${hour}:${minutes} ${dayPeriod}`;

        return formatTimeStamp;
    }