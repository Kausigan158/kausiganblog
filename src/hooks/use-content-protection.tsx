import { useEffect } from 'react';

// Extend Window interface for Firebug
declare global {
  interface Window {
    Firebug?: {
      chrome?: {
        isInitialized?: boolean;
      };
    };
  }
}

export const useContentProtection = () => {
  useEffect(() => {
    // Show protection alert
    const showProtectionAlert = (message: string) => {
      // Create a custom alert element
      const alertDiv = document.createElement('div');
      alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff3b3b, #b30000);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(255, 59, 59, 0.3);
        z-index: 999999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        font-weight: 600;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
      `;
      
      alertDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="
            width: 24px;
            height: 24px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <div style="font-weight: 700; margin-bottom: 4px;">Content Protected</div>
            <div style="font-size: 13px; opacity: 0.9;">${message}</div>
          </div>
        </div>
      `;

      // Add CSS animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(alertDiv);

      // Remove alert after 4 seconds
      setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
          if (document.body.contains(alertDiv)) {
            document.body.removeChild(alertDiv);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        }, 300);
      }, 4000);
    };

    // Disable text selection
    const disableSelection = (e: Event) => {
      e.preventDefault();
      showProtectionAlert('Text selection is disabled to protect content.');
      return false;
    };

    // Disable right-click context menu
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showProtectionAlert('Right-click is disabled to protect content.');
      return false;
    };

    // Disable keyboard shortcuts
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      let message = '';
      
      // Prevent Ctrl+A (Select All)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        message = 'Select All (Ctrl+A) is disabled to protect content.';
      }
      // Prevent Ctrl+C (Copy)
      else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        message = 'Copy (Ctrl+C) is disabled to protect content.';
      }
      // Prevent Ctrl+X (Cut)
      else if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        message = 'Cut (Ctrl+X) is disabled to protect content.';
      }
      // Prevent Ctrl+V (Paste)
      else if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        message = 'Paste (Ctrl+V) is disabled to protect content.';
      }
      // Prevent Ctrl+U (View Source)
      else if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        message = 'View Source (Ctrl+U) is disabled to protect content.';
      }
      // Prevent F12 (Developer Tools)
      else if (e.key === 'F12') {
        e.preventDefault();
        message = 'Developer Tools (F12) is disabled to protect content.';
      }
      // Prevent Ctrl+Shift+I (Developer Tools)
      else if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        message = 'Developer Tools (Ctrl+Shift+I) is disabled to protect content.';
      }
      // Prevent Ctrl+Shift+C (Developer Tools)
      else if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        message = 'Developer Tools (Ctrl+Shift+C) is disabled to protect content.';
      }
      // Prevent Ctrl+Shift+J (Developer Tools)
      else if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        message = 'Developer Tools (Ctrl+Shift+J) is disabled to protect content.';
      }
      // Prevent Ctrl+S (Save)
      else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        message = 'Save (Ctrl+S) is disabled to protect content.';
      }
      // Prevent Ctrl+P (Print)
      else if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        message = 'Print (Ctrl+P) is disabled to protect content.';
      }
      // Prevent Ctrl+Shift+P (Developer Tools)
      else if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        message = 'Developer Tools (Ctrl+Shift+P) is disabled to protect content.';
      }
      // Prevent Ctrl+Shift+M (Developer Tools)
      else if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        message = 'Developer Tools (Ctrl+Shift+M) is disabled to protect content.';
      }

      if (message) {
        showProtectionAlert(message);
        return false;
      }
    };

    // Disable drag and drop
    const disableDrag = (e: DragEvent) => {
      e.preventDefault();
      showProtectionAlert('Drag and drop is disabled to protect content.');
      return false;
    };

    // Monitor for dev tools opening
    let devtools = { open: false, orientation: null as string | null };
    const threshold = 160;

    const emitEvent = (isOpen: boolean, orientation?: string) => {
      window.dispatchEvent(new CustomEvent('devtoolschange', {
        detail: {
          isOpen,
          orientation
        }
      }));
    };

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientation = widthThreshold ? 'vertical' : 'horizontal';

      if (
        !(heightThreshold && widthThreshold) &&
        ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
      ) {
        if ((!devtools.open || devtools.orientation !== orientation)) {
          emitEvent(true, orientation);
          showProtectionAlert('Developer tools detected. Access denied.');
        }

        devtools = { open: true, orientation };
      } else {
        if (devtools.open) {
          emitEvent(false, undefined);
        }

        devtools = { open: false, orientation: null };
      }
    };

    // Add event listeners
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('keydown', disableKeyboardShortcuts);
    document.addEventListener('dragstart', disableDrag);
    document.addEventListener('drop', disableDrag);

    // Monitor for dev tools
    const devToolsInterval = setInterval(checkDevTools, 500);
    window.addEventListener('resize', checkDevTools);
    window.addEventListener('devtoolschange', (e: any) => {
      if (e.detail.isOpen) {
        document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; font-size: 24px; color: #ff3b3b;">Developer tools detected. Access denied.</div>';
      }
    });

    // Add CSS to disable text selection and enhance protection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Allow selection only for input fields and textareas */
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      /* Disable image dragging */
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      /* Disable text highlighting */
      ::selection {
        background: transparent !important;
        color: inherit !important;
      }
      ::-moz-selection {
        background: transparent !important;
        color: inherit !important;
      }
      
      /* Disable copy on images */
      img {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Disable text selection on all elements */
      body, div, p, h1, h2, h3, h4, h5, h6, span, a, li, td, th {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    // Additional protection: Disable view source
    document.onkeydown = function(e) {
      if (e.ctrlKey && e.key === 'u') {
        showProtectionAlert('View Source (Ctrl+U) is disabled to protect content.');
        return false;
      }
    };

    // Disable print screen
    document.addEventListener('keyup', function(e) {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        showProtectionAlert('Print Screen is disabled to protect content.');
        return false;
      }
    });

    // Cleanup function
    return () => {
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeyboardShortcuts);
      document.removeEventListener('dragstart', disableDrag);
      document.removeEventListener('drop', disableDrag);
      window.removeEventListener('resize', checkDevTools);
      window.removeEventListener('devtoolschange', () => {});
      clearInterval(devToolsInterval);
      document.head.removeChild(style);
    };
  }, []);
}; 