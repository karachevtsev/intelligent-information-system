<template>
    <Field
        type="text"
        class="form-control"
        v-bind="$attrs"
        v-on="{input: (e) => $emit('input', e.target.value)}"
        v-mask="mask"
        inputmode="tel"
        :value="value"
    />
</template>
<script lang="ts">
import { Field } from 'vee-validate';
import * as VueTheMask from 'vue-the-mask';

const { mask } = VueTheMask;

export default {
    components: { Field },
    props: {
        value: {
            default: '',
        },
    },
    computed: {
        mask() {
            let mask = '(0##) ###-##-##';
            const val = `${this.value}`.replace(/\D/g, '');

            if (val.match(/^(380|0)?(3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8]))/)
                || val.match(/^(380|0)?(3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8]))/)
            ) {
                mask = '(0####) #####';
            }

            if (val.match(/^(380|0)?(3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90)/)
                || val.match(/^(380|0)?(3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90)/)
            ) {
                mask = '(0###) ###-###';
            }

            if (val.match(/^(380|0)?([38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|7|9[1-9])/)
                || val.match(/^(380|0)?([38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9])/)
            ) {
                mask = '(0##) ###-####';
            }

            mask = '+38 ' + mask;

            return mask;
        },
    },
    directives: {
        mask,
    },
};
</script>
