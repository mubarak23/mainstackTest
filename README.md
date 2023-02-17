

## Description

- Using Nodejs, Typescript, Express and MongoDB, build a simple ecommerce API with the following features:
1. Create, get all and get single product
2. Update product
3. Delete product
4. Simple pagination


## Deployed service
[Live URL]: https://main-stack-opbs.onrender.com

## Installation
[Live URL]: https://main-stack-opbs.onrender.com

# install package 
-- npm install


## Setup .env Variables
- NODE_ENV=development
- JWT_KEY_SECRET=

- CLOUD_NAME=techarewa-com
- STORAGE_API_KEY=
- STORAGE_API_SECRET=
- DB_URL=

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run dev

```

## Running the app

```bash

$ npm run build

```

```bash
## Endpoints 

# CREATE A CATEGORY
- URL: /api/category
- METHOD: POST 
- REQUIRED AUTH TOKEN in header : YES
- PAYLOAD SAMPLE:{
  "name": "Fresh",
  "description": "Fresh Fruits"
}
- RESPONSE SAMPLE: {
  "data": {
    "name": "Fresh",
    "description": "Fresh Fruits",
    "softDeleted": false,
    "user": {
      "_id": "63ec2520934063a2c6e5121b",
      "fullName": "Demo1",
      "email": "demo1@gmail.com",
      "createdAt": "2023-02-15T00:19:44.182Z",
      "updatedAt": "2023-02-15T00:19:44.182Z",
      "__v": 0
    },
    "_id": "63ec2e50735354caabdc705f",
    "createdAt": "2023-02-15T00:58:56.941Z",
    "updatedAt": "2023-02-15T00:58:56.941Z",
    "__v": 0
  }
}
# GET ALL CATEGORIES
- URL: /category
- METHOD: GET
- REQUIRED AUTH TOKEN HEADER: YES
- SAMPLE RESPONSE: [
  {
    "name": "Fresh",
    "description": "Fresh Fruits",
    "softDeleted": false,
    "user": {
      "_id": "63ec2520934063a2c6e5121b",
      "fullName": "Demo1",
      "email": "demo1@gmail.com",
      "createdAt": "2023-02-15T00:19:44.182Z",
      "updatedAt": "2023-02-15T00:19:44.182Z",
      "__v": 0
    },
    "_id": "63ec2e50735354caabdc705f",
    "createdAt": "2023-02-15T00:58:56.941Z",
    "updatedAt": "2023-02-15T00:58:56.941Z",
    "__v": 0
  }
]

# CREATE A PRODUCT
- URL: /api/product
- METHOD: POST
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- PAYLOAD SAMPLE: {
  "name": "full chest",
  "description": "hash and block chain operation",
  "quantity": 50,
  "category": "63ec2e50735354caabdc705f"
}
- RESPONSE SAMPLE: {
  "data": {
    "name": "full chest",
    "description": "hash and block chain operation",
    "quantity": 50,
    "images": [],
    "softDeleted": false,
    "user": {
      "_id": "63ec2520934063a2c6e5121b",
      "fullName": "Demo1",
      "email": "demo1@gmail.com",
      "createdAt": "2023-02-15T00:19:44.182Z",
      "updatedAt": "2023-02-15T00:19:44.182Z",
      "__v": 0
    },
    "category": {
      "_id": "63ec2e50735354caabdc705f",
      "name": "Fresh",
      "description": "Fresh Fruits",
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "createdAt": "2023-02-15T00:58:56.941Z",
      "updatedAt": "2023-02-15T00:58:56.941Z",
      "__v": 0
    },
    "_id": "63ef4c31bcc42eb3ab11a3d7",
    "createdAt": "2023-02-17T09:43:13.817Z",
    "updatedAt": "2023-02-17T09:43:13.817Z",
    "__v": 0
  }
}

