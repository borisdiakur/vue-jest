const Vue = require("vue");

Vue.config.debug = true;
Vue.config.async = false;

Vue.use(function (Vue, options) {
  Vue.prototype.$ = function (selector) {
    return this.$el.querySelector(selector);
  };

  Vue.prototype.$$ = function (selector) {
    return this.$el.querySelectorAll(selector);
  };

  Vue.prototype.fire = function (selector, event, options) {
    options = options || {};
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    evt = Object.assign(evt, options);
    this.$(selector).dispatchEvent(evt);
  }
});

describe("bind vue with el property", () => {

  it("should work with the hello world example", () => {
    document.body.innerHTML = '<div id="app" v-text="message"></div>';
    const vm = new Vue({
      el: "#app",
      data: {
        message: "Hello, Vue.js"
      }
    });

    expect(vm.$el.textContent).toBe("Hello, Vue.js");
  });

  
  it('should work with bi-binding', () => {
    document.body.innerHTML =
    `<div id="app">
      <p v-text="message"></p>
      <input v-model="message">
    </div>`;
    
    const vm = new Vue({
      el: '#app',
      data: {
        message: 'Hello, Vue.js'
      }
    });
    let text = "New Text";
    vm.$('input').value = text;
    vm.fire('input', 'input');
    expect(vm.$('p').textContent).toBe(text);
  });
  
  it('should render the list', () => {
    document.body.innerHTML =
      `<div id="app">
        <ul>
          <li v-for="todo in todos" v-text="todo.text"></li>
        </ul>
      </div>`;

    const vm = new Vue({
      el: '#app',
      data: {
        todos: [
          { text: 'Learn JavaScript' },
          { text: 'Learn Vue.js' },
          { text: 'Build Something Awesome' }
        ]
      } 
    });
    expect(vm.$$('li').length).toBe(3);
  });

  it('should work with event', () => {
    document.body.innerHTML =
      `<div id="app">
        <p v-text="message"></p>
        <button v-on:click="reverseMessage">Reverse Message</button>
      </div>`;
    const vm = new Vue({
      el: '#app',
      data: {
        message: '12345'
      },
      methods: {
        reverseMessage: function () {
          this.message = this.message.split('').reverse().join('')
        }
      }
    });

    vm.fire('button', 'click');
    expect(vm.$('p').textContent).toBe('54321');
  });

  it('should hide element with v-if', () => {
    document.body.innerHTML = '<div id="app"><p v-if="show"></p></div>'
    const vm = new Vue({
      el: "#app",
      data: {
        show: false
      } 
    });
    expect(vm.$('p')).toBeNull();
  });
      
});
