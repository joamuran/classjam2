# dile-close-icon-template

LitElement Template to implement a close icon

```
import { closeIcon } from 'dile-close-icon-template';
```

Yo may use this icon in a LitElement template:

```
render() {
  return html`
    // Your component template
    ${ closeIcon }
  `;
}
```

To easy style the icon you may use the CSS declaration provided in this package.

```
import { closeIcon, closeIconCss } from 'dile-close-icon-template';
```

You may use this style declaration like this:

static get styles() {
  return [closeIconCss, css`
    :host {
        --dile-close-icon-template-color: #fce;
      }
  `];
}

As you may note, there is a custom CSS property named ```--dile-close-icon-template-color```. Use it to set the color of the icon.