import { LitElement, html } from 'lit-element';

/* Styles Imports */
import { CjPictoStyle } from '../styles/cj-picto-style';


export class CjPicto extends LitElement {
    

    static get properties() {
        return {
            picto: { type: String },
            label: { type: String },
            pictowidth: {type: Number},
            pictoheight: {type: Number}
        };
    }

    constructor(){
        super();
        this.pictowidth=100;
        this.pictoheight=100;
    }

    static get styles(){
        return CjPictoStyle;
    }


    render() {
        let fontSize=Math.round(this.pictowidth*12/100);
        // Revisar aci, a vore si es pot fer "flex"
        return html`
            <style>
                .picto{
                    height:100%;
                    display: flex;
                    flex-direction: column;
                    align-items:stretch;
                }
            </style>
            <div class="picto">
            ${this.label=="" ?
                html`<div class="iconPicto ${this.picto}" ></div>`
                :
                html`<div class="iconPicto ${this.picto}" ></div>
                     <div  class="iconPictoText" style="font-size: ${fontSize}px">${this.label}</div>`
            }
            
            </div>
        `;
    }
    /*render() {
        let fontSize=Math.round(this.pictowidth*12/100);
        // Revisar aci, a vore si es pot fer "flex"
        return html`
            <div class="picto" style="width:${this.pictowidth}px; height:${this.pictoheight}px">
            ${this.label=="" ?
                html`<div style="height:100%; width:100%;" class="iconPicto ${this.picto}" ></div>`
                :
                html`<div style="height:70%; width:100%;" class="iconPicto ${this.picto}" ></div>
                     <div style="height:15%; width:100%;" class="iconPictoText" style="font-size: ${fontSize}px">${this.label}</div>`
            }
            
            </div>
        `;
    }*/
}
customElements.define('cj-picto', CjPicto);