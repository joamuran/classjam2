import { render, html } from 'lit-html';
import { CjDialog } from './cj-dialog';
import { cjDialogStyle } from './dialog.css';
import { translate } from "@appnest/lit-translate"; // i18n

export class CjConfirmSimpleComponent {
    constructor(selectedToConfirm, componentOptions) {
        let self = this;
        this.componentOptions = componentOptions;
        this.selectedToConfirm = selectedToConfirm;
        this.Dialog = null;

    }

    open() {

        let self=this;
        let res, rej;
        let ret = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });

        console.log(this.content);

        let content = html`
        <style>
            ${cjDialogStyle}

            .thumbup, .thumbdown{
                width: 150px; 
                height: 150px;
                position: relative;
                background-size: cover;
                display: inline-block;
                /*margin-left: 100px;*/
                transition: all ease 0.3s;
                
                }

                .thumbup:hover, .thumbdown:hover,.mediaPlay:hover{
                cursor: pointer;
                transform: scale(1.2);

                }
            
            .thumbup{  background-image: url("assets/img/thumbup.png"); }
            .thumbdown{ background-image: url("assets/img/thumbdown.png"); }

            
        </style>
        <div slot="content">
                
            <h1 class="dlgHeader">${translate("component.verify")}</h1>

            <cj-picto   picto="${this.selectedToConfirm}" 
                        style="margin: 0px auto; display: inline-block;"
                        label="${translate(this.componentOptions.componentPrefix + this.selectedToConfirm)}"
                        pictowidth=500 pictoheight=500>
            </cj-picto>

            <div style="/*background-color: #ffff00;*/
                        width: 100%; 
                        height: 180px; 
                        /*margin-left: -100px;*/
                        /*margin-top: -80px; */
                        padding:0px; 
                        overflow: visible">
                        <div class="thumbup" @click=${function (e) { res(self.selectedToConfirm);/*this.updateState(e);*/ }}></div>
                        <div class="thumbdown" @click=${function (e) { res(false);/*this.cancelDialog(e);*/ }}></div>
            </div>
        </div>
        `

        console.log(content);
        //render(content, this.cjDialog);
        //document.body.appendChild(this.cjDialog);

        /*let child=document.createElement("cj-dialog");
        child.setAttribute("width", 50);
        child.setAttribute("height", 50);*/
        this.Dialog = document.createElement("cj-dialog");
        this.Dialog.setAttribute("width", 80);
        this.Dialog.setAttribute("height", 80);

        render(content, this.Dialog);
        document.body.appendChild(this.Dialog);



        console.log(ret);
        return ret;

    }

    close() {
        this.Dialog.close();
    }

}