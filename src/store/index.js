import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  drawer: false,
  software: false,
  changeDrawer: false,
  changeSoftware: false,
  softwareItem: {},
  articleItem: {},
};

const mutations = {
  changeDrawer: (state, params) => {
    state.drawer = params.drawer || false;
    state.software = params.software || false;
    state.changeDrawer = params.changeDrawer || false;
    state.changeSoftware = params.changeSoftware || false;
  },
  getDrawerItem: (state, params) => {
    state.softwareItem = params.softwareItem || "";
    state.articleItem = params.articleItem || "";
  },
};

const actions = {
  changeDrawer: ({ commit }) => {
    commit("changeDrawer");
  },
  getDrawerItem: ({ commit }) => {
    commit("getDrawerItem");
  },
};

export default new Vuex.Store({ state, mutations, actions });
