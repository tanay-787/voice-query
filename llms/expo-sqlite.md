# SQLite

_A library that provides access to a database that can be queried through a SQLite API._

Available on platforms android, ios, macos, tvos, web

`expo-sqlite` gives your app access to a database that can be queried through a SQLite API. The database is persisted across restarts of your app.

> **Warning** On Apple TV, the underlying database file is in the caches directory and not the application documents directory, per [Apple platform guidelines](https://github.com/react-native-tvos/react-native-tvos/issues/68#issuecomment-628327676).

## Installation

```bash
$ npx expo install expo-sqlite
```

If you are installing this in an existing React Native app, make sure to install `expo` in your project.

## Configuration in app config

You can configure `expo-sqlite` for advanced configurations using its built-in [config plugin](https://docs.expo.dev/config-plugins/introduction/) if you use config plugins in your project ([Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/)). The plugin allows you to configure various properties that cannot be set at runtime and require building a new app binary to take effect. If your app does **not** use CNG, then you'll need to manually configure the library.

```json app.json
{
  "expo": {
    "plugins": [
      [
        "expo-sqlite",
        {
          "enableFTS": true,
          "useSQLCipher": true,
          "android": {
            // Override the shared configuration for Android
            "enableFTS": false,
            "useSQLCipher": false
          },
          "ios": {
            // You can also override the shared configurations for iOS
            "customBuildFlags": ["-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"]
          }
        }
      ]
    ]
  }
}
```

### Configurable properties
| Name | Default | Description |
| --- | --- | --- |
| `customBuildFlags` | - | Custom build flags to be passed to the SQLite build process. |
| `enableFTS` | `true` | Whether to enable the [FTS3, FTS4](https://www.sqlite.org/fts3.html) and [FTS5](https://www.sqlite.org/fts5.html) extensions. |
| `useSQLCipher` | `false` | Use the [SQLCipher](https://www.zetetic.net/sqlcipher/) implementations rather than the default SQLite. |
| `withSQLiteVecExtension` | `false` | Include the [sqlite-vec](https://github.com/asg017/sqlite-vec) extension to [`bundledExtensions`](#sqlitebundledextensions). |

## Web setup

> **important** Web support is in alpha and may be unstable. [Create an issue on GitHub](https://github.com/expo/expo/issues) if you encounter any issues.

To use `expo-sqlite` on web, you need to configure Metro bundler to support **wasm** files and add HTTP headers to allow [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) usage.

Add the following configuration to your **metro.config.js**. If you don't have the **metro.config.js** yet, you can run `npx expo customize metro.config.js`. [Learn more](https://docs.expo.dev/guides/customizing-metro/).

```diff
diff --git a/metro.config.js b/metro.config.js
index 07c9fce..c3a9b0e 100644
--- a/metro.config.js
+++ b/metro.config.js
@@ -4,4 +4,16 @@ const { getDefaultConfig } = require('expo/metro-config');
 /** @type {import('expo/metro-config').MetroConfig} */
 const config = getDefaultConfig(__dirname);

+// Add wasm asset support
+config.resolver.assetExts.push('wasm');
+
+// Add COEP and COOP headers to support SharedArrayBuffer
+config.server.enhanceMiddleware = (middleware) => {
+  return (req, res, next) => {
+    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
+    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
+    middleware(req, res, next);
+  };
+};
+
 module.exports = config;
```

If you deploy your app to web hosting services, you will also need to add the `Cross-Origin-Embedder-Policy` and `Cross-Origin-Opener-Policy` headers to your web server. [Learn more about the `COEP`, `COOP` headers, and `SharedArrayBuffer`](https://developer.chrome.com/blog/enabling-shared-array-buffer/).

## Usage

Import the module from `expo-sqlite`.

```js Import the module from expo-sqlite
import * as SQLite from 'expo-sqlite';
```

### Basic CRUD operations

```js Basic CRUD operations
const db = await SQLite.openDatabaseAsync('databaseName');

// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Note that `execAsync()` does not escape parameters and may lead to SQL injection.
await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);
INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);
`);

// `runAsync()` is useful when you want to execute some write operations.
const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100);
console.log(result.lastInsertRowId, result.changes);
await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', 999, 'aaa'); // Binding unnamed parameters from variadic arguments
await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', [999, 'aaa']); // Binding unnamed parameters from array
await db.runAsync('DELETE FROM test WHERE value = $value', { $value: 'aaa' }); // Binding named parameters from object

// `getFirstAsync()` is useful when you want to get a single row from the database.
const firstRow = await db.getFirstAsync('SELECT * FROM test');
console.log(firstRow.id, firstRow.value, firstRow.intValue);

// `getAllAsync()` is useful when you want to get all results as an array of objects.
const allRows = await db.getAllAsync('SELECT * FROM test');
for (const row of allRows) {
  console.log(row.id, row.value, row.intValue);
}

// `getEachAsync()` is useful when you want to iterate SQLite query cursor.
for await (const row of db.getEachAsync('SELECT * FROM test')) {
  console.log(row.id, row.value, row.intValue);
}
```

### Prepared statements

Prepared statements allow you to compile your SQL query once and execute it multiple times with different parameters. They automatically escape input parameters to defend against SQL injection attacks, and are recommended for queries that include user input. You can get a prepared statement by calling [`prepareAsync()`](#prepareasyncsource) or [`prepareSync()`](#preparesyncsource) method on a database instance. The prepared statement can fulfill CRUD operations by calling [`executeAsync()`](#executeasyncparams) or [`executeSync()`](#executesyncparams) method.

> **Note:** Remember to call [`finalizeAsync()`](#finalizeasync) or [`finalizeSync()`](#finalizesync) method to release the prepared statement after you finish using the statement. `try-finally` block is recommended to ensure the prepared statement is finalized.

```ts Prepared statements
const statement = await db.prepareAsync(
  'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
);
try {
  let result = await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
  console.log('bbb and 101:', result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: 'ccc', $intValue: 102 });
  console.log('ccc and 102:', result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: 'ddd', $intValue: 103 });
  console.log('ddd and 103:', result.lastInsertRowId, result.changes);
} finally {
  await statement.finalizeAsync();
}

const statement2 = await db.prepareAsync('SELECT * FROM test WHERE intValue >= $intValue');
try {
  const result = await statement2.executeAsync<{ value: string; intValue: number }>({
    $intValue: 100,
  });

  // `getFirstAsync()` is useful when you want to get a single row from the database.
  const firstRow = await result.getFirstAsync();
  console.log(firstRow.id, firstRow.value, firstRow.intValue);

  // Reset the SQLite query cursor to the beginning for the next `getAllAsync()` call.
  await result.resetAsync();

  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await result.getAllAsync();
  for (const row of allRows) {
    console.log(row.value, row.intValue);
  }

  // Reset the SQLite query cursor to the beginning for the next `for-await-of` loop.
  await result.resetAsync();

  // The result object is also an async iterable. You can use it in `for-await-of` loop to iterate SQLite query cursor.
  for await (const row of result) {
    console.log(row.value, row.intValue);
  }
} finally {
  await statement2.finalizeAsync();
}
```

### Tagged template literals API

For convenience and improved developer experience, `expo-sqlite` provides Bun-inspired tagged template literals API through the `db.sql` property. This API automatically escapes parameters to prevent SQL injection attacks and provides automatic type inference based on the query type.

```ts Tagged template literals API
interface User {
  id: number;
  name: string;
  age: number;
}

const db = await SQLite.openDatabaseAsync('mydb.db');
const sql = db.sql;

const age = 21;
const users = await sql<User>`SELECT * FROM users WHERE age > ${age}`;
// Type: User[]
console.log(users[0].name);

// Mutable queries like INSERT/UPDATE/DELETE return SQLiteRunResult metadata
const result =
  (await sql`INSERT INTO users (name, age) VALUES (${'Alice'}, ${30})`) as SQLite.SQLiteRunResult;
console.log(result.lastInsertRowId, result.changes);

// Get first row only
const user = await sql<User>`SELECT * FROM users WHERE id = ${1}`.first();
if (user) {
  console.log(user.name);
}

// Iterate over results
for await (const user of sql<User>`SELECT * FROM users`.each()) {
  console.log(user.name);
}

// Synchronous API
const syncUsers = sql<User>`SELECT * FROM users WHERE age > ${21}`.allSync();
const syncUser = sql<User>`SELECT * FROM users WHERE id = ${1}`.firstSync();
```

### `useSQLiteContext()` hook

```tsx useSQLiteContext() hook
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        <Header />
        <Content />
      </SQLiteProvider>
    </View>
  );
}

export function Header() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState('');
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
        'SELECT sqlite_version()'
      );
      setVersion(result['sqlite_version()']);
    }
    setup();
  }, []);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>SQLite version: {version}</Text>
    </View>
  );
}

