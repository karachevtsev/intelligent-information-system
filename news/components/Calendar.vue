<template>
    <div class="box mb-30 box-calendar">
        <div class="box-header">
            <h2>Календар новин</h2>
        </div>
        <div class="box-content pb-0">
            <ClientOnly>
                <CalendarMonth/>
            </ClientOnly>
        </div>
    </div>
</template>

<script>
import CalendarMonth from "./calendar/CalendarMonth";

export default {
    name: "Calendar",
    components: [CalendarMonth],
}
</script>

<style lang="scss">
.box-calendar {
    display: none;

    @include laptop-xl() {
        display: block;
    }
}
</style>
