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
	padding: 16px 35px;
	color: #fff;
	background: var(--wow-accent);
	border-radius: var(--wow-border-radius);
	border: 0px;
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.6s;
}

button:hover {
	filter: brightness(1.5);
}
</style>
