import IBorrowed from "./borrowedType"
import IUser from "./userType"



export default interface IDevices{
    id?: any | null,
    code?: string | null,
    os?: string,
    vendor?: string,
    model: string,
    osVersion: string,
    image: string | null,
    borrowed: IBorrowed
}

