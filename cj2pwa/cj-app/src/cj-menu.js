import { LitElement, html, css } from 'lit-element';

export class CjMenu extends LitElement {

    constructor() {
        super();
        this.menuHidden = true;
        this.isediting=false;
        
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
        console.log("this.isediting: "+this.isediting);
        return html`
        <div id="menuButton" class="controlButton" @click=${function (e) { this.ToggleMenu(e) }}></div>
			
			<div id="controlPanel">	
				<div id="controlPanelPlayer">
					<div class="controlButton buttonhidden" id="btResetAssembly" title="Start Assembly" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btShowEditMode" title="Edit Mode" @click=${function () { this.toggleEditMode() }}></div>
					<div class="controlButton buttonhidden" id="btSave" title="Save" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btExport" title="Export" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btQuit" title="Quit" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btLlxHelp" title="Help" i18n="i18n"></div>
					<!--input type="file" id="exportDialog" nwsaveas="assemblea.zip" />
					<input type="file" id="importDialog"/-->
					<!--div class="controlButton buttonhidden" id="btOptions" title="Options"></div-->
				</div>
				<div id="controlPanelEdit" style="display:none">
					<div class="controlButton buttonhidden" id="btOptions" title="Options" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btShowPlayerMode" title="Player Mode" @click=${function () { this.toggleEditMode() }}></div>
					<div class="controlButton buttonhidden" id="btSaveConfig" title="Save Config" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btExportConfig" title="Export" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btQuitConfig" title="Quit" i18n="i18n"></div>
					<div class="controlButton buttonhidden" id="btLlxHelpConfig" title="Help" i18n="i18n"></div>
                </div>
            </div>
        `;
    }


    
showControlPanel() {
    let controlPanel = this.shadowRoot.querySelector("#controlPanel");
    if (controlPanel) controlPanel.style.visibility = "visible";

    let hiddenButtons = this.shadowRoot.querySelectorAll(".controlButton.buttonhidden");
    for (let item of hiddenButtons){
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
    for (let item of hiddenButtons){
        item.classList.remove("visible");
        item.classList.add("buttonhidden");
    };
}


ToggleMenu(event) {
    event.stopPropagation();
    if (this.menuHidden) { this.showControlPanel(); }
    else { this.hideControlPanel(); }

    console.log(this.menuHidden);
    this.menuHidden = !this.menuHidden;
}

toggleEditMode() {
    this.isediting=!this.isediting;
    if (this.isediting){
        this.shadowRoot.querySelector("#controlPanelPlayer").style.display="none";
        this.shadowRoot.querySelector("#controlPanelEdit").style.display="block";
    } else {
        this.shadowRoot.querySelector("#controlPanelPlayer").style.display="block";
        this.shadowRoot.querySelector("#controlPanelEdit").style.display="none";
    }

    this.dispatchEvent(new CustomEvent('toggleEditMode', {
        bubbles: true,
        composed: true/*,
            detail: { url: source }*/
    }))
}




}
customElements.define('cj-menu', CjMenu);