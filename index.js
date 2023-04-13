const gameArea = document.querySelector('canvas');
const ctx = gameArea.getContext('2d')
const score = document.getElementById('scoreNumber')

//builds image variable to hold sprite
var image = document.createElement('img')
image.src = 'assets/Adventurer.png'
//makes canvas the full screen
gameArea.width = innerWidth
gameArea.height = innerHeight

class Player {
    //assigns values to player
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        //draws sprite, flips depending on which side of the screen is clicked
        if (clickX < midX) {
            image.src = 'assets/AdventurerFlipped.png'
            ctx.drawImage(image, midX-30, midY-25, 75, 55.5)
        } else if (clickX > midX) {
            image.src = 'assets/Adventurer.png'
            ctx.drawImage(image, midX-45, midY-25, 75, 55.5)
        }
        // ctx.drawImage(image, x-45, y-25, 75, 55.5)
        
        // ctx.beginPath()
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // ctx.fillStyle = this.color
        // ctx.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    //draws the projectile to the canvas
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    //allows the projectile to move
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class enemy {
    //assigns values to enemy
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    //draws enemy to screen
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    //allows enemy to move on the canvas
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

//takes the midpoint of the screen and assigns it to variables
const midX = gameArea.width / 2
const midY = gameArea.height / 2
//makes player on screen
const player = new Player(midX, midY, 45, 'red')
//makes array to hold multiple projectiles and enemies
const projectiles = []
const enemies = []
//makes variable that is later used to determine if the player sprite needs to be flipped
let clickX = 0

//function to spawn enemies on the screen
function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (45 - 10) + 10
        let x
        let y
        //randomizes the spawn location
        if(Math.random() < 0.5 ) { 
            x = Math.random() < 0.5 ? 0 - radius : gameArea.width + radius
            y = Math.random() * gameArea.height 
        } else {
            x = Math.random() * gameArea.width
            y = Math.random() < 0.5 ? 0 - radius : gameArea.height + radius
        }
        
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(midY - y, midX - x )
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        enemies.push(new enemy(x, y, radius, color, velocity))
    }, Math.random() * (1000 - 250) + 250 )
}

let animationID
let scoreAm = 0
//animates everything on the canvas
function animate(){
    animationID = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, 0, gameArea.width, gameArea.height)
    player.draw()
    projectiles.forEach((projectile, ii) => {
        projectile.update()
        //removes projectiles that are off the screen
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > gameArea.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > gameArea.width ) { 
                
                projectiles.splice(ii, 1)
        }
    })
    enemies.forEach((enemy, ii) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist - enemy.radius - 25 < 1) {
            cancelAnimationFrame(animationID)
        }

        projectiles.forEach((projectile, projectileii) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (dist - enemy.radius - projectile.radius < 1) {
                scoreAm += 100
                score.textContent = scoreAm
                enemies.splice(ii, 1)
                projectiles.splice(projectileii, 1)
            }
        })
    })
}

window.addEventListener('click', (event) => {
    clickX = event.clientX
    
    const angle = Math.atan2(event.clientY - midY, event.clientX - midX)
    const velocity = {
        x: Math.cos(angle)*5,
        y: Math.sin(angle)*5
    }
    projectiles.push(new Projectile(midX, midY, 7.5, 'white', velocity))
    
})

animate()
spawnEnemies()