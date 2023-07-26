<script setup>
let props = defineProps(['text', 'class'])
</script>

<template>
	<button :class="props?.class">{{ props?.text ?? 'Submit' }}</button>
</template>

<style>
button {
	float: right;
	margin-top: 20px;
	background: var(--wow-accent);
	border-radius: var(--wow-border-radius);
	font-size: var(--wow-font-size) !important;
	padding: var(--wow-font-size) calc(var(--wow-font-size) * 3) !important;
	border-radius: calc(var(--wow-font-size) / 2);
	border: 1px solid var(--wow-accent);
	font-weight: 600 !important;
	color: #fff;
	cursor: pointer;
	transition: all 0.6s;
}

button:hover {
	filter: brightness(1.3);
}
</style>
