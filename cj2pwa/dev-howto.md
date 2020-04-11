# Classjam2 com a wpa

https://open-wc.org/guide/
https://desarrolloweb.com/articulos/inicio-proyectos-web-components-open-wc.html
https://www.arsys.es/blog/programacion/web-components-open-wc/


Necessitem node 10 i npm 6 o superior. 

Pe iniciar l'assistent fem:

```
joamuran@lluc:~/devel/cj2pwa$ npm init @open-wc
npx: instal·lat 30 en 11.698s

        _.,,,,,,,,,._
     .d''           ``b.       Open Web Components Recommendations
   .p'      Open       `q.
 .d'    Web Components  `b.    Start or upgrade your web component project with
 .d'                     `b.   ease. All our recommendations at your fingertips.
 ::   .................   ::
 `p.                     .q'   See more details at https://open-wc.org/init/
  `p.    open-wc.org    .q'
   `b.     @openWc     .d'
     `q..            ..,'      Note: you can exit any time with Ctrl+C or Esc
        '',,,,,,,,,,''


? What would you like to do today? › - Use arrow-keys. Return to submit.
❯   Scaffold a new project
    Upgrade an existing project

```

Açò ens deixa començar un nou projecte o actualitzar-ne algun existent.

El segon que ens pregunta és si anem a fer una aplicació o un component.

```
 What would you like to scaffold? › Application
 ```
 
Després ens preguntarà què volem incorporar:

```
? What would you like to add? ›  
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   Linting (eslint & prettier)
◯   Testing (karma)
◯   Demoing (storybook)
◯   Building (rollup or webpack)
```

Seleccionem només building, i dins d'aquest, rollup, que diu que és el recomanable per compatibilitat amb els mòduls ES6.

Després demana si volem instal·lar els exemple. Diem q no.

```
? Would you like to scaffold examples files for? ›  
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   Building (rollup or webpack)
```

Al final demana el nom de l'aplicació o component. Diem cj-app:

```
? What is the tag name of your application/web component? › cj-app
```


L'estructura que genera és:

```
./
├── cj-app/
│   ├── src/
│   │   ├── cj-app.js
│   │   ├── CjApp.js
│   │   └── open-wc-logo.js
│   ├── .editorconfig
│   ├── .gitignore
│   ├── custom-elements.json
│   ├── index.html
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   └── rollup.config.js

? Do you want to write this file structure to disk? › - Use arrow-keys. Return to submit.
❯   Yes
    No
```

Li diem que instal·le les dependències amb npm, i ja ho tenim tot preparat.

Ara ens diu que podem accedir al directori de l'aplicació i llançar-la de dins:

```
cd cj-app
npm run start
```
Açò ens llança un servidor de desenvolupament al port 8000. 

Per començar amb la nostra aplicació, ens diu que comencem editant el fitxer src/MyApp.js.




// Traducccions:

https://www.webcomponents.org/element/@appnest/lit-translate



Transpilació amb rollup

Pe tal de fer la construcció de l'aplicació. .. rollup-config-...

