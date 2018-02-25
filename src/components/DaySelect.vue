<template>
    <div id="day-select">
        <ul class="days">
            <li v-for="day in days" :class="{ day: true, active: isSelected(day) }" @click="selectDay(day)">
                {{ formatDay(day) }}
            </li>
            <li class="day-selector">
                <span class="dec" @click="changeDay(-1)"></span>
                <span class="inc" @click="changeDay(1)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "day-select",
        props: [ 'selected' ],
        data() {
            return {
                days: [0, 1, 2, 3, 4, 5].map(num => this.$moment().add(num, 'days'))
            };
        },
        methods: {
            formatDay(date) {
                if (date.isSame(this.$moment(), 'day')) {
                    return 'Today';
                }
                return date.format('ddd DD/MM');
            },
            isSelected(day) {
                return day.isSame(this.selected);
            },
            selectDay(day) {
                this.$bus.$emit('set-day-event', day);
            },
            changeDay(change) {
                let newDay = this.$moment(this.selected).add(change, 'day');
                if (this.days.find(day => newDay.isSame(day, 'day'))) {
                    this.selectDay(newDay);
                }
            }
        }
    }
</script>

<style scoped>

</style>