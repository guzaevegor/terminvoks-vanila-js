function getLocationsWithColor(imgData, color, threshold = 160) {
    const locs = [];
    for (let i = 0; i < imgData.data.length; i += 4) {
        const pColor = {
            r: imgData.data[i],
            g: imgData.data[i + 1],
            b: imgData.data[i + 2]
        };

        const pIndex = i / 4;
        const loc = {
            x: pIndex % imgData.width,
            y: Math.floor(pIndex / imgData.width)
        };
        if (colorMatch(pColor, color, threshold)) {
            locs.push(loc);
        }
    }
    return locs;
}

function colorMatch(c1, c2, threshold = 160) {
    return sqdistance(c1, c2) < threshold * threshold;
}

function sqdistance(c1, c2) {
    return (c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2;
}

function average(locs) {
    const res = { x: 0, y: 0 };
    locs.forEach(loc => {
        res.x += loc.x;
        res.y += loc.y;
    });
    res.x /= locs.length;
    res.y /= locs.length;
    return res;
}

// Флаг состояния мута
let isMuted = false;

// Функция управления мутом
function toggleMute() {
    const muteButton = document.querySelector(".mute-button");
    if (window.effect) {
        if (isMuted) {
            window.effect.unmute(); // Включить звук
            muteButton.textContent = "🔊";
        } else {
            window.effect.mute(); // Выключить звук
            muteButton.textContent = "🔇";
        }
        isMuted = !isMuted;
    }
}
