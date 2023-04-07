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
        ctx.arc(player.x, player.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = gameArea.width / 2
const y = gameArea.height / 2
const player = new Player(x, y, 50, 'red')
player.draw()

const projectile = new Projectile(
    x, 
    y, 
    10, 
    'blue',
    {
        x: 1,
        y: 1
    }
)

function animate(){
    requestAnimationFrame(animate)
    projectile.draw()
    projectile.update()
}

window.addEventListener('click', (event) => {
    animate()
})