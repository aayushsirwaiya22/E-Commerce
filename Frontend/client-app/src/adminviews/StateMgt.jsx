import React,{useEffect, useState} from "react";
import axios from "axios";
// import "../App.css"

function StateMgt(){
    const [stid,setStId]=useState();
    const [stname,setStName]=useState();
    const [status,setStatus]=useState();
    const [slist,setSlist]=useState([]);

    const handleStateIdText=(evt)=>{
        setStId(evt.target.value);
    }


    const handleStNameText=(evt)=>{
        setStName(evt.target.value);
    }
    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
    }
    const handleSaveButton=()=>{
        var obj={
            StId:stid,
            StName:stname,
            Status:status
        };
        axios.post("http://localhost:9669/state/save",obj)
        .then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleSearchButton=()=>{
         axios.get("http://localhost:9669/state/search/"+stid)
         .then((res)=>{
            if ( res.data.StId!=undefined) {  // Ensures response has valid data
                setStId(res.data.StId);
                setStName(res.data.StName);
                setStatus(res.data.Status);
            }
            else{

                alert("data not found")
            }
           
        }).catch((err)=>{
            alert(err);
        });
    }
    //update State
    const handleUpdateButton=()=>{
        var obj={
            StId:stid,
            StName:stname,
            Status:status
        };
        axios.put("http://localhost:9669/state/update",obj)
        .then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleDeleteButton=()=>{
        axios.delete("http://localhost:9669/state/delete/"+ stid)
        .then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleShowAllButton=()=>{
        axios.get("http://localhost:9669/state/show")
        .then((res)=>{
            setSlist(res.data)            
        }).catch((err)=>{
            alert(err);
        });
    }
    useEffect(()=>{
        axios.get("http://localhost:9669/state/show")
        .then((res)=>{
            setStId(res.data.length+1) ;           
        }).catch((err)=>{
            alert(err);
        });
    },[])

    return(
    <div>
    <center>
        <h4 style={{backgroundColor:"green",color:"white"}}>State Management</h4>
        <table>
            <tr>
                <td>
                    State Id
                </td>
                <td>
                    <input type="number" value={stid} onChange={handleStateIdText}/>
                </td>
            </tr>
            <tr>
                <td>
                    State name
                </td>
                <td>
                    <input value={stname} type="text" onChange={handleStNameText}/>
                </td>
            </tr>
            <tr>
                <td>Status</td>
                <td>
                    <select type="submit" value={status} onClick={handleStatusText}>
                        <option value={""} >Select</option>
                        <option value={"active"}>active</option>
                        <option value={"inactive"}>inactive</option>
                    </select>
                </td>
            </tr>
        </table>
        <table border={1}>
            <tr>
                <td>
                    <button type="Submit" onClick={handleSaveButton}>Save</button>
                </td>
                <td>
                    <button type="Submit" onClick={handleSearchButton}>Search</button>
                </td>
                <td>
                    <button type="Submit" onClick={handleUpdateButton}>Update</button>
                </td>
                <td>
                    <button type="Submit" onClick={handleDeleteButton}>Delete</button>
                </td>
                <td>
                    <button type="Submit" onClick={handleShowAllButton}>Show</button>
                </td>
            </tr>
        </table>
        <h4>List Of Tables</h4>
        <table border={1}>
            <tr>
                <th>State Id</th>
                <th>State Name</th>
                <th>status</th>
            </tr>
            {
                slist.map((item)=>(
                    <tr>
                        <td>{item.StId}</td>
                        <td>{item.StName}</td>
                        <td>{item.Status}</td>
                    </tr>
                ))
            }
        </table>
    </center>
</div>
)
}export default StateMgt;