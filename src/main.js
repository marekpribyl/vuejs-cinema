import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment()
    },
    methods: {
        checkFilterHandler(category, title, state) {
            if (state) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },
    created() {
        this.$http.get('/api').then(res => {
            this.movies = res.data;
        })
    },
    components: {
        MovieList,
        MovieFilter
    }
});