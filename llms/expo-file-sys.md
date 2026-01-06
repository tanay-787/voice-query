# FileSystem

_A library that provides access to the local file system on the device._

Available on platforms android, ios, tvos

`expo-file-system` provides access to files and directories stored on a device or bundled as assets into the native project. It also allows downloading files from the network.

## Installation

```bash
$ npx expo install expo-file-system
```

If you are installing this in an existing React Native app, make sure to install `expo` in your project.

## Configuration in app config

You can configure `expo-file-system` using its built-in [config plugin](https://docs.expo.dev/config-plugins/introduction/) if you use config plugins in your project ([Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/)). The plugin allows you to configure various properties that cannot be set at runtime and require building a new app binary to take effect. If your app does **not** use CNG, then you'll need to manually configure the library.

```json app.json
{
  "expo": {
    "plugins": [
      [
        "expo-file-system",
        {
          "supportsOpeningDocumentsInPlace": true,
          "enableFileSharing": true
        }
      ]
    ]
  }
}
```

### Configurable properties
| Name | Default | Description |
| --- | --- | --- |
| `supportsOpeningDocumentsInPlace` | `false` | Only for: ios. A boolean to enable `LSSupportsOpeningDocumentsInPlace` in **Info.plist**. This allows the app to open documents in place. |
| `enableFileSharing` | `false` | Only for: ios. A boolean to enable `UIFileSharingEnabled` in **Info.plist**. This enables file sharing in the iOS Files app, making the app's Documents directory accessible to users through the Files app, iTunes File Sharing, and other file management tools. |

<ConfigReactNative>

If you're not using Continuous Native Generation ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) or you're using native **ios** project manually, then you need to add the `LSSupportsOpeningDocumentsInPlace` and `UIFileSharingEnabled` keys to your project's **ios/[app]/Info.plist**:

```xml
<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
<key>UIFileSharingEnabled</key>
<true/>
```

</ConfigReactNative>

## Usage

```js
import { File, Directory, Paths } from 'expo-file-system';
```

The `File` and `Directory` instances hold a reference to a file, content, or asset URI.

The file or directory does not need to exist &mdash; an error will be thrown from the constructor only if the wrong class is used to represent an existing path (so if you try to create a `File` instance passing a path to an already existing directory).

## Features

- Both synchronous and asynchronous, read and write access to file contents
- Creation, modification and deletion
- Available properties, such as `type`, `size`, `creationDate`, and more
- Ability to read and write files as streams or using the `FileHandle` class
- Easy file download/upload using `downloadFileAsync` or `expo/fetch`

## Examples

#### Writing and reading text files

```ts example.ts
import { File, Paths } from 'expo-file-system';

try {
  const file = new File(Paths.cache, 'example.txt');
  file.create(); // can throw an error if the file already exists or no permission to create it
  file.write('Hello, world!');
  console.log(file.textSync()); // Hello, world!
} catch (error) {
  console.error(error);
}
```

#### Picking files using system pickers

Usage with `expo-document-picker`:

```ts example.ts
import { File } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

try {
  const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
  if (!result.canceled) {
    const { uri } = result.assets[0];
    const file = new File(uri);
    console.log(file.textSync());
  }
} catch (error) {
  console.error(error);
}
```

Using the built-in `pickFileAsync` or `pickDirectoryAsync` method on Android:

```ts example.ts
import { File } from 'expo-file-system';

try {
  const file = new File.pickFileAsync();
  console.log(file.textSync());
} catch (error) {
  console.error(error);
}
```

#### Downloading files

Using `downloadFileAsync`:

```ts example.ts
import { Directory, File, Paths } from 'expo-file-system';

const url = 'https://pdfobject.com/pdf/sample.pdf';
const destination = new Directory(Paths.cache, 'pdfs');
try {
  destination.create();
  const output = await File.downloadFileAsync(url, destination);
  console.log(output.exists); // true
  console.log(output.uri); // path to the downloaded file, e.g., '${cacheDirectory}/pdfs/sample.pdf'
} catch (error) {
  console.error(error);
}
```

Or using `expo/fetch`:

```ts example.ts
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

const url = 'https://pdfobject.com/pdf/sample.pdf';
const response = await fetch(url);
const src = new File(Paths.cache, 'file.pdf');
src.write(await response.bytes());
```

Uploading files using <CODE>expo/fetch</CODE></>}>

