<template>
	<div class="input-group">
		<div class="checkbox-line">
			<input class="checkbox radiomark" type="radio" :checked="checked" :value="props.value" :name="props.name" @change="onChange" />
			<div class="checkmark radiomark">
				<IconRadiomark v-if="checked" />
			</div>
			<label>{{ label }}</label>
		</div>
	</div>
</template>

<script setup>
import { ref, onUpdated } from 'vue'
import IconRadiomark from './icons/IconRadiomark.vue'

const emits = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
	name: { type: String },
	modelValue: { default: '' },
	value: { type: String, required: true },
	label: { type: String, required: true },
})

let checked = ref(false)

onUpdated(() => {
	if (props.value != props.modelValue) {
		checked.value = false
	}
})

function onChange() {
	emits('update:modelValue', props.value)
	checked.value = true
}
</script>

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
