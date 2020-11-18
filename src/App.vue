<template>
  <div id="app">
    <header-title></header-title>
    <div class="l-m-2"></div>
    <tags-panel @isActive="isActive()"></tags-panel>
    <div class="cards-block" v-if="isBooksList">
      <card-book
        v-for="(item, id) of showBooks"
        :key="id"
        :dataBook="item"
      ></card-book>
    </div>
    <h3 class="cards-info" v-if="!showBooks.length">
      Пожалуйста, выберите категорию
    </h3>
    <button v-if="isNeedLoad" class="button-setting" @click="loadMore">
      Загрузить еще
    </button>
  </div>
</template>

<script>
import HeaderTitle from "./components/Header-App";
import TagsPanel from "./components/Tags-Panel";
import CardBook from "./components/Card-Book";

export default {
  name: "App",
  data: () => ({
    isBooksList: null,
    isNeedLoad: false,
    booksListForShow: []
  }),
  components: {
    HeaderTitle,
    TagsPanel,
    CardBook
  },
  methods: {
    isActive() {
      this.booksListForShow = [];
    },
    loadMore() {
      let page = 1;
      if (this.$store.state.booksListFromServer.next) {
        page = this.$store.state.booksListFromServer.page + 1;
        this.$store.dispatch("getAsyncBooksList", page).then(() => {
          if (!this.$store.state.booksListFromServer.next) {
            this.isNeedLoad = false;
          }
        });
      }
    }
  },
  computed: {
    getBooksList() {
      return this.$store.getters.getBookLists;
    },
    showBooks() {
      return this.booksListForShow;
    },
    tagChangeFlagIsNew() {
      return this.$store.state.tagChangeFlag;
    }
  },
  watch: {
    showBooks: {
      deep: true,
      handler() {
        this.isNeedLoad =
          this.booksListForShow.length > 0 &&
          this.$store.state.booksListFromServer.next;
      }
    },
    tagChangeFlagIsNew: {
      deep: true,
      handler() {
        if (!this.$store.state.tagChangeFlag) {
          this.booksListForShow = [];
        }
      }
    },
    getBooksList: {
      deep: true,
      handler() {
        let newBooksListForShow = this.booksListForShow;
        this.booksListForShow = newBooksListForShow.concat(
          this.$store.getters.getBookLists.list
        );
        this.isBooksList = true;
      }
    }
  },
  created() {
    this.$store.dispatch("loadDataFromServer");
  }
};
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  max-width: 1440px;
  margin: 1rem auto 0;
}

.button-setting {
  width: 13rem;
  height: 2rem;
  background: #2cb17a;
  border-radius: 4px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  letter-spacing: 0.085em;
  text-transform: uppercase;
  color: #201614;
  display: block;
  margin: 2rem auto;
  outline: none;
  border: 1px;
}

.button-setting:hover {
  background: #1c704d;
}
.button-setting:active {
  background: #3ffcae;
}
.l-m-2 {
  margin: 2rem 0;
}
.cards-block {
  display: flex;
  flex-direction: column;
}
.cards-info {
  font-family: Roboto, Arial, sans-serif;
  font-size: 2rem;
  letter-spacing: 0.1em;
  text-align: center;
  margin: 2rem;
  color: #7fbcf1;
}
</style>
