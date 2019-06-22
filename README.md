# drop-caps 📰
Drop caps for &lt;p>

Implamentation of [Drop caps & design systems](https://product.voxmedia.com/2019/6/17/18524029/the-ballad-of-drop-caps-and-design-systems)

## Installation

```bash
$ yarn add drop-caps
```

## Usage

### Import
```js
  import cap from 'drop-caps'
```

### Capitalize all paragraphs:
```js
cap()
```

### Capitalize whatever you like:
```js
cap('p.whatyouwant')
cap($('#boo'))
cap(['.bah', $('p')])
```

### Costumize size:
```js
cap(
  '.biz', // selector
  {
    fontSize: '5em', // font-size
    top: '-0.1px', // margin-top
    btm: '-0.2cap', // margin-bottom
  }
)
```
