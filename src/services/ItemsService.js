import axios from 'axios';
import {API_BASE} from "../constants/API";

class ItemsServiceClass {

  getAll () {
    return axios.get(`${API_BASE}/tasks-by-user-id/${localStorage.getItem("userId")}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
  }

  getOne (id) {
    return axios.get(`${API_BASE}/tasks/${id}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
  }

  deleteTaskById(id) {
    return axios.delete(`${API_BASE}/tasks/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  register({username, password, passwordConfirmation, firstName, secondName}){
    const registerForm = {
      login: username,
      password: password,
      confirmPassword: passwordConfirmation,
      firstName,
      lastName: secondName
    };

    return axios.post(`${API_BASE}/register`, registerForm)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  login({username, password}){
    const loginForm = {
      login: username,
      password,
    };
    return axios.post(`${API_BASE}/login`, loginForm)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  createTask({text, date}){
    const task = {
      text,
      userId: localStorage.getItem("userId"),
      date
    };
    return axios.post(`${API_BASE}/create-task`, task)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  updateCheckedOfTask(flag, id){
    const updatedTask = {
      isChecked : flag || false
    };
    return axios.put(`${API_BASE}/tasks-update-checked/${id}`, updatedTask)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  deleteCheckedTasks(){
    return axios.delete(`${API_BASE}/delete-users-done-tasks/${localStorage.getItem("userId")}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  deleteItems(){
    return axios.delete(`${API_BASE}/delete-users-lefts-tasks/${localStorage.getItem("userId")}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  updateItem(item_id, text){
    const updatedTask = {
      text
    };
    return axios.put(`${API_BASE}/tasks/${item_id}`, updatedTask)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  filteredTasks({firstDate, secondDate}){
    const dateBody = {
      firstDate,
      secondDate
    };
    return axios.post(`${API_BASE}/get-tasks-with-filters/${localStorage.getItem("userId")}`, dateBody)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

}

const ItemsService = new ItemsServiceClass();
export default ItemsService;