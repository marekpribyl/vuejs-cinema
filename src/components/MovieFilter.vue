<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By time of day</h3>
        <div class="filter-group">
            <check-filter v-for="time in times" category="time" :title="time" v-on:check-filter-event="checkFilterHandler"></check-filter>
        </div>
        <h3>By genre</h3>
        <div class="filter-group">
            <check-filter v-for="genre in genres" category="genre" :title="genre" v-on:check-filter-event="checkFilterHandler"></check-filter>
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from './CheckFilter.vue'

    export default {
        name: 'movie-filter',
        data() {
            return { genres, times }
        },
        methods: {
            checkFilterHandler(category, title, state) {
                this.$emit('check-filter-event', category, title, state);
            }
        },
        components:{
            CheckFilter
        }

    }
</script>
