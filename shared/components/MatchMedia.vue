<script lang="ts">
import { inject, SetupContext } from 'vue';

export default {
    setup(props: {}, { slots }: SetupContext) {
        const mediaQueries = inject('mediaQueries');
        return () => slots.default!(mediaQueries);
    },
};
</script>

