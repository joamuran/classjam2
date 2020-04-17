import { render, html } from 'lit-html';
import { CjDialog } from './cj-dialog';
import { cjDialogStyle } from './dialog.css';

export class cjConfirm {
    constructor(content) {
        this.content={};
        typeof(content.header)!="undefined" ?
         this.content.header=content.header :
          this.content.header="Prompt";

        typeof(content.text)!="undefined" ?
         this.content.text=content.text :
          this.content.text="Question";

        typeof(content.BtSuccess)!="undefined" ?
         this.content.BtSuccess=content.BtSuccess :
          this.content.BtSuccess="Success";

        typeof(content.BtCancel)!="undefined" ?
         this.content.BtCancel=content.BtCancel :
          this.content.BtCancel="Prompt";

        this.Dialog=null;
        
    }

    open() {

        //Dialog = new cjDialog(this.id);

        let res, rej;
        let ret = new Promise(function (resolve, reject) {
            res=resolve;
            rej=reject;
        });

        console.log(this.content);

        let content = html`
        <style>
            ${cjDialogStyle}
        </style>
        <div slot="content">
            <h1>${this.content.header}</h1>
            <p>${this.content.text}</p>

            <div class="cjButtonPanel">
                <button class="cjBt cjBtGreen" @click=${function (e) {
                        console.log("Clicked on Yes");
                        res(true);
                    }}>${this.content.BtSuccess}</button>
                <button class="cjBt cjBtRed" @click=${function (e) {
                        console.log("Clicked on No");
                        res(false);
                    }}>${this.content.BtCancel}</button>
            </div>
        </div>
        `

        console.log(content);
        //render(content, this.cjDialog);
        //document.body.appendChild(this.cjDialog);
        let child=document.createElement("cj-dialog");
        child.setAttribute("width", 50);
        child.setAttribute("height", 50);
        
        render(content, child);
        document.body.appendChild(child);
        


        console.log(ret);
        return ret;

    }

}