<template>
    <div class="calendar">
        <CalendarHeader
            :selectedDate="selectedDate"
            :currentDate="today"
            @dateSelected="selectDate"
        />
        <div class="calendar-weekday">
            <span v-for="weekday in weekDays" :key="weekday">{{ weekday }}</span>
        </div>
        <div class="calendar-days">
            <CalendarDay
                v-for="day in calendarDays"
                :key="day.date"
                :day="day"
                :isToday="day.date === today"
            />
        </div>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday.js';
import 'dayjs/locale/uk.js';
import CalendarHeader from './CalendarHeader'
import CalendarDay from './CalendarDay'

dayjs.extend(weekday);

const {public: {apiBase}} = useRuntimeConfig();
const selectedDate = ref(dayjs().locale('uk'));
const listOfContentDates = ref([]);
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

const today = computed(() => {
    return dayjs().format("YYYY-MM-DD");
})

const selectDate = (newSelectedDate) => {
    selectedDate.value = newSelectedDate;
}

const getWeekday = (date) => {
    return dayjs(date).weekday()
}

const month = computed(() => {
    return Number(selectedDate.value.format("M"));
})

const year = computed(() => {
    return Number(selectedDate.value.format("YYYY"));
})

const numberOfDaysInMonth = computed(() => {
    return dayjs(selectedDate.value).daysInMonth();
})

const currentMonthDays = computed(() => {
    return [...Array(numberOfDaysInMonth.value)].map((day, index) => {
        const hasContent = listOfContentDates.value.includes(index + 1)

        return {
            date: dayjs(`${year.value}-${month.value}-${index + 1}`).format("YYYY-MM-DD"),
            isCurrentMonth: true,
            hasContent: hasContent,
        };
    });
})

const previousMonthDays = computed(() => {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays.value[0].date);
    const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(1, "month");
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays.value[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
            return {
                date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format("YYYY-MM-DD"),
                isCurrentMonth: false,
                hasContent: false,
            };
        }
    );
})

const nextMonthDays = computed(() => {
    const lastDayOfTheMonthWeekday = getWeekday(`${year.value}-${month.value}-${currentMonthDays.value.length}`);
    const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
            isCurrentMonth: false,
            hasContent: false,
        };
    });
})

const calendarDays = computed(() => {
    return [
        ...previousMonthDays.value,
        ...currentMonthDays.value,
        ...nextMonthDays.value
    ];
})

const fetchContentDates = async (month, year) => {
    const {data: days} = await $fetch('/news/content/calendar', {
        method: 'GET',
        baseURL: apiBase,
        params: {
            month: month,
            year: year
        }
    });

    listOfContentDates.value = [...days.days];
}

await fetchContentDates(month.value, year.value);

watch(selectedDate, async (value) => {
    const month = Number(value.format("M"));
    const year = Number(value.format("YYYY"));
    await fetchContentDates(month, year);
})
</script>

<style lang="scss">
.calendar {
    font-size: 15px;
    font-weight: 400;

    &-header {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        padding: 0 10px;
        background-color: $color-main;
        border-radius: 4px;

        span {
            font-weight: 500;
            line-height: 30px;
            text-align: center;
            text-transform: capitalize;
            color: $white;
        }
    }

    &-prev,
    &-next {
        display: block;
        width: 30px;
        height: 30px;
        cursor: pointer;
        outline: none;
        border: none;
    }

    &-prev {
        margin-right: auto;
        background: url(@/assets/svg/arrow-calendar.svg) no-repeat center;
    }

    &-next {
        margin-left: auto;
        background: url(@/assets/svg/arrow-calendar.svg) no-repeat center;
        transform: rotate(180deg);
    }

    &-weekday {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 6px 0;
            text-align: center;
            text-transform: uppercase;

            &:nth-child(6),
            &:nth-child(7) {
                color: #BE4949;
            }
        }
    }

    &-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    &-day {;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 0;

        > * {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 28px;
            height: 28px;
            line-height: 28px;
            border: 1px solid transparent;
            border-radius: 4px;
        }

        > a {
            border-color: #EDEDEF;
            text-decoration: none;

            &:hover {
                background: #EDEDEF;
            }
        }

        &.not-current {
            opacity: 0.3;
        }

        &.current {
            > * {
                background: $color-main;
                border-color: $color-main;
                color: $white;
            }

            > a {
                &:hover {
                    background: #EDEDEF;
                    color: $color-main;
                    border-color: #EDEDEF;
                }
            }
        }

        &:nth-child(7n-1),
        &:nth-child(7n) {
            color: #BE4949;
        }
    }
}
</style>
