# Hungarian notation
# (http://en.wikipedia.org/wiki/Hungarian_notation)
# n - HTML-Node
# o - object
# s - string
# i - integer
# a - array
# b - boolean
# f - float
# p - Particle
# fn - function
# ctx - 2D Context

# General Functions
fnRequestAnimationFrame = (fnCallback) ->
  fnAnimFrame =
    window.requestAnimationFrame or
    window.webkitRequestAnimationFrame or
    window.mozRequestAnimationFrame or
    window.oRequestAnimationFrame or
    window.msRequestAnimationFrame or
    (fnCallback) ->
      window.setTimeOut(fnCallback, 1000 / 60)
      return
  fnAnimFrame fnCallback
  return

# Add Event Listener
fnAddEventListener = (o, sEvent, fn) ->
  if o.addEventListener
    o.addEventListener(sEvent, fn, false)
  else
    o['on' + sEvent] = fn
  return

app = () ->

  oStats = new Stats()
  oStats.setMode(0)
  oStats.domElement.style.position = 'absolute'
  oStats.domElement.style.left = '0px'
  oStats.domElement.style.top = '0px'
  document.body.appendChild(oStats.domElement)

  # General Elements
  oDoc = document
  nBody = oDoc.body
  # Shortcuts
  fPI = Math.PI
  fnMax = Math.max
  fnMin = Math.min
  fnRnd = Math.random
  fnRnd2 = () -> 2.0 * fnRnd() - 1.0
  fnCos = Math.cos
  fnACos = Math.acos
  fnSin = Math.sin
  # Sphere Settings
  iRadiusSphere = 150
  iProjSphereX = 0
  iProjSphereY = 0
  # Particle Settings
  fMaxAX = 0.1
  fMaxAY = 0.1
  fMaxAZ = 0.1
  fStartVX = 0.001
  fStartVY = 0.001
  fStartVZ = 0.001
  fAngle = 0.0
  fSinAngle = 0.0
  fCosAngle = 0.0

  window.iFramesToRotate = 2000.0
  window.iPerspective = 250
  window.iNewParticlePerFrame = 10
  window.fGrowDuration = 200.0
  window.fWaitDuration = 50.0
  window.fShrinkDuration = 250.0
  window.aColor = [255, 128, 128]

  fVX = (2.0 * fPI) / window.iFramesToRotate

  oRadGrad = null
  ctxRender = nCanvasRender.getContext '2d'


  oRender = {pFirst: null}
  oBuffer = {pFirst: null}
  
  w = h = 0

  # gets/sets size
  fnSetSize = () ->
    nCanvasRender.width = w = window.innerWidth
    nCanvasRender.height = h = window.innerHeight
    iProjSphereX = w / 2
    iProjSphereY = h / 2
    {w: w, h: h}

  fnSetSize()
  
  # window.onresize
  fnAddEventListener(window, 'resize', fnSetSize)

  fnSwapList = (p, oSrc, oDst) ->
    if p?
      # remove p from oSrc
      if oSrc.pFirst is p
        oSrc.pFirst = p.pNext
        p.pNext.pPrev = null if p.pNext?
      else
        p.pPrev.pNext = p.pNext
        p.pNext.pPrev = p.pPrev if p.pNext?
    else
      # create new p
      p = new Particle()
  
    p.pNext = oDst.pFirst
    oDst.pFirst.pPrev = p if oDst.pFirst?
    oDst.pFirst = p
    p.pPrev = null
    p
  
  # Particle
  class Particle
    # Current Position
    fX: 0.0
    fY: 0.0
    fZ: 0.0
    # Current Velocity
    fVX: 0.0
    fVY: 0.0
    fVZ: 0.0
    # Current Acceleration
    fAX: 0.0
    fAY: 0.0
    fAZ: 0.0
    # Projection Position
    fProjX: 0.0
    fProjY: 0.0
    # Rotation
    fRotX: 0.0
    fRotZ: 0.0
    # double linked list
    pPrev: null
    pNext: null
    
    fAngle: 0.0
    fForce: 0.0

    fGrowDuration: 0.0
    fWaitDuration: 0.0
    fShrinkDuration: 0.0
    
    fRadiusCurrent: 0.0
    
    iFramesAlive: 0
    bIsDead: false
      
    fnInit: () ->
      @fAngle = fnRnd() * fPI * 2
      @fForce = fnACos(fnRnd2())
      @fAlpha = 0
      @bIsDead = false;
      @iFramesAlive = 0;
      @fX = iRadiusSphere * fnSin(@fForce) * fnCos(@fAngle)
      @fY = iRadiusSphere * fnSin(@fForce) * fnSin(@fAngle)
      @fZ = iRadiusSphere * fnCos(@fForce)
      @fVX = fStartVX * @fX
      @fVY = fStartVY * @fY
      @fVZ = fStartVZ * @fZ
      @fGrowDuration = window.fGrowDuration + fnRnd2() * (window.fGrowDuration / 4.0)
      @fWaitDuration = window.fWaitDuration + fnRnd2() * (window.fWaitDuration / 4.0)
      @fShrinkDuration = window.fShrinkDuration + fnRnd2() * (window.fShrinkDuration / 4.0)
      @fAX = 0.0
      @fAY = 0.0
      @fAZ = 0.0
      return
  
    fnUpdate: () ->
      if @iFramesAlive > @fGrowDuration + @fWaitDuration
        @fVX += @fAX + fMaxAX * fnRnd2()
        @fVY += @fAY + fMaxAY * fnRnd2()
        @fVZ += @fAZ + fMaxAZ * fnRnd2()
        @fX += @fVX
        @fY += @fVY
        @fZ += @fVZ

      @fRotX = fCosAngle * @fX + fSinAngle * @fZ
      @fRotZ = -fSinAngle * @fX + fCosAngle * @fZ
      @fRadiusCurrent = Math.max(0.01, window.iPerspective / (window.iPerspective - @fRotZ))
      @fProjX = @fRotX * @fRadiusCurrent + iProjSphereX 
      @fProjY = @fY * @fRadiusCurrent + iProjSphereY 

      @iFramesAlive += 1

      if @iFramesAlive < @fGrowDuration
        @fAlpha = @iFramesAlive * 1.0 / @fGrowDuration
      else if @iFramesAlive < @fGrowDuration + @fWaitDuration
        @fAlpha = 1.0
      else if @iFramesAlive < @fGrowDuration + @fWaitDuration + @fShrinkDuration
        @fAlpha = (@fGrowDuration + @fWaitDuration + @fShrinkDuration - @iFramesAlive) * 1.0 / @fShrinkDuration
      else
        @bIsDead = true

      if @bIsDead is true
        fnSwapList(@, oRender, oBuffer)

      @fAlpha *= fnMin(1.0, fnMax(0.5, @fRotZ / iRadiusSphere))
      @fAlpha = fnMin(1.0, fnMax(0.0, @fAlpha))
      return
      
  fnRender = () ->
    ctxRender.fillStyle = "#000"
    ctxRender.fillRect(0, 0, w, h)

    p = oRender.pFirst
    iCount = 0
    while p?
      ctxRender.fillStyle = "rgba(" + window.aColor.join(',') + ',' + p.fAlpha.toFixed(4) + ")"
      ctxRender.beginPath()
      ctxRender.arc(p.fProjX, p.fProjY, p.fRadiusCurrent, 0, 2 * fPI, false)
      ctxRender.closePath()
      ctxRender.fill()
      p = p.pNext
      iCount += 1
    return
  
  fnNextFrame = () ->
    oStats.begin()
    fAngle = (fAngle + fVX) % (2.0 * fPI)
    fSinAngle = fnSin(fAngle)
    fCosAngle = fnCos(fAngle)

    iAddParticle = 0
    iCount = 0
    while iAddParticle++ < window.iNewParticlePerFrame
      p = fnSwapList(oBuffer.pFirst, oBuffer, oRender)
      p.fnInit()
  
    p = oRender.pFirst
    while p?
      pNext = p.pNext
      p.fnUpdate()
      p = pNext
      iCount++
    fnRender()

    oStats.end()
    fnRequestAnimationFrame () -> fnNextFrame() 
    
  fnNextFrame()  

  gui = new dat.GUI();
  gui.add(window, 'fGrowDuration').min(10).max(500).step(1)
  gui.add(window, 'fWaitDuration').min(10).max(500).step(1)
  gui.add(window, 'fShrinkDuration').min(10).max(500).step(1)
  gui.add(window, 'iPerspective').min(150).max(1000).step(1)
  gui.add(window, 'iNewParticlePerFrame').min(1).max(20).step(1)
  gui.add(window, 'iFramesToRotate').min(50).max(2500).step(50).onChange(() ->
    fVX = (2.0 * fPI) / window.iFramesToRotate
  )
  gui.addColor(window, 'aColor').onChange(() ->
    window.aColor[0] = ~~window.aColor[0]
    window.aColor[1] = ~~window.aColor[1]
    window.aColor[2] = ~~window.aColor[2]
  )
  if window.innerWidth < 1000
    gui.close()
    window.iNewParticlePerFrame = 5

  window.app = @
  return
  
fnAddEventListener(window, 'load', app)