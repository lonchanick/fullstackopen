import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data)

const push = (obj) =>{ 
    return axios.post(baseUrl,obj)
    .then(response => response.data);
}

const remove = (id) =>{ 
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(err => {
        return alert(`obj does not exist! ${err.data}`)
    })
}

const update = (id, obj) => axios.put(`${baseUrl}/${id}`, obj);

export default {getAll, push, remove, update}