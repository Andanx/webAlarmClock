//模式时钟实现
(function () {
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    var hour = document.getElementsByClassName("hour")[0];
    var minute = document.getElementsByClassName("minute")[0]; 
    var secondLeft = document.getElementsByClassName("semiCircleLeft")[0];
    var secondRight = document.getElementsByClassName("semiCircleRight")[0];
    var start = function () {
        // 当前时间
        var now = new Date();
            // 午夜12点整
            midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            // 当前时间与午夜12的之间的毫秒差
            ms = now.getTime() - midnight.getTime();
            // 计算时、分、秒
            hh = ms / (1000 * 60 * 60);
            mm = hh * 60;
            ss = (mm * 60 - 30) * 6;
            ssc = 360 - ss % 360;
        // 实现时钟旋转
        hour.style.transform = "rotate(" + (hh * 30 + (hh / 24)) + "deg)";
        minute.style.transform = "rotate(" + (mm * 6) + "deg)";
        if(ssc <= 180){
        	secondRight.style.background = '#3b63f6';
        	secondLeft.style.transform = "rotate(0deg)";
        	secondRight.style.transform = "rotate(" + (ss-180) + "deg)";
        }else
        if(ssc > 180){
        	secondRight.style.background = 'white';
        	secondRight.style.transform = "rotate(0deg)";
        	secondLeft.style.transform = "rotate(" + ss + "deg)";
        }
//      second.style.transform = "rotate(" + (ss * 6) + "deg)";
        window.requestAnimationFrame(start);
    };
    start();
//  window.requestAnimationFrame(start);
})();