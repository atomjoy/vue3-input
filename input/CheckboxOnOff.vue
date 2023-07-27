<template>
	<div class="input-group">
		<div class="checkbox-line">
			<label v-if="props.label" :for="props.name">{{ props.label }} <slot></slot></label>
			<input class="checkbox checkbox-checkmark-onoff" type="checkbox" :value="props.value" :name="props.name" v-model="props.modelValue" @change="emits('update:modelValue', props.modelValue)" />
			<div :class="{ 'checkmark-onoff': true, 'checkmark-onoff-checked': checked }">
				<div class="dot"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const emits = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
	name: { type: String },
	modelValue: { type: [Array, Boolean] },
	value: { type: String, required: true },
	label: { type: String, required: true },
})

const checked = computed(() => {
	if (props.modelValue instanceof Array) {
		return props.modelValue.includes(props.value)
	}
	return props.modelValue
})
</script>

<style>
@import './css/input-root.css';
</style>

<style scoped>
@import './css/input.css';
</style>

<!--

  let lights = ref(true)

  <CheckboxOnOff label="Enable lights" value="1" v-model="lights" name="lights" />

-->
