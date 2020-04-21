import { LitElement, html, css } from 'lit-element';
import { translate } from "@appnest/lit-translate"; // i18n

import {CjShowDialog} from '../../cj-dialogs/cj-show-dialog';
import {CjSelectItemDialog} from '../../cj-dialogs/cj-select-item-dialog';
import {CjConfirmSimpleComponent} from '../../cj-dialogs/cj-confirm-simple-component';

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
            actions: {type: Object},    // Component actions from JSON to play media
            isediting: { type: Boolean },  // True-> Edit Mode; False -> Assembly mode (Player)
            selectedToConfirm: { type: String },   // User selection for component, for confirm dialogs
            componentName: { type: String },   // Name of component
            youtubeurl:  {type: String} // URL for youtube video play
        }
    }

    constructor() {
        super();
        //let self = this;
        this.resizing = false;
        this.selectedToConfirm = "";
    }

    handleClick() {
        /*
        Manages click on component
        */

        // Nothing to do in edition mode
        console.log("Is editing...");
        console.log(this.isediting);
        if (this.isediting) return;

        // In Assembly mode, let's start the component selection dialog
        console.log("Editing: " + this.isediting);
        
        // Deprecated: this.shadowRoot.getElementById("modalSelector").open();
        
        let dlg=new CjSelectItemDialog(this.getComponentOptions(), this.config);
        let self=this;
        dlg.open().then(function(e){
            
            let dlgConf=new CjConfirmSimpleComponent(e.target.picto, self.getComponentOptions());
            dlgConf.open().then(function(selected){

                // WIP: res és el resultat (true/false) de la promesa,
                // si és false, ha de seguir en este diàleg 
                // com que la promesa ja ha estat resolta, el diàleg es
                // tanca i es torna a obrir
                //console.log("En then");

                // Cal revisar el updatestate de cada component
                // i mirar que el diàleg ens torne bé el selectedtoconfirm
                // ara torna undefined
                // ->> Ara si... era el self-this... cal revisar tots els
                // components individualment per modificar el updatestate...
                // Està fet només el del mes...
                // i revisar com apareix el diàleg.. en lloc del 50% que siga un 80 o aixo...

                console.log("!!!!!selected");
                console.log(selected);
                
                if (selected==false) self.handleClick(); 
                else self.updateState(selected);
                dlgConf.close();
            });
            //self.confirmDialog(data);
            dlg.close();

        });
        
    }

    firstUpdated(changedProperties) {
        this.addEventListener('click', this.handleClick);
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

    /*confirmDialog(e) {
        //console.log(e.target.picto);
        this.selectedToConfirm = e.target.picto;
        this.shadowRoot.getElementById("modalConfirm").open();
        //this.shadowRoot.getElementById("modalSelector").close();

    }*/

    /*cancelDialog(e) {
        this.shadowRoot.getElementById("modalConfirm").close();
    }*/

    static get styles() {

        return [
            css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0px;
            cursor: pointer;
            background: rgba(255,255,255,0.5);
            border-radius: 5px;
            -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        }

        :host([isediting]){
            background-color: rgba(255,165,0,0.4);
            cursor:move;
        }

        .componenth1{
            font-size: 10px;
            height: 15%;
            width: 100%;
        }

        span.playBt{
            width: 30px;
            height: 30px;
            position: absolute;
            background-image: url('/assets/img/PlayComponentButton.png');
            background-size: cover;
            bottom: 10px;
            left: 10px;
            z-index:1;
          }
    
          span.playBt:hover{
            width: 30px;
            height: 30px;
            position: absolute;
            background-image: url('/assets/img/PlayComponentButtonHover.png');
            background-size: cover;
            bottom: 10px;
            left: 10px;
          }
    

    `];
    }

    playComponent(e) {
        e.stopPropagation();
        let self=this;
        let dlg=new CjShowDialog(this.getComponentOptions());
        dlg.open().then(function(data){
            console.log("En then");
            console.log(data);
            self.playMedia(data);
        });
        // Deprecated: this.shadowRoot.getElementById("modalPlayMedia").open();
        
    }

    playMedia(e) {
        e.stopPropagation();
        try{
            let currentData, action, type, source;
            
            /*
            WIP: Quan tingam tot el json, de moment només default

            if (typeof(this.data[Object.keys(this.data)[0]]!==undefined))
                currentData=this.data[Object.keys(this.data)[0]];
            else if (typeof(this.data[Object.keys("default")[0]]!==undefined))
                currentData=this.data[Object.keys("default")[0]];*/


            /*console.log();
            if (typeof(this.data[Object.keys("default")[0]]!==undefined))
                currentData=this.data[Object.keys("default")[0]];


            action=this.actions[currentData].onplay.action;
            type=this.actions[currentData].onplay.type;
            source=this.actions[currentData].onplay.source;
            */


           action=this.actions.default.onplay.action;
           type=this.actions.default.onplay.type;
           source=this.actions.default.onplay.source;

            //console.log(action+" "+type+" "+source);

            // By now only working with youtube
            if (action=="video" && type=="youtube" && typeof(source)!==undefined)
            {
                this.youtubeurl=source;

                this.dispatchEvent(new CustomEvent('playMedia', {
                    bubbles: true,
                    composed: true,
                    detail: { url: source }
                }));
                // ModalConfirm defined in simple-component.js
                //this.shadowRoot.getElementById("modalConfirm").close();


                
                //this.shadowRoot.getElementById("youtubePlayer").open();
            }

        } catch(e)
        {
            console.log("No hi ha video associat");
            console.log(e);
        }

        // console.log(action+" "+type+" "+source);

        
        


    }

    render() {

        /*let configArray = new Array();
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
*/
        let componentOptions = this.getComponentOptions();

        console.log(componentOptions);

        
        return html`
        <style>
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

            /*.selectablePicto{
                width:200px;
                height:200px;
                float: left;
                margin:10px;
                transition: all ease 0.5s;

            }
            .selectablePicto:hover{
                transform: scale(1.2);
            }*/

/*
            .mediaPlay{

                /*background-color: #ffff00;* /
                width: 80%; 
                margin-top: -100px;
                padding:0px; 
                overflow: visible;
                height: 100px;
                position: relative;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                display: inline-block;
                transition: all ease 0.3s;
                background-image: url("assets/img/PlayContentButton.png"); 
            }*/


        </style>


        <slot name="margins"></slot>
        ${!this.isediting ?
                html`<span class="playBt" @click=${function (e) { this.playComponent(e); }} ></span>`
                : ''}
        <div class="component" style="width:100px; height:100px; transform-origin: top left;">
            <div style="height:15px; width:100px;" class="componenth1">${componentOptions.headerTitle}</div>
            <cj-picto picto="${componentOptions.currentPicto}" label="${componentOptions.currentLabel}"></cj-picto>
        </div>


        <!-- Deleted -->

            <!--dile-modal showCloseIcon 
                        style="--dile-modal-background-color: rgba(0,255,0,0.0); --dile-modal-width:1000px; "
                        id="modalConfirm" >
                        <h1 class="dlgHeader">$ {translate("component.verify")}</h1>

                        <cj-picto picto="${this.selectedToConfirm}" 
                        style="margin: 0px auto; display: inline-block;"
                        label="$ {translate(componentOptions.componentPrefix + this.selectedToConfirm)}"
                        pictowidth=500 pictoheight=500></cj-picto>

                        <div style="/*background-color: #ffff00;*/
                                    width: 100%; 
                                    height: 180px; 
                                    /*margin-left: -100px;*/
                                    /*margin-top: -80px; */
                                    padding:0px; 
                                    overflow: visible">
                            <div class="thumbup" @click=$ {function (e) { this.updateState(e); }}></div>
                            <div class="thumbdown" @click=$ {function (e) { this.cancelDialog(e); }}></div>
                        </div>
                
            </dile-modal-->

            <!-- Dialog for media play -->
            <!--dile-modal showCloseIcon 
                style="--dile-modal-width:1000px; "
                id="modalPlayMedia" >  
                <h2 style="margin: 10px;">$ {componentOptions.currentLabel}</h2>
                <cj-picto picto="$ {componentOptions.currentPicto}" 
                    style="margin: 0px auto; display: inline-block;"
                    label=""
                    pictowidth=500 pictoheight=500></cj-picto>
                    <div class="mediaPlay" @click=$ {function (e) { this.playMedia(e); }}></div>

            </dile-modal>-- 

            <!-- Dialog for media play -- >
            <dile-modal showCloseIcon 
                style="--dile-modal-width:1000px; "
                id="youtubePlayer" >  
                < !--https://googlewebcomponents.github.io/google-youtube/components/google-youtube/ -- >

                <iframe width="1280" height="720" 
                    src="https://www.youtube.com/embed/${this.youtubeurl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>

            </dile-modal--> 
        
        `;
    }

}
customElements.define('simple-component', SimpleComponent);                
