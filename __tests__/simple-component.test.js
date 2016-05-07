jest.unmock("./simple-component.vue");

const Vue = require("vue");
const VueTestUtils = require("vue-test-utils");
const SimpleComponent = require("./simple-component.vue");

Vue.use(VueTestUtils.install);

Vue.config.debug = true;
Vue.config.async = false;

describe("vue component in .vue file", () => {

  it("should work", () => {
    const vm = new Vue({
      template: '<div><simple-component></simple-component></div>',
      components: {
        SimpleComponent
      }
    }).$mount();

    expect(vm.$(".name").textContent).toBe("Hello, vue-jest.");
  });

});
