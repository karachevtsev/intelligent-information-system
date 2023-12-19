<template>
    <div class="dk-adsbygoogle">
        <ins
            class="adsbygoogle"
            data-ad-client="ca-pub-8744526578727825"
            :data-ad-slot="slot"
            v-bind="$attrs"
        >
        </ins>
    </div>
</template>
<script>
export default {
    props: {
        'slot': {
            slot: String,
            default: ''
        }
    },
    mounted() {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
    },
}
</script>
