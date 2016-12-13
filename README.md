# joi-prefixed-ordered-uuid
[![Version](https://badge.fury.io/js/joi-prefixed-ordered-uuid.svg)](http://badge.fury.io/js/joi-prefixed-ordered-uuid)
[![Downloads](http://img.shields.io/npm/dm/joi-prefixed-ordered-uuid.svg)](https://www.npmjs.com/package/joi-prefixed-ordered-uuid)

Ordered UUID's can increase database performance over regular UUID's. The prefix helps you identify the type of resource associated with its ID. This Joi extension
helps you validate these ID's in both binary and string format. It can be paired with [https://github.com/paulleduc/bookshelf-prefixed-ordered-uuid](bookshelf-prefixed-ordered-uuid).

### Installation

After installing `joi-prefixed-ordered-uuid` with `npm i --save joi-prefixed-ordered-uuid`,
add it as a Joi extension and use it in your validation schema:

```javascript
let Joi = require('joi');
Joi = require('joi-prefixed-ordered-uuid')(Joi);

let schema = {
    id: Joi.pouuid().pouuid('BO').required(),
    author_id: Joi.pouuid().pouuid('AU').required(),
    title: Joi.string().min(1).max(100).required(),
};
```
