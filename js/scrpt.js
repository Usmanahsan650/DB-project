document.addEventListener("DOMContentLoaded",function(event){
    if(window.sessionStorage.getItem("valid")=="0")
    {
        document.getElementById("mess").textContent="Invalid Username or Password";
    }
    $('div.pages').hide();   //hide all pages with class pages
    if(window.location.hash)
    $(window.location.hash).show();
    else
     $('#home').show();
    window.addEventListener("hashchange",function(event){
        let page;
        if(window.location.hash)
        { 
            page=window.location.hash;
        }
        else{
            page="#home";
        }
        console.log(page);
        $('div.pages').hide();
        console.log(page.substring(1));
        $("#"+page.substring(1)).show();
    })

    // login ajax
     document.getElementById('login_sub').addEventListener("click",function(event){
       let  obj={};
         obj.email=document.getElementById("ID").value;
          obj.pass=document.getElementById("pass").value;
          console.log(obj.email);
        xhr=new XMLHttpRequest();
        xhr.onreadystatechange= function(){
            if(this.readyState==4 && this.status==200)
            {
                if(this.response!=0)
                {
                    JSON.parse(this.response);
                    window.sessionStorage.removeItem("valid");
                    window.sessionStorage.setItem("email", this.response);
                    window.location.hash="#owner";
                    window.location.replace("loggedin.html");
                }
                else{
                    console.log(this.response);
                    window.sessionStorage.setItem("valid","0"); //for front end
                    window.location.reload();

                }
            }
        };
        xhr.open("POST","login.php",true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("x="+JSON.stringify(obj));
     }
     )

//     document.querySelector('#submit').addEventListener("click",function(event){        
//         $('#search').show();
//         // data.name=document.querySelector("#name").value;
//         let id=document.querySelector("#id").value;
//         console.log(id);
//         let xhttp= new XMLHttpRequest();
//         xhttp.onreadystatechange=function(){
//             console.log("DOne");
//             if(xhttp.readyState==4 && xhttp.status==200)
//             { 
//                 $('#inside').show();
//                 $('#Login').hide();
//                 console.log(this.response);
//                 let ob=JSON.parse(this.response);
//                 document.querySelector("#data").innerHTML=ob.Name+"<br/>ID="+ob.ID;
//             }
//         };
//             xhttp.open("POST","my.php",true);
//             xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//             xhttp.send("x="+id);
              
        
        
// })
 })
