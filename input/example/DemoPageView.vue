<script setup>
import { onMounted, ref, watch } from 'vue'
// import { useRoute, useRouter, RouterLink } from 'vue-router'

import Input from '@/components/input/Input.vue'
import Select from '@/components/input/Select.vue'
import Password from '@/components/input/Password.vue'
import Textarea from '@/components/input/Textarea.vue'
import SelectPrefix from '@/components/input/SelectPrefix.vue'
import Checkbox from '@/components/input/Checkbox.vue'
import Radiobox from '@/components/input/Radiobox.vue'

// Input v-focus
const vFocus = { mounted: (el) => el.focus() }

// Color
let accentColor = '#ff6600'

// Inputs
let select1 = ref(null)
let select2 = ref(null)
let prefix = ref(2)
let input = ref('')
let password = ref('')
let textarea = ref('Product description ...')
let payment = ref(['cash']) // Selected in array
let remember_me = ref(false)
let radio = ref('')

onMounted(() => {
	// Route
	// const route = useRoute()
	// console.log('Url query string', route?.query ?? null)
})

watch(input, (e) => {
	console.log('Input', e)
})

function validPass(e) {
	console.log('Hurrra! Valid pass', e)
}

function invalidPass(e) {
	console.log('Bruhh! Invalid pass', e)
}

function validate(e) {
	console.log('Input key', e.key)
}

function onSubmit(e) {
	let data = new FormData(e.target)
	for (var pair of data.entries()) {
		console.log('Input key:', pair[0], 'Value:', pair[1])
	}
	// axios request here send to server
}
</script>

<template>
	<TopMenu />

	<p class="color">Home page {{ name }}</p>

	<form @submit.prevent="onSubmit" style="margin: 50px auto; width: 90%; max-width: 530px; padding: 30px">
		<Input :focus="'true'" type="text" name="name" v-model="input" placeholder="Name" label="Name" @keydown="validate" />

		<Password type="password" name="password" v-model="password" placeholder="Password" label="Password" @valid="validPass" @invalid="invalidPass" />

		<SelectPrefix label="Prefix" v-model="prefix" name="prefix" />

		<Select
			v-model="select1"
			:placeholder="'Wybierz'"
			:label="'Language'"
			:name="'language'"
			:options="[
				{ key: 1, value: 'Php' },
				{ key: 2, value: 'Css' },
				{ key: 3, value: 'Html' },
				{ key: 4, value: 'JavaScript' },
			]"
			:class="'custom-class'" />

		<Select v-model="select2" :placeholder="'Wybierz'" :label="'Language'" :name="'language1'" :options="['Go', 'Python', 'Rust', 'Javascript', 'Php', 'Html', 'Vue', 'React', 'Css']" :class="'custom-class'" />

		<Textarea name="desc" v-model="textarea" placeholder="Some text" label="Description" />

		<Checkbox label="Cash" value="cash" v-model="payment" name="pay_cash" />
		<Checkbox label="Card" value="card" v-model="payment" name="pay_card" />

		<Checkbox label="Remember me" value="1" v-model="remember_me" name="remember_me" />

		<Radiobox label="Banan" value="Banan" v-model="radio" name="radio" />
		<Radiobox label="Melon" value="Melon" v-model="radio" name="radio" />
		<Radiobox label="Cherry" value="Cherry" v-model="radio" name="radio" />

		<button class="button">Update</button>

		<h4>{{ input }} {{ password }} {{ select1 }} {{ select2 }} {{ prefix }} {{ payment }} {{ remember_me }} {{ textarea }} {{ radio }}</h4>
	</form>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html,
input,
select,
textarea,
option,
label,
div {
	font-family: 'Poppins', Arial, Helvetica, sans-serif;
}

label i {
	float: right;
}

.color {
	color: v-bind('accentColor') !important;
}

.button {
	float: right;
	margin-top: 20px;
	padding: 15px 30px;
	font-weight: 600;
	color: #fff;
	background: #ff5e4d;
	border-radius: 10px;
	border: 0px;
	font-size: 16px;
}

.form {
	margin: 50px auto;
	width: 90%;
	max-width: 480px;
	padding: 30px;
}
</style>