You can upload files as blobs directly with `fetch` built into the Expo package:

```ts example.ts
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

const file = new File(Paths.cache, 'file.txt');
file.write('Hello, world!');

const response = await fetch('https://example.com', {
  method: 'POST',
  body: file,
});
```

Or using the `FormData` constructor:

```ts example.ts
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

const file = new File(Paths.cache, 'file.txt');
file.write('Hello, world!');
const formData = new FormData();
formData.append('data', file);
const response = await fetch('https://example.com', {
  method: 'POST',
  body: formData,
});
```

#### Moving and copying files

```ts example.ts
import { Directory, File, Paths } from 'expo-file-system';
try {
  const file = new File(Paths.document, 'example.txt');
  file.create();
  console.log(file.uri); // '${documentDirectory}/example.txt'
  const copiedFile = new File(Paths.cache, 'example-copy.txt');
  file.copy(copiedFile);
  console.log(copiedFile.uri); // '${cacheDirectory}/example-copy.txt'
  file.move(Paths.cache);
  console.log(file.uri); // '${cacheDirectory}/example.txt'
  file.move(new Directory(Paths.cache, 'newFolder'));
  console.log(file.uri); // '${cacheDirectory}/newFolder/example.txt'
} catch (error) {
  console.error(error);
}
```

#### Using legacy FileSystem API

```ts example.ts
import * as FileSystem from 'expo-file-system/legacy';
import { File, Paths } from 'expo-file-system';

try {
  const file = new File(Paths.cache, 'example.txt');
  const content = await FileSystem.readAsStringAsync(file.uri);
  console.log(content);
} catch (error) {
  console.error(error);
}
```

#### Listing directory contents recursively

```ts example.ts
import { Directory, Paths } from 'expo-file-system';

function printDirectory(directory: Directory, indent: number = 0) {
  console.log(`${' '.repeat(indent)} + ${directory.name}`);
  const contents = directory.list();
  for (const item of contents) {
    if (item instanceof Directory) {
      printDirectory(item, indent + 2);
    } else {
      console.log(`${' '.repeat(indent + 2)} - ${item.name} (${item.size} bytes)`);
    }
  }
}

try {
  printDirectory(new Directory(Paths.cache));
} catch (error) {
  console.error(error);
}
```

## API

## API: expo-file-system

### Directory (*Class*)
Represents a directory on the filesystem.

A `Directory` instance can be created for any path, and does not need to exist on the filesystem during creation.

The constructor accepts an array of strings that are joined to create the directory URI. The first argument can also be a `Directory` instance (like `Paths.cache`).
#### Properties
- `exists` (boolean)
  A boolean representing if a directory exists and can be accessed.
- `size` (null | number)
  A size of the directory in bytes. Null if the directory does not exist, or it cannot be read.
- `uri` (string)
  Represents the directory URI. The field is read-only, but it may change as a result of calling some methods such as `move`.
#### Methods
- `copy(destination: Directory | File)`
  Copies a directory.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `destination` | Directory \| File | - |

