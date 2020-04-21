import { LitElement, html, css } from 'lit-element';

/* */
import { CjPicto } from "./cj-picto";


import { translate } from "@appnest/lit-translate"; // i18n
//import { DileModal } from "../lib/dile-modal"; // Modal window: dile-modal
import { SimpleComponent } from './simple-component/simple-component';


export class SeasonComponent extends SimpleComponent {

    constructor(){
        super();
        this.componentName="seasonComponent";
    }    

    updateState(selectedToConfirm) {
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { component: "seasonComponent",
                      key: "season",   /* Updates key in componentdata */
                      value: selectedToConfirm }

        }));
        // ModalConfirm defined in simple-component.js
        //this.shadowRoot.getElementById("modalConfirm").close();
    }

    getComponentOptions(){

        let componentOptions={};
        componentOptions.headerTitle=translate("season-component.title");
        componentOptions.headerQuestion=translate("season-component.question");
        componentOptions.currentPicto=this.data.season;
        componentOptions.currentLabel=translate("season-component." + this.data.season);
        componentOptions.componentPrefix="season-component.";

        return componentOptions;

    }

}
customElements.define('season-component', SeasonComponent);