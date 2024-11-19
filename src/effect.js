class Effect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = this.canvas.getContext('2d');

        const audioCtx = new AudioContext();
        this.osc = audioCtx.createOscillator();
        this.gainNode = audioCtx.createGain();
        this.filterNode = audioCtx.createBiquadFilter(); // Фильтр для сглаживания тона

        // Настройка фильтра
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.value = 1000; // Частота среза фильтра
        this.filterNode.Q.value = 1; // Резонанс

        // Подключение узлов
        this.osc.connect(this.filterNode).connect(this.gainNode).connect(audioCtx.destination);

        // Настройка осциллятора
        this.osc.type = 'triangle'; // Мягкий тон
        this.osc.frequency.value = 0; // Частота по умолчанию
        this.gainNode.gain.value = 0; // Громкость по умолчанию
        this.osc.start();

        this.#animate();
    }

    #animate() {
        const { ctx, canvas, video } = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const locs_freq = getLocationsWithColor(imgData, { r: 0, g: 230, b: 0 }); // Частота
        const locs_volume = getLocationsWithColor(imgData, { r: 0, g: 0, b: 230 }); // Громкость

        // Управление частотой
        if (locs_freq.length > 0) {
            const center_freq = average(locs_freq);
            const p = center_freq.x / canvas.width;
            const freq = 200 + 500 * p;
            this.osc.frequency.value = freq;

            // Управление фильтром по вертикальной позиции
            const filterCutoff = 500 + 2000 * (1 - center_freq.y / canvas.height);
            this.filterNode.frequency.value = filterCutoff;

            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(center_freq.x, center_freq.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.lineWidth = 5;
            ctx.moveTo(center_freq.x, 0);
            ctx.lineTo(center_freq.x, canvas.height);
            ctx.stroke();
        } else {
            this.osc.frequency.value = 0;
        }

        // Управление громкостью
        if (locs_volume.length > 0) {
            const center_volume = average(locs_volume);
            const p_volume = 1 - center_volume.y / canvas.height;
            const volume = Math.min(Math.max(p_volume, 0), 1);
            this.gainNode.gain.value = volume;

            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(center_volume.x, center_volume.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.moveTo(0, center_volume.y);
            ctx.lineTo(canvas.width, center_volume.y);
            ctx.stroke();
        } else {
            this.gainNode.gain.value = 0;
        }

        requestAnimationFrame(this.#animate.bind(this));
    }
}