- `create(options?: DirectoryCreateOptions)`
  Creates a directory that the current uri points to.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` *(optional)* | DirectoryCreateOptions | - |

- `createDirectory(name: string): Directory`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `name` | string | - |

- `createFile(name: string, mimeType: null | string): File`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `name` | string | - |
  | `mimeType` | null \| string | - |

- `delete()`
  Deletes a directory. Also deletes all files and directories inside the directory.

- `info(): DirectoryInfo`
  Retrieves an object containing properties of a directory.
  Returns: An object with directory metadata (for example, size, creation date, and so on).

- `list(): File | Directory[]`
  Lists the contents of a directory.
  Calling this method if the parent directory does not exist will throw an error.
  Returns: An array of `Directory` and `File` instances.

- `move(destination: Directory | File)`
  Moves a directory. Updates the `uri` property that now points to the new location.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `destination` | Directory \| File | - |

- `rename(newName: string)`
  Renames a directory.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `newName` | string | - |

- `pickDirectoryAsync(initialUri?: string): Promise<Directory>`
  A static method that opens a file picker to select a directory.

  On iOS, the selected directory grants temporary read and write access for the current app session only. After the app restarts, you must prompt the user again to regain access.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `initialUri` *(optional)* | string | An optional uri pointing to an initial folder on which the directory picker is opened. |
  Returns: a `Directory` instance. On Android, the underlying uri will be a content URI.

### File (*Class*)
Represents a file on the filesystem.

A `File` instance can be created for any path, and does not need to exist on the filesystem during creation.

The constructor accepts an array of strings that are joined to create the file URI. The first argument can also be a `Directory` instance (like `Paths.cache`) or a `File` instance (which creates a new reference to the same file).
#### Properties
- `creationTime` (null | number)
  A creation time of the file expressed in milliseconds since epoch. Returns null if the file does not exist, cannot be read or the Android version is earlier than API 26.
- `exists` (boolean)
  A boolean representing if a file exists. `true` if the file exists, `false` otherwise.
  Also, `false` if the application does not have read access to the file.
- `md5` (null | string)
  A md5 hash of the file. Null if the file does not exist, or it cannot be read.
- `modificationTime` (null | number)
  A last modification time of the file expressed in milliseconds since epoch. Returns a Null if the file does not exist, or it cannot be read.
- `size` (number)
  A size of the file in bytes. 0 if the file does not exist, or it cannot be read.
- `type` (string)
  A mime type of the file. An empty string if the file does not exist, or it cannot be read.
- `uri` (string)
  Represents the file URI. The field is read-only, but it may change as a result of calling some methods such as `move`.
#### Methods
- `arrayBuffer(): Promise<ArrayBuffer>`
  The **`arrayBuffer()`** method of the Blob interface returns a Promise that resolves with the contents of the blob as binary data contained in an ArrayBuffer.

  [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer)

- `base64(): Promise<string>`
  Retrieves content of the file as base64.
  Returns: A promise that resolves with the contents of the file as a base64 string.

- `base64Sync(): string`
  Retrieves content of the file as base64.
  Returns: The contents of the file as a base64 string.

- `bytes(): Promise<Uint8Array<ArrayBuffer>>`
  Retrieves byte content of the entire file.
  Returns: A promise that resolves with the contents of the file as a `Uint8Array`.

- `bytesSync(): Uint8Array`
  Retrieves byte content of the entire file.
  Returns: The contents of the file as a `Uint8Array`.

- `copy(destination: Directory | File)`
  Copies a file.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `destination` | Directory \| File | - |

- `create(options?: FileCreateOptions)`
  Creates a file.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` *(optional)* | FileCreateOptions | - |

- `delete()`
  Deletes a file.

