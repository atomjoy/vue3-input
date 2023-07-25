<template>
	<div class="input-group">
		<label v-if="label" :for="name">{{ label }} <slot></slot></label>
		<div :class="{ 'custom-select': true, 'custom-select-open': open }" :data-uid="uid" @blur="open = false" @click.stop="openSelect">
			<div class="selected" :class="{ open: open, inactive: inactive }">{{ selected }} <IconChevronDown class="selected-icon" /></div>
			<div class="rounded">
				<input type="text" placeholder="Search" @click.stop="" @keyup="filterOptions" />
				<div ref="items" class="items" :tabindex="tabindex">
					<div v-if="search_check" class="select-search-error">{{ searchError }}</div>
					<div v-for="(o, index) in filtered_options" :key="index" :value="o.prefix" @click.stop="updateClick(o)" :class="{ highlight: o.prefix == modelValue }">{{ o.name }} {{ o.emoji }} +{{ o.prefix }} <IconCheckmark v-if="o.prefix == modelValue" class="checkmark" /></div>
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
	searchError: { type: String, default: 'Option does not exists.' },
})
let { label, name, modelValue, tabindex, searchError } = toRefs(props)
const input = ref(null)
const selected = ref(null)
const inactive = ref(false)
const open = ref(false)
const search_check = ref(false)
const filtered_options = ref(options)
const uid = ref('custom-select-' + Date.now())

function openSelect() {
	let all = document.querySelectorAll('.custom-select-open')
	all.forEach((el) => {
		let data = el.dataset.uid ?? null
		if (data != uid.value) {
			el.click()
		}
	})

	open.value = !open.value
}

onMounted(() => {
	if (modelValue.value !== null) {
		let option = options?.find((o) => parseInt(o.prefix) === modelValue.value)
		if (option?.prefix) {
			selected.value = `${option.emoji}  +${option.prefix}`
		} else {
			clear()
		}
	} else {
		clear()
	}

	document.addEventListener('click', (e) => {
		let a = document.querySelectorAll('.custom-select-open')
		a.forEach((el) => el.click())
	})
})

function clear() {
	selected.value = `${options[0].emoji}  +${options[0].prefix}`
	modelValue.value = options[0].prefix
	inactive.value = false
}

function updateClick(option = null) {
	if (option == null) {
		clear()
	} else {
		modelValue.value = option.prefix ?? null
		selected.value = `${option.emoji}  +${option.prefix}`
		inactive.value = false
	}
	open.value = false
	emit('update:modelValue', modelValue.value)
}

function filterOptions(e) {
	filtered_options.value = options.filter((o) => o.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
	search_check.value = filtered_options.value.length == 0 ? true : false
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
