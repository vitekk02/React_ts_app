import { borrowDevice, getDevices, getDevicesToStorage, returnDevice } from "../services/device";
import IDevices from "../types/deviceType";
import IUser from "../types/userType";
import {useState, useEffect, useRef} from 'react';
import Device from "../Components/Device";



export default function DeviceList(props: {user: IUser}){

    const [devices, setDevices] = useState<Array<IDevices>>();
    const [content, setContent] = useState<Array<JSX.Element>>();

    const [systems, setSystems] = useState<Array<String>>();
    const [vendors, setVendors] = useState<Array<String>>();

    const systemRef = useRef<HTMLSelectElement>(null);
    const vendorRef = useRef<HTMLSelectElement>(null);
    const modelRef = useRef<HTMLInputElement>(null);
    const borrowedRef = useRef<HTMLInputElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    const [allDevices, setAllDevices] = useState<Array<IDevices>>();

    // Po nacteni stranky nastavey zarizeni a moznosti selectu ve filtrovani
    useEffect(() => {

        const data = getDevicesToStorage(props.user.token);
        data.then(result => {
            setDevices(result);
            setSystems(getSystems(result));
            setVendors(getVendors(result));
        })

    }, [])


    function hideLoading(){
        if(loadingRef && loadingRef.current){
            loadingRef.current.classList.add("hidden");
        }
    }

    function showLoading(){
        if(loadingRef && loadingRef.current){
            loadingRef.current.classList.remove("hidden");
        }
    }
    



    // Funkce jejichz odkaz se posila do jednotlivych zarizeni
    const functions = {

        borrowDevice(id: string){
            const response: Promise<number> = borrowDevice(props.user.token, id);
            showLoading();


            response.then(result => {
                if(result == 200){
                    const data = getDevicesToStorage(props.user.token);
                    data.then(result => {
                        setDevices(result);
                    })
                }else{
                    // TODO: error alert
                }
                
            })
            
        },
        
        returnDevice(id: string){
            showLoading();
            const response: Promise<number> = returnDevice(props.user.token, id);

            response.then(result => {
                if(result == 200){
                    const data = getDevicesToStorage(props.user.token);
                    data.then(result => {
                        setDevices(result);
                    })
                }else{
                    // TODO: error alert
                }
                
            })
        }
    }

    // Ziska z pole zarizeni vsechny vyrobce
    function getVendors(devices: Array<IDevices>): Array<String>{
        let vendors: Set<String> = new Set()
        vendors.add("Nezáleží");


        for(let i = 0; i < devices.length; i++){
            if(devices[i].vendor != undefined ){
                vendors.add(devices[i].vendor as String);
            }
        }

        return Array.from(vendors);

    }

    // Ziska z pole zarizeni vsechny systemy
    function getSystems(devices: Array<IDevices>): Array<String>{
        let systems: Set<String> = new Set()
        systems.add("Nezáleží");

        for(let i = 0; i < devices.length; i++){
            if(devices[i].os != undefined ){
                systems.add(devices[i].os as String);
            }
        }

        return Array.from(systems);

    }

    // Slouzi k filtrovani.
    // Volana vzdy pri zmene.
    // Pomoci refu se zjisti hodnoty, podle kterych se filtruje
    function filter(){
        if(allDevices == undefined){
            return;
        }
        // Nakopiruju si seznam vsech zarizeni, z nich pote odebiram ty, co neprojdou filtraci
        var newDevices: Array<IDevices> = [...allDevices]

        for(let i = newDevices.length-1; i >= 0 ; i--){
            
            if(vendorRef && vendorRef.current && vendorRef.current.value != "0"){
                if(newDevices[i].vendor != vendorRef.current.options[vendorRef.current.selectedIndex].innerHTML){
                    newDevices.splice(i, 1);
                }
            }
            if(newDevices[i] == undefined){
                continue;
            }
            if(systemRef && systemRef.current && systemRef.current.value != "0"){
                if(newDevices[i].os != systemRef.current.options[systemRef.current.selectedIndex].innerHTML){
                    newDevices.splice(i, 1);
                }
            }

            if(newDevices[i] == undefined){
                continue;
            }
            if(borrowedRef && borrowedRef.current && borrowedRef.current.checked){
                if(newDevices[i].borrowed != undefined){
                    newDevices.splice(i, 1);
                }
            }
            if(newDevices[i] == undefined){
                continue;
            }
            if(modelRef && modelRef.current && modelRef.current.value){
                if(!newDevices[i].model.includes(modelRef.current.value)){
                    newDevices.splice(i, 1);
                }
            }

        }
        setDevices(newDevices);
    }


    useEffect(() => {

        // Ziskam zarizeni a nastavim si, jaka zarizeni patri na jaky radek.
        if(devices != undefined){
            const rows = [...Array( Math.ceil(devices.length / 4) )];
            const productRows = rows.map( (row, idx) => devices.slice(idx * 4, idx * 4 + 4));
            setContent(productRows.map((row, idx) => (
                <div className="row" key={idx}>    
                  { row.map( product => <Device device={product} isBorrowedByThisUser={product.borrowed?.user.id == props.user.id ? true: false} func={functions}/>)}
                </div> ))
            );
            
            
            if(allDevices == undefined){
                setAllDevices(devices);
            }
            hideLoading();
        }
    }, [devices])

    return ( 
        <>
        <div className='overlay' ref={loadingRef}>
        <div className='loading'></div>
      </div>
        <div className="filter margin-left-15">
            <div className="row">
            <div className="col-2">


            <label>Systém</label><br/>

            </div>
            <div className="col-2">
            <label>Výrobce</label><br/>
            </div>
            </div>
            <div className="row">

                <div className="col-2">

                    {systems &&
                        <select onChange={filter} ref={systemRef}>
                        {systems.map((system, id) => (
                        <option value={id}>{system}</option>
                        ))}
                        </select>
                        }
                </div>
                <div className="col-2">
                    {vendors &&
                        <select onChange={filter} ref={vendorRef}>
                            {vendors.map((vendor, id) => (
                                <option value={id}>{vendor}</option>
                            ))}
                    </select>
                    }
                </div>
                <div className="col-2">
                    <input type="checkbox" className="margin-right-15" onClick={filter} ref={borrowedRef}></input>Jen dostupné
                </div>
                <div className="col-2 ms-auto margin-right-15">
                    <input type="text" placeholder="Hledat model" className="search" onInput={filter} ref={modelRef}></input>
                </div>
            </div>
        </div>
          {content}
        </>
    );

}