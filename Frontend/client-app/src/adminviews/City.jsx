import React, { useEffect, useState } from "react";
import axios from "axios";

function CityMgt() {
  const [ctid, setCtId] = useState();
  const [ctname, setCtName] = useState();
  const [stid, setStId] = useState();
  const [status, setStatus] = useState();
  const [ctlist, setCtList] = useState([]);
  const [stlist, setStList] = useState([]);

  var statename = "";

  const handleCtIdText = (evt) => {
    setCtId(evt.target.value);
  };

  const handleCtNameText = (evt) => {
    setCtName(evt.target.value);
  };

  const handleStIdSelect = (evt) => {
    // alert(evt.target.value);
    setStId(evt.target.value);
  };

  const handleStatusText = (evt) => {
    setStatus(evt.target.value);
  };

  //   Handle page Load Event or This Function Will execute automatically at the loading

  useEffect(() => {
    axios.get("http://localhost:9669/state/show")
      .then((res) => {
        setStList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  },[]);

  const handleAddNewButton = () => {
    axios
      .get("http://localhost:9669/city/getall")
      .then((res) => {
        setCtId(res.data.length + 1);
        // setStatus(1);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSaveButton = () => {
    if (
      ctid === "" ||
      ctid === undefined ||
      ctname === "" ||
      ctname === undefined ||
      stid === "" ||
      stid === undefined ||
      status === "" ||
      status === undefined
    ) {
      alert("Please Fill All Fields");
      return;
    } else {
      axios
        .get("http://localhost:9669/city/searchbyname/" + ctname)
        .then((res) => {
          if (res.data.ctname != undefined) {
            alert("City name alrady exist");
          } else {
            const obj = {
              ctid: ctid,
              ctname: ctname,
              stid: stid,
              status: status,
            };
            axios
              .post("http://localhost:9669/city/save/", obj)
              .then((res) => {
                alert(res.data);
                setCtId(" ");
                setCtName("");
                setStId(" ");
                setStatus(" ");
              })
              .catch((err) => {
                alert(err);
              });
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
  };

 
  const handleShowButton = () => {
    axios
      .get("http://localhost:9669/city/getall")
      .then((res) => {
        setCtList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSearchButton=()=>{
    if(ctid!=undefined&&ctid!="")
    {
        axios.get("http://localhost:9669/city/search/"+ctid).then((res)=>{
            if(res.data.stid!=undefined){
                setCtId(res.data.ctid);
                setCtName(res.data.ctname);
                setStId(res.data.stid);
                setStatus(res.data.status);
            }else{
                alert("Data Not Found");
            }
        }).catch((err)=>{
            alert(err);
        });
    }

  }
  const handleUpdateButton=()=>{
    if( ctid == "" ||
        ctid == undefined ||
        ctname == "" ||
        ctname == undefined ||
        stid == "" ||
        stid == undefined ||
        status == "" ||
        status == undefined){

            alert("Plase Fill all Fields");
            return;

        }else{
            var obj={
                ctid: ctid,
              ctname: ctname,
              stid: stid,
              status: status,
            }
            axios.put("http://localhost:9669/city/update/",obj).then((res)=>{
                alert(res.data);
                setCtId("");
                setCtName("");
                setStId(" ");
                setStatus(" ");
            }).catch((err)=>{
                alert(err);
            })
        }
  }

  const handleDeleteButton=()=>{
    if(ctid!=undefined&&ctid!=""){
        axios.delete("http://localhost:9669/city/delete/"+ctid).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }else{
        alert("Fill State Id To Delete")
    }
  }

  return (
    <div>
      <center>
        <h4 style={{ backgroundColor: "green", color: "white" }}>
        City Management {" "}
        </h4>
        <center>
        <table border={2}>
          <tr>
            <td>City Id </td>
            <td>
                <input type="number " onChange={handleCtIdText} value={ctid} className="form-control" />
            </td>
          </tr>
          <tr>
            <td>City Name </td>
            <td>
             
              <input type="text" onChange={handleCtNameText} 
               className="form-control" value={ctname}/>
            </td>
          </tr>

          <tr>
            <td>  State Name </td>
            <td>
             <select onClick={handleStIdSelect} id="stdropdown" name="stateddl" className="form-control" >

                {
                    stlist.map((item)=>(
                        
                        <option value={item.StId} key={item.StId}>{item.StName} </option>
                    ))
                }


             </select>
            </td>
          </tr>

          <tr>
            <td>Status</td>

            {/* <td>
              <input type="text" onChange={handleStatusText} 
              className="form-control" value={status} />
            </td> */}
            <td>
              <select type="submit" value={status} onChange={handleStatusText} className="form-control ">
                <option value={""}>Select Status</option>
                <option value={1}>active</option>
                <option value={2}>inactive</option>
              </select>
            </td>
          </tr>

         

          </table>
            <table border={2}> 
                <tr>
            <td>
              <button type="submit" onClick={handleAddNewButton}
                className="btn btn-primary">
                New
              </button>
            </td>
            <td>
              <button type="submit" onClick={handleSaveButton}
              className="btn btn-success">
                Save
              </button>
            </td>

            <td>
              <button type="submit" onClick={handleSearchButton}
              className="btn btn-success">
                Search
              </button>
            </td>

            <td>
              <button type="submit" onClick={handleShowButton}
              className="btn btn-success">
               Show
              </button>
            </td>

            <td>
              <button type="submit" onClick={handleUpdateButton}
              className="btn btn-success">
               Update
              </button>
            </td>

            <td>
              <button type="submit" onClick={handleDeleteButton}
              className="btn btn-success">
               Delete
              </button>
            </td>
          </tr>
        </table>
        </center>

<div>
    <center>
<h4>List Of Tables</h4>
   
        <table border={2}>
          <tr>
            <th> City Id</th>
            <th> City Name</th>
            <th> State Name </th>
            <th> Status</th>
          </tr>
          {ctlist.map((item) => (
            <tr>
              <td>{item.ctid}</td>
              <td>{item.ctname}</td>
              <td>
                { 
                 stlist.map((stitem)=>{
                    if(item.stid==stitem.StId){
                        statename=stitem.StName 
                    }
                 })
                }

          {statename}
              </td>
              <td>
              {item.status==1?<h5>enabled </h5>:<h5>disable</h5>}
              </td>
            </tr>
           
          ))
        }
        </table>
        </center>

</div>
     
      </center>
    </div>
  );
}

export default CityMgt;
