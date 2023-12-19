<template>
    <div class="open-bot mb-30">
        <h2>Перевір свого контрагента:</h2>
        <div class="form-group">
            <input v-model="query"
                   @keydown.enter="open(query)"
                   :placeholder="placeholder"
                   type="text"
                   class="form-control"
            >
            <button @click="open(query)">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.67077 14.3415C11.3549 14.3415 14.3415 11.3549 14.3415 7.67077C14.3415 3.98661 11.3549 1 7.67077 1C3.98661 1 1 3.98661 1 7.67077C1 11.3549 3.98661 14.3415 7.67077 14.3415Z"
                        stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 17L12.3846 12.3846" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <p>сервіс надано
            <NuxtLink to="https://opendatabot.ua/" target="_blank">OpenDataBot</NuxtLink>
        </p>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const query = ref('');
let openDataBot;

const placeholders = ['Введіть назву підприємства', 'або його код ЄДРПОУ'];
const placeholder = ref('Введіть назву підприємства');

let index = 0;

const updatePlaceholder = () => {
    placeholder.value = placeholders[index++ % placeholders.length]
}

onMounted(() => {
    setInterval(updatePlaceholder, 3000);
});

if (process.client) {
    openDataBot = (() => {
        const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
        const eventer = window[eventMethod];
        const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
        let elements = [];

        eventer(
            messageEvent,
            (e) => {
                if (e.data === 'closeIframe') {
                    elements.forEach(e => e.remove());
                    elements = [];
                }
            },
            false
        );

        return (symbol) => {
            const meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui";
            elements.push(meta);
            document.getElementsByTagName('head')[0].appendChild(meta);

            const iframe = document.createElement('iframe');
            iframe.name = "iframeodb";
            iframe.id = "iframeodb";
            iframe.src = `https://opendatabot.com/iframe?search=${encodeURI(symbol)}&location=${encodeURI(document.location.origin)}`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.style = "z-index: 1000;position: fixed;background-color: rgba(119, 118, 118, 0.85)";
            elements.push(iframe);
            document.body.appendChild(iframe);
        };
    })();
}

const open = (query) => {
    openDataBot(query);
};
</script>

<style lang="scss">
.open-bot {
    padding: 30px;
    background: #F4F5F7;
    border-radius: 16px;

    h2 {
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 21px;
        line-height: 25px;
        color: #000000;
        margin-right: -3px;
    }

    .form-group {
        position: relative;
        margin-bottom: 10px;

        button {
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 30px;
            margin: 0;
            border: 0;
            background-color: transparent;
            background-image: none;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
            user-select: none;
            text-align: center;

            &:hover {
                background-color: transparent;
            }
        }
    }

    .form-control {
        padding-right: 50px;
    }

    p {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #7A7B7D;

        a {
            color: inherit;
            text-decoration: underline;
        }
    }
}

</style>
