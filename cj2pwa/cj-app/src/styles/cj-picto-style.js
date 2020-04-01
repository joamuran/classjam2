import { css } from 'lit-element';

export const CjPictoStyle = css`

.iconPictoText{
    font-size: 12px;
    height: 15%;
    width: 100%;
}

.iconPicto{
    width: 100%;
    height: 85%;
    background-size: contain;
    background-repeat: no-repeat;
    transition: all 0.4s;
    background-position: center;
    overflow: hidden;
}        


.spring{
    background-image: url("/assets/img/spring.png");
}

.summer{
    background-image: url("/assets/img/summer.png");
}

.autumn{
    background-image: url("/assets/img/autumn.png");
}

.winter{
    background-image: url("/assets/img/winter.png");
}

`;