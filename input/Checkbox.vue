<template>
	<div class="input-group">
		<div class="checkbox-line">
			<input class="checkbox" type="checkbox" :checked="checked" :value="props.value" :name="props.name" @change="updateInput" />
			<div class="checkmark">
				<IconCheckmark v-if="checked" />
			</div>
			<label>{{ props.label }}</label>
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
function updateInput(event) {
	let check = event.target.checked
	if (props.modelValue instanceof Array) {
		let newValue = [...props.modelValue]
		if (check) {
			newValue.push(props.value)
		} else {
			newValue.splice(newValue.indexOf(props.value), 1)
		}
		emits('update:modelValue', newValue)
	} else {
		emits('update:modelValue', check)
	}
}
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
