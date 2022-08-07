import { useState, useEffect , useRef} from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

{/* onAuthStateChanges --> if we go loggIn from notLogIn it fire off */}

export const useAuthStatus=()=>{
    const [loggedIn , setLoggedIn]=useState(false)
    const [checkingStatus, setCheckingStatus]=useState(true)
    const isMounted=useRef(true) 
    {/* useRef to remove memory leak warning*/}
    useEffect(()=>{
        if(isMounted){
            const auth=getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
        }
        return ()=>{
            isMounted.current=false;
        }
    },[isMounted])

    return {loggedIn, checkingStatus}
}