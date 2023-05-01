<script setup>
let props = defineProps(['color', 'text'])
</script>

<template>
	<span class="color">{{ text }}</span>
</template>

<style>
.color {
	color: v-bind('props.color') !important;
}
</style>
