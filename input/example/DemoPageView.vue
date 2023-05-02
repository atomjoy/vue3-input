<script setup>
import { ref } from 'vue'

import Input from '@/components/input/Input.vue'
import Select from '@/components/input/Select.vue'
import Password from '@/components/input/Password.vue'
import Textarea from '@/components/input/Textarea.vue'
import SelectPrefix from '@/components/input/SelectPrefix.vue'
import Checkbox from '@/components/input/Checkbox.vue'
import Radiobox from '@/components/input/Radiobox.vue'

// Color v-bind css
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

// Password events
function validPass(str) {
	console.log('Fireworks! Valid pass event', str)
}

function invalidPass(str) {
	console.log('Bruhh! Invalid pass event', str)
}

// Form submit
function onSubmit(e) {
	let data = new FormData(e.target)
	// Show inputs
	for (var pair of data.entries()) {
		console.log('Input key:', pair[0], 'Value:', pair[1])
	}
	// send data to the server with axios here (backend)
}
</script>

<template>
	<h1 class="color">Home page</h1>

	<form @submit.prevent="onSubmit" class="form">
		<Input type="text" name="name" v-model="input" placeholder="Name" label="Name" />

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

		<!-- Multiple checkboxes array -->
		<Checkbox label="Cash" value="cash" v-model="payment" name="pay_cash" />
		<Checkbox label="Card" value="card" v-model="payment" name="pay_card" />

		<!-- Single checkbox true/false  -->
		<Checkbox label="Remember me" value="1" v-model="remember_me" name="remember_me" />

		<Radiobox label="Banan" value="Banan" v-model="radio" name="radio" />
		<Radiobox label="Melon" value="Melon" v-model="radio" name="radio" />
		<Radiobox label="Cherry" value="Cherry" v-model="radio" name="radio" />

		<button class="button">Update Settings</button>

		<h4>{{ input }} {{ password }} {{ select1 }} {{ select2 }} {{ prefix }} {{ payment }} {{ remember_me }} {{ textarea }} {{ radio }}</h4>
	</form>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html {
	font-size: 14px;
	font-family: 'Poppins', Arial, sans-serif;
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
}

.form {
	margin: 50px auto;
	width: 90%;
	max-width: 480px;
	padding: 30px;
}
</style>
