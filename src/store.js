import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
    state: {
        signedIn: true,
        apiUrl: 'https://patients-directory.herokuapp.com/',
        patients: []
    },
    actions: {
        async getAll({state, commit}) {
            return axios.get(state.apiUrl + 'getAll')
            .then( res => {
                console.log(res)
                commit('updateAll', res.data);
                //commit('setSelection');
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
        },
        async addPatient({state}, payload) {
            return axios.post(state.apiUrl + 'add', payload)
            .then( res => {
                console.log(res);   
            })
            .catch( err => {
                console.log(err);
            })
        },
    },
    getters: {
        patientsData(state) {
            return state.patients;
        }
    },
    mutations: {
        updateAll(state, data) {
            state.patients = data;
        }

    }
})