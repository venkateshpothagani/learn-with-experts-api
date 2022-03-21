# README.md

## Learn with Experts API.

### Base URL: `https://localhost:3000`

#### Authentication and Authorization endpoints

##### Sign up

> api/auth/signup

**Request**

```js
var request = require('request');
var options = {
	method: 'POST',
	url: 'localhost:3000/api/auth/signup',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		id: '1',
		username: 'SampleUser_01',
		password: 'Super@Pwd',
		confirmPassword: 'Super@Pwd',
		mail: 'mail_01@mail1.com',
		expertizeTech: 'ex_01 ex_02',
		interestedTech: 'in_01 in_02 in_03',
		description: 'description_01',
		institution: 'institution_01',
		gender: 'gender_01',
		languages: 'languages_01 languages_02',
		phone: 'phone_01',
		address: 'address_01',
	}),
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	console.log(response.body);
});
```

##### Login

> api/auth/login

**Request**

```js
var request = require('request');
var options = {
	method: 'POST',
	url: 'localhost:3000/api/auth/login',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		username: 'SampleUser_01',
		password: 'Super@Pwd',
	}),
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	console.log(response.body);
});
```

**Response**

```json
{
	"accessToken": "JWT.Access.Token",
	"refreshToken": "JWT.Refresh.Token"
}
```

##### Refresh JWT Token

> api/auth/refresh

**Request**

```js
var request = require('request');
var options = {
	method: 'POST',
	url: 'localhost:3000/api/auth/refresh',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		refreshToken: 'JWT.Refresh.Token',
	}),
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	console.log(response.body);
});
```

**Response**

```json
{
	"accessToken": "JWT.Access.Token"
}
```

##### Logout

**Request**

```js
var request = require('request');
var options = {
	method: 'POST',
	url: 'localhost:3000/api/auth/logout',
	headers: {
		Authorization: 'Bearer JWT.Access.Token',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		refreshToken: 'JWT Refresh Token',
	}),
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	console.log(response.body);
});
```

**Response**

```json
{
	"acknowledged": true,
	"deletedCount": 1
}
```

#### Experts endpoints

#### Posts endpoints

#### Comments endpoints

#### Votes endpoints
