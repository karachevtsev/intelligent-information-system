<template>
    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path
            d="m10 1.618 1.77 5.446.112.346h6.09l-4.633 3.366-.294.213.112.346 1.77 5.446-4.633-3.366-.294-.213-.294.213-4.633 3.366 1.77-5.446.112-.346-.294-.213L2.028 7.41h6.09l.112-.346L10 1.618Z"
            :stroke="iconColor"/>
    </svg>
</template>

<script>
export default {
    name: "IconFavorite",
    props: {
        width: {
            type: [Number, String],
            default: 20
        },
        height: {
            type: [Number, String],
            default: 20
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        }
    }
}
</script>
