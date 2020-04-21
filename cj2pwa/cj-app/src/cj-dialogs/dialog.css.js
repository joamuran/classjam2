import { css } from 'lit-element';

export const cjDialogStyle = css`

/* General Dialogs */

.dlgHeader{
  font-size: calc(10px + 2vmin);
  padding: 0px;
  margin: 10px;
}

/*div[slot="content"]{
  height:100%;
  display: flex;
  flex-direction: column;
  align-items:stretch;
}*/

div[slot="content"]{
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: stretch;
}


p{
  flex-grow: 1;
}

.cjBt {
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  padding: 10px 24px;
  opacity: 0.7;

  display: flex;
  flex-flow: row;
  margin: 5px 10px 5px 10px;
}

.cjBt:hover{
  opacity: 1;
}

.cjBtGreen {
  background-color: #4CAF50;
  left: 20%;
  
}

.cjBtRed {
  background-color: #f44336;
  right: 20%;
}

.cjBtRedWhite {
  border: 1px solid #f44336;
  background-color: #ffffff;
  color: #f44336;
  transition: all ease 0.3s;
}

.cjBtRedWhite:hover {
  border: 1px solid #ffffff;
  background-color: #f44336;
  color: #ffffff;
}

h1{
  padding-bottom: 50px;
}

.cjButtonPanel{
  background-color: #dddddd;
  padding: 15px 0px;
  width: 100%;
  position: absolute;
  bottom: 0px;

  display: flex;
    align-items: center;
    justify-content: center;
}

/* Cj Show Dialog */

.mediaPlay{
  width: 100%; 
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
  }

.mediaBt{
  width: 32px;
  height: 32px;
  margin-right: 15px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  transition: all ease 0.3s;
  background-image: url("assets/img/PlayContentButton.png"); 
  }



`;
