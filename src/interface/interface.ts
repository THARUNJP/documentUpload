export interface documentType{
    doc_name:string;
   
}

export interface applicantType{
    id:string
    name:string;
    documents:(string | undefined)[]
}