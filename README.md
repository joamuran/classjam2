# classjam2

ClassJam version 2, a classroom assembly for children and people with special needings. Current working version (1) is in https://github.com/joamuran/class-jam.

This version is not depending on jquery and is based on web components (LitElement/Polymer3).

Desktop version will be based on electron instead of nwjs, but currently it works as a simple web app.

**Running**

We need `polymer-cli` to run web app. To install it:

```
sudo npm install -g polymer-cli
```

And from directory `cj2pwa/cj-app` run:

```
polymer serve
```

It will show us an address like `http://127.0.0.1:8081` where the application wil be running.
