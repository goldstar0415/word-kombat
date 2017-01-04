![word-kombat](https://gitlab.com/Saka7/Word-Kombat/raw/master/front/src/images/favicon.png)

# Word Kombat

Platform for english words learning

# Build and Run

> To run this app you need [Node.js 6+](https://nodejs.org/en/) and [npm 3+](https://www.npmjs.com/)

1. Clone repository `git clone https://gitlab.com/Saka7/Word-Kombat.git`
2. Navigate to the project parent folder `cd Word-Kombat`
3. Install tools `npm install -g gulp typescript stylus babel`
4. Install dependencies `npm install`
5. Configure database connection properties in `back/config/configuration.json`
6. Configure `cloudinary` api key and secret in `back/config/configuration.json`
7. Build the project `npm run make`
8. And, finally, start it `npm start`

> By default project will be running on port 8080

## Useful commands
- `npm run dev` - to start gulp for development
- `npm test` - to run tests

# License
Word-Kombat is released under the [BSD-3 License](https://opensource.org/licenses/BSD-3-Clause).

