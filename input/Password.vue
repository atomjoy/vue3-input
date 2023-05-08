<template>
	<div class="input-group">
		<label v-if="props.label" :for="props.name">{{ props.label }} <slot></slot></label>

		<div class="pass-box">
			<input ref="input" :type="props.type" :name="props.name" v-model="props.modelValue" :class="props.class" :placeholder="props.placeholder" @keyup="validatePass" @focus="onFocus" @blur="open = false" @input="emits('update:modelValue', $event.target.value)" />
			<div class="toggle-info-icon" @click.stop="toogleInfo"><IconInfo /></div>
			<div class="toggle-type-icon" @click.stop="toogleShow"><IconEye v-if="!show" /><IconEyeAlt v-if="show" /></div>
		</div>

		<div class="password-helper password-helper-open" v-if="open">
			<div class="flex"><IconClose v-if="!check1" /><IconCheck v-if="check1" class="green" />Minimalna liczba znaków: {{ minChars }}</div>
			<div class="flex"><IconClose v-if="!check2" /><IconCheck v-if="check2" class="green" />Zawiera dużą literę</div>
			<div class="flex"><IconClose v-if="!check3" /><IconCheck v-if="check3" class="green" />Zawiera małą literę</div>
			<div class="flex"><IconClose v-if="!check4" /><IconCheck v-if="check4" class="green" />Zawiera liczbę</div>
			<div class="flex"><IconClose v-if="!check5" /><IconCheck v-if="check5" class="green" />Zawiera znak specjalny</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'
import IconClose from './icons/IconClose.vue'
import IconCheck from './icons/IconCheck.vue'
import IconInfo from './icons/IconInfo.vue'
import IconEye from './icons/IconEye.vue'
import IconEyeAlt from './icons/IconEyeAlt.vue'

const emits = defineEmits(['update:modelValue', 'valid', 'invalid'])
const props = defineProps({
	modelValue: [String, Number],
	name: { type: String },
	label: { type: String },
	placeholder: { type: String },
	class: { type: [String, Array] },
	type: {
		type: String,
		default: 'password',
		required: true,
	},
	minChars: { type: Number, default: 10 },
	focus: false,
})

let open = ref(false)
let show = ref(false)

let check1 = ref(false)
let check2 = ref(false)
let check3 = ref(false)
let check4 = ref(false)
let check5 = ref(false)

let input = ref(null)

onMounted(() => {
	if (props.focus) {
		input.value.focus()
	}
})

function validatePass(event) {
	let str = event?.target?.value ?? ''

	if (str.replace(' ', '').length >= props.minChars) {
		check1.value = true
	} else {
		check1.value = false
	}

	if (Boolean(str.match(/[A-Z]/))) {
		check2.value = true
	} else {
		check2.value = false
	}

	if (Boolean(str.match(/[a-z]/))) {
		check3.value = true
	} else {
		check3.value = false
	}

	if (Boolean(str.match(/[0-9]/))) {
		check4.value = true
	} else {
		check4.value = false
	}

	if (Boolean(str.match(/[^A-Za-z0-9 ]/))) {
		check5.value = true
	} else {
		check5.value = false
	}

	if (check1.value && check2.value && check3.value && check4.value && check5.value) {
		emits('valid', str)
	} else {
		emits('invalid', str)
	}
}

function onFocus(e) {
	open.value = true
	validatePass(e)
}

function toogleInfo() {
	open.value = !open.value
}

function toogleShow() {
	show.value = !show.value
	show.value ? (props.type = 'text') : (props.type = 'password')
}
</script>

<style>
@import './css/input-root.css';
</style>

<style scoped>
@import './css/input.css';
</style>

<!--
  import Password from '@/components/form/Password.vue'

  let value = ref(null)

  <Password type="password" name="pass" v-model="value" />
-->
