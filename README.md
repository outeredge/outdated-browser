# Outdated Browser Notice

`<script src="outdated-browser.js"></script>`

Automatically initializes on script load

### Options

Options can be passed into the script tag as `data-attributes`

- `data-browsers` - comma separated browser names (versions optional)
- `data-classname` - string for wrapping div
- `data-html` - html for the notice
- `data-parent` - parent selector

#### Browsers

- `Chrome`
- `Firefox`
- `Safari`
- `IE`
- `Edge`
- `Opera`
- `Blink`

#### Examples

`<script src="outdated-browser.js" data-browsers="IE6,IE7,IE8"></script>`  
`<script src="outdated-browser.js" data-browsers="Chrome48"></script>`  
`<script src="outdated-browser.js" data-classname="my-custom-class"></script>`  
`<script src="outdated-browser.js" data-html="Oops, you should upgrade your browser"></script>`  
`<script src="outdated-browser.js" data-parent=".element.selector"></script>`  
`<script src="outdated-browser.js" data-parent="#elementid"></script>`  
