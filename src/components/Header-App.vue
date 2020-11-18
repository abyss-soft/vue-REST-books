<template>
  <div class="app-header">
    <header-title></header-title>
  </div>
</template>

<script>
import HeaderTitle from "./Header-Title";
export default {
  name: "Header",
  components: { HeaderTitle }
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #631405;
}
</style>
