var myCanvas = {
    init: function() {
        this.canvasDom();
        this.canvasLine();
    },
    canvasDom: function() {
        var _this = this;
        var nameDataSource = "李晓琪";
        var nameSourcePic = "./1.jpg";
        var canvasStr = ''; //canvasStr = canvasSourceStr + canvasDomStr;
        var canvasSourceStr = '';
        var canvasDomStr = '';
        //原点
        canvasSourceStr += '<div class="canvas-item canvas-item-source" >' +
            '<span class="canvas-item-name">' + nameDataSource + '</span>' +
            '<img class="canvas-item-img" src="' + nameSourcePic + '"></div>'

        //四周的dom
        var nameData = ["李晓琪", "李晓琪", "李晓琪",  "李晓琪",  "李晓琪"];
        var namePic = ["./1.jpg", "./1.jpg", "./1.jpg", "./1.jpg", "./1.jpg"];
        for (var index = 0; index < nameData.length; index++) {
            canvasDomStr += '<a target="_blank" href="http://www.baidu.com" class="canvas-item canvas-item-' + index + '">' +
                '<span class="canvas-item-name">' + nameDataSource + '</span>' +
                '<img class="canvas-item-img" src="' + nameSourcePic + '">'+
                '<div class="line line-'+index+'"></div></a>'
        }   

        //汇总
        canvasStr = canvasSourceStr + canvasDomStr;
        $('#canvas-container').append(canvasStr);
        
        //添加样式（样式是计算的）
        _this.canvasStyle(nameData);
        //画线条
        _this.canvasLine(nameData);
    },
    canvasStyle: function(nameData) {
        var nameData = nameData;
        var width = $('#canvas-container').css('width');
        var height = $('#canvas-container').css('height');
        var anglePer = 2 * Math.PI / nameData.length;
        var canvasR = 200;
        
        for (var index = 0; index < nameData.length; index++) {
            var angleCurrent = Math.PI / 2 + (anglePer * index);
            var angleDeg = ( (360 / nameData.length) * index) + "deg";
            var x = Math.cos(2 * Math.PI - angleCurrent) * canvasR;
            var y = Math.sin(2 * Math.PI - angleCurrent) * canvasR;
            var xPosition = 300 + x;
            var yPosition = 300 + y;
            $('.canvas-item-' + index).css({
                "left": xPosition,
                "top": yPosition,
                "margin-left": "-35px",
                "margin-top": "-35px"
            });
           
        }
    },
    canvasLine:function(nameData){
        var nameData = nameData;
        var len = nameData.length;
        var myCanvas=document.getElementById("myCanvas");
        var ctx = myCanvas.getContext("2d");
        var maxHeight = 600;
        var maxWidth = 600;
       
        myCanvas.width = maxWidth;
        myCanvas.height = maxHeight;
        var len = 5;

        ctx.beginPath();
        
        var anglePer = 2 * Math.PI / len;
        var canvasR = 200;
        for (var i = 0; i < len; i++) {
            ctx.beginPath();
            var index = i;
            var angleCurrent = Math.PI / 2 + (anglePer * index);
            // 
            var x = Math.cos(2 * Math.PI - angleCurrent) * canvasR;
            var y = Math.sin(2 * Math.PI - angleCurrent) * canvasR;
            var xPosition = 300 + x;
            var yPosition = 300 + y;

            ctx.moveTo(xPosition,yPosition);
            
            ctx.lineTo(300,300);
            
            ctx.strokeStyle = "#333";
            ctx.stroke()
            ctx.closePath();

            if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
                 ctx.font="30px courier";
            }else{
                ctx.font="12px courier";
            }
            // ctx.font="30px courier";
            ctx.fontWeight = "normal";
            ctx.fillStyle = "#000000";

       }
    }
}

myCanvas.init();
