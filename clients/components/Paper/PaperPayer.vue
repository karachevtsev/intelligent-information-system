<template>
    <div class="profile">
        <div v-for="(field, key) in fields" class="profile-row" :key="key">
            <div class="profile-field">{{ key }}:</div>
            <div class="profile-value">
                <input type="text" class="form-control" :value="field" readonly>
            </div>
        </div>
        <div class="profile-row-btn">
            <NuxtLink to="/paper_edit" class="btn btn-profile">Змінити дані</NuxtLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
const props = defineProps({
    fields: {
        type: Object,
        required: true,
    },
});
</script>
