import { LitElement, html, css } from 'lit-element';

export class CjDialog extends LitElement {

    static get properties() {
        return {
            id: { type: Number },
            width: { type: Number },
            height: { type: Number }
        }
    }

    constructor(id) {
        super();
        this.id = id;
    }


    static get styles() {
        return css`
            :host {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                top: 0px;
                left: 0px;
                z-index: 200;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: all ease 0.3s;

            }

            .dialog{
                background-color: #ffffff;
                position: absolute;
                border-radius: 3px;
                box-shadow: 0px 10px 13px -7px #000, 5px 5px 15px 5px rgba(0,0,0,0);
            }

            #closeDialog{
                right: 10px;
                position: absolute;
                top: 10px;
                border-radius: 50%;
                opacity: 0.3;
                width: 32px;
                height: 32px;
            }

            #closeDialog:hover{
                opacity: 1;
            }

            #closeDialog:before, #closeDialog:after {
                position: absolute;
                left: 15px;
                content: ' ';
                height: 33px;
                width: 2px;
                background-color: #333;
              }
              #closeDialog:before {
                transform: rotate(45deg);
              }
              #closeDialog:after {
                transform: rotate(-45deg);
              }
            `

    }


    connectedCallback() {
        let self=this;
        
        setTimeout(function(){
            self.style.transition="all ease 0.3s";
            self.style.opacity=1;
        });
        super.connectedCallback();
        
    }


    render() {
        let style="";
        if (typeof(this.width)!==undefined) style+="width: "+this.width+"%;";
        if (typeof(this.height)!==undefined) style+=" height: "+this.height+"%;";
        
        return html`
        <div class="dialog" style="${style}">
            <div id="closeDialog" @click=${function () {

                // Is this necessary??
                /*this.dispatchEvent(new CustomEvent('closedDialog', {
                    bubbles: true,
                    composed: true,
                    detail: { "id": this.id }
                }));*/

                this.close();
                //this.parentNode.removeChild(this);
            }}></div>
            <slot name="content"></slot>
        </div>
        `;
    }

    close(){
        let self=this;
        let parent=self.parentNode;
        // Fadeout

        this.style.opacity=0;
        setTimeout(function(){
            parent.removeChild(self);
        },300);
        
        
    }
 
}

customElements.define('cj-dialog', CjDialog);
