class Ball {
    constructor(ballHolder, ballbag, ball, text) {
        this.ballHolder = ballHolder;
        this.ballbag = ballbag;
        this.ball = ball;
        this.text = text;

        this.ballBagSize = 15;
        this.ballMinSize = 80;
        this.ballMaxSize = 100;
        this.bounceoffset = -20;

        this.balls();
    };

    redraw() {
        this.balls();
    }

    onclickball(ballid, onclick) {
        const ball = byid(ballid);
        const clickball = ball.onclick;
        ball.onclick = () => {
            clickball();
            onclick();
        };
    }

    balls() {
    
        const clones = buttonscontent.length;

        const alreadyloaded = this.ballHolder.children.length === clones + 1;
    
        const w = this.ballHolder.clientWidth;
        const h = this.ballHolder.clientHeight;
        
        const ratio = w / h;
    
        this.ballbag.style.width = this.ballBagSize / ratio + "%";
        this.ballbag.style.height = this.ballBagSize + "%";
    
        const originx = (w / 2) - this.ballbag.clientWidth / 2;
        const originy = (h / 2) - this.ballbag.clientWidth / 2;
    
        const r = h * 0.35;
    
        this.ball.style.width = this.ballMinSize + "%";
        
        for(let i = 0;i < clones;i++) {
            const angle = (360 / clones) * i;
    
            const x = originx + Math.cos(radian(angle)) * r;
            const y = originy + Math.sin(radian(angle)) * r;

            const ballbagSibling = alreadyloaded ? this.ballHolder.children[ballbag.id + i] : this.ballbag.cloneNode(true);
                
            const ballSibling = ballbagSibling.children[this.ball.id + (alreadyloaded ? i : "")];
            const textSibling = ballbagSibling.children[this.text.id + (alreadyloaded ? i : "")];
    
            ballbagSibling.id = this.ballbag.className + i;
            ballSibling.id = this.ball.id + i;
            textSibling.id = this.text.id + i;

            textSibling.innerHTML = buttonscontent[i];
            
            if (!alreadyloaded) {
                this.ballbag.after(ballbagSibling);
    
                const anim = new Animate(ballSibling);
                let asclicked = false;
        
                ballSibling.onmouseover = () => {
                    ballSibling.style.cursor = "pointer";
                };
                ballSibling.onmouseout = () => {
                    if (asclicked) {
                        ballSibling.style.zIndex = "7";
                        anim.movement("width", this.ballMaxSize, this.ballMinSize, 0.5, "%", Animate.EASING.easeInBack);
                        anim.movement("height", this.ballMaxSize, this.ballMinSize, 0.5, "%", Animate.EASING.easeInBack);
                        asclicked = false;
                    }
                };
                ballSibling.onclick = () => {
                    asclicked = true;
                    ballSibling.style.zIndex = "8";
                    anim.movement("width", this.ballMinSize, this.ballMaxSize, 1, "%", Animate.EASING.easeOutElastic);
                    anim.movement("height", this.ballMinSize, this.ballMaxSize, 1, "%", Animate.EASING.easeOutElastic);
                    paint.randomiseColor();
                };
            }
            
            ballbagSibling.style.left = (x) + "px";
            ballbagSibling.style.top = (y) + "px";
        }
    
        const ballWidth = ((r * 2) / w) * 80;
    
        this.ballbag.style.width = ballWidth + "%";
        this.ballbag.style.height = (ballWidth) + "%";
        this.ballbag.style.left = (50 - (ballWidth / 2)) + "%";
        this.ballbag.style.top = (50 - (ballWidth / 2)) + "%";
    }
}