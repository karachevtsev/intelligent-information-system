<template>
    <div class="report-sota-alert">
        <h3>Увага!</h3>
        <p>Щоб подавати звітність «COTA» вам необхідно мати сертифікат-ключ електронного цифрового підпису (ЕЦП) керівника, бухгалтера та печатки
            підприємства, видані АЦСК
            <NuxtLink to="https://uakey.com.ua/" target="_blank">«Центр сертифікації ключів «Україна»</NuxtLink>
        </p>
        <p>Інструкція по роботі з «СОТА» —
            <NuxtLink to="https://sota-buh.com.ua/page/hint/zapusk-sota" target="_blank">тут</NuxtLink>
        </p>
        <p>Служба підтримки «СОТА»: <b>(044) 206-72-10</b>, обов’язково вкажіть що ви передплатник «Дебету-Кредиту».</p>
    </div>
</template>

<script lang='ts' setup>

</script>

<style lang='scss'>
.report-sota-alert {
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    color: #583333;
    border: 2px solid #EDEDEF;
    border-radius: 6px;

    @include laptop-xl() {
        padding: 30px;
    }

    h3 {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
    }

    p {
        a {
            color: #BE4949;

            &:hover {
                text-decoration: none;
            }
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
