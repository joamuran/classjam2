# Classjam2

ClassJam version 2, a classroom assembly for children and people with special needings. Current working version (1) is in https://github.com/joamuran/class-jam.

This version is not depending on jquery and is based on web components (LitElement/Polymer3).

Desktop version will be based on electron instead of nwjs, but currently it works as a simple web app.

**Running developement version**

We need `polymer-cli` to run web app. To install it:

```
sudo npm install -g polymer-cli
```

And from directory `cj2pwa/cj-app` run:

```
$ polymer serve
```

It will show us an address like `http://127.0.0.1:8081` where the application wil be running.

**Create Bundle**

From `cjpwa/cj-app`invoke:

```
$ npm run-script build
```

It will use *rollup* to create bundle, according to `rollup.config.js`. This file has configured for not using Babel, because a bug in comments removing.

This script creates a `dist` folder with the App. We'll need to copy `assets` folder into it.

**Landing Page**

The folder `cj2pwa` contains  an `index.html` file, and folders `lib` and `css`, corresponding to *Landing page*.

After all, the main structure will be something like:

```
$ tree -L 2
.
├── cj-app                      (build folder, renamed to cj-app)
│   ├── assets                  (copied after bundle)
│   ├── cj-app-878e77d2.js
│   ├── cj-app-878e77d2.js.map
│   ├── index.html
│   ├── polyfills
│   └── sw.js
├── css                         (Styles for landing page)
├── index.html                  (Landing page)
└── lib                         (Landing page libraries)

```


