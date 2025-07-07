import React, { useEffect,useState } from "react";
import axios from "axios";
import cart from "F:/React/Project/Frontend/client-app/src/Product/Cart.jpeg";
import reactDOM from "react-dom/client";
import Bill from "../Bill/Bill";

function ProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);

    var cname = "";
    useEffect(() => {
        axios.get("http://localhost:9669/product/showproduct")
            .then((res) => {
                setPCatgList(res.data);
            })
            .catch((err) => {
                alert(err);
            });
            axios.get("http://localhost:9669/productcatg/show")
            .then((res)=>{
                setPCatgList(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const handleBuyButton = (evt) => {
        var pid = parseInt(evt);
        var status = ""
        axios.get("http://localhost:9669/product/showproductstatus/" + pid)
            .then((res) => {
                status =res.data.status;
                if (status == "Active") {
                    setItemCount(itemcount + 1)
                    plist.map((item) => {
                        if (item.pid == evt) {
                            selitems.push(item);
                        }
                    })
                }
                else {
                    alert("product out of stock");
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    const handleCheckButton = () => {
        if (selitems.length <= 0) {
            alert("Buy some product")
        }
        else {
            const root = reactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;
            var obj = {
                selitems: selitems,
                cid: ccid
            };
            root.render(<Bill data={obj}></Bill>)
        }
    }

    const handleSearch=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:9669/product/showproductbycatgid"+evt.target.value)
            .then((res) => {
                setPList(res.data);
            })
            .catch((err) => {
                alert(err);
            })
        }
        else{
            axios.get("http://localhost:9669/product/showproduct")
            .then((res)=>{
                setPList(res.data);
            })
            .catch((err)=>{
                alert(err);
            })
        }
    }
    return(
        <div>
                <h6>Customer Id{props.data}</h6>
                <div>
                    <img src={cart} height={50} width={50}/>
                    <label>{itemcount}</label>
                    <button type="submit" onClick={handleCheckButton}>CheckOut</button>
                </div>
            <center>
                search by category<select onClick={handleSearch}>
                    <option value="0">All</option>
                    {
                        pcatglist.map((pcatgitem)=>{
                            <option value={pcatgitem.pcatgId}>{pcatgitem.pcatgName}</option>
                        })
                    }
                </select>
                <p style={{backgroundColor:"green",color:"white"}}>Product List</p>
                <table border={2}>
                <tr>
                    <th>Id</th>
                    <th>Photo Name</th>
                    <th>Price</th>
                    <th>Offer Price</th>
                    <th>Category name</th>
                    <th>Photo</th>
                    <th>Action</th>
                </tr>
                {
                    plist.map((item)=>(
                        <tr>
                            <td>{item.pid}</td>
                            <td>{item.pname}</td>
                            <td>{item.pprice}</td>
                            <td>{item.oprice}</td>
                            <td>
                                {
                                    pcatglist.map((citem)=>{
                                        if(item.pcatgid==citem.PCatgId){
                                            cname=(citem.PCatgName)
                                        }
                                    })
                                }
                                {cname}
                            </td>
                            <td>
                                <img src={"http://localhost:9669/product/getproductimage/"+item.ppicname}
                                height={100} width={100}/>
                            </td>
                            <td>
                                <button type="submit" onClick={()=>handleBuyButton(item.pid)}>Buy</button>
                            </td>

                        </tr>
                    ))
                }
                </table>
            </center>
        </div>
    )
}export default ProductList;