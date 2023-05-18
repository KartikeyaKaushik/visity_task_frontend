import React ,{useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';


export default function Main(){

    const navigate = useNavigate();

    // useState for posting data
    const[data, setData] = useState({name:'',mobile:'', email:''});
    
    // useState for fetching data
    const[items, setItems] = useState([]);

    // handling form's data entered by user
    const handleInputs = (e)=>{
        const name= e.target.name;
        const value = e.target.value;
        setData({...data, [name]:value})

    }

    // posting form data
    const postData = async(e)=>{
        e.preventDefault();
        const{name,mobile,email} = data
        if(name.length<5){
            window.alert("name should have atleast 5 characters");
        }
        else if(mobile.length>10){
            window.alert("mobile cannot exceed 10 digits");
        }
        else if(mobile=="" || email==""){
            window.alert("fields cannot be empty")
        }
        else{
            const res = await fetch('http://localhost:9990/post', {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({name,mobile,email})
            });
            const dataa = await res.json();
            if(!dataa.status===200){
                window.alert("data insertion failed");
            }
            else{
                window.alert("data inserted")
                console.log("data inserted");
                window.location.reload(true)
            }
        }
        
        
    };

    // fetching all data
    const item = async()=>{
        try{
            const res = await fetch('http://localhost:9990/get',{
                method:"GET"
            });
            const dataa = await res.json();
            setItems(dataa.data)
        }   
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{item()},[])

    // deleting an item by it's id
    const deleteItem = async (id)=>{
        let result = await fetch(`http://localhost:9990/delete/${id}`,{
            method:"DELETE"
        })
        let data = await result.json();
        if(data){
            window.alert("Item deleted");
            item();
        }
    }

    return(
        <>  
            <div className="container-fluid mt-3">
                <p className="display-6">Web Form</p>
                {/* form section */}
                <form className="">
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" value={data.name} name="name" onChange={handleInputs}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mobile:</label>
                        <input type="number" className="form-control" id="mobile" value={data.mobile} name="mobile" onChange={handleInputs}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={data.email} aria-describedby="emailHelp" name="email" onChange={handleInputs}/>
                    </div>
                    <button type="submit"  onClick={postData} className="btn btn-primary">Submit</button>
                </form>
                
                {/* list section */}
                <div className="mt-5">
                    <p className="display-6">List</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Email</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (items.length>0)? items.map((e,i)=>{
                                    return(
                                        <tr>
                                            <td>{e.name}</td>
                                            <td>{e.mobile}</td>
                                            <td>{e.email}</td>
                                            <td><button  className="btn btn-sm btn-outline-success">Edit</button></td>
                                            <td><button onClick={()=>deleteItem(e._id)} className="btn btn-sm btn-outline-danger">Delete</button></td>
                                        </tr>
                                    )
                                }):""
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}