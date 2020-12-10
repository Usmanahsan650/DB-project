//owner login js
document.addEventListener("DOMContentLoaded",function(event){
    if(window.sessionStorage.getItem("email")==null)
       window.location.replace("index.html#login");
       else{
    document.getElementById("logout").addEventListener("click",function(event){
        window.sessionStorage.removeItem("email");
    })

    let user =JSON.parse( window.sessionStorage.getItem("email")); //user object
    let xhttp=new XMLHttpRequest();
    
    xhttp.onreadystatechange=function(event){
        if(this.readyState==4&&this.status==200)
    {
        console.log(this.response);
        document.querySelector("#table").innerHTML+=this.response;
    }

    }
    xhttp.open("POST","owner_view.php",true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log(user.SSN);
    xhttp.send("X="+user.SSN);
  
    document.querySelector("#greet h1").textContent="Welcome MR."+user.name;
    document.querySelector("#greet h1").style.color="blue";

    //rent car;
    document.querySelector("#register").addEventListener("click",function(event){
        let file=document.getElementById("image").files[0];
        if(file.name=="")
        {
            document.getElementById("img_error").textContent="Upload the file!";

        }
        else{
            let ext=(file.name.split(".")[1]).toLowerCase();
            console.log(ext)
            if(!jQuery.inArray(ext,['gif','png','jpg','jpeg']))
            {
                alert("Invalid Format!")
                document.getElementById("img_error").textContent="Invalid Format!";

            }
            else{

                let form = new FormData();
                form.append("image",file);
                form.append("name",document.getElementById("name").value);
                form.append("reg_no",document.getElementById("reg_no").value);
                form.append("model",document.getElementById("model").value);
                form.append("make",document.getElementById("make").value);
                form.append("seats",document.getElementById("seats").value);
                form.append("rate",document.getElementById("rate").value);
                form.append("owner",user.SSN);
                let valid=1;
                for ( i of form.entries())
                {
                     console.log(i);
                    if(i[1]=="")
                    {
                        valid=0;
                    }

                } 
                if(valid===0)
                alert("Please Provide All Information!");
                else{
                    //sending the data
                    let xhr=new XMLHttpRequest();
                    xhr.onreadystatechange=function(){
                        if(this.readyState==4&&this.status==200)
                        {
                            alert(this.response);
                            window.location.reload();
                        }
                    }
                     xhr.open("POST","uploadcar.php",true);
                     xhr.send(form);
                }
            }
        }
    })

}})