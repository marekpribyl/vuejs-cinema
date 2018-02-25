import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

//event bus
import {checkFilterHandler } from "./util/bus";
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import routes from './util/routes'
const router = new VueRouter( { routes } );

new Vue({
    el: '#app',
    router: router,
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('/api').then(res => {
            this.movies = res.data;
        });
        this.$bus.$on('check-filter-event', checkFilterHandler.bind(this));
        this.$bus.$on('set-day-event', (day) => { this.day = day });
    }
});

//tooltip as custom directive

import { addClass, removeClass, hasClass }from './util/helpers';

let onMouseOver = function (event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span, 'tooltip-show');
};

let onMouseOut = function (event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span, 'tooltip-show');
};

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