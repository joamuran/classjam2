/*  General Imports */
import { LitElement, html, css } from 'lit-element';    // LitElement
import '@fluidnext-polymer/paper-grid';                 // Paper-grid: Grid Layout: https://www.webcomponents.org/element/@fluidnext-polymer/paper-grid
import { registerTranslateConfig, use, translate, get } // i18n: https://www.webcomponents.org/element/@appnest/lit-translate
  from "@appnest/lit-translate";

//import {render} from 'lit-html';

/* Default configurations */
import { Config } from './config';

/* Styles Imports */
import { CjAppStyle } from './styles/cj-app-style.js';
import { PaperGridCustomStyle } from './styles/paper-grid-custom-style.js';

/* Import Menu and dialogs*/
import './cj-menu'
import {CjYoutubeDialog} from './lib/cj-dialogs/cj-media-dialog'

/* Components import */
import './components/season-component'
import './components/weather-component'
import './components/month-component'
import './components/weekday-component'
import { CjMediaDialog } from './lib/cj-dialogs/cj-media-dialog';



/* Loading Translations */
registerTranslateConfig({
  loader: async lang => {
    const response = await fetch(`assets/i18n/${lang}.json`);
    const json = await response.json();
    return json;
    // Així no funciona... await fetch(`/assets/i18n/${lang}.json`).then(res => { res.json(); })
  }
});

