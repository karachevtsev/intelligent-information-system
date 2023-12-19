<template>
    <div class="profile-mailing-list">
        <div v-if="pending" class="profile-spinner">
            <Spinner/>
        </div>
        <template v-else>
            <div class="profile-mailing-table" v-for="(mailing, key) in data.mailings" :key="key">
                <div class="profile-table-title">{{ mailingsTypeHeadlines[key] }}</div>
                <div class="profile-table-row table-header" :class="key">
                    <div class="profile-table-cell">Назва</div>
                    <div class="profile-table-cell">Період</div>
                    <div class="profile-table-cell">Статус</div>
                </div>
                <div v-for="item in mailing" class="profile-table-row table-body" :key="item.id" :class="key">
                    <div class="profile-table-cell profile-table-caption">{{ item.title }}</div>
                    <div class="profile-table-cell cell-periodicity">
                        {{ item?.periodicity?.caption }}
                    </div>
                    <div class="profile-table-cell cell-mailing">
                        <MailingStatus :id="item.id"
                                       :status="data.mailingsHaveUser[item.id]"
                                       :mailingType="mailingsType[key]"
                        />
                    </div>
                </div>
            </div>
        </template>
        <MailingModal/>
    </div>
</template>

<script lang='ts' setup>
import { useRuntimeConfig, useFetch } from '#app';
import MailingModal from '~/components/Mailing/MailingModal';
import MailingStatus from '~/components/Mailing/MailingStatus';
import Spinner from 'dtkt-shared/components/Spinner';

const { public: { apiBase } } = useRuntimeConfig();

const { data, pending } = await useFetch('mailing', {
    method: 'GET',
    baseURL: apiBase,
    credentials: 'include',
    server: false,
    key: 'mailing',
});

const mailingsTypeHeadlines = {
    'register': 'Для зареєстрованих користувачів',
    'protected': 'Для передплатників',
    'themes': 'Тематичні розсилки для передплатників',
};

const mailingsType = {
    'register': '',
    'protected': 'alarms',
    'themes': 'thematic',
};
</script>

<style lang='scss'>
.profile-mailing-table {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

    @include laptop-xl() {
        display: block;
        margin-bottom: 70px;
    }

    &:last-child {
        margin-bottom: 0;
    }

    .profile-table-title {
        width: 100%;
        margin-bottom: 15px;
        font-size: 21px;
        line-height: 140%;
    }

    .profile-table-row {
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        background: #F0FAFF;

        @include laptop-xl() {
            background: none;
        }

        .profile-table-cell {
            background: #F0FAFF;

            @include laptop-xl() {
                background: #F4F5F7;
            }
        }

        &.register {
            background: #F5FDF2;

            @include laptop-xl() {
                background: none;
            }

            .profile-table-cell {
                background: #F5FDF2;

                @include laptop-xl() {
                    background: #F4F5F7;
                }
            }
        }
    }

    .table-header {
        &.register {
            > .profile-table-cell {
                background: #51C06F;
            }
        }

        &.protected,
        &.themes {
            > .profile-table-cell {
                background: #A2D2EC;
            }
        }
    }

    .cell-periodicity {
        font-size: 16px;
        line-height: 19px;
        color: #7A7B7D;

        @include laptop-xl() {
            text-align: center;
        }
    }
}
</style>
