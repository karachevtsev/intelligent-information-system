<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Відмова від розсилки</h1>
        </div>
        <div class="box-profile mailing-unsubscribe">
            <p>Ви впевнені, що хочете відмовитись від розсилки
                <b>Бухгалтерські новини?</b>
            </p>
            <Image name="mailing-confirm" alt="Відмова від розсилки"/>
            <div class="mailing-declined-buttons">
                <Button type="button" class="btn btn-profile" @click="unsubscribe">Відписатись від цієї розсилки</Button>
                <NuxtLink to="/mailing" class="btn btn-profile">Перейти до списку розсилок</NuxtLink>
            </div>
        </div>
    </ContentBase>
</template>

<script lang='ts' setup>
const unsubscribe = () => {
    console.log(unsubscribe);
};

navigateTo({
    path: '/mailing',
    replace: true,
});
</script>

<style lang='scss'>
.mailing-unsubscribe {
    text-align: center;

    p {
        font-size: 18px;

        b {
            display: block;
        }
    }

    img {
        margin: 40px auto;
    }

    &-buttons {
        display: flex;
        flex-direction: column;
    }

    .btn + .btn {
        margin-top: 15px;

        @include laptop-xl() {
            margin-top: 0;
            margin-left: 40px;
        }
    }
}
</style>
