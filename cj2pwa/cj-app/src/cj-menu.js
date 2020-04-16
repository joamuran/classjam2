import { LitElement, html, css } from 'lit-element';
import { translate } from "@appnest/lit-translate"; // i18n

import {cjQuestionDialog} from './cj-media-dialog'

export class CjMenu extends LitElement {

    constructor() {
        super();
        this.menuHidden = true;
        this.isediting = false;
        this.tr=translate;

    }

    static get styles() {
        return css`
        /* Icons */

        #controlPanel{
            transition: ease all 0.3s;
        }

        .controlButton{
            width: 64px;
            height: 64px;
            margin: 10px;
            float: right;
            background-size: cover;
            background-repeat: no-repeat;
            transition: all 0.4s;
            position: fixed;
        }
        .controlButton:hover{
            width: 74px;
            height: 74px;
            margin: 5px;
            cursor: pointer;
            filter: saturate(1.5);
        }

        .controlButton:active{
            filter: brightness(1.3);
        }

        #menuButton{
            background-image: url(assets/img/menu/menu.png);
            position: fixed;
            top: 0px;
            right: 0px;
            z-index: 100;
        }

        #btResetAssembly{ background-image: url( assets/img/menu/restart.png); z-index: 90;}
        #btResetAssembly.visible{
            top: 80px;
            right: 0px; }
            
        #btShowEditMode{ background-image: url( assets/img/menu/editmode.png); z-index: 90;}
        #btShowEditMode.visible{
            top: 160px;
            right: 0px; }

        #btShowPlayerMode{ background-image: url( assets/img/menu/asmode.png); z-index: 90;}
        #btShowPlayerMode.visible{
            top: 160px;
            right: 0px;
        }

        #btSave, #btSaveConfig{ background-image: url(assets/img/menu/save.png); z-index: 80;}
        
        #btSave.visible, #btSaveConfig.visible{
            top: 240px;
            right: 0px;
        }

        #btExport, #btExportConfig{ background-image: url( assets/img/menu/export.png); z-index: 80;}

        #btExport{
            top: 320px;
            right: 0px;
        }

        #btExportConfig.visible{
            top: 320px;
            right: 0px;
        }

        #btOptions{ background-image: url( assets/img/menu/optionsApp.png); z-index: 70;}
        #btOptions.visible{
            top: 80px;
            right: 0px;
        }


        #btSelectLang{ background-image: url(assets/img/menu/lang.png); z-index: 70;}
        #btSelectLang.visible{
            top: 320px;
            right: 0px;
        }

        .btSelectLangClass:hover{
            background-color: orange;
            color: white;
            cursor: pointer;
            width: 20px;
            height: 20px;
        }

        .btSelectLangClass{
            position: fixed;
            margin: 10px;
            background-color: #ffffff;
            right: 80px;
            width: 20px;
            height: 20px;
            border: 1px solid #333333;
            font-family: sans-serif;
            font-stretch: condensed !important;
            font-variant: all-petite-caps;
            border-radius: 3px;
            z-index: 70;
        }

        #btSelectLangCa{ top: 320px; }
        #btSelectLangEs{ top: 350px; }
        #btSelectLangEn{ top: 380px; }

        #btQuit, #btQuitConfig{ background-image: url( assets/img/menu/quit.png); z-index: 70;}
        #btQuit.visible{
            top: 400px;
            right: 0px;
        }

        #btQuitConfig.visible{
            top: 400px;
            right: 0px;
        }

        #btLlxHelp, #btLlxHelpConfig{ background-image: url( assets/img/menu/help.png); z-index: 70;}
        #btLlxHelp.visible{
            /*bottom: 20px;*/
            top: calc(100% - 128px);
            right: 0px;
        }

        #btLlxHelpConfig.visible{
            /*bottom: 20px;*/
            top: calc(100% - 128px);
            right: 0px;
        }


        .buttonhidden{
            top: 0px !important;
            right: 0px !important;
        }

        `
    }

