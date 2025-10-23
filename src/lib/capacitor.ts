import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

/**
 * Initialize Capacitor plugins for mobile
 */
export async function initializeCapacitor() {
  // Only run on mobile platforms
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // Configure Status Bar
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#FFB3D9' });

    // Hide splash screen after app is ready
    await SplashScreen.hide();

    // Configure keyboard
    Keyboard.setAccessoryBarVisible({ isVisible: true });
  } catch (error) {
    console.error('Error initializing Capacitor:', error);
  }
}

/**
 * Check if running on native mobile platform
 */
export function isNativeMobile(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Get platform name
 */
export function getPlatform(): string {
  return Capacitor.getPlatform();
}
