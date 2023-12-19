<template>
    <div class="box box-stretch">
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Підтвердження реєстрації на сайті</h1>
        </div>
        <div class="box-profile confirmations">
            <Spinner/>
        </div>
    </div>
</template>

<script lang='ts' setup>
import Spinner from 'dtkt-shared/components/Spinner';

const emit = defineEmits(['sendCode']);
emit('sendCode');
</script>
