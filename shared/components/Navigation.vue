<template>
    <div class="navigation">
        <div class="navigation-control">
            Всі розділи
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="M8 1L4.5 4.88889L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <ClientOnly>
            <div class="navigation-box-dropdown">
                <div class="navigation-box">
                    <NavigationList className="navigation-list-desktop"/>
                    <BottomNavigationSwitcher/>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import BottomNavigationSwitcher from './BottomNavigationSwitcher';
import NavigationList from './NavigationList';
</script>
