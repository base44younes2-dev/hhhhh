/*!
 * ترمه — تعاملات صفحه محصول (Vanilla JS)
 * اسکوپ: فقط صفحه محصول فعلی
 * احترام به prefers-reduced-motion
 * گام ۳: پولیش موبایل پیشرفته (لمس، ریپل، هایلایت، چسبانه موبایل، تب، اسکرول هوشمند)
 *
 * ساختار ماژولار:
 *   initIntro()          — معرفی صفحه
 *   initRevealEffects()  — اسکرول ریویل
 *   initGalleryEffects() — گالری + سوایپ + شمارنده
 *   initTouchFeedback()  — بازخورد لمسی
 *   initRipple()         — ریپل قابل‌استفاده مجدد
 *   initTouchHighlight() — هایلایت شعاعی لمسی
 *   initVariationEffects()— تنوع کالا
 *   initQuantityEffects() — تعداد
 *   initCartEffects()    — CTA + حالت‌ها
 *   initTabsEffects()    — تب‌ها + اسکرول افقی
 *   initMobileSticky()   — چسبانه موبایل
 *   initScrollVelocity() — آگاهی از سرعت اسکرول
 *   initBackToTop()      — بازگشت به بالا
 *   initSpotlight()      — اسپات‌لایت دسکتاپ
 */
