<template>
    <div class="sidebar sidebar-left">
        <MainNews/>
        <AsideVideo/>
        <WeeklyNews id="weekly-top" class="mb-30"/>
        <CommentedNews/>
        <OpenBot/>
    </div>
</template>

<script lang='ts' setup>
import WeeklyNews from 'dtkt-shared/components/WeeklyNews';
import MatchMedia from 'dtkt-shared/components/MatchMedia';
import MainNews from 'dtkt-shared/components/MainNews';
import OpenBot from 'dtkt-shared/components/OpenBot';
import CommentedNews from 'dtkt-shared/components/CommentedNews';
import Openx from 'dtkt-shared/components/Openx';
import AsideVideo from 'dtkt-shared/components/AsideVideo';
</script>

