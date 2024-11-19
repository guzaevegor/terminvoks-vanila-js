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
        const locs_freq=getLocationsWithColor(
            imgData,{r:0,g:220,b:0}
        );
        const locs_volume=getLocationsWithColor(
            imgData,{r:0,g:0,b:220}
        );
        ctx.fillStyle="green";
        
        locs_freq.forEach(loc=>{
            ctx.fillRect(loc.x,loc.y,1,1);
        });
        ctx.fillStyle="blue";
        locs_volume.forEach(loc=>{
            ctx.fillRect(loc.x,loc.y,1,1);
        });
        if(locs_freq.length>0){
        //freq
            const center_freq=average(locs_freq);
            const p=1-center_freq.y/canvas.height;
            const freq=200+500*p;
            this.osc.frequency.value=freq;

            ctx.beginPath();
            ctx.fillStyle_freq="red";
            ctx.arc(center_freq.x,center_freq.y,5,0,2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.lineWidth = 5;
            ctx.moveTo(0,center_freq.y);
            ctx.lineTo(canvas.width,center_freq.y);
            ctx.stroke();
        }else{
            this.osc.frequency.value=0;

        }
        if(locs_volume.length>0){
        //volume_test
            const center_volume=average(locs_volume);
            const p_volume=1-center_volume.y/canvas.height;
            //const freq=200+500*p;
            //this.osc.frequency.value=freq;

            ctx.beginPath();
            ctx.fillStyle_volume="red";
            ctx.arc(center_volume.x,center_volume.y,5,0,2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.moveTo(0,center_volume.y);
            ctx.lineTo(canvas.width,center_volume.y);
            ctx.stroke();
        }else{
        //volume =0
        }
        requestAnimationFrame(this.#animate.bind(this));
    }
}
