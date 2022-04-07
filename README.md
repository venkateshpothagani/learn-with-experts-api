# API For Learn-With-Experts

<details>

<summary>  <b>Generic Responses</b> (click here to expand)</summary>

### Error response

```js
{
    message: "Error message",
    details: {
        ...error
    }
}
```

### Success reponse

```js
{
    message:"Success message",
    data: {
        ...data
    }
}
```

</details>

<details>

<summary><b>Auth and Auth end points</b> (click here to expand)</summary>

### Register/Signup

#### Required fields

```ts
User {
	username: string;
	password: string;
	confirmPassword: string;
	interestedTech: Array<string>;
	expertizedTech: Array<string>;
	languages: Array<string>;
	fullName?: string;
	mail?: string;
	description?: string;
	institution?: string;
	gender?: string;
	phone?: string;
	address?: string;
}
```

#### Request

#### Response

```json
{
	"message": "User data saved successfully",
	"data": {
		"username": "iamnewuser#001",
		"password": "$2b$10$aBSPD6AloqwlKSkWuXJpmODoo1tyPbSJ1JLFudg3PR26eOFY5p3QG",
		"interestedTech": ["A", "B", "C"],
		"expertizedTech": ["D", "E", "F"],
		"languages": ["English", "Telugu"],
		"timestamp": 1649258016572,
		"fullName": "First User",
		"mail": "userfirst@mail.org",
		"description": "Nothing",
		"institution": "Good People College for Engineering and Technology",
		"gender": "Female",
		"phone": "+91 9874561230",
		"address": "Super, Secert, Location, 123456",
		"_id": "624dae2059f743360c6b1823",
		"__v": 0
	}
}
```

### Sign-in

### Refresh Token

### Logout

</details>

<details>

<summary><b>User details end points</b> (click here to expand)</summary>

### Get specific user details

### Get all users / feed

</details>
<details>

<summary><b>Post details end points</b> (click here to expand)</summary>

</details>
<details>

<summary><b>Comment details end points</b> (click here to expand)</summary>

</details>
