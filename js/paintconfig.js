class PaintColor {
        constructor (
                ocbutton,
                paintcolorId, 
                paintsize, 
                paintsizevalue, 
                paintdownload,
                paint
        ) {
                this.state = true;
                this.ocbutton = ocbutton;
                this.paintcolor = new JSColor(paintcolorId, {format:'HEX'});
                this.paintsize = paintsize;
                this.paintsizevalue = paintsizevalue;
                this.paintdownload = paintdownload;
                this.paint = paint;

                this.initpaint();

                this.ocbutton.onclick = () => { this.triggershow() };
        }

        initpaint() {
                this.paintcolor.fromString(paint.color);

                this.paintcolor.onChange = () => {
                        this.paint.brushColor(this.paintcolor.toString());
                };
                this.paintsize.value = this.paint.brushsize;
                
                setInterval(() => {
                        this.paintsizevalue.innerHTML = this.paintsize.value + "px";
                        this.paint.brushSize(parseFloat(this.paintsize.value));
                }, 100);
                
                this.paintdownload.onclick = () => {
                        const image = this.paint.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                        this.paintdownload.href = image;
                };
        }

        triggershow() {
                console.log("CLICK");
                const bag = this.ocbutton.parentElement;
                array(bag.children).forEach((child, index) => {
                        if (child.id !== this.ocbutton.id) {
                                const anim = new Animate(child);
                                anim.onEnd(() => {
                                        child.style.display = this.state ? 'flex': 'none';
                                        bag.style.height = this.state ? '20%': '24px';
                                        bag.style.width = this.state ? 'auto': '24px';
                                });
                                anim.movement("opacity", this.state ? 1: 0, this.state ? 0: 1, 1, "");
                        }
                });
                this.state = !this.state;
        }
}