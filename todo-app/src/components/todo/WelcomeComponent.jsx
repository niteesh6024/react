import { useParams,Link} from 'react-router-dom'
// import axios from 'axios'
// import { error } from 'jquery'
import { useState } from 'react'
import { retriveHelloWorldPath} from './api/HelloWorldApiService'
import { useAuth } from "./security/AuthContext";

export default function WelcomeComponent(){
    const {username} = useParams()
    const [message,setMessage]=useState(null)
    const authcontext=useAuth();
    function callHelloWorldApi(){
        // axios.get('http://localhost:8080/hello-world')
        // .then((response)=>successMessage(response))
        // .catch((error) => errorMessage(error))
        // .finally(()=>console.log('clean up'))

        // retriveHelloWorldApi()
        // .then((response)=>successMessage(response))
        // .catch((error) => errorMessage(error))
        // .finally(()=>console.log('clean up'))
        console.log()
        retriveHelloWorldPath(authcontext.token)
        .then((response)=>successMessage(response))
        .catch((error) => errorMessage(error))
        .finally(()=>console.log('clean up'))
    }

    function successMessage(response){
        console.log(response)
        setMessage(response.data)
    }

    function errorMessage(response){
        console.log(response)
    }
    return(

        <div className="Welcome">
            <h1>Welcome {username}</h1>
             <div>
                Your Todos. <Link to="/todos">Go Here</Link>
             </div>
             <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldApi}>call hello world</button>
             </div>
             <div className="text-info">
                {message}
             </div>
        </div>
    )
}
