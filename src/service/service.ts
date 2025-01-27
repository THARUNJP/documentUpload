import { documentType, userType } from "../interface/interface";
import { methodType } from "../interface/interface";
import client from "../clientApi/client.ts";
import { userLoginType } from "../interface/interface";
import { applicantType } from "../interface/interface";
import { Document } from "../interface/interface";






const methods:methodType = {
    get:"GET",
    post:"POST",
    put:"PUT",
    delete:"DELETE",
    patch:"PATCH"
    }
    
    const URL: string = "https://documentbackend-production.up.railway.app/";



export const registerTheUser = async(data:userType)=>{
    
    
    const response = await client(`${URL}register`,data,methods.post,"");
    
    return response;
    
    
    }

    export const loginUserCheck = async(data:userLoginType) =>{

        const response = await client(`${URL}login`,data,methods.post,"");
    
        return response;
        
    }

    export const tokenVerification = async (token:String) =>{
       const response = await client(`${URL}tokenValidation`,"",methods.get,token)
        
        return response;
        
        }
        
        export const applicantSave = async(applicant:applicantType) =>{

            const token = localStorage.getItem("token") || ""
     
            const response = await client(`${URL}saveApplicant`,applicant,methods.post,token);

            return response;


        }
        
    export const dcoumentSave = async (doc_data:documentType,id:string) => {

            const token = localStorage.getItem("token") || ""
     
     
            const response = await client(`${URL}saveDocument`,{docs:doc_data,id:id},methods.post,token);

            return response;


        }

        export const retriveData = async () => {
            const token = localStorage.getItem("token") || "";
            const response = await client(`${URL}retrive`, "", methods.get, token);
            console.log(response, "res");
        
            if (response !== 400) {
                const groupedData = new Map();
        
                response.forEach((e: any) => {
                   
                    if (!groupedData.has(e.id)) {
                        groupedData.set(e.id, {
                            id: e.id,
                            name: e.name,
                            documents: []
                        });
                    }          
                    if (e.doc_id) {
                        const documentEntry = {
                            doc_id: e.doc_id,
                            doc_name: e.doc_name,
                            document: e.file_name ? { 
                                name: e.file_name, 
                                size: e.size 
                            } : null,
                            status: e.status
                        };
        
                        const userEntry = groupedData.get(e.id);
                        
                        
                        const isDuplicate = userEntry.documents.some(
                            (doc: Document) => doc.doc_id === e.doc_id
                        );
                        if (!isDuplicate) {
                            userEntry.documents.push(documentEntry);
                        }
                    }
                });
        
                const result = Array.from(groupedData.values());
                console.log(result);
                return result;
            }
        
            return response;
        };
        
        export const deleteApplicant = async(id:string) =>{

            const token = localStorage.getItem("token") || ""
     
            const response = await client(`${URL}delete`,{id:id},methods.delete,token);

            return response;


        }

        export const fileUploader = async(file:File,doc_id:string) =>{
            const token = localStorage.getItem("token") || ""
    const formData = new FormData();
    formData.append("file",file)     
            const response = await client(`${URL}fileInsert?doc_id=${doc_id}`,formData,methods.patch,token);

            return response;

        }

        export const fileDeleter = async (doc_id:string) =>{
            const token = localStorage.getItem("token") || ""
     
            const response = await client(`${URL}deleteFile`,{doc_id:doc_id},methods.delete,token);

            return response;


        }