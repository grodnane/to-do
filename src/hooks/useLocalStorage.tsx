import { useEffect, useState } from "react";
// La T(generar el tipo) en el tipo sirve para inferir el tipo de dato sin saber cual es. Te da ventajas sobre el 'any' ya que podes obtener el tipo de dato

type ReturnType<T> = [
    T,
    React.Dispatch<React.SetStateAction<T>>
]

export const useLocalStorage = <T, >(key:string, initialValue?:T): ReturnType<T> =>{
    const [state, setState] = useState<T>(
        ()=>{
            if(! initialValue) return;
            try{
                const value = localStorage.getItem(key);
                return value? JSON.parse(value): initialValue;


            }
            catch(err){
                return initialValue
            }
        }
    );

    useEffect(()=>{
        if(state){
            try {
                localStorage.setItem(key, JSON.stringify(state));
            } catch (error) {
                console.log(error)
            }
        }
    },[state, key])

    return [state, setState];
}