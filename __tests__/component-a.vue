<template>
  <div class="name" v-text="name"></div>
</template>

<script>
module.exports = {
  data() {
    return {
      name: "fuke"
    }
  },
  methods: {
    m: () => {
        return 1 + x;
    }
  }
}
</script>

<style>
div {
  font-size: 10px;
}
</style>
