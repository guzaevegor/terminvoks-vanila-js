class Effect{
    constructor(canvas,video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = this.canvas.getContext('2d');
        const audioCtx =new AudioContext();
        this.osc=audioCtx.createOscillator();
        this.osc.connect(audioCtx.destination);
        this.osc.frequency.value = 0;
        this.osc.start();

        this.#animate();
    }
    #animate(){
        const {ctx, canvas, video}=this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const locs=getLocationsWithColor(
            imgData,{r:0,g:200,b:0}
        );
        ctx.fillStyle="yellow";
        locs.forEach(loc=>{
            ctx.fillRect(loc.x,loc.y,1,1);
        });
        if(locs.length>0){
            const center=average(locs);
            const p=1-center.y/canvas.height;
            const freq=200+500*p;
            this.osc.frequency.value=freq;


            ctx.beginPath();
            ctx.fillStyle="red";
            ctx.arc(center.x,center.y,5,0,2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.lineWidth = 5;
            ctx.moveTo(0,center.y);
            ctx.lineTo(canvas.width,center.y);
            ctx.stroke();
        }else{
            this.osc.frequency.value=0;

        }
        requestAnimationFrame(this.#animate.bind(this));
    }
}