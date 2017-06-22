![word-kombat](https://github.com/Saka7/word-kombat/blob/master/front/src/assets/images/icons/icon-152x152.png)

# Word Kombat

Platform for English words learning.
> Because learning never was so fun!

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
![signup](https://github.com/Saka7/word-kombat/blob/master/screenshots/signup.png)

## Chat
![chat](https://github.com/Saka7/word-kombat/blob/master/screenshots/chat.png)

## Match End
![match-end](https://github.com/Saka7/word-kombat/blob/master/screenshots/match-end.png)

## Account
![account](https://github.com/Saka7/word-kombat/blob/master/screenshots/account.png)

## Leaderboards
![leaderboards](https://github.com/Saka7/word-kombat/blob/master/screenshots/leaderboards.png)

## On Mobile Screens
![mobile](https://github.com/Saka7/word-kombat/blob/master/screenshots/mobile.png)

## Chat Offline
![chat-offline](https://github.com/Saka7/word-kombat/blob/master/screenshots/chat-offline.png)

## Account Offline
![account-offline](https://github.com/Saka7/word-kombat/blob/master/screenshots/account-offline.png)



# License
Word-Kombat is released under the [BSD-3 License](https://opensource.org/licenses/BSD-3-Clause).

