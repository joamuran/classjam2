import { LitElement, html, css } from 'lit-element';

export class WeatherComponent extends LitElement {

    static get properties() {
        return {
            config: { type: Object },
            data: { type: Object }    // configuració importada del JSON, s'estableix via atribut a l'etiqueta
        };
    }
        
    static get styles() {
        return css`
    :host {
        display: block;
        width: 100px;
        height: 100px;
        background-color: #ff0000;
    }
    `;
    }

    render() {
        
        return html`
        <div style="width:100px; height: 100px;background-color:blue">
            <div>Weather Component</div>
            <slot name="margins"></slot>
        <div>
        `;
    }
}
customElements.define('weather-component', WeatherComponent);