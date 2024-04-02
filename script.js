import {updateGround, setUpGround} from './ground.js'
import {updateDino, setUpDino} from './dino.js'

const worldWidth = 100
const worldHeight = 30
const speedScaleInc = 0.00001


const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startElem = document.querySelector("[data-startScreen]")

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once:true} )



let lastTime 
let speedScale
let score
function update(time){

    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)

    lastTime = time
    window.requestAnimationFrame(update)
    
}

function handleStart(){
    lastTime = null
    setUpGround()
    setUpDino()
    startElem.classList.add("hide")
    speedScale = 1
    score = 0
    window.requestAnimationFrame(update)
}

function updateSpeedScale(delta){
  speedScale += delta*speedScaleInc   
  scoreElem.textContent = Math.floor(score)
}

function updateScore(delta){
     score += delta*0.1
}

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