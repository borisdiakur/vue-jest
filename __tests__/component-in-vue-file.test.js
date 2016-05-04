jest.unmock("./component-a.vue");

const Vue = require("vue");
const ComponentA = require("./component-a.vue");

Vue.config.debug = true;
Vue.config.async = false;

console.log(ComponentA);

describe("vue component in .vue file", () => {

  it("should work", () => {
    const vm = new Vue({
      template: '<div><comp></comp></div>',
      components: {
        comp: ComponentA
      }
    }).$mount();

    expect(vm.$el.querySelector(".name").textContent).toBe("fuke");
  });

});
