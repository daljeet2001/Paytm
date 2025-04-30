import React from'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import {Signin }from '../screens/SigninPage'
import {Signup} from '../screens/SignupPage'
import {Dashboard} from '../screens/Dashboard'
import {SendMoney} from '../screens/Send'


const AppRoutes=()=>{
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/send" element={<SendMoney/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;