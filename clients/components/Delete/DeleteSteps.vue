<template>
 <div class="delete-steps">
     <Image
         alt="Видалити аккаунт"
         name="profile-delete"
     />
     <DeleteStep v-if="firstStep">
         <template #title>
             Тут ви можете повністю видалити усі свої дані (обліковий запис) з сайту «Дебет-Кредит»:
         </template>
         <template #content>
             <ol>
                 <li>ПІБ, e-mail, телефон та іншу персональну інформацію;</li>
                 <li>актуальні підписки на корисні розсилки від редакції (за наявності);</li>
                 <li>персональні повідомлення від редакції;</li>
                 <li>збережені вами обрані матеріали (новини, бланки, статті, документи тощо);</li>
                 <li>доступ до замовлень та продуктів, оплачених раніше (зокрема, передплата та вебінари), а також сервісів «Сайт без реклами», «Запитання редакції» та «Паперовий журнал».</li>
             </ol>
         </template>
         <template #actions>
             <button type="button" class="btn btn-profile" @click="firstStep = false">Видалити аккаунт</button>
         </template>
     </DeleteStep>
     <DeleteStep v-else>
         <template #title>
             Зверніть увагу!
         </template>
         <template #content>
            <p>
                Після натискання кнопки «Видалити аккаунт» ви не зможете авторизуватись на сайті під своїм логіном, користуватись сервісами для зареєстрованих користувачів та передплатників (за наявності передплати), а також не будете отримувати наші корисні розсилки.
                <br>
                <br>
                Видалений аккаунт із усіма його даними не підлягає відновленню.
                <br>
                <br>
                При створенні вами нового аккаунту на сайті dtkt.ua жодний трансфер даних, інформації про послуги та підписки тощо зі старого (видаленого) аккаунту є неможливим.
            </p>
         </template>
         <template #actions>
             <button type="button" class="btn btn-profile" @click="deleteProfile">Зрозуміло! Я хочу видалити аккаунт</button>
             <NuxtLink class="btn btn-profile btn-profile-deactivate" to="/">Я передумав! Повернутись до особистих даних</NuxtLink>
         </template>
     </DeleteStep>
 </div>
</template>

<script lang='ts' setup>
const firstStep = ref(true)

const emit = defineEmits(['deleteProfile']);

const deleteProfile = () => {
    emit('deleteProfile');
}
</script>
