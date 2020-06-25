# Custom-exception
Custom exception's mechanism and methods for working with it

# Problem

We need to handle other type of exception. Unfortunately by default we don't have a good way to do it.
<br/>


# Examples
Just see a code

**Module for persistent store, "./persistent-store.ts"**
```
const DidNotHaveAFieldException = createException<string>()
const NotEnoughtMemory = createException()

const saveToStore = (data: SomethingDataInterface) => {
  const necessaryFields = ['field1', 'field2']
  for (const field of necessaryFields) {
    if (!data[field])
      throw DidNotHaveAFieldException.new(field)
  }

  if (!Storage.haveFreeMemoryFor(data))
      throw NotEnoughtMemory.new()

  ....

   return something
}
```

**Module fo render data, "./render.ts"**

```
const UnknownRenderError = createException<number>()

const render = (): Promise<any> => {
  try {
    return RenderEngine.render()
  } catch (e) {
    throw UnknownRenderError(e.renderErrorStatus)
  }
}
```

**Main module, ""./index.ts**

```
import {render} from './render.ts'
import {saveToStore} from './persistent-store.ts'

const makeUpdate = async (update: Update) => {
  try {
    await saveToStore(update)
      .render()
  } catch (e) {
    declarativeHandle(e, {
      [UnknownRenderError.type]: () => console.log("Try to rerender one time yet"),
      [DidNotHaveAFieldException.type]: (field) => console.log("Data deosn't have the field ", field),
      [NotEnoughtMemory.type]: () => console.log("Persistent store doesn't have a enought memory for you data, please take out something"),
      default: (e) => console.log('Please report us for this error, ', e)
    });
  }
}
```