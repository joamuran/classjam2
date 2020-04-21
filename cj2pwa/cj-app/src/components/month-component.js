import { LitElement, html, css } from 'lit-element';

/* */
import { CjPicto } from "./cj-picto";


import { translate } from "@appnest/lit-translate"; // i18n
//import { DileModal } from "../lib/dile-modal/dile-modal"; // Modal window: dile-modal
import { SimpleComponent } from './simple-component/simple-component';


export class MonthComponent extends SimpleComponent {

    constructor(){
        super();
        this.componentName="monthComponent";
    }    

    updateState(selectedToConfirm) {
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { component: "monthComponent",
                      key: "month",   /* Updates key in componentdata */
                      value: selectedToConfirm }

        }));
        // ModalConfirm defined in simple-component.js
        //this.shadowRoot.getElementById("modalConfirm").close();
    }

    getComponentOptions(){

        let componentOptions={};
        componentOptions.headerTitle=translate("month-component.title");
        componentOptions.headerQuestion=translate("month-component.question");
        componentOptions.currentPicto=this.data.month;
        componentOptions.currentLabel=translate("month-component." + this.data.month);
        componentOptions.componentPrefix="month-component.";

        return componentOptions;

    }

}
customElements.define('month-component', MonthComponent);