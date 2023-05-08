<template>
	<div class="input-group">
		<div class="checkbox-line">
			<input class="checkbox" type="checkbox" :value="props.value" :name="props.name" v-model="props.modelValue" @change="emits('update:modelValue', props.modelValue)" />
			<div class="checkmark">
				<IconCheckmark v-if="checked" />
			</div>
			<label v-if="props.label" :for="props.name">{{ props.label }} <slot></slot></label>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import IconCheckmark from './icons/IconCheckmark.vue'

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

  // Multiple Array with strings values
  let money = ref(['card','cash']) // Default selected in array

  <Checkbox label="Cash" value="cash" v-model="money" name="pay_cash" />
	<Checkbox label="Card" value="card" v-model="money" name="pay_card" />

  // Single (true|false)
  let remember_me = ref(true)

  <Checkbox label="Remember me 1" value="1" v-model="remember_me" name="remember_me" />

-->
