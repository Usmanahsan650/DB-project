document.addEventListener('DOMContentLoaded',function(event){
    $('#greet').hide();
    $("form").submit(function(e) {
        e.preventDefault();
    });
    class member {
        constructor() {
            this.name=document.querySelector('#name').value;
            this.ssn=document.querySelector('#ssn').value;
            this.addr=document.querySelector('#addr').value;
            this.phone=document.querySelector('#phone').value;
            this.email=document.querySelector('#ID').value;
            this.password=document.querySelector('#pass').value;
        }
        store(){
            let obj=this;
             obj=JSON.stringify(obj);
             console.log(obj);
            let xhr=new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200)
                {   $("#greet").show();
                    $('#signup').hide();
                document.querySelector("#greet h1").textContent=this.response;
                }


            };
            xhr.open("POST","signup.php",true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("x="+obj);
        }

      }
      

    document.querySelector('#register').addEventListener('click',function(event){
        
    
        let obj  =new member();
        obj.store();
        obj.name = document.querySelector('#name').value;
        console.log(obj.name);
    })
})