import React, { useState , useEffect, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { updateData } from "./context/ContextProvider";

const Edit = () => {
 const {setupdata} = useContext(updateData);

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



   const {id} = useParams("");
  console.log(id);


  const getData = async() =>{  
    const res = await fetch(`https://curdapp-x40a.onrender.com/getuser/${id}`,{
      method : "GET",
      headers:{ "Content-Type":"application/json"},
    });
 
    const data = await res.json();
    console.log(data);
 
   if(res.status === 422 || !data){
    console.log("error");
   }else{
    setInput(data);
    console.log("data added");


   }
  }
 
  useEffect(()=>{
   getData();  
  },[]);


  const updateuser = async(e) =>{
    e.preventDefault();
    const {username , email,age , moblie , work , add, desc} = input;
   const res2 = await fetch(`https://curdapp-x40a.onrender.com/updateuser/${id}`,{
     method : "PATCH",
     headers:{ "Content-Type":"application/json"},
     body:JSON.stringify({username , email, age, moblie , work , add ,desc})
   });
   const data2 = await res2.json();
   console.log(data2);

  if(res2.status === 422 || !data2){
   alert("fill the data");

  }else{
 
   history("/");
   setupdata(data2);
  }
 }



  return (
    <div className ="container">
      <htmlform className="mt-5">
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
            <input name="age" onChange={handle} value={input.age} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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
          <button type="submit" onClick={updateuser}  className="btn btn-primary">Submit</button>
        </div>
      </htmlform>
    </div>
  );
};

export default Edit;