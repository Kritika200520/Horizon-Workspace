// Web Audio API Soundscape & Chime Synthesizer

class AudioSynthService {
  constructor() {
    this.ctx = null;
    this.activeNoiseNode = null;
    this.activeGainNode = null;
    this.rainInterval = null;
    this.isPlaying = false;
    this.currentTrack = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCompletionBell() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Pleasant dual chime
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 2);
    });
  }

  playAmbientTrack(trackType, volume = 0.5) {
    this.stopAmbientTrack();
    this.init();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrack = trackType;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    if (trackType === 'white_noise' || trackType === 'rain') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (trackType === 'space_drone') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
      }
    } else if (trackType === 'forest') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.sin(i / 100);
      }
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter creation for realistic texture
    const filter = this.ctx.createBiquadFilter();
    if (trackType === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    } else if (trackType === 'space_drone') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, this.ctx.currentTime);
    } else if (trackType === 'forest') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    } else {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, this.ctx.currentTime);
    }

    const mainGain = this.ctx.createGain();
    mainGain.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(this.ctx.destination);

    whiteNoise.start();

    this.activeNoiseNode = whiteNoise;
    this.activeGainNode = mainGain;

    if (trackType === 'rain') {
      // Add subtle random rain drop pings
      this.rainInterval = setInterval(() => {
        if (!this.isPlaying || !this.ctx) return;
        if (Math.random() > 0.4) {
          const dropOsc = this.ctx.createOscillator();
          const dropGain = this.ctx.createGain();
          dropOsc.type = 'sine';
          const startFreq = 1200 + Math.random() * 800;
          dropOsc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
          dropOsc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

          dropGain.gain.setValueAtTime(0.015 * volume, this.ctx.currentTime);
          dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

          dropOsc.connect(dropGain);
          dropGain.connect(this.ctx.destination);

          dropOsc.start();
          dropOsc.stop(this.ctx.currentTime + 0.06);
        }
      }, 150);
    }
  }

  setVolume(volume) {
    if (this.activeGainNode && this.ctx) {
      this.activeGainNode.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime);
    }
  }

  stopAmbientTrack() {
    this.isPlaying = false;
    this.currentTrack = null;
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
      this.rainInterval = null;
    }
    if (this.activeNoiseNode) {
      try {
        this.activeNoiseNode.stop();
        this.activeNoiseNode.disconnect();
      } catch (e) {}
      this.activeNoiseNode = null;
    }
    if (this.activeGainNode) {
      try {
        this.activeGainNode.disconnect();
      } catch (e) {}
      this.activeGainNode = null;
    }
  }
}

export const audioSynth = new AudioSynthService();
