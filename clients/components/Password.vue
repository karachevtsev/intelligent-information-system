<template>
    <div class="password-field">
        <Field v-bind="$attrs"
               v-on="{input:(e) => $emit('input', e.target.value)}"
               :type="show ? 'text' : 'password'"
               class="form-control"
        />
        <svg-icon @click="show = !show"
                  name="visible"
                  :class="show ? 'visible-on' : 'visible-off'"
                  class="toggle-field-type "
        />
    </div>
</template>

<script lang="ts">
import { Field } from 'vee-validate';
import SvgIcon from 'dtkt-shared/components/SvgIcon.vue';

export default {
    inheritAttrs: false,
    components: { Field, SvgIcon },
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style lang="scss">
.password-field {
    .toggle-field-type {
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;

        svg {
            width: 20px;
            height: 14px;

            .off {
                fill: #999999;
            }
        }

        &.visible-on {
            svg {
                height: 17px;

                .off {
                    fill: transparent;
                }

                .on {
                    fill: #999999;
                }
            }
        }
    }
}
</style>
