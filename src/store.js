import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
    state: {
        signedIn: true,
        apiUrl: 'https://patients-directory.herokuapp.com/',
        allPatients: [],
        searchedPatients: [],
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
        }
    },
    mutations: {
        searchPatients(state, searchTerm) {
            console.log('hh');
            const re = new RegExp(searchTerm, 'i')
            //console.log(re.test('vijay'))
            state.searchedPatients = state.allPatients.filter((record) => {
                console.log(record.name, re.test('Vijay testname'), searchTerm);
                return record.name.match(re);
                //if (re.test(record.name)) return true;
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