export function interceptor(interceptorName: string, cb: (interceptedInstance, interceptedArgs) => any) {
  return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const descriptorMethod = descriptor.value; // save a reference to the original method
    descriptor.value = function (...args: any[]) {
      if(this instanceof Interceptor == false) { // Interceptor.inject => don't call the cb
        cb.apply(this, args);
      }

      if(this[interceptorName] && this[interceptorName].intercept) {
        return;
      }

      return descriptorMethod.apply(this, args); // run and return the result of the original method
    };

    return descriptor;
  }
}

export class Interceptor {
  private intercept = false;
  constructor(private intecteptedMethod: Function) {}
  stop() { this.intercept = true;}
  resume() { this.intercept = false; }
  inject(...args) { this.intecteptedMethod(...args); }
}
