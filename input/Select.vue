<template>
	<div class="input-group">
		<label v-if="label" :for="name">{{ label }} <slot></slot></label>
		<div class="custom-select" @blur="open = false" :tabindex="tabindex">
			<div class="selected" :class="{ open: open, inactive: inactive }" @click="open = !open">{{ selected }} <IconChevronDown class="selected-icon" /></div>
			<div class="rounded" :class="{ selectHide: !open }">
				<div ref="items" class="items">
					<div :key="0" @click="updateClick(null)">{{ placeholder }}</div>
					<div v-for="(option, i) of options" :key="i" @click="updateClick(option)" :class="{ highlight: check(option, modelValue) }">{{ option.value ?? option }} <IconCheckmark v-if="check(option, modelValue)" class="checkmark" /></div>
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
})
const { label, name, options, modelValue, tabindex, placeholder } = toRefs(props)
const input = ref(null)
const selected = ref(null)
const inactive = ref(false)
const open = ref(false)

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
})

function updateClick(option = null) {
	if (option == null) {
		modelValue.value = null
		selected.value = placeholder.value
		inactive.value = true
		open.value = false
	} else {
		modelValue.value = option.key ?? option
		selected.value = option.value ?? option
		inactive.value = false
		open.value = false
	}
	emit('update:modelValue', modelValue.value)
}

function renameKeys(obj = { id: '1', name: 'Alex' }, newKeys = { id: 'key', name: 'value' }) {
	const keyValues = Object.keys(obj).map((key) => {
		const newKey = newKeys[key] || key
		return { [newKey]: obj[key] }
	})
	return Object.assign({}, ...keyValues)
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