- `info(options?: InfoOptions): FileInfo`
  Retrieves an object containing properties of a file
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` *(optional)* | InfoOptions | - |
  Returns: An object with file metadata (for example, size, creation date, and so on).

- `move(destination: Directory | File)`
  Moves a directory. Updates the `uri` property that now points to the new location.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `destination` | Directory \| File | - |

- `open(): FileHandle`
  Returns A `FileHandle` object that can be used to read and write data to the file.

- `readableStream(): ReadableStream<Uint8Array<ArrayBuffer>>`

- `rename(newName: string)`
  Renames a file.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `newName` | string | - |

- `slice(start?: number, end?: number, contentType?: string): Blob`
  The **`slice()`** method of the Blob interface creates and returns a new `Blob` object which contains data from a subset of the blob on which it's called.

  [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice)
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `start` *(optional)* | number | - |
  | `end` *(optional)* | number | - |
  | `contentType` *(optional)* | string | - |

- `stream(): ReadableStream<Uint8Array<ArrayBuffer>>`
  The **`stream()`** method of the Blob interface returns a ReadableStream which upon reading returns the data contained within the `Blob`.

  [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/stream)

- `text(): Promise<string>`
  Retrieves text from the file.
  Returns: A promise that resolves with the contents of the file as string.

- `textSync(): string`
  Retrieves text from the file.
  Returns: The contents of the file as string.

- `writableStream(): WritableStream<Uint8Array>`

- `write(content: string | Uint8Array)`
  Writes content to the file.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `content` | string \| Uint8Array | The content to write into the file. |

- `downloadFileAsync(url: string, destination: Directory | File, options?: DownloadOptions): Promise<File>`
  A static method that downloads a file from the network.

  On Android, the response body streams directly into the target file. If the download fails after
  it starts, a partially written file may remain at the destination. On iOS, the download first
  completes in a temporary location and the file is moved into place only after success, so no
  file is left behind when the request fails.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `url` | string | The URL of the file to download. |
  | `destination` | Directory \| File | The destination directory or file. If a directory is provided, the resulting filename will be determined based on the response headers. |
  | `options` *(optional)* | DownloadOptions | Download options. When the destination already contains a file, the promise rejects with a `DestinationAlreadyExists` error unless `options.idempotent` is set to `true`. With `idempotent: true`, the download overwrites the existing file instead of failing. |
  Returns: A promise that resolves to the downloaded file. When the server responds with
  a non-2xx HTTP status, the promise rejects with an `UnableToDownload` error whose
  message includes the status code. No file is created in that scenario.
  Example:
  ```ts
  const file = await File.downloadFileAsync("https://example.com/image.png", new Directory(Paths.document));
  ```

- `pickFileAsync(initialUri?: string, mimeType?: string): Promise<File | File[]>`
  A static method that opens a file picker to select a single file of specified type. On iOS, it returns a temporary copy of the file leaving the original file untouched.

  Selecting multiple files is not supported yet.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `initialUri` *(optional)* | string | An optional URI pointing to an initial folder on which the file picker is opened. |
  | `mimeType` *(optional)* | string | A mime type that is used to filter out files that can be picked out. |
  Returns: A `File` instance or an array of `File` instances.

### FileHandle (*Class*)
#### Properties
- `offset` (null | number)
  A property that indicates the current byte offset in the file. Calling `readBytes` or `writeBytes` will read or write a specified amount of bytes starting from this offset. The offset is incremented by the number of bytes read or written.
  The offset can be set to any value within the file size. If the offset is set to a value greater than the file size, the next write operation will append data to the end of the file.
  Null if the file handle is closed.
- `size` (null | number)
  A size of the file in bytes or `null` if the file handle is closed.
#### Methods
- `close()`
  Closes the file handle. This allows the file to be deleted, moved or read by a different process. Subsequent calls to `readBytes` or `writeBytes` will throw an error.

- `readBytes(length: number): Uint8Array<ArrayBuffer>`
  Reads the specified amount of bytes from the file at the current offset.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `length` | number | The number of bytes to read. |

- `writeBytes(bytes: Uint8Array)`
  Writes the specified bytes to the file at the current offset.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `bytes` | Uint8Array | A `Uint8Array` array containing bytes to write. |

### Paths (*Class*)
#### Methods
- `basename(path: string | File | Directory, ext?: string): string`
  Returns the base name of a path.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `path` | string \| File \| Directory | The path to get the base name from. |
  | `ext` *(optional)* | string | An optional file extension. |
  Returns: A string representing the base name.

- `dirname(path: string | File | Directory): string`
  Returns the directory name of a path.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `path` | string \| File \| Directory | The path to get the directory name from. |
  Returns: A string representing the directory name.

- `extname(path: string | File | Directory): string`
  Returns the extension of a path.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `path` | string \| File \| Directory | The path to get the extension from. |
  Returns: A string representing the extension.

- `info(uris: string[]): PathInfo`
  Returns an object that indicates if the specified path represents a directory.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `uris` | string[] | - |

- `isAbsolute(path: string | File | Directory): boolean`
  Checks if a path is absolute.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `path` | string \| File \| Directory | The path to check. |
  Returns: `true` if the path is absolute, `false` otherwise.

- `join(paths: string | File | Directory[]): string`
  Joins path segments into a single path.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `paths` | string \| File \| Directory[] | An array of path segments. |
  Returns: A string representing the joined path.

- `normalize(path: string | File | Directory): string`
  Normalizes a path.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `path` | string \| File \| Directory | The path to normalize. |
  Returns: A string representing the normalized path.

- `parse(path: string | File | Directory): { base: string; dir: string; ext: string; name: string; root: string }`
  Parses a path into its components.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `path` | string \| File \| Directory | The path to parse. |
  Returns: An object containing the parsed path components.

- `relative(from: string | File | Directory, to: string | File | Directory): string`
  Resolves a relative path to an absolute path.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `from` | string \| File \| Directory | The base path. |
  | `to` | string \| File \| Directory | The relative path. |
  Returns: A string representing the resolved path.

### FileSystem Methods

#### copyAsync (*Function*)
- `copyAsync(options: RelocatingOptions): Promise<void>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` | RelocatingOptions | - |

#### createDownloadResumable (*Function*)
- `createDownloadResumable(uri: string, fileUri: string, options?: DownloadOptions, callback?: FileSystemNetworkTaskProgressCallback<DownloadProgressData>, resumeData?: string): any`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `uri` | string | - |
  | `fileUri` | string | - |
  | `options` *(optional)* | DownloadOptions | - |
  | `callback` *(optional)* | FileSystemNetworkTaskProgressCallback<DownloadProgressData> | - |
  | `resumeData` *(optional)* | string | - |

#### createUploadTask (*Function*)
- `createUploadTask(url: string, fileUri: string, options?: FileSystemUploadOptions, callback?: FileSystemNetworkTaskProgressCallback<UploadProgressData>): any`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `url` | string | - |
  | `fileUri` | string | - |
  | `options` *(optional)* | FileSystemUploadOptions | - |
  | `callback` *(optional)* | FileSystemNetworkTaskProgressCallback<UploadProgressData> | - |

#### deleteAsync (*Function*)
- `deleteAsync(fileUri: string, options: DeletingOptions): Promise<void>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |
  | `options` | DeletingOptions | - |

