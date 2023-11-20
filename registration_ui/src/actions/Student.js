import API from "./API";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL',
}

const formatData = data =>({
    ...data,
    age:parseInt(data.age?data.age:0)
}) 

export const fetchAll = () => dispatch => {
    API.Student().fetchAll().then(response => {
        console.log(response)
        dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data

        })
    })
    .catch(err => console.log(err))
 dispatch({
    type: ACTION_TYPES.FETCH_ALL,
    payload: []

 })

}


export const create = (data, onSuccess) => dispatch =>{
data = formatData(data)
API.Student().create(data)
.then(res =>{
    dispatch({
        type:ACTION_TYPES.CREATE,
        payload: res.data
    })
    onSuccess()
})
.catch(err => console.log(err))
}

export const update = (id,data, onSuccess) => dispatch =>{
data = formatData(data)
API.Student().update(id,data)
.then(res =>{
    dispatch({
        type:ACTION_TYPES.UPDATE,
        payload: {id:id,...data}
    })
    onSuccess()
})
.catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch =>{
    debugger;
    API.Student().delete(id)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
    }


    

