<template>
    <div id="overview">
        <div id="main">
            <day-select :selected="day"></day-select>
            <movie-list :genre="genre" :time="time" :movies="movies" :day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    import DaySelect from './DaySelect.vue';

    export default {
        name: "overview",
        props: ['genre', 'time', 'movies', 'day'],
        components: {
            DaySelect,
            MovieList,
            MovieFilter
        }
    }
</script>

<style scoped>

</style>