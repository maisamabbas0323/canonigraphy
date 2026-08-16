/**
 * Silent Web Audio UI Sound Effects Engine
 * Updated to be completely silent to honor the user's explicit request to remove all click, back, next, and hover sound effects.
 */

class SoundEffectsEngine {
  private isMuted: boolean = true;

  public getIsMuted(): boolean {
    return true;
  }

  public toggleMute(): boolean {
    return true;
  }

  public setMuted(muted: boolean) {
    // No-op to remain completely silent
  }

  public playClick(pitch = 1.0) {
    // Silent
  }

  public playTab() {
    // Silent
  }

  public playNext() {
    // Silent
  }

  public playBack() {
    // Silent
  }

  public playHover() {
    // Silent
  }

  public playDrawerOpen() {
    // Silent
  }

  public playDrawerClose() {
    // Silent
  }

  public playBookmark() {
    // Silent
  }
}

export const soundEffects = new SoundEffectsEngine();
