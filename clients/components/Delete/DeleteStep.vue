<template>
<div class="delete-step">
    <div class="delete-step-content">
        <h2>
            <slot name="title"></slot>
        </h2>
        <div class="delete-step-text">
            <slot name="content"></slot>
        </div>
        <div class="delete-step-actions">
            <slot name="actions"></slot>
        </div>
    </div>
</div>
</template>

<script lang='ts' setup>

</script>

<style lang='scss'>
.delete-step {
    max-width: 800px;
    margin: 0 auto;

    h2 {
        max-width: 560px;
        margin: 0 auto;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        line-height: 140%;
        color: #52A5D8;
    }

    &-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        font-size: 16px;
        line-height: 140%;
        background: #F4F5F7;
        border-radius: 6px;

        @include laptop-xl() {
            padding: 30px 50px ;
        }
    }

    ul, ol {
        margin: 0;
        li {
            + li {
                margin-top: 10px;
            }
        }
    }

    &-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
}
</style>
