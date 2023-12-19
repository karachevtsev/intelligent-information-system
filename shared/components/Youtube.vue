<template>
    <div class="embed-responsive embed-responsive-16by9">
        <div :id="id"
             class="embed-responsive-item"
             :class="{'is-loading': loading}"
        >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import getYT from '../utils/getYT';

const props = defineProps({
    id: String
});

const loading = ref(true);
const player = ref<any>(null);

onMounted(async () => {
    const YT = await getYT();
    const onPlayerReady = (event: any) => {
        console.log('onPlayerReady');

        loading.value = false;
    };

    const onPlayerStateChange = (event: any) => {
        console.log({ event });
    };

    // @ts-ignore
    window.onYouTubeIframeAPIReady = function () {
        console.log('onYouTubeIframeAPIReady');
        loading.value = false;

        player.value = new YT.Player(props.id, {
            videoId: props.id,
            width: '100%',
            height: '100%',
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };
});
</script>
