import { LitElement, html, css } from 'lit-element';

/* */
import { CjPicto } from "./cj-picto";


import { translate } from "@appnest/lit-translate"; // i18n
import { DileModal } from "../lib/dile-modal"; // Modal window: dile-modal
import { SimpleComponent } from './simple-component/simple-component';


export class WeatherComponent extends SimpleComponent {

    constructor(){
        super();
        this.componentName="weatherComponent";
    }    

    updateState(e) {
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { component: "weatherComponent",
                      key: "weather",   /* Updates key in componentdata */
                      value: this.selectedToConfirm }

        }));
        // ModalConfirm defined in simple-component.js
        this.shadowRoot.getElementById("modalConfirm").close();
    }

    getComponentOptions(){

        let componentOptions={};
        componentOptions.headerTitle=translate("weather-component.title");
        componentOptions.currentPicto=this.data.weather;
        componentOptions.currentLabel=translate("weather-component." + this.data.weather);
        componentOptions.componentPrefix="weather-component.";

        return componentOptions;

    }

}
customElements.define('weather-component', WeatherComponent);



/*




import { LitElement, html, css } from 'lit-element';

export class WeatherComponent extends LitElement {

    static get properties() {
        return {
            config: { type: Object },
            data: { type: Object }    // configuració importada del JSON, s'estableix via atribut a l'etiqueta
        };
    }
        
    static get styles() {
        return css`
    :host {
        display: block;
        width: 100px;
        height: 100px;
        background-color: #ff0000;
    }
    `;
    }

    render() {
        
        return html`
        <div style="width:100px; height: 100px;background-color:blue">
            <div>Weather Component</div>
            <slot name="margins"></slot>
        <div>
        `;
    }
}
customElements.define('weather-component', WeatherComponent);

*/
