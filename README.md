# RepoInsight

A web application designed to analyze GitHub repositories and provide detailed insights into contributions.

## Features

- **Dashboard**: View overall statistics and insights about the repository.
- **Individual Insights**: Analyze contributions of individual contributors.
- **Line Modification**: Track changes and modifications to lines of code.
- **User Authentication**: Login and Sign Up functionality for users.
- **Search**: Search for repositories directly from the navbar.

## Technologies Used

- **Frontend**: React, React Router, Bootstrap, Chart.js, Recharts
- **Backend**: Node.js (to be connected)
- **Styling**: CSS, Bootstrap

## Installation

1. Clone the repository:
```sh
   git clone https://github.com/yourusername/repoinsight.git
   cd repoinsight
```

2. Install dependencies for the client:
```sh
    cd client
    npm install
```

3. Start the client:
```sh
    npm start
```

### Project Structure
```sh
    repoinsight
    ├── client
    │   ├── public
    │   ├── src
    │   │   ├── components
    │   │   │   ├── Navbar.js
    │   │   │   ├── Footer.js
    │   │   │   └── ...
    │   │   ├── pages
    │   │   │   ├── Dashboard.js
    │   │   │   ├── IndividualInsights.js
    │   │   │   ├── LineModification.js
    │   │   │   ├── Login.js
    │   │   │   ├── SignUp.js
    │   │   │   └── ...
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   └── ...
    │   ├── package.json
    │   └── ...
    └── README.md
```
### Usage
* Navigate to different sections using the navbar.
* View detailed insights and statistics on the Dashboard.
* Analyze individual contributions in the Individual Insights section.
* Track line modifications in the Line Modification section.
* Use the search bar to find specific repositories.

### References:

[React](https://reactjs.org/)
[React Router](https://reactrouter.com/)
[Bootstrap](https://getbootstrap.com/)
[Recharts](https://recharts.org/)
[Node.js](https://nodejs.org/)
