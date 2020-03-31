import { LitElement, html } from 'lit-element';

/* Styles Imports */
import { CjPictoStyle } from '../styles/cj-picto-style';


export class CjPicto extends LitElement {
    

    static get properties() {
        return {
            picto: { type: String },
            label: { type: String },
        };
    }

    static get styles(){
        return CjPictoStyle;
    }

    render() {
        return html`
            <div style="height:70px; width:100px;" class="iconPicto ${this.picto}" ></div>
            <div style="height:15px; width:100px;" class="iconPictoText">${this.label}</div>
        `;
    }
}
customElements.define('cj-picto', CjPicto);