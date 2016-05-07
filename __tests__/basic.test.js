const Vue = require("vue");
const VueTestUtils = require("vue-test-utils");

Vue.config.debug = true;
Vue.config.async = false;

Vue.use(VueTestUtils.install);

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

  
  it('should work with bidirection-binding', () => {
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
    vm.$fire('input', 'input');
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

    vm.$fire('button', 'click');
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

  xit('does not work with interpolations', () => {
    document.body.innerHTML =
      `<div id="app">
        <span>Message: {{ message }}</span>
      </div>`;
    const vm = new Vue({
      el: '#app',
      data: {
        message: 'interpolations'
      }
    });
    expect(vm.$('span').textContent).toBe('Message: interpolations');
  });

  it('should work with v-bind shorthand', () => {
    document.body.innerHTML =
      `<div id="app">
        <a :href="url"></a>
      </div>`;
    const vm = new Vue({
      el: '#app',
      data: {
        url: '/home'
      }
    });
    expect(vm.$('a').href).toBe('/home');
  });
  
  it('should work with event shorthand', () => {
    document.body.innerHTML =
      `<div id="app">
        <p v-text="message"></p>
        <button @click="reverseMessage">Reverse Message</button>
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

    vm.$fire('button', 'click');
    expect(vm.$('p').textContent).toBe('54321');
  });

  it('should work with computed properties', () => {
    document.body.innerHTML =
      `<div id="app">
        <span v-text="computedText"></span>
      </div>`;
    const vm = new Vue({
      el: '#app',
      data: {
        text: 'home'
      },
      computed: {
        computedText: function () {
          return this.text + '-modified' 
        }
      }
    });
    expect(vm.$('span').textContent).toBe('home-modified');
  });

  it('should work with class & style bindings', () => {
    document.body.innerHTML =
      `<div id="app">
        <div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
        <div class="style" :style="{ width: 10 + 'px' }"></div>
      </div>`;
    const vm = new Vue({
      el: '#app',
      data: {
        isA: true,
        isB: false
      }
    });
    expect(vm.$('.static').classList.contains('class-a')).toBe(true);
    expect(vm.$('.style').style.width).toBe('10px');
  });
  
});
