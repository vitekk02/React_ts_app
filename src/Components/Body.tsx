import { Route, Routes } from "react-router-dom";
import CreateDevice from "../Pages/CreateDevice";
import DeviceList from "../Pages/DeviceList";
import LoginPage from "../Pages/LoginPage";
import IUser from "../types/userType";



function Body(props: {user: IUser}) {

    return(
        <div className="pageBody">

        {/* Pokud je uzivatel prihlaseny, tak je homepage /devices, jinak /login*/}
        <Routes>
            {!props.user && 
            
            <Route path='/' element={<LoginPage/>}/>
            }
            {props.user && 
                <Route path='/' element={<DeviceList user={props.user}/>}/>
            }
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/devices' element={<DeviceList user={props.user}/>}/>
            <Route path='/createDevice' element={<CreateDevice user={props.user}/>}/>
        </Routes>
        </div>
    )
}

export default Body;