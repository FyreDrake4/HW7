let initTone = true;
let showPicture = false;
let gunPicture;
let dragging = false;

let pitch;
// Set up Tone
let osc = new Tone.AMOscillator(pitch, "sine", "sine").start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.3,
    sustain: 1.0,
    release: 0.5,
}).connect(pan);
osc.connect(ampEnv);

// let noise = new Tone.Noise("pink").start();
// let noiseEnv = new Tone.AmplitudeEnvelope({
//     attack: 0.1,
//     decay: 0.2,
//     sustain: 1.0,
//     release: 0.8,
// }).connect(gain);

// let noiseFiler = new Tone.Filter(800, "lowpass");

function preload() {
    gunPicture = loadImage("assets/whistle.jpg");
}

function setup() {
    createCanvas(800, 400);
    gunPicture.resize(width, height);
}

function draw() {
    background(220);
    // if (frameCount % 60 === 0) {
    //     pitch = random(300, 600);
    // }
    if (showPicture) {
        image(gunPicture, 0, 0);
        text("Hold Down Left Click and drag around for music", 450, 300);
    } else {
        text("Press Spacebar to initilize Audio. :D", 100, 50);
        if (!initTone) {
            text("Audio Initilized", 100, 100);
            text("Click to Play the Sound", 100, 150);
        }
    }
}

function keyPressed() {
    if (key === " " && initTone) {
        Tone.start();
        initTone = false;
    }
}

function mouseClicked() {
    if (!showPicture && !initTone) {
        showPicture = true;
    }
}

function mouseDragged() {
    if (showPicture && !dragging) {
        pitch = 140 + 520 * (mouseX / width);
        ampEnv.triggerAttackRelease(pitch, 0.1);
        dragging = true;
    } else if (showPicture && dragging) {
        pitch = 140 + 520 * (mouseX / width);
        osc.frequency.setValueAtTime(pitch, "+0");
    }
    // ampEnv.triggerAttackRelease("4n");
}

function mouseReleased() {
    if (showPicture && dragging) {
        dragging = false;
        ampEnv.triggerRelease();
    }
}
