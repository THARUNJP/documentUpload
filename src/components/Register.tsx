import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerTheUser } from "../service/service.ts";
import { userType } from "../interface/interface";

function Register(){
const nav =useNavigate();

const {register,handleSubmit,formState:{errors},reset}= useForm<userType>();

async  function registerForms(data:userType) {


const response =  await registerTheUser(data)


if(response === "valid") {
  alert("successfully account created");
  reset();
  nav('/login')
}
else{
  alert("Already email exist")
  reset();
}  
    
}




return(
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 h-screen">
    <form onSubmit={handleSubmit(registerForms)}>
      <div className="px-20 py-14 border border-gray-200 rounded-lg shadow-lg bg-white ">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create</h2>
        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input 
            type="text" 
            className="border border-gray-300 w-[294px] py-2 px-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            {...register("name", { required: true })} 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">name is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input 
            type="text" 
            className="border border-gray-300 w-[294px] py-2 px-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            {...register("email", { required: true })} 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Username is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input 
            type="password" 
            className="border border-gray-300 w-[294px] py-2 px-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            {...register("password", { required: true })} 
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
        </div>
        <p className="flex">Already have an account?<a onClick={()=>nav('/login')} className="text-sm text-blue-500 hover:text-blue-600 underline block text-right mb-6 ml-0.5 mt-0.5 cursor-pointer">Sign In</a></p>
        <div>
          <button 
            type="submit" 
            className="w-full p-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  </div>
)

}

export default Register;