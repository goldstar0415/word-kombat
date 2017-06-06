![word-kombat](https://gitlab.com/Saka7/Word-Kombat/raw/master/front/src/assets/images/icons/icon-128x128.png)

# Word Kombat

Platform for English words learning

# Build and Run

> To run this app you need [Node.js 6+](https://nodejs.org/en/) and [npm 3+](https://www.npmjs.com/) and [PostgreSQL](https://www.postgresql.org/download/) database

## On Unix-based OS

1. Clone repository `git clone https://gitlab.com/Saka7/Word-Kombat.git`
2. Navigate to the project parent folder `cd Word-Kombat`
3. Configure database connection properties in `back/config/configuration.json`
4. Configure `cloudinary` api key and secret in `back/config/configuration.json`
5. To build project run `./build_and_run` script
6. You can run project using `npm start --prefix back` or using executable `build/word-kombat`

## On Windows OS

1. SUFFER!!!
2. Just kidding ...
3. Install front-end dependencies `npm install --prefix front`
4. Install back-end dependencies `npm install --prefix back`
5. Configure database connection properties in `back/config/configuration.json`
6. Configure `cloudinary` api key and secret in `back/config/configuration.json`
7. Build front-end `npm run build:prod-sw --prefix front`
8. Build documentation `npm run doc --prefix back`
9. Build back-end `npm run build:prod-win --prefix back`
10. And, finally, start it `npm start --prefix back` or `/builds/word-kombat-win.exe`

> By default project will be running on port 8080

# License
Word-Kombat is released under the [BSD-3 License](https://opensource.org/licenses/BSD-3-Clause).

