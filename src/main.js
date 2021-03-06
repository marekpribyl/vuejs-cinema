import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Tooltip from './util/tooltip';
Vue.use(Tooltip);

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