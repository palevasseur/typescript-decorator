# TypeScript Decorator
## Interceptor
Intercept and control a class method
- interceptor.stop() : method is no more called
- interceptor.resume() : method is called again
- interceptor.inject(args) : call the method (using same args)

```javascript
class App {
  interceptorDisplay = new Interceptor(this.display);

  @interceptor('interceptorDisplay', function(mess) {
    // all display() called are intercepted here
  })
  private display(mess) {
    ...
  }
}
```

> Example: https://stackblitz.com/edit/typescript-9y75zl?embed=1&file=index.ts
