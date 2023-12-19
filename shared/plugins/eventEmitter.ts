import { defineNuxtPlugin } from '#app';
import mitt from 'mitt';

const eventEmitter = mitt();

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('bus', {
        $on: eventEmitter.on,
        $emit: eventEmitter.emit,
    });
});