# GET ALL PRODUCT
- URL:  /api/product
- METHOD: GET
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- SAMPLE RESPONSE: {
  "data": [
    {
      "_id": "63ef4c31bcc42eb3ab11a3d7",
      "name": "full chest",
      "description": "hash and block chain operation",
      "quantity": 50,
      "images": [],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-17T09:43:13.817Z",
      "updatedAt": "2023-02-17T09:43:13.817Z",
      "__v": 0
    },
    {
      "_id": "63ee4d2f3620d1412292d723",
      "name": "Valatine Bleez",
      "description": "Top notch and prepare",
      "quantity": 2500,
      "images": [],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T15:35:11.351Z",
      "updatedAt": "2023-02-16T15:35:11.351Z",
      "__v": 0
    },
    {
      "_id": "63ee485fbe7332e73ddaee79",
      "name": "Tech unwind",
      "description": "Shakeup and prepare for the new year",
      "quantity": 3000,
      "images": [],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T15:14:39.338Z",
      "updatedAt": "2023-02-16T15:14:39.338Z",
      "__v": 0
    },
    {
      "_id": "63ee483fbe7332e73ddaee74",
      "name": "JavaScript",
      "description": "Nodejs and Javascript Deep Dive",
      "quantity": 200,
      "images": [],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T15:14:07.025Z",
      "updatedAt": "2023-02-16T15:14:07.025Z",
      "__v": 0
    },
    {
      "_id": "63ee4287b88078e124b9f670",
      "name": "Nodejs and Javascript Deep Dive",
      "description": "Indept Javascript",
      "quantity": 100,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676559650/dev/aowvfaksvxsqjiudwdz9",
          "key": "dev/aowvfaksvxsqjiudwdz9"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T14:49:43.361Z",
      "updatedAt": "2023-02-16T15:00:50.239Z",
      "__v": 0
    },
    {
      "_id": "63ee4252b88078e124b9f66b",
      "name": "fetch category and user on update",
      "description": " Web3 is here and the future",
      "quantity": 100,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676559704/dev/kfeivmopvmffklk9dpjg",
          "key": "dev/kfeivmopvmffklk9dpjg"
        },
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676560030/dev/kxyzyp7pyxpuattiqrss",
          "key": "dev/kxyzyp7pyxpuattiqrss"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T14:48:50.501Z",
      "updatedAt": "2023-02-17T09:51:07.846Z",
      "__v": 0
    },
    {
      "_id": "63ee421eb88078e124b9f666",
      "name": "update name",
      "description": "Delicious Meal",
      "quantity": 20,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676560113/dev/uxmetxzjtz5jbpxgrbvx",
          "key": "dev/uxmetxzjtz5jbpxgrbvx"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T14:47:58.673Z",
      "updatedAt": "2023-02-16T15:39:25.119Z",
      "__v": 0
    },
    {
      "_id": "63ec36397868a75554d5e69b",
      "name": "Digital",
      "description": "Digital clock",
      "quantity": 45,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676557356/dev/m65ln70hu0wagzxpowkq",
          "key": "dev/m65ln70hu0wagzxpowkq"
        },
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676557635/dev/qyhpovlssmbz4szrjybq",
          "key": "dev/qyhpovlssmbz4szrjybq"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-15T01:32:41.260Z",
      "updatedAt": "2023-02-16T14:27:15.345Z",
      "__v": 0
    }
  ]
}



# GET SINGLE PRODUCT
- URL: /api/product/{productId}
- METHOD: GET
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- SAMPLE RESPONSE: {
  "data": {
    "_id": "63ee4252b88078e124b9f66b",
    "name": "Go Fast with Solidity",
    "description": " Web3 is here and the future",
    "quantity": 100,
    "images": [
      {
        "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676559704/dev/kfeivmopvmffklk9dpjg",
        "key": "dev/kfeivmopvmffklk9dpjg"
      },
      {
        "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676560030/dev/kxyzyp7pyxpuattiqrss",
        "key": "dev/kxyzyp7pyxpuattiqrss"
      }
    ],
    "softDeleted": false,
    "user": {
      "_id": "63ec2520934063a2c6e5121b",
      "fullName": "Demo1",
      "email": "demo1@gmail.com",
      
      "createdAt": "2023-02-15T00:19:44.182Z",
      "updatedAt": "2023-02-15T00:19:44.182Z",
      "__v": 0
    },
    "category": {
      "_id": "63ec2e50735354caabdc705f",
      "name": "Fresh",
      "description": "Fresh Fruits",
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "createdAt": "2023-02-15T00:58:56.941Z",
      "updatedAt": "2023-02-15T00:58:56.941Z",
      "__v": 0
    },
    "createdAt": "2023-02-16T14:48:50.501Z",
    "updatedAt": "2023-02-16T15:07:10.832Z",
    "__v": 0
  }
}

