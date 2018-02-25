//tooltip as custom directive

import { addClass, removeClass, hasClass }from './helpers';

let onMouseOver = function (event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span, 'tooltip-show');
};

let onMouseOut = function (event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span, 'tooltip-show');
};

export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                let span = document.createElement('SPAN');
                let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                el.appendChild(span);
                let div = el.getElementsByTagName('DIV')[0];
                div.addEventListener('mouseover', onMouseOver);
                div.addEventListener('mouseout', onMouseOut);
                //for touch devices
                div.addEventListener('touchstart', onMouseOver);
                div.addEventListener('touchend', onMouseOut);
            },
            unbind(el) {
                let div = el.getElementsByTagName('DIV')[0];
                div.removeEventListener('mouseover', onMouseOver);
                div.removeEventListener('mouseout', onMouseOut);
                //for touch devices
                div.removeEventListener('touchstart', onMouseOver);
                div.removeEventListener('touchend', onMouseOut);
            }
        });
    }
}