    render() {
        /*return html`
        <button style="position: fixed; z-index: 10; top: 10px; right: 10px;" id="btEdit" @click=${function () { this.toggleEditMode() }}>Edit</button>
        `*/
        //console.log("this.isediting: " + this.isediting);
        return html`
        <div id="menuButton" class="controlButton" @click=${function (e) { this.ToggleMenu(e) }}></div>
			
			<div id="controlPanel">	
				<div id="controlPanelPlayer">
					<div class="controlButton buttonhidden" id="btResetAssembly" title=${translate("menu.StartAssembly")} @click=${function () { this.resetAssembly() }}></div>
					<div class="controlButton buttonhidden" id="btShowEditMode" title=${translate("menu.EditMode")} @click=${function () { this.toggleEditMode() }}></div>
					<!--div class="controlButton buttonhidden" id="btSave" title=${translate("menu.Save")} @click=${function () { this.saveAssembly() }}></div>
					<div class="controlButton buttonhidden" id="btExport" title=${translate("menu.Export")}></div-->

                    <div class="controlButton buttonhidden" id="btSelectLang" title=${translate("menu.SelectLang")} @click=${function () { this.showLangSelector() }}></div>
                    <div class="btSelectLangClass" style="visibility: hidden;" id="btSelectLangCa" title=${translate("menu.ca")} @click=${function () { this.switchLanguage("ca") }}>VA</div>
                    <div class="btSelectLangClass" style="visibility: hidden;" id="btSelectLangEs" title=${translate("menu.es")} @click=${function () { this.switchLanguage("es") }}>ES</div>
                    <div class="btSelectLangClass" style="visibility: hidden;" id="btSelectLangEn" title=${translate("menu.en")} @click=${function () { this.switchLanguage("en") }}>EN</div>
                    
					<div class="controlButton buttonhidden" id="btQuit" title=${translate("menu.Quit")} @click=${function () { this.exitApp() }}></div>
					<!--div class="controlButton buttonhidden" id="btLlxHelp" title=${translate("menu.Help")}></div-->

					<!--input type="file" id="exportDialog" nwsaveas="assemblea.zip" />
					<input type="file" id="importDialog"/-->
					<!--div class="controlButton buttonhidden" id="btOptions" title=${translate("menu.Options")}></div-->
				</div>
				<div id="controlPanelEdit" style="display:none">
					<!--div class="controlButton buttonhidden" id="btOptions" title=${translate("menu.Options")}></div-->
					<div class="controlButton buttonhidden" id="btShowPlayerMode" title=${translate("menu.PlayerMode")} @click=${function () { this.toggleEditMode() }}></div>
					<!--div class="controlButton buttonhidden" id="btSaveConfig" title=${translate("menu.SaveConfig")} @click=${function () { this.saveAssembly() }}></div-->
					<!--div class="controlButton buttonhidden" id="btExportConfig" title=${translate("menu.Export")}></div-->
                    
                    <div class="controlButton buttonhidden" id="btSelectLang" title=${translate("menu.SelectLang")} @click=${function () { this.showLangSelector() }}></div>
                    <div class="btSelectLangClass" style="visibility: hidden;" id="btSelectLangCa" title=${translate("menu.ca")} @click=${function () { this.switchLanguage("ca") }}>VA</div>
                    <div class="btSelectLangClass" style="visibility: hidden;" id="btSelectLangEs" title=${translate("menu.es")} @click=${function () { this.switchLanguage("es") }}>ES</div>
                    <div class="btSelectLangClass" style="visibility: hidden;" id="btSelectLangEn" title=${translate("menu.en")} @click=${function () { this.switchLanguage("en") }}>EN</div>
                    
					<div class="controlButton buttonhidden" id="btQuitConfig" title=${translate("menu.Quit")} @click=${function () { this.exitApp() }}></div>
					<!--div class="controlButton buttonhidden" id="btLlxHelpConfig" title=${translate("menu.Help")}></div-->
                </div>
            </div>
        `;
    }



    showControlPanel() {
        let controlPanel = this.shadowRoot.querySelector("#controlPanel");
        if (controlPanel) controlPanel.style.visibility = "visible";

        let hiddenButtons = this.shadowRoot.querySelectorAll(".controlButton.buttonhidden");
        for (let item of hiddenButtons) {
            console.log(item);
            item.classList.remove("buttonhidden");
            item.classList.add("visible");
            console.log(item);
        }

    }

    hideControlPanel() {
        let controlPanel = this.shadowRoot.querySelector("#controlPanel");
        if (controlPanel) controlPanel.style.visibility = "hidden";

        let hiddenButtons = this.shadowRoot.querySelectorAll(".controlButton.visible");
        for (let item of hiddenButtons) {
            item.classList.remove("visible");
            item.classList.add("buttonhidden");
        };
    }

    showLangSelector(){
        let buttons=this.shadowRoot.querySelectorAll(".btSelectLangClass");
        let visibility;
        if (buttons[0].style.visibility=="hidden") visibility="visible"
        else visibility="hidden";

        for (let i=0;i<buttons.length;i++)
            buttons[i].style.visibility=visibility;
    }

    switchLanguage(lang){
        this.dispatchEvent(new CustomEvent('switchLanguage', {
            bubbles: true,
            composed: true,
            detail: { "lang": lang }
        }))

        this.showLangSelector(); // To hide lang buttons
    }

    ToggleMenu(event) {
        event.stopPropagation();
        if (this.menuHidden) { this.showControlPanel(); }
        else { this.hideControlPanel(); }

        console.log(this.menuHidden);
        this.menuHidden = !this.menuHidden;
    }

    toggleEditMode() {
        this.isediting = !this.isediting;
        if (this.isediting) {
            this.shadowRoot.querySelector("#controlPanelPlayer").style.display = "none";
            this.shadowRoot.querySelector("#controlPanelEdit").style.display = "block";
        } else {
            this.shadowRoot.querySelector("#controlPanelPlayer").style.display = "block";
            this.shadowRoot.querySelector("#controlPanelEdit").style.display = "none";
        }

        // Moderator pattern: Sending event to main class
        this.dispatchEvent(new CustomEvent('toggleEditMode', {
            bubbles: true,
            composed: true/*,
            detail: { url: source }*/
        }))
    }

    resetAssembly(){
        // Moderator pattern: Sending event to main class
        this.dispatchEvent(new CustomEvent('resetAssembly', {
            bubbles: true,
            composed: true
        }))
    }

    exitApp(){
        /*console.log(this.tr("month-component.title"));
        console.log(this.tr("menu.confirmexit"));
        let confirmation=confirm(translate("menu.confirmexit"));*/
        
        
        /*let confirmation=confirm("Desitgeu eixir?");
        if (confirmation) document.location="/";   */

        let myConfirm=new cjQuestionDialog("Desitgeu eixir?");
        let response=myConfirm.open();
        response.then(function(a){
            console.log("En el then");
            console.log(a);
        });


    }

    saveAssembly(){
        console.log("save");
    }

    

}
customElements.define('cj-menu', CjMenu);