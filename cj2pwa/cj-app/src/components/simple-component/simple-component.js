import { LitElement, html, css } from 'lit-element';

export class SimpleComponent extends LitElement {

    static get properties() {
        let self = this;
        // console.log(this);
        return {
            config: { type: Object },   // Component configuration, extracted from JSON file and stablished via attribute to label
            data: { type: Object },     // Component data, extracted from JSON file and stablished via attribute to label
            isediting: { type: Boolean },  // True-> Edit Mode; False -> Assembly mode (Player)
            selectedToConfirm: { type: String }   // User selection for component, for confirm dialogs
        }
    }

    constructor() {
        super();
        //let self = this;
        this.resizing = false;
        this.selectedToConfirm = "";
    }

    static get styles() {

        return [
            css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0px;
        }

        :host([isediting]){
            border: dotted 2px orange;
        }

        .componenth1{
            font-size: 10px;
            height: 15%;
            width: 100%;
        }

    `];
    }
}
customElements.define('simple-component', SimpleComponent);