export class CjApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },    // venen per defecte, probablement eliminables
      page: { type: String },
      editMode: { type: Boolean },   // Indica si estem en mode edició (true) o assemblea (false)
      config: { type: Object },    // configuració importada del JSON (Després podriem carregar-la amb ajax)
      gridOptions: { type: Object },  // Configuració per al grid
      hasLoadedStrings: { type: Boolean }, // i18n: Indica quan s'han carregat les cadenes, de manera que pogam aplicar les traduccions
      mediaUrl: { type: String }

    };
  }

  constructor() {
    super();
    self = this;

    this.editMode = false;

    this.config = Config;       // Caldria obtindre-la via ajax (o bé pel localStorage)
    if (localStorage.getItem("cj-assembly") !== null)
      this.config = JSON.parse(localStorage.getItem("cj-assembly"));

    this.hasLoadedStrings = false;  // Per a i18n, indica si s'han carregat les traduccions

    this.currentLang = "ca";
    if (localStorage.getItem("cj-lang") !== null)
      this.currentLang = localStorage.getItem("cj-lang");

    this.gridOptions = {
      cols: 12,
      rows: 7,
      defaultWidth: 1200,
      defaultHeight: 700,
      headerHeight: 50
    }

    /*
    // Exemple per fer un canvi d'idioma "al vol"
    setTimeout(async function(){
       console.log("caviant a "+self.currentLang);
       await use(self.currentLang);
 
     }, 3000);
     */


  }

  shouldUpdate(changedProperties) {
    // Mètode shouldUpdate: https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
    // Controla si s'ha de realitzar una actualització. Per defecte sempre
    // torna true, però podem modificar-lo per indicar quins canvis en les
    // propietats deurien provocar una actualització.
    //return true;
    return this.hasLoadedStrings && super.shouldUpdate(changedProperties);
  }

  // Load the initial language and mark that the strings have been loaded.
  async connectedCallback() {
    let self = this;
    // connectedCallback: (WebComponents estàndard) 
    // Invoked when a component is added to the document’s DOM.

    super.connectedCallback();
    //console.log("ab");
    await use(this.currentLang);
    this.hasLoadedStrings = true;


    // Setting up events
    this.setEventListeners();

    // Initial Application scale
    setTimeout(function () { self.scaleApp(); }, 0);

    //this.scaleApp();
  } // End ConnectedCallback method


  scaleApp() {
    // Determinant el factor d'escala
    console.log("**********");
    let scale = Math.min(
      window.innerWidth / self.gridOptions.defaultWidth,
      window.innerHeight / (self.gridOptions.defaultHeight + self.gridOptions.headerHeight)
    );

    console.log(window.innerWidth + " " + self.gridOptions.defaultWidth + " " + window.innerHeight + " " + self.gridOptions.defaultHeight + " " + self.gridOptions.headerHeight);

    // Determinant la translació
    let tx, ty;
    tx = Math.floor(((window.innerWidth - self.gridOptions.defaultWidth * scale) / 2));
    ty = Math.floor(((window.innerHeight - (self.gridOptions.defaultHeight + self.gridOptions.headerHeight) * scale) / 2));

    // Capturem l'element :host i apliquem els canvis
    //let app = self.shadowRoot.host; // Així accedim a tot el shadow DOM (element cj-app)
    let app = self.shadowRoot.getElementById("appContainer");
    let stringScale = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    console.log(stringScale);
    app.style.transform = stringScale;
  }

  static get styles() {
    // Definim els estils com a un vector de template literal strings, 
    // no un únic template literal string
    return [
      CjAppStyle,
      PaperGridCustomStyle]
  }


  renderMargins(editing) {
    // Renderitza els marges si és editable
    //console.log("rendermargins");
    return html`
    <style>
     span[slot="margins"]{
        border-color: white;
        cursor: move;
        overflow: hidden;
        
        ${editing ? html`display: block;` : html`display:none;`}
      }
    </style>
    
    <span slot="margins" resize="top-right"></span>
    <span slot="margins" resize="top-left"></span>
    <span slot="margins" resize="bottom-right"></span>
    <span slot="margins" resize="bottom-left"></span>
    `;
  }

  /*renderPlayBt(editing, data, config) {
    return;
    // Render player button if has media associated
    let media={"url":"Hola"};
    return html`
    <style>
     span[slot="playBt"]{
      width: 30px;
      height: 30px;
      position: absolute;
      background-image: url('/assets/img/PlayComponentButton.png');
      background-size: cover;
      bottom: 10px;
      left: 10px;
      z-index:1;
        
      ${editing ? html`display: none;` : html`display:block;`}
      }

      span[slot="playBt"]:hover{
        width: 30px;
        height: 30px;
        position: absolute;
        background-image: url('/assets/img/PlayComponentButtonHover.png');
        background-size: cover;
        bottom: 10px;
        left: 10px;
          
        
      }
    </style>
    
    <span slot="playBt" @click=${function(e){this.playComponent(e, media);}} ></span>
    
    `;
  }

  playComponent(e, media){
    e.stopPropagation();
    this.shadowRoot.getElementById("modalPlayMedia").open();
    
  }
*/

  renderComponent(component) {
    //console.log("row: "+component.row+" col:"+component.col);
    //console.log(this.shadowRoot.getElementById("grid"));
    if (component.componentvisibility == "false") return;
    switch (component.component) {
      case "seasonComponent":
        return html`
          <div placeholder></div>
          <season-component 
            height="${component.size_y}" 
            width="${component.size_x}"
            col="${component.col}"
            row="${component.row}"
            data=${component.componentdata}
            ?isediting="${this.editMode}"
            actions=${component.componentactions}
            config=${component.componentconfig}>
            ${this.renderMargins(this.editMode)}            
          </season-component>`;
      //${this.renderPlayBt(this.editMode, component.componentdata, component.componentconfig)}

      case "weatherComponent":
        return html`
          <weather-component 
              height="${component.size_y}" 
              width="${component.size_x}"
              col="${component.col}"
              row="${component.row}"
              data=${component.componentdata}
              ?isediting="${this.editMode}"
              actions=${component.componentactions}
              config=${component.componentconfig}>
              ${this.renderMargins(this.editMode)}
              
            </weather-component>`

      case "monthComponent":
        return html`
          <month-component 
              height="${component.size_y}" 
              width="${component.size_x}"
              col="${component.col}"
              row="${component.row}"
              data=${component.componentdata}
              ?isediting="${this.editMode}"
              actions=${component.componentactions}
              config=${component.componentconfig}>
              ${this.renderMargins(this.editMode)}
              
            </month-component>`

      case "weekdayComponent":
        return html`
          <weekday-component 
              height="${component.size_y}" 
              width="${component.size_x}"
              col="${component.col}"
              row="${component.row}"
              data=${component.componentdata}
              ?isediting="${this.editMode}"
              actions=${component.componentactions}
              config=${component.componentconfig}>
              ${this.renderMargins(this.editMode)}
              
            </weekday-component>`

      default:
        return html`
        <div placeholder></div>
        <div 
          height="${component.size_y}" 
          width="${component.size_x}"
          col="${component.col}"
          row="${component.row}">

          ${this.renderMargins(this.editMode)}
        </div>
      `;

    } // End switch

  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    /*if (!this.editMode) {
      localStorage.setItem("cj-assembly", JSON.stringify(this.config));
    }*/
  }



  render() {
    console.log("renderApp");
    this.storeAssembly();

    let cellDimensions = Math.min(this.gridOptions.defaultWidth / this.gridOptions.cols,
      this.gridOptions.defaultWidth / this.gridOptions.rows);

    return html`

    <!--cj-media-dialog>
    <div slot="content">
      <h1>hola ke ase</h1>
    <iframe name="content" width="100%" height="700" id="iframe"
                    src="https://www.youtube.com/embed/dAALIxJanVM?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>

                    <p>adios</p>
    
    </iframe>
    </div>

    </cj-media-dialog-->
    
    <cj-menu></cj-menu>
    <div id="appContainer">
    <h1 style="height:${this.gridOptions.headerHeight}px">Class Jam</h1>

    <!--button style="position: fixed; z-index: 10; top: 10px; right: 10px;" id="btEdit" @click=${function () { this.toggleEditMode() }}>Edit</button-->
        
    <div id="gridContainer" style="transform: scale(0.9); width:${this.gridOptions.defaultWidth}px; height:${this.gridOptions.defaultHeight}px;">
    <paper-grid  animated 
                  ?draggable="${this.editMode}" 
                  resizable=true 
                  id="grid" 
                  cell-margin="5"  
                  auto-adjust
                  col-count="${this.gridOptions.cols}"
                  row-count="${this.gridOptions.rows}"
                  cell-width=${cellDimensions}
                  cell-height=${cellDimensions}
                  >
      ${this.config.components.map(component => this.renderComponent(component))}
      </paper-grid>
    </div>
    </div> <!-- end appContainer -->

    <!-- Dialog for media play -->
            <dile-modal showCloseIcon 
                style="--dile-modal-width:1000px; "
                id="youtubePlayer" >  
                
                <iframe width="100%" height="700" id="iframe"
                    src="https://www.youtube.com/embed/${this.mediaUrl}?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>

            </dile-modal> 


    `;
  }

  storeAssembly() {

    //localStorage.setItem("cj-assembly", JSON.stringify(this.config));
    console.log("***********");
    let config = this.config;
    let grid = this.shadowRoot.getElementById("grid");
    if (grid == null) return;
    let gridItems = grid.serialize();

    for (let i = 0; i < config.components.length; i++) {
      config.components[i].row = gridItems[i].row;
      config.components[i].col = gridItems[i].col;
      config.components[i].size_x = gridItems[i].width;
      config.components[i].size_y = gridItems[i].height;
    }

    localStorage.setItem("cj-assembly", JSON.stringify(config));

  }

  setListenersForComponents() {
    /*
    Events are triggered by webcomponents or litelements, according to
    mediator pattern, and maneged in App.
    */
    let self = this;

    document.addEventListener("playMedia", function (e) {
      /*
       * Event playMedia: plays youtube video into #youtubePlayer dialog.
       * Triggered by: playMedia method in simple-component
       */
      self.mediaUrl = e.detail.url;
      //self.shadowRoot.getElementById("youtubePlayer").open();

      //let cjMediaDialog = document.createElement("cj-media-dialog");
            
      let myDialog = new CjYoutubeDialog(self.mediaUrl);
      let ret=myDialog.open();

      ret.then(function(response){
        console.log(response);
        console.log("Tralari");
        myDialog=null
      });
          
      
    });
    
    document.addEventListener("dile-modal-closed", function (e) {
      /*
       * Event dile-modal-closed: Stops youtube player when closing modal
       * Triggered by: dile-modal
       */
      let iframe = self.shadowRoot.getElementById("iframe");
      let src = "https://www.youtube.com/embed/" + self.mediaUrl;
      iframe.setAttribute("src", src);

    });

    document.addEventListener("updateState", function (e) {
      /*
       * Event updateState: Updates App state to force its rendering
       * Triggered by: Every component, after modifying its state
       */
      let component = e.detail.component;
      let key = e.detail.key;
      let value = e.detail.value;
      console.log("updateState");
      console.log(component + " - " + key + " - " + value);
      let tmp = self.config;
      for (let i in tmp.components) {
        if (tmp.components[i].component == component) {
          tmp.components[i].componentdata = "{\"" + key + "\":\"" + value + "\"}";
        }

      }

      self.config = tmp;
      //console.log(self.config);
      self.update(); // Amb açò va!
      //https://julienrenaux.fr/2019/04/01/lit-element-rendering-strategies-explained/
    });

  }

  setListenersForMenu() {
    let self = this;

    document.addEventListener("toggleEditMode", function (e) {
      self.toggleEditMode();
    });

    document.addEventListener("resetAssembly", function (e) {
      for (let i in self.config.components) {
        console.log("*********" + i);
        let data = JSON.parse(self.config.components[i].componentdata);
        let key = Object.keys(data)[0];
        // Clean data
        data[key] = "";
        self.config.components[i].componentdata = JSON.stringify(data);
      }

      // Update component
      self.update();
    });



    document.addEventListener("switchLanguage", function (e) {
      console.log(e.detail.lang);
      self.currentLang = e.detail.lang;
      localStorage.setItem("cj-lang", self.currentLang);
      use(self.currentLang);
    });



  }

  setEventListeners() {
    /*
    Seting up event listeners for entire application
    */
    let self = this;

    // Listener for components
    this.setListenersForComponents();

    // Listeners for menu
    this.setListenersForMenu();

    // Global listeners
    window.addEventListener("resize", function () {
      self.scaleApp();
    }, true)

  } // end setEventListeners

}
