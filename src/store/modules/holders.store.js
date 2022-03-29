import axios from 'axios';

const baseUrl = 'http://localhost:3500/api';

export const state = {
    holders: []
};

export const getters = {
    holders: (s) => s.holders,
};
export const mutations = {
    setHolders: (state, payload) => state.holders = payload,
};
export const actions = {
    async getHolders({ rootGetters }, {page, body}) {
        try {
            console.log(rootGetters);
            axios.defaults.headers.common.Authorization = 'Bearer: ' + rootGetters['User/data']?.token;
            const { data } = await axios.post(`${baseUrl}/holders/?page=${page}`, body);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
};
