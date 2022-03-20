let testObject = [
    {
    userName: "Julia",
    age: "7"
    },
    {
    userName: "Anna",
    age: "9"
    },
    {
    userName: "Ben",
    age: "10"
    },
    {
    userName: "Jess",
    age: "22"
    },
]

let myName = "Julia"


for(let person in testObject) {
    console.log(`${testObject[person].userName}`)
    if (testObject[person].userName === myName) {
        let myAge = testObject[person].age
        console.log(myAge)
    }
    
}
