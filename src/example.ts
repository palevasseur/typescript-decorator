import {Interceptor, interceptor} from './interceptor';

const appDiv: HTMLElement = document.getElementById('app');

class App {
  // define an interceptor to control the display() method
  // - stop() => display() method is not called
  // - resume() => display() method is called
  // - inject(mess) => call display() method (using same args)
  displayInterceptor = new Interceptor(this.display);

  sendMessage(mess) {
    this.display(mess);
  }

  @interceptor('displayInterceptor', function(mess) {
    // all display() called are intercepted here
    appDiv.innerHTML += `=> ${this.constructor.name}.display("${mess}") called, intercept=${this.displayInterceptor.intercept}`;
  })
  private display(mess) {
    appDiv.innerHTML += `<div>App message = "${mess}"</div>`;
  }
}

const app = new App();
app.sendMessage('send message 1');
// => App.display("send message 1") called, intercept=false
// App message = "send message 1"
app.displayInterceptor.stop();
app.sendMessage('send message 2');
// => App.display("send message 2") called, intercept=true
app.displayInterceptor.inject('inject message 3');
// App message = "inject message 3"
app.displayInterceptor.resume();
app.sendMessage('send message 4');
// => App.display("send message 4") called, intercept=false
// App message = "send message 4"
app.displayInterceptor.inject('inject message 5');
// App message = "inject message 5"
