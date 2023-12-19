<template>
    <div class="report-sota-form">
        <form @submit.prevent="send">
            <div class="form-group">
                <label class="form-label" for="code">Код ЄДРПОУ або ІПН</label>
                <Field
                    id="code"
                    class="form-control"
                    name="code"
                    placeholder="ЄДРПОУ або ІПН"
                    type="text"
                    :class="{'has-errors': errors.code}"
                />
                <ErrorMessage class="error" name="code"></ErrorMessage>
            </div>
            <div class="form-group">
                <label class="form-label" for="title">Найменування платника податків</label>
                <Field
                    id="title"
                    class="form-control"
                    name="title"
                    placeholder="Підприємство або ФОП"
                    type="text"
                    :class="{'has-errors': errors.title}"
                />
                <ErrorMessage class="error" name="title"></ErrorMessage>
            </div>
            <div class="form-group">
                <label class="form-label" for="ftype">Система оподаткування</label>
                <Field
                    id="ftype"
                    name="ftype"
                    as="select"
                    class="form-control form-control-select"
                    :class="{'has-errors': errors.ftype}"
                >
                    <option value="" disabled>- оберіть систему -</option>
                    <option v-for="(value, key) in taxPayerValues"
                            :value="key">
                        {{ value }}
                    </option>
                </Field>
                <ErrorMessage class="error" name="ftype"></ErrorMessage>
            </div>
            <div class="form-group-btn text-center">
                <button class="btn btn-profile" type="submit" :disabled="isDisabled">
                    Зберегти
                </button>
            </div>
        </form>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp, useRuntimeConfig } from '#app';
import { configure, ErrorMessage, Field, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import * as Yup from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';

configure({
    validateOnInput: false,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnModelUpdate: false,
});

const { public: { apiBase } } = useRuntimeConfig();
const { $bus } = useNuxtApp();
const isSend = ref(false);
const serverError = ref('');
const isDisabled = ref(false);

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        code: Yup.string()
            .required(errorMessages.required)
            .matches(
                /^([0-9]{8}|[0-9]{10})$/,
                'Код ЄДРПОУ може містити 8 або 10 цифр',
            ),
        title: Yup.string().required(errorMessages.required),
        ftype: Yup.string().required(errorMessages.required),
    }),
});

const send = handleSubmit(async ({ code, title, ftype }) => {
    try {
        isDisabled.value = true;
        await $fetch('/dtkt/medoc', {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ code, title, ftype }),
        });
        $bus.$emit('addReport');
    } catch (e) {
        console.log(e);
        $bus.$emit('addReport', 'error');
    } finally {
        isDisabled.value = false;
    }
});

const taxPayerValues = {
    1: 'Юрособа на загальній системі',
    2: 'Юрособа на єдиному податку',
    3: 'ФОП (на будь-якій системі)',
};
</script>

<style lang='scss'>
.report-sota-form {
    max-width: 300px;
    margin: 0 auto;

    .form-group {

        + .form-group {
            margin-top: 30px;
        }
    }

    .form-label {
        display: block;
        margin-bottom: 6px;
    }

    .form-group-btn {
        margin-top: 20px;
    }

    .form-control {
        color: inherit;
    }
}
</style>
