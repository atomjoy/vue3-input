# Vue3 form field components

Vue3 form field components with search and passowrd validation.

## Inputs (light/dark mode)

- Input
- Textarea
- Select (search)
- Password (validation)
- Radiobox (select one)
- Checkbox (multiple, single, onoff toggle)
- Phone prefix (flags emoji, country name, country code)

## Import fonts

assets/css/main.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html, input, select, textarea, option, label, div {
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
}

label i {
  float: right;
}

h1.full {
 text-align: left;
}
```

## Demo page

<https://github.com/atomjoy/vue3-input/blob/main/input/example/DemoPageView.vue>

## RWD settings and dark mode style

Style in input-root.css

```css
@media (prefers-color-scheme: dark) {
  html,
  body {
    background: var(--wow-bg);
  }
}

@media (max-width: 1600px) {
 :root {
  --wow-font-size: 18px;
 }
}

@media (max-width: 1280px) {
 :root {
  --wow-font-size: 16px;
 }
}

@media (max-width: 1024px) {
 :root {
  --wow-font-size: 14px;
 }
}

@media (max-width: 480px) {
 :root {
  --wow-font-size: 14px;
 }
}
```

## Images

<img src="https://raw.githubusercontent.com/atomjoy/vue3-input/main/input/example/vue3-inputs-prefix.png" width="100%">

<img src="https://raw.githubusercontent.com/atomjoy/vue3-input/main/input/example/vue3-inputs.png" width="100%">

<img src="https://raw.githubusercontent.com/atomjoy/vue3-input/main/input/example/vue3-checkbox-radio.png" width="100%">
