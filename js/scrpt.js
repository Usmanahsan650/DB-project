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
            
            page="home";
        }
        console.log(page);
        $('div.pages').hide();
        console.log(page.substring(1));
        $("#"+page.substring(1)).show();
    })

    function bold(event) { 
         console.log(event.target);
      }
    //cars page
    //  let cars=document.querySelectorAll(".card-img-top");
    //   cars.forEach((element,number) => {
    //         console.log(number)
    //        element.setAttribute("style","content: url('images/1623.jpg')");
          
    //   });
        let ajax=new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(this.readyState==4 &&this.status==200)
            { console.log(this.response);
              let i=0;
                let carobj=JSON.parse(this.response);
              while(carobj[i])
               { let div1=document.createElement("div");// create card 
                div1.setAttribute("class","card border-dark text-dark bg-light");
                div1.style.width="18rem";
                let img=document.createElement("img");
                img.className="card-img-top";
                img.alt=carobj[i].name;
                img.src=carobj[i].image;
                div1.appendChild(img);
                    let div2=document.createElement("div");
                    div2.className="card-body";
                    let title=document.createElement("h5");
                    title.className="card-title";
                    let text=document.createTextNode(carobj[i].name);
                    title.appendChild(text);
                        let info=document.createElement("P");
                        text=document.createTextNode("SEATS = " +carobj[i].seats);
                        info.appendChild(text);//p element created
                        info.appendChild(document.createElement("br"));
                        let span=document.createElement("span");
                        span.style.color="red";
                        span.style.position="absolute";
                        span.style.right="0";
                        span.style.top="0"
                        span.style.backgroundColor="white";
                        span.style.fontSize="18px"
                        span.style.fontStyle="italic";
                        text=document.createTextNode(carobj[i].rate+" RS/day.");
                        span.appendChild(text);
                        info.appendChild(span);
                        let aele=document.createElement("a");
                        aele.className="btn btn-dark";
                        text=document.createTextNode("Book");
                        aele.appendChild(text);
                    
                    div2.appendChild(title);
                    div2.appendChild(info);
                    div2.appendChild(aele);
                div1.appendChild(div2); //end card
                document.getElementById("Cars").appendChild(div1);
                i++;

            }
            }
        };
        ajax.open("GET","Car.php",true);
        ajax.send();


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
                    console.log(this.response);
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
