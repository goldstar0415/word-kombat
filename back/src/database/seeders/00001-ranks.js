module.exports = {
    up: (queryInterface) =>
        queryInterface.bulkInsert("rank", [
            {
                id: 1,
                value: "1",
                min_score: 0,
                image: 'assets/images/ranks/1.png'
            },
            {
                id: 2,
                value: "2",
                min_score: 100,
                image: 'assets/images/ranks/2.png'
            },
            {
                id: 3,
                value: "3",
                min_score: 500,
                image: 'assets/images/ranks/3.png'
            },
            {
                id: 4,
                value: "4",
                min_score: 2000,
                image: 'assets/images/ranks/4.png'
            },
            {
                id: 5,
                value: "5",
                min_score: 10000,
                image: 'assets/images/ranks/5.png'
            },
            {
                id: 6,
                value: "6",
                min_score: 50000,
                image: 'assets/images/ranks/6.png'
            },
        ], {
            updateOnDuplicate: [
                "value", "min_score", "image"
            ]
        }),

    down: (queryInterface) => queryInterface.bulkDelete("rank", null, {})
};
