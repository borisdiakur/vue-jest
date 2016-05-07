<template>
  <div class="name" v-text="name"></div>
</template>

<script>
module.exports = {
  data() {
    return {
      name: "Hello, vue-jest."
    }
  }
}
</script>

<style>
div {
  font-size: 10px;
}
</style>
