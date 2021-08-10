import axios from 'axios'
import router from "../../router";


const requests = { 
    namespaced: true,
    state: {
        transactions: [],
        transaction: null
    },
    mutations: {
        GET_ALL_TRANSACTION: (state, transactions)=>{
            state.transactions = transactions
        },
        MODIFY_SINGLE_TRANSACTION: (state, array)=>{
            state.transaction = array[0]
            router.push(array[1])
        }
    },
    actions: {
        getAllTransaction({ commit }){
            axios.get('/transactions').then(res=>{
                console.log(res.data)
                commit('GET_ALL_TRANSACTION', res.data)
            })
        },

        modifySingleTransaction({commit}, arr){
            commit('MODIFY_SINGLE_TRANSACTION', arr)
            axios.get(`/transactions/${arr[0]}`).then(res=>{
                commit('MODIFY_SINGLE_TRANSACTION', [res.data, arr[1]])
            })
        }
    }
}

export default requests