

document.addEventListener('DOMContentLoaded', (event) => {
    const wordForChildren = [
        {
            "name": "APPLE",
            "src": "apple-food-fruit-svgrepo-com.svg"
        },
        {
            "name": "BANANA",
            "src": "banana-svgrepo-com.svg"
        },
        {
            "name": "CAT",
            "src": "cat-svgrepo-com.svg"
        },
        {
            "name": "DOG",
            "src": "dog-svgrepo-com.svg"
        },
        {
            "name": "ELEPHANT",
            "src": "elephant-svgrepo-com.svg"
        },
        {
            "name": "FLOWER",
            "src": "flower-svgrepo-com.svg"
        },
        {
            "name": "GIRAFFE",
            "src": "giraffe-svgrepo-com.svg"
        },
        {
            "name": "HORSE",
            "src": "horse-svgrepo-com.svg"
        },
        {
            "name": "ICE-CREAM",
            "src": "ice-cream-svgrepo-com.svg"
        },
        {
            "name": "JELLYFISH",
            "src": "jellyfish-svgrepo-com.svg"
        },
        {
            "name": "KANGAROO",
            "src": "kangaroo-svgrepo-com.svg"
        },
        {
            "name": "LION",
            "src": "lion-face-svgrepo-com.svg"
        },
        {
            "name": "MONKEY",
            "src": "monkey-svgrepo-com.svg"
        },
        {
            "name": "NOODLES",
            "src": "noodles-svgrepo-com.svg"
        },
        {
            "name": "OCTOPUS",
            "src": "octopus-svgrepo-com.svg"
        },
        {
            "name": "PANDA",
            "src": "panda-svgrepo-com.svg"
        },
        {
            "name": "QUEEN",
            "src": "queen-svgrepo-com.svg"
        },
        {
            "name": "RAINBOW",
            "src": "rainbow-svgrepo-com.svg"
        },
        {
            "name": "SNAKE",
            "src": "snake-svgrepo-com.svg"
        },
        {
            "name": "TIGER",
            "src": "tiger-face-svgrepo-com.svg"
        },
        {
            "name": "UNICORN",
            "src": "unicorn-svgrepo-com.svg"
        },
        {
            "name": "VIOLIN",
            "src": "violin-svgrepo-com.svg"
        },
        {
            "name": "WATERMELON",
            "src": "watermelon-part-2-svgrepo-com.svg"
        },
        {
            "name": "XYLOPHONE",
            "src": "xylophone-svgrepo-com.svg"
        },
        {
            "name": "YO-YO",
            "src": "yo-yo-svgrepo-com.svg"
        },
        {
            "name": "ZEBRA",
            "src": "zebra-svgrepo-com.svg"
        }
    ]

    const emptyItem = {
        name: "",
        src: ""
    }

    let randomizedArray
    let currentItem

    let selectedEl
    let lettersInDisplay = ""

    let score = 0
    let total = 0


    const generateRandomArray = (letter) => {
        const randomArr = letter.split("")
        randomArr.sort(() => Math.random() - 0.5)
        console.log(randomArr.join(""), letter);
        if (randomArr.join("") === letter) {
            return generateRandomArray(letter)
        }
        return randomArr
    }

    const getLetterElement = (letter) => {
        const outerContainer = document.createElement("div")
        outerContainer.className = "avatar placeholder letter"
        const innerContainer = document.createElement("div")
        innerContainer.className = "bg-purple-200 rounded text-neutral-content w-8 hover:opacity-50"
        const letterEl = document.createElement("span")
        letterEl.className = "text-xl"
        letterEl.innerHTML = letter
        innerContainer.appendChild(letterEl)
        outerContainer.appendChild(innerContainer)
        return outerContainer
    }

    const spawnLetters = (givenWord) => {
        const displayEl = document.getElementById("display")
        displayEl.innerHTML = ""
        lettersInDisplay = generateRandomArray(givenWord)
        for (let letter of lettersInDisplay) {
            const letterEl = getLetterElement(letter)
            letterEl.addEventListener("click", () => handleOnClickLetter(letterEl))
            displayEl.appendChild(letterEl)
        }
    }

    const handleOnClickLetter = (letterEl) => {
        const innerContainer = letterEl.children.item(0)
        if (selectedEl) {
            const tmp = selectedEl.children.item(0).innerHTML
            selectedEl.children.item(0).innerHTML = innerContainer.children.item(0).innerHTML
            innerContainer.children.item(0).innerHTML = tmp
            selectedEl.className = "bg-purple-200 rounded text-neutral-content w-8 hover:opacity-50"
            selectedEl = null
        } else {
            selectedEl = innerContainer
            innerContainer.className = "bg-purple-400 rounded text-neutral-content w-8 hover:opacity-50"
        }
    }

    const getLetters = () => {
        const elements = document.getElementsByTagName("span")
        let letters = ""
        for (let el of elements) {
            letters += el.innerHTML
        }
        return letters
    }

    const handleSubmit = () => {
        const resultEl = document.getElementById("result")
        resultEl.innerHTML = getLetters() === currentItem.name ? '<p class="text-3xl text-success font-medium">Correcto!</p>' : `<p class="text-3xl text-error font-medium">Sorry! The answer is <span class="text-black">${currentItem.name}</span></p>`
        score = getLetters() === currentItem.name ? score + 1 : score
        total++
        updateScore()

        const displayEl = document.getElementById("display")
        displayEl.innerHTML = ""
        updateImg(emptyItem)
        const inputEl = document.getElementById("input-box")
        inputEl.className = "flex flex-row gap-6 justify-center hidden"

        setTimeout(() => {
            resultEl.innerHTML = ""
            if (total === wordForChildren.length) {
                displayEl.innerHTML = `<p class="text-success font-bold">Thank you for playing!</p><br>
                <button id="reset-btn1" class="btn btn-xs btn-secondary mt-5">play again</button>`
                const playAgainButton = document.getElementById("reset-btn1")
                playAgainButton.addEventListener("click", startGame)
            } else {
                inputEl.className = "flex flex-row gap-6 justify-center"
                randomizedArray.shift()
                updateDisplay()
            }


        }, 1500)
    }

    const handleReset = () => {
        const resultEl = document.getElementById("result")
        resultEl.innerHTML = ""
        spawnLetters(currentItem.name)
    }

    const startGame = () => {
        score = 0
        total = 0
        randomizedArray = [...wordForChildren]
        randomizedArray.sort(() => Math.random() - 0.5)
        updateDisplay()
        updateScore()
    }

    const updateDisplay = () => {
        currentItem = randomizedArray[0]
        spawnLetters(currentItem.name)
        updateImg(currentItem)
    }

    const updateScore = () => {
        const scoreEl = document.getElementById("score")
        console.log(randomizedArray.length);
        scoreEl.innerHTML = `${score}/${total}`
    }

    const updateImg = (item) => {
        const imgEl = document.getElementById("display-img")
        imgEl.src = `images/${item.src}`
        imgEl.alt = item.name
    }

    const submitButton = document.getElementById("submit-btn")

    submitButton.addEventListener("click", handleSubmit)

    const resetButton = document.getElementById("reset-btn")

    resetButton.addEventListener("click", startGame)

    // spawnLetters(givenWord)
    startGame()
});