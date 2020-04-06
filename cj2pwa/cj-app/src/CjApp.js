/*  General Imports */
import { LitElement, html, css } from 'lit-element';    // LitElement
import '@fluidnext-polymer/paper-grid';                 // Paper-grid: Grid Layout: https://www.webcomponents.org/element/@fluidnext-polymer/paper-grid
import { registerTranslateConfig, use, translate, get } // i18n: https://www.webcomponents.org/element/@appnest/lit-translate
  from "@appnest/lit-translate";

/* Default configurations */
import { Config } from './config';

/* Styles Imports */
import { CjAppStyle } from './styles/cj-app-style.js';
import { PaperGridCustomStyle } from './styles/paper-grid-custom-style.js';

/* Components import */
import './components/season-component'
import './components/weather-component'
import './components/month-component'
import './components/weekday-component'



/* Loading Translations */
registerTranslateConfig({
  loader: async lang => {
    const response = await fetch(`/assets/i18n/${lang}.json`);
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
      hasLoadedStrings: { type: Boolean } // i18n: Indica quan s'han carregat les cadenes, de manera que pogam aplicar les traduccions

    };
  }

  constructor() {
    super();
    self = this;

    this.editMode = false;
    this.config = Config;       // Caldria obtindre-la via ajax
    this.hasLoadedStrings = false;  // Per a i18n, indica si s'han carregat les traduccions
    this.currentLang = "ca";
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
    // Constrola si s'ha de realitzar una actualització. Per defecte sempre
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
    await use("en");
    this.hasLoadedStrings = true;


    document.addEventListener("updateState", function (e) {
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

      /* Per provar si va el patró mediador* /
      console.log(e.detail.picto);
      let tmp = self.config;
      tmp.components[0].componentdata = "{\"season\":\"" + e.detail.picto + "\"}";
      self.config = tmp;
      console.log(self.config);
      */
      self.config = tmp;
      console.log(self.config);
      self.update(); // Amb açò va!
      //https://julienrenaux.fr/2019/04/01/lit-element-rendering-strategies-explained/
    });


    window.addEventListener("resize", function () {
      self.scaleApp();
    }, true)

    this.scaleApp();
  }

  scaleApp() {
    // Determinant el factor d'escala
    let scale = Math.min(
      window.innerWidth / self.gridOptions.defaultWidth,
      window.innerHeight / (self.gridOptions.defaultHeight + self.gridOptions.headerHeight)
    );

    //console.log(window.innerWidth+" "+self.gridOptions.defaultWidth+" "+window.innerHeight+" "+self.gridOptions.defaultHeight+" "+self.gridOptions.headerHeight);

    // Determinant la translació
    let tx, ty;
    tx = Math.floor(((window.innerWidth - self.gridOptions.defaultWidth * scale) / 2));
    ty = Math.floor(((window.innerHeight - (self.gridOptions.defaultHeight + self.gridOptions.headerHeight) * scale) / 2));

    // Capturem l'element :host i apliquem els canvis
    let app = self.shadowRoot.host; // Així accedim a tot el shadow DOM (element cj-app)
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
    if (component.componentvisibility=="false") return;
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
  }



  render() {
    console.log("renderApp");
    let cellDimensions = Math.min(this.gridOptions.defaultWidth / this.gridOptions.cols,
      this.gridOptions.defaultWidth / this.gridOptions.rows);

    return html`

    <h1 style="height:${this.gridOptions.headerHeight}px">Class Jam</h1>
    <button style="position: fixed; z-index: 10; top: 10px; right: 10px;" id="btEdit" @click=${function () { this.toggleEditMode() }}>Edit</button>
        
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
   
    `;
  }
}
