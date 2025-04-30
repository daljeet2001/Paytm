import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {useEffect,useState} from "react"
import axios from "axios"

export const Dashboard = () => {

      const [balance,setBalance]=useState(null)
  
      useEffect(() => {
          const token = localStorage.getItem("token");
          axios.get("http://localhost:8080/api/v1/account/balance",{
          headers: {
          Authorization: `Bearer ${token}`,
          },
          }).then(response=>{
            console.log(response.data)
          setBalance(response.data.bal)
      }).catch(error => {
          console.error("Failed to fetch balance:", error); 
        });  
      }, [])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}
