function change(str) {
    var arr = str.split('');
    for(let i = 0 ; i < arr.length ; i++){
        arr[i] = arr[i].toUpperCase() == arr[i] ? arr[i].toLowerCase() : arr[i].toUpperCase();
    }
    return arr.join('');
}

var arr = "KsadFRas";
console.log(change(arr));