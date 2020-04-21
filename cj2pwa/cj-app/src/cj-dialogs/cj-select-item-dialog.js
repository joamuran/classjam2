import { render, html } from 'lit-html';
import { translate } from "@appnest/lit-translate"; // i18n
import { CjDialog } from './cj-dialog';
import { cjDialogStyle } from './dialog.css';

export class CjSelectItemDialog {
    constructor(componentOptions, config) {
        let self = this;
        this.componentOptions = componentOptions;
        this.config=config;
        this.Dialog = null;
    }

    open() {
        // Prepare promise to handle return values from dialog
        let res, rej;
        let ret = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });

        // Create array for items
        let configArray = new Array();
        console.log(this.config);
        for (let k of Object.keys(this.config)) {
            // Add item only if is active (config.item is true)
            if (this.config[k]) configArray.push(k);
        }

        let dialogWidth = 1000;
        let divisions;

        if (configArray.length == 5) divisions = 5;
        //else if (configArray.length <= 8) divisions = 4;
        else divisions = 4;
        let pictosize = Math.floor((dialogWidth - 200) / divisions);


        let content = html`
            <style>
               ${cjDialogStyle}

                .pictoContainer{
                    display: flex;
                    flex-flow: row;
                    flex-wrap: wrap;
                    overflow: auto;
                    padding: 30px;
                }
                
               .selectablePicto{
                width:150px;
                height:150px;
                float: left;
                margin:10px;
                transition: all ease 0.5s;
                flex: 1 0 ${(100/divisions)-5}%;

            }
            .selectablePicto:hover{
                transform: scale(1.2);
            }

            </style>
            
            <div slot="content">
            <h1 class="dlgHeader">${this.componentOptions.headerQuestion}</h1>
            <div class="pictoContainer">
                    ${configArray.map(item => html`
                    <div class="selectablePicto">
                        <cj-picto @click=${function (e) { 
                            //this.confirmDialog(e); 
                            res(e);
                            }} 
                                class="selectable" 
                                picto="${item}" 
                                pictowidth="${pictosize}" pictoheight="${pictosize}"
                                label="${translate(this.componentOptions.componentPrefix + item)}"></cj-picto>
                                
                    </div>
                    `)}   
            </div>
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