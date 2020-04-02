import { LitElement, html, css } from 'lit-element';

/* */
import { CjPicto } from "./cj-picto";


import { translate } from "@appnest/lit-translate"; // i18n
import { DileModal } from "../lib/dile-modal"; // Modal window: dile-modal
import { SimpleComponent } from './simple-component/simple-component';


/* Sobre el REsizeObserver:
S'utilitza per detectar els canvis de tamany i segons aquests, apliquem
l'escalat als nostres components. 
(Aquests es faran en base a unes dimensions originals de 100x100px)
https://developers.google.com/web/updates/2016/10/resizeobserver
https://codesandbox.io/s/moy4x14yj
*/

const ro = new ResizeObserver(entries => {
    // console.log("resize detect");
    entries.forEach(entry => entry.target.resizedCallback(entry.contentRect));
    //entries.forEach(entry => {console.log(entry);});
});


/*export class SeasonComponent extends LitElement {*/
export class SeasonComponent extends SimpleComponent {

    

    

    handleClick() {
        // Nothing to do in edition mode
        if (this.isediting) return;

        // In Assembly mode, let's start the component selection dialog
        console.log("Editing: " + this.isediting);
        this.shadowRoot.getElementById("modalSeasonSelector").open();
        //console.log(this.shadowRoot.getElementById("modalSeasonSelector"));
    }

    firstUpdated(changedProperties) {
        this.addEventListener('click', this.handleClick);
    }

    // Codi per gestionar el canvi de tamany
    connectedCallback() {
        super.connectedCallback();
        ro.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        ro.unobserve(this);
    }
    resizedCallback({ width, height }) {
        this.width = width;
        this.height = height;
        // console.log(width + "," + height);
        let scale = Math.min(
            width / 100,
            height / 100
        );

        //console.log(scale);
        let divToScale = this.shadowRoot.querySelector("div.component");
        divToScale.style.transform = "scale(" + scale + ")";
        //this.scale=scale;
        //divToScale.querySelector("[name=margins]").style.transform= "scale(" + scale*3 + ")";
    }

    updateState(e) {
        this.dispatchEvent(new CustomEvent('updateState', {
            bubbles: true,
            composed: true,
            detail: { component: "seasonComponent",
                      key: "season",   /* Updates key in componentdata */
                      value: this.selectedToConfirm }

        }));
        this.shadowRoot.getElementById("modalSeasonConfirm").close();
    }

    confirmDialog(e) {
        //console.log(e.target.picto);
        this.selectedToConfirm = e.target.picto;
        this.shadowRoot.getElementById("modalSeasonSelector").close();
        this.shadowRoot.getElementById("modalSeasonConfirm").open();
    }

    cancelDialog(e){
        this.shadowRoot.getElementById("modalSeasonConfirm").close();
    }

    render() {
        //console.log("rendering");
        console.log(this.config);

        let configArray = new Array();
        for (let k of Object.keys(this.config)) {
            configArray.push(k);
        }


        return html`
        <style>
        /* Com que es tracta d'estils continguts en un component intern, sembla
        que els estils del getstyles no s'apliquen i els hem d'incloure aci */

            .thumbup, .thumbdown{
                width: 150px; 
                height: 150px;
                position: relative;
                background-size: cover;
                display: inline-block;
                /*margin-left: 100px;*/
                transition: all ease 0.3s;
                
                }

                .thumbup:hover, .thumbdown:hover{
                cursor: pointer;
                transform: scale(1.2);

                }
            
            .thumbup{  background-image: url("/assets/img/thumbup.png"); }
            .thumbdown{ background-image: url("/assets/img/thumbdown.png"); }

            .selectablePicto{
                width:200px;
                height:200px;
                float: left;
                margin:10px;
                transition: all ease 0.5s;

            }
            .selectablePicto:hover{
                transform: scale(1.2);
            }
        </style>


        <slot name="margins"></slot>
        <div class="component" style="width:100px; height:100px; transform-origin: top left;">
            <div style="height:15px; width:100px;" class="componenth1">${translate("season-component.title")}</div>
            <cj-picto picto="${this.data.season}" label="${translate("season-component." + this.data.season)}"></cj-picto>
            <!--div style="height:70px; width:100px;" class="iconSeason autumn" ></div>
            <div style="height:15px; width:100px;" class="iconSeasonText textfluid">${translate("season-component." + this.data.season)}</div>
            <!- -button PlayComponentButton>botoPlay</button-->
        </div>


        <!-- https://www.webcomponents.org/element/dile-modal -->
            <dile-modal showCloseIcon 
                        style="--dile-modal-background-color: rgba(0,255,0,0.0); --dile-modal-width:1000px; --dile-modal-height:750px;"
                        id="modalSeasonSelector" >
                <h3>${translate("season-component.title")}</h3>
                ${configArray.map(item => html`
                <div class="selectablePicto">
                    <cj-picto @click=${function (e) { this.confirmDialog(e); }} 
                              class="selectable" 
                              picto="${item}" 
                              pictowidth=200 pictoheight=200
                              label="${translate("season-component." + item)}"></cj-picto>
                </div>
                `)}   
            </dile-modal> 

            <dile-modal showCloseIcon 
                        style="--dile-modal-background-color: rgba(0,255,0,0.0); --dile-modal-width:1000px; --dile-modal-height:750px;"
                        id="modalSeasonConfirm" >
                        <h3 style="margin: 10px;">${translate("season-component.verify")}</h3>

                        <cj-picto picto="${this.selectedToConfirm}" 
                        style="margin: 0px auto; display: inline-block;"
                        label="${translate("season-component." + this.selectedToConfirm)}"
                        pictowidth=500 pictoheight=500></cj-picto>

                        <div style="/*background-color: #ffff00;*/
                                    width: 100%; 
                                    height: 180px; 
                                    /*margin-left: -100px;*/
                                    margin-top: -80px; 
                                    padding:0px; 
                                    overflow: visible">
                            <div class="thumbup" @click=${function (e) { this.updateState(e); }}></div>
                            <div class="thumbdown" @click=${function (e) { this.cancelDialog(e); }}></div>
                        </div>
                
            </dile-modal> 
        
        `;
    }
}
customElements.define('season-component', SeasonComponent);