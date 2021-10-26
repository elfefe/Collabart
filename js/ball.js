const balls = () => {
    const ballBagSize = 15;
    const ballMinSize = 40;
    const ballMaxSize = 70;

    const ballHolder = byid('ballHolder');

    console.log(ballHolder.children.length);
    const ballbag = byid('ballBag');
    const ball = byid('ball');

    const clones = 12;

    const w = ballHolder.clientWidth;
    const h = ballHolder.clientHeight;
    
    const ratio = w / h;

    const originx = (w / 2) - ballbag.clientWidth / 2;
    const originy = (h / 2) - ballbag.clientWidth / 2;

    const r = h * 0.35;

    ballbag.style.width = ballBagSize + "%";
    ballbag.style.height = ballBagSize * ratio + "%";

    ball.style.width = ballMinSize + "%";
    ball.style.height = ball.style.width;

    for(let i = 0;i < clones;i++) {
        const angle = (360 / clones) * i;

        const x = originx + Math.cos(radian(angle)) * r;
        const y = originy + Math.sin(radian(angle)) * r;

        // const ballbagSibling = ballHolder.children.length === clones + 1 ? ballHolder.children[ball.id + i] : ballbag.cloneNode(true);
        const ballbagSibling = ballbag.cloneNode(true);
        const ballSibling = ballbagSibling.children[ball.id];

        ballbagSibling.id = ballbag.className + i;
        ballSibling.id = ballSibling.className + i;
        
        ballbag.after(ballbagSibling);
        
        ballbagSibling.style.left = (x) + "px";
        ballbagSibling.style.top = (y) + "px";

        const anim = new Animate(ballSibling);

        ballSibling.onmouseover = () => {
            ballSibling.style.cursor = "pointer";
            ballSibling.style.zIndex = "9";
            anim.movement("width", ballMinSize, ballMaxSize, 1, "%", Animate.EASING.easeOutElastic);
            anim.movement("height", ballMinSize, ballMaxSize, 1, "%", Animate.EASING.easeOutElastic);
        };
        ballSibling.onmouseout = () => {
            ballSibling.style.zIndex = "8";
            anim.movement("width", ballMaxSize, ballMinSize, 0.5, "%", Animate.EASING.easeInBack);
            anim.movement("height", ballMaxSize, ballMinSize, 0.5, "%", Animate.EASING.easeInBack);
        };
        ballSibling.onclick = () => {
            paint.randomiseColor();
        };
    }

    const ballWidth = (r / w) * 300;

    ballbag.style.width = ballWidth + "%";
    ballbag.style.height = (ballWidth * ratio) + "%";
    ballbag.style.left = (50 - (ballWidth / 2)) + "%";
    ballbag.style.top = (50 - (ballWidth * ratio / 2)) + "%";
}