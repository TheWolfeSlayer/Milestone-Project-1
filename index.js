const gameArea = document.querySelector('canvas');

const ctx = gameArea.getContext('2d')

gameArea.width = innerWidth
gameArea.height = innerHeight



class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
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
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = gameArea.width / 2
const y = gameArea.height / 2
const player = new Player(x, y, 50, 'red')


const projectiles = []

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, gameArea.width, gameArea.height)
    player.draw()
    projectiles.forEach((projectile) => {
        projectile.update()
    })
}

window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - y, event.clientX - x)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(new Projectile(x, y, 5, 'blue', velocity))
})

animate()
