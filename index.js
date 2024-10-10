// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2], 
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents:[],
    }
}
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}
function createTimeOutEvent(employeeRecord, dateTime){
    const [date,hour] = dateTime.split(" ")

    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour,10),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}
function createTimeInEvent(employeeRecord, dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10),
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    if (!timeInEvent || !timeOutEvent) {
        return 0; // Return 0 if no matching events are found
    }
    
    return (timeOutEvent.hour - timeInEvent.hour) / 100; // Assuming hours are in HHMM format
}
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date); // Use the previously defined function
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate; // Calculate wages
}
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date); // Ensure this function is defined
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate; // Calculate wages
}
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date); // Get all unique dates
    const totalWages = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date); // Aggregate wages for each date
    }, 0);
    return totalWages; // Return the total
}
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date); // Get all unique dates
    const totalWages = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date); // Aggregate wages for each date
    }, 0);
    return totalWages; // Return the total
}
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record); // Use allWagesFor to get total wages for each record
    }, 0);
}
