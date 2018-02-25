<template>
    <div id="detail" v-if="movie">
        <movie-item :movie="movie">
            <div class="movie-details">
                <p class="movie-genre">{{ movie.Genre }}</p>
                <p class="movie-plot">{{ movie.plot }}</p>
                <table>
                    <tr><td>Release Date:</td><td>{{ movie.Released }}</td></tr>
                    <tr><td>Running Time:</td><td>{{ movie.Runtime }}</td></tr>
                    <tr><td>Director:</td><td>{{ movie.Director }}</td></tr>
                    <tr><td>Cast:</td><td>{{ movie.Actors }}</td></tr>
                </table>
            </div>
        </movie-item>
        <div class="home">
            <router-link :to="{ 'name': 'home'}">Back to list...</router-link>
        </div>
    </div>
    <div v-else>No movie with provided ID</div>
</template>

<script>
    import MovieItem from "./MovieItem.vue";

    export default {
        components: {MovieItem},
        name: "detail",
        props: [ 'movies', 'sessions', 'day', 'time' ],
        computed: {
          movie() {
                let movie = this.movies.find(movie => movie.id === this.$route.params.id);
                return movie ? movie.movie : null;
          }
        },
        created() {
            console.log(this.$route);
        }
    }
</script>

<style scoped>

</style>