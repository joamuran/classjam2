import { render, html } from 'lit-html';
import { CjDialog } from './cj-dialog';
import { cjDialogStyle } from './dialog.css';

export class CjYoutubeDialog {
    constructor(content) {
        let self=this;
        this.content = {};
        this.content.url = content.url;

        this.content.header = "Getting video info..";

        typeof(content.BtCancel)!="undefined" ?
         this.content.BtCancel=content.BtCancel :
          this.content.BtCancel="Close";
        
        /*this.getYoutubeInfo(content.url).then(function(data){
            alert(data.title);
        });*/

        let p=this.getYoutubeInfo(content.url);
        p.then(function(data){
            //console.log (data.items[0].snippet.title);
            self.content.header = data.items[0].snippet.title;
            self.Dialog.querySelector("#h1title").innerHTML=self.content.header;

        });
        

        //this.id = Date.now();
        //this.cjMediaDialog = null;
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
            <h1 class="dlgHeader" id="h1title">${this.content.header}</h1>
            <iframe name="content" width="100%" height="700" id="iframe"
                src="https://www.youtube.com/embed/${this.content.url}?autoplay=1" 
                frameborder="0" 
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
          </iframe>
          <div class="cjButtonPanel">
                <button class="cjBt cjBtRed" @click=${function (e) {
                        //console.log("Clicked on No");
                        res(false);
                    }}>${this.content.BtCancel}</button>
            </div>
        </div>
        `

        this.Dialog = document.createElement("cj-dialog");
        this.Dialog.setAttribute("width", 100);
        this.Dialog.setAttribute("height", 100);

        render(content, this.Dialog);
        document.body.appendChild(this.Dialog);

        //console.log(ret);
        return ret;

    }

    getYoutubeInfo(videoId){
        let gUrl="http://www.joamuran.net/classroom-assembly/getVideoInfo.php?id="+videoId;
        
        return fetch(gUrl)
        .then(function(data){
            try{
                return data.json();
            }   catch(err){
                return false;
            }
        });
        /*.then(function(resp){
            response.resolve resp.items[0].snippet;
        });
        
        return response;*/
    };

    close() {
        this.Dialog.close();
    }

}