# GET PAGINATED LIST OF PRODUCTS
- URL:  /api/product
- METHOD: GET
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- QUERY : {
  limit: 5,
  page: 1
}
- SAMPLE RESPONSE: {
  "products": [
    {
      "_id": "63ec36397868a75554d5e69b",
      "name": "Digital",
      "description": "Digital clock",
      "quantity": 45,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676557356/dev/m65ln70hu0wagzxpowkq",
          "key": "dev/m65ln70hu0wagzxpowkq"
        },
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676557635/dev/qyhpovlssmbz4szrjybq",
          "key": "dev/qyhpovlssmbz4szrjybq"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-15T01:32:41.260Z",
      "updatedAt": "2023-02-16T14:27:15.345Z",
      "__v": 0
    },
    {
      "_id": "63ee421eb88078e124b9f666",
      "name": "update name",
      "description": "Delicious Meal",
      "quantity": 20,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676560113/dev/uxmetxzjtz5jbpxgrbvx",
          "key": "dev/uxmetxzjtz5jbpxgrbvx"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T14:47:58.673Z",
      "updatedAt": "2023-02-16T15:39:25.119Z",
      "__v": 0
    },
    {
      "_id": "63ee4252b88078e124b9f66b",
      "name": "fetch category and user on update",
      "description": " Web3 is here and the future",
      "quantity": 100,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676559704/dev/kfeivmopvmffklk9dpjg",
          "key": "dev/kfeivmopvmffklk9dpjg"
        },
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676560030/dev/kxyzyp7pyxpuattiqrss",
          "key": "dev/kxyzyp7pyxpuattiqrss"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T14:48:50.501Z",
      "updatedAt": "2023-02-17T09:51:07.846Z",
      "__v": 0
    },
    {
      "_id": "63ee4287b88078e124b9f670",
      "name": "Nodejs and Javascript Deep Dive",
      "description": "Indept Javascript",
      "quantity": 100,
      "images": [
        {
          "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676559650/dev/aowvfaksvxsqjiudwdz9",
          "key": "dev/aowvfaksvxsqjiudwdz9"
        }
      ],
      "softDeleted": false,
      "user": "63ec2520934063a2c6e5121b",
      "category": {
        "_id": "63ec2e50735354caabdc705f",
        "name": "Fresh",
        "description": "Fresh Fruits",
        "softDeleted": false,
        "user": "63ec2520934063a2c6e5121b",
        "createdAt": "2023-02-15T00:58:56.941Z",
        "updatedAt": "2023-02-15T00:58:56.941Z",
        "__v": 0
      },
      "createdAt": "2023-02-16T14:49:43.361Z",
      "updatedAt": "2023-02-16T15:00:50.239Z",
      "__v": 0
    }
  ],
  "totalPages": 2,
  "currentPage": "1"
}


// UPLOAD PRODUCT IMAGE
# ADD PROSUCT IMAGE
- URL: http://localhost:4500/api/product/upload-image/{productId}
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- METHOD: POST
- SAMPLE REQUEST PAYLOAD: {
  file: ""
}
- SAMPLE RESPONSE: {
  "message": "File Uploaded Successfully"
}


// UPDATE
# UPDATE PRODUCT
-  URL: /api/product/{productId}
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- METHOD: PATCH
- SAMPLE REQUEST PAYLOAD: {
  "name": "update name"
}
- SAMPLE RESPONSE: {
  "data": {
    "_id": "63ee421eb88078e124b9f666",
    "name": "update name",
    "description": "Delicious Meal",
    "quantity": 20,
    "images": [
      {
        "url": "https://res.cloudinary.com/techarewa-com/raw/upload/v1676560113/dev/uxmetxzjtz5jbpxgrbvx",
        "key": "dev/uxmetxzjtz5jbpxgrbvx"
      }
    ],
    "softDeleted": false,
    "user": "63ec2520934063a2c6e5121b",
    "category": "63ec2e50735354caabdc705f",
    "createdAt": "2023-02-16T14:47:58.673Z",
    "updatedAt": "2023-02-16T15:39:25.119Z",
    "__v": 0
  }
}


// DELETE 

# DELETE A Product
- URL: /api/product/{productId}
- REQUIRED AUTH HEADER TOKEN: YES (name: x-access-token)
- METHOD: DELETE
- SAMPLE RESPONSE: {
  "message": "Product deleted successfully."
}

# USER SIGNUP 
- URL: http://localhost:4500/api/users
- METHOD: POST
- REQUEST PAYLOAD:{
  "fullName": "Cool",
  "email": "cool@gmail.com",
  "password": "pass123"
}
- RESPONSE DATA: {
  "message": "User registered Successfully"
}

# USER LOGIN
- URL: auth/login
- METHOD: POST
- REQUEST PAYLOAD: {
  "email": "default01@gmail.com",
  "password": "pass123"
}
- RESPONSE DATA:  {
  "response": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGVmYXVsdE8xIiwiZW1haWwiOiJkZWZhdWx0MDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkT2VKLjlwUGtIcjJqdW1Wd3M1Mk83ZTFZcFNyTFkxY0NnYmNE"
  }
}

```