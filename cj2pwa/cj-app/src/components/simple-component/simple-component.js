import { LitElement, html, css } from 'lit-element';
import { translate } from "@appnest/lit-translate"; // i18n


/* Sobre el REsizeObserver:
S'utilitza per detectar els canvis de tamany i segons aquests, apliquem
l'escalat als nostres components. 
(Aquests es faran en base a unes dimensions originals de 100x100px)
https://developers.google.com/web/updates/2016/10/resizeobserver
https://codesandbox.io/s/moy4x14yj
*/

const ro = new ResizeObserver(entries => {
    entries.forEach(entry => entry.target.resizedCallback(entry.contentRect));
});


export class SimpleComponent extends LitElement {

    static get properties() {
        let self = this;
        // console.log(this);
        return {
            config: { type: Object },   // Component configuration, extracted from JSON file and stablished via attribute to label
            data: { type: Object },     // Component data, extracted from JSON file and stablished via attribute to label
            isediting: { type: Boolean },  // True-> Edit Mode; False -> Assembly mode (Player)
            selectedToConfirm: { type: String },   // User selection for component, for confirm dialogs
            componentName: { type: String }   // Name of component
        }
    }

    constructor() {
        super();
        //let self = this;
        this.resizing = false;
        this.selectedToConfirm = "";
    }

    handleClick() {
        /*//
        Manages click on component
        */

        // Nothing to do in edition mode
        console.log("Is editing...");
        console.log(this.isediting);
        if (this.isediting) return;

        // In Assembly mode, let's start the component selection dialog
        console.log("Editing: " + this.isediting);
        //this.shadowRoot.getElementById("modalSelector").open();
        this.shadowRoot.getElementById("modalConfirm").open();
    }

    firstUpdated(changedProperties) {
        //  this.addEventListener('click', this.handleClick);
        this.addEventListener('click', this.confirmDialog);
    }



    /* Methods to manage size changes in component: 
        - connectedCallback
        - disconnectedCallback
        - resizeCAllback
    */
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

    confirmDialog(e) {
        //console.log(e.target.picto);
        if (typeof (e.target.picto) == typeof (undefined)) 
        {console.log(this.data);
            this.selectedToConfirm = this.data[Object.keys(this.data)[0]];
        }
        else
        {
            console.log(e.target.picto);
            this.selectedToConfirm = e.target.picto;
        }
        
        this.shadowRoot.getElementById("modalConfirm").open();
        this.shadowRoot.getElementById("modalSelector").close();

    }

    cancelDialog(e) {
        this.shadowRoot.getElementById("modalConfirm").close();
        this.shadowRoot.getElementById("modalSelector").open(); //////////////
    }

    static get styles() {

        return [
            css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0px;
            cursor: pointer;
        }

        :host([isediting]){
            /*border: dotted 2px orange;*/
            background-color: rgba(255,165,0,0.4);
            cursor:move;
        }

        .componenth1{
            font-size: 10px;
            height: 15%;
            width: 100%;
        }

    `];
    }

    render() {

        // Preparing items
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

        let componentOptions = this.getComponentOptions();

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
                /*width:200px;
                height:200px;*/
                float: left;
                margin:10px;
                transition: all ease 0.5s;

            }
            .selectablePicto:hover{
                transform: scale(1.2);
            }

            .playComponent{
                width: 100px;
                height: 100px;
                position: absolute;
                background-color: #ff0000;
                bottom: 10px;
                left: 10px;
            }

        </style>


        <slot name="margins"></slot>
        <div class="component" style="width:100px; height:100px; transform-origin: top left;">
            <div style="height:15px; width:100px;" class="componenth1">${componentOptions.headerTitle}</div>
            <cj-picto picto="${componentOptions.currentPicto}" label="${componentOptions.currentLabel}"></cj-picto>
        </div>


        <!-- https://www.webcomponents.org/element/dile-modal -->
            <dile-modal showCloseIcon 
                        style="--dile-modal-background-color: rgba(0,255,0,0.0); --dile-modal-width:1000px; "
                        id="modalSelector" >
                <div style="border:20px; min-height:300px; float:left; padding:20px;">
                    <h3>${componentOptions.headerQuestion}</h3>
                    ${configArray.map(item => html`
                    <div class="selectablePicto">
                        <cj-picto @click=${function (e) { this.confirmDialog(e); }} 
                                class="selectable" 
                                picto="${item}" 
                                pictowidth="${pictosize}" pictoheight="${pictosize}"
                                label="${translate(componentOptions.componentPrefix + item)}"></cj-picto>
                                
                    </div>
                    `)}   
                </div>
            </dile-modal> 

            <dile-modal showCloseIcon 
                        style="--dile-modal-background-color: rgba(0,255,0,0.0); --dile-modal-width:1000px; "
                        id="modalConfirm" >
                        <h3 style="margin: 10px;">${translate("component.verify")}</h3>

                        <cj-picto picto="${this.selectedToConfirm}" 
                        style="margin: 0px auto; display: inline-block;"
                        label="${translate(componentOptions.componentPrefix + this.selectedToConfirm)}"
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
                            <div class="playComponent"></div>
                            <!--div class="thumbdown" @click=${function (e) { this.cancelDialog(e); }}></div-->
                        </div>
                
            </dile-modal> 
        
        `;
    }

}
customElements.define('simple-component', SimpleComponent);