/**
 * Sugey ZH Rehabilitación Oral — Interactive Before/After Comparison Slider
 * Supports accessible range input, direct mouse drag, and touch gestures.
 */
(function (global) {
  'use strict';

  function clampPercentage(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return 50;
    return Math.min(100, Math.max(0, num));
  }

  function initBeforeAfter() {
    const wrapper = document.getElementById('slider-wrapper');
    const beforeLayer = document.getElementById('before-image-layer');
    const sliderHandle = document.getElementById('slider-handle');
    const rangeInput = document.getElementById('comparison-range');

    if (!wrapper || !beforeLayer || !sliderHandle || !rangeInput) {
      return null;
    }

    let isDragging = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalTouch = false;

    function setPosition(percent) {
      const clamped = clampPercentage(percent);
      const rightInset = (100 - clamped).toFixed(2);
      const leftPos = clamped.toFixed(2) + '%';
      const clipValue = 'inset(0 ' + rightInset + '% 0 0)';

      beforeLayer.style.clipPath = clipValue;
      beforeLayer.style.webkitClipPath = clipValue;
      sliderHandle.style.left = leftPos;

      const rounded = String(Math.round(clamped));
      if (rangeInput.value !== rounded) {
        rangeInput.value = rounded;
      }
      rangeInput.setAttribute('aria-valuenow', rounded);
    }

    function updateFromClientX(clientX) {
      const rect = wrapper.getBoundingClientRect();
      if (!rect || rect.width <= 0) return;
      const offsetX = clientX - rect.left;
      const percent = (offsetX / rect.width) * 100;
      setPosition(percent);
    }

    // 1. Native range input (keyboard arrows, screen readers, fallback drag)
    rangeInput.addEventListener('input', function (e) {
      setPosition(e.target.value);
    });
    rangeInput.addEventListener('change', function (e) {
      setPosition(e.target.value);
    });

    // 2. Direct Mouse Events on wrapper / handle
    wrapper.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      isDragging = true;
      updateFromClientX(e.clientX);
    });

    global.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    });

    global.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
      }
    });

    // 3. Touch Events for Mobile & Tablets
    wrapper.addEventListener('touchstart', function (e) {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      isDragging = true;
      isHorizontalTouch = false;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      updateFromClientX(touch.clientX);
    }, { passive: true });

    wrapper.addEventListener('touchmove', function (e) {
      if (!isDragging || !e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartX);
      const dy = Math.abs(touch.clientY - touchStartY);

      if (!isHorizontalTouch && (dx > 4 || dy > 4)) {
        isHorizontalTouch = dx >= dy;
      }

      if (isHorizontalTouch && e.cancelable) {
        e.preventDefault();
      }
      updateFromClientX(touch.clientX);
    }, { passive: false });

    function stopTouchDrag() {
      isDragging = false;
      isHorizontalTouch = false;
    }

    wrapper.addEventListener('touchend', stopTouchDrag, { passive: true });
    wrapper.addEventListener('touchcancel', stopTouchDrag, { passive: true });

    // Initialize at input's starting value (50%)
    setPosition(rangeInput.value || 50);

    return {
      setPosition: setPosition
    };
  }

  let controller = null;

  function boot() {
    controller = initBeforeAfter();
  }

  global.SugeyBeforeAfter = {
    init: initBeforeAfter,
    setPosition: function (pct) {
      if (controller) controller.setPosition(pct);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
