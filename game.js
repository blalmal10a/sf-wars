let graphics, mainCharacter, silaimu, scoreText
let score = 0

let bullets = []
let randomCharacters = []

// Create a PixiJS application and stage
const app = new PIXI.Application({width: 800, height: 600})
document.getElementById("app-container").appendChild(app.view)

// Create a Graphics object to draw the "A" shape
createMainCharacter()

let currentlyMoving = false
let distance = 0
let isMoving = false // Flag to control whether the element is moving
let targetX = 0 // X-coordinate to move towards
let targetY = 0 // Y-coordinate to move towards

let targetRotation = mainCharacter.rotation // Target rotation when clicked

// Rotation speed for the mainCharacter
const rotationSpeed = 0.1 // Adjust this value as needed

// Add a click event listener to start moving the element
document.addEventListener("contextmenu", (e) => {
	e.preventDefault()
	// Get the cursor position relative to the stage
	const mousePosition = app.renderer.plugins.interaction.mouse.global

	// Set the target coordinates to the cursor position
	targetX = mousePosition.x
	targetY = mousePosition.y

	// Calculate the angle to point towards the target
	const dx = targetX - mainCharacter.x
	const dy = targetY - mainCharacter.y
	targetRotation = Math.atan2(dy, dx)

	// Enable movement
	isMoving = true
})

// Add a ticker to update the element's position and rotation
app.ticker.add((delta) => {
	if (isMoving) {
		// Calculate the distance to the target
		const dx = targetX - mainCharacter.x
		const dy = targetY - mainCharacter.y
		distance = Math.sqrt(dx * dx + dy * dy)

		// Define a threshold distance to stop before overlap
		const thresholdDistance = 1

		// Check if the element is close enough to stop
		if (distance > thresholdDistance) {
			// Calculate the angle to point towards the target
			const angle = Math.atan2(dy, dx)

			// Calculate the new position based on the target position
			const speed = 2 // Constant speed
			const newX = mainCharacter.x + Math.cos(angle) * speed * delta
			const newY = mainCharacter.y + Math.sin(angle) * speed * delta

			// Update the element's position
			mainCharacter.x = newX
			mainCharacter.y = newY

			// Calculate the rotation difference
			const rotationDiff = targetRotation - mainCharacter.rotation

			// Ensure the rotation difference is within the range [-π, π]
			const rotationDelta = ((rotationDiff + Math.PI) % (2 * Math.PI)) - Math.PI

			// Calculate the rotation increment based on the constant rotation speed
			const rotationIncrement = rotationSpeed * delta

			// Rotate the character towards the target rotation
			mainCharacter.rotation += rotationIncrement * Math.sign(rotationDelta)
		} else {
			// Stop moving and rotating once the element reaches the target
			isMoving = false
		}
	}

	// Update bullet positions and remove them after 1 second
	bullets.forEach((bullet, index) => {
		randomCharacters.forEach((character, characterIndex) => {
			if (checkCollision(bullet, character)) {
				// Remove the bullet and character from the stage and their respective arrays
				bullets.splice(index, 1)
				app.stage.removeChild(character)
				randomCharacters.splice(characterIndex, 1)

				// Increment the score and update the score text
				score++
				scoreText.text = "Score: " + score
				setTimeout(() => {
					app.stage.removeChild(bullet)
				}, 50)
			}
		})

		// Track bullet creation time
		if (!bullet.creationTime) {
			bullet.creationTime = app.ticker.lastTime
		}

		// Check if the bullet has been alive for more than 1 second
		if (app.ticker.lastTime - bullet.creationTime > 500) {
			// Remove the bullet from the stage and the bullets array
			app.stage.removeChild(bullet)
			bullets.splice(index, 1)
		}
	})
})

document.addEventListener("keydown", (e) => {
	if (e.key === "z" || e.key === "Z" || e.key === "q" || e.key === "Q") {
		// Create a new bullet at the edge of the line
		const bullet = new PIXI.Sprite(app.renderer.generateTexture(silaimu))
		bullet.anchor.set(0.5) // Center the anchor point

		// Calculate the position of the bullet at the edge of the line
		const lineEdgeX = mainCharacter.x + Math.cos(mainCharacter.rotation) * 20
		const lineEdgeY = mainCharacter.y + Math.sin(mainCharacter.rotation) * 20
		bullet.position.set(lineEdgeX, lineEdgeY)

		app.stage.addChild(bullet)

		// Add the bullet to the bullets array for tracking
		bullets.push(bullet)

		if (isMoving) {
			currentlyMoving = true
		} else {
			currentlyMoving = false
		}
		isMoving = false

		setTimeout(() => {
			if (currentlyMoving) isMoving = true
		}, 300)
	}
})

document.addEventListener("keydown", (e) => {
	if (e.key === "x" || e.key === "X" || e.key === "w" || e.key === "W") {
		// Create a new bullet at the edge of the line
		const bullet = new PIXI.Sprite(app.renderer.generateTexture(silaimu))
		bullet.anchor.set(0.5) // Center the anchor point

		// Calculate the position of the bullet at the edge of the line
		const lineEdgeX = mainCharacter.x + Math.cos(mainCharacter.rotation) * 50
		const lineEdgeY = mainCharacter.y + Math.sin(mainCharacter.rotation) * 50
		bullet.position.set(lineEdgeX, lineEdgeY)

		app.stage.addChild(bullet)

		// Add the bullet to the bullets array for tracking
		bullets.push(bullet)

		if (isMoving) {
			currentlyMoving = true
		} else {
			currentlyMoving = false
		}
		isMoving = false

		setTimeout(() => {
			if (currentlyMoving) isMoving = true
		}, 300)
	}
})

