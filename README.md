<p align="center">
  <img src="./src/assets/images/logo.png" width="200px">
</p>

# Remember it

## ToDo:

- [ ] Check `card edit`
- [ ] Update values from review on `database`
- [ ] Implement **all** actions for **delete**
- [ ] Implement refresh token routine
- [ ] Change main page endpoint
- [x] Enable the button for new deck
- [x] Fix user signup
- [x] Connect with api (partially working)
- [ ] Check mobile view

## Project overview

The folders inside `src` directory are:

<pre>
├── package.json
├── package-lock.json
├── public
│   ├── css
│   │   ├── fonts
│   │   └── katex.min.css
│   ├── img
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   └── logo512.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README-create-react-app.md
├── README.DEV.md
├── README.md
├── remember-it-front.code-workspace
├── sketchup.drawio
├── src
│   ├── api
│   │   ├── axios.ts
│   │   ├── base.ts
│   │   ├── endpoints.ts
│   │   └── index.ts
│   ├── app
│   │   ├── index.tsx
│   │   └── static-contexts
│   │       ├── auth-context.tsx
│   │       └── theme-context.tsx
│   ├── assets
│   │   └── images
│   │       ├── logo.png
│   │       ├── logo.xcf
│   │       ├── sample-card.png
│   │       ├── sample-dashboard.png
│   │       ├── sample-deck.png
│   │       └── sample-review.png
│   ├── components
│   │   ├── cards
│   │   │   ├── CardMarkdownEdit
│   │   │   │   ├── index.module.css
│   │   │   │   ├── index.tsx
│   │   │   │   └── menu.tsx
│   │   │   ├── CardsView.tsx
│   │   │   ├── MarkdownViewer.module.css
│   │   │   └── MarkdownViewer.tsx
│   │   ├── decks
│   │   │   ├── DeckInit.tsx
│   │   │   ├── DeckSettings.tsx
│   │   │   └── DecksView.tsx
│   │   ├── MenuAppBar
│   │   │   └── index.tsx
│   │   ├── StickyFooter
│   │   │   ├── basic.tsx
│   │   │   └── index.tsx
│   │   ├── Textarea
│   │   │   ├── index.module.css
│   │   │   └── index.tsx
│   │   └── ui
│   │       ├── styles
│   │       │   ├── buttons.ts
│   │       │   └── icons.tsx
│   │       └── TransitionAlerts
│   │           └── index.tsx
│   ├── hooks
│   │   ├── useAuth.ts
│   │   ├── usePalette.ts
│   │   └── useTheme.ts
│   ├── index.css
│   ├── index.tsx
│   ├── __mocks__
│   │   └── samples.ts
│   ├── pages
│   │   ├── 404.tsx
│   │   ├── Dashboard.tsx
│   │   ├── [deck]
│   │   │   ├── card
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   └── [id].tsx
│   │   ├── index.tsx
│   │   ├── login
│   │   │   ├── index.tsx
│   │   │   ├── recover-password
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   └── SignUp.tsx
│   │   ├── remember-it.tsx
│   │   └── user
│   │       └── active.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.js
│   ├── routes
│   │   ├── index.tsx
│   │   └── services
│   │       ├── card.ts
│   │       ├── deck.ts
│   │       └── login.ts
│   ├── scripts
│   │   ├── constants
│   │   │   ├── super-memo-2.ts
│   │   │   └── user.ts
│   │   ├── errors
│   │   │   ├── api-not-found.ts
│   │   │   ├── endpoint-not-defined.ts
│   │   │   ├── implementation-error.ts
│   │   │   ├── missing-deck-id.ts
│   │   │   └── not-implemented.ts
│   │   ├── functions
│   │   │   ├── datetime.ts
│   │   │   ├── string.ts
│   │   │   └── super-memo-2.ts
│   │   ├── regex
│   │   │   └── regex.ts
│   │   └── types
│   │       ├── auth-login.endpoint.ts
│   │       ├── card.endpoint.ts
│   │       ├── deck.endpoint.ts
│   │       ├── error.ts
│   │       ├── query.endpoints.ts
│   │       ├── router.ts
│   │       ├── types.ts
│   │       └── user.endpoint.ts
│   ├── setupTests.js
│   ├── store
│   │   ├── index.ts
│   │   └── slices
│   │       ├── deck
│   │       │   ├── actions.ts
│   │       │   └── index.ts
│   │       ├── email
│   │       │   ├── actions.ts
│   │       │   └── index.ts
│   │       └── review
│   │           ├── actions.ts
│   │           └── index.ts
│   └── __tests__
│       └── Default.test.js
├── tsconfig.json
└── yarn.lock
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
