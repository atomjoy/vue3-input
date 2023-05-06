<template>
	<div class="input-group">
		<label v-if="label" :for="name">{{ label }} <slot></slot></label>
		<div class="custom-select" @blur="open = false" :tabindex="tabindex">
			<div class="selected" :class="{ open: open, inactive: inactive }" @click="open = !open">{{ selected }} <IconChevronDown class="selected-icon" /></div>
			<div class="rounded" :class="{ selectHide: !open }">
				<div ref="items" class="items">
					<div v-for="o of options" :key="o.prefix" :value="o.prefix" @click="updateClick(o)" :class="{ highlight: o.prefix == modelValue }">{{ o.name }} {{ o.emoji }} +{{ o.prefix }} <IconCheckmark v-if="o.prefix == modelValue" class="checkmark" /></div>
				</div>
			</div>
			<input ref="input" type="hidden" v-model="modelValue" :name="name" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'
import options from './json/country.json'
import IconChevronDown from './icons/IconChevronDown.vue'
import IconCheckmark from './icons/IconCheckmark.vue'

const emit = defineEmits(['update:modelValue', 'change', 'click', 'blur'])
const props = defineProps({
	label: { type: String },
	name: { type: String },
	modelValue: { type: String },
	tabindex: { type: Number, default: 0 },
})
let { label, name, modelValue, tabindex } = toRefs(props)
const input = ref(null)
const selected = ref(null)
const inactive = ref(false)
const open = ref(false)

function clear() {
	selected.value = `${options[0].emoji}  +${options[0].prefix}`
	modelValue.value = options[0].prefix
	inactive.value = false
}

onMounted(() => {
	if (modelValue.value !== null) {
		let option = options?.find((option) => parseInt(option.prefix) === modelValue.value)
		if (option?.prefix) {
			selected.value = `${option.emoji}  +${option.prefix}`
		} else {
			clear()
		}
	} else {
		clear()
	}
})

function updateClick(option = null) {
	if (option == null) {
		clear()
		open.value = false
	} else {
		modelValue.value = option.prefix ?? null
		selected.value = `${option.emoji}  +${option.prefix}`
		inactive.value = false
		open.value = false
	}
	emit('update:modelValue', modelValue.value)
}
</script>

<style>
@import './css/input-root.css';
</style>

<style scoped>
@import './css/input.css';
</style>

<!--
<script setup>
  import SelectPrefix from '@/components/form/prefix/SelectPrefix.vue'

  const prefix_selected = ref(48)

  function onSubmit(e) {
    let data = new FormData(e.target);
    for (var pair of data.entries()) {
      console.log("Key:", pair[0], "Value:", pair[1]);
    }
    // axios request here send to server
  }
</sctipt>
<template>
  <form @submit.prevent="onSubmit">
    <SelectPrefix label="Prefix" v-model="prefix_selected" name="prefix" />

    <button> Send </button>
  </form>
</template>
-->
