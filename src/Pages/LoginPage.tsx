import React, {useState, useRef} from 'react';
import { useForm } from "react-hook-form";
import IUser from '../types/userType';
import axios from "axios";
import { getCurrentUser, loginUser } from '../services/auth';
import { getDevicesToStorage } from '../services/device';



function LoginPage(){

    const { register, handleSubmit} = useForm<IUser>();

    const alertRef = useRef<HTMLDivElement>(null);

    function hideAlert(){
        if(alertRef && alertRef.current){
            alertRef.current.classList.add("hidden");
        }
    }

    function showAlert(){
        if(alertRef && alertRef.current){
            alertRef.current.classList.remove("hidden");
        }
    }


    const  OnSubmit = handleSubmit(({ login, password }) => {
        hideAlert()
        const response = loginUser(login, password)
        response.then(result =>{
            if(getCurrentUser() != null){
                window.location.href = "/devices"
            }else{
                showAlert()
            }

        }).catch( result => {
            showAlert()
        })
        const data = getCurrentUser();


    })


    return(
        <div className="Auth-form-container">
            
            <form className="Auth-form" onSubmit={OnSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Přihlášení</h3>
                    <div className="form-group mt-1">
                        <input {...register("login")} name="login" type="text" placeholder='Přihlašovací jméno' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1">
                        <input {...register("password")}name="password" type="password" placeholder='Heslo' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1 text-danger hidden" ref={alertRef}>
                        Špatně zadané údaje
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Přihlásit se</button>
                    </div>
                    
                </div>
            </form>
        </div>
    );

}


export default LoginPage;