# Vue3 input components

Vue3 form inputs components (select, phone prefix, checkbox, radio, input, textarea, password with validation).

## Inputs (light/dark mode)

- Input
- Select
- Textarea
- Password (validation)
- Radiobox (select one)
- Checkbox (multiple, single)
- Phone prefix (flags, country, code)

## Import fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html {
  font-size: 20px;
  font-family: 'Poppins', Arial, sans-serif;
}
```

## Demo page

<https://github.com/atomjoy/vue3-input/blob/main/input/example/DemoPageView.vue>

## Optional RWD style

Add in input-root.css

```css
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
