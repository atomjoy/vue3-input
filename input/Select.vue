<template>
	<div class="input-group">
		<label v-if="label" :for="name">{{ label }} <slot></slot></label>
		<div :class="{ 'custom-select': true, 'custom-select-open': open }" :data-uid="uid" @blur="open = false" @click.stop="openSelect">
			<div class="selected" :class="{ open: open, inactive: inactive }">{{ selected }} <IconChevronDown class="selected-icon" /></div>
			<div class="rounded">
				<input type="text" placeholder="Search" @click.stop="" @keyup="filterOptions" />
				<div ref="items" class="items" :tabindex="tabindex">
					<div v-if="search_check" class="select-search-error">{{ searchError }}</div>
					<div v-if="!search_check" :key="0" @click.stop="updateClick(null)">{{ placeholder }}</div>
					<div v-for="(option, i) of filtered_options" :key="i" @click.stop="updateClick(option)" :class="{ highlight: check(option, modelValue) }">{{ option.value ?? option }} <IconCheckmark v-if="check(option, modelValue)" class="checkmark" /></div>
				</div>
			</div>
			<input ref="input" type="hidden" v-model="modelValue" :name="name" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'
import IconChevronDown from './icons/IconChevronDown.vue'
import IconCheckmark from './icons/IconCheckmark.vue'

const emit = defineEmits(['update:modelValue', 'change', 'click', 'blur'])
const props = defineProps({
	label: { type: String },
	name: { type: String },
	options: { type: Array },
	modelValue: { type: String },
	tabindex: { type: Number, default: 0 },
	placeholder: { type: String, default: 'Choose' },
	searchError: { type: String, default: 'Option does not exists.' },
})
const { label, name, options, modelValue, tabindex, placeholder } = toRefs(props)
const input = ref(null)
const selected = ref(null)
const inactive = ref(false)
const open = ref(false)
const search_check = ref(false)
const filtered_options = ref(options.value)
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

// Test option highligt
function check(option, modelValue) {
	if (option.key) {
		return option.key == modelValue
	} else if (option) {
		return option == modelValue
	} else {
		return false
	}
}

onMounted(() => {
	if (modelValue.value !== null) {
		selected.value = options?.value?.find((option) => option.key === modelValue.value)?.value ?? modelValue.value
	} else {
		selected.value = placeholder.value
		inactive.value = true
		modelValue.value = null
	}

	document.addEventListener('click', (e) => {
		let a = document.querySelectorAll('.custom-select-open')
		a.forEach((el) => el.click())
	})
})

function updateClick(option = null) {
	if (option == null) {
		modelValue.value = null
		selected.value = placeholder.value
		inactive.value = true
	} else {
		modelValue.value = option.key ?? option
		selected.value = option.value ?? option
		inactive.value = false
	}
	open.value = false
	emit('update:modelValue', modelValue.value)
}

function filterOptions(e) {
	filtered_options.value = options?.value?.filter((o) => {
		if (o?.value) {
			return o.value.toLowerCase().startsWith(e.target.value.toLowerCase())
		} else {
			return o.toLowerCase().startsWith(e.target.value.toLowerCase())
		}
	})
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
  import Select from '@/components/input/Select.vue'

  const selected1 = ref(null)
  const selected2 = ref(3)

  function onSubmit(e) {
    let data = new FormData(e.target);
    for (var pair of data.entries()) {
      console.log("Key:", pair[0], "Value:", pair[1]);
    }
    // axios request here
  }
</sctipt>
<template>
  <form @submit.prevent="onSubmit">
    <Select v-model="selected1" :placeholder="'Wybierz'" :label="'Language1'" :name="'language1'" :options="['Go', 'Python', 'Rust', 'Javascript', 'Php', 'Html', 'Vue', 'React', 'Css']" :class="'custom-class'" />

    <Select
      v-model="selected2"
      :placeholder="'Wybierz'"
      :label="'Language2'"
      :name="'language2'"
      :options="[
        { key: 1, value: 'Php' },
        { key: 2, value: 'Css' },
        { key: 3, value: 'Html' },
        { key: 4, value: 'JavaScript' },
      ]"
      :class="'custom-class'"
    />

    <button> Send </button>
  </form>
</template>
-->
