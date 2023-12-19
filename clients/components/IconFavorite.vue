<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" fill="none" viewBox="0 0 18 25">
        <path d="m17 24-8-5-8 5V2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v22Z" :stroke="iconColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
    </svg>
</template>

<script>
export default {
    name: "IconFavorite",
    props: {
        width: {
            type: [Number, String],
            default: 18
        },
        height: {
            type: [Number, String],
            default: 25
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        }
    }
}
</script>
