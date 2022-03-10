import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
    state: {
        signedIn: true,
        apiUrl: 'https://patients-directory.herokuapp.com/',
        allPatients: [],
        patients: [],
        pagination: {
            show: false,
            total: '',
            lRange: '',
            hRange: ''
        }
    },
    actions: {
        async getAll({state, commit}) {
            return axios.get(state.apiUrl + 'getAll')
            .then( res => {
                console.log(res)
                commit('updateAll', res.data);
                if (res.data.length > 15) {
                    commit('updateCurrent', res.data.slice(0, 15));
                    commit('updatePaginationInitial', {total: res.data.length});
                }
                else {
                    commit('updateCurrent', res.data); 
                }
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
        async setPagination({state, commit}, payload) {
            commit('updatePagination', {lRange: payload.lRange, hRange: payload.hRange});
        }
    },
    getters: {
        patientsData(state) {
            return state.patients;
        }
    },
    mutations: {
        updateAll(state, data) {
            state.allPatients = data;
        },
        updateCurrent(state, data) {
            state.patients = data;
        },
        updatePaginationInitial(state, data) {
            state.pagination.show = true;
            state.pagination.total = data.total;
            state.pagination.lRange = 0;
            state.pagination.hRange = 15;
        },
        updatePagination(state, data) {
            state.pagination.lRange = data.lRange;
            state.pagination.hRange = data.hRange;
            const li = state.allPatients.slice(data.lRange, data.hRange)
            state.patients = li;
        }

    }
})