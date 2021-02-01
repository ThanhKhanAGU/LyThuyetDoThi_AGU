var point = new Array
    //mảng quản lý đỉnh
var line = new Array
    // mảng quán lý cung
var Matrix = new Array 
    //matrix tổng thể
var pointtmp = []
var pointtmp2 = []
function setMatrix()
{
    Matrix.push(new Array)
    for(let i=0;i<Matrix.length;i++)
        Matrix[Matrix.length-1].push(new matrix())
    for(let i=0;i<Matrix.length-1;i++)
        Matrix[i].push(new matrix)
}
function pointFa(x)
{
    for(let i=0;i<Matrix.length;i++)
    {
        if(Matrix[i][x].dir!=0 || Matrix[i][x].dir!=0)
        {
            return false
        }
    }
    return true
}
var tamArry = [];
function isIntamArry(x)
{
    for(let i=0;i<tamArry.length;i++)
    {
        if(tamArry[i]==x) return true
    }
    return false
}
function idPoint(x,array)
{
    for(let i =0; i<array.length;i++)
    {
        if(array[i].char == x) return i
    }
}
function charPoint(x,array)
{
    return array[x].char
}
function TextToMatrix()
{
    
    let data = textMatrix.value.split("\n")
    
    if(downloadMatrixpp||data[0]=="false"||data[0]=="true")
    {
        fly=(data[0]=="false")?false:true
        direct=(data[1]=="false")?false:true
        isNumber=(data[2]=="false")?false:true
        
    }
    for(let i=0;i<data.length;i++)
    {
        if(data[i]=="Dijstra")
        {
            xyz1()
            return
        }
    }
    Matrix = new Array()
    tamArry=[]
    for (let index = (downloadMatrixpp||data[0]=="false"||data[0]=="true")? 3: 0; index < data.length; index++)
    {
       let tam= data[index]+" "
        let a= [], n=""
        if(tam!=" ")
        {
            for(let i=0;i<tam.length;i++)
            {
                if(tam[i]!=" ") n+=tam[i]
                else  if(tam[i]==" " && n!="") 
                {  
                    if(n=="-")
                    a.push(undefined)
                    else
                    if(isNaN(parseInt(n))) a.push(n)
                    else a.push(parseInt(n))
                    n=""
                }
                if(a.length ==3) break
            } 
        }
        
        if(!isIntamArry(a[0])&&a[0]!=undefined)
        {
            tamArry.push(a[0])
        }
        if(!isIntamArry(a[1])&&a[1]!=undefined)
        {
            tamArry.push(a[1])
        }
        
          
    }
    pointID=0
    let pointTam = []
    for(let i=0;i<tamArry.length;i++)
    {
        if(idPoint(tamArry[i],point)!=undefined)
        {
            pointTam.push(new Point(tamArry[i],point[idPoint(tamArry[i],point)].x,point[idPoint(tamArry[i],point)].y))
        }else 
            pointTam.push(new Point(tamArry[i],Math.random()*(c.width-42)+20,Math.random()*(c.height-42)+20))
    }
    point = []
    pointID=0
    for(let i=0;i<pointTam.length;i++)
    {
        if(i<20)
        {
            point.push(pointTam[i])
            setMatrix()
        }
        
    }
    for (let index = 0; index < data.length; index++)
    {
       let tam= data[index]+" "
        let a= [], n=""
        if(tam!=" ")
        {
            for(let i=0;i<tam.length;i++)
            {
                if(tam[i]!=" ") n+=tam[i]
                else  if(tam[i]==" " && n!="") 
                {  
                    if(n=="-")
                    a.push(undefined)
                    else 
                    if(isNaN(parseInt(n))) a.push(n)
                    else a.push(parseInt(n))
                    n=""
                }
                if(a.length ==7) break
            } 
           try {
               if(a[1]==undefined)
               {
                    if(a[3]!=undefined && a[4]!=undefined)
                    {
                        point[idPoint(a[0],point)].x=a[3] 
                        point[idPoint(a[0],point)].y=a[4]
                    }
               }
               if(a[3]!=undefined && a[4]!=undefined &&a[5]!=undefined &&a[6]!=undefined )
               {
                  point[idPoint(a[0],point)].x=a[3] 
                  point[idPoint(a[0],point)].y=a[4]

                  point[idPoint(a[1],point)].x=a[5] 
                  point[idPoint(a[1],point)].y=a[6]
               }
            
            if(a[2]!=undefined && a[2]!=0) 
            {

                Matrix[idPoint(a[0],point)][idPoint(a[1],point)].dir=1
                Matrix[idPoint(a[0],point)][idPoint(a[1],point)].Number =a[2]
                if( Matrix[idPoint(a[1],point)][idPoint(a[0],point)].dir!=1) 
                Matrix[idPoint(a[1],point)][idPoint(a[0],point)].dir=-1
            }

           } catch (error) {
               
           }
        }
        
    }
    
   try{
    pointID=point[point.length-1].id+1;
   }catch{
    pointID=0
   } 
}

