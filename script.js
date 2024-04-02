import {updateGround, setUpGround} from './ground.js'
import {updateDino, setUpDino, getDinoRect, setDinoLose} from './dino.js'
import {updateCactus, setUpCactus, getCactusRects} from './cactus.js'

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
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if(checkLose()) {return handleLose()}

    lastTime = time
    window.requestAnimationFrame(update)
    
}

function checkLose(){
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2){
   return ( rect1.right > rect2.left &&
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom && 
    rect1.bottom > rect2.top )

}

function handleStart(){
    lastTime = null
    setUpGround()
    setUpDino()
    setUpCactus()
    startElem.classList.add("hide")
    speedScale = 1
    score = 0
    window.requestAnimationFrame(update)
}

function handleLose(){
    setDinoLose()
    setTimeout(()=>{
          document.addEventListener("keydown", handleStart, {once : true})
          startElem.classList.remove("hide")
    }, 100)
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