<template>
  <div class="card">
    <div class="card_left">
      <img class="card__img" :src="dataBook.image" alt="picture" />
      <p>{{ dataBook.year }}</p>
    </div>
    <div class="card_right">
      <h3 class="card__title">{{ dataBook.name }}</h3>
      <h4 class="card__subtitle">{{ dataBook.author }}</h4>
      <p class="card__title-description">Описание книги</p>
      <p class="card__description">{{ dataBook.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card-Book",
  props: {
    dataBook: {
      type: Object
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  background: #ffffff;
  padding: 1rem;
  margin: 1rem;
  min-height: 24.5rem;
  font-family: Roboto, Arial, sans-serif;
}
.card__img {
  width: 12rem;
  height: 15rem;
}
.card_left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card_right {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 4rem;
}
.card__title {
  font-size: 2rem;
  line-height: 150%;
  display: flex;
  align-items: center;
  letter-spacing: 0.06em;
  color: #201614;
  margin: inherit;
  padding: 0.5rem 0;
  border-bottom: 1px solid #631405;
  font-family: inherit;
}
.card__subtitle {
  font-size: 1.5rem;
  line-height: 150%;
  display: flex;
  align-items: center;
  letter-spacing: 0.06em;
  color: #1c704d;
  margin: 0.5rem 0;
  font-family: inherit;
}
.card__title-description {
  font-size: 1rem;
  line-height: 150%;
  letter-spacing: 0.06em;
  color: #7e817f;
  font-family: inherit;
  margin: 1rem 0 0.3rem;
}
.card__description {
  font-size: 1rem;
  line-height: 150%;
  letter-spacing: 0.06em;
  color: #201614;
  font-family: inherit;
  margin: 0 0 1rem;
}
</style>
