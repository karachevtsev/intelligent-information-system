<template>
    <div v-for="menu in CLIENT_MENU" class="client-menu">
        <h2 class="client-menu-title">
            {{ menu.caption }}
        </h2>
        <ul class="client-menu-links">
            <li v-for="item in menu.items">
                <NuxtLink :to="item.url"
                          :class="{'router-link-active router-link-exact-active': ($route.name === 'profile' && item.url === '/') || ($route.name === 'paper_edit' && item.url === '/paper')}"
                >
                    {{ item.title }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { CLIENT_MENU } from '~/constants';
</script>
