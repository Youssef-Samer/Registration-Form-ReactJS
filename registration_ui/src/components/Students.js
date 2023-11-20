import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Student";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import StudentsForm from "./StudentsForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme =>({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper :{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Students = ({classes, ...props}) => {
    const [currentId, setCurrentId]= useState(0)

    useEffect(() => {
        props.fetchAllStudents()

    }, [])

const {addToast} = useToasts()

const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?'))
    {   debugger;
        props.deleteStudent(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
        debugger;
    }
}

    return (
<Paper className={classes.paper} elevation={3}>
    <Grid container>

        <Grid item xs={6}>

            <StudentsForm {...({currentId,setCurrentId})}/>

        </Grid>

        <Grid item xs={6}>
            <TableContainer>
                <table>
                    <TableHead className={classes.root}>
                        <TableRow>
                            <TableCell> Name </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.StudentList.map((record, index) => {
                                return (<TableRow key={index} hover>
                                    <TableCell>{record.name}</TableCell>
                                    <TableCell>{record.email}</TableCell>
                                    <TableCell>
                                    <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                    </ButtonGroup>
                                    </TableCell>
                                </TableRow>)
                            })
                        }


                    </TableBody>
                </table>

            </TableContainer>

        </Grid>

    </Grid>
</Paper>
    );
}

const mapStateToProps = state =>{
    return {
        StudentList:state.Student.list
    }
}

const mapActionToProps = {
    fetchAllStudents : actions.fetchAll,
    deleteStudent: actions.Delete

}

export default connect(mapStateToProps,mapActionToProps)( withStyles(styles) (Students));