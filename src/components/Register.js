import React, { useContext, useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { adddata } from "./context/ContextProvider";

const Register = () => {

  const {setudata} = useContext(adddata);

  const history = useNavigate("");

    const [input, setInput] = useState(
        {
          username :"",
            email :"",
            age :"",
            moblie :"",
            work : "",
            add :"",
            desc :"",
        }
    );

  

   const handle =(e)=>{
    console.log(e.target.value);
    const {name , value} = e.target;
    setInput((preval)=>{
        return{
            ...preval,
            [name]:value
        }
    })
   }
  
   const addData = async(e) =>{
     e.preventDefault();
     const {username , email,age , moblie , work , add, desc} = input;
    const res = await fetch("https://curdapp-x40a.onrender.com/register",{
      method : "POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({username , email, age, moblie , work , add ,desc})
    });
    const data = await res.json();
    console.log(data);

   if(res.status===422 || !data){
    alert("error");
    console.log("error");
   }else{
    alert("data added");
    console.log("data added");
    history("/");
    setudata(data);
   }
  }



  return (
    <div className ="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-mg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input name="username" onChange={handle} value={input.username}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3 col-lg-6 col-mg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input name="email" onChange={handle} value={input.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3 col-lg-6 col-mg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">age</label>
            <input name="age" onChange={handle} value={input.age} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3 col-lg-6 col-mg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Mobile</label>
            <input name="moblie" onChange={handle} value={input.moblie}  type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3 col-lg-6 col-mg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Work</label>
            <input name="work" onChange={handle} value={input.work}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3 col-lg-6 col-mg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
            <input name="add" onChange={handle} value={input.add} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3 col-lg-12 col-mg-12 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
            <textarea name="desc"onChange={handle}  value={input.desc} type="text"  className="form-control"  id="exampleInputEmail1" cols="30" rows="5"></textarea>
          </div>
          <button type="submit"   onClick={addData} className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;