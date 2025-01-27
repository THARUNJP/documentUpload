export interface documentType{
    doc_id:string
    doc_name:string;
    document:File | null;
    status:string;
   
}
export interface Document {
    doc_id: string;
    doc_name: string;
    document: { name: string; size: number } | null;
    status?: string;
}

export interface applicantType{
    id:string
    name:string;
    documents:documentType[]
}

export interface userType{
    name:String;
    email:String;
    password:String;
    
    }

    export interface methodType {
        get:string;
        post:string;
        put:string;
        delete:string;
        patch:string
        }

        export interface userLoginType{
            email:String;
            password:String;
            
            }