interface Todo {
  value: string;
  intValue: number;
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>('SELECT * FROM todos');
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View style={styles.contentContainer}>
      {todos.map((todo, index) => (
        <View style={styles.todoItemContainer} key={index}>
          <Text>{`${todo.intValue} - ${todo.value}`}</Text>
        </View>
      ))}
    </View>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
`);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const styles = StyleSheet.create({
  // Your styles...
});
```

### `useSQLiteContext()` hook with `React.Suspense`

As with the [`useSQLiteContext()`](#usesqlitecontext-hook) hook, you can also integrate the [`SQLiteProvider`](#sqliteprovider) with [`React.Suspense`](https://react.dev/reference/react/Suspense) to show a fallback component until the database is ready. To enable the integration, pass the `useSuspense` prop to the `SQLiteProvider` component.

```tsx useSQLiteContext() hook with React.Suspense
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Suspense } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Fallback />}>
        <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded} useSuspense>
          <Header />
          <Content />
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}
```

### Executing queries within an async transaction

```js Executing queries within an async transaction
const db = await SQLite.openDatabaseAsync('databaseName');

await db.withTransactionAsync(async () => {
  const result = await db.getFirstAsync('SELECT COUNT(*) FROM USERS');
  console.log('Count:', result.rows[0]['COUNT(*)']);
});
```

Due to the nature of async/await, any query that runs while the transaction is active will be included in the transaction. This includes query statements that are outside of the scope function passed to `withTransactionAsync()` and may be surprising behavior. For example, the following test case runs queries inside and outside of a scope function passed to `withTransactionAsync()`. However, all of the queries will run within the actual SQL transaction because the second `UPDATE` query runs before the transaction finishes.

```ts
Promise.all([
  // 1. A new transaction begins
  db.withTransactionAsync(async () => {
    // 2. The value "first" is inserted into the test table and we wait 2
    //    seconds
    await db.execAsync('INSERT INTO test (data) VALUES ("first")');
    await sleep(2000);

    // 4. Two seconds in, we read the latest data from the table
    const row = await db.getFirstAsync<{ data: string }>('SELECT data FROM test');

    // ❌ The data in the table will be "second" and this expectation will fail.
    //    Additionally, this expectation will throw an error and roll back the
    //    transaction, including the `UPDATE` query below since it ran within
    //    the transaction.
    expect(row.data).toBe('first');
  }),
  // 3. One second in, the data in the test table is updated to be "second".
  //    This `UPDATE` query runs in the transaction even though its code is
  //    outside of it because the transaction happens to be active at the time
  //    this query runs.
  sleep(1000).then(async () => db.execAsync('UPDATE test SET data = "second"')),
]);
```

The [`withExclusiveTransactionAsync()`](#withexclusivetransactionasynctask) function addresses this. Only queries that run within the scope function passed to `withExclusiveTransactionAsync()` will run within the actual SQL transaction.

### Executing PRAGMA queries

```js Executing PRAGMA queries
const db = await SQLite.openDatabaseAsync('databaseName');
await db.execAsync('PRAGMA journal_mode = WAL');
await db.execAsync('PRAGMA foreign_keys = ON');
```

> **info** **Tip:** Enable [WAL journal mode](https://www.sqlite.org/wal.html) when you create a new database to improve performance in general.

### Import an existing database

To open a new SQLite database using an existing **.db** file you already have, you can use the [`SQLiteProvider`](#sqliteprovider) with [`assetSource`](#assetsource).

```tsx useSQLiteContext() with existing database
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" assetSource={{ assetId: require('./assets/test.db') }}>
        <Header />
        <Content />
      </SQLiteProvider>
    </View>
  );
}
```

### Sharing a database between apps/extensions (iOS)

To share a database with other apps/extensions in the same App Group, you can use shared containers by following the steps below:

<Step label="1">

Configure the App Group in app config:

```json app.json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.myapp",
      "entitlements": {
        "com.apple.security.application-groups": ["group.com.myapp"]
      }
    }
  }
}
```

</Step>

<Step label="2">

Use [`Paths.appleSharedContainers`](filesystem/#applesharedcontainers) from the [`expo-file-system`](filesystem/) library to retrieve the path to the shared container:

```tsx Using Shared Container for SQLite Database on iOS
import { SQLiteProvider, defaultDatabaseDirectory } from 'expo-sqlite';
import { Paths } from 'expo-file-system';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';

export default function App() {
  const dbDirectory = useMemo(() => {
    if (Platform.OS === 'ios') {
      return Object.values(Paths.appleSharedContainers)?.[0]?.uri;
      // or `Paths.appleSharedContainers['group.com.myapp']?.uri` to choose specific container
    }
    return defaultDatabaseDirectory;
  }, []);

  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" directory={dbDirectory}>
        <Header />
        <Content />
      </SQLiteProvider>
    </View>
  );
}
```

</Step>

### Passing binary data

Use [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) to pass binary data to the database:

```ts Passing binary data
await db.execAsync(`
DROP TABLE IF EXISTS blobs;
CREATE TABLE IF NOT EXISTS blobs (id INTEGER PRIMARY KEY NOT NULL, data BLOB);
`);

const blob = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]);
await db.runAsync('INSERT INTO blobs (data) VALUES (?)', blob);

const row = await db.getFirstAsync<{ data: Uint8Array }>('SELECT * FROM blobs');
expect(row.data).toEqual(blob);
```

### Browse an on-device database

You can inspect a database, execute queries against it, and explore data with the [`drizzle-studio-expo` dev tools plugin](https://github.com/drizzle-team/drizzle-studio-expo). This plugin enables you to launch [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview), connected to a database in your app, directly from Expo CLI. This plugin can be used with any `expo-sqlite` configuration. It does not require that you use [Drizzle ORM](#drizzle-orm) in your app. [Learn how to install and use the plugin](https://github.com/drizzle-team/drizzle-studio-expo).

### Key-value storage

The `expo-sqlite` library provides [`Storage`](#sqlitestorage) as a drop-in replacement for the [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage) library. This key-value store is backed by SQLite. If your project already uses `expo-sqlite`, you can leverage `expo-sqlite/kv-store` without needing to add another dependency.

[`Storage`](#sqlitestorage) provides the same API as `@react-native-async-storage/async-storage`:

```ts Using the Store
// The storage API is the default export, you can call it Storage, AsyncStorage, or whatever you prefer.
import Storage from 'expo-sqlite/kv-store';

await Storage.setItem('key', JSON.stringify({ entity: 'value' }));
const value = await Storage.getItem('key');
const entity = JSON.parse(value);
console.log(entity); // { entity: 'value' }
```

A key benefit of using `expo-sqlite/kv-store` is the addition of synchronous APIs for added convenience:

```ts Using the Store with synchronous APIs
// The storage API is the default export, you can call it Storage, AsyncStorage, or whatever you prefer.
import Storage from 'expo-sqlite/kv-store';

Storage.setItemSync('key', 'value');
const value = Storage.getItemSync('key');
```

If you're currently using `@react-native-async-storage/async-storage` in your project, switching to `expo-sqlite/kv-store` is as simple as changing the import statement:

```diff
- import AsyncStorage from '@react-native-async-storage/async-storage';
+ import AsyncStorage from 'expo-sqlite/kv-store';
```

### The `localStorage` API

The `expo-sqlite/localStorage/install` module provides a drop-in implementation for the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API. If you're already familiar with this API from the web, or you would like to be able to share storage code between web and other platforms, this may be useful. To use it, you just need to import the `expo-sqlite/localStorage/install` module:

> **Note:** `import 'expo-sqlite/localStorage/install';` is a no-op on web and will be excluded from the production JS bundle.

```ts Install globalThis.localStorage
import 'expo-sqlite/localStorage/install';

globalThis.localStorage.setItem('key', 'value');
console.log(globalThis.localStorage.getItem('key')); // 'value'
```

## Security

SQL injections are a class of vulnerabilities where attackers trick your app into executing user input as SQL code. You must escape all user input passed to SQLite to defend against SQL injections. [Prepared statements](#prepared-statements) are an effective defense against this problem. They explicitly separate a SQL query's logic from its input parameters, and SQLite automatically escapes inputs when executing prepared statements.

## Third-party library integrations

The `expo-sqlite` library is designed to be a solid SQLite foundation. It enables broader integrations with third-party libraries for more advanced higher-level features. Here are some of the libraries that you can use with `expo-sqlite`.

### Drizzle ORM

[Drizzle](https://orm.drizzle.team/) is a ["headless TypeScript ORM with a head"](https://orm.drizzle.team/docs/overview). It runs on Node.js, Bun, Deno, and React Native. It also has a CLI companion called [`drizzle-kit`](https://orm.drizzle.team/kit-docs/overview) for generating SQL migrations.

Check out the [Drizzle ORM documentation](https://orm.drizzle.team/) and the [`expo-sqlite` integration guide](https://orm.drizzle.team/docs/get-started/expo-new) for more details.

### Knex.js

[Knex.js](https://knexjs.org/) is a SQL query builder that is ["flexible, portable, and fun to use!"](https://github.com/knex/knex)

Check out the [`expo-sqlite` integration guide](https://github.com/expo/knex-expo-sqlite-dialect) for more details.

## SQLCipher

> **Note:** SQLCipher is not supported on [Expo Go](https://expo.dev/go).

[SQLCipher](https://www.zetetic.net/sqlcipher/) is a fork of SQLite that adds encryption and authentication to the database. The `expo-sqlite` library supports SQLCipher for Android, iOS, and macOS. To use SQLCipher, you need to add the `useSQLCipher` config to your **app.json** as shown in the [Configuration in app config](#configuration-in-app-config) section and run `npx expo prebuild`.

Right after you open a database, you need to set a password for the database using the `PRAGMA key = 'password'` statement.

```ts Add a password to the database
const db = await SQLite.openDatabaseAsync('databaseName');
await db.execAsync(`PRAGMA key = 'password'`);
```

## API

### Cheatsheet for the common API

The following table summarizes the common API for [`SQLiteDatabase`](#sqlitedatabase) and [`SQLiteStatement`](#sqlitestatement) classes:

| [`SQLiteDatabase`](#sqlitedatabase) methods      | [`SQLiteStatement`](#sqlitestatement) methods                                 | Description                                                                                                                                                            | Use Case                                                                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`runAsync()`](#runasyncsource-params)           | [`executeAsync()`](#executeasyncparams)                                       | Executes a SQL query, returning information on the changes made.                                                                                                       | Ideal for SQL write operations such as `INSERT`, `UPDATE`, `DELETE`.                                                                                                                       |
| [`getFirstAsync()`](#getfirstasyncsource-params) | [`executeAsync()`](#executeasyncparams) + [`getFirstAsync()`](#getfirstasync) | Retrieves the first row from the query result.                                                                                                                         | Suitable for fetching a single row from the database. For example: `getFirstAsync('SELECT * FROM Users WHERE id = ?', userId)`.                                                            |
| [`getAllAsync()`](#getallasyncsource-params)     | [`executeAsync()`](#executeasyncparams) + [`getFirstAsync()`](#getallasync)   | Fetches all query results at once.                                                                                                                                     | Best suited for scenarios with smaller result sets, such as queries with a LIMIT clause, like `SELECT * FROM Table LIMIT 100`, where you intend to retrieve all results in a single batch. |
| [`getEachAsync()`](#geteachasyncsource-params)   | [`executeAsync()`](#executeasyncparams) + `for-await-of` async iterator       | Provides an iterator for result set traversal. This method fetches one row at a time from the database, potentially reducing memory usage compared to `getAllAsync()`. | Recommended for handling large result sets incrementally, such as with infinite scrolling implementations.                                                                                 |

## API: expo-sqlite

### SQLiteDatabase (*Class*)
A SQLite database.
#### Properties
- `databasePath` (string)
- `nativeDatabase` (NativeDatabase)
- `options` (SQLiteOpenOptions)
#### Methods
- `closeAsync(): Promise<void>`
  Close the database.

- `closeSync()`
  Close the database.

- `createSessionAsync(dbName: string): Promise<SQLiteSession>`
  Create a new session for the database.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `dbName` | string | The name of the database to create a session for. The default value is `main`. |

- `createSessionSync(dbName: string): SQLiteSession`
  Create a new session for the database.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `dbName` | string | The name of the database to create a session for. The default value is `main`. |

- `execAsync(source: string): Promise<void>`
  Execute all SQL queries in the supplied string.
  > Note: The queries are not escaped for you! Be careful when constructing your queries.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing all the SQL queries. |

- `execSync(source: string)`
  Execute all SQL queries in the supplied string.

  > **Note:** The queries are not escaped for you! Be careful when constructing your queries.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing all the SQL queries. |

- `getAllAsync(source: string, params: SQLiteBindParams): Promise<T[]>`
  A convenience wrapper around [`SQLiteDatabase.prepareAsync()`](#prepareasyncsource), [`SQLiteStatement.executeAsync()`](#executeasyncparams), [`SQLiteExecuteAsyncResult.getAllAsync()`](#getallasync), and [`SQLiteStatement.finalizeAsync()`](#finalizeasync).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |
  Example:
  ```ts
  // For unnamed parameters, you pass values in an array.
  db.getAllAsync('SELECT * FROM test WHERE intValue = ? AND name = ?', [1, 'Hello']);

  // For unnamed parameters, you pass values in variadic arguments.
  db.getAllAsync('SELECT * FROM test WHERE intValue = ? AND name = ?', 1, 'Hello');

  // For named parameters, you should pass values in object.
  db.getAllAsync('SELECT * FROM test WHERE intValue = $intValue AND name = $name', { $intValue: 1, $name: 'Hello' });
  ```

- `getAllSync(source: string, params: SQLiteBindParams): T[]`
  A convenience wrapper around [`SQLiteDatabase.prepareSync()`](#preparesyncsource), [`SQLiteStatement.executeSync()`](#executesyncparams), [`SQLiteExecuteSyncResult.getAllSync()`](#getallsync), and [`SQLiteStatement.finalizeSync()`](#finalizesync).
  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `getEachAsync(source: string, params: SQLiteBindParams): AsyncIterableIterator<T>`
  A convenience wrapper around [`SQLiteDatabase.prepareAsync()`](#prepareasyncsource), [`SQLiteStatement.executeAsync()`](#executeasyncparams), [`SQLiteExecuteAsyncResult`](#sqliteexecuteasyncresult) `AsyncIterator`, and [`SQLiteStatement.finalizeAsync()`](#finalizeasync).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |
  Returns: Rather than returning Promise, this function returns an [`AsyncIterableIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator). You can use `for await...of` to iterate over the rows from the SQLite query result.

- `getEachSync(source: string, params: SQLiteBindParams): IterableIterator<T>`
  A convenience wrapper around [`SQLiteDatabase.prepareSync()`](#preparesyncsource), [`SQLiteStatement.executeSync()`](#executesyncparams), [`SQLiteExecuteSyncResult`](#sqliteexecutesyncresult) `Iterator`, and [`SQLiteStatement.finalizeSync()`](#finalizesync).
  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |
  Returns: This function returns an [`IterableIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator). You can use `for...of` to iterate over the rows from the SQLite query result.

- `getFirstAsync(source: string, params: SQLiteBindParams): Promise<null | T>`
  A convenience wrapper around [`SQLiteDatabase.prepareAsync()`](#prepareasyncsource), [`SQLiteStatement.executeAsync()`](#executeasyncparams), [`SQLiteExecuteAsyncResult.getFirstAsync()`](#getfirstasync), and [`SQLiteStatement.finalizeAsync()`](#finalizeasync).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `getFirstSync(source: string, params: SQLiteBindParams): null | T`
  A convenience wrapper around [`SQLiteDatabase.prepareSync()`](#preparesyncsource), [`SQLiteStatement.executeSync()`](#executesyncparams), [`SQLiteExecuteSyncResult.getFirstSync()`](#getfirstsync), and [`SQLiteStatement.finalizeSync()`](#finalizesync).
  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `isInTransactionAsync(): Promise<boolean>`
  Asynchronous call to return whether the database is currently in a transaction.

- `isInTransactionSync(): boolean`
  Synchronous call to return whether the database is currently in a transaction.

- `loadExtensionAsync(libPath: string, entryPoint?: string): Promise<void>`
  Load a SQLite extension.
  Available on platforms: android, ios, macos, tvos
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `libPath` | string | The path to the extension library file. |
  | `entryPoint` *(optional)* | string | The entry point of the extension. If not provided, the default entry point is inferred by [`sqlite3_load_extension`](https://www.sqlite.org/c3ref/load_extension.html). |
  Example:
  ```ts
  // Load `sqlite-vec` from `bundledExtensions`. You need to enable `withSQLiteVecExtension` to include `sqlite-vec`.
  const extension = SQLite.bundledExtensions['sqlite-vec'];
  await db.loadExtensionAsync(extension.libPath, extension.entryPoint);

  // You can also load a custom extension.
  await db.loadExtensionAsync('/path/to/extension');
  ```

- `loadExtensionSync(libPath: string, entryPoint?: string)`
  Load a SQLite extension.
  Available on platforms: android, ios, macos, tvos
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `libPath` | string | The path to the extension library file. |
  | `entryPoint` *(optional)* | string | The entry point of the extension. If not provided, the default entry point is inferred by [`sqlite3_load_extension`](https://www.sqlite.org/c3ref/load_extension.html). |
  Example:
  ```ts
  // Load `sqlite-vec` from `bundledExtensions`. You need to enable `withSQLiteVecExtension` to include `sqlite-vec`.
  const extension = SQLite.bundledExtensions['sqlite-vec'];
  db.loadExtensionSync(extension.libPath, extension.entryPoint);

  // You can also load a custom extension.
  db.loadExtensionSync('/path/to/extension');
  ```

- `prepareAsync(source: string): Promise<SQLiteStatement>`
  Create a [prepared SQLite statement](https://www.sqlite.org/c3ref/prepare.html).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |

- `prepareSync(source: string): SQLiteStatement`
  Create a [prepared SQLite statement](https://www.sqlite.org/c3ref/prepare.html).

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |

- `runAsync(source: string, params: SQLiteBindParams): Promise<SQLiteRunResult>`
  A convenience wrapper around [`SQLiteDatabase.prepareAsync()`](#prepareasyncsource), [`SQLiteStatement.executeAsync()`](#executeasyncparams), and [`SQLiteStatement.finalizeAsync()`](#finalizeasync).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `runSync(source: string, params: SQLiteBindParams): SQLiteRunResult`
  A convenience wrapper around [`SQLiteDatabase.prepareSync()`](#preparesyncsource), [`SQLiteStatement.executeSync()`](#executesyncparams), and [`SQLiteStatement.finalizeSync()`](#finalizesync).
  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `source` | string | A string containing the SQL query. |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `serializeAsync(databaseName: string): Promise<Uint8Array>`
  [Serialize the database](https://sqlite.org/c3ref/serialize.html) as `Uint8Array`.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `databaseName` | string | The name of the current attached databases. The default value is `main` which is the default database name. |

- `serializeSync(databaseName: string): Uint8Array`
  [Serialize the database](https://sqlite.org/c3ref/serialize.html) as `Uint8Array`.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `databaseName` | string | The name of the current attached databases. The default value is `main` which is the default database name. |

- `syncLibSQL(): Promise<void>`
  Synchronize the local database with the remote libSQL server.
  This method is only available from libSQL integration.

- `withExclusiveTransactionAsync(task: (txn: Transaction) => Promise<void>): Promise<void>`
  Execute a transaction and automatically commit/rollback based on the `task` result.

  The transaction may be exclusive.
  As long as the transaction is converted into a write transaction,
  the other async write queries will abort with `database is locked` error.

  > **Note:** This function is not supported on web.
  Available on platforms: android, ios, macos, tvos
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `task` | (txn: Transaction) => Promise<void> | An async function to execute within a transaction. Any queries inside the transaction must be executed on the `txn` object.<br>The `txn` object has the same interfaces as the [`SQLiteDatabase`](#sqlitedatabase) object. You can use `txn` like a [`SQLiteDatabase`](#sqlitedatabase) object. |
  Example:
  ```ts
  db.withExclusiveTransactionAsync(async (txn) => {
    await txn.execAsync('UPDATE test SET name = "aaa"');
  });
  ```

- `withTransactionAsync(task: () => Promise<void>): Promise<void>`
  Execute a transaction and automatically commit/rollback based on the `task` result.

  > **Note:** This transaction is not exclusive and can be interrupted by other async queries.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `task` | () => Promise<void> | An async function to execute within a transaction. |
  Example:
  ```ts
  db.withTransactionAsync(async () => {
    await db.execAsync('UPDATE test SET name = "aaa"');

    //
    // We cannot control the order of async/await order, so order of execution is not guaranteed.
    // The following UPDATE query out of transaction may be executed here and break the expectation.
    //

    const result = await db.getFirstAsync<{ name: string }>('SELECT name FROM Users');
    expect(result?.name).toBe('aaa');
  });
  db.execAsync('UPDATE test SET name = "bbb"');
  ```
  If you worry about the order of execution, use `withExclusiveTransactionAsync` instead.

- `withTransactionSync(task: () => void)`
  Execute a transaction and automatically commit/rollback based on the `task` result.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `task` | () => void | An async function to execute within a transaction. |

### SQLiteSession (*Class*)
A class that represents an instance of the SQLite session extension.
#### Methods
- `applyChangesetAsync(changeset: Changeset): Promise<void>`
  Apply a changeset asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `changeset` | Changeset | The changeset to apply. |

- `applyChangesetSync(changeset: Changeset)`
  Apply a changeset synchronously.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `changeset` | Changeset | The changeset to apply. |

- `attachAsync(table: null | string): Promise<void>`
  Attach a table to the session asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `table` | null \| string | The table to attach. If `null`, all tables are attached. |

- `attachSync(table: null | string)`
  Attach a table to the session synchronously.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `table` | null \| string | The table to attach. |

- `closeAsync(): Promise<void>`
  Close the session asynchronously.

- `closeSync()`
  Close the session synchronously.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.

- `createChangesetAsync(): Promise<Changeset>`
  Create a changeset asynchronously.

- `createChangesetSync(): Changeset`
  Create a changeset synchronously.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.

- `createInvertedChangesetAsync(): Promise<Changeset>`
  Create an inverted changeset asynchronously.
  This is a shorthand for [`createChangesetAsync()`](#createchangesetasync) + [`invertChangesetAsync()`](#invertchangesetasyncchangeset).

- `createInvertedChangesetSync(): Changeset`
  Create an inverted changeset synchronously.
  This is a shorthand for [`createChangesetSync()`](#createchangesetsync) + [`invertChangesetSync()`](#invertchangesetsyncchangeset).

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.

- `enableAsync(enabled: boolean): Promise<void>`
  Enable or disable the session asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `enabled` | boolean | Whether to enable or disable the session. |

- `enableSync(enabled: boolean)`
  Enable or disable the session synchronously.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `enabled` | boolean | Whether to enable or disable the session. |

- `invertChangesetAsync(changeset: Changeset): Promise<Changeset>`
  Invert a changeset asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `changeset` | Changeset | The changeset to invert. |

- `invertChangesetSync(changeset: Changeset): Changeset`
  Invert a changeset synchronously.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `changeset` | Changeset | The changeset to invert. |

### SQLiteStatement (*Class*)
A prepared statement returned by [`SQLiteDatabase.prepareAsync()`](#prepareasyncsource) or [`SQLiteDatabase.prepareSync()`](#preparesyncsource) that can be binded with parameters and executed.
#### Methods
- `executeAsync(params: SQLiteBindParams): Promise<SQLiteExecuteAsyncResult<T>>`
  Run the prepared statement and return the [`SQLiteExecuteAsyncResult`](#sqliteexecuteasyncresult) instance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `executeSync(params: SQLiteBindParams): SQLiteExecuteSyncResult<T>`
  Run the prepared statement and return the [`SQLiteExecuteSyncResult`](#sqliteexecutesyncresult) instance.
  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `params` | SQLiteBindParams | The parameters to bind to the prepared statement. You can pass values in array, object, or variadic arguments. See [`SQLiteBindValue`](#sqlitebindvalue) for more information about binding values. |

- `finalizeAsync(): Promise<void>`
  Finalize the prepared statement. This will call the [`sqlite3_finalize()`](https://www.sqlite.org/c3ref/finalize.html) C function under the hood.

  Attempting to access a finalized statement will result in an error.
  > **Note:** While `expo-sqlite` will automatically finalize any orphaned prepared statements upon closing the database, it is considered best practice
  > to manually finalize prepared statements as soon as they are no longer needed. This helps to prevent resource leaks.
  > You can use the `try...finally` statement to ensure that prepared statements are finalized even if an error occurs.

- `finalizeSync()`
  Finalize the prepared statement. This will call the [`sqlite3_finalize()`](https://www.sqlite.org/c3ref/finalize.html) C function under the hood.

  Attempting to access a finalized statement will result in an error.

  > **Note:** While `expo-sqlite` will automatically finalize any orphaned prepared statements upon closing the database, it is considered best practice
  > to manually finalize prepared statements as soon as they are no longer needed. This helps to prevent resource leaks.
  > You can use the `try...finally` statement to ensure that prepared statements are finalized even if an error occurs.

- `getColumnNamesAsync(): Promise<string[]>`
  Get the column names of the prepared statement.

- `getColumnNamesSync(): string[]`
  Get the column names of the prepared statement.

### SQLiteStorage (*Class*)
Key-value store backed by SQLite. This class accepts a `databaseName` parameter in its constructor, which is the name of the database file to use for the storage.
#### Methods
- `clear(): Promise<void>`
  Alias for [`clearAsync()`](#clearasync) method.

- `clearAsync(): Promise<boolean>`
  Clears all key-value pairs from the storage asynchronously.

- `clearSync(): boolean`
  Clears all key-value pairs from the storage synchronously.

- `close(): Promise<void>`
  Alias for [`closeAsync()`](#closeasync-1) method.

- `closeAsync(): Promise<void>`
  Closes the database connection asynchronously.

- `closeSync()`
  Closes the database connection synchronously.

- `getAllKeys(): Promise<string[]>`
  Alias for [`getAllKeysAsync()`](#getallkeysasync) method.

- `getAllKeysAsync(): Promise<string[]>`
  Retrieves all keys stored in the storage asynchronously.

- `getAllKeysSync(): string[]`
  Retrieves all keys stored in the storage synchronously.

- `getItem(key: string): Promise<null | string>`
  Alias for [`getItemAsync()`](#getitemasynckey) method.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |

- `getItemAsync(key: string): Promise<null | string>`
  Retrieves the value associated with the given key asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |

- `getItemSync(key: string): null | string`
  Retrieves the value associated with the given key synchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |

- `getKeyByIndexAsync(index: number): Promise<null | string>`
  Retrieves the key at the given index asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `index` | number | - |

- `getKeyByIndexSync(index: number): null | string`
  Retrieves the key at the given index synchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `index` | number | - |

- `getLengthAsync(): Promise<number>`
  Retrieves the number of key-value pairs stored in the storage asynchronously.

- `getLengthSync(): number`
  Retrieves the number of key-value pairs stored in the storage synchronously.

- `mergeItem(key: string, value: string): Promise<void>`
  Merges the given value with the existing value for the given key asynchronously.
  If the existing value is a JSON object, performs a deep merge.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |
  | `value` | string | - |

- `multiGet(keys: string[]): Promise<[string, null | string][]>`
  Retrieves the values associated with the given keys asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `keys` | string[] | - |

- `multiMerge(keyValuePairs: [string, string][]): Promise<void>`
  Merges multiple key-value pairs asynchronously.
  If existing values are JSON objects, performs a deep merge.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `keyValuePairs` | [string, string][] | - |

- `multiRemove(keys: string[]): Promise<void>`
  Removes the values associated with the given keys asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `keys` | string[] | - |

- `multiSet(keyValuePairs: [string, string][]): Promise<void>`
  Sets multiple key-value pairs asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `keyValuePairs` | [string, string][] | - |

- `removeItem(key: string): Promise<void>`
  Alias for [`removeItemAsync()`](#removeitemasynckey) method.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |

- `removeItemAsync(key: string): Promise<boolean>`
  Removes the value associated with the given key asynchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |

- `removeItemSync(key: string): boolean`
  Removes the value associated with the given key synchronously.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |

- `setItem(key: string, value: string | SQLiteStorageSetItemUpdateFunction): Promise<void>`
  Alias for [`setItemAsync()`](#setitemasynckey-value).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |
  | `value` | string \| SQLiteStorageSetItemUpdateFunction | - |

- `setItemAsync(key: string, value: string | SQLiteStorageSetItemUpdateFunction): Promise<void>`
  Sets the value for the given key asynchronously.
  If a function is provided, it computes the new value based on the previous value.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |
  | `value` | string \| SQLiteStorageSetItemUpdateFunction | - |

- `setItemSync(key: string, value: string | SQLiteStorageSetItemUpdateFunction)`
  Sets the value for the given key synchronously.
  If a function is provided, it computes the new value based on the previous value.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `key` | string | - |
  | `value` | string \| SQLiteStorageSetItemUpdateFunction | - |

### Hooks

#### useSQLiteContext (*Function*)
- `useSQLiteContext(): SQLiteDatabase`
  A global hook for accessing the SQLite database across components.
  This hook should only be used within a [`<SQLiteProvider>`](#sqliteprovider) component.
  Example:
  ```tsx
  export default function App() {
    return (
      <SQLiteProvider databaseName="test.db">
        <Main />
      </SQLiteProvider>
    );
  }

  export function Main() {
    const db = useSQLiteContext();
    console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'));
    return <View />
  }
  ```

### SQLite Methods

#### backupDatabaseAsync (*Function*)
- `backupDatabaseAsync(options: { destDatabase: SQLiteDatabase; destDatabaseName: string; sourceDatabase: SQLiteDatabase; sourceDatabaseName: string }): Promise<void>`
  Backup a database to another database.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` | { destDatabase: SQLiteDatabase; destDatabaseName: string; sourceDatabase: SQLiteDatabase; sourceDatabaseName: string } | The backup options |

#### backupDatabaseSync (*Function*)
- `backupDatabaseSync(options: { destDatabase: SQLiteDatabase; destDatabaseName: string; sourceDatabase: SQLiteDatabase; sourceDatabaseName: string })`
  Backup a database to another database.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `options` | { destDatabase: SQLiteDatabase; destDatabaseName: string; sourceDatabase: SQLiteDatabase; sourceDatabaseName: string } | The backup options |

#### deepEqual (*Function*)
- `deepEqual(a: undefined | object, b: undefined | object): boolean`
  Compares two objects deeply for equality.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `a` | undefined \| object | - |
  | `b` | undefined \| object | - |

#### deleteDatabaseAsync (*Function*)
- `deleteDatabaseAsync(databaseName: string, directory?: string): Promise<void>`
  Delete a database file.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `databaseName` | string | The name of the database file to delete. |
  | `directory` *(optional)* | string | The directory where the database file is located. The default value is `defaultDatabaseDirectory`. |

#### deleteDatabaseSync (*Function*)
- `deleteDatabaseSync(databaseName: string, directory?: string)`
  Delete a database file.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `databaseName` | string | The name of the database file to delete. |
  | `directory` *(optional)* | string | The directory where the database file is located. The default value is `defaultDatabaseDirectory`. |

#### deserializeDatabaseAsync (*Function*)
- `deserializeDatabaseAsync(serializedData: Uint8Array, options?: SQLiteOpenOptions): Promise<SQLiteDatabase>`
  Given a `Uint8Array` data and [deserialize to memory database](https://sqlite.org/c3ref/deserialize.html).
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `serializedData` | Uint8Array | The binary array to deserialize from [`SQLiteDatabase.serializeAsync()`](#serializeasyncdatabasename). |
  | `options` *(optional)* | SQLiteOpenOptions | Open options. |

#### deserializeDatabaseSync (*Function*)
- `deserializeDatabaseSync(serializedData: Uint8Array, options?: SQLiteOpenOptions): SQLiteDatabase`
  Given a `Uint8Array` data and [deserialize to memory database](https://sqlite.org/c3ref/deserialize.html).

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `serializedData` | Uint8Array | The binary array to deserialize from [`SQLiteDatabase.serializeSync()`](#serializesyncdatabasename) |
  | `options` *(optional)* | SQLiteOpenOptions | Open options. |

#### openDatabaseAsync (*Function*)
- `openDatabaseAsync(databaseName: string, options?: SQLiteOpenOptions, directory?: string): Promise<SQLiteDatabase>`
  Open a database.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `databaseName` | string | The name of the database file to open. |
  | `options` *(optional)* | SQLiteOpenOptions | Open options. |
  | `directory` *(optional)* | string | The directory where the database file is located. The default value is `defaultDatabaseDirectory`. This parameter is not supported on web. |

#### openDatabaseSync (*Function*)
- `openDatabaseSync(databaseName: string, options?: SQLiteOpenOptions, directory?: string): SQLiteDatabase`
  Open a database.

  > **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `databaseName` | string | The name of the database file to open. |
  | `options` *(optional)* | SQLiteOpenOptions | Open options. |
  | `directory` *(optional)* | string | The directory where the database file is located. The default value is `defaultDatabaseDirectory`. This parameter is not supported on web. |

#### SQLiteProvider (*Function*)
Context.Provider component that provides a SQLite database to all children.
All descendants of this component will be able to access the database using the [`useSQLiteContext`](#usesqlitecontext) hook.
- `SQLiteProvider(props: SQLiteProviderProps): React.ReactNode`
  Context.Provider component that provides a SQLite database to all children.
  All descendants of this component will be able to access the database using the [`useSQLiteContext`](#usesqlitecontext) hook.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `props` | SQLiteProviderProps | - |

### Event Subscriptions

#### addDatabaseChangeListener (*Function*)
- `addDatabaseChangeListener(listener: (event: DatabaseChangeEvent) => void): EventSubscription`
  Add a listener for database changes.
  > Note: to enable this feature, you must set [`enableChangeListener` to `true`](#sqliteopenoptions) when opening the database.
  | Parameter | Type | Description |
  | --- | --- | --- |
  | `listener` | (event: DatabaseChangeEvent) => void | A function that receives the `databaseName`, `databaseFilePath`, `tableName` and `rowId` of the modified data. |
  Returns: A `Subscription` object that you can call `remove()` on when you would like to unsubscribe the listener.

### Props

#### SQLiteProviderProps (*Interface*)
##### Properties
- `assetSource?` (SQLiteProviderAssetSource)
  Import a bundled database file from the specified asset module.
- `children` (React.ReactNode)
  The children to render.
- `databaseName` (string)
  The name of the database file to open.
- `directory?` (string)
  The directory where the database file is located.
- `onError?` ((error: Error) => void)
  Handle errors from SQLiteProvider.
- `onInit?` ((db: SQLiteDatabase) => Promise<void>)
  A custom initialization handler to run before rendering the children.
  You can use this to run database migrations or other setup tasks.
- `options?` (SQLiteOpenOptions)
  Open options.
- `useSuspense?` (boolean)
  Enable [`React.Suspense`](https://react.dev/reference/react/Suspense) integration.

### Interfaces

#### SQLiteExecuteAsyncResult (*Interface*)
A result returned by [`SQLiteStatement.executeAsync()`](#executeasyncparams).
##### Properties
- `changes` (number)
  The number of rows affected. Returned from the [`sqlite3_changes()`](https://www.sqlite.org/c3ref/changes.html) function.
- `lastInsertRowId` (number)
  The last inserted row ID. Returned from the [`sqlite3_last_insert_rowid()`](https://www.sqlite.org/c3ref/last_insert_rowid.html) function.

#### SQLiteExecuteSyncResult (*Interface*)
A result returned by [`SQLiteStatement.executeSync()`](#executesyncparams).
> **Note:** Running heavy tasks with this function can block the JavaScript thread and affect performance.
##### Properties
- `changes` (number)
  The number of rows affected. Returned from the [`sqlite3_changes()`](https://www.sqlite.org/c3ref/changes.html) function.
- `lastInsertRowId` (number)
  The last inserted row ID. Returned from the [`sqlite3_last_insert_rowid()`](https://www.sqlite.org/c3ref/last_insert_rowid.html) function.

#### SQLiteOpenOptions (*Interface*)
Options for opening a database.
##### Properties
- `enableChangeListener?` (boolean)
  Whether to call the [`sqlite3_update_hook()`](https://www.sqlite.org/c3ref/update_hook.html) function and enable the `onDatabaseChange` events. You can later subscribe to the change events by [`addDatabaseChangeListener`](#sqliteadddatabasechangelistenerlistener).
- `libSQLOptions?` ({ authToken: string; remoteOnly: boolean; url: string })
  Options for libSQL integration.
- `useNewConnection?` (boolean)
  Whether to create new connection even if connection with the same database name exists in cache.

#### SQLiteProviderAssetSource (*Interface*)
##### Properties
- `assetId` (number)
  The asset ID returned from the `require()` call.
- `forceOverwrite?` (boolean)
  Force overwrite the local database file even if it already exists.

#### SQLiteRunResult (*Interface*)
A result returned by [`SQLiteDatabase.runAsync`](#runasyncsource-params) or [`SQLiteDatabase.runSync`](#runsyncsource-params).
##### Properties
- `changes` (number)
  The number of rows affected. Returned from the [`sqlite3_changes()`](https://www.sqlite.org/c3ref/changes.html) function.
- `lastInsertRowId` (number)
  The last inserted row ID. Returned from the [`sqlite3_last_insert_rowid()`](https://www.sqlite.org/c3ref/last_insert_rowid.html) function.

### Types

#### Changeset (*Type*)
A type that represents a changeset.
Type: Uint8Array

#### DatabaseChangeEvent (*Type*)
The event payload for the listener of [`addDatabaseChangeListener`](#sqliteadddatabasechangelistenerlistener)
| Property | Type | Description |
| --- | --- | --- |
| `databaseFilePath` | string | The absolute file path to the database. |
| `databaseName` | string | The database name. The value would be `main` by default and other database names if you use `ATTACH DATABASE` statement. |
| `rowId` | number | The changed row ID. |
| `tableName` | string | The table name. |

#### SQLiteBindParams (*Type*)
Type: Record<string, SQLiteBindValue> | SQLiteBindValue[]

#### SQLiteBindValue (*Type*)
Bind parameters to the prepared statement.
You can either pass the parameters in the following forms:
Type: string | number | null | boolean | Uint8Array

#### SQLiteStorageSetItemUpdateFunction (*Type*)
Update function for the [`setItemAsync()`](#setitemasynckey-value) or [`setItemSync()`](#setitemsynckey-value) method. It computes the new value based on the previous value. The function returns the new value to set for the key.
Type: (prevValue: string | null) => string

#### SQLiteVariadicBindParams (*Type*)
Type: SQLiteBindValue[]

### Constants

#### AsyncStorage (*Constant*)
This default instance of the [`SQLiteStorage`](#sqlitestorage-1) class is used as a drop-in replacement for the `AsyncStorage` module from [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage).
- `AsyncStorage` (SQLiteStorage) — This default instance of the [`SQLiteStorage`](#sqlitestorage-1) class is used as a drop-in replacement for the `AsyncStorage` module from [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage).  = ...

#### bundledExtensions (*Constant*)
The pre-bundled SQLite extensions.
- `bundledExtensions` (Record<string, { entryPoint: string; libPath: string } | undefined>) — The pre-bundled SQLite extensions.  = ExpoSQLite.bundledExtensions

#### defaultDatabaseDirectory (*Constant*)
The default directory for SQLite databases.
- `defaultDatabaseDirectory` (any) — The default directory for SQLite databases.  = ExpoSQLite.defaultDatabaseDirectory

#### Storage (*Constant*)
Alias for [`AsyncStorage`](#sqliteasyncstorage), given the storage not only offers asynchronous methods.
- `Storage` (SQLiteStorage) — Alias for [`AsyncStorage`](#sqliteasyncstorage), given the storage not only offers asynchronous methods.  = AsyncStorage