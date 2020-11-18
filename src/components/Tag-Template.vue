<template>
  <div>
    <button
      class="card-base"
      :class="{ 'card-active': isActive }"
      @click="isActive = !isActive"
    >
      {{ tagName }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Tag-Template",
  data: () => ({
    isActive: false
  }),
  props: {
    tagName: {
      type: String
    },
    tagId: {
      type: Number
    },
    tagStatus: {
      type: Boolean
    }
  },
  watch: {
    isActive() {
      this.$emit("isActive", [this.tagId, this.isActive]);
    },
    tagStatus() {
      this.isActive = this.tagStatus;
    }
  }
};
</script>

<style scoped>
.card-base {
  border: 0;
  padding: 0.375rem 1.5rem;
  margin: 0.3rem;
  filter: drop-shadow(0px 2px 6px rgba(20, 19, 19, 0.25));
  background: #ffffff;
  border-radius: 4px;
  font-family: Roboto, Arial, sans-serif;
}
.card-active {
  background: #3ffcae;
}
button:active,
button:focus {
  outline: none;
}
</style>
