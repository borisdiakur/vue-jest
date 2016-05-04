const Vue = require("vue");

Vue.config.debug = true;
Vue.config.async = false;

describe("use vue directly in js", () => {

  it("should work", () => {
    const vm = new Vue({
      template: '<div v-text="name"></div>',
      data: {
        name: "fuke"
      }
    }).$mount();

    expect(vm.$el.textContent).toBe("fuke");
  });

  xit("not work with mustache marker", () => {
    const vm = new Vue({
      template: `<div>{{ name }}</div>`,
      data: {
        name: "fuke"
      }
    }).$mount();

    expect(vm.$el.textContent).toBe("fuke");
  });

});
