<template>
	<div class="input-group">
		<label v-if="props.label" :for="props.name">{{ props.label }} <slot></slot></label>
		<input ref="input" :type="props.type" :name="props.name" v-model="props.modelValue" :class="props.class" :placeholder="props.placeholder" @input="emits('update:modelValue', $event.target.value)" @keydown="emits('keydown', $event)" @keyup="emits('keyup', $event)" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emits = defineEmits(['update:modelValue', 'keydown', 'keyup'])
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
	focus: false,
})

let input = ref(null)

onMounted(() => {
	if (props.focus) {
		input.value.focus()
	}
})
</script>

<style>
@import './css/input-root.css';
</style>

<style scoped>
@import './css/input.css';
</style>

<!--
  import Input from '@/components/form/Input.vue'

  let value = 'Maxiu'

  <Input type="text" name="name" v-model="value" />
-->
