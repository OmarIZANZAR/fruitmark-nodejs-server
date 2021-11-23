let stores = [
    {
        name: "Marsela",
        stock: [
            {
                fruit: "banana",
                quantity: 50,
            },
            {
                fruit: "apple",
                quantity: 60,
            },
            {
                fruit: "orange",
                quantity: 70,
            },
            {
                fruit: "strawberry",
                quantity: 80,
            },
            {
                fruit: "cherry",
                quantity: 90,
            }
        ]
    },
    {
        name: "Paris",
        stock: [
            {
                fruit: "banana",
                quantity: 50,
            },
            {
                fruit: "apple",
                quantity: 60,
            },
            {
                fruit: "orange",
                quantity: 70,
            },
            {
                fruit: "strawberry",
                quantity: 80,
            },
            {
                fruit: "cherry",
                quantity: 90,
            }
        ]
    },
    {
        name: "Dijon",
        stock: [
            {
                fruit: "banana",
                quantity: 50,
            },
            {
                fruit: "apple",
                quantity: 60,
            },
            {
                fruit: "orange",
                quantity: 70,
            },
            {
                fruit: "strawberry",
                quantity: 80,
            },
            {
                fruit: "cherry",
                quantity: 90,
            }
        ]
    },
    {
        name: "Niza",
        stock: [
            {
                fruit: "banana",
                quantity: 50,
            },
            {
                fruit: "apple",
                quantity: 60,
            },
            {
                fruit: "orange",
                quantity: 70,
            },
            {
                fruit: "strawberry",
                quantity: 80,
            },
            {
                fruit: "cherry",
                quantity: 90,
            }
        ]
    },
    {
        name: "Lila",
        stock: [
            {
                fruit: "banana",
                quantity: 50,
            },
            {
                fruit: "apple",
                quantity: 60,
            },
            {
                fruit: "orange",
                quantity: 70,
            },
            {
                fruit: "strawberry",
                quantity: 80,
            },
            {
                fruit: "cherry",
                quantity: 90,
            }
        ]
    }
]

let users = [
    {
        username: "admin",
        password: "admin",
        image: "https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=497&q=80"
    }
]

let transactions = [
    {
        from: "Marsela",
        to: "Paris",
        content: [
            {
                fruit: "banana",
                quantity: 10,
            },
            {
                fruit: "apple",
                quantity: 20,
            }
        ]
    }
]

module.exports = { stores, users, transactions }