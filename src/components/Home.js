import React, { useEffect, useState  , useContext} from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata ,updateData ,delData } from "./context/ContextProvider";

const Home = () => {

  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);
  
  const {udata } = useContext(adddata);
  
  const {updata} = useContext(updateData);

  const {dltdata , setdltdata} = useContext(delData);

  const getData = async () => {
    const res = await fetch("https://curdapp-x40a.onrender.com/getdata", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setuserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

 


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
      getData(); 
      setdltdata(deletedata);

    }
  };



  return (
    <>
    {
      udata ?
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{udata.name}</strong> added successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </> :""
    }

    {
      updata ?
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{updata.name}</strong> updated successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </> :""
    }

    {
      dltdata ?
      <>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{dltdata.name}</strong> deleted successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </> :""
    }





    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            Add data
          </NavLink>
        </div>

        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">job</th>
              <th scope="col">Phone No.</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {    getuserdata.map((element, id) => {
              return (
                <>
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.username}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.moblie}</td>
                    <td className="d-flex justify-content-between  ">
                      <NavLink to={`/view/${element._id}`}>
                        <button className="btn btn-success ">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>
                      <NavLink to={`/edit/${element._id}`}>
                        <button className="btn btn-primary mx-2">
                          <CreateIcon />
                        </button>
                      </NavLink>
                      <button className="btn btn-danger mx-2" onClick={()=>deleteuser(element._id)} >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Home;