// useFocusTrap.ts
import { useRef, useEffect } from "react";

export default function useFocusTrap(active: boolean): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    
    const selectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    
    const getFocusable = () => Array.from(ref.current!.querySelectorAll(selectors));
    
    const focusable = getFocusable();
    if (focusable.length) (focusable[0] as HTMLElement).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      const currentFocusable = getFocusable();
      if (!currentFocusable.length) return;
      
      const first = currentFocusable[0] as HTMLElement;
      const last = currentFocusable[currentFocusable.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return ref;
}