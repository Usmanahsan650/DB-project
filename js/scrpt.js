document.addEventListener("DOMContentLoaded",function(event){
    if(window.sessionStorage.getItem("valid")=="0")
    {
        document.getElementById("mess").textContent="Invalid Username or Password"; //for login         
    }
    $('.pages').hide();   //hide all pages with class pages
    
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
        $('.pages').hide();
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
 let carobj;  
    //   });
        let ajax=new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(this.readyState==4 &&this.status==200)
            {// console.log(this.response);
              let i=0;
                 carobj=JSON.parse(this.response);
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
                        aele.id=carobj[i].reg_no
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

        document.querySelector("#Cars").addEventListener("click",function(event){
            let x =event.target;
            let button =x.className.split(" ");
           
            if(button[0] === "btn")
            { console.log("hh")
            $("#popup").show();
              document.querySelector("main").style.filter="blur(8px)";
                $("#bookit").show();
                console.log(x.id);
                window.sessionStorage.setItem("book-car",x.id);
            }
        })


        //back
        document.querySelector("#popup").addEventListener("click",(event)=>{
            let x=event.target;
            console.log(x.id);
            if(event.target.id =="popup" || x.id=="bookit")
            {
            $("#popup").hide();
            document.querySelector("main").style.filter="";
            }
        })
        var check=0;
class customer{
    constructor(){
            this.name=document.querySelector('#name').value;
            this.ssn=document.querySelector('#NIC').value;
            this.phone=document.querySelector("#phone").value;
            this.email=document.querySelector("#email").value;
    }
    store=function() {
        let cust=new XMLHttpRequest();
        cust.onreadystatechange=()=>{
            
            if(this.status==200&&this.readyState==4)
            {console.log("store")
                console.log(this.reponse);
               check=1;
            }

        };cust.open("POST","customer.php",true);
        cust.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        cust.send("x="+JSON.stringify(this));

        
    }
}
        //book car 
    document.getElementById("book-form").addEventListener("submit",(event)=>{
        event.preventDefault();
        let i=0; 
        while(carobj[i])
         { 
             if(carobj[i].reg_no==window.sessionStorage.getItem("book-car"))
             {
                 break;
             }
            i++;
         }
        let form=new FormData();
        let cust_obj=new customer() ;
          cust_obj.store();
         
        form.append("from",document.getElementById("from").value);
        form.append("to",document.getElementById("to").value);
        form.append("cust_ssn",cust_obj.ssn);
        form.append("car_reg",carobj[i].reg_no);
        form.append("c_email",cust_obj.email);
        form.append("rate",carobj[i].rate);
        form.append("owner",carobj[i].owner);
        if(cust_obj.ssn.length!=15){
            alert("invalid CNIC");
            window.location.reload();
        }
        else{
        let book= new XMLHttpRequest();
        book.onreadystatechange=function(){
            console.log("book")
            if(this.readyState==4 && this.status==200){
                console.log(this.response)
                if(this.response!="1"){
                    let x=document.createTextNode("Sorry!Try another date");
                    document.getElementById("error").appendChild(x);

                           
                }else{
                    if(check)
                    {
                    console.log("nice");
                    alert("You Booked the car sucessfully ");
                    window.location.reload();
                    }
                    else{
                        console.log("already saved cust");
                        alert("You Booked the car sucessfully,Thanks for choosing us again ");
                        window.location.reload();
                    }
                }
            }
        }
        book.open("POST","book.php",true)
       // book.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        book.send(form);
    }
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
                    // window.location.reload();

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
