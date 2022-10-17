import IDevices from "../types/deviceType";
import moment from "moment";

// Interface pro funkce predavane do tohoto zarizeni
interface IFunctions {
    borrowDevice: (id: string) => void;
    returnDevice: (id: string) => void;
}

export default function Device(props: { device: IDevices, isBorrowedByThisUser: boolean, func: IFunctions } ) {

    return (
        <div className="col-md-3" key={props.device.id}>
            <div className="device card">
                <div className="center">

                
                    {props.device.image != null ?
                        <img src={props.device.image} className="device-image"></img> :
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" className="device-image"></img>
                    }
                    
                </div>

                {props.device.borrowed && 
                        <div className="image-text">Vypůjčeno: {props.device.borrowed.user.name}, { moment(new Date(props.device.borrowed.date)).format("DD.MM.yyyy HH:mm")}</div>
                    
                    }
                <div className="device-model margin-left-15">
                    {props.device.model}
                </div>
                <div className="device-vendor margin-left-15">
                    {props.device.vendor}
                </div>
                <div className="margin-left-15">
                    {props.device.os} / {props.device.osVersion}
                </div>
                <div className="d-grid gap-2 mt-3 ">
                    {props.device.borrowed == undefined ?
                        <button type="submit" className="btn btn-primary" onClick={() => props.func.borrowDevice(props.device.id)}>Půjčit</button> :

                        props.isBorrowedByThisUser ? 
                        <button type="submit" className="btn btn-primary" onClick={() => props.func.returnDevice(props.device.id)}>Vrátit</button>:
                        <button type="submit" className="btn btn-primary" disabled>Půjčit</button>
                    }
                </div>
            </div>
        </div>
    );
}