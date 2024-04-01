import {updateGround, setUpGround} from './ground.js'

const worldWidth = 100
const worldHeight = 30


const worldElem = document.querySelector("[data-world]")

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)

setUpGround()

let lastTime 
function update(time){

    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, 1)

    lastTime = time
    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

function setPixelToWorldScale(){
    let worldToPixelScale 
    if(window.innerWidth/window.innerHeight < worldWidth/worldHeight){
        worldToPixelScale = window.innerWidth/ worldWidth
    }
    else{
        worldToPixelScale = window.innerHeight/ worldHeight
    }

    worldElem.style.width = `${worldWidth*worldToPixelScale}px`
    worldElem.style.height = `${worldHeight*worldToPixelScale}px`
}