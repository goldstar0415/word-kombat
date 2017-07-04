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
3. Create environment varibales: `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` with your cloudinary api-key and api-secret
4. To build project run `./build_and_run` script
5. You can run project using `npm start --prefix back` or using executable `build/word-kombat-lin`

## On Windows OS

1. Install front-end dependencies `npm install --prefix front`
2. Install back-end dependencies `npm install --prefix back`
3. Create environment varibales: `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` with your cloudinary api-key and api-secret
4. Build front-end `npm run build:prod-sw --prefix front`
5. Build documentation `npm run doc --prefix back`
6. Build back-end `npm run build:prod-win --prefix back`
7. And, finally, start it `npm start --prefix back` or `/builds/word-kombat-win.exe`

> By default app will be running on port 8080

# Main features
- words learning is based on an **association with images**
- and organized in **interactive chat-based competition**
- also, users can **track their progress**

# UI samples

## Sign Up
![signup](http://i.imgur.com/RXqEbhA.png)

## Chat (Words Learning)
![chat](http://i.imgur.com/1In3reU.png)

## The End Of The Match
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

