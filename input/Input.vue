<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
	modelValue: [String, Number],
	name: { type: String },
	label: { type: String },
	placeholder: { type: String },
	class: { type: [String, Array] },
	type: {
		type: String,
		default: 'text',
		required: true,
	},
})
</script>

<template>
	<div class="input-group">
		<label>{{ props.label }}</label>
		<input :type="props.type" :name="props.name" v-model="props.modelValue" :class="props.class" :placeholder="props.placeholder" @input="emits('update:modelValue', $event.target.value)" />
	</div>
</template>

<style scoped>
@import './css/input.css';
</style>

<!--
  import Input from '@/components/form/Input.vue'

  let value = 'Maxiu'

  <Input type="text" name="name" v-model="value" />
-->
