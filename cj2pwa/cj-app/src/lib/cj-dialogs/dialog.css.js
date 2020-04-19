import { css } from 'lit-element';

export const cjDialogStyle = css`

div[slot="content"]{
  height:100%;
  display: flex;
  flex-direction: column;
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
}

.cjBt:hover{
  opacity: 1;
}

.cjBtGreen {
  background-color: #4CAF50;
  /*position: absolute;
  bottom: 20px;*/
  left: 20%;
  
}

.cjBtRed {
  background-color: #f44336;
  */position: absolute;
  bottom: 20px;*/
  right: 20%;
}

h1{
  padding-bottom: 50px;
}

.cjButtonPanel{
  background-color: #dddddd;
  /*height: 20%;*/
  padding: 15px 0px;
  width: 100%;
  position: absolute;
  bottom: 0px;
}
`;
