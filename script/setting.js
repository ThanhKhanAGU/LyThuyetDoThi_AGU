
var test = document.getElementById("show_demo").getContext("2d")
var tool_set ="Point"
var point_setting_from = document.getElementById("tool_point")
var line_setting_from = document.getElementById("tool_line")
var infor_setting_from = document.getElementById("tool_infor")
var help_setting_from = document.getElementById("tool_help")

var btnpoint = document.getElementById("btnPoint")
var btnline = document.getElementById("btnLine")
var btninfor = document.getElementById("btnInfor")
var btnhelp = document.getElementById("btnHelp")


function setpoint()
{
    test.clearRect(0,0,100,100);
    if(tool_set=="Point")
    {
        //cap nhat thong so
        colorBoderPointx = document.getElementById("input_colorBoderPoint").value
        colorBackgroundPointx = document.getElementById("input_colorBackgroundPoint").value
        lineWidthx = document.getElementById("input_lineWidth").value
        sizePointx = document.getElementById("input_sizePoint").value
        fontx = document.getElementById("input_font").value
        colorTextx  = document.getElementById("input_colorText").value


        //hien thi point tam
        test.beginPath()
        test.strokeStyle= colorBoderPointx
        test.fillStyle  = colorBackgroundPointx
        test.lineWidth  = lineWidthx
        test.arc(50, 50, sizePointx, 0, 2*Math.PI)

        test.fill()
        test.stroke()

        if(sizePointx!="")
        test.font       = sizePointx*1.25+"px " + fontx
        else
        test.font       = "Arial"*1.25+"px " + fontx
        test.fillStyle  = colorTextx
        test.strokeStyle= colorTextx
        test.lineWidth  = textWidth
        test.textAlign  = "center"
        test.fillText("12", 50, 50+sizePointx/2)
        test.strokeText("12", 50, 50+sizePointx/2)

        test.closePath()
    }
    if(tool_set=="Line")
    {
        lineSizex = document.getElementById("input_lineSize").value
        lineColorx = document.getElementById("input_lineColor").value
        lineArrowx =  document.getElementById("input_lineArrow").value
        lineTextColorx = document.getElementById("input_lineTextColor").value
        SizeNumberx = document.getElementById("input_SizeNumber").value

        //test thu
        test.lineWidth =lineSizex
        test.strokeStyle = lineColorx
        test.fillStyle = lineArrowx
        let x2 = 90
        let y2 = 90
        
        let x1 = 0
        let y1 = 0

        var dx = x1 - x2;
        var dy = y1 - y2;
        var angle = Math.atan2(dy, dx);
        let size = sizePoint
        test.beginPath()
        test.moveTo(x2,y2)
        
        test.lineTo(x2 + size * Math.cos(angle + Math.PI/8),  y2  + size * Math.sin(angle + Math.PI/8))
        test.lineTo(x2 +  size * Math.cos(angle - Math.PI/8),  y2 + size * Math.sin(angle - Math.PI/8))
        test.lineTo(x2,y2)
        test.fill()
        test.moveTo(x2 + sizePoint * Math.cos(angle + Math.PI*2), y2 + sizePoint * Math.sin(angle + Math.PI*2))
        test.lineTo(x1,y1)
        test.stroke()
        test.fill()
        test.closePath()
        
        test.beginPath()
        let x = test.globalCompositeOperation
        test.globalCompositeOperation = 'destination-out'
        test.arc(50,50, SizeNumberx, 0, Math.PI*2);
        test.fill();
        test.globalCompositeOperation = x
        test.font       = SizeNumberx+"px " + font
        test.fillStyle  = lineTextColorx
        test.textAlign  = "center"
        test.fillText(12,50, 50+SizeNumberx/4)
        test.closePath()
    }
}
setInterval(() => {
    setpoint()
}, 100);
function setting_show()
{
    if(document.getElementById("set").style.left=="-500px" )
    {
       
        document.getElementById("set").style.left="30px" 
    }
    else
    {
        document.getElementById("set").style.left="-500px" 
    }
}
function defaul()
{
    document.getElementById("input_colorBoderPoint").value ="#000000"
    document.getElementById("input_colorBackgroundPoint").value ="#ffffff"
    document.getElementById("input_lineWidth").value = 3
    document.getElementById("input_sizePoint").value = 20
    document.getElementById("input_font").value = "Comic Sans MS"
    document.getElementById("input_colorText").value = "#ff0000"

    document.getElementById("input_lineSize").value = 1
    document.getElementById("input_lineColor").value ='#000000'
    document.getElementById("input_lineArrow").value ='#000000'
    document.getElementById("input_lineTextColor").value ='#000000'
    document.getElementById("input_SizeNumber").value =20
    exiu()
}
function exiu()
{
    colorBoderPoint= document.getElementById("input_colorBoderPoint").value
    colorBackgroundPoint= document.getElementById("input_colorBackgroundPoint").value
    lineWidth = document.getElementById("input_lineWidth").value
    sizePoint = document.getElementById("input_sizePoint").value
    font = document.getElementById("input_font").value
    colorText= document.getElementById("input_colorText").value

    lineSize = document.getElementById("input_lineSize").value
    lineColor = document.getElementById("input_lineColor").value
    lineArrow =  document.getElementById("input_lineArrow").value
    lineTextColor = document.getElementById("input_lineTextColor").value
    SizeNumber = document.getElementById("input_SizeNumber").value

    setting_show()
}
function btnsetpoint()
{
    tool_set="Point"
    btnpoint.style.background="#0f85f5"
    btnline.style.background= "#b5b5b5"
    btninfor.style.background="#b5b5b5"
    btnhelp.style.background="#b5b5b5"

    point_setting_from.style.display= "block"
    line_setting_from.style.display= "none"
    infor_setting_from.style.display= "none"
    help_setting_from.style.display= "none"
}
function btnsetline()
{
    tool_set="Line"
    btnpoint.style.background="#b5b5b5"
    btnline.style.background= "#0f85f5"
    btninfor.style.background="#b5b5b5"
    btnhelp.style.background="#b5b5b5"

    point_setting_from.style.display= "none"
    line_setting_from.style.display= "block"
    infor_setting_from.style.display= "none"
    help_setting_from.style.display= "none"
}
function btnsetinfor()
{
    tool_set=""
    btnpoint.style.background="#b5b5b5"
    btnline.style.background="#b5b5b5"
    btninfor.style.background="#0f85f5"
    btnhelp.style.background="#b5b5b5"

    point_setting_from.style.display= "none"
    line_setting_from.style.display= "none"
    infor_setting_from.style.display= "block"
    help_setting_from.style.display= "none"
}
function btnsethelp()
{
    tool_set=""
    btnpoint.style.background="#b5b5b5"
    btnline.style.background="#b5b5b5" 
    btninfor.style.background="#b5b5b5"
    btnhelp.style.background="#0f85f5"

    point_setting_from.style.display= "none"
    line_setting_from.style.display= "none"
    infor_setting_from.style.display= "none"
    help_setting_from.style.display= "block"
}