(function () {
  'use strict';

  /* ===== تنظیمات ===== */
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reducedMotion = RM.matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var desktopMQ = window.matchMedia('(min-width: 1100px)');
  var mobileMQ = window.matchMedia('(max-width: 1099px)');

  /* فقط در صفحه محصول اجرا شود */
  var productPage = document.querySelector('.product');
  if (!productPage) {
    document.documentElement.classList.remove('js-loading');
    return;
  }

  /* ===== ابزارها ===== */
  function faNum(n) {
    var m = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(n).replace(/\d/g, function (d) { return m[d]; });
  }

  function tempClass(el, cls, ms) {
    if (!el) return;
    el.classList.add(cls);
    setTimeout(function () { el.classList.remove(cls); }, ms || 180);
  }

  /* سیستم بازخورد میکرو */
  var FX = {
    press: function (el, ms) { if (el && !reducedMotion) tempClass(el, 'is-pressed', ms || 180); },
    flash: function (el, cls, ms) { if (el && !reducedMotion) tempClass(el, cls || 'is-selected', ms || 320); },
    shake: function (el) { if (el && !reducedMotion) tempClass(el, 'is-unavailable', 350); },
    emphasize: function (el) { if (el && !reducedMotion) tempClass(el, 'is-selected', 300); }
  };

  /* ================================================================
     ۱. معرفی صفحه (initIntro)
     ================================================================ */
  function initIntro() {
    var html = document.documentElement;
    html.classList.add('js-intro');

    /* اسکلتون شیمر برای گالری */
    var galleryFrame = document.querySelector('.gallery__frame');
    if (galleryFrame && !reducedMotion) {
      var shimmer = document.createElement('div');
      shimmer.className = 'skeleton-shimmer';
      galleryFrame.appendChild(shimmer);
      /* شیمر پس از بارگذاری یا حداکثر ۶۰۰ms حذف می‌شود */
      setTimeout(function () {
        shimmer.classList.add('is-done');
        setTimeout(function () { shimmer.remove(); }, 200);
      }, 500);
    }

    /* معرفی مرحله‌ای */
    if (reducedMotion) {
      html.classList.add('is-ready');
      html.classList.remove('js-loading');
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          html.classList.add('is-ready');
          html.classList.remove('js-loading');
          /* حذف کلاس intro پس از تکمیل انیمیشن */
          setTimeout(function () {
            html.classList.remove('js-intro', 'is-ready');
          }, 700);
        });
      });
    }
  }

  /* ================================================================
     ۲. اسکرول ریویل (initRevealEffects)
     ================================================================ */
  var revealEls = [];

  function initRevealEffects() {
    var revealSelectors = [
      '.gallery',
      '.summary',
      '.summary__eyebrow',
      '.summary__title',
      '.meta',
      '.summary__lead',
      '.highlights',
      '.price',
      '.stock',
      '.buy-form',
      '.tabs-section',
      '.related'
    ];

    revealSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('js-reveal');
        revealEls.push(el);
      });
    });

    /* کارت‌های محصولات مشابه */
    var cards = document.querySelectorAll('.product-card');
    cards.forEach(function (el, i) {
      el.classList.add('js-reveal');
      el.dataset.revealIndex = i;
      revealEls.push(el);
    });

    if (reducedMotion) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = parseInt(entry.target.dataset.revealIndex || '0', 10);
            /* کارت‌های مشابه: stagger کوچک */
            if (entry.target.classList.contains('product-card')) {
              entry.target.style.transitionDelay = ((idx % 4) * 50) + 'ms';
            } else {
              entry.target.style.transitionDelay = '0ms';
            }
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
            setTimeout(function () {
              entry.target.style.transitionDelay = '';
            }, 700);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ================================================================
     ۳. گالری محصول (initGalleryEffects)
     ================================================================ */
  function initGalleryEffects() {
    var galleryFrame = document.querySelector('.gallery__frame');
    var thumbs = document.querySelectorAll('.thumb');

    if (!galleryFrame || !thumbs.length) return;

    var currentArt = galleryFrame.querySelector('.art');
    var activeIndex = 0;

    /* --- شمارنده تصویر --- */
    var counter = null;
    var dotsContainer = null;

    if (mobileMQ.matches && thumbs.length > 1) {
      /* شمارنده عددی */
      counter = document.createElement('span');
      counter.className = 'gallery__counter';
      counter.innerHTML = faNum(1) + '<span class="gallery__counter__sep"> / </span>' + faNum(thumbs.length);
      galleryFrame.appendChild(counter);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { counter.classList.add('is-visible'); });
      });

      /* نقطه‌های نشانگر */
      dotsContainer = document.createElement('div');
      dotsContainer.className = 'gallery__dots';
      thumbs.forEach(function (_, i) {
        var dot = document.createElement('span');
        dot.className = 'gallery__dot' + (i === 0 ? ' is-active' : '');
        dotsContainer.appendChild(dot);
      });
      galleryFrame.appendChild(dotsContainer);
    }

    function updateCounter(idx) {
      if (counter) {
        counter.innerHTML = faNum(idx + 1) + '<span class="gallery__counter__sep"> / </span>' + faNum(thumbs.length);
      }
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.gallery__dot');
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      }
    }

    /* --- تعویض تصویر --- */
    function switchImage(idx, fromSwipe) {
      if (idx === activeIndex && !fromSwipe) return;
      idx = Math.max(0, Math.min(thumbs.length - 1, idx));
      activeIndex = idx;

      var thumb = thumbs[idx];
      thumbs.forEach(function (t) {
        t.classList.remove('thumb--active');
        t.setAttribute('aria-current', 'false');
      });
      thumb.classList.add('thumb--active');
      thumb.setAttribute('aria-current', 'true');

      if (!reducedMotion) tempClass(thumb, 'is-activating', 300);

      var thumbArt = thumb.querySelector('.art');
      if (!thumbArt || !currentArt) return;

      if (reducedMotion) {
        currentArt.replaceWith(cloneArt(thumbArt, thumb));
        currentArt = galleryFrame.querySelector('.art');
        updateCounter(idx);
        scrollThumbIntoView(thumb);
        return;
      }

      currentArt.classList.add('is-fading');
      setTimeout(function () {
        var newArt = cloneArt(thumbArt, thumb);
        newArt.classList.add('is-fading');
        currentArt.replaceWith(newArt);
        currentArt = newArt;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            currentArt.classList.remove('is-fading');
          });
        });
      }, 300);

      updateCounter(idx);
      scrollThumbIntoView(thumb);
    }

    /* --- اسکرول تصویر کوچک به ناحیه قابل‌مشاهده --- */
    function scrollThumbIntoView(thumb) {
      var container = thumb.parentElement;
      if (!container) return;
      var cRect = container.getBoundingClientRect();
      var tRect = thumb.getBoundingClientRect();
      /* RTL: بررسی خروج از طرف راست و چپ */
      if (tRect.left < cRect.left + 4) {
        container.scrollLeft -= (cRect.left - tRect.left + 12);
      } else if (tRect.right > cRect.right - 4) {
        container.scrollLeft += (tRect.right - cRect.right + 12);
      }
    }

    /* --- کلیک روی تصویر کوچک --- */
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        switchImage(i, false);
      });
    });

    /* --- سوایپ افقی روی گالری (موبایل) --- */
    if (!reducedMotion && mobileMQ.matches) {
      var startX = 0, startY = 0, isTracking = false, isHorizontal = false, dx = 0, dy = 0;

      galleryFrame.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        startX = e.clientX;
        startY = e.clientY;
        isTracking = true;
        isHorizontal = false;
        dx = 0;
        dy = 0;
      }, { passive: true });

      galleryFrame.addEventListener('pointermove', function (e) {
        if (!isTracking) return;
        dx = e.clientX - startX;
        dy = e.clientY - startY;
        /* تعیین جهت پس از حرکت کافی */
        if (!isHorizontal && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
          isHorizontal = Math.abs(dx) > Math.abs(dy);
        }
      }, { passive: true });

      galleryFrame.addEventListener('pointerup', function () {
        if (!isTracking) return;
        isTracking = false;
        if (isHorizontal && Math.abs(dx) > 40) {
          /* RTL: سوایپ به راست = تصویر قبلی، سوایپ به چپ = تصویر بعدی */
          if (dx > 0) {
            switchImage(activeIndex - 1, true);
          } else {
            switchImage(activeIndex + 1, true);
          }
        }
      }, { passive: true });

      galleryFrame.addEventListener('pointercancel', function () {
        isTracking = false;
      }, { passive: true });
    }

    /* --- بازخورد فشردن تصویر --- */
    if (!reducedMotion) {
      galleryFrame.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        var art = galleryFrame.querySelector('.art');
        if (art) art.style.transform = 'scale(.98)';
      }, { passive: true });
      galleryFrame.addEventListener('pointerup', function () {
        var art = galleryFrame.querySelector('.art');
        if (art) art.style.transform = '';
      }, { passive: true });
      galleryFrame.addEventListener('pointercancel', function () {
        var art = galleryFrame.querySelector('.art');
        if (art) art.style.transform = '';
      }, { passive: true });
    }

    /* --- افکت اشاره‌گر پیشرفته گالری (دسکتاپ) --- */
    if (canHover && !reducedMotion) {
      var gmx = 0, gmy = 0, gRaf = null, gRect = null;

      galleryFrame.addEventListener('pointerenter', function () {
        gRect = galleryFrame.getBoundingClientRect();
      }, { passive: true });

      galleryFrame.addEventListener('pointermove', function (e) {
        gmx = e.clientX;
        gmy = e.clientY;
        if (gRaf) return;
        gRaf = requestAnimationFrame(function () {
          gRaf = null;
          var art = galleryFrame.querySelector('.art');
          if (!art) return;
          if (!gRect) gRect = galleryFrame.getBoundingClientRect();
          var x = (gmx - gRect.left) / gRect.width - 0.5;
          var y = (gmy - gRect.top) / gRect.height - 0.5;
          art.style.transformOrigin = (50 + x * 22) + '% ' + (50 + y * 22) + '%';
          art.style.transform = 'scale(1.045)';
        });
      }, { passive: true });

      var galleryReset = function () {
        if (gRaf) { cancelAnimationFrame(gRaf); gRaf = null; }
        gRect = null;
        var art = galleryFrame.querySelector('.art');
        if (art) { art.style.transform = ''; art.style.transformOrigin = ''; }
      };
      galleryFrame.addEventListener('pointerleave', galleryReset, { passive: true });
      window.addEventListener('blur', galleryReset);
    }
  }

  function cloneArt(src, thumb) {
    var art = src.cloneNode(true);
    art.setAttribute('role', 'img');
    art.setAttribute('aria-label', thumb.getAttribute('aria-label') || '');
    art.removeAttribute('aria-hidden');
    return art;
  }

  /* ================================================================
     ۴. سیستم بازخورد لمسی (initTouchFeedback)
     ================================================================ */
  function initTouchFeedback() {
    if (reducedMotion) return;

    var selectors = [
      '.chips__label',
      '.swatches__label',
      '.thumb',
      '.stepper__btn',
      '.btn--primary',
      '.btn--ghost',
      '.tabs__tab',
      '.product-card',
      '.reset-btn',
      '.field__guide',
      '.icon-btn',
      '.wish-btn'
    ];

    var elements = [];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('touch-fb')) {
          el.classList.add('touch-fb');
          elements.push(el);
        }
      });
    });

    /* واگذاری رویداد — یک لیسنر مشترک با event delegation */
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      var el = e.target.closest('.touch-fb');
      if (!el) return;
      el.classList.add('is-touching');
    }, { passive: true, capture: true });

    document.addEventListener('pointerup', function (e) {
      document.querySelectorAll('.touch-fb.is-touching').forEach(function (el) {
        el.classList.remove('is-touching');
      });
    }, { passive: true, capture: true });

    document.addEventListener('pointercancel', function () {
      document.querySelectorAll('.touch-fb.is-touching').forEach(function (el) {
        el.classList.remove('is-touching');
      });
    }, { passive: true, capture: true });

    /* پاکسازی هنگام خروج پنجره از فوکوس */
    window.addEventListener('blur', function () {
      document.querySelectorAll('.touch-fb.is-touching').forEach(function (el) {
        el.classList.remove('is-touching');
      });
    });
  }

  /* ================================================================
     ۵. سیستم ریپل قابل‌استفاده مجدد (initRipple)
     ================================================================ */
  function initRipple() {
    if (reducedMotion) return;

    var rippleSelectors = [
      '.btn--primary',
      '.chips__label',
      '.swatches__label',
      '.stepper__btn',
      '.tabs__tab'
    ];

    rippleSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('ripple-container')) {
          el.classList.add('ripple-container');
        }
      });
    });

    /* واگذاری رویداد */
    document.addEventListener('pointerdown', function (e) {
      if (reducedMotion) return;
      var el = e.target.closest('.ripple-container');
      if (!el) return;
      var r = el.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 0.6;
      var s = document.createElement('span');
      s.className = 'ripple-wave';
      s.style.width = s.style.height = size + 'px';
      s.style.left = (e.clientX - r.left - size / 2) + 'px';
      s.style.top = (e.clientY - r.top - size / 2) + 'px';
      s.addEventListener('animationend', function () { s.remove(); });
      el.appendChild(s);
    }, { passive: true });
  }

  /* ================================================================
     ۶. هایلایت شعاعی لمسی (initTouchHighlight)
     ================================================================ */
  function initTouchHighlight() {
    if (reducedMotion) return;

    var highlightSelectors = [
      '.installment',
      '.buy-form',
      '.highlights'
    ];

    highlightSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('touch-highlight')) {
          el.classList.add('touch-highlight');
        }
      });
    });

    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      var el = e.target.closest('.touch-highlight');
      if (!el) return;
      var r = el.getBoundingClientRect();
      var glow = document.createElement('span');
      glow.className = 'touch-highlight__glow';
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top = (e.clientY - r.top) + 'px';
      glow.style.width = glow.style.height = (r.width * 0.6) + 'px';
      glow.addEventListener('animationend', function () { glow.remove(); });
      el.appendChild(glow);
    }, { passive: true });
  }

  /* ================================================================
     ۷. بازخورد تنوع کالا (initVariationEffects)
     ================================================================ */
  function initVariationEffects() {
    document.querySelectorAll('.chips__input, .swatches__input').forEach(function (input) {
      input.addEventListener('change', function () {
        if (input.disabled) return;
        var label = document.querySelector('label[for="' + input.id + '"]');
        var field = input.closest('.field');
        FX.emphasize(label);
        if (field && !reducedMotion) tempClass(field, 'is-highlight', 500);
      });
    });

    document.querySelectorAll('.chips__input:disabled, .swatches__input:disabled').forEach(function (input) {
      var label = document.querySelector('label[for="' + input.id + '"]');
      if (label) {
        label.addEventListener('click', function (e) {
          e.preventDefault();
          FX.shake(label);
        });
      }
    });

    var resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (reducedMotion) return;
        var form = resetBtn.closest('.buy-form');
        if (!form) return;
        form.querySelectorAll('.chips__label, .swatches__label').forEach(function (label, i) {
          setTimeout(function () {
            tempClass(label, 'is-resetting', 300);
          }, i * 30);
        });
      });
    }
  }

  /* ================================================================
     ۸. میکروتعامل تعداد (initQuantityEffects)
     ================================================================ */
  function initQuantityEffects() {
    var stepper = document.querySelector('.stepper');
    if (!stepper) return;

    var valueEl = stepper.querySelector('.stepper__value');
    var btns = stepper.querySelectorAll('.stepper__btn');
    var current = 1;
    var min = 1, max = 10;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isPlus = btn.querySelector('path[d^="M12 6v12"]');
        var next = isPlus ? current + 1 : current - 1;
        if (next < min || next > max) {
          FX.shake(btn);
          return;
        }
        current = next;
        valueEl.textContent = faNum(current);
        if (!reducedMotion) {
          tempClass(btn, 'is-pressed', 120);
          tempClass(valueEl, 'is-changing', 250);
        }
      });
    });
  }

  /* ================================================================
     ۹. CTA — مگنتیک + ریپل + حالت‌ها (initCartEffects)
     ================================================================ */
  var CHECK_SVG = '<svg class="cta-check" viewBox="0 0 24 24" aria-hidden="true">' +
                  '<path d="M5 12.5l4.2 4.2L19 7"/></svg>';

  function ripple(btn, x, y) {
    if (reducedMotion) return;
    var r = btn.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 2;
    var s = document.createElement('span');
    s.className = 'cta-ripple';
    s.style.width = s.style.height = size + 'px';
    s.style.left = (x - r.left - size / 2) + 'px';
    s.style.top = (y - r.top - size / 2) + 'px';
    s.addEventListener('animationend', function () { s.remove(); });
    btn.appendChild(s);
  }

  var mainCta = null;

  function enhanceCta(btn) {
    if (!btn || btn.classList.contains('js-cta')) return null;
    btn.classList.add('js-cta');

    /* برچسب را در یک span می‌پیچیم */
    var icon = btn.querySelector('.btn__icon');
    var label = document.createElement('span');
    label.className = 'btn__label';
    Array.prototype.slice.call(btn.childNodes).forEach(function (nd) {
      if (nd === icon) return;
      label.appendChild(nd);
    });
    btn.appendChild(label);

    var state = document.createElement('span');
    state.className = 'btn__state';
    state.setAttribute('aria-hidden', 'true');
    state.innerHTML =
      '<span class="btn__state--load"><span class="cta-spinner"></span></span>' +
      '<span class="btn__state--ok">' + CHECK_SVG + '</span>';
    btn.appendChild(state);

    var timer = null;

    function setState(s) {
      btn.classList.remove('is-loading', 'is-success');
      if (s === 'loading') {
        btn.classList.add('is-loading');
        btn.setAttribute('aria-busy', 'true');
      } else if (s === 'success') {
        btn.classList.add('is-success');
        btn.removeAttribute('aria-busy');
      } else {
        btn.removeAttribute('aria-busy');
      }
    }

    btn.addEventListener('click', function (e) {
      if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') return;
      ripple(btn, e.clientX, e.clientY);

      if (timer) { clearTimeout(timer); timer = null; }

      if (reducedMotion) {
        setState('success');
        timer = setTimeout(function () { setState('idle'); timer = null; }, 900);
        return;
      }

      setState('loading');
      timer = setTimeout(function () {
        setState('success');
        timer = setTimeout(function () { setState('idle'); timer = null; }, 1400);
      }, 900);
    });

    /* مگنتیک — فقط دسکتاپ/هاور */
    if (canHover && !reducedMotion) {
      var mRaf = null, mrect = null, mx = 0, my = 0, active = false;

      btn.addEventListener('pointerenter', function () {
        active = true;
        mrect = btn.getBoundingClientRect();
      });

      btn.addEventListener('pointermove', function (e) {
        if (!active) return;
        mx = e.clientX;
        my = e.clientY;
        if (mRaf) return;
        mRaf = requestAnimationFrame(function () {
          mRaf = null;
          if (!mrect) mrect = btn.getBoundingClientRect();
          var dx = (mx - (mrect.left + mrect.width / 2)) / (mrect.width / 2);
          var dy = (my - (mrect.top + mrect.height / 2)) / (mrect.height / 2);
          dx = Math.max(-1, Math.min(1, dx));
          dy = Math.max(-1, Math.min(1, dy));
          btn.style.setProperty('--cta-tx', (dx * 4).toFixed(2) + 'px');
          btn.style.setProperty('--cta-ty', (dy * 3).toFixed(2) + 'px');
        });
      }, { passive: true });

      var magReset = function () {
        active = false;
        mrect = null;
        if (mRaf) { cancelAnimationFrame(mRaf); mRaf = null; }
        btn.style.setProperty('--cta-tx', '0px');
        btn.style.setProperty('--cta-ty', '0px');
        btn.style.setProperty('--cta-s', '1');
      };
      btn.addEventListener('pointerleave', magReset, { passive: true });
      window.addEventListener('blur', magReset);

      btn.addEventListener('pointerdown', function () {
        btn.style.setProperty('--cta-s', '.97');
      }, { passive: true });
      btn.addEventListener('pointerup', function () {
        btn.style.setProperty('--cta-s', '1');
      }, { passive: true });
      btn.addEventListener('pointercancel', function () {
        btn.style.setProperty('--cta-s', '1');
      }, { passive: true });
    }

    return btn;
  }

  function initCartEffects() {
    mainCta = enhanceCta(document.querySelector('.buy-form .btn--primary'));
  }

  /* ================================================================
     ۱۰. نوار خرید چسبانه دسکتاپ
     ================================================================ */
  var stickyBuy = null;
  var ctaPast = false;

  function updateSticky() {
    if (!stickyBuy) return;
    var show = desktopMQ.matches && ctaPast;
    stickyBuy.classList.toggle('is-visible', show);
  }

  function initDesktopStickyBuy() {
    var priceEl = document.querySelector('.price__current');
    if (!priceEl || !mainCta) return;

    var bar = document.createElement('div');
    bar.className = 'sticky-buy';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'خرید سریع');

    var inner = document.createElement('div');
    inner.className = 'sticky-buy__inner';

    var price = document.createElement('p');
    price.className = 'sticky-buy__price';
    price.innerHTML = priceEl.innerHTML;

    var btn = document.createElement('button');
    btn.className = 'btn btn--primary sticky-buy__cta';
    btn.type = 'button';
    btn.textContent = 'افزودن به سبد خرید';

    inner.appendChild(price);
    inner.appendChild(btn);
    bar.appendChild(inner);
    document.body.appendChild(bar);
    enhanceCta(btn);

    btn.addEventListener('click', function () { mainCta.click(); });

    stickyBuy = bar;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        ctaPast = !e.isIntersecting && e.boundingClientRect.top < 0;
        updateSticky();
      }, { threshold: 0 });
      io.observe(mainCta);
    }
  }

  if (desktopMQ.addEventListener) desktopMQ.addEventListener('change', updateSticky);

  /* ================================================================
     ۱۱. نوار خرید چسبانه موبایل (initMobileSticky)
     ================================================================ */
  var mobileSticky = null;
  var mobileCtaPast = false;

  function detectMobileToolbar() {
    /* تشخیص نوار ابزار WoodMart موبایل */
    var selectors = [
      '.wd-toolbar',
      '.woodmart-toolbar',
      '.wd-bottom-toolbar',
      '.mobile-toolbar',
      '.et-toolbar',
      '#wd-toolbar'
    ];
    var height = 0;
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el) {
        var r = el.getBoundingClientRect();
        if (r.height > 10 && r.bottom > window.innerHeight - 100) {
          height = Math.ceil(r.height);
          break;
        }
      }
    }
    return height;
  }

  function updateMobileSticky() {
    if (!mobileSticky) return;
    var show = mobileMQ.matches && mobileCtaPast;
    mobileSticky.classList.toggle('is-visible', show);

    /* به‌روزرسانی ارتفاع نوار ابزار */
    if (show) {
      var toolbarH = detectMobileToolbar();
      document.documentElement.style.setProperty('--mobile-toolbar-height', toolbarH + 'px');
    }
  }

  function initMobileSticky() {
    var priceEl = document.querySelector('.price__current');
    var titleEl = document.querySelector('.summary__title');
    if (!priceEl || !mainCta) return;

    var bar = document.createElement('div');
    bar.className = 'mobile-sticky-cta';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'خرید سریع');

    var inner = document.createElement('div');
    inner.className = 'mobile-sticky-cta__inner';

    var priceCol = document.createElement('div');
    priceCol.className = 'mobile-sticky-cta__price';
    var title = titleEl ? titleEl.textContent.trim() : 'پیراهن ابریشمی';
    priceCol.innerHTML =
      '<span class="mobile-sticky-cta__title">' + title + '</span>' +
      '<span class="mobile-sticky-cta__amount">' + priceEl.innerHTML + '</span>';

    var btn = document.createElement('button');
    btn.className = 'mobile-sticky-cta__btn';
    btn.type = 'button';
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M6 8h12l1 12H5L6 8z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>' +
      '</svg>' +
      'افزودن به سبد';

    inner.appendChild(priceCol);
    inner.appendChild(btn);
    bar.appendChild(inner);
    document.body.appendChild(bar);

    /* ریپل روی دکمه چسبانه موبایل */
    btn.classList.add('ripple-container');
    btn.addEventListener('pointerdown', function (e) {
      if (reducedMotion) return;
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 0.6;
      var s = document.createElement('span');
      s.className = 'ripple-wave';
      s.style.width = s.style.height = size + 'px';
      s.style.left = (e.clientX - r.left - size / 2) + 'px';
      s.style.top = (e.clientY - r.top - size / 2) + 'px';
      s.addEventListener('animationend', function () { s.remove(); });
      btn.appendChild(s);
    }, { passive: true });

    btn.addEventListener('click', function () { mainCta.click(); });

    mobileSticky = bar;

    /* نمایش وقتی CTA اصلی از دید خارج شود */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        mobileCtaPast = !e.isIntersecting && e.boundingClientRect.top < 0;
        updateMobileSticky();
      }, { threshold: 0 });
      io.observe(mainCta);
    }

    /* به‌روزرسانی هنگام تغییر اندازه */
    if (mobileMQ.addEventListener) {
      mobileMQ.addEventListener('change', updateMobileSticky);
    }
  }

  /* ================================================================
     ۱۲. تب‌های محصول (initTabsEffects)
     ================================================================ */
  function initTabsEffects() {
    var tabRadios = document.querySelectorAll('.tabs__radio');
    var tabLabels = document.querySelectorAll('.tabs__tab');
    if (!tabRadios.length) return;

    /* نشانگر متحرک (موبایل) */
    var indicator = null;
    var tabNav = document.querySelector('.tabs__nav');
    if (tabNav && mobileMQ.matches && !reducedMotion) {
      indicator = document.createElement('span');
      indicator.className = 'tabs__indicator';
      tabNav.appendChild(indicator);

      /* موقعیت اولیه */
      requestAnimationFrame(function () {
        positionIndicator();
      });
    }

    function positionIndicator() {
      if (!indicator) return;
      var activeLabel = document.querySelector('.tabs__tab[aria-selected="true"]');
      if (!activeLabel) {
        /* fallback: پیدا کردن تب فعال با CSS */
        var checkedRadio = document.querySelector('.tabs__radio:checked');
        if (checkedRadio) {
          activeLabel = document.querySelector('.tabs__tab[for="' + checkedRadio.id + '"]');
        }
      }
      if (!activeLabel) return;
      var navRect = tabNav.getBoundingClientRect();
      var labelRect = activeLabel.getBoundingClientRect();
      var offset = labelRect.left - navRect.left + tabNav.scrollLeft;
      indicator.style.width = labelRect.width + 'px';
      indicator.style.transform = 'translateX(' + offset + 'px)';
    }

    tabRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        var panel = document.querySelector('.tabs__panel--' + radio.id.replace('tab-', ''));
        if (panel && !reducedMotion) {
          panel.classList.remove('is-entering');
          void panel.offsetWidth;
          panel.classList.add('is-entering');
        }

        tabLabels.forEach(function (label) {
          var active = label.getAttribute('for') === radio.id;
          label.setAttribute('aria-selected', active ? 'true' : 'false');
          label.setAttribute('tabindex', active ? '0' : '-1');
        });

        /* اسکرول تب فعال به ناحیه قابل‌مشاهده (موبایل) */
        if (mobileMQ.matches) {
          var activeLabel = document.querySelector('.tabs__tab[for="' + radio.id + '"]');
          if (activeLabel && tabNav) {
            var navRect = tabNav.getBoundingClientRect();
            var labelRect = activeLabel.getBoundingClientRect();
            if (labelRect.left < navRect.left + 8) {
              tabNav.scrollBy({ left: labelRect.left - navRect.left - 16, behavior: 'smooth' });
            } else if (labelRect.right > navRect.right - 8) {
              tabNav.scrollBy({ left: labelRect.right - navRect.right + 16, behavior: 'smooth' });
            }
          }
        }

        /* به‌روزرسانی نشانگر */
        if (indicator) {
          requestAnimationFrame(positionIndicator);
        }
      });
    });

    /* کیبورد نویگیشن */
    if (tabNav) {
      tabNav.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        var labels = Array.prototype.slice.call(tabLabels);
        var current = labels.indexOf(document.activeElement);
        if (current === -1) return;
        /* RTL: ArrowLeft = بعدی، ArrowRight = قبلی */
        var next = e.key === 'ArrowLeft' ? current + 1 : current - 1;
        next = (next + labels.length) % labels.length;
        labels[next].focus();
        labels[next].click();
        e.preventDefault();
      });
    }

    /* به‌روزرسانی نشانگر هنگام تغییر اندازه */
    if (indicator) {
      window.addEventListener('resize', function () {
        requestAnimationFrame(positionIndicator);
      }, { passive: true });
    }
  }

  /* ================================================================
     ۱۳. اسپات‌لایت اشاره‌گر دسکتاپ (initSpotlight)
     ================================================================ */
  function initSpotlight() {
    var SPOT_SEL = '.summary, .buy-form, .installment, .product-card';
    document.querySelectorAll(SPOT_SEL).forEach(function (el) {
      el.classList.add('js-spotlight');
    });

    if (canHover && !reducedMotion) {
      var spotEl = null;
      var smx = 0, smy = 0, sRaf = null;

      var clearSpot = function () {
        if (spotEl) spotEl.classList.remove('is-spot');
        spotEl = null;
        if (sRaf) { cancelAnimationFrame(sRaf); sRaf = null; }
      };

      document.addEventListener('pointermove', function (e) {
        var el = e.target && e.target.closest ? e.target.closest('.js-spotlight') : null;
        if (!el) { clearSpot(); return; }
        if (el !== spotEl) {
          if (spotEl) spotEl.classList.remove('is-spot');
          spotEl = el;
          el.classList.add('is-spot');
        }
        smx = e.clientX;
        smy = e.clientY;
        if (sRaf) return;
        sRaf = requestAnimationFrame(function () {
          sRaf = null;
          if (!spotEl) return;
          var r = spotEl.getBoundingClientRect();
          spotEl.style.setProperty('--mx', ((smx - r.left) / r.width * 100) + '%');
          spotEl.style.setProperty('--my', ((smy - r.top) / r.height * 100) + '%');
        });
      }, { passive: true });

      window.addEventListener('blur', clearSpot);
      document.addEventListener('pointerleave', clearSpot, { passive: true });
    }
  }

  /* ================================================================
     ۱۴. بازگشت به بالا (initBackToTop)
     ================================================================ */
  function initBackToTop() {
    var tabsSection = document.querySelector('.tabs-section');
    if (!tabsSection) return;

    var btn = document.createElement('button');
    btn.className = 'to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'بازگشت به بالا');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 19V6M6.5 11.5 12 6l5.5 5.5"/></svg>';

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    document.body.appendChild(btn);

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        btn.classList.toggle('is-visible', entries[0].isIntersecting);
      }, { threshold: 0 });
      io.observe(tabsSection);
    }
  }

  /* ================================================================
     ۱۵. آگاهی از سرعت اسکرول (initScrollVelocity)
     ================================================================ */
  function initScrollVelocity() {
    if (reducedMotion) return;

    var lastY = window.scrollY;
    var lastT = performance.now();
    var ticking = false;
    var fastTimer = null;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var now = performance.now();
        var dy = Math.abs(window.scrollY - lastY);
        var dt = now - lastT;
        var velocity = dt > 0 ? dy / dt : 0;
        lastY = window.scrollY;
        lastT = now;
        ticking = false;

        /* سرعت بالا: کاهش افکت‌های تزئینی */
        if (velocity > 2.5) {
          document.documentElement.classList.add('is-fast-scroll');
          if (fastTimer) clearTimeout(fastTimer);
          fastTimer = setTimeout(function () {
            document.documentElement.classList.remove('is-fast-scroll');
          }, 200);
        }
      });
    }, { passive: true });
  }

  /* ================================================================
     ۱۶. حرکت کاهش‌یافته در زمان اجرا
     ================================================================ */
  var onRmChange = function (e) {
    reducedMotion = e.matches;
    if (reducedMotion) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
        el.style.transitionDelay = '';
      });
      document.querySelectorAll('.js-spotlight.is-spot').forEach(function (el) {
        el.classList.remove('is-spot');
      });
      document.documentElement.classList.remove('is-fast-scroll');
      document.querySelectorAll('.touch-fb.is-touching').forEach(function (el) {
        el.classList.remove('is-touching');
      });
    }
  };
  if (RM.addEventListener) RM.addEventListener('change', onRmChange);

  /* ================================================================
     راه‌اندازی همه ماژول‌ها
     ================================================================ */
  initIntro();
  initRevealEffects();
  initGalleryEffects();
  initTouchFeedback();
  initRipple();
  initTouchHighlight();
  initVariationEffects();
  initQuantityEffects();
  initCartEffects();
  initTabsEffects();
  initSpotlight();
  initDesktopStickyBuy();
  initMobileSticky();
  initBackToTop();
  initScrollVelocity();

})();
