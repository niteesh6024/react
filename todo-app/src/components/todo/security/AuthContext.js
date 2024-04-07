import { createContext, useContext, useState } from "react";
import { executeBasicAuthentication } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";
export const AuthContext = createContext()
export const useAuth =() => useContext(AuthContext)
export default function AuthProvider({children}){
    const [isAuthenticated,setAuthenticated]=useState(false)
    const [username,setusername]=useState(null)
    const [token,setToken]=useState(null)
    // const valueToBeShared= {number,isAuthenticated, setAuthenticated}
    // function login(username, password){
    //     if(username==="niteesh" && password==="niteesh"){
    //         setusername(username)
    //         setAuthenticated(true)
    //         return true
    //     }
    //     else{
    //         setAuthenticated(false)
    //         setusername(null)
    //         return false
    //     }
    // }

    async function login(username, password){
        const token = 'Basic ' + window.btoa(username+":"+password)

        try{
            const response=await executeBasicAuthentication(token)  
            if(response.data==="success"){
                setusername(username)
                setAuthenticated(true)
                setToken(token)
                
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = token
                        return config
                    }
                )
                return true
            }
            else{
                logout()
                return false
            }
        }
        catch(Error){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setusername(null)
        setToken(null)
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, login,logout, username, token}}>  
            {children}
        </AuthContext.Provider>
    )
}