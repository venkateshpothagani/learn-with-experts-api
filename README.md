# **API For Learn-With-Experts**

## <u>Generic Responses</u>

### 1. Error response

```js
{
    message: "Error message",
    details: {
        ...error
    }
}
```

### 2. Success reponse

```js
{
    message:"Success message",
    data: {
        ...data
    }
}
```

 <br/>
 <br/>

> 🔒 - Required Authorization
>
> Implemented using JWT Token
>
> Token required in Authorization Header `Bearer Token`

 <br/>
 <br/>

## <u>Auth and Auth end points</u>

### 1. Register/Signup

| METHOD | END POINT         |
| ------ | ----------------- |
| `POST` | `api/user/signup` |

```js
{
	username: string;
	password: string;
	confirmPassword: string;
	interestedTech: Array<string>;
	expertizedTech: Array<string>;
	languages: Array<string>;
	fullName: string; // Optional
	mail: string; // Optional
	description: string; // Optional
	institution: string; // Optional
	gender: string; // Optional
	phone: string; // Optional
	address: string; // Optional
}
```

<br/>

### 2. Sign-in

| METHOD | END POINT        |
| ------ | ---------------- |
| `POST` | `api/user/login` |

```js
{
	username: string;
	password: string;
}
```

<br/>

### 3. Refresh Token

| METHOD | END POINT          |
| ------ | ------------------ |
| `POST` | `api/user/refresh` |

```js
{
	refreshToken: string;
}
```

<br/>

### 4. Logout 🔒

| METHOD | END POINT         |
| ------ | ----------------- |
| `POST` | `api/user/logout` |

```js
{
	refreshToken: string;
}
```

<br/>

### 5. Update details 🔒

| METHOD | END POINT         |
| ------ | ----------------- |
| `PUT`  | `api/user/update` |

```js
// All fields in data object are optional
{
username: string,
data: {
	username: string;
	interestedTech: Array<string>;
	expertizedTech: Array<string>;
	languages: Array<string>;
	fullName: string;
	mail: string;
	description: string;
	institution: string;
	gender: string;
	phone: string;
	address: string;
	}
}
```

<br/>

### 6. Delete user 🔒

| METHOD   | END POINT         |
| -------- | ----------------- |
| `DELETE` | `api/user/remove` |

```js
{
	username: string;
}
```

<br/>
<br/>

## <u>User/Experts details end points</u>

### 1. Get specific user details 🔒

| METHOD | END POINT        |
| ------ | ---------------- |
| `GET`  | `api/expert/:id` |

_No data required in body_

<br/>

### 2. Get all users

| METHOD | END POINT    |
| ------ | ------------ |
| `GET`  | `api/expert` |

```js
{
	tagOne: string;
	tagTwo: string;
	tagThree: string;
}
```

<br/>

## <u>Post details end points</u>

### 1. Create a post 🔒

| METHOD | END POINT  |
| ------ | ---------- |
| `POST` | `api/post` |

```js
{
	description: string;
    tags: Array<string>;
}
```

<br/>

### 2. Get all posts 🔒

| METHOD | END POINT  |
| ------ | ---------- |
| `GET`  | `api/post` |

```js
{
    tagOne: string,
    tagTwo: string, // Optional
    tagThree: string, // Optional
    type: "POST"|"QUESTION"
}
```

<br/>

### 3. Get a post 🔒

| METHOD | END POINT      |
| ------ | -------------- |
| `GET`  | `api/post/:id` |

_No data required in body_

<br/>

### 4. Update a post. 🔒

| METHOD | END POINT      |
| ------ | -------------- |
| `PUT`  | `api/post/:id` |

```js
{
	description: string; // Optional
    tags: Array<string>; // Optional
}
```

<br/>
<br/>

### 5. Delete a post. 🔒

| METHOD | END POINT      |
| ------ | -------------- |
| `PUT`  | `api/post/:id` |

_No data required in body_

<br/>
<br/>

## <u>Comment details end points</u>

### 1. Create a comment. 🔒

| METHOD | END POINT     |
| ------ | ------------- |
| `POST` | `api/comment` |

```js
{
	userRef: string; // ObjectId
	postRef: string; // ObjectId
	description: string;
}
```

<br/>

### 2. Get a comment 🔒

| METHOD | END POINT         |
| ------ | ----------------- |
| `GET`  | `api/comment/:id` |

_No required in body_

<br/>

### 3. Get all comments

| METHOD | END POINT     |
| ------ | ------------- |
| `GET`  | `api/comment` |

```js
{
	postRef: string; // ObjectId
}
```

<br/>

### 4. Update comment 🔒

| METHOD | END POINT         |
| ------ | ----------------- |
| `PUT`  | `api/comment/:id` |

```js
{
	userRef: string; // ObjectId
	postRef: string; // ObjectId
	description: string;
}
```

<br/>

### 5. Delete comment 🔒

| METHOD | END POINT         |
| ------ | ----------------- |
| `PUT`  | `api/comment/:id` |

_No required in body_

<br/>

## **Development is still in progress.**

**Lot of thing will change including documentation in ReadME, auth end-points, getting feed and features like voting/likes for posts, etc..**
