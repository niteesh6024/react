import axios from "axios";
import { useAuth } from "../security/AuthContext";

import { apiClient } from "./ApiClient";
// export default function retriveHelloWorldApi(){
//     return axios.get('http://localhost:8080/hello-world')
// }

// export  const retriveHelloWorldPath = ()=>axios.get('http://localhost:8080/say-hello')




export  const retriveHelloWorldPath 
                            = (token)=>apiClient.get(`/say-hello`,
                                // {
                                //     headers: {
                                //             Authorization: token
                                //     }
                                // }
                                )

export  const executeBasicAuthentication 
                                = (token)=>apiClient.get(`/basicauth`,
                                    {
                                        headers: {
                                                Authorization: token
                                        }
                                    }
                                    )
    