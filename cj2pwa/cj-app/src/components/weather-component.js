import { LitElement, html, css } from 'lit-element';

/* */
import { CjPicto } from "./cj-picto";


import { translate } from "@appnest/lit-translate"; // i18n
//import { DileModal } from "../lib/dile-modal"; // Modal window: dile-modal
import { SimpleComponent } from './simple-component/simple-component';


export class WeatherComponent extends SimpleComponent {

    constructor(){
        super();
        this.componentName="weatherComponent";
    }    

    updateState(selectedToConfirm) {
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { component: "weatherComponent",
                      key: "weather",   /* Updates key in componentdata */
                      value: selectedToConfirm }

        }));
        // ModalConfirm defined in simple-component.js
        //this.shadowRoot.getElementById("modalConfirm").close();
    }

    getComponentOptions(){

        let componentOptions={};
        componentOptions.headerTitle=translate("weather-component.title");
        componentOptions.headerQuestion=translate("weather-component.question");
        componentOptions.currentPicto=this.data.weather;
        componentOptions.currentLabel=translate("weather-component." + this.data.weather);
        componentOptions.componentPrefix="weather-component.";

        return componentOptions;

    }

}
customElements.define('weather-component', WeatherComponent);

