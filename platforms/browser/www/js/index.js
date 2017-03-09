//Public Value

var xmlHttp;
var dataToday = [];
var dataBodyFat = [];
var dataMuscle = [];
var dataWeight = [];



//About function

window.onload = function() {
    start();
    getchPHPreturn();
};




$('#page_1_btn').click(function() {
    $('#page_1').show();
    $('#page_2').hide();
    $('#page_3').hide();
})

$('#page_2_btn').click(function() {
    $('#page_1').hide();
    $('#page_2').show(); 
    $('#page_3').hide();
})

$('#page_3_btn').click(function() {
    $('#page_1').hide();
    $('#page_2').hide();
    $('#page_3').show();
})



















































$('#clacData').click(function() {
    if($('#weight').val() == '' || $('#bodyFat').val() == '' || $('#muscle').val() == '')
    {
        $('#showData').html('資料輸入不完全');
        return;
    }

    if($('#weight').val().length > 5)
        return;
    if($('#bodyFat').val().length > 4)
        return;
    if($('#muscle').val().length > 4)
        return;


    var updataRecord;//傳給資料庫的JSON

    var bodyFat = $('#bodyFat').val() * 0.01;
    var muscle = $('#muscle').val() * 0.01;


    var today_time = new Date();

    var today = today_time.getFullYear() * 10000 + (today_time.getMonth()+1) * 100 + 
                today_time.getDate();

    var bodyFatSum = $('#weight').val() * bodyFat;
    var muscleSum = $('#weight').val() * muscle;

    $('#showData').html('體重 = ' + $('#weight').val() + '<br>脂肪體重 = ' + bodyFatSum.toFixed(4) +
                        '<br>肌肉體重 = ' + muscleSum.toFixed(4));

    bodyFatSum = bodyFatSum.toFixed(4);
    muscleSum = muscleSum.toFixed(4)

    updataRecord = {Today: today, Weight: $('#weight').val(), BodyFat: bodyFatSum, Muscle: muscleSum}; 

    $.ajax({
         url: 'http://140.130.35.62/csie40343113/php/updataRecord.php',
         type: 'POST',
         data: updataRecord,
         success: function(result,status){
         },
         error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
            alert(errorThrown);
         }
    });
})

$('#clearData').click(function() {
    $('#weight').val('');
    $('#bodyFat').val('');
    $('#muscle').val('');
    $('#showData').html('');
})

function start(){
    $('#page_2').hide();
    $('#page_3').hide();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;

    var color = Chart.helpers.color;
    var barChartData = {
        labels: dataToday,
        datasets: [{
            label: '體重',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: dataWeight
        },  {
            label: '體脂肪',
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: dataBodyFat
        },  {
            label: '肌肉量',
            backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
            borderColor: window.chartColors.green,
            borderWidth: 1,
            data: dataMuscle
        }]
    };

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '體重'
            }
        }
    });
}

function showRSS(str){
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return;
    }
    var url="http://140.130.35.62/csie40343113/php/getrss.php";
    url=url+"?q="+str;
    url=url+"&sid="+Math.random();
    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function stateChanged() { 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        document.getElementById("rssOutput")
        .innerHTML=xmlHttp.responseText;
    } 
}

function GetXmlHttpObject(){
    var xmlHttp=null;
    try
    {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {
     // Internet Explorer
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function getchPHPreturn() {

    $.getJSON('http://140.130.35.62/csie40343113/php/show.php',function(data,status){
        SwitchData(data);
    });

}

function SwitchData(data) {

    var tempToday;
    
    for(var i = 1 ; i < data.length ; i++)
    {
        dataToday[i] = data[i].Today;
        dataWeight[i] =  data[i].Weight;
        dataBodyFat[i] = data[i].BodyFat;
        dataMuscle[i] = data[i].Muscle;
    }


}