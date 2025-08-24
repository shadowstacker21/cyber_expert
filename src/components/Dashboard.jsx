import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart } from 'lucide-react';



const Dashboard = () => {
        
        const [users,setUsers]=useState([]);
        const [error,setError]=useState("");
        const [list,setList] = useState([])
       
         console.log(list);
    
    useEffect(()=>{
        axios.get('/experts.json')
        .then(data=>setUsers(data.data))
        .catch((err)=>setError(err.message))
      
    },[]);

    const addItem=(user)=>{
        const selectPerson = list.find((item)=>item.name===user.name)
        if(!selectPerson){
         setList([...list,user])
        }

        else {
            setError("This person is already selected")
             setTimeout(() => setError(""), 5000);
            return;
        }
         
            
    }
     const totalPrice=list.reduce((total,person)=>(total+person.salary),0);
    return (
        <div>
       
           <div className="max-w-[1700px] mx-auto ">
            {error && <p className="bg-red-100 text-center px-2 py-2 text-red-700 border-red">{error}</p> }
            {/* Navbar */}
           <div className="flex flex-col mx-auto  mt-4 items-center bg-orange-200 h-30">
             <h1 className="mt-4  text-2xl ">Make a Cyber Security Team</h1>
             <p className="text-gray-800">Our Server is under attack so we need to hire a special cyber security team </p>
             <h2><span className="text-2xl ">Total Budget:</span> <span className="text-2xl font-semibold">10 Million</span></h2>
           </div>
           {/* Body */}
           <div className="mt-10 flex gap-3 justify-center">
            {/* cart list */}
            <div className="grid grid-cols-3 gap-4">
            {users.map((user)=>(
                 <div key={user.id} className="">
                    <div className="p-12  shadow-full bg-gray-200">
                        <img src={user.img} alt="" className="w-30 h-30 mx-auto rounded-full" />
                        <h1 className="text-center mt-4 text-2xl text-gray-600 font-semibold">{user.name}</h1>
                        <p className="text-center mt-4"><span className="font-bold">Age: </span><span className="text-gray-600 font-bold">{user.age}</span></p>
                        <p className="mt-4"><span className="font-bold  text-gray-700">Designation: </span><span className="text-gray-600 font-semibold">{user.designation}</span> </p>
                        <p className="mt-4"><span className="font-bold  text-gray-700">Address: </span><span  className="text-gray-600 font-semibold">{user.address}</span> </p>
                        <p className="mt-4"><span className="font-bold text-gray-700">Salary: </span><span  className="text-gray-600 font-semibold">{user.salary}</span> </p>
                         <button onClick={()=>addItem(user)} className="bg-blue-500 cursor-pointer items-center mt-2 text-center px-3 py-2 rounded-sm text-white">
                            <span className="flex gap-4">
                                <ShoppingCart/>
                            Add to List
                            </span>
                            </button>
                    </div>
                   
                </div>
            ))}
            </div>
                
         {/* Add to cart */}
           {list.length>0?(
             <div className="bg-gray-100 rounded-lg p-6 shadow-md h-auto">
                    <h1 className="text-2xl font-semibold">Expert Added: {list.length}</h1>
                    <h1 className="text-xl font-semibold mt-2">Total Cost: ${totalPrice}</h1>

                <div className="flex flex-col gap-2 mt-4">
                    {list.map((item) => (
                    <div key={item.id} className="flex justify-arround gap-4 items-center p-2 bg-white rounded">
                        <img src={item.img} alt={item.name} className="w-20 h-20 rounded-full" />
                        <p className="text-sm text-gray-600">{item.name}</p>
                       
                    </div>
                    ))}
                </div>

                <button className="bg-blue-600 text-white rounded-md cursor-pointer w-60 h-16 p-2 mt-4">Confirm List</button>
                </div>
           ): (<p className="bg-green-100 text-center px-2 py-2 text-red-700 border-red">No person Selected</p> )}

           </div>
           </div>
        </div>
    );
};

export default Dashboard;