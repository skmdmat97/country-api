# Country API

This is a Node.js backend API service that provides information about countries. It includes authentication, endpoints to fetch country details by name, and a list of countries with filtering, sorting, and pagination.

## Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites

- Node.js installed on your system. If not, you can download it from [here](https://nodejs.org/).

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/country-api.git
   

2. Install dependencies:
   npm install

3. Start the server:
   npm start
   The server will be running at http://localhost:3000.


## API Endpoints
1. Authentication
Endpoint: /auth

Method: POST

Description: Generate a valid auth token based on user credentials (username/password).

Request Body: {
  "username": "your-username",
  "password": "your-password"
}
Replace username and password with provided username and password

Response: {
  "token": "your-generated-jwt-token"
}

2. Get Country Information by Name
Endpoint: /country/:name

Method: GET

Description: Fetch detailed information about a specific country by providing its name as a parameter.

Example CURL request: curl http://localhost:3000/country/india

2. Get List of Countries
Endpoint: /countries

Method: GET

Description: Retrieve a list of all countries' names based on filters (population/area/language) and sorting (asc/desc). Supports pagination.

Query Parameters:

population: Minimum population filter.
area: Minimum area filter.
language: Language filter.
sort: Sorting order (asc or desc).
page: Page number.
pageSize: Number of items per page.

Example CURL request: 
curl -H "Authorization: your-generated-jwt-token" "http://localhost:3000/country?language=english&area=2000&sort=desc& page=1&pageSize=10"


 