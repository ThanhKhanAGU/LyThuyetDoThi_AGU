/**
 * ĐÂY LÀ CLASS ĐỊNH NGHĨA PHẦN TỬ POINT TRONG MẢNG POINT
 */
class Point{
    
    constructor(char ,X = mouse.x, Y = mouse.y)
    {

        this.id = pointID ++ 
            //id được tạo tự động và chỉnh sửa tự động trong mảng
        this.char = char   
            //kí tự hiển thị trên Point
        this.x = X
            //tọa độ được tạo ra theo vị trí chuột
        this.y = Y
            //tọa đọ được tạo ra theo vị trí chuột
        this.show = true 
            // có cho hiển thị lên màng hình không 
        /* Chức năng trôi nổi của các Point */
        //tạo độ trôi nổi của X
        if(Math.random()>0.5) this.flyX = +1
        else this.flyX = -0.5
        //tạo đọ trôi nổi của Y
        if(Math.random()<0.5) this.flyY = -0.5
        else this.flyY = 1

    }
    setPoint()//đặt các thuộc tính của Point 
    {
        ctx.strokeStyle= colorBoderPoint
        ctx.fillStyle  = colorBackgroundPoint
        ctx.lineWidth  = lineWidth
    }
    setText()//đặt các thuộc tính của chữ
    {
        ctx.font       = sizePoint*1.25+"px " + font
        ctx.fillStyle  = colorText
        ctx.strokeStyle= colorText
        ctx.lineWidth  = textWidth
        ctx.textAlign  = "center"
    }
    Paint()
        //vẽ điểm lên màng hình
    {
            if(select.point==this.id &&(mouse.tool=="MOVE_POINT"||mouse.tool=="DEL"||mouse.tool=="SET"||mouse.tool=="ADD"))// nếu là điểm được chọn thì sẽ phóng to lên
            {
                sizePoint*=1.2
                if(checkp)
                {
                   if(k==undefined) if(sound) selpl.play()
                   else if(sound) selpl2.play()
                    checkp = false
                }
            }
            ctx.beginPath()
                //bắt đầu vẽ
            this.setPoint()
                //định kiểu vẽ
            ctx.arc(this.x, this.y, sizePoint, 0, 2*Math.PI)
                //vẽ hình tròn
            ctx.stroke()
                //vẽ khung
            ctx.fill()
                //vẽ màu
            this.setText()
                //định kiểu chữ
            ctx.fillText(this.char, this.x, this.y+sizePoint/2)
                //vẽ màu chữ
            ctx.strokeText(this.char, this.x, this.y+sizePoint/2)
                //vẽ viền chữ
            ctx.closePath()//ngưng vẽ
            if(select.point==this.id &&(mouse.tool=="MOVE_POINT"||mouse.tool=="DEL"||mouse.tool=="SET"||mouse.tool=="ADD"))// trả lại kích thước củ
                sizePoint/=1.2
            /*Chức Năng trôi nổi của điểm */
            if(fly)
            {
                // SAU KHI VẼ SẼ CẬP NHẬT TỌA ĐỘ BAY DẦN ĐẾN ĐỊA ĐIỂM KHÁC
                this.x+=(this.flyX);
                this.y+=(this.flyY); 
                if(this.x+sizePoint>=c.width
                    || this.x-sizePoint<=0) this.flyX=-this.flyX
                if(this.y+sizePoint>=c.height
                    || this.y-sizePoint<=0) this.flyY=-this.flyY;
            }
    }
    Check()//cho biết con trỏ có chạm vào điểm này không
    {
        if(this.x+sizePoint>=mouse.x&&
           this.x-sizePoint<=mouse.x&&
           this.y+sizePoint>=mouse.y&&
           this.y-sizePoint<=mouse.y)
            {
                select.point = this.id
            }

        
    }
}