#### deleteLegacyDocumentDirectoryAndroid (*Function*)
- `deleteLegacyDocumentDirectoryAndroid(): Promise<void>`

#### downloadAsync (*Function*)
- `downloadAsync(uri: string, fileUri: string, options: DownloadOptions): Promise<FileSystemDownloadResult>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `uri` | string | - |
  | `fileUri` | string | - |
  | `options` | DownloadOptions | - |

#### getContentUriAsync (*Function*)
- `getContentUriAsync(fileUri: string): Promise<string>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |

#### getFreeDiskStorageAsync (*Function*)
- `getFreeDiskStorageAsync(): Promise<number>`

#### getInfoAsync (*Function*)
- `getInfoAsync(fileUri: string, options: InfoOptions): Promise<FileInfo>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |
  | `options` | InfoOptions | - |

#### getTotalDiskCapacityAsync (*Function*)
- `getTotalDiskCapacityAsync(): Promise<number>`

#### makeDirectoryAsync (*Function*)
- `makeDirectoryAsync(fileUri: string, options: MakeDirectoryOptions): Promise<void>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |
  | `options` | MakeDirectoryOptions | - |

#### moveAsync (*Function*)
- `moveAsync(options: RelocatingOptions): Promise<void>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` | RelocatingOptions | - |

