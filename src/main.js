import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    components: {
        'movie-list': {
            template:
                `<div class="movie-list">
                    <div class="movie">movie goes here</div>
                </div>`
        },
        'movie-filter': {
            data() {
                return { genres }
            },
            methods: {
                checkFilterHandler() {
                    console.log('checked');
                }
            },
            template: `<div id="movie-filter">
                   <h2>Filter Results</h2>
                   <div class="filter-group">
                     <check-filter v-for="genre in genres" :title="genre" v-on:check-filter-event="checkFilterHandler"></check-filter>
                   </div>
                </div>`,
            components:{
                'check-filter': {
                    data() {
                        return {
                            checked: false
                        }
                    },
                    props: [
                        'title'
                    ],
                    methods: {
                      checkFilter() {
                          this.checked = !this.checked;
                          this.$emit('check-filter-event');
                      }
                    },
                    template: `<div :class="{ 'check-filter': true, 'active': checked }" @click="checkFilter">
                            <span class="checkbox"></span>
                            <span class="check-filter-title">{{ title }}</span> 
                            </div>`
                }
            }
        }
    }
});