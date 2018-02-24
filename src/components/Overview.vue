<template>
    <div id="overview">
        <div id="main">
            <movie-list :genre="genre" :time="time" :movies="movies" :day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';

    export default {
        name: "overview",
        props: ['genre', 'time', 'movies', 'day'],
        components: {
            MovieList,
            MovieFilter
        }
    }
</script>

<style scoped>

</style>