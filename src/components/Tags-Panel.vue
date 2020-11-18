<template>
  <div class="l-tags-panel">
    <div v-for="item of getListTags" :key="item.id">
      <tag-template
        v-if="listTags"
        :tagName="item.value.name"
        :tagId="item.value.id"
        :tagStatus="item.active"
        @isActive="isActive($event)"
      ></tag-template>
    </div>
  </div>
</template>

<script>
import TagTemplate from "./Tag-Template";
export default {
  name: "Tags-panel",
  components: {
    TagTemplate
  },
  data: () => ({
    listTags: null
  }),
  computed: {
    getListTags() {
      return this.$store.getters.getBooksCategories;
    }
  },
  methods: {
    isActive(event) {
      this.$store.dispatch("setTagChangeFlag", event);
      this.$store.dispatch("setAsyncTagsBookForFind", event);
      this.$store.dispatch("getAsyncBooksList", 1);
      this.$emit("isActive", true);
    }
  },
  watch: {
    getListTags: {
      deep: true,
      handler() {
        this.listTags = true;
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.l-tags-panel {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
