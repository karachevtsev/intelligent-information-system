<template>
    <div class="mailing-status">
        <div class="mailing-receive"
             :class="{'is-receive': isReceive}"
        >
            {{ isReceive ? 'Отримую ' : 'Не отримую' }}
        </div>
        <label class="mailing-toggle">
            <input type="checkbox"
                   class="mailing-toggle-checkbox"
                   :value="id"
                   @click="toggleMailing($event, mailingType)"
                   :checked="isReceive"
            >
            <span class="mailing-toggle-slider"><span></span></span>
        </label>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp, useRuntimeConfig } from '#app';

const { $client, $bus } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();

const props = defineProps({
    status: String,
    id: Number,
    mailingType: String,
});

const isReceive = ref(props.status || false);

const send = async (data: Object) => {
    return await $fetch('/mailing', {
        baseURL: apiBase,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
};

const clientHasAccess = (ability: String) => {
    return $client.value?.additional?.packages.hasOwnProperty(ability);
};

const toggleMailing = async (e: { preventDefault(): void; target: { checked: boolean; value: number }; }, mailingType: string) => {
    const canReceive = mailingType ? clientHasAccess(mailingType) : true;

    if (canReceive) {
        await send({
            action: e.target.checked ? 'subscribe' : 'unsubscribe',
            id: e.target.value,
        }).then(data => {
            isReceive.value = data.res.subscribe;
        });
    } else {
        e.preventDefault();
        $bus.$emit('openMailingModal', mailingType);
    }
};
</script>

<style lang='scss'>
.mailing-status {
    display: flex;
    align-items: center;
    width: 100%;
    flex-grow: 1;

    @include laptop-xl() {
        padding-left: 15px;
        padding-right: 15px;
    }

    .mailing-receive {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 30px;

        &:before {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            background: url(@/assets/svg/maling-not.svg) no-repeat center;
            background-size: contain;
        }

        &.is-receive {
            &:before {
                background: url(@/assets/svg/maling-ok.svg) no-repeat center;
                background-size: contain;
            }
        }
    }

    .mailing-toggle {
        position: relative;
        display: inline-block;
        width: 56px;
        height: 26px;
        margin-left: auto;
        margin-right: 20px;
        cursor: pointer;

        @include laptop-xl() {
            margin-right: 0;
        }

        &-checkbox {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            opacity: 0;
        }

        input:checked ~ .mailing-toggle-slider:after {
            transform: translate(30px, 0);
        }

        input:checked ~ .mailing-toggle-slider:before {
            background: $color-warning;
        }

        input:disabled ~ .mailing-toggle-slider:before {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &-slider {
            display: inline-block;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 60px;
                height: 30px;
                background: $gray-lighten;
                border-radius: 20px;
            }

            &:after {
                content: '';
                position: absolute;
                top: 4px;
                left: 4px;
                width: 22px;
                height: 22px;
                background: $white;
                border-radius: 50%;
            }

            > span {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;

                &:before {
                    content: '';
                    position: absolute;
                    top: 8px;
                    left: 13px;
                    width: 3px;
                    height: 12px;
                    background: $white;
                }

                &:after {
                    content: '';
                    position: absolute;
                    top: 9px;
                    right: 9px;
                    width: 12px;
                    height: 12px;
                    border: 2px solid $white;
                    background: transparent;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>
