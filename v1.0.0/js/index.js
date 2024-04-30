window.addEventListener("load",function(){


    const board=document.querySelector("#board");
    const winwhite=document.querySelector("#winwhite");
    const winblack=document.querySelector("#winblack");
    var statusWhite=true;
    
    const white=[
        {i:0,j:1,t:0},{i:0,j:3,t:0},{i:0,j:5,t:0},{i:0,j:7,t:0},
        {i:1,j:0,t:0},{i:1,j:2,t:0},{i:1,j:4,t:0},{i:1,j:6,t:0},
        {i:2,j:1,t:0},{i:2,j:3,t:0},{i:2,j:5,t:0},{i:2,j:7,t:0}
    ];
    
    var statusBlack=!statusWhite;
    const black=[
        {i:5,j:0,t:0},{i:5,j:2,t:0},{i:5,j:4,t:0},{i:5,j:6,t:0},
        {i:6,j:1,t:0},{i:6,j:3,t:0},{i:6,j:5,t:0},{i:6,j:7,t:0},
        {i:7,j:0,t:0},{i:7,j:2,t:0},{i:7,j:4,t:0},{i:7,j:6,t:0}
    ];

    const boardAry=[
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0]

    ];

    var I1,J1,I2,J2,cls;

    creatBoard();
    daslariDuz();
    clickBox();

//lovheni duzelden
    function creatBoard(){

        for(let i=0;i<boardAry.length;i++){
            
            for(let j=0;j<boardAry[i].length;j++){

                let box=document.createElement("input");
                // box.value=`${i},${j}`;

                box.setAttribute("type","button");
                box.setAttribute("id",`id-${i}${j}`);
                
                let cls=boardAry[i][j] ? "b" : "w";
                box.classList.add(cls);

                let disabled=boardAry[i][j] ? false : true;
                box.disabled=disabled;
                
                board.appendChild(box);

            }
       
        }
    }

    // daslari duzen

    function daslariDuz(){

        for(let i=0;i<white.length;i++){

            document.querySelector(`#id-${white[i].i}${white[i].j}`).classList.add("white");

            document.querySelector(`#id-${black[i].i}${black[i].j}`).classList.add("black");
            
        }
    }

    function clickBox(){
        
        for(let i=0;i<boardAry.length;i++){
            
            for(let j=0;j<boardAry[i].length;j++){

                let box=document.querySelector(`#id-${i}${j}`);

                box.addEventListener("click",function(){
                    
                    
                if(I1 || J1){
            document.querySelector(`#id-${I1}${J1}`).classList.remove("select");
                }

            if(box.classList[1]=="white" && statusWhite){
                        I1=i;
                        J1=j;
                        cls=box.classList[1];
                        box.classList.add("select");

            }else if(box.classList[1]=="black" && statusBlack){
                        I1=i;
                        J1=j;
                        cls=box.classList[1];
                        box.classList.add("select");
            }else{
                if(I1 || J1){
                    I2=i;
                    J2=j;
                    Yoxla(I1,J1,I2,J2);
                    
                }
            }

                });
            }
        }
    }

    function Yoxla(a,b,c,d){
        let box1=document.querySelector(`#id-${a}${b}`);
        let box2=document.querySelector(`#id-${c}${d}`);

        if(cls=="black"){
            //qara daslar

            {
                // ireli doqru gedis ve udus
                const dom1=document.querySelector(`#id-${a-1}${b-1}`);
                const dom2=document.querySelector(`#id-${a-1}${b+1}`);

                if((a==c+1 && b==d+1) || (a==c+1 && b==d-1) && (box2.classList[1]!="white" && box2.classList[1]!="black")){

                        Hemle(box1,box2);

                }else if(a-2==c && b-2==d && dom1.classList[1]=="white" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                        Hemle(box1,box2);
                        dom1.classList.remove('white');
                        win("black");

                }else if(a-2==c && b+2==d && dom2.classList[1]=="white" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                        Hemle(box1,box2);
                        dom2.classList.remove('white');
                        win("black");
                }
            }

            {
                //geriye doqru gedis ve udus
                const dom1=document.querySelector(`#id-${a+1}${b-1}`);
                const dom2=document.querySelector(`#id-${a+1}${b+1}`);

                if(a+2==c && b-2==d && dom1.classList[1]=="white" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                    Hemle(box1,box2);
                    dom1.classList.remove('white');
                    win("black");
                }else if(a+2==c && b+2==d && dom2.classList[1]=="white" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                    Hemle(box1,box2);
                    dom2.classList.remove('white');
                    win("black");
                }

            }

        }else{
            //aq daslar
            {
                // ireli doqru gedis ve udus
                const dom1=document.querySelector(`#id-${a+1}${b-1}`);
                const dom2=document.querySelector(`#id-${a+1}${b+1}`);
                
                if((a==c-1 && b==d+1) || (a==c-1 && b==d-1)){
                    Hemle(box1,box2);
                }else if(a+2==c && b-2==d && dom1.classList[1]=="black" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                    Hemle(box1,box2);
                    dom1.classList.remove('black');
                    win("white");
                }else if(a+2==c && b+2==d && dom2.classList[1]=="black" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                    Hemle(box1,box2);
                    dom2.classList.remove('black');
                    win("white");
                }
            }

            {
                //geriye doqru gedis ve udus
                const dom1=document.querySelector(`#id-${a-1}${b-1}`);
                const dom2=document.querySelector(`#id-${a-1}${b+1}`);

                if(a-2==c && b-2==d && dom1.classList[1]=="black" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                    Hemle(box1,box2);
                    dom1.classList.remove('black');
                    win("white");
                }else if(a-2==c && b+2==d && dom2.classList[1]=="black" && (box2.classList[1]!="white" && box2.classList[1]!="black")){
                    Hemle(box1,box2);
                    dom2.classList.remove('black');
                    win("white");
                }
            }
        }

    }

    function Hemle(box1,box2){
        
        if(box2.classList.length<2){
        
            box1.classList.remove("select");
            box1.classList.remove(cls);
            box2.classList.add(cls);
            I1=null;
            J1=null;
            I2=null;
            J2=null;

            //burada gedisartlari tein etdik
            statusWhite=!statusWhite;
            statusBlack=!statusBlack;
        }
    }


    function win(color){
        if(color=="white"){
            const dom=document.createElement("div");
            dom.classList.add("black");
            winwhite.appendChild(dom);
        }else{
            const dom=document.createElement("div");
            dom.classList.add("white");
            winblack.appendChild(dom);
        }
        
        const countWhite=document.querySelectorAll("#board .white").length;
        const countBlack=document.querySelectorAll("#board .black").length;

        if(countWhite<=0){
            //aqlar uduzdu
            alert("QARA RƏNGLİ DAŞLAR QAZAQNDI");
        }
        
        if(countBlack<=0){
            //qaralar uduzdu
            alert("AĞ RƏNGLİ DAŞLAR QAZAQNDI");
        }
       

    }


});