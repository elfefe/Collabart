class Paint {
        constructor(canvas) {
                this.canvas = canvas;

                this.randomiseColor()
                this.brushSize(70);
                this.resize();
                this.draw();
        }

        randomiseColor() {
                this.color = "#" + randomHex(6);
        }

        brushColor(color) {
                this.color = color;
        }

        brushSize(size) {
                this.brushsize = size;
        }

        resize() {
                this.canvas.setAttribute('width', window.innerWidth);
                this.canvas.setAttribute('height', window.innerHeight);
        }

        draw() {
                const context = this.canvas.getContext('2d');
        
                this.canvas.onmousemove = (e) => {
                        if (e.buttons === 0) {
                                const centerX = e.clientX;
                                const centerY = e.clientY;
                                const radius = this.brushsize;
                
                                context.beginPath();
                                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                                
                                const gradient = context.createRadialGradient(centerX,centerY,0,centerX,centerY,radius);
                                gradient.addColorStop(0, this.color + "99");
                                gradient.addColorStop(1, this.color + "00");
                                
                                context.fillStyle = gradient;
                                context.fill();
                        }
                }; 
        }
}