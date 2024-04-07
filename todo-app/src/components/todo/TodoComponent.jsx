import { useNavigate, useParams } from 'react-router-dom'
import { createTodoApi, retriveTodoApi, updateTodoApi } from './api/TodoApiSerivce'
import { useAuth } from './security/AuthContext'
import { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {moment} from 'moment'
export default function TodoComponent(){
    const authcontext=useAuth()
    const navigate=useNavigate()
    const username=authcontext.username
    const {id}=useParams()
    const [description,setDescription]=useState('')
    const [targetDate,setTargetDate]=useState()
    useEffect(
        () => retriveTodos(),[id]
    )

    function retriveTodos(){
        if(id!=-1){
        retriveTodoApi(username,id)
        .then((response => {setDescription(response.data.description)
                            setTargetDate(response.data.targetDate)}))
        }
    }
    function onSubmit(values){

        if(id==-1){
            const todo={
                username,description:values.description,targetDate:values.targetDate, done:false
            }
            console.log(todo)
            createTodoApi(username,todo)
            .then((response => navigate('/todos')))
            
        }
       else{
        const todo={
            id,username,description:values.description,targetDate:values.targetDate, done:false
        }
         updateTodoApi(username,id,todo)
        .then((response => navigate('/todos')))
        console.log(todo)
       }

    }
    function validate(values){
        let errors={};
        if(values.description.length<5){
            errors.description ="enter the valid description"
        }
        if(values.targetDate==''){
            errors.targetDate ="enter the valid date"
        }
        console.log(values)
        return errors
    }
    return(
        <div className="container">
            <Formik initialValues={{description,targetDate}}
                enableReinitialize="truef"
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name='description'
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name='targetDate'
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label >Description</label>
                                <Field className="form-control" type="test" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label >Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}