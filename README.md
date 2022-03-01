# Hatchways Backend Assessment

# Description

In this assessment, our task was to write a simple backend JSON API to fetch data from https://api.hatchways.io/assessment/blog/posts.

The API has the following routes:

---

## Route 1

### Request

`GET /api/ping`

### Response

Response body (JSON): `{ "success": true }`

Response status code: `200`

---

## Route 2

### Request

`GET /api/posts`

### Query Parameters

| Syntax    | Type              | Description                                 | Default | Example      |
| --------- | ----------------- | ------------------------------------------- | ------- | ------------ |
| tags      | String (required) | A comma separated list of tags.             | N/A     | science,tech |
| sortBy    | String (optional) | sort posts by id, reads, likes, popularity. | id      | popularity   |
| direction | String (optional) | direction for sorting by desc, asc          | asc     | asc          |

### Successful Response

Response body (JSON):

```
{
"posts": [{
"id": 1,
"author": "Rylee Paul",
"authorId": 9,
"likes": 960,
"popularity": 0.13,
"reads": 50361,
"tags": [ "tech", "health" ]
},
...
]
}
```

Response status code: `200`

### Error Response

If `tags` parameter is not present:

Response body (JSON):

```
{
"error": "tags parameter is required"
}
```

Response status code: `400`

If a `sortBy` or `direction` are invalid values:

Response body (JSON):

```
{
"error": "sortBy parameter is invalid"
}
```

Response status code: `400`

---

This application uses the following npm packages:

- [express](https://www.npmjs.com/package/express)
- [jest](https://www.npmjs.com/package/jest)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [request](https://www.npmjs.com/package/request)
- [supertest](https://www.npmjs.com/package/supertest)

JavaScript | Node.js

# Testing

### install command

`npm i`

### run command

`npm start`

### test command

`npm test`

### PORT

`3000`

# Link

[Video demonstration](https://drive.google.com/file/d/1lQjJRL8ZPHF29JJ15PBHE220OQJSzi-L/view?usp=sharing)
