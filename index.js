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

const x = gameArea.width / 2
const y = gameArea.height / 2
const player = new Player(x, y, 50, 'red')
player.draw()
