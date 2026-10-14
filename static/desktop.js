// BeOS desktop window manager: dragging, stacking, minimize/zoom,
// the Deskbar window list, SPA navigation and localStorage persistence.
document.addEventListener("DOMContentLoaded", function() {
  // Deskbar clock
  var clock = document.getElementById('deskbar-clock');
  function tick() {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 10000);

  // Checked live so narrowing or widening the browser follows the same
  // 768px breakpoint the CSS uses, instead of whatever it was on load.
  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  let highestZIndex = 1000;
  let draggedWindow = null;
  let dragOffset = { x: 0, y: 0 };
  let windowCount = 0;
  let currentFocusedUrl = null;
  let suppressPushState = false;

  // Normalize URL for comparison
  function normalizeUrl(url) {
    // Handle relative URLs
    try {
      const u = new URL(url, window.location.origin);
      url = u.pathname;
    } catch(e) {}
    return url.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  }

  // Track open windows by URL
  const windowsByUrl = {};

  // Register the initial main window
  const mainWindow = document.querySelector('.window.main-window');
  if (mainWindow) {
    const url = normalizeUrl(window.location.pathname);
    mainWindow.dataset.url = url;
    windowsByUrl[url] = mainWindow;
    currentFocusedUrl = url;
  }

  // Sidepanels have no URL, so key them by title
  document.querySelectorAll('.sidepanel-window').forEach(function(win) {
    win.dataset.key = 'panel:' + windowLabel(win);
  });

  // Desktop persistence: window positions, stacking order, minimized and
  // zoomed state, and which page windows are open, kept in localStorage
  // so the desktop looks the same on the next visit. Desktop only.
  var STORAGE_KEY = 'beos-desktop-v1';
  var MAX_RESTORED_WINDOWS = 8;
  var restoring = true; // no saving until the saved desktop is restored

  function windowKey(win) {
    if (win.dataset.key) return win.dataset.key;
    return win.dataset.url ? 'page:' + win.dataset.url : null;
  }

  function windowLabel(win) {
    var titleEl = win.querySelector('.title-bar .title');
    return titleEl ? titleEl.textContent.trim() : 'Untitled';
  }

  function zOf(win) {
    return parseInt(win.style.zIndex) || 0;
  }

  function loadDesktop() {
    try {
      var state = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return state && Array.isArray(state.windows) ? state : null;
    } catch (e) {
      return null;
    }
  }

  function saveDesktop() {
    if (restoring || isMobile()) return;
    var wins = Array.prototype.slice.call(document.querySelectorAll('.window')).filter(windowKey);
    var stacked = wins.slice().sort(function(a, b) { return zOf(a) - zOf(b); });
    var entries = wins.map(function(win) {
      return {
        key: windowKey(win),
        url: win.dataset.url || null,
        left: parseInt(win.style.left) || 0,
        top: parseInt(win.style.top) || 0,
        z: stacked.indexOf(win),
        minimized: win.classList.contains('minimized'),
        maximized: win.classList.contains('maximized')
      };
    });
    // Pages without sidepanels (About, Library) keep the panels' saved layout
    var prev = loadDesktop();
    if (prev && !document.querySelector('.sidepanel-window')) {
      prev.windows.forEach(function(entry) {
        if (entry.key && entry.key.indexOf('panel:') === 0) entries.push(entry);
      });
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ windows: entries }));
    } catch (e) {}
  }

  // Put a window where it was saved, kept on screen if the browser shrank
  function applySavedLayout(win, entry) {
    var desk = win.parentElement;
    var maxLeft = Math.max(0, desk.clientWidth - 120);
    var maxTop = Math.max(0, desk.clientHeight - 40);
    win.style.left = Math.min(Math.max(0, entry.left || 0), maxLeft) + 'px';
    win.style.top = Math.min(Math.max(0, entry.top || 0), maxTop) + 'px';
    win.classList.toggle('minimized', !!entry.minimized);
    win.classList.toggle('maximized', !!entry.maximized);
  }

  // Deskbar list of open windows. Clicking an entry restores a minimized
  // window, minimizes the focused one, or focuses any other.
  var windowList = document.getElementById('deskbar-windows');

  function windowIcon(win) {
    var url = win.dataset.url || '';
    if (url === '/') return windowList.dataset.iconPosts;
    if (/\/library$/.test(url)) return windowList.dataset.iconBooks;
    return windowList.dataset.iconDocument;
  }

  function renderDeskbarWindows() {
    if (!windowList) return;
    windowList.innerHTML = '';
    document.querySelectorAll('.window').forEach(function(win) {
      var minimized = win.classList.contains('minimized');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'deskbar-window' +
        (win.classList.contains('focused') ? ' focused' : '') +
        (minimized ? ' minimized' : '');
      btn.title = minimized ? 'Restore window' : 'Focus window';

      var icon = document.createElement('img');
      icon.className = 'team-icon';
      icon.src = windowIcon(win);
      icon.alt = '';
      var label = document.createElement('span');
      label.className = 'deskbar-window-label';
      label.textContent = windowLabel(win);
      btn.appendChild(icon);
      btn.appendChild(label);

      btn.addEventListener('click', function() {
        if (!minimized && win.classList.contains('focused')) {
          minimizeWindow(win);
        } else {
          bringToFront(win);
        }
      });

      var li = document.createElement('li');
      li.appendChild(btn);
      windowList.appendChild(li);
    });
  }

  function desktopChanged() {
    renderDeskbarWindows();
    saveDesktop();
  }

  // Focus the topmost visible window, preferring page windows so the URL
  // follows. Returns false when no page window is left on screen.
  function focusTopWindow() {
    var visible = Array.prototype.slice.call(document.querySelectorAll('.window:not(.minimized)'));
    visible.sort(function(a, b) { return zOf(a) - zOf(b); });
    var pages = visible.filter(function(w) { return w.dataset.url; });
    var next = pages.length ? pages[pages.length - 1] : visible[visible.length - 1];
    if (next) bringToFront(next);
    return pages.length > 0;
  }

  function minimizeWindow(win) {
    var wasFocused = win.classList.contains('focused');
    win.classList.add('minimized');
    win.classList.remove('focused');
    if (wasFocused) focusTopWindow();
    desktopChanged();
  }

  // Bring window to front and optionally update URL
  function bringToFront(win) {
    document.querySelectorAll('.window').forEach(function(w) { w.classList.remove('focused'); });
    win.classList.remove('minimized');
    win.classList.add('focused');
    win.style.zIndex = ++highestZIndex;

    if (!isMobile() && win.dataset.url && !suppressPushState) {
      var url = win.dataset.url;
      if (currentFocusedUrl !== url) {
        var pushUrl = url === '/' ? '/' : url;
        history.pushState({ url: url }, '', pushUrl);
        currentFocusedUrl = url;
        document.title = win.dataset.title || document.title;
      }
    }
    desktopChanged();
  }

  // Setup drag on a title bar element; double-clicking the tab minimizes
  function setupDrag(titleBar) {
    titleBar.addEventListener('dblclick', function(e) {
      if (isMobile() || e.target.closest('button')) return;
      var win = this.closest('.window');
      if (win) minimizeWindow(win);
    });
    titleBar.addEventListener('mousedown', function(e) {
      if (isMobile()) return;
      var win = this.closest('.window');
      if (!win) return;
      if (e.target.closest('button')) return;
      draggedWindow = win;
      bringToFront(win);
      var rect = win.getBoundingClientRect();
      dragOffset.x = e.clientX - (parseInt(win.style.left) || rect.left);
      dragOffset.y = e.clientY - (parseInt(win.style.top) || rect.top);
      e.preventDefault();
    });
  }

  // Setup close button
  function setupCloseButton(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var win = this.closest('.window');
      if (!win) return;

      var url = win.dataset.url;
      var wasFocused = win.classList.contains('focused');
      if (url) delete windowsByUrl[url];
      win.remove();

      // If this was the focused window, focus another
      if (wasFocused || (url && url === currentFocusedUrl)) {
        if (!focusTopWindow() && url && url === currentFocusedUrl) {
          history.pushState({ url: '/' }, '', '/');
          currentFocusedUrl = '/';
        }
      }
      desktopChanged();
    });
  }

  // Setup zoom button: toggle between the window's normal size and full screen
  function setupResizeButton(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var win = this.closest('.window');
      if (!win) return;
      bringToFront(win);
      win.classList.toggle('maximized');
      desktopChanged();
    });
  }

  // Setup all interactive elements on a window
  function setupWindow(win) {
    var titleBar = win.querySelector('.title-bar');
    if (titleBar) setupDrag(titleBar);
    var closeBtn = win.querySelector('.close');
    if (closeBtn) setupCloseButton(closeBtn);
    var resizeBtn = win.querySelector('.resize');
    if (resizeBtn) setupResizeButton(resizeBtn);
  }

  // Create a new window element
  function createWindow(title, contentHtml, url, options) {
    options = options || {};
    windowCount++;

    var win = document.createElement('div');
    win.className = 'window' + (options.wide ? ' wide-window' : '');
    if (url) win.dataset.url = url;
    win.dataset.title = title;

    var contentsClass = 'window-contents' + (options.wide ? ' wide-contents' : '');

    win.innerHTML =
      '<div class="title-bar">' +
        '<button aria-label="Close" class="close"></button>' +
        '<h1 class="title">' + title + '</h1>' +
        '<button aria-label="Resize" class="resize"></button>' +
      '</div>' +
      '<div class="window-frame">' +
        '<div class="' + contentsClass + '">' +
          contentHtml +
        '</div>' +
      '</div>';

    // Cascade position
    if (!isMobile()) {
      var offset = (windowCount % 8) * 30;
      win.style.left = (120 + offset) + 'px';
      win.style.top = (60 + offset) + 'px';
    }

    var desktop = document.querySelector('.everything');
    if (isMobile()) {
      // Mobile stacks the windows vertically, so appending would bury the
      // new window under the current one. Put it first, just below the
      // Deskbar, and scroll up to it.
      var deskbar = desktop.querySelector('.deskbar');
      desktop.insertBefore(win, deskbar ? deskbar.nextSibling : desktop.firstChild);
    } else {
      desktop.appendChild(win);
    }
    setupWindow(win);
    if (url) windowsByUrl[url] = win;
    if (options.background) {
      win.style.zIndex = ++highestZIndex;
      desktopChanged();
    } else {
      bringToFront(win);
      if (isMobile()) window.scrollTo(0, 0);
    }

    return win;
  }

  // Fetch a page and extract its content
  function fetchPage(url) {
    return fetch(url).then(function(resp) {
      return resp.text();
    }).then(function(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');

      // Get title from title bar
      var titleEl = doc.querySelector('.title-bar .title');
      var title = titleEl ? titleEl.textContent.trim() : (doc.title || 'Untitled');

      // Get content
      var contentsEl = doc.querySelector('.window-contents');
      var contentHtml = contentsEl ? contentsEl.innerHTML : '';

      // Check if wide
      var pageTitle = doc.querySelector('title');
      var pageTitleText = pageTitle ? pageTitle.textContent : '';
      var isWide = pageTitleText === 'About' || pageTitleText === 'Library';

      // Extract module scripts (for Library DuckDB etc)
      var moduleScripts = [];
      doc.querySelectorAll('script[type="module"]').forEach(function(s) {
        moduleScripts.push(s.textContent);
      });

      return {
        title: title,
        contentHtml: contentHtml,
        isWide: isWide,
        moduleScripts: moduleScripts
      };
    });
  }

  // SPA navigation - fetch page and open in new window
  function spaNavigate(url) {
    var normalized = normalizeUrl(url);

    // If window already exists, just bring it to front
    if (windowsByUrl[normalized]) {
      bringToFront(windowsByUrl[normalized]);
      return;
    }

    fetchPage(url).then(function(page) {
      openPageWindow(page, normalized);
      // Intercept links inside new window content (handled by global listener)
    }).catch(function(err) {
      // Fall back to normal navigation on error
      window.location.href = url;
    });
  }

  // Open a window for a fetched page
  function openPageWindow(page, url, background) {
    var win = createWindow(page.title, page.contentHtml, url, { wide: page.isWide, background: background });

    // Execute any module scripts from the fetched page
    page.moduleScripts.forEach(function(src) {
      var script = document.createElement('script');
      script.type = 'module';
      script.textContent = src;
      document.body.appendChild(script);
    });

    return win;
  }

  // Initialize existing windows
  document.querySelectorAll('.window').forEach(function(win) {
    setupWindow(win);
  });

  // Position windows on desktop
  if (!isMobile()) {
    var allWindows = document.querySelectorAll('.window');
    allWindows.forEach(function(win, i) {
      if (win.classList.contains('sidepanel-window')) {
        var desktopWidth = win.parentElement.clientWidth;
        win.style.left = Math.max(0, desktopWidth - 620) + 'px';
        win.style.top = (40 + i * 400) + 'px';
        win.style.zIndex = highestZIndex - i;
      } else {
        var x = Math.random() * Math.max(0, win.parentElement.clientWidth - 720);
        win.style.left = Math.max(0, x) + 'px';
        win.style.top = (40 + i * 50) + 'px';
        win.style.zIndex = highestZIndex - i;
      }
    });

    // Bring main window to front last
    if (mainWindow) bringToFront(mainWindow);
  }

  // Restore the saved desktop: move windows back where they were and
  // reopen page windows from last time, then restack them in saved order
  // with this page's window on top.
  var saved = isMobile() ? null : loadDesktop();
  if (!saved) {
    restoring = false;
    desktopChanged();
  } else {
    var savedByKey = {};
    saved.windows.forEach(function(entry) {
      if (entry && entry.key) savedByKey[entry.key] = entry;
    });
    document.querySelectorAll('.window').forEach(function(win) {
      var entry = savedByKey[windowKey(win)];
      if (entry) applySavedLayout(win, entry);
    });
    if (mainWindow) mainWindow.classList.remove('minimized');

    var toReopen = saved.windows
      .filter(function(entry) { return entry && entry.url && !windowsByUrl[entry.url]; })
      .sort(function(a, b) { return b.z - a.z; })
      .slice(0, MAX_RESTORED_WINDOWS);

    Promise.all(toReopen.map(function(entry) {
      return fetchPage(entry.url).then(function(page) {
        if (windowsByUrl[entry.url]) return; // opened by a click meanwhile
        applySavedLayout(openPageWindow(page, entry.url, true), entry);
      }).catch(function() {});
    })).then(function() {
      function rank(win) {
        var entry = savedByKey[windowKey(win)];
        return entry ? entry.z : -1;
      }
      Array.prototype.slice.call(document.querySelectorAll('.window'))
        .sort(function(a, b) { return (rank(a) - rank(b)) || (zOf(a) - zOf(b)); })
        .forEach(function(win) { win.style.zIndex = ++highestZIndex; });
      restoring = false;
      if (mainWindow && mainWindow.isConnected) {
        suppressPushState = true;
        bringToFront(mainWindow);
        suppressPushState = false;
      } else {
        desktopChanged();
      }
    });
  }

  // Global mouse events for dragging
  document.addEventListener('mousemove', function(e) {
    if (draggedWindow && !isMobile()) {
      draggedWindow.style.left = (e.clientX - dragOffset.x) + 'px';
      draggedWindow.style.top = Math.max(0, e.clientY - dragOffset.y) + 'px';
    }
  });

  document.addEventListener('mouseup', function() {
    if (draggedWindow) desktopChanged();
    draggedWindow = null;
  });

  window.addEventListener('pagehide', saveDesktop);

  // Click to focus windows
  document.addEventListener('mousedown', function(e) {
    if (isMobile()) return;
    var win = e.target.closest('.window');
    if (win) bringToFront(win);
  });

  // Desktop icon double-click
  document.querySelectorAll('.desktop-icon').forEach(function(icon) {
    // Track clicks for double-click detection
    var clickTimeout = null;
    var clickCount = 0;

    icon.addEventListener('click', function(e) {
      e.preventDefault();
      clickCount++;
      if (clickCount === 1) {
        // Single click - select the icon
        document.querySelectorAll('.desktop-icon').forEach(function(i) { i.classList.remove('selected'); });
        icon.classList.add('selected');
        clickTimeout = setTimeout(function() { clickCount = 0; }, 400);
      } else if (clickCount === 2) {
        // Double click - open window
        clearTimeout(clickTimeout);
        clickCount = 0;
        icon.classList.remove('selected');
        var url = icon.dataset.url;
        if (url) spaNavigate(url);
      }
    });
  });

  // Click on desktop background deselects icons
  document.querySelector('.everything').addEventListener('click', function(e) {
    if (e.target === this) {
      document.querySelectorAll('.desktop-icon').forEach(function(i) { i.classList.remove('selected'); });
    }
  });

  // Intercept all internal link clicks for SPA navigation (desktop only;
  // mobile falls through to a plain page load)
  document.addEventListener('click', function(e) {
    if (isMobile()) return;
    var link = e.target.closest('a[href]');
    if (!link) return;

    // Don't intercept external links or target=_blank
    if (link.target === '_blank') return;

    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;

    // Check if same origin
    try {
      var url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
    } catch(err) {
      return;
    }

    // Don't intercept RSS links
    if (href.includes('.xml')) return;

    e.preventDefault();
    spaNavigate(href);
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function(e) {
    if (isMobile()) return;
    var url = (e.state && e.state.url) ? e.state.url : normalizeUrl(window.location.pathname);

    // Suppress pushState when handling popstate
    suppressPushState = true;

    if (windowsByUrl[url]) {
      bringToFront(windowsByUrl[url]);
    } else {
      spaNavigate(url);
    }

    suppressPushState = false;
  });

  // Set initial history state
  history.replaceState({ url: currentFocusedUrl }, '', window.location.href);
});
