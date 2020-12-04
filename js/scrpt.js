document.addEventListener("DOMContentLoaded",function(event){
    $('#login').hide();
     document.querySelector('.login').addEventListener("click",function(event){
        $('#search').hide();
        $('#login').show();
         
     })
     document.querySelector('.home').addEventListener("click",function(event){
        $('#search').show();
        $('#login').hide();
         
     })
    document.querySelector('#submit').addEventListener("click",function(event){
        
        $('#search').show;
        // data.name=document.querySelector("#name").value;
        let id=document.querySelector("#id").value;
        console.log(id);
        let xhttp= new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            console.log("DOne");
            if(xhttp.readyState==4 && xhttp.status==200)
            { 
                $('#inside').show();
                $('#Login').hide();
                console.log(this.response);
                let ob=JSON.parse(this.response);
                document.querySelector("#data").innerHTML=ob.Name+"<br/>ID="+ob.ID;
            }
        };
            xhttp.open("POST","my.php",true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("x="+id);
              
        
        
})
})
