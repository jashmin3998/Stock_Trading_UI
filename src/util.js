export function roundToTwoDigits(value){
    return value?.toFixed(2);

    
}

export function timeToseconds(timeString){
    const arr = timeString.split(":",3); // splitting the string by colon
    const arr1 = arr[2].split(" ");
    arr[2] = arr1[0];
    var seconds = arr[0]*3600+arr[1]*60+(+arr[2]); // converting

    if(arr1[1] === 'PM'){
        seconds = seconds+ 43200
    }
    return seconds;
}