#### readAsStringAsync (*Function*)
- `readAsStringAsync(fileUri: string, options: ReadingOptions): Promise<string>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |
  | `options` | ReadingOptions | - |

#### readDirectoryAsync (*Function*)
- `readDirectoryAsync(fileUri: string): Promise<string[]>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |

#### uploadAsync (*Function*)
- `uploadAsync(url: string, fileUri: string, options: FileSystemUploadOptions): Promise<FileSystemUploadResult>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `url` | string | - |
  | `fileUri` | string | - |
  | `options` | FileSystemUploadOptions | - |

#### writeAsStringAsync (*Function*)
- `writeAsStringAsync(fileUri: string, contents: string, options: WritingOptions): Promise<void>`
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `fileUri` | string | - |
  | `contents` | string | - |
  | `options` | WritingOptions | - |

### Types

#### DirectoryCreateOptions (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `idempotent` *(optional)* | boolean | This flag controls whether the `create` operation is idempotent<br>(safe to call multiple times without error).<br><br>If `true`, creating a file or directory that already exists will succeed silently.<br>If `false`, an error will be thrown when the target already exists. Default: `false` |
| `intermediates` *(optional)* | boolean | Whether to create intermediate directories if they do not exist. Default: `false` |
| `overwrite` *(optional)* | boolean | Whether to overwrite the directory if it exists. Default: `false` |

#### DirectoryInfo (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `creationTime` *(optional)* | number | A creation time of the directory expressed in milliseconds since epoch. Returns null if the Android version is earlier than API 26. |
| `exists` | boolean | Indicates whether the directory exists. |
| `files` *(optional)* | string[] | A list of file names contained within a directory. |
| `modificationTime` *(optional)* | number | The last modification time of the directory expressed in milliseconds since epoch. |
| `size` *(optional)* | number | The size of the file in bytes. |
| `uri` *(optional)* | string | A `file://` URI pointing to the directory. |

#### DownloadOptions (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `headers` *(optional)* | object | The headers to send with the request. |
| `idempotent` *(optional)* | boolean | This flag controls whether the `download` operation is idempotent<br>(safe to call multiple times without error).<br><br>If `true`, downloading a file that already exists overwrites the previous one.<br>If `false`, an error is thrown when the target file already exists. Default: `false` |

#### FileCreateOptions (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `intermediates` *(optional)* | boolean | Whether to create intermediate directories if they do not exist. Default: `false` |
| `overwrite` *(optional)* | boolean | Whether to overwrite the file if it exists. Default: `false` |

#### FileInfo (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `creationTime` *(optional)* | number | A creation time of the file expressed in milliseconds since epoch. Returns null if the Android version is earlier than API 26. |
| `exists` | boolean | Indicates whether the file exists. |
| `md5` *(optional)* | string | Present if the `md5` option was truthy. Contains the MD5 hash of the file. |
| `modificationTime` *(optional)* | number | The last modification time of the file expressed in milliseconds since epoch. |
| `size` *(optional)* | number | The size of the file in bytes. |
| `uri` *(optional)* | string | A `file://` URI pointing to the file. This is the same as the `fileUri` input parameter. |

#### InfoOptions (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `md5` *(optional)* | boolean | Whether to return the MD5 hash of the file. Default: `false` |

#### PathInfo (*Type*)
| Property | Type | Description |
| --- | --- | --- |
| `exists` | boolean | Indicates whether the path exists. Returns true if it exists; false if the path does not exist or if there is no read permission. |
| `isDirectory` | boolean \| null | Indicates whether the path is a directory. Returns true or false if the path exists; otherwise, returns null. |