# Custom-exception
Custom exception's mechanism and methods for working with it

# Problem

We need to handle other type of exception. Unfortunately by default we don't have a good way to do it.
<br/>


# Examples
Just see a code

**Module for persistent store**
```
const DidNotHaveAFieldException = createException<string>()
const NotEnoughtMemory = createException()

const saveToStore = (data: SomethingDataInterface) => {
  const necessaryFields = ['field1', 'field2']
  for (const field of necessaryFields) {
    if (!data[field])
      throw DidHaveAFieldException.new(field)
  }

  if (!Storage.haveFreeMemoryFor(data))
      throw NotEnoughtMemory.new()

  ....
}
```


```
declarativeHandleError(customE, {
       [itDoesntWork.type]: () => console.log("it doesnt work"),
       [itDoesntExist.type]: () => console.log("it doesnt exist"),
       default: () => console.log('default')
   });
```

```
const itDoesntExist = createError();
const itDoesntWork = createError();

const anotherError = createError('strange behaviour')

const realError = new Error()

const customE = itDoesntExist.new() || itDoesntWork.new("hello");
```