document.addEventListener("keydown", (e) => {
	if (e.key === "c" || e.key === "C" || e.key === "e" || e.key === "E") {
		// Create a new bullet at the edge of the line
		const bullet = new PIXI.Sprite(app.renderer.generateTexture(silaimu))
		bullet.anchor.set(0.5) // Center the anchor point

		// Calculate the position of the bullet at the edge of the line
		const lineEdgeX = mainCharacter.x + Math.cos(mainCharacter.rotation) * 80
		const lineEdgeY = mainCharacter.y + Math.sin(mainCharacter.rotation) * 80
		bullet.position.set(lineEdgeX, lineEdgeY)

		app.stage.addChild(bullet)

		// Add the bullet to the bullets array for tracking
		bullets.push(bullet)

		if (isMoving) {
			currentlyMoving = true
		} else {
			currentlyMoving = false
		}
		isMoving = false

		setTimeout(() => {
			if (currentlyMoving) isMoving = true
		}, 300)
	}
})

document.addEventListener("keydown", (e) => {
	if (e.key == "s" || e.key == "S") {
		isMoving = false
		targetX = mainCharacter.x
		targetY = mainCharacter.y
		distance = 0
	}
})

function createRadialGradientCanvas() {
	const canvas = document.createElement("canvas")
	canvas.width = 100 // Adjust the size as needed
	canvas.height = 100

	const ctx = canvas.getContext("2d")
	const centerX = canvas.width / 2
	const centerY = canvas.height / 2
	const radius = canvas.width / 2

	const gradient = ctx.createRadialGradient(
		centerX,
		centerY,
		0,
		centerX,
		centerY,
		radius,
	)
	gradient.addColorStop(0, "yellow") // Yellow at the center
	gradient.addColorStop(0.5, "black") // Black in the middle
	gradient.addColorStop(1, "rgba(255, 255, 255, 0)") // White with transparency at the edge

	ctx.fillStyle = gradient
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	ctx.fill()

	return canvas
}

function createMainCharacter() {
	scoreText = new PIXI.Text("Score: 0", {
		fontFamily: "Arial",
		fontSize: 24,
		fill: 0xff1010,
		align: "center",
	})
	scoreText.x = app.screen.width - 100
	scoreText.y = 10
	app.stage.addChild(scoreText)

	silaimu = new PIXI.Graphics()
	silaimu.beginFill(0x11eeee)
	silaimu.drawCircle(0, 0, 20)
	silaimu.endFill()

	graphics = new PIXI.Graphics()
	graphics.beginFill(0xffffff)
	graphics.drawCircle(0, 0, 10)
	graphics.endFill()
	graphics.lineStyle(2, 0xffffff)
	graphics.moveTo(10, -10)
	graphics.lineTo(5, -10)
	graphics.moveTo(10, 10)
	graphics.lineTo(5, 10)

	// Create a sprite with the Graphics object as a texture
	mainCharacter = new PIXI.Sprite(app.renderer.generateTexture(graphics))
	mainCharacter.anchor.set(0.5) // Center the anchor point
	mainCharacter.position.set(app.screen.width / 2, app.screen.height / 2)
	app.stage.addChild(mainCharacter) // Add the character to the stage
}

//////

// Create a function to generate a random character shape
function generateRandomCharacter() {
	const graphics = new PIXI.Graphics()
	graphics.beginFill(0xffffff) // Fill color (white)
	// You can define your own random shape logic here.
	// For example, you can draw random lines, circles, or polygons.
	// For simplicity, we'll create a random circle.
	const radius = Math.random() * 10 + 10 // Random radius between 10 and 30
	graphics.drawCircle(0, 0, radius)
	return graphics
}

// Create a function to spawn a random character
function spawnRandomCharacter() {
	const randomCharacter = new PIXI.Sprite(
		app.renderer.generateTexture(generateRandomCharacter()),
	)
	randomCharacter.anchor.set(0.5) // Center the anchor point
	randomCharacter.position.set(
		Math.random() * app.screen.width,
		Math.random() * app.screen.height,
	)
	app.stage.addChild(randomCharacter)

	// Randomize the character's movement direction and speed
	const speed = Math.random() * 0.5 + 1 // Random speed between 1 and 3
	const angle = Math.random() * Math.PI * 2 // Random angle in radians
	const velocityX = Math.cos(angle) * speed
	const velocityY = Math.sin(angle) * speed

	// Set a timer to remove the character after 10 seconds
	randomCharacters.push(randomCharacter)
	console.log(randomCharacters)

	setTimeout(() => {
		console.log("deleted: ", randomCharacter)
		app.stage.removeChild(randomCharacter)
		if (randomCharacters.length > 10) {
			randomCharacters.shift()
		}
	}, 10000)

	// Update the character's position in each frame
	app.ticker.add((delta) => {
		randomCharacter.x += velocityX * delta
		randomCharacter.y += velocityY * delta
	})
}

// Function to spawn random characters every 3 to 5 seconds
function spawnRandomCharactersPeriodically() {
	const spawnInterval = Math.random() * 0 + 800 // Random interval between 3 and 5 seconds
	setTimeout(() => {
		spawnRandomCharacter()
		spawnRandomCharactersPeriodically()
	}, spawnInterval)
}

// Start spawning random characters
spawnRandomCharactersPeriodically()

function checkCollision(sprite1, sprite2) {
	const bounds1 = sprite1.getBounds()
	const bounds2 = sprite2.getBounds()

	return (
		bounds1.x < bounds2.x + bounds2.width &&
		bounds1.x + bounds1.width > bounds2.x &&
		bounds1.y < bounds2.y + bounds2.height &&
		bounds1.y + bounds1.height > bounds2.y
	)
}
