//Public Value

//時間
var today_time = new Date();
var thisYear = today_time.getFullYear();
var thisMonth = today_time.getMonth() + 1;
var thisDay = today_time.getDate();

var today = thisYear * 10000 + thisMonth * 100 + thisDay;
var setWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

//All data Array

var allData = [];

//讓chart輸出的陣列

var dataWeek = [];
var dataToday = [];
var dataHour = [];
var dataBodyFat = [];
var dataMuscle = [];
var dataWeight = [];

//初始化
init();

//按鍵一
$('#page_1_btn').click(function() {
    $('#page_1').show();
    $('#page_2').hide();
})

//計算按鍵
$('#clacData').click(function() {
    check();//判斷資料輸入

    var updataRecord;//傳給資料庫的JSON

    var bodyFat = $('#bodyFat').val() * 0.01;
    var muscle = $('#muscle').val() * 0.01;

    var bodyFatSum = $('#weight').val() * bodyFat;
    var muscleSum = $('#weight').val() * muscle;

    bodyFatSum = bodyFatSum.toFixed(4);
    muscleSum = muscleSum.toFixed(4);

    // $('#showData').html('體重 = ' + $('#weight').val() + '<br>脂肪體重 = ' + bodyFatSum +
    //                     '<br>肌肉體重 = ' + muscleSum);

    updataRecord = {Today: today, Weight: $('#weight').val(), BodyFat: bodyFatSum, Muscle: muscleSum}; 

    $.ajax({
         url: 'http://140.130.35.62/csie40343113/php/updataRecord.php',
         type: 'POST',
         data: updataRecord,
         success: function(result,status){
         },
         error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
         }
    });
})

//清除按鍵
$('#clearData').click(function() {
    $('#weight').val('');
    $('#bodyFat').val('');
    $('#muscle').val('');
    $('#showData').html('');
})

//按鍵二
$('#page_2_btn').click(function() {
    $('#page_1').hide();
    $('#page_2').show();
    getchPHPreturn(); 
})
//選擇日期
$('#time').change(function () {
    switch($(this).val())
    {
        case 'day':
            drawChartByDay();
            break;
        case 'week':
            drawChartByWeek();
            break;
        case 'mon':
            drawChartByMon();
            break;
        case 'year':
            drawChartByYear();
            break;
    }
})

//初始化
function init() {
    $('#page_2').hide();
    getchPHPreturn();
}

//檢查輸入
function check() {
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
}

//接收資料
function getchPHPreturn() {
    $.getJSON('http://140.130.35.62/csie40343113/php/show.php',function(data,status){
        allData = data;
    });
}

//繪製圖表-Day
function drawChartByDay(){

    var ctx = initCanvas();

    screeningDataByDay();

    var color = Chart.helpers.color;
    var barChartData = {
        labels: dataHour,
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
                text: '今天的體重'
            }
        }
    });
}

//繪製圖表-Week
function drawChartByWeek(){

    var ctx = initCanvas();

    theWeek = screeningDataByWeek();

    var color = Chart.helpers.color;
    var barChartData = {
        labels: dataWeek,
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
                text: '這七天的體重'
            }
        }
    });
}

//繪製圖表-Mon
function drawChartByMon(){

    var ctx = initCanvas();

    screeningDataByMon();

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
                text: thisMonth + '月的體重'
            }
        }
    });
}

//繪製圖表-Year
function drawChartByYear(){

    var ctx = initCanvas();

    screeningDataByYear();

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
                text: thisYear + '年的體重'
            }
        }
    });
}

//篩檢資料-Day
function screeningDataByDay() {
    var i;
    var j = 0;
    var temp = [];

    clearData();    


    for(i = 0 ; i < allData.length ; i++)
    {
        if(allData[i].Today == today)
        {
            dataHour[j] = allData[i].Hour;
            dataWeight[j] =  allData[i].Weight;
            dataBodyFat[j] = allData[i].BodyFat;
            dataMuscle[j] = allData[i].Muscle;
            j++;
        }
    }
}

//篩檢資料-Week
function screeningDataByWeek() {
    var i,j;
    var k = 0;
    var tempDay;
    var tempToday = 0;
    var tempWeek = [];
    var ArrayDay = [];
    var before_7Day = thisDay - 7;

    //七天前禮拜幾
    tempDay = new Date(thisYear, thisMonth - 1, before_7Day).getDay();

    //星期一 ~ 星期日 存至陣列
    for(i = 0; i < 7; i++){
        tempWeek[i] = (tempDay + i + 1) % 7;
    }

    //如果七天前是上個月
    if(before_7Day < 0){
        if(thisMonth == 12)//如果上個月是12月
            var thisDate = new Date(thisYear - 1, 12, 0);
        else 
            var thisDate = new Date(thisYear, thisMonth, 0);

        for (i = 0 ; i < 7 ; i++)
            ArrayDay[i] =  thisDate + before_7Day + i + 1;
            if(ArrayDay[i] > thisDate)//如果日期大於當月天數
                ArrayDay[i] - thisDate;//-到上個月總天數
        }
    else//假設正常
        for (i = 0 ; i < 7 ; i++)
            ArrayDay[i] = before_7Day + i + 1;

    clearData(); //清除圖表陣列

    for(i = 0 ; i < allData.length ; i++)
    {
        tempToday = allData[i].Today[6] + allData[i].Today[7];
        for(j = 0 ; j < 7 ; j++)
        {
            if(tempToday == ArrayDay[j])
            {
                dataWeek[k] = setWeek[tempWeek[j]];
                dataWeight[k] =  allData[i].Weight;
                dataBodyFat[k] = allData[i].BodyFat;
                dataMuscle[k] = allData[i].Muscle;
                k++;
            }
        }
    }
}

//篩檢資料-Mon
function screeningDataByMon() {
    var i;
    var j = 0;
    var tempToday = '';

    clearData();//清除圖表陣列

    for(i = 0 ; i < allData.length ; i++)
    {
        tempToday = allData[i].Today[4] + allData[i].Today[5];
        if(tempToday == thisMonth)
        {
            dataToday[j] = tempToday + '/' + allData[i].Today[6] + allData[i].Today[7];
            dataWeight[j] =  allData[i].Weight;
            dataBodyFat[j] = allData[i].BodyFat;
            dataMuscle[j] = allData[i].Muscle;
            j++;
        }
    }
}

//篩檢資料-Year
function screeningDataByYear() {
    var i;
    var j = 0;
    var tempToday = '';

    clearData();//清除圖表陣列    

    for(i = 0 ; i < allData.length ; i++)
    {
        tempToday = allData[i].Today[0] + allData[i].Today[1] + allData[i].Today[2] + allData[i].Today[3];
        if(tempToday == today_time.getFullYear())
        {
            dataToday[j] = allData[i].Today[4] + allData[i].Today[5] + '/' + allData[i].Today[6] + allData[i].Today[7];
            dataWeight[j] =  allData[i].Weight;
            dataBodyFat[j] = allData[i].BodyFat;
            dataMuscle[j] = allData[i].Muscle;
            j++;
        }
    }
}

//初始化Canvas
function initCanvas() {
    $('#canvas').remove(); // this is my <canvas> element
    $('#container').append('<canvas id="canvas"></canvas>');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;
        
    var ctx = document.getElementById("canvas").getContext("2d");

    return ctx;
}

//清空陣列
function clearData() {
    dataWeek = [];
    dataToday = [];
    dataHour = [];
    dataBodyFat = [];
    dataMuscle = [];
    dataWeight = [];
}