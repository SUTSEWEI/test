let constellation;
let constellation_Array = [
    'aquarius', //水瓶座 1.21-2.19
    'pisces', //雙魚座  2.20-3.20
    'aries', //牡羊座 3.21-4.19
    'taurus', //金牛座 4.20-5.20 
    'gemini', //雙子座 5.21-6.21
    'cancer', //巨蟹座 6.22-7.22
    'leo', //獅子座 7.23-8.22
    'virgo', //處女座 8.23-9.22
    'libra', //天秤座 9.23-10.23
    'scorpio', //天蠍座 10.24-11.21
    'sagittarius', //射手座 11.22-12.20 
    'capricorn' //摩羯座 12.21-1.20
];

let record = [];

let constellation_Object = 
    {aquarius : "水瓶座", 
    pisces : "雙魚座",
    aries : "牡羊座", 
    taurus : "金牛座", 
    gemini : "雙子座", 
    cancer : "巨蟹座", 
    leo : "獅子座", 
    virgo : "處女座", 
    libra : "天秤座", 
    scorpio : "天蠍座", 
    sagittarius : "射手座", 
    capricorn : "摩羯座"
}


let constellation_Day_Array = [20, 19, 20, 19, 20, 21, 22, 22, 22, 23, 21, 20]
let Spirit_number = 0;

document.querySelector("#submit").addEventListener('click', function () {
    let birthday;
    let birthdayArray = [];

    birthday = document.querySelector("#birthday").value;
    birthdayArray = birthday.split("-");
    
  


    if(checkRecord(birthdayArray))
    {
        // console.log(birthdayArray)
        // console.log(record)
        record = birthdayArray;
        check_Constellation(birthdayArray);
        cal_number(birthday);
        getInfo();
    }
    

})

function check_Constellation(birthdayArray) {
    let n = -1;
    if (Number(birthdayArray[2]) > constellation_Day_Array[Number(birthdayArray[1]) - 1]) {
        n = -1;
    } else if (Number(birthdayArray[1]) - 1 < 1) {
        n = 10;
    } else {
        n = -2;
    }
    constellation = constellation_Array[Number(birthdayArray[1]) + n]

}

function cal_number(birthday) {

    birthday = birthday.replace(/-/g, '')
    Spirit_number = 0;
    for (let i = 0; i < birthday.length; i++) {
        Spirit_number += Number(birthday[i]);
    }

    Spirit_number = `${Spirit_number}`;

    while (Spirit_number.length > 1) {

        let num = 0;

        for (let i = 0; i < Spirit_number.length; i++) {
            num += Number(Spirit_number[i]);
        }
        Spirit_number = `${num}`;
    }
    Spirit_number = Number(Spirit_number)
}


function getInfo() {
    $.ajax({
        type: "Get",
        url: `http://buildschoolapi.azurewebsites.net/api/number/GetNumerology?constellation=${constellation}&number=${Spirit_number}`,
        success: function (response) {
            showInfo(response)
        }
    });
}

function showInfo(data) {
    let ul = document.querySelector('#info')
    if(ul.innerHTML != "")
    {
        ul.innerHTML = ""
    }
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')
    p1.innerHTML = `星座 : ${constellation_Object[`${constellation}`]}`
    p2.innerHTML = `生命靈數 : ${Spirit_number}`
    p3.innerHTML = `${data}`
    ul.append(p1)
    ul.append(p2)
    ul.append(p3)
}

function checkRecord(data){
    let bln = true;
    
    if(record.length == 3)
    {
        if(record[0] == data[0] && record[1] == data[1] && record[2] == data[2])
    {
        bln = false;
    }

    }
    return bln;
}


