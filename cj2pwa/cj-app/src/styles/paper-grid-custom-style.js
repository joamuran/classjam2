import { css } from 'lit-element';

export const PaperGridCustomStyle = css`

paper-grid > div {
  background: #ff4d43;
  opacity: 0.9;
  color: white;
  cursor: move;
  overflow: hidden;
  font-size: 12px;
}

paper-grid > div[placeholder] {
  background: #ffc107;
}

paper-grid [resize] {
  position: absolute;
  z-index:10;
}

paper-grid [resize="bottom-right"] {
  bottom: 0;
  right: 0;
  cursor: nwse-resize;

  width: 0;
  height: 0;
  border-bottom: 10px solid #ffa000;
  border-left: 10px solid transparent;


}

paper-grid [resize="bottom-left"] {
  bottom: 0;
  left: 0;
  cursor: nesw-resize;

  width: 0;
  height: 0;
  border-bottom: 10px solid #ffa000;
  border-right: 10px solid transparent;


}

paper-grid [resize="top-right"] {
  top: 0;
  right: 0;
  cursor: nesw-resize;
  
  width: 0;
  height: 0;
  border-top: 10px solid #ffa000;
  border-left: 10px solid transparent;
}

paper-grid [resize="top-left"] {
  top: 0;
  left: 0;
  cursor: nwse-resize;
  
  width: 0;
  height: 0;
  border-top: 10px solid #ffa000;
  border-right: 10px solid transparent;
}

paper-grid [resize="left"] {
  top: 50%;
  left: 0;
  cursor: ew-resize;
  margin-top: -10px;
}

paper-grid [resize="top"] {
  top: 0%;
  width: 100%;
  text-align: center;
  cursor: ns-resize;
}

paper-grid [resize="right"] {
  top: 50%;
  right: 0;
  cursor: ew-resize;
  margin-top: -10px;
}

paper-grid [resize="bottom"] {
  bottom: 0;
  width: 100%;
  text-align: center;
  cursor: ns-resize;
}




`;