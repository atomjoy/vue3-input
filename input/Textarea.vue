<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
	modelValue: [String, Number],
	name: { type: String },
	label: { type: String },
	placeholder: { type: String },
	class: { type: [String, Array] },
})
</script>
<template>
	<div class="input-group">
		<label v-if="props.label" :for="props.name">{{ props.label }} <slot></slot></label>
		<textarea :name="props.name" v-model="props.modelValue" :class="props.class" :placeholder="props.placeholder" @input="emits('update:modelValue', $event.target.value)"></textarea>
	</div>
</template>

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
