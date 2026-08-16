/**
 * Audio Engine - Silent Audio & Legacy Interface Safe Stubs
 * Removed continuous audio narrations, ambient noise generators, and voice synthesizers.
 */

export interface CaptionEvent {
  text: string;
  start: number;
  end: number;
}

class AudioEngine {
  private isMuted: boolean = true;
  private isPaused: boolean = false;
  private isNarrating: boolean = false;
  private currentTime: number = 0;
  private totalDuration: number = 0;

  constructor() {
    this.stopAll();
  }

  public initContext(): null {
    return null;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public setVolume(vol: number) {}

  public getVolume(): number {
    return 0;
  }

  public async setAmbience(category: string) {
    // Ambient sound disabled per user preference
  }

  public stopAmbience() {
    // No-op
  }

  public async playNarration(
    narrationData: any,
    fallbackText?: string,
    onCaption?: (caption: string) => void,
    onEnd?: () => void,
    onTimeUpdate?: (time: number, duration: number) => void
  ) {
    // Audio narration disabled per user preference
    this.isNarrating = false;
    if (onEnd) onEnd();
  }

  public pauseNarration() {
    this.isPaused = true;
  }

  public resumeNarration() {
    this.isPaused = false;
  }

  public togglePlayPause() {
    this.isPaused = !this.isPaused;
  }

  public seekTo(timeInSeconds: number) {
    this.currentTime = timeInSeconds;
  }

  public stopNarration() {
    this.isNarrating = false;
    this.isPaused = false;
  }

  public stopAll() {
    this.stopAmbience();
    this.stopNarration();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  public getPlaybackState() {
    return {
      isNarrating: false,
      isPaused: true,
      currentTime: 0,
      duration: 0,
      isMuted: this.isMuted,
      volume: 0,
    };
  }
}

export const audioEngine = new AudioEngine();
