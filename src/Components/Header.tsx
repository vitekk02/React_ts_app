import React, {useState,} from 'react';
import { Button } from 'react-bootstrap';
import {Link, redirect} from 'react-router-dom'
import { getCurrentUser, logout } from '../services/auth';
import IUser from '../types/userType';


function handleLogout(){
    logout()
    window.location.href = "/login";
    
}

function Header(props: {user: IUser}){


    return(
        <nav className='navbar navbar-expand-lg navbar-toggleable-lg navbar-light header'>
            <div className='container-fluid'>
                <ul className="navbar-nav ms-auto">
                    <li className='nav-item'>
                        {!props.user  &&
                        <Link to={"/login"}>
                            <Button className='margin-left-15'>
                            Login
                            </Button>
                        </Link>
                        }
                        {props.user &&
                            <b>{props.user.login}</b>
                        }
                        {props.user &&
                         <Button className='margin-left-15' onClick={() => handleLogout()}>
                            Logout
                        </Button>
                        }
                        {props.user?.type == "admin" && 
                        <Link to={"/createDevice"}>
                            <Button className='margin-left-15'>
                            Přidat zařízení
                            </Button>
                        </Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>

    );

}

export default Header;