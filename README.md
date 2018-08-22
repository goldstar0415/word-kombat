# Word Kombat

![word-kombat](https://github.com/Saka7/word-kombat/blob/master/front/src/assets/images/icons/icon-152x152.png)

Platform for English words learning.

------

# Build and Run

> To run this app you need [Node.js 8+](https://nodejs.org/en/) and [npm 4+](https://www.npmjs.com/) and [PostgreSQL](https://www.postgresql.org/download/) database

1. Create environment variables: `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` with your cloudinary api-key and api-secret
2. To build and start the project run `docker-compose up --build -d` script


## Words scrapping
You can populate database with your own words set or use word scrapper.

To user word scrapper:
1. enable the onion routing proxy - [TOR proxy](https://askubuntu.com/questions/834017/configure-a-tor-proxy-on-ubuntu-16-04) (needed to prevent rate limiting)
2. run `npm start --prefix scrapper`
3. it will save all fetched words in `scrapper/data/words.json`.
4. Then you should write sequelize-seeder to insert result into the database
5. add seeder file into `back/database/seeders`
6. and run `npm run db:seed:all` - to apply changes

> For 20k words it will took approximately 120 minutes

# Main features
- words learning is based on an **association with images**
- and organized in **interactive chat-based competition**
- also, users can **track their progress**

# UI samples

## Sign Up
![signup](http://i.imgur.com/RXqEbhA.png)

## Chat (Words Learning)
![chat](http://i.imgur.com/1In3reU.png)

## The end of a match
![match-end](http://i.imgur.com/ZXVKzLJ.png)

## Account
![account](http://i.imgur.com/mwh3qaQ.png)

## Leaderboards
![leaderboards](http://i.imgur.com/ygrpOK9.png)

## On mobile screens
![mobile](http://i.imgur.com/LOA20zM.png)

## Chat offline
![chat-offline](http://i.imgur.com/w5XILSw.png)

## Account offline
![account-offline](http://i.imgur.com/bDDYqAS.png)


# License
Word-Kombat is released under the [BSD-3 License](https://opensource.org/licenses/BSD-3-Clause).

