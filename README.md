# Word Kombat
![build-status](https://api.travis-ci.org/Saka7/word-kombat.svg?branch=master)

![word-kombat](https://github.com/Saka7/word-kombat/blob/master/front/src/assets/images/icons/icon-152x152.png)

Platform for English words learning.
> Because learning never was so fun!

------

# Build and Run

> To run this app you need [Node.js 6+](https://nodejs.org/en/) and [npm 3+](https://www.npmjs.com/) and [PostgreSQL](https://www.postgresql.org/download/) database

## On Unix-based OS

1. Clone repository `git clone https://gitlab.com/Saka7/Word-Kombat.git`
2. Navigate to the project parent folder `cd Word-Kombat`
3. Create configuration properties `back/config/configuration.json` (you can use sample) and configure database connection properties
4. Configure `cloudinary` api key and secret in `back/config/configuration.json`
5. To build project run `./build_and_run` script
6. You can run project using `npm start --prefix back` or using executable `build/word-kombat`

## On Windows OS

1. SUFFER!!!
2. Just kidding ...
3. Install front-end dependencies `npm install --prefix front`
4. Install back-end dependencies `npm install --prefix back`
5. Create configuration properties `back/config/configuration.json` (you can use sample) and configure database connection properties
6. Configure `cloudinary` api key and secret in `back/config/configuration.json`
7. Build front-end `npm run build:prod-sw --prefix front`
8. Build documentation `npm run doc --prefix back`
9. Build back-end `npm run build:prod-win --prefix back`
10. And, finally, start it `npm start --prefix back` or `/builds/word-kombat-win.exe`

> By default project will be running on port 8080

# Main features
- words learning is based on an **association with images**
- and organized in **interactive chat-based competition**
- also, users can **track their progress** and achieve **ranks**

# UI samples

## Sign Up
![signup](http://i.imgur.com/RXqEbhA.png)

## Chat
![chat](http://i.imgur.com/1In3reU.png)

## Match End
![match-end](http://i.imgur.com/ZXVKzLJ.png)

## Account
![account](http://i.imgur.com/mwh3qaQ.png)

## Leaderboards
![leaderboards](http://i.imgur.com/ygrpOK9.png)

## On Mobile Screens
![mobile](http://i.imgur.com/LOA20zM.png)

## Chat Offline
![chat-offline](http://i.imgur.com/w5XILSw.png)

## Account Offline
![account-offline](http://i.imgur.com/bDDYqAS.png)



# License
Word-Kombat is released under the [BSD-3 License](https://opensource.org/licenses/BSD-3-Clause).

