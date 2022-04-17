import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
    state: {
        apiUrl: 'https://patients-directory.herokuapp.com/',
        allPatients: [],
        searchedPatients: [],
        patients: [],
        userData: {},
        signedIn: false,
        pagination: {
            show: false,
            total: '',
            lRange: '',
            hRange: ''
        }
    },
    actions: {
        async login({state, commit}, payload) {
            console.log(payload)
            commit('setUserData', payload);
        },
        async logout ({state, commit}) {
            commit('setLoggedOut');
        },
        async setLoggedIn({state, commit}) {
            commit('setSignInState', true);
        },
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
        async deletePatient({state}, id) {
            console.log(id)
            return axios.delete(state.apiUrl + 'delete?id=' + id)
            .then( res => {
                console.log(res);   
            })
            .catch( err => {
                console.log(err);
            })
        },
        async setPagination({state, commit}, payload) {
            commit('updatePagination', {lRange: payload.lRange, hRange: payload.hRange});
        },
        async triggerSearch({state, commit}, payload) {
            commit('searchPatients', payload);
            console.log(state.searchedPatients);
            if (state.searchedPatients.length > 15) {
                commit('updateCurrent', state.searchedPatients.slice(0, 15));
                commit('updatePaginationInitial', {total: state.searchedPatients.length});
            }
            else {
                commit('updateCurrent', state.searchedPatients); 
                commit('updatePaginationInitial', {total: state.searchedPatients.length});
            }
        },
        async cancelSearch({state, commit}){
            commit('updateAll', state.patients);
            if (state.searchedPatients.length > 15) {
                commit('updateCurrent', state.searchedPatients.slice(0, 15));
                commit('updatePaginationInitial', {total: state.searchedPatients.length});
            }
            else {
                commit('updateCurrent', state.searchedPatients); 
                commit('updatePaginationInitial', {total: state.searchedPatients.length});
            } 
        }
    },
    getters: {
        patientsData(state) {
            return state.patients;
        },
        signedIn(state) {
            return state.signedIn;
        },
        userData(state) {
            return state.userData;
        }
    },
    mutations: {
        setUserData(state, data) {
            state.userData = {email: data.email, id: data.id, fullName: data.fullName};
        },
        setSignInState(state, data) {
            state.signedIn = data;
        },
        setLoggedOut(state) {
            state.signedIn = false;
            state.userData = {id:''};
        },
        searchPatients(state, searchTerm) {
            const re = new RegExp(searchTerm, 'i')
            state.searchedPatients = state.allPatients.filter((record) => {
                return (record?.name?.match(re) || record?.diagnosis?.match(re) || record?.case?.match(re) || record?.phone?.match(re) || record?.clinic?.match(re));
            })
        },
        updateAll(state, data) {
            state.allPatients = data;
            state.searchedPatients = data;
        },
        updateCurrent(state, data) {
            console.log('io', data)
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
            var li2 = state.searchedPatients;
            const li = li2.slice(data.lRange, data.hRange)
            state.patients = li;
        }

    }
})