class Line
{
    constructor(point1,point2,number)
    {
       
        this.show = false
        this.id = lineID++
        this.number =number //thuộc tính chứa trọng số
        this.dir = false //có hướng hay không
        if(point1!=undefined&&point2!=undefined){
            this.dirX = (point1.x-point2.x)// hướng của x
            this.dirY = (point2.y-point2.y)// hướng của y
        }
        this.point1= point1 //Opject để sử dụng điểm đầu 
        this.point2= point2 //Opject để sử dụng điểm cuối
    }
    Paint()
    {
        if(select.line == this.id&&(mouse.tool=="DEL"||mouse.tool=="SET"))
        {
            lineSize*=3
            if(checkl)
            {
                if(sound) selpl.play()
                checkl = false
            }
        }
        this.setStyle()
        {
            if(this.point1.id==this.point2.id)
            {

                ctx.beginPath()
                ctx.arc(this.point1.x-sizePoint*2.1,this.point1.y+sizePoint*0.4 ,sizePoint*1.6,0,Math.PI*2)
                ctx.stroke()
                ctx.closePath()
                if(isNumber){
                    ctx.beginPath()
                    let x = ctx.globalCompositeOperation
                    ctx.globalCompositeOperation = 'destination-out'
                    ctx.arc(this.point1.x-sizePoint*3.7,this.point1.y+sizePoint*0.8, SizeNumber, 0, Math.PI*2);
                    ctx.fill();
                    ctx.globalCompositeOperation = x
                    ctx.font       = SizeNumber+"px " + font
                    ctx.fillStyle  = lineTextColor
                    ctx.textAlign  = "center"
                    ctx.fillText(this.number,this.point1.x-sizePoint*3.7,this.point1.y+sizePoint)
                    ctx.closePath()
                    }

            }
            if(Matrix[this.point1.id][this.point2.id].dir
                ==Matrix[this.point2.id][this.point1.id].dir &&(isNumber||direct)) 
            {
            //điểm 
            // var headlen = 10; // length of head in pixels
            if(select.point==this.point2.id)
                sizePoint*=1.2
            let x2 = this.point2.x
            let y2 = this.point2.y
            
            let x1 = this.point1.x
            let y1 = this.point1.y

            let dx = this.point2.x - this.point1.x
            let dy = this.point2.y - this.point1.y
            let angle = Math.atan2(dy, dx)
            let d = Math.sqrt(dx*dx+dy*dy)
            ctx.beginPath(); 
            ctx.arc(x1 + d * Math.cos(angle - Math.PI/3), y1 + d * Math.sin(angle - Math.PI/3),d,angle+Math.PI/3,angle+Math.PI*2/3)
            dx = (x2 + d/2 * Math.cos(angle + Math.PI/2)) - this.point1.x
            dy =( y2 + d/2 * Math.sin(angle + Math.PI/2)) - this.point1.y
            angle = Math.atan2(dy, dx)
            ctx.stroke()
            ctx.closePath()
            if(direct){let size = sizePoint
            ctx.beginPath()
            let x=angle
            angle+=(Math.PI - Math.PI/3.3)
            ctx.moveTo(x2,y2)
            ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2), y2 + sizePoint * Math.sin(angle + Math.PI*2))
            ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2) + size * Math.cos(angle + Math.PI/8),  y2 + sizePoint * Math.sin(angle + Math.PI*2) + size * Math.sin(angle + Math.PI/8))
            ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2) + size * Math.cos(angle - Math.PI/8),  y2 + sizePoint * Math.sin(angle + Math.PI*2) + size * Math.sin(angle - Math.PI/8))
            ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2), y2 + sizePoint * Math.sin(angle + Math.PI*2))
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
            angle = x
            }
            if(select.point==this.point2.id)
                sizePoint/=1.2
            if(isNumber){
                ctx.beginPath()
                let x = ctx.globalCompositeOperation
                ctx.globalCompositeOperation = 'destination-out'
                ctx.arc((x1+x2)/2 + d/7.6 * Math.cos(angle + Math.PI/2), (y1+y2)/2 + d/7.6 * Math.sin(angle + Math.PI/2), SizeNumber, 0, Math.PI*2);
                ctx.fill();
                ctx.globalCompositeOperation = x
                ctx.font       = SizeNumber+"px " + font
                ctx.fillStyle  = lineTextColor
                ctx.textAlign  = "center"
                ctx.fillText(this.number,(x1+x2)/2 + d/7.6 * Math.cos(angle + Math.PI/2), (y1+y2)/2 + d/7.6 * Math.sin(angle + Math.PI/2)+SizeNumber/4)
                ctx.closePath()
                }
            }else
            if(!direct)//Đây là đường thẳng không hướng
            {
               
                    //vẽ trọng số 
                    ctx.beginPath()
                    ctx.moveTo(this.point1.x,this.point1.y)
                    ctx.lineTo(this.point2.x,this.point2.y)
                    ctx.stroke();
                    ctx.closePath()
                    if(isNumber){
                    let x = ctx.globalCompositeOperation
                    ctx.globalCompositeOperation = 'destination-out'
                    ctx.arc((this.point1.x+this.point2.x)/2, (this.point1.y+this.point2.y)/2, SizeNumber, 0, Math.PI*2);
                    ctx.fill();
                    ctx.globalCompositeOperation = x
                    ctx.font       = SizeNumber+"px " + font
                    ctx.fillStyle  = lineTextColor
                    ctx.textAlign  = "center"
                    ctx.fillText(this.number,(this.point1.x+this.point2.x)/2, (this.point1.y+this.point2.y)/2+SizeNumber/4)
                    }
                        //vẽ màu chữ
                   
            }else// vẽ đường thẳng có hướng*/
            {
                    let x2 = this.point2.x
                    let y2 = this.point2.y
                    
                    let x1 = this.point1.x
                    let y1 = this.point1.y

                    var dx = x1 - x2;
                    var dy = y1 - y2;
                    var angle = Math.atan2(dy, dx);
                    let size = sizePoint
                    if(select.point==this.point2.id)
                        sizePoint*=1.2
                    ctx.beginPath()
                    ctx.moveTo(x2,y2)
                    ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2), y2 + sizePoint * Math.sin(angle + Math.PI*2))
                    ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2) + size * Math.cos(angle + Math.PI/8),  y2 + sizePoint * Math.sin(angle + Math.PI*2) + size * Math.sin(angle + Math.PI/8))
                    ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2) + size * Math.cos(angle - Math.PI/8),  y2 + sizePoint * Math.sin(angle + Math.PI*2) + size * Math.sin(angle - Math.PI/8))
                    ctx.lineTo(x2 + sizePoint * Math.cos(angle + Math.PI*2), y2 + sizePoint * Math.sin(angle + Math.PI*2))
                    ctx.fill()
                    ctx.moveTo(x2 + sizePoint * Math.cos(angle + Math.PI*2), y2 + sizePoint * Math.sin(angle + Math.PI*2))
                    ctx.lineTo(x1,y1)
                    ctx.stroke()
                    ctx.fill()
                    ctx.closePath()
                    if(select.point==this.point2.id)
                        sizePoint/=1.2
                    if(isNumber){
                    ctx.beginPath()
                    let x = ctx.globalCompositeOperation
                    ctx.globalCompositeOperation = 'destination-out'
                    ctx.arc((this.point1.x+this.point2.x)/2, (this.point1.y+this.point2.y)/2, SizeNumber, 0, Math.PI*2);
                    ctx.fill();
                    ctx.globalCompositeOperation = x
                    ctx.font       = SizeNumber+"px " + font
                    ctx.fillStyle  = lineTextColor
                    ctx.textAlign  = "center"
                    ctx.fillText(this.number,(this.point1.x+this.point2.x)/2, (this.point1.y+this.point2.y)/2+SizeNumber/4)
                    ctx.closePath()
                    }
            }
            
        }
        if(select.line == this.id&&(mouse.tool=="DEL"||mouse.tool=="SET"))
        {
            lineSize/=3
        }

    }
    
    Check()
    {  
        if(this.point1.id==this.point2.id)
        {

            ctx.arc(this.point1.x-sizePoint*2.1,this.point1.y+sizePoint*0.4 ,sizePoint*2,0,Math.PI*2)
            if(ctx.isPointInPath(mouse.x,mouse.y)) select.line = this.id
        }else
        if(Matrix[this.point1.id][this.point2.id].dir
            ==Matrix[this.point2.id][this.point1.id].dir)
        {
            let x2 = this.point2.x
            let y2 = this.point2.y
            
            let x1 = this.point1.x
            let y1 = this.point1.y

            let dx = this.point2.x - this.point1.x
            let dy = this.point2.y - this.point1.y
            let angle = Math.atan2(dy, dx)
            let d = Math.sqrt(dx*dx+dy*dy)
            ctx.moveTo(x2,y2)
            ctx.lineTo(x2 + d/6 * Math.cos(angle + Math.PI/2), y2 + d/6 * Math.sin(angle + Math.PI/2))
            ctx.lineTo(x1 + d/6 * Math.cos(angle + Math.PI/2), y1 + d/6 * Math.sin(angle + Math.PI/2))
            ctx.lineTo(x1,y1)
            ctx.lineTo(x2,y2)

            if(ctx.isPointInPath(mouse.x,mouse.y)) select.line = this.id
            

        }else 
        {let  x = (this.point1.x < this.point2.x) ? this.point1.x: this.point2.x
        let  y = (this.point1.y < this.point2.y) ? this.point1.y: this.point2.y
        let xl = (this.point1.x > this.point2.x) ? this.point1.x: this.point2.x
        let yl = (this.point1.y > this.point2.y) ? this.point1.y: this.point2.y
        if(mouse.x>x&&mouse.x<xl
            ||mouse.y>y&&mouse.y<yl)
            if( this.isPoint(mouse.x)+20>=mouse.y&&
            this.isPoint(mouse.x)-20<=mouse.y)
            {
                select.line = this.id
            } 
            let dx = this.point2.x - this.point1.x
            let dy = this.point2.y - this.point1.y
            let k = Math.sqrt(dx*dx+dy*dy)}
            
             
    }
    setStyle()
    {
        ctx.lineWidth =lineSize
        ctx.strokeStyle = lineColor
        ctx.fillStyle = lineArrow
    }
    isPoint(x)
    {
        var a = (this.point2.y - this.point1.y )/(this.point2.x - this.point1.x)
        var  b = this.point1.y - a * this.point1.x;
        return Math.abs(a * x + b)    
    }
}