import axios from "axios";


async function client(endpoint:string,body:any,method:string,token:String){

    const config:object={

method:method.toUpperCase(),
headers:{
"Authorization": token ? token : "",
"Content-Type": body instanceof FormData 
        ? "multipart/form-data" 
        : "application/json"

},
data:body,

    }

try{
    const response = await axios(`${endpoint}`,config,);
    const ans= await response.data

    return ans;
}
catch(err:any){
   console.log(err);
   
    return err.status;
   
    
}

}
export default client;