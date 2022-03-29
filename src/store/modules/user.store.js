export const state = {
    data: null
};

export const mutations = {
    setData: (state, payload) => state.data = payload
};

export const actions = {};

export const  getters = {
    data: s => s.data,
    isLogin: s => Boolean(s.data?.token)
}
