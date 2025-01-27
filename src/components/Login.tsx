import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userLoginType } from "../interface/interface";
import { loginUserCheck } from "../service/service";



function Login() {

  const { register, handleSubmit, formState: { errors },reset } = useForm<userLoginType>();
  const nav = useNavigate();

  async function submitForms(data:userLoginType) {
   const response = await loginUserCheck(data);
if(response?.status === 200){
  const token = response.token;
 token ? localStorage.setItem("token",token):alert("username or password is wrong") 
 response.status === 200 ? alert("login successful") :alert("username or password is wrong");
 
 


reset();
nav('/document/')

}
else{
  alert("username or password is wrong")
}

  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 h-screen">
      <form onSubmit={handleSubmit(submitForms)}>
        <div className="px-20 py-14 border border-gray-200 rounded-lg shadow-lg bg-white ">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>
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
          <p className="flex">Didn't have an account yet?<a href="" onClick={()=>nav('/register')} className="text-sm text-blue-500 hover:text-blue-600 underline block text-right mb-6 ml-0.5 mt-0.5">Create account</a></p>
          <div>
            <button 
              type="submit" 
              className="w-full p-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
