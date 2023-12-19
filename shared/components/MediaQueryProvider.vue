<script lang="ts">
import { onMounted, onUnmounted, provide, reactive, SetupContext } from 'vue';

export default {
    props: {
        queries: {
            type: Object,
            required: true,
        },
        fallback: [String, Array],
        ssr: {
            type: Boolean,
        },
    },
    setup(props: { queries: Record<string, string>, fallback?: string | string[], ssr?: boolean }, { slots, emit }: SetupContext) {
        const mediaQueries = reactive<Record<string, boolean>>({});
        const matchers: Array<[MediaQueryList, any]> = [];
        Object.keys(props.queries).forEach(key => { mediaQueries[key] = false; });

        if (props.fallback) {
            if (Array.isArray(props.fallback)) {
                props.fallback.forEach(key => { mediaQueries[key] = true; });
            } else {
                mediaQueries[props.fallback] = true;
            }
        }

        onMounted(() => {
            for (const key in props.queries) {
                const query = props.queries[key];

                const matcher = window.matchMedia(query);
                const handler = (event: MediaQueryListEvent) => {
                    emit(`change:${key}`, event);
                    mediaQueries[key] = event.matches;
                };
                // using deprecated method because of Safari's poor support for addEventListener
                matcher.addEventListener('change', handler);
                mediaQueries[key] = matcher.matches;
                matchers.push([matcher, handler]);
            }
        });

        onUnmounted(() => {
            matchers.forEach(([matcher, listener]) => {
                matcher.removeEventListener('change', listener);
            });
        });

        provide('mediaQueries', mediaQueries)

        return () => slots.default!();
    },
};


</script>
