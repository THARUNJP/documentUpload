import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Trash2, Plus, ArrowLeft, ArrowRight, Upload, File } from "lucide-react"
import React, { useState, useRef,useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { applicantType} from "../interface/interface";
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
DialogTrigger,
DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { X, Check } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import {v4 as uuid} from "uuid";
import { useNavigate } from "react-router-dom";
import { applicantSave, dcoumentSave, deleteApplicant, fileDeleter, fileUploader, retriveData, tokenVerification } from "../service/service.ts";




function Home() {
const [applicants, setApplicants] = useState<applicantType[]>([]);
const [input, setInput] = useState<string>();
let [selectedApplicant, setSelectedApplicant] = useState("");
const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
const fileInputRef = useRef<HTMLInputElement>(null);
const [selectedDoc,setSelectedDoc]= useState<number>(0);
const[isLoading,setIsLoading]=useState<boolean>(false);

const nav= useNavigate();

useEffect(()=>{
verifyToken();
},[])


async function verifyToken() {
  const token: String | null = localStorage.getItem("token");
  if (token) {
    const response = await tokenVerification(token);
    if(response !== "valid") {
      nav('/document/login')
    }
    else{
      const data = await retriveData();
      if(data !== 400) {
        setApplicants(data);
      }
      

    } 
  } 
  else{
    nav('/document/login')
  }
}

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
if (event.target.files) {
const files = Array.from(event.target.files);
setDroppedFiles(prev => [...prev, ...files]);
if (fileInputRef.current) {

fileInputRef.current.value = '';
}
}
};

const handleDrop = (e: React.DragEvent ) => {
e.preventDefault();
const files = Array.from(e.dataTransfer.files);
setDroppedFiles(prev => [...prev, ...files]);
}

const handleDragOver = (e: React.DragEvent) => {
e.preventDefault()
}



const removeFile = async(data:applicantType) => {
 
  const doc_id = data.documents[selectedDoc].doc_id;

  await fileDeleter(doc_id)

  const ind = applicants.findIndex((e)=>e.id === selectedApplicant);
  applicants[ind].documents[selectedDoc].document=null
  applicants[ind].documents[selectedDoc].status='pending'
  
  
  
  
setDroppedFiles([]);


};

async function saveApplicant(){
if(input){
  const lastApplicant = {id:uuid(),name:input,documents:[]};
setApplicants((P)=>[...P,lastApplicant]);
const valid = await applicantSave(lastApplicant);
if(valid !== 'inserted') alert("unautthorized access")
setInput("")
}
}


function clearInput(){
setInput("")
}

function saveDocument() {
  const document={doc_id:uuid(),doc_name:input ||"",document:null,status:'pending'}
   dcoumentSave(document,selectedApplicant);
setApplicants((prev) =>
prev.map((applicant) =>
applicant.id === selectedApplicant
? {
...applicant,
documents: [...(applicant.documents || []),document],
}
: applicant
)
);
setInput(""); 
}

async function removeApplicant(id:string){

setApplicants((prev)=>
prev.filter((e)=>e.id !== id)
)
await deleteApplicant(id);

}
function nextButton() {
  setDroppedFiles([])
  const applicant = applicants.find((e) => e.id === selectedApplicant);
  const noOfDocs = applicant?.documents.length;
  const index = applicants.findIndex((e) => e.id === selectedApplicant);

  if (noOfDocs && selectedDoc < noOfDocs - 1) {
    setSelectedDoc(selectedDoc + 1);
  } else {
    const nextIndex = (index + 1) % applicants.length;
    console.log(nextIndex);

    setSelectedApplicant(applicants[nextIndex].id);
    setSelectedDoc(0);
  }
}

function backButton() {
  setDroppedFiles([])
  const applicant = applicants.find((e) => e.id === selectedApplicant);
  const noOfDocs = applicant?.documents.length;
  const index = applicants.findIndex((e) => e.id === selectedApplicant);

  if (noOfDocs && selectedDoc > 0) {
    setSelectedDoc(selectedDoc - 1);
  } else {
    const prevIndex = (index - 1 + applicants.length) % applicants.length;
    const prevApplicant = applicants[prevIndex];
    const prevApplicantDocs = prevApplicant?.documents.length;

    setSelectedApplicant(prevApplicant.id);
    setSelectedDoc(prevApplicantDocs ? prevApplicantDocs - 1 : 0);
  }
}
async function fileUpload(applicant:applicantType){
  if(droppedFiles.length > 0){
    const doc_id = applicant.documents[selectedDoc].doc_id
   fileUploader(droppedFiles[0],doc_id);
   applicants
   
setApplicants((prev) =>
prev.map((e) =>
e.id === selectedApplicant
? {
...e,
documents: e.documents.map((d, i) =>
i === selectedDoc
? { ...d, document: droppedFiles[0],status:'completed'}
: d
),
}
: e
)
);

  setIsLoading(true);
  setTimeout(()=>{
setIsLoading(false)

  },2000)
}
console.log(applicants[0]);

}

console.log(applicants);

return (
<div className="min-h-screen flex flex-col px-5 py-12">
<div className="flex justify-between items-center mb-[6%]">
<h1 className="text-4xl font-bold text-gray-600">Document Upload</h1>
<Dialog>
<DialogTrigger asChild>
<Button className="bg-[#4785FF] hover:bg-blue-600 px-4 py-6 text-lg font-medium">
<Plus className="!h-6 !w-6" />Add Applicant
</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[485px] p-7 min-h-[270px]">
<DialogHeader className="mb-6">
<div className="flex items-center justify-between">
<DialogTitle className="text-[21px] font-[700] text-gray-700">Add Applicant</DialogTitle>
<DialogDescription></DialogDescription>
<DialogTrigger asChild></DialogTrigger>
</div>
</DialogHeader>
<div className="space-y-2">
<label htmlFor="name" className="text-lg font-medium text-gray-500">Name</label>
<Input id="name" className="w-[100%] h-[70%]" onChange={(e)=>setInput(e.target.value)}/>
</div>
<div className="flex justify-end gap-3 mt-8">
<div>
{input ? (
<DialogClose asChild>
  <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 h-12 w-35 text-lg px-4 py-2 rounded-md" onClick={saveApplicant}>
    <Check className="!h-6 !w-6" /> Save
  </Button>
</DialogClose>
):(
<Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 h-12 w-35 text-lg px-4 py-2 rounded-md">
  <Check className="!h-6 !w-6" /> Save
</Button>
)}
</div>
<div>
<DialogClose asChild>
<Button type="button" variant="outline" className="bg-gray-500 text-white hover:bg-gray-700 hover:text-white h-12 w-35 text-lg px-4 py-6 rounded-md" onClick={clearInput}>
  <X className="!h-6 !w-6 text-white" /> Cancel
</Button>
</DialogClose>
</div>
</div>
</DialogContent>
</Dialog>
</div>

<div className="flex gap-6 border-b pb-6 relative">
{applicants.map((applicant, index) => (
<div key={index} className="flex flex-col items-center gap-3 relative cursor-pointer group" onClick={() => setSelectedApplicant(applicant.id)}>
<div className="flex items-center gap-3 ml-5">
<span className={`text-lg ${selectedApplicant === applicant.id ? 'text-[#4785FF]' : 'text-gray-600'} font-semibold`}>
{applicant.name}
</span>
<Button variant="ghost" size="icon" className="h-12 w-12 bg-[#4785FF] hover:bg-blue-600 p-2" onClick={()=>removeApplicant(applicant.id)}>
<Trash2 className="h-6 w-6 text-white" />
</Button>
</div>
<AnimatePresence>
{selectedApplicant === applicant.id && (
<motion.div 
className="absolute -bottom-[24px] left-0 w-full h-0.5 bg-[#4785FF]"
initial={{ scaleX: 0, opacity: 0 }}
animate={{ scaleX: 1, opacity: 1 }}
exit={{ scaleX: 0, opacity: 0 }}
transition={{ type: "spring", stiffness: 260, damping: 20 }}
style={{ originX: 0 }}
/>
)}
</AnimatePresence>
</div>
))}
</div>

<div className="space-y-6 mt-5 ">
{selectedApplicant && (
<div className="flex gap-6 mb-[8%]">
<div className="flex flex-col gap-4">
{(() => {
const selectedApplicantData = applicants.find((e) => e.id === selectedApplicant);
if (selectedApplicantData) {
return selectedApplicantData.documents.length > 0 ? (
  selectedApplicantData.documents.map((a, i) => (
    selectedDoc === i ? <Button key={i} className="bg-[#4785FF] hover:bg-blue-600 h-14 w-28 text-base font-meduim">
      {a.doc_name}
    </Button> :
    <Button key={i} className="bg-blue-200 hover:bg-blue-600 h-14 w-28 text-gray-500 text-base font-meduim" onClick={()=>{
      setSelectedDoc(i);
      setDroppedFiles([])
    
      }}>
      {a.doc_name}
    </Button>
  ))
) : (
  <p className="text-gray-500">No documents found</p>
);
}
})()}

{selectedApplicant && applicants.length > 0 && 
<Dialog>
<DialogTrigger asChild>
  <Button className="bg-[#4785FF] hover:bg-blue-600 px-4 py-6 text-lg font-medium">
    <Plus className="h-6 w-6" />Add
  </Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[485px] p-7 min-h-[270px] !outline-none">
  <DialogHeader className="mb-6">
    <div className="flex items-center justify-between">
      <DialogTitle className="text-[21px] font-[700] text-gray-700">Add</DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogTrigger asChild></DialogTrigger>
    </div>
  </DialogHeader>
  <div className="space-y-2">
    <label htmlFor="name" className="text-lg font-medium text-gray-500">Document Name</label>
    <Input id="name" className="w-[100%] h-[70%]" onChange={(e)=>setInput(e.target.value)}/>
  </div>
  <div className="flex justify-end gap-3 mt-8">
    <div>
      {input ? (
        <DialogClose asChild>
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 h-12 w-35 text-lg px-4 py-2 rounded-md" onClick={saveDocument}>
            <Check className="!h-6 !w-6" /> Save
          </Button>
        </DialogClose>
      ):(
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 h-12 w-35 text-lg px-4 py-2 rounded-md">
          <Check className="!h-6 !w-6" /> Save
        </Button>
      )}
    </div>
    <div>
      <DialogClose asChild>
        <Button type="button" variant="outline" className="bg-gray-500 text-white hover:bg-gray-700 hover:text-white h-12 w-35 text-lg px-4 py-6 rounded-md" onClick={clearInput}>
          <X className="!h-6 !w-6 text-white" /> Cancel
        </Button>
      </DialogClose>
    </div>
  </div>
</DialogContent>
</Dialog>
}
</div>

{(() => {
const selectedApplicantData = applicants.find((e) => e.id === selectedApplicant);
if (selectedApplicantData && selectedApplicantData.documents.length > 0) {
return (
<Card className="flex-1 !rounded-none !max-h-20 !shadow-none">
  <div className="flex gap-4 m-5">
    <input
      ref={fileInputRef}
      id="fileInput"
      type="file"
      multiple
      className="hidden"
      onChange={handleFileSelect}
    />
    <label
      htmlFor="fileInput"
      className="bg-[#4785FF] hover:bg-blue-600 px-5 py-1 text-lg text-white rounded-md cursor-pointer flex items-center gap-2"
    >
      <Plus className="h-6 w-6" /> Choose
    </label>
    <Button variant="secondary" className="bg-blue-400 hover:bg-blue-200 text-white px-6 py-3 text-lg" onClick={()=>fileUpload(selectedApplicantData)}>
      <Upload className="!h-6 !w-6" /> Upload
    </Button>
    <Button variant="secondary" className="bg-blue-400 hover:bg-blue-200 text-white px-6 py-3 text-lg" onClick={()=>removeFile(selectedApplicantData)}>
      <X className="!h-6 !w-6" /> Cancel
    </Button>
  </div>
  <div className="border border-gray w-full"></div>
  
  <div 
  onDrop={handleDrop} 
  onDragOver={handleDragOver} 
  className="relative border border-dashed rounded-lg px-6 py-10 text-gray-600 min-h-[120px]"
>
  {isLoading && ( 
    <motion.div
      className="absolute inset-x-0 top-0 h-1 bg-blue-500"
      initial={{ scaleX: 0, transformOrigin: "0%" }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  )}
    {droppedFiles.length === 0 && !applicants.find((e) => e.id === selectedApplicant)?.documents.find((_,i)=>i ===selectedDoc)  ? (
      <p className="">Drag and Drop files here.</p>
    ) : (
      <div className="space-y-4">

{(() => {
  console.log(selectedDoc,);
  
  const docs = applicants.find((e) => e.id === selectedApplicant)?.documents.find((_,i)=>i ===selectedDoc) ;
console.log(docs?.status,"hi");

  return docs ? 
  <div className="flex items-center justify-between  p-3 rounded-lg">
     <div className="flex items-center gap-3">
             {docs.document || droppedFiles.length >0 ? <File className="h-5 w-5 text-blue-500" />:null} 
              <div>
                {docs.document ? <p className="text-sm font-medium text-gray-700">{docs?.document?.name}</p> :droppedFiles.length > 0 && <p className="text-sm font-medium text-gray-700">{droppedFiles[0].name}</p>}
          
                 {docs.document ? <p className="text-xs text-gray-500">{(docs?.document?.size / 1024).toFixed(2)}KB<button style={{ backgroundColor: docs?.status === "pending" ? "orange" : "#66cc88", color: "white", padding: "0.25rem 0.5rem", borderRadius: "1rem", marginLeft: "4px", fontWeight: 700 }}>{docs?.status}</button></p>:droppedFiles.length > 0 &&<p className="text-xs text-gray-500">{(droppedFiles[0].size / 1024).toFixed(2)}KB<button style={{ backgroundColor: "orange", color: "white", padding: "0.25rem 0.5rem", borderRadius: "1rem", marginLeft: "4px", fontWeight: 700 }}>pending</button></p>}
              </div>
            </div>
          { docs.document ||droppedFiles.length > 0 ? <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500" onClick={() => removeFile(selectedApplicantData)}>
              <X className="h-4 w-4" />
            </Button>:null}
    </div> :
   null;
})()}
      </div>
    )}
  </div>
</Card>
);
} 
})()}
</div>
)}
</div>

<div className="flex justify-between mb-[6%] mt-[3%]">
<Button className="bg-[#4785FF] hover:bg-blue-600 px-6 py-6 text-lg font-bold" onClick={backButton}>
<ArrowLeft className="!h-5 !w-5" /> Back
</Button>
<Button className="bg-[#4785FF] hover:bg-blue-600 px-6 py-6 text-lg font-bold" onClick={nextButton}>
<ArrowRight className="!h-5 !w-5" /> Next
</Button>
</div>
<div className="border-2"></div>
</div>
)
}
export default Home;