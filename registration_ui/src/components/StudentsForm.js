import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import UseForm from "./UseForm";
import * as actions from "../actions/Student";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name : '',
    email : '',
    phone : '',
    age : ''
}
const StudentsForm = ({classes, ...props}) => {
    const [Values,SetValues] =useState(initialFieldValues)

    const navigate = useNavigate();  
    const handleOpenFormPage = () => {
        navigate('/student-form');
      };




    const {addToast} = useToasts()

    const validate = (fieldValues = values)=>{
        let temp ={...errors}
        if('name'in fieldValues)
            temp.name = fieldValues.name != ""?"":"Name field is required"
        if('phone'in fieldValues)
            temp.phone = fieldValues.phone != ""?"":"Phone field is required"
        if('age'in fieldValues)
        {
            if(!fieldValues.age)
            {temp.age = "Age is required"}
            else if(!(/^[1-9][0-9]?$|^100$/).test(fieldValues.age))
            {temp.age = "Age is not valid"}
            else
            {temp.age = ""}
        }
        if('email'in fieldValues)
        {
            if(!fieldValues.email)
            {temp.email = "Email is required"}
            else if(!(/^$|.+@.+..+/).test(fieldValues.email))
            {temp.email = "Email is not valid"}
            else
            {temp.email = ""}
        }
        setErrors({

        ...temp
        
        })

        if(fieldValues == values)
            return Object.values(temp).every(x=> x== "")
    }
    const  {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    } = UseForm(initialFieldValues,validate,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {resetForm()
            addToast("Submitted Successfully",{appearance : 'success'})
        }
            if(props.currentId==0)
            props.createStudent(values,onSuccess)
            else
            props.updateStudent(props.currentId,values,onSuccess)

        }

        
    }

    useEffect(()=>{
        if(props.currentId!=0){
        setValues({
            ...props.StudentList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }
    },[props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField name="name"
                    variant="outlined"
                    label="Full Name"
                    value = {values.name}
                    onChange={handleInputChange}
                    {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField name="email"
                    variant="outlined"
                    label="Email"
                    value = {values.email}
                    onChange={handleInputChange}
                    {...(errors.email && { error: true, helperText: errors.email })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="phone"
                    variant="outlined"
                    label="Phone"
                    value = {values.phone}
                    onChange={handleInputChange}
                    {...(errors.phone && { error: true, helperText: errors.phone })}
                    />
                   <TextField name="age"
                    variant="outlined"
                    label="Age"
                    value = {values.age}
                    onChange={handleInputChange}
                    {...(errors.age && { error: true, helperText: errors.age })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>

                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={handleOpenFormPage}
                        >
                            Open Details Page
                        </Button>

                    </div>
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>

        </form>

    );
}

const mapStateToProps = state =>{
    return {
        StudentList:state.Student.list
    }
}

const mapActionToProps = {
    createStudent : actions.create,
    updateStudent : actions.update

}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(StudentsForm));