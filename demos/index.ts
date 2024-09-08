// import './examples/success-flow'
// import './examples/error-flow'
// import './examples/force-fail-flow'


import { NotifyShippingCompanyAction } from './actions/NotifyShippingCompanyAction'


// const result = await NotifyShippingCompanyAction.run<typeof NotifyShippingCompanyAction>({
 
// })




// result.




// Define a generic type parameter for the class
class BaseClass<T = any> {
  // Constructor that takes a value of type T
  constructor(public value: T) {}


  // Static method with a generic type parameter U that extends BaseClass<T>
  // The method takes a value of type T and creates an instance of U
  // static createInstance<U extends BaseClass<V>, V>(this: new (value: V) => U, value: ConstructorParameters<typeof this>['0']): U {
  //     // Create a new instance of the class that calls this method
  //     return new this(value);
  // }
  // static createInstance(this: new (value: any) => any, value: ConstructorParameters<typeof this>) {
  //   return new this(value);
  // }


  static createInstance<C extends new (...args: any) => any>(param: ConstructorParameters<C>[0]): InstanceType<C> {
    return new this(param) as InstanceType<C>
  }
}


// Subclass that specifies the generic type as string
class ChildClass extends BaseClass<number> {
  // Optionally, you can add more properties or methods here
}


// Subclass that specifies the generic type as number
class AnotherChildClass extends BaseClass<number> {
  // Optionally, you can add more properties or methods here
}


// Call the static method from the child classes, passing the required value
const stringInstance = ChildClass.createInstance<typeof ChildClass>(11);
console.log(stringInstance.value); // Outputs: "Hello, World!"


const numberInstance = AnotherChildClass.createInstance(42);
console.log(numberInstance.value); // Outputs: 42
