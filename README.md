# E-Commerce Back End

## Description

This project provides the back end for an e-commerce website. It utilizes the latest technologies to create a functional Express.js API and interacts with a MySQL database using Sequelize.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Routes](#routes)
- [Video Walkthrough](#video-walkthrough)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/Cerna777/E-Commerce-Back-End`
2. Install dependencies: `npm install`

## Usage

To run the application, use the following command:

```bash
npm start

## Configuration

Before running the application, create a .env file in the root directory and add the following environment variables:

DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='your_mysql_password'

## Database Setup

Create a MySQL database with the name specified in the .env file (ecommerce_db).
Make sure you have MySQL installed on your system.
Run the following command to create and seed the development database: npm run seed

## Routes

Categories

GET /api/categories - Get all categories with associated products.
GET /api/categories/:id - Get a single category by its ID.
POST /api/categories - Create a new category.
PUT /api/categories/:id - Update a category by its ID.
DELETE /api/categories/:id - Delete a category by its ID.
Products

GET /api/products - Get all products with associated category and tags.
GET /api/products/:id - Get a single product by its ID.
POST /api/products - Create a new product.
PUT /api/products/:id - Update a product by its ID.
DELETE /api/products/:id - Delete a product by its ID.
Tags

GET /api/tags - Get all tags with associated products.
GET /api/tags/:id - Get a single tag by its ID.
POST /api/tags - Create a new tag.
PUT /api/tags/:id - Update a tag by its ID.
DELETE /api/tags/:id - Delete a tag by its ID.

Video Walkthrough

[https://drive.google.com/file/d/1j2Bft80DEtX-8lFe3cqYaQ-Jxtw6tS1C/view]

## Contributing

If you'd like to contribute to this project, please follow these guidelines...

## License

This project is licensed under the MIT License.