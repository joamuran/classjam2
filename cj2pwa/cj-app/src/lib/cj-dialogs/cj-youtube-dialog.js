import { LitElement, html, css } from 'lit-element';
import { render } from 'lit-html';

export class CjMediaDialog extends LitElement {

    static get properties() {
        return {
            visible: { type: Boolean },
            id: { type: Number }
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
                background-color: #000000;
                top: 0px;
                left: 0px;
                z-index: 200;
            }

            .dialog{
                background-color: #ffffff;
                position: absolute;
            }

            .full{
                width: 100%;
                height: 100%;
            }
            `
    }

    render() {
        return html`
        <div class="dialog full">
            <button id="closeDiaog" @click=${function () {

                this.dispatchEvent(new CustomEvent('closedDialog', {
                    bubbles: true,
                    composed: true,
                    detail: { "id": this.id }
                }));

                this.parentNode.removeChild(this);
            }}></button>
            <slot name="content"></slot>
        </div>
        `;
    }


}
customElements.define('cj-media-dialog', CjMediaDialog);



export class CjYoutubeDialog {
    constructor(url) {
        this.url = url;
        this.id = Date.now();
        this.cjMediaDialog = null;
    }

    getId() {
        return this.id;
    }

    open() {
        self = this;

        this.cjMediaDialog = new CjMediaDialog(this.id);
        let content = html`<div slot="content">
          <h1>hola ke ase</h1>
          <iframe name="content" width="100%" height="700" id="iframe"
                    src="https://www.youtube.com/embed/${this.url}?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>

                    <p>adios</p>
          </iframe>
          </div>`

        let ret = new Promise(function (resolve, reject) {
            function handleEvent(e) {
                self.cjMediaDialog = null;
                // Check object id 

                if (e.detail.id == self.id) {
                    // Resolem la promesa per inforar qui ha creat el diàleg que aquest s'ha tancat
                    console.log("resolent promise " + e.detail.id);
                    console.log("pajarito");
                    resolve(true);
                }
            }

            document.removeEventListener("closedDialog", handleEvent, false);
            document.addEventListener("closedDialog", handleEvent, false);

        });

        render(content, this.cjMediaDialog);
        document.body.appendChild(this.cjMediaDialog);

        return ret;

    }

}

export class cjQuestionDialog {
    constructor(question) {
        this.question = question;
        //this.id = Date.now();
        this.cjMediaDialog = null;
    }

    open() {

        this.cjMediaDialog = new CjMediaDialog();

        let res, rej;
        let ret = new Promise(function (resolve, reject) {
            res=resolve;
            rej=reject;
        });

        let test="Hola";

        let content = html`<div slot="content">
        <h1>Titol</h1>
        <p>${this.question}</p>
        <button @click=${function (e) {
                console.log("Clicked on Yes "+test);
                res(true);
                //ret.resolve(true);
            }}>yes</button>
        <button @click=${function (e) {
                console.log("Clicked on no "+test);
                //console.log(ret);
                res(false);
                //ret.resolve(false);
            }}>no</button>
        </div>`

        render(content, this.cjMediaDialog);
        document.body.appendChild(this.cjMediaDialog);

        console.log(ret);
        return ret;

    }

}