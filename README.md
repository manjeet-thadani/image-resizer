# Image Resizer

## Introduction

The "Image Resizer" is a utility tool that takes a image URL as a input and resize it to the following sizes:-

- Icon - 32x32
- Thumbnail - 150 x 150
- Medium - 450 x 450
- Large - 800 x 800

All the generated images are in square dimensions. If the link provided has a rectangle image, it is resized to a square one, without cropping the sides (equivalent to replicating CSS object-fit to contain).

The generated images are uploaded to Cloudinary.

## Implementation

The Image Resizer has been implemented using [Node.js](https://nodejs.org) and [TypeScript](https://www.typescriptlang.org/). The codebase has been designed and developed in such a way that it should be easy to understand and maintain.
Further, all the important functions have been properly documented to enhance the readability.

## Prerequisites

- [Node.js](https://nodejs.org/en/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.

- [Cloudinary] account and credentials

## Configure

1. Copy contents of `.env.default` and put it in a nw file `.env`

2. Add your cloudinary credentials

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

## Setup

1. Move in `image-resizer` directory

```bash
$ cd image-resizer
```

2. Install required dependencies

```bash
$ npm install
```

3. Run project

```bash
$ npm run dev
```

## Test

### Using Postman

The `postman` directory contains the postman collection with `/api/v1/resize` API along with its request and response.

### Using Swagger

The Swagger UI can be accessed at `http://localhost:3000/dev/api-docs/`

NOTE: The Swagger UI is only available if the application is started in `development` mode.

### Using cURL

**Request** Execute the below-mentioned cURL request

```bash
$ curl --location --request POST 'http://localhost:3000/api/v1/resize' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "url": "https://dqktdb1dhykn6.cloudfront.net/357882-TLRKytH3h.jpg"
  }'
```

**Response**

```bash
{
    "message": "Image on the URL has been resized and upload to cloudinary",
    "originalURL": "https://dqktdb1dhykn6.cloudfront.net/357882-TLRKytH3h.jpg",
    "resizedURLs": [
        "http://res.cloudinary.com/dejxoamrt/image/upload/v1610272751/BMSQ4KBpJ/32-32/h8nlsmnmszlpfryeblfs.jpg",
        "http://res.cloudinary.com/dejxoamrt/image/upload/v1610272752/BMSQ4KBpJ/150-150/xdaa4pvcznpc4n1k9rep.jpg",
        "http://res.cloudinary.com/dejxoamrt/image/upload/v1610272755/BMSQ4KBpJ/450-450/sced5mnryknxlhxajfmn.jpg",
        "http://res.cloudinary.com/dejxoamrt/image/upload/v1610272755/BMSQ4KBpJ/800-800/nspseeg27cnoyfudauvw.jpg"
    ]
}
```
