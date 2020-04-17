import { css } from 'lit-element';

export const CjAppStyle = css`

:host {
  width: 100%; 
  height: 100%;
}

#appContainer{
  background-color: rgba(255,255,255,0.4);
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: #1a2b42;
  
  text-align: center;
  font-family: 'Mali', cursive;

  transform-origin: top left;
  
  position: relative;
  width: 1200px;
  height: 750px;
}


`;