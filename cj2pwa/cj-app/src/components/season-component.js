import { LitElement, html, css } from 'lit-element';

/* */
import { CjPicto } from "./cj-picto";



import { translate } from "@appnest/lit-translate"; // i18n
import { DileModal } from "../lib/dile-modal"; // Modal window: dile-modal


/* Sobre el REsizeObserver:
S'utilitza per detectar els canvis de tamany i segons aquests, apliquem
l'escalat als nostres components. 
(Aquests es faran en base a unes dimensions originals de 100x100px)
https://developers.google.com/web/updates/2016/10/resizeobserver
https://codesandbox.io/s/moy4x14yj
*/

const ro = new ResizeObserver(entries => {
   // console.log("resize detect");
    entries.forEach(entry => entry.target.resizedCallback(entry.contentRect));
    //entries.forEach(entry => {console.log(entry);});
});


export class SeasonComponent extends LitElement {

    static get properties() {
        let self = this;
        // console.log(this);
        return {
            config: { type: Object },
            data: { type: Object },     // configuració importada del JSON, s'estableix via atribut a l'etiqueta
            isediting: { type: Boolean }  // Indica si s'està en mode edició o assemblea
            /*scale: { type: Number }*/

        }
    }

    /*shouldUpdate(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
            if (propName == "resizing") console.log("got");
        });

        return true;
        //return changedProperties.has('prop1');
    }*/


    constructor() {
        super();
        let self = this;
        this.resizing = false;
        //this.colortest = css`red`;

        /*this.addEventListener("resize", function (e) {
            //setTimconsole.log(e.target.offsetWidth);

            setTimeout(function () {
                //console.log(self.offsetWidth);
                let scale = Math.min(
                    self.offsetWidth / 100,
                    self.offsetHeight / 100
                );

                console.log(scale);
                self.shadowRoot.querySelector("div.component").style.transform = "scale(" + scale + ")";
            }, 200);
        });*/
        // Aci encara no tenim accés al valor dels atributs en l'etiqueta
    }




    static get styles() {

        return [
            css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0px;
            /*background-color: #00ff00;*/
            /*text-transform: uppercase;*/
            
        }

        :host([isediting]){
            border: dotted 2px orange;
        }

        /*::slotted(span) {
            border-color: white !important;
          }*/
        
                
        /*.component{
            display: block;
            width: 100%;
            height: 100%;
            margin: 0px;
            /*background-color: #0000ff;* /
            /*text-transform: uppercase;* /
        }*/

        .componenth1{
            font-size: 10px;
            height: 15%;
            width: 100%;
            /*background-color: #00ff00;*/
        }

    `];
    }

    handleClick() {
        // Nothing to do in edition mode
        if (this.isediting) return;

        // In Assembly mode, let's start the component selection dialog
        console.log("Editing: " + this.isediting);
        this.shadowRoot.getElementById("modalSeasonSelector").open();
        console.log(this.shadowRoot.getElementById("modalSeasonSelector"));
    }

    firstUpdated(changedProperties) {
        this.addEventListener('click', this.handleClick);
    }

    // Codi per gestionar el canvi de tamany
    connectedCallback() {
        super.connectedCallback();
        ro.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        ro.unobserve(this);
    }
    resizedCallback({ width, height }) {
        this.width = width;
        this.height = height;
        // console.log(width + "," + height);
        let scale = Math.min(
            width / 100,
            height / 100
        );

        //console.log(scale);
        let divToScale = this.shadowRoot.querySelector("div.component");
        divToScale.style.transform = "scale(" + scale + ")";
        //this.scale=scale;
        //divToScale.querySelector("[name=margins]").style.transform= "scale(" + scale*3 + ")";
    }

    updateState(e) {
        console.log(e.target.picto);
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { picto: e.target.picto, test: true }
        }));
    }

    render() {
        //console.log("rendering");
        console.log(this.config);

        let configArray = new Array();
        for (let k of Object.keys(this.config)) {
            configArray.push(k);
        }


        return html`
        <slot name="margins"></slot>
        <div class="component" style="width:100px; height:100px; transform-origin: top left;">
            <div style="height:15px; width:100px;" class="componenth1">${translate("season-component.title")}</div>
            <cj-picto picto="${this.data.season}" label="${translate("season-component." + this.data.season)}"></cj-picto>
            <!--div style="height:70px; width:100px;" class="iconSeason autumn" ></div>
            <div style="height:15px; width:100px;" class="iconSeasonText textfluid">${translate("season-component." + this.data.season)}</div>
            <!- -button PlayComponentButton>botoPlay</button-->
        </div>


        <!-- https://www.webcomponents.org/element/dile-modal -->
            <dile-modal showCloseIcon 
                        style="--dile-modal-background-color: rgba(0,255,0,0.0); --dile-modal-width:550px; --dile-modal-height:300px;"
                        id="modalSeasonSelector" >
                <h3>${translate("season-component.title")}</h3>
                ${configArray.map(item => html`
                <div style="width:100px; height:100px; float: left; margin:10px">
                    <cj-picto @click=${function (e) { this.updateState(e); }} class="selectable" picto="${item}" label="${translate("season-component." + item)}"></cj-picto>
                </div>
                `)}   
            </dile-modal> 
        
        `;
    }
}
customElements.define('season-component', SeasonComponent);