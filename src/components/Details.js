import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { NavLink, useParams ,useNavigate } from "react-router-dom";

const Details = () => {

  const history =useNavigate("");
  const {id} = useParams("");
  console.log(id);

  const [getuserdata , setuserdata] = useState([]);
  console.log(getuserdata);

  const getData = async(e) =>{  
    const res = await fetch(`https://curdapp-x40a.onrender.com/getuser/${id}`,{
      method : "GET",
      headers:{ "Content-Type":"application/json"},
    });
 
    const data = await res.json();
    console.log(data);
 
   if(res.status === 422 || !data){
    console.log("error");
   }else{
     setuserdata([data]);
    console.log("data added");
   }
  }
 
  useEffect(()=>{
   getData();  
  },[]);


  
  const deleteuser = async (id) => {
    const res2 = await fetch(`https://curdapp-x40a.onrender.com/deleteuser/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      history.push("/");
    }
  };




  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Shweta Pandey</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
              <div className="add_btn " >
              <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary mx-2 " ><CreateIcon/></button></NavLink>
              <button className="btn btn-danger  mx-2" onClick={()=>deleteuser(getuserdata._id)} ><DeleteOutlineIcon/></button>
              </div>
          <div className="row">

            <div className="left_view  col-lg-6 col-md-6 col-12 ">
              <AccountBoxIcon style={{ fontSize: 70 }} />
              <h3 className="mt-3">Name:<span>{getuserdata.username}</span></h3>
              <h3 className="mt-3">age:<span>{getuserdata.age}</span></h3>
              <p className="mt-3"><EmailIcon />Email:<span>{getuserdata.email}</span></p>
              <p  className="mt-3" ><WorkIcon /> Occuption:<span>{getuserdata.work}</span></p>
            </div>

            <div className="right_view  mt-5 col-lg-6 col-md-6 col-12 ">
              <p className="mt-5" ><PhoneAndroidIcon /> moblie:<span>{getuserdata.moblie}</span></p>
              <p className="mt-3"><FmdGoodIcon /> location:<span>{getuserdata.add}</span></p>
              <p className="mt-3">Description:<span> {getuserdata.desc} </span></p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;