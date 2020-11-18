import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiLinks: {
      server: "https://webdev.modumlab.com/api",
      categories: "/book/categories",
      booksList: "/book/list"
    },
    booksCategories: [],
    booksListFromServer: {},
    tagsBookForFind: [],
    tagChangeFlag: false
  },
  mutations: {
    setBooksCategoriesList(state, payload) {
      state.booksCategories = [];
      if (payload.data.data.list) {
        payload.data.data.list.forEach(item => {
          state.booksCategories.push({ active: false, value: item });
        });
      }
    },
    setTagsBookForFind(state, payload) {
      let id = payload[0];
      let isStatus = payload[1];
      let newTagsObject = new Set(state.tagsBookForFind);
      if (isStatus) {
        newTagsObject.add(id);
        state.tagChangeFlag = true;
      } else {
        newTagsObject.delete(id);
        state.tagChangeFlag = false;
      }
      state.tagsBookForFind = Array.from(newTagsObject);
    },

    setActiveTags(context, payload) {
      for (let item of Object.values(context.booksCategories)) {
        if (item.value.id === payload[0]) {
          item.active = !!payload[1];
        }
      }
    },

    setBooksList(context, payload) {
      context.booksListFromServer = payload.data.data;
    }
  },
  actions: {
    getAsyncCategoriesList(context) {
      return new Promise((resolve, reject) => {
        let link =
          context.state.apiLinks.server + context.state.apiLinks.categories;
        axios.post(link).then(response => {
          if (response.status === 200) {
            context.commit("setBooksCategoriesList", response);
            resolve(response);
          } else {
            reject();
          }
        });
      });
    },
    getAsyncBooksList(context, payload = 1) {
      if (!context.state.tagsBookForFind.length) {
        return false;
      }
      return new Promise((resolve, reject) => {
        let link =
          context.state.apiLinks.server + context.state.apiLinks.booksList;
        let setCategories = [];

        if (context.state.tagsBookForFind.length !== 0) {
          setCategories = context.state.tagsBookForFind;
        }
        let postBody = {
          categories: setCategories,
          page: payload
        };
        let headerRequest = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios.post(link, postBody, headerRequest).then(response => {
          if (response.status === 200) {
            context.commit("setBooksList", response);
            resolve(response);
          } else {
            reject();
          }
        });
      });
    },
    setAsyncTagsBookForFind(context, payload) {
      context.commit("setActiveTags", payload);
      context.commit("setTagsBookForFind", payload);
    },
    loadDataFromServer(context) {
      context.dispatch("getAsyncCategoriesList").then(() => {});
    },
    setTagChangeFlag(context, payload) {
      context.state.tagChangeFlag = !context.state.tagChangeFlag;
      context.state.tagChangeFlag = !!payload[1];
    }
  },
  getters: {
    getBooksCategories(state) {
      return state.booksCategories;
    },
    getBookLists(state) {
      return state.booksListFromServer;
    },
    getTagsBooksForFind(state) {
      return state.tagsBookForFind;
    }
  }
});
