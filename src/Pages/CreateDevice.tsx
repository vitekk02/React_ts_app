import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import IUser from '../types/userType';
import axios from "axios";
import { getCurrentUser, loginUser } from '../services/auth';
import { createDevice, getDevicesToStorage } from '../services/device';
import IDevices from '../types/deviceType';

export default function CreateDevice(props : {user: IUser}){

    const { register, handleSubmit} = useForm<IDevices>();


    const  OnSubmit = handleSubmit((device) => {


        const response = createDevice(props.user.token, device);

        response.then(result => {
            if(result.status == 201){
                window.location.href = "/devices"
            }else{
                // TODO: Error
            }
        })

    });


    return(
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={OnSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Vytvořit zařízení</h3>
                    <div className="form-group mt-1">
                        <input {...register("code")} name="code" type="text" placeholder='Kódové označení (identifikátor)' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1">
                        <input {...register("vendor")}name="vendor" type="text" placeholder='Výrobce' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1">
                        <input {...register("model")}name="model" type="text" placeholder='Model' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1">
                        <input {...register("os")}name="os" type="text" placeholder='Operační systém' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1">
                        <input {...register("osVersion")}name="osVersion" type="text" placeholder='Verze operačního systému' className='form-control'></input>
                    </div>
                    <div className="form-group mt-1">
                        <input {...register("image")}name="image" type="text" placeholder='Obrázek(URL)' className='form-control'></input>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Přidat zařízení</button>
                    </div>
                </div>
            </form>
        </div>
    );

}


