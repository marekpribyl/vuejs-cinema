import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

//event bus
import { checkFilterHandler } from "./util/bus";
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

new Vue({
    el: '#app',
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
        this.$bus.$on('check-filter-event', checkFilterHandler.bind(this))
    },
    components: {
        MovieList,
        MovieFilter
    }
});