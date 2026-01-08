# Expo

_Set of common methods and types for Expo and related packages._

Available on platforms android, ios, tvos, web

## Installation

```bash
$ npx expo install expo
```

## API

```tsx
import * as Expo from 'expo';
```

### `expo/fetch` API

`expo/fetch` provides a [WinterCG-compliant Fetch API](https://fetch.spec.wintercg.org/) that works consistently across web and mobile environments, ensuring a standardized and cross-platform fetch experience within Expo applications.

```ts Streaming fetch
import { fetch } from 'expo/fetch';

const resp = await fetch('https://httpbin.org/drip?numbytes=512&duration=2', {
  headers: { Accept: 'text/event-stream' },
});
const reader = resp.body.getReader();
const chunks = [];
while (true) {
  const { done, value } = await reader.read();
  if (done) {
    break;
  }
  chunks.push(value);
}
const buffer = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
console.log(buffer.length); // 512
```

### Encoding APIs

`TextEncoder` and `TextDecoder` are built-in APIs that provide a way to encode and decode text in various character encodings. They are available on all platforms. Refer to the [browser and server runtime support](https://caniuse.com/textencoder) for web and Node.js.

```ts TextEncoder and TextDecoder
// [104, 101, 108, 108, 111]
const hello = new TextEncoder().encode('hello');

// "hello"
const text = new TextDecoder().decode(hello);
```

The `TextEncoder` API is included in the Hermes engine. See the [source code in TextEncoder.cpp inside the Hermes GitHub repository](https://github.com/facebook/hermes/blob/9e2bbf8eda15936ee00aee4f8e024ceaa7cd800d/lib/VM/JSLib/TextEncoder.cpp#L1).

The `TextDecoder` API is not [spec-compliant](https://encoding.spec.whatwg.org/#textdecoder) on native platforms. Only the UTF-8 encoding is supported. If you need support for more encodings, use a polyfill like [`text-encoding`](https://www.npmjs.com/package/text-encoding).

The stream equivalents of these APIs, `TextEncoderStream` and `TextDecoderStream`, are also available on all platforms. They allow you to encode and decode text in a streaming manner, which is useful for processing large amounts of data without loading it all into memory at once.

```ts TextEncoderStream
const encoder = new TextEncoderStream();
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello');
    controller.enqueue('World');
    controller.close();
  },
});
const reader = stream.pipeThrough(encoder).getReader();
reader.read().then(({ done, value }) => {
  console.log(value); // Uint8Array [72, 101, 108, 108, 111]
});
```

### Streams API

Global support for standard web streams is available on native platforms to match the behavior of web and server platforms. Refer to the [browser and server runtime support](https://caniuse.com/streams) for specific web and Node.js support. EAS Hosting server runtime also includes support for the standard web streams API.

Globally access `ReadableStream`, `WritableStream`, and `TransformStream` classes.

```js ReadableStream
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello');
    controller.enqueue('World');
    controller.close();
  },
});
const reader = stream.getReader();
reader.read().then(({ done, value }) => {
  console.log(value); // Hello
});
reader.read().then(({ done, value }) => {
  console.log(value); // World
});
```

### URL API

`URL` provides the standard API on all platforms.

On native platforms, built-in `URL` and `URLSearchParams` implementations replace the shims in `react-native`. Refer to the [browser and server runtime support](https://caniuse.com/url) for web and Node.js.

```ts URL and URLSearchParams
const url = new URL('https://expo.dev');

const params = new URLSearchParams();
```

Expo's built-in `URL` support attempts to be fully [spec compliant](https://developer.mozilla.org/en-US/docs/Web/API/URL). The only missing exception is that native platforms do not currently support [non-ASCII characters](https://unicode.org/reports/tr46/) in the hostname.

```ts Non-ASCII characters
console.log(new URL('http://🥓').toString());

// This outputs the following:
// - Web, Node.js: http://xn--pr9h/
// - Android, iOS: http://🥓/
```

### `structuredClone`

`structuredClone` is a built-in function that allows you to create a deep copy of a value, including complex objects like `Map`, `Set`, and `ArrayBuffer`. It is available on all platforms.

```ts
const original = { name: 'Expo', date: new Date() };
const clone = structuredClone(original);
console.log(clone); // { name: 'Expo', date: Date }
```

The `transfer` option for `ArrayBuffer` and `TypedArray`s is not implemented.

Remove any custom polyfills for `structuredClone` to prevent bloat. Refer to the standard documentation for more information on the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone).

## API: expo

### EventEmitterType (*Class*)
A class that provides a consistent API for emitting and listening to events.
It shares many concepts with other emitter APIs, such as Node's EventEmitter and `fbemitter`.
When the event is emitted, all of the functions attached to that specific event are called *synchronously*.
Any values returned by the called listeners are *ignored* and discarded.
Its implementation is written in C++ and common for all the platforms.
#### Methods
- `addListener(eventName: EventName, listener: indexedAccess): EventSubscription`
  Adds a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `emit(eventName: EventName, args: Parameters<indexedAccess>)`
  Synchronously calls all the listeners attached to that specific event.
  The event can include any number of arguments that will be passed to the listeners.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `args` | Parameters<indexedAccess> | - |

- `listenerCount(eventName: EventName): number`
  Returns a number of listeners added to the given event.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `removeAllListeners(eventName: typeOperator)`
  Removes all listeners for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | typeOperator | - |

- `removeListener(eventName: EventName, listener: indexedAccess)`
  Removes a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `startObserving(eventName: EventName)`
  Function that is automatically invoked when the first listener for an event with the given name is added.
  Override it in a subclass to perform some additional setup once the event started being observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `stopObserving(eventName: EventName)`
  Function that is automatically invoked when the last listener for an event with the given name is removed.
  Override it in a subclass to perform some additional cleanup once the event is no longer observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

### NativeModuleType (*Class*)
A class for all native modules. Extends the [EventEmitter](#eventemitter) class.
#### Methods
- `addListener(eventName: EventName, listener: indexedAccess): EventSubscription`
  Adds a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `emit(eventName: EventName, args: Parameters<indexedAccess>)`
  Synchronously calls all the listeners attached to that specific event.
  The event can include any number of arguments that will be passed to the listeners.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `args` | Parameters<indexedAccess> | - |

- `listenerCount(eventName: EventName): number`
  Returns a number of listeners added to the given event.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `removeAllListeners(eventName: typeOperator)`
  Removes all listeners for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | typeOperator | - |

- `removeListener(eventName: EventName, listener: indexedAccess)`
  Removes a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `startObserving(eventName: EventName)`
  Function that is automatically invoked when the first listener for an event with the given name is added.
  Override it in a subclass to perform some additional setup once the event started being observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `stopObserving(eventName: EventName)`
  Function that is automatically invoked when the last listener for an event with the given name is removed.
  Override it in a subclass to perform some additional cleanup once the event is no longer observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

### SharedObjectType (*Class*)
Base class for all shared objects that extends the [EventEmitter](#eventemitter) class.
The implementation is written in C++, installed through JSI and common for mobile platforms.
#### Methods
- `addListener(eventName: EventName, listener: indexedAccess): EventSubscription`
  Adds a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `emit(eventName: EventName, args: Parameters<indexedAccess>)`
  Synchronously calls all the listeners attached to that specific event.
  The event can include any number of arguments that will be passed to the listeners.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `args` | Parameters<indexedAccess> | - |

- `listenerCount(eventName: EventName): number`
  Returns a number of listeners added to the given event.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `release()`
  A function that detaches the JS and native objects to let the native object deallocate
  before the JS object gets deallocated by the JS garbage collector. Any subsequent calls to native
  functions of the object will throw an error as it is no longer associated with its native counterpart.

  In most cases, you should never need to use this function, except some specific performance-critical cases when
  manual memory management makes sense and the native object is known to exclusively retain some native memory
  (such as binary data or image bitmap). Before calling this function, you should ensure that nothing else will use
  this object later on. Shared objects created by React hooks are usually automatically released in the effect's cleanup phase,
  for example: `useVideoPlayer()` from `expo-video` and `useImage()` from `expo-image`.

- `removeAllListeners(eventName: typeOperator)`
  Removes all listeners for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | typeOperator | - |

- `removeListener(eventName: EventName, listener: indexedAccess)`
  Removes a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `startObserving(eventName: EventName)`
  Function that is automatically invoked when the first listener for an event with the given name is added.
  Override it in a subclass to perform some additional setup once the event started being observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `stopObserving(eventName: EventName)`
  Function that is automatically invoked when the last listener for an event with the given name is removed.
  Override it in a subclass to perform some additional cleanup once the event is no longer observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

### SharedRefType (*Class*)
A [SharedObject](#sharedobject) that holds a reference to any native object. Allows passing references
to native instances among different independent libraries.

For instance, `ImageRef` from `expo-image` references a [Drawable](https://developer.android.com/reference/android/graphics/drawable/Drawable)
on Android and an [UIImage](https://developer.apple.com/documentation/uikit/uiimage) on iOS. Since both types are common on these platforms,
different native modules can use them without depending on each other. In particular, this enables the `expo-image-manipulator` to pass the resulted image
directly to the image view from `expo-image` without any additional writes and reads from the file system.
#### Properties
- `nativeRefType` (string)
  The type of the native reference.
#### Methods
- `addListener(eventName: EventName, listener: indexedAccess): EventSubscription`
  Adds a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `emit(eventName: EventName, args: Parameters<indexedAccess>)`
  Synchronously calls all the listeners attached to that specific event.
  The event can include any number of arguments that will be passed to the listeners.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `args` | Parameters<indexedAccess> | - |

- `listenerCount(eventName: EventName): number`
  Returns a number of listeners added to the given event.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `release()`
  A function that detaches the JS and native objects to let the native object deallocate
  before the JS object gets deallocated by the JS garbage collector. Any subsequent calls to native
  functions of the object will throw an error as it is no longer associated with its native counterpart.

  In most cases, you should never need to use this function, except some specific performance-critical cases when
  manual memory management makes sense and the native object is known to exclusively retain some native memory
  (such as binary data or image bitmap). Before calling this function, you should ensure that nothing else will use
  this object later on. Shared objects created by React hooks are usually automatically released in the effect's cleanup phase,
  for example: `useVideoPlayer()` from `expo-video` and `useImage()` from `expo-image`.

- `removeAllListeners(eventName: typeOperator)`
  Removes all listeners for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | typeOperator | - |

- `removeListener(eventName: EventName, listener: indexedAccess)`
  Removes a listener for the given event name.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |
  | `listener` | indexedAccess | - |

- `startObserving(eventName: EventName)`
  Function that is automatically invoked when the first listener for an event with the given name is added.
  Override it in a subclass to perform some additional setup once the event started being observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

- `stopObserving(eventName: EventName)`
  Function that is automatically invoked when the last listener for an event with the given name is removed.
  Override it in a subclass to perform some additional cleanup once the event is no longer observed.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventName` | EventName | - |

### Hooks

#### useEvent (*Function*)
- `useEvent(eventEmitter: EventEmitter<TEventsMap>, eventName: TEventName, initialValue: null | TInitialValue): InferEventParameter<TEventListener, TInitialValue>`
  React hook that listens to events emitted by the given object. The returned value is an event parameter
  that gets updated whenever a new event is dispatched.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventEmitter` | EventEmitter<TEventsMap> | An object that emits events. For example, a native module or shared object or an instance of [`EventEmitter`](#eventemitter). |
  | `eventName` | TEventName | Name of the event to listen to. |
  | `initialValue` | null \| TInitialValue | An event parameter to use until the event is called for the first time. |
  Returns: A parameter of the event listener.
  Example:
  ```tsx
  import { useEvent } from 'expo';
  import { VideoPlayer } from 'expo-video';

  export function PlayerStatus({ videoPlayer }: { videoPlayer: VideoPlayer }) {
    const { status } = useEvent(videoPlayer, 'statusChange', { status: videoPlayer.status });

    return <Text>{`Player status: ${status}`}</Text>;
  }
  ```

### Methods

#### isRunningInExpoGo (*Function*)
- `isRunningInExpoGo(): boolean`
  Returns a boolean value whether the app is running in Expo Go.

#### registerRootComponent (*Function*)
- `registerRootComponent(component: React.ComponentType<P>)`
  Sets the initial React component to render natively in the app's root React Native view on Android, iOS, tvOS and the web.

  This method does the following:
  - Invokes React Native's `AppRegistry.registerComponent`.
  - Invokes React Native web's `AppRegistry.runApplication` on web to render to the root `index.html` file.
  - Polyfills the `process.nextTick` function globally.

  This method also adds the following dev-only features that are removed in production bundles.
  - Adds the Fast Refresh and bundle splitting indicator to the app.
  - Asserts if the `expo-updates` package is misconfigured.
  - Asserts if `react-native` is not aliased to `react-native-web` when running in the browser.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `component` | React.ComponentType<P> | The React component class that renders the rest of your app. |

#### registerWebModule (*Function*)
- `registerWebModule(moduleImplementation: ModuleType, moduleName: string): ModuleType`
  Registers a web module.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `moduleImplementation` | ModuleType | A class that extends `NativeModule`. The class is registered under `globalThis.expo.modules[className]`. |
  | `moduleName` | string | – a name to register the module under `globalThis.expo.modules[className]`. |
  Returns: A singleton instance of the class passed into arguments.

#### reloadAppAsync (*Function*)
- `reloadAppAsync(reason?: string): Promise<void>`
  Reloads the app. This method works for both release and debug builds.

  Unlike [`Updates.reloadAsync()`](https://docs.expo.dev/versions/latest/sdk/updates/#updatesreloadasync),
  this function does not use a new update even if one is available. It only reloads the app using the same JavaScript bundle that is currently running.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `reason` *(optional)* | string | The reason for reloading the app. This is used only for some platforms. |

#### requireNativeModule (*Function*)
- `requireNativeModule(moduleName: string): ModuleType`
  Imports the native module registered with given name. In the first place it tries to load
  the module installed through the JSI host object and then falls back to the bridge proxy module.
  Notice that the modules loaded from the proxy may not support some features like synchronous functions.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `moduleName` | string | Name of the requested native module. |
  Returns: Object representing the native module.

#### requireNativeView (*Function*)
- `requireNativeView(moduleName: string, viewName?: string): React.ComponentType<P>`
  A drop-in replacement for `requireNativeComponent`.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `moduleName` | string | - |
  | `viewName` *(optional)* | string | - |

#### requireOptionalNativeModule (*Function*)
- `requireOptionalNativeModule(moduleName: string): ModuleType | null`
  Imports the native module registered with the given name. The same as `requireNativeModule`,
  but returns `null` when the module cannot be found instead of throwing an error.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `moduleName` | string | Name of the requested native module. |
  Returns: Object representing the native module or `null` when it cannot be found.

### Event Subscriptions

#### useEventListener (*Function*)
- `useEventListener(eventEmitter: EventEmitter<TEventsMap>, eventName: TEventName, listener: TEventListener)`
  React hook that listens to events emitted by the given object and calls the listener function whenever a new event is dispatched.
  The event listener is automatically added during the first render and removed when the component unmounts.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `eventEmitter` | EventEmitter<TEventsMap> | An object that emits events. For example, a native module or shared object or an instance of [`EventEmitter`](#eventemitter). |
  | `eventName` | TEventName | Name of the event to listen to. |
  | `listener` | TEventListener | A function to call when the event is dispatched. |
  Example:
  ```tsx
  import { useEventListener } from 'expo';
  import { useVideoPlayer, VideoView } from 'expo-video';

  export function VideoPlayerView() {
    const player = useVideoPlayer(videoSource);

    useEventListener(player, 'playingChange', ({ isPlaying }) => {
      console.log('Player is playing:', isPlaying);
    });

    return <VideoView player={player} />;
  }
  ```

### Types

#### EventEmitter (*Type*)
Type: query

#### NativeModule (*Type*)
Type: query

#### SharedObject (*Type*)
Type: query

#### SharedRef (*Type*)
Type: query

### Constants

#### SharedRef (*Constant*)
- `SharedRef` (query)

## Common questions

Some common questions about using the `expo` package in your project.

<CODE>rootRegisterComponent</CODE> setup for existing React Native projects</>}>

If you are managing your React Native project's native directories (**android** and **ios**) manually, you need to follow the instructions below to set up the `registerRootComponent` function. This is necessary for the Expo modules to work correctly.

**Android**

Update the **android/app/src/main/your-package/MainActivity.java** file to use the name `main` in the `getMainComponentName` function.

```diff android/app/src/main/your-package/MainActivity.java
  @Override
  protected String getMainComponentName() {
+    return "main";
  }
```

**iOS**

Update the iOS **ios/your-project/AppDelegate.(m|mm|swift)** file to use the **moduleName** `main` in the `createRootViewWithBridge:bridge moduleName:@"main" initialProperties:initProps` line of the `application:didFinishLaunchingWithOptions:` function.

#### What if I want to name my main app file something other than App.js or app/_layout.tsx?

**For projects that do not use [Expo Router](https://docs.expo.dev/router/introduction/)**, you can set the `"main"` in **package.json** to any file within your project. If you do this, then you need to use `registerRootComponent`. The `export default` will not make this component the root for the app if you are using a custom entry file.

For example, let's say you want to make **src/main.jsx** the entry file for your app &mdash; maybe you don't like having JavaScript files in the project root. First, set this in **package.json**:

```json package.json
{
  "main": "src/main.jsx"
}
```

Then, in **src/main.jsx**, make sure you call `registerRootComponent` and pass in the component you want to render at the root of the app:

```jsx src/main.jsx
import { registerRootComponent } from 'expo';
import { View } from 'react-native';

function App() {
  return <View />;
}

registerRootComponent(App);
```

**For projects that use [Expo Router](https://docs.expo.dev/router/introduction/)**, you can create a custom entry point by following these steps from [Expo Router's installation guide](https://docs.expo.dev/router/installation/#custom-entry-point-to-initialize-and-load). To use the top-level **src** directory in your Expo Router project, see [src directory reference](https://docs.expo.dev/router/reference/src-directory/) for more information.