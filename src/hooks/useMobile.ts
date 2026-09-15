import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================
// HOOK: useSwipe - Detecta gestos de swipe
// ============================================
export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold: number = 50
) {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [swiping, setSwiping] = useState(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setSwiping(true);
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (startX === null || startY === null || !swiping) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Solo si el swipe es más horizontal que vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (diffX < 0 && onSwipeRight) {
        onSwipeRight();
      }
    }

    setStartX(null);
    setStartY(null);
    setSwiping(false);
  }, [startX, startY, swiping, threshold, onSwipeLeft, onSwipeRight]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return { swiping };
}

// ============================================
// HOOK: useDebounce - Delay en búsqueda
// ============================================
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// HOOK: useScrollToTop - Scroll automático
// ============================================
export function useScrollToTop(dependency: any) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dependency]);
}

// ============================================
// HOOK: useLocalStorage - Persistencia
// ============================================
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// ============================================
// HOOK: useHapticFeedback - Vibración sutil
// ============================================
export function useHapticFeedback() {
  const haptic = useCallback((style: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const duration = style === 'light' ? 10 : style === 'medium' ? 25 : 50;
      navigator.vibrate(duration);
    }
  }, []);

  return haptic;
}

// ============================================
// HOOK: useMediaQuery - Responsive
// ============================================
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// ============================================
// HOOK: usePullToRefresh - Pull down to refresh
// ============================================
export function usePullToRefresh(onRefresh: () => void, threshold: number = 80) {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (startY.current === null || !pulling) return;
    
    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY.current);
    setPullDistance(Math.min(distance, threshold * 2));
  }, [pulling, threshold]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance >= threshold) {
      onRefresh();
    }
    setPulling(false);
    setPullDistance(0);
    startY.current = null;
  }, [pullDistance, threshold, onRefresh]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { pulling, pullDistance };
}