function MatrixToText()
{
    if(textMatrix.value=="")
    {
        index=1;
    }else
    textMatrix.value="";
    if(downloadMatrixpp)
    {
        textMatrix.value +=fly+"\n"+direct+"\n"+isNumber+"\n"
        
    }
    for(let i=0; i<Matrix.length ;i++)
    {
        if(pointFa(i)==true) 
        {
            if(downloadMatrixpp)
            textMatrix.value+=point[i].char+" - - "+parseInt(point[i].x)+" "+parseInt(point[i].y)+"\n"
            else  textMatrix.value+=point[i].char+"\n"
        }
        for(let j=i; j<Matrix.length ;j++)
        {
            if(Matrix[i][j].dir==1 && Matrix[j][i].dir==-1)
            {

                if(downloadMatrixpp) textMatrix.value+=point[i].char +" "+point[j].char + "    " +Matrix[i][j].Number +
                " "+parseInt(point[i].x)+" "+parseInt(point[i].y)+" "+parseInt(point[j].x)+" "+parseInt(point[j].y)+"\n"
                else textMatrix.value+=point[i].char +" "+point[j].char + "    " +Matrix[i][j].Number +"\n"
            }
            else if(Matrix[i][j].dir==-1 && Matrix[j][i].dir==1)
            {
                if(downloadMatrixpp) textMatrix.value+=point[j].char +" "+point[i].char + "    " +Matrix[j][i].Number +
                " "+parseInt(point[j].x)+" "+parseInt(point[j].y)+" "+parseInt(point[i].x)+" "+parseInt(point[i].y)+"\n"
                else
                textMatrix.value+=point[j].char +" "+point[i].char + "    " +Matrix[j][i].Number +"\n"
            } 
            if(Matrix[i][j].dir==1 && Matrix[j][i].dir==1 && j!=i)
            {
                if(downloadMatrixpp)
                {
                    textMatrix.value+=point[i].char +" "+point[j].char + "    " +Matrix[i][j].Number +
                    " "+parseInt(point[i].x)+" "+parseInt(point[i].y)+" "+parseInt(point[j].x)+" "+parseInt(point[j].y)+"\n"
                    if(isNumber||direct) textMatrix.value+=point[j].char +" "+point[i].char + "    " +Matrix[j][i].Number +
                    " "+parseInt(point[j].x)+" "+parseInt(point[j].y)+" "+parseInt(point[i].x)+" "+parseInt(point[i].y)+"\n"
                }
                else{textMatrix.value+=point[i].char +" "+point[j].char + "    " +Matrix[i][j].Number +"\n"
               if(isNumber||direct) textMatrix.value+=point[j].char +" "+point[i].char + "    " +Matrix[j][i].Number +"\n"}
            }
            else if(Matrix[i][j].dir==1 && Matrix[j][i].dir==1 && j==i){
                if(downloadMatrixpp)
                {
                    textMatrix.value+=point[i].char +" "+point[j].char + "    " +Matrix[i][j].Number +
                    " "+parseInt(point[i].x)+" "+parseInt(point[i].y)+" "+parseInt(point[j].x)+" "+parseInt(point[j].y)+"\n"
                }else
                {
                    textMatrix.value+=point[i].char +" "+point[j].char + "    " +Matrix[i][j].Number +"\n"
                }
            }
        }
        
    }
}

function SaveData()
{
    downloadMatrixpp=true
    MatrixToText()
    DataMatrix.length=DatamatrixPosition+1;
    DataMatrix.push(textMatrix.value)
    DatamatrixPosition++
    downloadMatrixpp=false
    MatrixToText()

}
function Back()
{
    if(DatamatrixPosition>0)
    { 
       textMatrix.value = DataMatrix[--DatamatrixPosition]
        TextToMatrix();
    }
    
}
function after()
{
    if(DatamatrixPosition<DataMatrix.length-1)
    {
        textMatrix.value = DataMatrix[++DatamatrixPosition]
        TextToMatrix();
    }
    
}
function beginDraw()
{

        c = document.getElementById("drawCanvas")
        ctx = c.getContext("2d") 
        table = document.getElementById("MatrixCanvas").getContext("2d")
        colortabletext ="red"
        tablesize= 400
    
}
function beginDijstra()
{
    
        c = document.getElementById("dijstraCanvas")
        ctx = c.getContext("2d")
        DisplayCanvas="Dijstra"
        table = document.getElementById("MatrixCanvasDijstra").getContext("2d")
        colortabletext ="blue"
        fly = false
        tablesize= 300
}
function download()
{
    let d = new Date()
    let n =d.getHours()+"h"+d.getMinutes()+"m"+d.getSeconds()+"s_"+d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
    var link = document.createElement("a");
    link.download = "LyThuyetDoThi"+ n +".png"
    link.href = c.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}