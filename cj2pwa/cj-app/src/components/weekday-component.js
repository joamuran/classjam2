import { LitElement, html, css } from 'lit-element';

import { CjPicto } from "./cj-picto";


import { translate } from "@appnest/lit-translate"; // i18n
import { SimpleComponent } from './simple-component/simple-component';


export class WeekdayComponent extends SimpleComponent {

    constructor(){
        super();
        this.componentName="weekdayComponent";
    }    

    updateState(selectedToConfirm) {
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { component: "weekdayComponent",
                      key: "weekday",   /* Updates key in componentdata */
                      value: selectedToConfirm }

        }));     
    }

    getComponentOptions(){

        let componentOptions={};
        componentOptions.headerTitle=translate("weekday-component.title");
        componentOptions.headerQuestion=translate("weekday-component.question");
        componentOptions.currentPicto=this.data.weekday;
        componentOptions.currentLabel=translate("weekday-component." + this.data.weekday);
        componentOptions.componentPrefix="weekday-component.";

        return componentOptions;

    }

}
customElements.define('weekday-component', WeekdayComponent);

