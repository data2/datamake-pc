$(function () {

runEvery300Sec();

function runEvery300Sec() { 
     $.getJSON('https://datamake.cn/getRunMsg/', dealRunZhishu);
}

function dealRunZhishu(data){
    if (data.result == 0  && data.msg != null) {
        var result = '';
        $.each( data.msg, function(index, content){ 
            if (content['%'] > 0){
                result = result + '&nbsp;&nbsp;<span>' + content['name'] + '&nbsp;&nbsp;' + content['zhishu'] + '</span>' +' <span style="color:red;">&nbsp;&nbsp;' + content['%'] + '% </span>|'; 
            }else{
                result = result + '&nbsp;&nbsp;<span>' + content['name'] + '&nbsp;&nbsp;' + content['zhishu'] + '</span>' +' <span style="color:green;">&nbsp;&nbsp;' + content['%'] + '% </span>|'; 
            }
        });
        $('#bottom_msg').html(result.substring(0, result.length-1));
    }
    
}


});