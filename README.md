<p align="center">
  <img src="./src/images/logo.png" width="200px">
</p>

# Remember it

## Project overview

The folders inside `src` directory are:

<pre>
src
│   api/: has the objects to handle with requests
├── app/: has the _Routing_ and _StaticContexts_
│   └──   staticContexts/: folder where are stored the staticContexts
│
│   components/: contains all components that can be "splitted" and used in another element
│   pages/: will have all the components that has some url/link associated with it
│   store/: contains the main, and yet, dynamic, redux store
│   store/slices/: contains each store slice, giving more readability/maintability to the project
│   __tests__/: tests all pages. Other tests should be in each component and should have the suffix '.test.js'

</pre>

## Some project conventions

### Static Contexts

They are the stores created to handle with data that change too often, like **Auth** and **Theme**. Those ones are the default for this project. However, can be created others, like supports to video/audio, etc.

## How to run

```bash
npm run start
```

## Usefull links

- [React router][1]

<!-- Links -->

[1]: https://reactrouter.com/web/example/basic
