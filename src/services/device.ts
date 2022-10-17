import axios from "axios";
import IDevices from "../types/deviceType";


const PHONES = "https://js-test-api.etnetera.cz/api/v1/phones";
const BORROW_PHONE = (id: string) => `https://js-test-api.etnetera.cz/api/v1/phones/${id}/borrow`;
const RETURN_PHONE = (id: string) => `https://js-test-api.etnetera.cz/api/v1/phones/${id}/return`;


export const getDevicesToStorage = async (token: string) => {

    return await axios.get(
        PHONES, {headers: {
            'Auth-Token': token
        }
    }).then(response => {
        localStorage.setItem("devices", JSON.stringify(response.data))
        return response.data
    });

}


export const getDevices = () => {
    const deviceStr = localStorage.getItem("device");
    if (deviceStr) return JSON.parse(deviceStr);

    return null;
}

export const borrowDevice = async (token: string, id: string) => {
    return axios.post(
        BORROW_PHONE(id), {}, {
            headers:{
                'Auth-Token': token
            }
        }).then(response => {
        return response.status;
    });
}

export const returnDevice = async (token: string, id: string) => {
    return axios.post(
        RETURN_PHONE(id),{}, {
            headers:{
                'Auth-Token': token
            }
        }
    ).then(response => {
        return response.status;
    });
}

export const createDevice = async (token:string, device:IDevices) => {
    return axios.post(
        PHONES, device, {
            headers:{
                'Auth-Token': token
            }
        }
    )
}