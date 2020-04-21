import { render, html } from 'lit-html';
import { translate } from "@appnest/lit-translate"; // i18n
import { CjDialog } from './cj-dialog';
import { cjDialogStyle } from './dialog.css';

export class CjShowDialog {
    constructor(componentOptions) {
        let self = this;
        this.componentOptions = componentOptions;        
        this.Dialog = null;
    }

    open() {
        // Prepare promise to handle return values from dialog
        let res, rej;
        let ret = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });

        let content = html`
            <style>
               ${cjDialogStyle}
            </style>
            
            <div slot="content">
            <h1 class="dlgHeader">${this.componentOptions.currentLabel}</h1>
                <cj-picto picto="${this.componentOptions.currentPicto}" 
                    style="margin: 0px auto; display: inline-block;"
                    label=""
                    pictowidth=500 pictoheight=500></cj-picto>
                    <div class="cjButtonPanel">
                    <button class="cjBt cjBtRedWhite" style="" @click=${function (e) {
                        res(e);
                    }}>
                    <div class="mediaBt"></div>
                    <div>${translate("media.play")}</div></button>
                    </div>
                    
            </cj-picto>
            </div>
            `;

        this.Dialog = document.createElement("cj-dialog");
        this.Dialog.setAttribute("width", 70);
        this.Dialog.setAttribute("height", 70);

        console.log(content);
        render(content, this.Dialog);
        document.body.appendChild(this.Dialog);

        //console.log(ret);
        return ret;

    };


    close() {
        this.Dialog.close();
    }

}