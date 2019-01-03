var canvas = document.getElementById('canvas')
canvas.width = 500
canvas.height = 300
var c = canvas.getContext('2d')

var useCanvas = false;


if ( useCanvas ){




	var manager = {
		imgs: [],
		start: function(){
			manager.lastTime = Date.now()
			requestAnimationFrame( manager.update )
		},
		stop: function(){
			clearInterval( this.interval )
		},
		update: function(){
			var now = Date.now()
			var dt = now - manager.lastTime
			manager.lastTime = now
			c.clearRect(0, 0, 500, 300)
			var i, len = manager.imgs.length
			for ( i = 0; i < len; i++ ){
				var img = manager.imgs[i]
				
				if ( img.fixed ){
					img.frames[ 0 ][1](c)
					continue
				}
				
				img.timer -= dt
				
				if ( img.timer > 0 ){
					// just show the frame
					img.frames[ img.frame ][1](c)
				} else {
					// update frame
					img.frame++
					if ( img.frame >= img.frames.length ){
						if ( img.loop ){
							// return to frame 0 nd show
							img.frame = 0
							img.timer = img.frames[ img.frame ][0]
							img.frames[ img.frame ][1](c)
						} else {
							// remove anim from imgs
							manager.imgs.splice(i, 1)
							i--
						}
					} else {
						// got next frame, show it
						img.timer = img.frames[ img.frame ][0]
						img.frames[ img.frame ][1](c)
					}
				}
			
			}
			requestAnimationFrame( manager.update )
			
		},
		export: function(fileName){
			var MIME_TYPE = "image/png"
			var imgURL = canvas.toDataURL( MIME_TYPE )
			var dlink = document.createElement('a')
			dlink.download = fileName || "canvasGeneratedPNG"
			dlink.href = imgURL
			dlink.dataset.downloadurl = [ MIME_TYPE, dlink.download, dlink.href ].join(':')
			document.body.appendChild( dlink )
			dlink.click()
			document.body.removeChildChild( dlink )
		},
		lastTime: undefined,
		interval: undefined
	};





	var frameLength = 500
	var centerY = -2	
	var sunColor = 'yellow'
	var rayColor = 'orange'




	/*
	var pic = new Image()
	pic.src = "js/canvas/background"		
		
	pic.onload = function(){
		manager.start();
		
	}
	*/

	 // BACKGROUND
	manager.imgs.push( {
		name: 'sun',
		fixed: true,
		dx: 0, dy: 0,
		timer: 0,
		loop: true,
		frame: 0,
		frames: [ 
			[0, function(){
				var brown3 = "#b18904"
				var brown4 = "#aeb404"
				
				// sky
				c.beginPath()
				c.fillStyle = 'lightblue'
				c.fillRect(0, 0, 500, 300)
			
				// land		
				c.fillStyle = brown3
				c.fillRect(0, 200, 500, 100)
				
				// mountain 1
				c.moveTo(300, 200)
				c.lineTo(340, 160)
				c.lineTo(380, 200)
				c.fill()
				c.closePath();
					// highlight
					c.fillStyle = brown4
					c.beginPath();
					c.moveTo(305, 200)
					c.lineTo(340, 165)
					c.lineTo(325, 200)
					c.fill()
					
				// mountain 2
				c.fillStyle = brown3
				c.beginPath()
				c.moveTo(400, 200)
				c.lineTo(440, 130)
				c.lineTo(480, 200)
				c.fill()
					// highlight
					c.fillStyle = brown4
					c.beginPath()
					c.moveTo(405, 200)
					c.lineTo(440, 135)
					c.lineTo(425, 200)
					c.fill()
			}]
		]
	} )



	 // SUN
	manager.imgs.push( {
		name: 'sun',
		dx: 0, dy: 0,
		timer: frameLength,
		loop: true,
		frame: 0,
		frames: [ 
			[frameLength,
				function(c){
					
					//c.drawImage( pic, 0, 0 )		
			
					// sun
					c.beginPath();
					c.fillStyle = sunColor
					c.arc( 100, centerY, 40, 0, 2*Math.PI )
					c.fill()
					c.closePath()
					
					// arc 1
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 45, 0, 1.5 )
					c.stroke()
					
					// arc 2
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 55, 1.4, 2.9 )
					c.stroke()
					
					// arc 3
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 65, 0.7, 2.2 )
					c.stroke()
					
					// arc 4
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 45, 2, 3.5 )
					c.stroke()
				}
			],
			[ frameLength,
				function(c){
					// c.drawImage( pic, 0, 0 )		
			
					// sun
					c.beginPath()
					c.fillStyle = sunColor
					c.arc( 100, centerY, 40, 0, 2*Math.PI )
					c.fill()
					c.closePath()
					
					// arc 1
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 50, 0, 1.5 )
					c.stroke()
					
					// arc 2
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 65, 1.4, 2.9 )
					c.stroke()
					
					// arc 3
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 45, 0.7, 2.2 )
					c.stroke()
					
					// arc 4
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 55, 2, 3.5 )
					c.stroke()
				}
			],
			[ frameLength,
				function(c){
					// c.drawImage( pic, 0, 0 )		
			
					// sun
					c.beginPath()
					c.fillStyle = sunColor
					c.arc( 100, centerY, 40, 0, 2*Math.PI )
					c.fill()
					c.closePath()
					
					// arc 1
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 60, 0, 1.5 )
					c.stroke()
					
					// arc 2
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 45, 1.4, 2.9 )
					c.stroke()
					
					// arc 3
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 55, 0.7, 2.2 )
					c.stroke()
					
					// arc 4
					c.beginPath()
					c.strokeStyle = rayColor
					c.lineWidth = 3
					c.arc( 100, centerY, 65, 2, 3.5 )
					c.stroke()
				}
			],
			
			
		]
	} )



	manager.start();









} else {
	canvas.style.display = 'none';
}


/*
		manager is used thru these functions:
		manager.push( {anim} ) // add new anim
		manager.imgs = [];  // remove all anims
		manager.start() // start animations
		manager.stop() // stop animations
		manager.export( fileName ) // save canvas as png


*/




