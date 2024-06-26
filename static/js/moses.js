/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

;(function (e, t) {
    typeof define == 'function' && define.amd ? define(t) : (e.moses = t())
})(this, function () {
    var e, t, n
    ;(function (r) {
        function v(e, t) {
            return h.call(e, t)
        }
        function m(e, t) {
            var n,
                r,
                i,
                s,
                o,
                u,
                a,
                f,
                c,
                h,
                p,
                v = t && t.split('/'),
                m = l.map,
                g = (m && m['*']) || {}
            if (e && e.charAt(0) === '.')
                if (t) {
                    ;(e = e.split('/')), (o = e.length - 1), l.nodeIdCompat && d.test(e[o]) && (e[o] = e[o].replace(d, '')), (e = v.slice(0, v.length - 1).concat(e))
                    for (c = 0; c < e.length; c += 1) {
                        p = e[c]
                        if (p === '.') e.splice(c, 1), (c -= 1)
                        else if (p === '..') {
                            if (c === 1 && (e[2] === '..' || e[0] === '..')) break
                            c > 0 && (e.splice(c - 1, 2), (c -= 2))
                        }
                    }
                    e = e.join('/')
                } else e.indexOf('./') === 0 && (e = e.substring(2))
            if ((v || g) && m) {
                n = e.split('/')
                for (c = n.length; c > 0; c -= 1) {
                    r = n.slice(0, c).join('/')
                    if (v)
                        for (h = v.length; h > 0; h -= 1) {
                            i = m[v.slice(0, h).join('/')]
                            if (i) {
                                i = i[r]
                                if (i) {
                                    ;(s = i), (u = c)
                                    break
                                }
                            }
                        }
                    if (s) break
                    !a && g && g[r] && ((a = g[r]), (f = c))
                }
                !s && a && ((s = a), (u = f)), s && (n.splice(0, u, s), (e = n.join('/')))
            }
            return e
        }
        function g(e, t) {
            return function () {
                var n = p.call(arguments, 0)
                return typeof n[0] != 'string' && n.length === 1 && n.push(null), s.apply(r, n.concat([e, t]))
            }
        }
        function y(e) {
            return function (t) {
                return m(t, e)
            }
        }
        function b(e) {
            return function (t) {
                a[e] = t
            }
        }
        function w(e) {
            if (v(f, e)) {
                var t = f[e]
                delete f[e], (c[e] = !0), i.apply(r, t)
            }
            if (!v(a, e) && !v(c, e)) throw new Error('No ' + e)
            return a[e]
        }
        function E(e) {
            var t,
                n = e ? e.indexOf('!') : -1
            return n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e]
        }
        function S(e) {
            return function () {
                return (l && l.config && l.config[e]) || {}
            }
        }
        var i,
            s,
            o,
            u,
            a = {},
            f = {},
            l = {},
            c = {},
            h = Object.prototype.hasOwnProperty,
            p = [].slice,
            d = /\.js$/
        ;(o = function (e, t) {
            var n,
                r = E(e),
                i = r[0]
            return (e = r[1]), i && ((i = m(i, t)), (n = w(i))), i ? (n && n.normalize ? (e = n.normalize(e, y(t))) : (e = m(e, t))) : ((e = m(e, t)), (r = E(e)), (i = r[0]), (e = r[1]), i && (n = w(i))), { f: i ? i + '!' + e : e, n: e, pr: i, p: n }
        }),
            (u = {
                require: function (e) {
                    return g(e)
                },
                exports: function (e) {
                    var t = a[e]
                    return typeof t != 'undefined' ? t : (a[e] = {})
                },
                module: function (e) {
                    return { id: e, uri: '', exports: a[e], config: S(e) }
                }
            }),
            (i = function (e, t, n, i) {
                var s,
                    l,
                    h,
                    p,
                    d,
                    m = [],
                    y = typeof n,
                    E
                i = i || e
                if (y === 'undefined' || y === 'function') {
                    t = !t.length && n.length ? ['require', 'exports', 'module'] : t
                    for (d = 0; d < t.length; d += 1) {
                        ;(p = o(t[d], i)), (l = p.f)
                        if (l === 'require') m[d] = u.require(e)
                        else if (l === 'exports') (m[d] = u.exports(e)), (E = !0)
                        else if (l === 'module') s = m[d] = u.module(e)
                        else if (v(a, l) || v(f, l) || v(c, l)) m[d] = w(l)
                        else {
                            if (!p.p) throw new Error(e + ' missing ' + l)
                            p.p.load(p.n, g(i, !0), b(l), {}), (m[d] = a[l])
                        }
                    }
                    h = n ? n.apply(a[e], m) : undefined
                    if (e)
                        if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports
                        else if (h !== r || !E) a[e] = h
                } else e && (a[e] = n)
            }),
            (e =
                t =
                s =
                    function (e, t, n, a, f) {
                        if (typeof e == 'string') return u[e] ? u[e](t) : w(o(e, t).f)
                        if (!e.splice) {
                            ;(l = e), l.deps && s(l.deps, l.callback)
                            if (!t) return
                            t.splice ? ((e = t), (t = n), (n = null)) : (e = r)
                        }
                        return (
                            (t = t || function () {}),
                            typeof n == 'function' && ((n = a), (a = f)),
                            a
                                ? i(r, e, t, n)
                                : setTimeout(function () {
                                      i(r, e, t, n)
                                  }, 4),
                            s
                        )
                    }),
            (s.config = function (e) {
                return s(e)
            }),
            (e._defined = a),
            (n = function (e, t, n) {
                if (typeof e != 'string') throw new Error('See almond README: incorrect module build, no module name')
                t.splice || ((n = t), (t = [])), !v(a, e) && !v(f, e) && (f[e] = [e, t, n])
            }),
            (n.amd = { jQuery: !0 })
    })(),
        n('../node_modules/almond/almond', function () {})
    var r = r || {}
    return (
        !(function () {
            function e() {
                ;(T = !0),
                    clearTimeout(N),
                    (N = setTimeout(function () {
                        T = !1
                    }, 700))
            }
            function t(e, t) {
                for (; e; ) {
                    if (e.contains(t)) return e
                    e = e.parentNode
                }
                return null
            }
            function n(e, n, r) {
                for (var i = t(e, n), s = e, o = []; s && s !== i; ) v(s, 'pointerenter') && o.push(s), (s = s.parentNode)
                for (; o.length > 0; ) r(o.pop())
            }
            function r(e, n, r) {
                for (var i = t(e, n), s = e; s && s !== i; ) v(s, 'pointerleave') && r(s), (s = s.parentNode)
            }
            function i(e, t) {
                ;['pointerdown', 'pointermove', 'pointerup', 'pointerover', 'pointerout'].forEach(function (n) {
                    window.addEventListener(e(n), function (e) {
                        !T && m(e.target, n) && t(e, n, !0)
                    })
                }),
                    void 0 === window['on' + e('pointerenter').toLowerCase()] &&
                        window.addEventListener(e('pointerover'), function (e) {
                            if (!T) {
                                var r = m(e.target, 'pointerenter')
                                r &&
                                    r !== window &&
                                    (r.contains(e.relatedTarget) ||
                                        n(r, e.relatedTarget, function (n) {
                                            t(e, 'pointerenter', !1, n, e.relatedTarget)
                                        }))
                            }
                        }),
                    void 0 === window['on' + e('pointerleave').toLowerCase()] &&
                        window.addEventListener(e('pointerout'), function (e) {
                            if (!T) {
                                var n = m(e.target, 'pointerleave')
                                n &&
                                    n !== window &&
                                    (n.contains(e.relatedTarget) ||
                                        r(n, e.relatedTarget, function (n) {
                                            t(e, 'pointerleave', !1, n, e.relatedTarget)
                                        }))
                            }
                        })
            }
            if (!window.PointerEvent) {
                Array.prototype.indexOf ||
                    (Array.prototype.indexOf = function (e) {
                        var t = Object(this),
                            n = t.length >>> 0
                        if (0 === n) return -1
                        var r = 0
                        if ((arguments.length > 0 && ((r = Number(arguments[1])), r !== r ? (r = 0) : 0 !== r && 1 / 0 !== r && r !== -1 / 0 && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= n)) return -1
                        for (var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0); n > i; i++) if (i in t && t[i] === e) return i
                        return -1
                    }),
                    Array.prototype.forEach ||
                        (Array.prototype.forEach = function (e, t) {
                            if (!(this && e instanceof Function)) throw new TypeError()
                            for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
                        }),
                    String.prototype.trim ||
                        (String.prototype.trim = function () {
                            return this.replace(/^\s+|\s+$/, '')
                        })
                var s = ['pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointercancel', 'pointerenter', 'pointerleave'],
                    o = ['PointerDown', 'PointerUp', 'PointerMove', 'PointerOver', 'PointerOut', 'PointerCancel', 'PointerEnter', 'PointerLeave'],
                    u = 'touch',
                    a = 'pen',
                    f = 'mouse',
                    l = {},
                    c = function (e) {
                        for (; e && !e.handjs_forcePreventDefault; ) e = e.parentNode
                        return !!e || window.handjs_forcePreventDefault
                    },
                    h = function (e, t, n, r, i) {
                        var s
                        if (
                            (document.createEvent ? ((s = document.createEvent('MouseEvents')), s.initMouseEvent(t, n, !0, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, i || e.relatedTarget)) : ((s = document.createEventObject()), (s.screenX = e.screenX), (s.screenY = e.screenY), (s.clientX = e.clientX), (s.clientY = e.clientY), (s.ctrlKey = e.ctrlKey), (s.altKey = e.altKey), (s.shiftKey = e.shiftKey), (s.metaKey = e.metaKey), (s.button = e.button), (s.relatedTarget = i || e.relatedTarget)),
                            void 0 === s.offsetX &&
                                (void 0 !== e.offsetX
                                    ? (Object && void 0 !== Object.defineProperty && (Object.defineProperty(s, 'offsetX', { writable: !0 }), Object.defineProperty(s, 'offsetY', { writable: !0 })), (s.offsetX = e.offsetX), (s.offsetY = e.offsetY))
                                    : Object && void 0 !== Object.defineProperty
                                      ? (Object.defineProperty(s, 'offsetX', {
                                            get: function () {
                                                return this.currentTarget && this.currentTarget.offsetLeft ? e.clientX - this.currentTarget.offsetLeft : e.clientX
                                            }
                                        }),
                                        Object.defineProperty(s, 'offsetY', {
                                            get: function () {
                                                return this.currentTarget && this.currentTarget.offsetTop ? e.clientY - this.currentTarget.offsetTop : e.clientY
                                            }
                                        }))
                                      : void 0 !== e.layerX && ((s.offsetX = e.layerX - e.currentTarget.offsetLeft), (s.offsetY = e.layerY - e.currentTarget.offsetTop))),
                            (s.isPrimary = void 0 !== e.isPrimary ? e.isPrimary : !0),
                            e.pressure)
                        )
                            s.pressure = e.pressure
                        else {
                            var o = 0
                            void 0 !== e.which ? (o = e.which) : void 0 !== e.button && (o = e.button), (s.pressure = 0 === o ? 0 : 0.5)
                        }
                        if (
                            ((s.rotation = e.rotation ? e.rotation : 0),
                            (s.hwTimestamp = e.hwTimestamp ? e.hwTimestamp : 0),
                            (s.tiltX = e.tiltX ? e.tiltX : 0),
                            (s.tiltY = e.tiltY ? e.tiltY : 0),
                            (s.height = e.height ? e.height : 0),
                            (s.width = e.width ? e.width : 0),
                            (s.preventDefault = function () {
                                void 0 !== e.preventDefault && e.preventDefault()
                            }),
                            void 0 !== s.stopPropagation)
                        ) {
                            var l = s.stopPropagation
                            s.stopPropagation = function () {
                                void 0 !== e.stopPropagation && e.stopPropagation(), l.call(this)
                            }
                        }
                        switch (((s.pointerId = e.pointerId), (s.pointerType = e.pointerType), s.pointerType)) {
                            case 2:
                                s.pointerType = u
                                break
                            case 3:
                                s.pointerType = a
                                break
                            case 4:
                                s.pointerType = f
                        }
                        r ? r.dispatchEvent(s) : e.target ? e.target.dispatchEvent(s) : e.srcElement.fireEvent('on' + y(t), s)
                    },
                    p = function (e, t, n, r, i) {
                        ;(e.pointerId = 1), (e.pointerType = f), h(e, t, n, r, i)
                    },
                    d = function (e, t, n, r, i, s) {
                        var o = t.identifier + 2
                        ;(t.pointerId = o),
                            (t.pointerType = u),
                            (t.currentTarget = n),
                            void 0 !== r.preventDefault &&
                                (t.preventDefault = function () {
                                    r.preventDefault()
                                }),
                            h(t, e, i, n, s)
                    },
                    v = function (e, t) {
                        return e.__handjsGlobalRegisteredEvents && e.__handjsGlobalRegisteredEvents[t]
                    },
                    m = function (e, t) {
                        for (; e && !v(e, t); ) e = e.parentNode
                        return e ? e : v(window, t) ? window : void 0
                    },
                    g = function (e, t, n, r, i, s) {
                        m(n, e) && d(e, t, n, r, i, s)
                    },
                    y = function (e) {
                        return e.toLowerCase().replace('pointer', 'mouse')
                    },
                    b = function (e, t) {
                        var n = s.indexOf(t),
                            r = e + o[n]
                        return r
                    },
                    w = function (e, t, n, r) {
                        if ((void 0 === e.__handjsRegisteredEvents && (e.__handjsRegisteredEvents = []), r)) {
                            if (void 0 !== e.__handjsRegisteredEvents[t]) return e.__handjsRegisteredEvents[t]++, void 0
                            ;(e.__handjsRegisteredEvents[t] = 1), e.addEventListener(t, n, !1)
                        } else {
                            if (-1 !== e.__handjsRegisteredEvents.indexOf(t) && (e.__handjsRegisteredEvents[t]--, 0 !== e.__handjsRegisteredEvents[t])) return
                            e.removeEventListener(t, n), (e.__handjsRegisteredEvents[t] = 0)
                        }
                    },
                    E = function (e, t, n) {
                        if ((e.__handjsGlobalRegisteredEvents || (e.__handjsGlobalRegisteredEvents = []), n)) {
                            if (void 0 !== e.__handjsGlobalRegisteredEvents[t]) return e.__handjsGlobalRegisteredEvents[t]++, void 0
                            e.__handjsGlobalRegisteredEvents[t] = 1
                        } else void 0 !== e.__handjsGlobalRegisteredEvents[t] && (e.__handjsGlobalRegisteredEvents[t]--, e.__handjsGlobalRegisteredEvents[t] < 0 && (e.__handjsGlobalRegisteredEvents[t] = 0))
                        var r, i
                        switch (
                            (window.MSPointerEvent
                                ? ((r = function (e) {
                                      return b('MS', e)
                                  }),
                                  (i = h))
                                : ((r = y), (i = p)),
                            t)
                        ) {
                            case 'pointerenter':
                            case 'pointerleave':
                                var s = r(t)
                                void 0 !== e['on' + s.toLowerCase()] &&
                                    w(
                                        e,
                                        s,
                                        function (e) {
                                            i(e, t)
                                        },
                                        n
                                    )
                        }
                    },
                    S = function (e) {
                        var t = e.prototype ? e.prototype.addEventListener : e.addEventListener,
                            n = function (e, n, r) {
                                ;-1 !== s.indexOf(e) && E(this, e, !0), void 0 === t ? this.attachEvent('on' + y(e), n) : t.call(this, e, n, r)
                            }
                        e.prototype ? (e.prototype.addEventListener = n) : (e.addEventListener = n)
                    },
                    x = function (e) {
                        var t = e.prototype ? e.prototype.removeEventListener : e.removeEventListener,
                            n = function (e, n, r) {
                                ;-1 !== s.indexOf(e) && E(this, e, !1), void 0 === t ? this.detachEvent(y(e), n) : t.call(this, e, n, r)
                            }
                        e.prototype ? (e.prototype.removeEventListener = n) : (e.removeEventListener = n)
                    }
                S(window), S(window.HTMLElement || window.Element), S(document), navigator.isCocoonJS || (S(HTMLBodyElement), S(HTMLDivElement), S(HTMLImageElement), S(HTMLUListElement), S(HTMLAnchorElement), S(HTMLLIElement), S(HTMLTableElement), window.HTMLSpanElement && S(HTMLSpanElement)), window.HTMLCanvasElement && S(HTMLCanvasElement), !navigator.isCocoonJS && window.SVGElement && S(SVGElement), x(window), x(window.HTMLElement || window.Element), x(document), navigator.isCocoonJS || (x(HTMLBodyElement), x(HTMLDivElement), x(HTMLImageElement), x(HTMLUListElement), x(HTMLAnchorElement), x(HTMLLIElement), x(HTMLTableElement), window.HTMLSpanElement && x(HTMLSpanElement)), window.HTMLCanvasElement && x(HTMLCanvasElement), !navigator.isCocoonJS && window.SVGElement && x(SVGElement)
                var T = !1,
                    N = -1
                !(function () {
                    window.MSPointerEvent
                        ? i(function (e) {
                              return b('MS', e)
                          }, h)
                        : (i(y, p),
                          void 0 !== window.ontouchstart &&
                              (window.addEventListener('touchstart', function (t) {
                                  for (var r = 0; r < t.changedTouches.length; ++r) {
                                      var i = t.changedTouches[r]
                                      ;(l[i.identifier] = i.target),
                                          g('pointerover', i, i.target, t, !0),
                                          n(i.target, null, function (e) {
                                              d('pointerenter', i, e, t, !1)
                                          }),
                                          g('pointerdown', i, i.target, t, !0)
                                  }
                                  e()
                              }),
                              window.addEventListener('touchend', function (t) {
                                  for (var n = 0; n < t.changedTouches.length; ++n) {
                                      var i = t.changedTouches[n],
                                          s = l[i.identifier]
                                      g('pointerup', i, s, t, !0),
                                          g('pointerout', i, s, t, !0),
                                          r(s, null, function (e) {
                                              d('pointerleave', i, e, t, !1)
                                          })
                                  }
                                  e()
                              }),
                              window.addEventListener('touchmove', function (t) {
                                  for (var i = 0; i < t.changedTouches.length; ++i) {
                                      var s = t.changedTouches[i],
                                          o = document.elementFromPoint(s.clientX, s.clientY),
                                          u = l[s.identifier]
                                      if ((u && c(u) === !0 && t.preventDefault(), g('pointermove', s, u, t, !0), !navigator.isCocoonJS)) {
                                          var o = document.elementFromPoint(s.clientX, s.clientY)
                                          if (u === o) continue
                                          u &&
                                              (g('pointerout', s, u, t, !0, o),
                                              u.contains(o) ||
                                                  r(u, o, function (e) {
                                                      d('pointerleave', s, e, t, !1, o)
                                                  })),
                                              o &&
                                                  (g('pointerover', s, o, t, !0, u),
                                                  o.contains(u) ||
                                                      n(o, u, function (e) {
                                                          d('pointerenter', s, e, t, !1, u)
                                                      })),
                                              (l[s.identifier] = o)
                                      }
                                  }
                                  e()
                              }),
                              window.addEventListener('touchcancel', function (e) {
                                  for (var t = 0; t < e.changedTouches.length; ++t) {
                                      var n = e.changedTouches[t]
                                      g('pointercancel', n, l[n.identifier], e, !0)
                                  }
                              })))
                })(),
                    void 0 === navigator.pointerEnabled && ((navigator.pointerEnabled = !0), navigator.msPointerEnabled && (navigator.maxTouchPoints = navigator.msMaxTouchPoints))
            }
        })(),
        (function () {
            window.PointerEvent ||
                (document.styleSheets &&
                    document.addEventListener &&
                    document.addEventListener(
                        'DOMContentLoaded',
                        function () {
                            if (void 0 === document.body.style.touchAction) {
                                var e = new RegExp('.+?{.*?}', 'm'),
                                    t = new RegExp('.+?{', 'm'),
                                    n = function (n) {
                                        var r = e.exec(n)
                                        if (r) {
                                            var i = r[0]
                                            n = n.replace(i, '').trim()
                                            var s = t.exec(i)[0].replace('{', '').trim()
                                            if (-1 !== i.replace(/\s/g, '').indexOf('touch-action:none'))
                                                for (var o = document.querySelectorAll(s), u = 0; u < o.length; u++) {
                                                    var a = o[u]
                                                    void 0 !== a.style.msTouchAction ? (a.style.msTouchAction = 'none') : (a.handjs_forcePreventDefault = !0)
                                                }
                                            return n
                                        }
                                    },
                                    r = function (e) {
                                        if (window.setImmediate) e && setImmediate(r, n(e))
                                        else for (; e; ) e = n(e)
                                    }
                                try {
                                    for (var i = 0; i < document.styleSheets.length; i++) {
                                        var s = document.styleSheets[i]
                                        if (null != s.href) {
                                            var o = new XMLHttpRequest()
                                            o.open('get', s.href), o.send()
                                            var u = o.responseText.replace(/(\n|\r)/g, '')
                                            r(u)
                                        }
                                    }
                                } catch (a) {}
                                for (var f = document.getElementsByTagName('style'), i = 0; i < f.length; i++) {
                                    var l = f[i],
                                        c = l.innerHTML.replace(/(\n|\r)/g, '').trim()
                                    r(c)
                                }
                            }
                        },
                        !1
                    ))
        })(),
        n('../node_modules/handjs/hand.min', function () {}),
        (function (e) {
            n('p', [], function () {
                return function () {
                    return (
                        (function n(e, r, i) {
                            function s(u, a) {
                                if (!r[u]) {
                                    if (!e[u]) {
                                        var f = typeof t == 'function' && t
                                        if (!a && f) return f(u, !0)
                                        if (o) return o(u, !0)
                                        throw new Error("Cannot find module '" + u + "'")
                                    }
                                    var l = (r[u] = { exports: {} })
                                    e[u][0].call(
                                        l.exports,
                                        function (t) {
                                            var n = e[u][1][t]
                                            return s(n ? n : t)
                                        },
                                        l,
                                        l.exports,
                                        n,
                                        e,
                                        r,
                                        i
                                    )
                                }
                                return r[u].exports
                            }
                            var o = typeof t == 'function' && t
                            for (var u = 0; u < i.length; u++) s(i[u])
                            return s
                        })(
                            {
                                1: [
                                    function (e, t, n) {
                                        ;(function (n, r, i, s, o, u, a, f, l) {
                                            var c = e('./js/protoplast'),
                                                h = e('./js/aop'),
                                                p = e('./js/dispatcher'),
                                                d = e('./js/di'),
                                                v = e('./js/component'),
                                                m = e('./js/utils'),
                                                g = e('./js/constructors'),
                                                y = { extend: c.extend.bind(c), create: c.create.bind(c), Dispatcher: p, Aop: h, Context: d, Component: v, constructors: g, utils: m }
                                            ;(r.Protoplast = y), (t.exports = y)
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/fake_e1eb630e.js', '/')
                                    },
                                    { './js/aop': 2, './js/component': 3, './js/constructors': 4, './js/di': 5, './js/dispatcher': 6, './js/protoplast': 7, './js/utils': 8, 'IrXUsu': 12, 'buffer': 9 }
                                ],
                                2: [
                                    function (e, t, n) {
                                        ;(function (e, n, r, i, s, o, u, a, f) {
                                            function l(e, t, n) {
                                                var r = e[t]
                                                if (!e[t]) throw Error("Can't create aspect for method " + t + '. Method does not exist.')
                                                e[t] = function () {
                                                    n.before && n.before.apply(this, arguments)
                                                    var e = r.apply(this, arguments)
                                                    return n.after && (e = n.after.call(this, e, arguments)), e
                                                }
                                            }
                                            var c = function (e) {
                                                return {
                                                    aop: function (t, n) {
                                                        return (
                                                            t instanceof Array || (t = [t]),
                                                            t.forEach(function (t) {
                                                                l(e, t, n)
                                                            }, this),
                                                            this
                                                        )
                                                    }
                                                }
                                            }
                                            t.exports = c
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/aop.js', '/js')
                                    },
                                    { IrXUsu: 12, buffer: 9 }
                                ],
                                3: [
                                    function (e, t, n) {
                                        ;(function (n, r, i, s, o, u, a, f, l) {
                                            var c = e('./protoplast'),
                                                h = c.extend({
                                                    $create: function () {
                                                        ;(this._children = []), (this.root = document.createElement(this.tag || 'div'))
                                                    },
                                                    __fastinject__: {
                                                        get: function () {
                                                            return this.___fastinject___
                                                        },
                                                        set: function (e) {
                                                            ;(this.___fastinject___ = e),
                                                                this._children.forEach(function (e) {
                                                                    this.__fastinject__(e), (e.__fastinject__ = this.__fastinject__)
                                                                }, this)
                                                        }
                                                    },
                                                    init: { inject_init: !0, value: function () {} },
                                                    destroy: function () {
                                                        this._children.concat().forEach(function (e) {
                                                            this.remove(e)
                                                        }, this)
                                                    },
                                                    add: function (e) {
                                                        if (!e) throw new Error('Child component cannot be null')
                                                        if (!e.root) throw new Error('Child component should have root property')
                                                        this._children.push(e), this.__fastinject__ && this.__fastinject__(e), this.root.appendChild(e.root)
                                                    },
                                                    remove: function (e) {
                                                        var t = this._children.indexOf(e)
                                                        t !== -1 && (this._children.splice(t, 1), this.root.removeChild(e.root), e.destroy())
                                                    }
                                                })
                                            ;(h.Root = function (e, t) {
                                                var n = h.create()
                                                return (n.root = e), t && t.register(n), n
                                            }),
                                                (t.exports = h)
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/component.js', '/js')
                                    },
                                    { './protoplast': 7, 'IrXUsu': 12, 'buffer': 9 }
                                ],
                                4: [
                                    function (e, t, n) {
                                        ;(function (n, r, i, s, o, u, a, f, l) {
                                            var c = e('./utils'),
                                                h = {
                                                    uniqueId: function () {
                                                        this.$id = c.uniqueId(this.$meta.$prefix)
                                                    },
                                                    autobind: function () {
                                                        for (var e in this) typeof this[e] == 'function' && (this[e] = this[e].bind(this))
                                                    }
                                                }
                                            t.exports = h
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/constructors.js', '/js')
                                    },
                                    { './utils': 8, 'IrXUsu': 12, 'buffer': 9 }
                                ],
                                5: [
                                    function (e, t, n) {
                                        ;(function (n, r, i, s, o, u, a, f, l) {
                                            var c = e('./protoplast'),
                                                h = e('./dispatcher'),
                                                p = c.extend({
                                                    $create: function () {
                                                        var e = this
                                                        ;(this._objects = {
                                                            pub: function (t, n) {
                                                                e._dispatcher.dispatch(t, n)
                                                            },
                                                            sub: function (t) {
                                                                var n = this
                                                                return {
                                                                    add: function (r) {
                                                                        e._dispatcher.on(t, r, n)
                                                                    },
                                                                    remove: function (r) {
                                                                        e._dispatcher.off(t, r, n)
                                                                    }
                                                                }
                                                            }
                                                        }),
                                                            (this._unknows = []),
                                                            (this._dispatcher = h.create())
                                                    },
                                                    _objects: null,
                                                    register: function (e, t) {
                                                        arguments.length == 1 ? ((t = e), this._unknows.push(t)) : (this._objects[e] = t),
                                                            (t.__fastinject__ = function (e) {
                                                                this.register(e), this.process(e)
                                                            }.bind(this)),
                                                            t.$meta && t.$meta.inject && this.inject(t, t.$meta.inject)
                                                    },
                                                    process: function (e) {
                                                        e.$meta &&
                                                            e.$meta.inject_init &&
                                                            Object.keys(e.$meta.inject_init).forEach(function (t) {
                                                                e[t]()
                                                            }, this),
                                                            e.$meta &&
                                                                e.$meta.sub &&
                                                                Object.keys(e.$meta.sub).forEach(function (t) {
                                                                    this._objects.sub.call(e, e.$meta.sub[t]).add(e[t])
                                                                }, this)
                                                    },
                                                    inject: function (e, t) {
                                                        var n = this,
                                                            r
                                                        for (var i in t)
                                                            t.hasOwnProperty(i) &&
                                                                ((r = t[i]),
                                                                (function (t) {
                                                                    Object.defineProperty(e, i, {
                                                                        get: function () {
                                                                            return n._objects[t]
                                                                        }
                                                                    })
                                                                })(r))
                                                    },
                                                    build: function () {
                                                        Object.keys(this._objects).forEach(function (e) {
                                                            var t = this._objects[e]
                                                            this.process(t)
                                                        }, this),
                                                            this._unknows.forEach(function (e) {
                                                                this.process(e)
                                                            }, this)
                                                    }
                                                })
                                            t.exports = p
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/di.js', '/js')
                                    },
                                    { './dispatcher': 6, './protoplast': 7, 'IrXUsu': 12, 'buffer': 9 }
                                ],
                                6: [
                                    function (e, t, n) {
                                        ;(function (n, r, i, s, o, u, a, f, l) {
                                            var c = e('./protoplast'),
                                                h = c.extend({
                                                    dispatch: function (e, t) {
                                                        ;(this._topics = this._topics || {}),
                                                            (this._topics[e] || []).forEach(function (e) {
                                                                e.handler.call(e.context, t)
                                                            })
                                                    },
                                                    on: function (e, t, n) {
                                                        if (!t) throw new Error('Handler is required for event ' + e)
                                                        ;(this._topics = this._topics || {}), (this._topics[e] = this._topics[e] || []), this._topics[e].push({ handler: t, context: n })
                                                    },
                                                    off: function (e, t, n) {
                                                        ;(this._topics = this._topics || {}),
                                                            (this._topics[e] = this._topics[e].filter(function (e) {
                                                                return t ? e.handler !== t : e.context !== n
                                                            }))
                                                    }
                                                })
                                            t.exports = h
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/dispatcher.js', '/js')
                                    },
                                    { './protoplast': 7, 'IrXUsu': 12, 'buffer': 9 }
                                ],
                                7: [
                                    function (e, t, n) {
                                        ;(function (n, r, i, s, o, u, a, f, l) {
                                            var c = e('./utils'),
                                                h = {
                                                    $meta: {},
                                                    create: function () {
                                                        return c.createObject(this, arguments)
                                                    }
                                                }
                                            ;(h.extend = function (e, t) {
                                                var n = Object.create(this),
                                                    r,
                                                    i,
                                                    s
                                                e instanceof Array || ((t = e), (e = [])), (t = t || {}), (e = e || []), (r = t.$meta || {}), delete t.$meta, t.$create !== undefined && ((r.$constructors = r.$constructors || []), r.$constructors.push(t.$create), delete t.$create), (n = c.mixin(n, e))
                                                for (var o in t) {
                                                    s = !1
                                                    if (Object.prototype.toString.call(t[o]) !== '[object Object]') (s = !0), (i = { value: t[o], writable: !0, enumerable: !0 })
                                                    else {
                                                        i = t[o]
                                                        for (var u in i) ['value', 'get', 'set', 'writable', 'enumerable'].indexOf(u) === -1 ? ((r[u] = r[u] || {}), (r[u][o] = i[u]), delete i[u]) : (s = !0)
                                                    }
                                                    s && Object.defineProperty(n, o, i)
                                                }
                                                return (n.$meta = c.merge(r, this.$meta)), (n.$super = this), c.processPrototype(n), n
                                            }),
                                                (t.exports = h)
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/protoplast.js', '/js')
                                    },
                                    { './utils': 8, 'IrXUsu': 12, 'buffer': 9 }
                                ],
                                8: [
                                    function (e, t, n) {
                                        ;(function (e, n, r, i, s, o, u, a, f) {
                                            function c(e) {
                                                var t = ++l
                                                return (e || '') + t
                                            }
                                            function h(e, t) {
                                                var n = Object.create(e)
                                                return (
                                                    n.$meta.$constructors &&
                                                        n.$meta.$constructors.forEach(function (e) {
                                                            e.apply(n, t)
                                                        }),
                                                    n
                                                )
                                            }
                                            function p(e) {
                                                e.$meta.$processors &&
                                                    e.$meta.$processors.forEach(function (t) {
                                                        t(e)
                                                    })
                                            }
                                            function d(e, t) {
                                                for (var n in t) t.hasOwnProperty(n) && (t[n] instanceof Array ? (e[n] = t[n].concat(e[n] || [])) : ['number', 'boolean', 'string'].indexOf(typeof t[n]) !== -1 ? e.hasOwnProperty(n) || (e[n] = t[n]) : ((e[n] = e[n] || {}), d(e[n], t[n])))
                                                return e
                                            }
                                            function v(e, t) {
                                                for (var n in t) n.substr(0, 2) !== '__' && (e[n] = t[n])
                                                return e
                                            }
                                            function m(e, t) {
                                                return (
                                                    t.forEach(function (t) {
                                                        v(e, t)
                                                    }),
                                                    e
                                                )
                                            }
                                            var l = 0
                                            t.exports = { createObject: h, processPrototype: p, merge: d, mixin: m, uniqueId: c }
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/js/utils.js', '/js')
                                    },
                                    { IrXUsu: 12, buffer: 9 }
                                ],
                                9: [
                                    function (e, t, n) {
                                        ;(function (t, r, i, s, o, u, a, f, l) {
                                            function i(e, t, n) {
                                                if (this instanceof i) {
                                                    var r = typeof e
                                                    if (t === 'base64' && r === 'string') {
                                                        e = j(e)
                                                        while (e.length % 4 !== 0) e += '='
                                                    }
                                                    var s
                                                    if (r === 'number') s = q(e)
                                                    else if (r === 'string') s = i.byteLength(e, t)
                                                    else {
                                                        if (r !== 'object') throw new Error('First argument needs to be a number, array or string.')
                                                        s = q(e.length)
                                                    }
                                                    var o
                                                    i._useTypedArrays ? (o = i._augment(new Uint8Array(s))) : ((o = this), (o.length = s), (o._isBuffer = !0))
                                                    var u
                                                    if (i._useTypedArrays && typeof e.byteLength == 'number') o._set(e)
                                                    else if (U(e)) for (u = 0; u < s; u++) i.isBuffer(e) ? (o[u] = e.readUInt8(u)) : (o[u] = e[u])
                                                    else if (r === 'string') o.write(e, 0, t)
                                                    else if (r === 'number' && !i._useTypedArrays && !n) for (u = 0; u < s; u++) o[u] = 0
                                                    return o
                                                }
                                                return new i(e, t, n)
                                            }
                                            function p(e, t, n, r) {
                                                n = Number(n) || 0
                                                var s = e.length - n
                                                r ? ((r = Number(r)), r > s && (r = s)) : (r = s)
                                                var o = t.length
                                                Z(o % 2 === 0, 'Invalid hex string'), r > o / 2 && (r = o / 2)
                                                for (var u = 0; u < r; u++) {
                                                    var a = parseInt(t.substr(u * 2, 2), 16)
                                                    Z(!isNaN(a), 'Invalid hex string'), (e[n + u] = a)
                                                }
                                                return (i._charsWritten = u * 2), u
                                            }
                                            function d(e, t, n, r) {
                                                var s = (i._charsWritten = J(W(t), e, n, r))
                                                return s
                                            }
                                            function v(e, t, n, r) {
                                                var s = (i._charsWritten = J(X(t), e, n, r))
                                                return s
                                            }
                                            function m(e, t, n, r) {
                                                return v(e, t, n, r)
                                            }
                                            function g(e, t, n, r) {
                                                var s = (i._charsWritten = J($(t), e, n, r))
                                                return s
                                            }
                                            function y(e, t, n, r) {
                                                var s = (i._charsWritten = J(V(t), e, n, r))
                                                return s
                                            }
                                            function b(e, t, n) {
                                                return t === 0 && n === e.length ? c.fromByteArray(e) : c.fromByteArray(e.slice(t, n))
                                            }
                                            function w(e, t, n) {
                                                var r = '',
                                                    i = ''
                                                n = Math.min(e.length, n)
                                                for (var s = t; s < n; s++) e[s] <= 127 ? ((r += K(i) + String.fromCharCode(e[s])), (i = '')) : (i += '%' + e[s].toString(16))
                                                return r + K(i)
                                            }
                                            function E(e, t, n) {
                                                var r = ''
                                                n = Math.min(e.length, n)
                                                for (var i = t; i < n; i++) r += String.fromCharCode(e[i])
                                                return r
                                            }
                                            function S(e, t, n) {
                                                return E(e, t, n)
                                            }
                                            function x(e, t, n) {
                                                var r = e.length
                                                if (!t || t < 0) t = 0
                                                if (!n || n < 0 || n > r) n = r
                                                var i = ''
                                                for (var s = t; s < n; s++) i += z(e[s])
                                                return i
                                            }
                                            function T(e, t, n) {
                                                var r = e.slice(t, n),
                                                    i = ''
                                                for (var s = 0; s < r.length; s += 2) i += String.fromCharCode(r[s] + r[s + 1] * 256)
                                                return i
                                            }
                                            function N(e, t, n, r) {
                                                r || (Z(typeof n == 'boolean', 'missing or invalid endian'), Z(t !== undefined && t !== null, 'missing offset'), Z(t + 1 < e.length, 'Trying to read beyond buffer length'))
                                                var i = e.length
                                                if (t >= i) return
                                                var s
                                                return n ? ((s = e[t]), t + 1 < i && (s |= e[t + 1] << 8)) : ((s = e[t] << 8), t + 1 < i && (s |= e[t + 1])), s
                                            }
                                            function C(e, t, n, r) {
                                                r || (Z(typeof n == 'boolean', 'missing or invalid endian'), Z(t !== undefined && t !== null, 'missing offset'), Z(t + 3 < e.length, 'Trying to read beyond buffer length'))
                                                var i = e.length
                                                if (t >= i) return
                                                var s
                                                return n ? (t + 2 < i && (s = e[t + 2] << 16), t + 1 < i && (s |= e[t + 1] << 8), (s |= e[t]), t + 3 < i && (s += (e[t + 3] << 24) >>> 0)) : (t + 1 < i && (s = e[t + 1] << 16), t + 2 < i && (s |= e[t + 2] << 8), t + 3 < i && (s |= e[t + 3]), (s += (e[t] << 24) >>> 0)), s
                                            }
                                            function k(e, t, n, r) {
                                                r || (Z(typeof n == 'boolean', 'missing or invalid endian'), Z(t !== undefined && t !== null, 'missing offset'), Z(t + 1 < e.length, 'Trying to read beyond buffer length'))
                                                var i = e.length
                                                if (t >= i) return
                                                var s = N(e, t, n, !0),
                                                    o = s & 32768
                                                return o ? (65535 - s + 1) * -1 : s
                                            }
                                            function L(e, t, n, r) {
                                                r || (Z(typeof n == 'boolean', 'missing or invalid endian'), Z(t !== undefined && t !== null, 'missing offset'), Z(t + 3 < e.length, 'Trying to read beyond buffer length'))
                                                var i = e.length
                                                if (t >= i) return
                                                var s = C(e, t, n, !0),
                                                    o = s & 2147483648
                                                return o ? (4294967295 - s + 1) * -1 : s
                                            }
                                            function A(e, t, n, r) {
                                                return r || (Z(typeof n == 'boolean', 'missing or invalid endian'), Z(t + 3 < e.length, 'Trying to read beyond buffer length')), h.read(e, t, n, 23, 4)
                                            }
                                            function O(e, t, n, r) {
                                                return r || (Z(typeof n == 'boolean', 'missing or invalid endian'), Z(t + 7 < e.length, 'Trying to read beyond buffer length')), h.read(e, t, n, 52, 8)
                                            }
                                            function M(e, t, n, r, i) {
                                                i || (Z(t !== undefined && t !== null, 'missing value'), Z(typeof r == 'boolean', 'missing or invalid endian'), Z(n !== undefined && n !== null, 'missing offset'), Z(n + 1 < e.length, 'trying to write beyond buffer length'), Q(t, 65535))
                                                var s = e.length
                                                if (n >= s) return
                                                for (var o = 0, u = Math.min(s - n, 2); o < u; o++) e[n + o] = (t & (255 << (8 * (r ? o : 1 - o)))) >>> ((r ? o : 1 - o) * 8)
                                            }
                                            function _(e, t, n, r, i) {
                                                i || (Z(t !== undefined && t !== null, 'missing value'), Z(typeof r == 'boolean', 'missing or invalid endian'), Z(n !== undefined && n !== null, 'missing offset'), Z(n + 3 < e.length, 'trying to write beyond buffer length'), Q(t, 4294967295))
                                                var s = e.length
                                                if (n >= s) return
                                                for (var o = 0, u = Math.min(s - n, 4); o < u; o++) e[n + o] = (t >>> ((r ? o : 3 - o) * 8)) & 255
                                            }
                                            function D(e, t, n, r, i) {
                                                i || (Z(t !== undefined && t !== null, 'missing value'), Z(typeof r == 'boolean', 'missing or invalid endian'), Z(n !== undefined && n !== null, 'missing offset'), Z(n + 1 < e.length, 'Trying to write beyond buffer length'), G(t, 32767, -32768))
                                                var s = e.length
                                                if (n >= s) return
                                                t >= 0 ? M(e, t, n, r, i) : M(e, 65535 + t + 1, n, r, i)
                                            }
                                            function P(e, t, n, r, i) {
                                                i || (Z(t !== undefined && t !== null, 'missing value'), Z(typeof r == 'boolean', 'missing or invalid endian'), Z(n !== undefined && n !== null, 'missing offset'), Z(n + 3 < e.length, 'Trying to write beyond buffer length'), G(t, 2147483647, -2147483648))
                                                var s = e.length
                                                if (n >= s) return
                                                t >= 0 ? _(e, t, n, r, i) : _(e, 4294967295 + t + 1, n, r, i)
                                            }
                                            function H(e, t, n, r, i) {
                                                i || (Z(t !== undefined && t !== null, 'missing value'), Z(typeof r == 'boolean', 'missing or invalid endian'), Z(n !== undefined && n !== null, 'missing offset'), Z(n + 3 < e.length, 'Trying to write beyond buffer length'), Y(t, 3.4028234663852886e38, -3.4028234663852886e38))
                                                var s = e.length
                                                if (n >= s) return
                                                h.write(e, t, n, r, 23, 4)
                                            }
                                            function B(e, t, n, r, i) {
                                                i || (Z(t !== undefined && t !== null, 'missing value'), Z(typeof r == 'boolean', 'missing or invalid endian'), Z(n !== undefined && n !== null, 'missing offset'), Z(n + 7 < e.length, 'Trying to write beyond buffer length'), Y(t, 1.7976931348623157e308, -1.7976931348623157e308))
                                                var s = e.length
                                                if (n >= s) return
                                                h.write(e, t, n, r, 52, 8)
                                            }
                                            function j(e) {
                                                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '')
                                            }
                                            function I(e, t, n) {
                                                return typeof e != 'number' ? n : ((e = ~~e), e >= t ? t : e >= 0 ? e : ((e += t), e >= 0 ? e : 0))
                                            }
                                            function q(e) {
                                                return (e = ~~Math.ceil(+e)), e < 0 ? 0 : e
                                            }
                                            function R(e) {
                                                return (
                                                    Array.isArray ||
                                                    function (e) {
                                                        return Object.prototype.toString.call(e) === '[object Array]'
                                                    }
                                                )(e)
                                            }
                                            function U(e) {
                                                return R(e) || i.isBuffer(e) || (e && typeof e == 'object' && typeof e.length == 'number')
                                            }
                                            function z(e) {
                                                return e < 16 ? '0' + e.toString(16) : e.toString(16)
                                            }
                                            function W(e) {
                                                var t = []
                                                for (var n = 0; n < e.length; n++) {
                                                    var r = e.charCodeAt(n)
                                                    if (r <= 127) t.push(e.charCodeAt(n))
                                                    else {
                                                        var i = n
                                                        r >= 55296 && r <= 57343 && n++
                                                        var s = encodeURIComponent(e.slice(i, n + 1))
                                                            .substr(1)
                                                            .split('%')
                                                        for (var o = 0; o < s.length; o++) t.push(parseInt(s[o], 16))
                                                    }
                                                }
                                                return t
                                            }
                                            function X(e) {
                                                var t = []
                                                for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n) & 255)
                                                return t
                                            }
                                            function V(e) {
                                                var t,
                                                    n,
                                                    r,
                                                    i = []
                                                for (var s = 0; s < e.length; s++) (t = e.charCodeAt(s)), (n = t >> 8), (r = t % 256), i.push(r), i.push(n)
                                                return i
                                            }
                                            function $(e) {
                                                return c.toByteArray(e)
                                            }
                                            function J(e, t, n, r) {
                                                var i
                                                for (var s = 0; s < r; s++) {
                                                    if (s + n >= t.length || s >= e.length) break
                                                    t[s + n] = e[s]
                                                }
                                                return s
                                            }
                                            function K(e) {
                                                try {
                                                    return decodeURIComponent(e)
                                                } catch (t) {
                                                    return String.fromCharCode(65533)
                                                }
                                            }
                                            function Q(e, t) {
                                                Z(typeof e == 'number', 'cannot write a non-number as a number'), Z(e >= 0, 'specified a negative value for writing an unsigned value'), Z(e <= t, 'value is larger than maximum value for type'), Z(Math.floor(e) === e, 'value has a fractional component')
                                            }
                                            function G(e, t, n) {
                                                Z(typeof e == 'number', 'cannot write a non-number as a number'), Z(e <= t, 'value larger than maximum allowed value'), Z(e >= n, 'value smaller than minimum allowed value'), Z(Math.floor(e) === e, 'value has a fractional component')
                                            }
                                            function Y(e, t, n) {
                                                Z(typeof e == 'number', 'cannot write a non-number as a number'), Z(e <= t, 'value larger than maximum allowed value'), Z(e >= n, 'value smaller than minimum allowed value')
                                            }
                                            function Z(e, t) {
                                                if (!e) throw new Error(t || 'Failed assertion')
                                            }
                                            var c = e('base64-js'),
                                                h = e('ieee754')
                                            ;(n.Buffer = i),
                                                (n.SlowBuffer = i),
                                                (n.INSPECT_MAX_BYTES = 50),
                                                (i.poolSize = 8192),
                                                (i._useTypedArrays = (function () {
                                                    try {
                                                        var e = new ArrayBuffer(0),
                                                            t = new Uint8Array(e)
                                                        return (
                                                            (t.foo = function () {
                                                                return 42
                                                            }),
                                                            42 === t.foo() && typeof t.subarray == 'function'
                                                        )
                                                    } catch (n) {
                                                        return !1
                                                    }
                                                })()),
                                                (i.isEncoding = function (e) {
                                                    switch (String(e).toLowerCase()) {
                                                        case 'hex':
                                                        case 'utf8':
                                                        case 'utf-8':
                                                        case 'ascii':
                                                        case 'binary':
                                                        case 'base64':
                                                        case 'raw':
                                                        case 'ucs2':
                                                        case 'ucs-2':
                                                        case 'utf16le':
                                                        case 'utf-16le':
                                                            return !0
                                                        default:
                                                            return !1
                                                    }
                                                }),
                                                (i.isBuffer = function (e) {
                                                    return e !== null && e !== undefined && !!e._isBuffer
                                                }),
                                                (i.byteLength = function (e, t) {
                                                    var n
                                                    e += ''
                                                    switch (t || 'utf8') {
                                                        case 'hex':
                                                            n = e.length / 2
                                                            break
                                                        case 'utf8':
                                                        case 'utf-8':
                                                            n = W(e).length
                                                            break
                                                        case 'ascii':
                                                        case 'binary':
                                                        case 'raw':
                                                            n = e.length
                                                            break
                                                        case 'base64':
                                                            n = $(e).length
                                                            break
                                                        case 'ucs2':
                                                        case 'ucs-2':
                                                        case 'utf16le':
                                                        case 'utf-16le':
                                                            n = e.length * 2
                                                            break
                                                        default:
                                                            throw new Error('Unknown encoding')
                                                    }
                                                    return n
                                                }),
                                                (i.concat = function (e, t) {
                                                    Z(R(e), 'Usage: Buffer.concat(list, [totalLength])\nlist should be an Array.')
                                                    if (e.length === 0) return new i(0)
                                                    if (e.length === 1) return e[0]
                                                    var n
                                                    if (typeof t != 'number') {
                                                        t = 0
                                                        for (n = 0; n < e.length; n++) t += e[n].length
                                                    }
                                                    var r = new i(t),
                                                        s = 0
                                                    for (n = 0; n < e.length; n++) {
                                                        var o = e[n]
                                                        o.copy(r, s), (s += o.length)
                                                    }
                                                    return r
                                                }),
                                                (i.prototype.write = function (e, t, n, r) {
                                                    if (isFinite(t)) isFinite(n) || ((r = n), (n = undefined))
                                                    else {
                                                        var i = r
                                                        ;(r = t), (t = n), (n = i)
                                                    }
                                                    t = Number(t) || 0
                                                    var s = this.length - t
                                                    n ? ((n = Number(n)), n > s && (n = s)) : (n = s), (r = String(r || 'utf8').toLowerCase())
                                                    var o
                                                    switch (r) {
                                                        case 'hex':
                                                            o = p(this, e, t, n)
                                                            break
                                                        case 'utf8':
                                                        case 'utf-8':
                                                            o = d(this, e, t, n)
                                                            break
                                                        case 'ascii':
                                                            o = v(this, e, t, n)
                                                            break
                                                        case 'binary':
                                                            o = m(this, e, t, n)
                                                            break
                                                        case 'base64':
                                                            o = g(this, e, t, n)
                                                            break
                                                        case 'ucs2':
                                                        case 'ucs-2':
                                                        case 'utf16le':
                                                        case 'utf-16le':
                                                            o = y(this, e, t, n)
                                                            break
                                                        default:
                                                            throw new Error('Unknown encoding')
                                                    }
                                                    return o
                                                }),
                                                (i.prototype.toString = function (e, t, n) {
                                                    var r = this
                                                    ;(e = String(e || 'utf8').toLowerCase()), (t = Number(t) || 0), (n = n !== undefined ? Number(n) : (n = r.length))
                                                    if (n === t) return ''
                                                    var i
                                                    switch (e) {
                                                        case 'hex':
                                                            i = x(r, t, n)
                                                            break
                                                        case 'utf8':
                                                        case 'utf-8':
                                                            i = w(r, t, n)
                                                            break
                                                        case 'ascii':
                                                            i = E(r, t, n)
                                                            break
                                                        case 'binary':
                                                            i = S(r, t, n)
                                                            break
                                                        case 'base64':
                                                            i = b(r, t, n)
                                                            break
                                                        case 'ucs2':
                                                        case 'ucs-2':
                                                        case 'utf16le':
                                                        case 'utf-16le':
                                                            i = T(r, t, n)
                                                            break
                                                        default:
                                                            throw new Error('Unknown encoding')
                                                    }
                                                    return i
                                                }),
                                                (i.prototype.toJSON = function () {
                                                    return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
                                                }),
                                                (i.prototype.copy = function (e, t, n, r) {
                                                    var s = this
                                                    n || (n = 0), !r && r !== 0 && (r = this.length), t || (t = 0)
                                                    if (r === n) return
                                                    if (e.length === 0 || s.length === 0) return
                                                    Z(r >= n, 'sourceEnd < sourceStart'), Z(t >= 0 && t < e.length, 'targetStart out of bounds'), Z(n >= 0 && n < s.length, 'sourceStart out of bounds'), Z(r >= 0 && r <= s.length, 'sourceEnd out of bounds'), r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n)
                                                    var o = r - n
                                                    if (o < 100 || !i._useTypedArrays) for (var u = 0; u < o; u++) e[u + t] = this[u + n]
                                                    else e._set(this.subarray(n, n + o), t)
                                                }),
                                                (i.prototype.slice = function (e, t) {
                                                    var n = this.length
                                                    ;(e = I(e, n, 0)), (t = I(t, n, n))
                                                    if (i._useTypedArrays) return i._augment(this.subarray(e, t))
                                                    var r = t - e,
                                                        s = new i(r, undefined, !0)
                                                    for (var o = 0; o < r; o++) s[o] = this[o + e]
                                                    return s
                                                }),
                                                (i.prototype.get = function (e) {
                                                    return console.log('.get() is deprecated. Access using array indexes instead.'), this.readUInt8(e)
                                                }),
                                                (i.prototype.set = function (e, t) {
                                                    return console.log('.set() is deprecated. Access using array indexes instead.'), this.writeUInt8(e, t)
                                                }),
                                                (i.prototype.readUInt8 = function (e, t) {
                                                    t || (Z(e !== undefined && e !== null, 'missing offset'), Z(e < this.length, 'Trying to read beyond buffer length'))
                                                    if (e >= this.length) return
                                                    return this[e]
                                                }),
                                                (i.prototype.readUInt16LE = function (e, t) {
                                                    return N(this, e, !0, t)
                                                }),
                                                (i.prototype.readUInt16BE = function (e, t) {
                                                    return N(this, e, !1, t)
                                                }),
                                                (i.prototype.readUInt32LE = function (e, t) {
                                                    return C(this, e, !0, t)
                                                }),
                                                (i.prototype.readUInt32BE = function (e, t) {
                                                    return C(this, e, !1, t)
                                                }),
                                                (i.prototype.readInt8 = function (e, t) {
                                                    t || (Z(e !== undefined && e !== null, 'missing offset'), Z(e < this.length, 'Trying to read beyond buffer length'))
                                                    if (e >= this.length) return
                                                    var n = this[e] & 128
                                                    return n ? (255 - this[e] + 1) * -1 : this[e]
                                                }),
                                                (i.prototype.readInt16LE = function (e, t) {
                                                    return k(this, e, !0, t)
                                                }),
                                                (i.prototype.readInt16BE = function (e, t) {
                                                    return k(this, e, !1, t)
                                                }),
                                                (i.prototype.readInt32LE = function (e, t) {
                                                    return L(this, e, !0, t)
                                                }),
                                                (i.prototype.readInt32BE = function (e, t) {
                                                    return L(this, e, !1, t)
                                                }),
                                                (i.prototype.readFloatLE = function (e, t) {
                                                    return A(this, e, !0, t)
                                                }),
                                                (i.prototype.readFloatBE = function (e, t) {
                                                    return A(this, e, !1, t)
                                                }),
                                                (i.prototype.readDoubleLE = function (e, t) {
                                                    return O(this, e, !0, t)
                                                }),
                                                (i.prototype.readDoubleBE = function (e, t) {
                                                    return O(this, e, !1, t)
                                                }),
                                                (i.prototype.writeUInt8 = function (e, t, n) {
                                                    n || (Z(e !== undefined && e !== null, 'missing value'), Z(t !== undefined && t !== null, 'missing offset'), Z(t < this.length, 'trying to write beyond buffer length'), Q(e, 255))
                                                    if (t >= this.length) return
                                                    this[t] = e
                                                }),
                                                (i.prototype.writeUInt16LE = function (e, t, n) {
                                                    M(this, e, t, !0, n)
                                                }),
                                                (i.prototype.writeUInt16BE = function (e, t, n) {
                                                    M(this, e, t, !1, n)
                                                }),
                                                (i.prototype.writeUInt32LE = function (e, t, n) {
                                                    _(this, e, t, !0, n)
                                                }),
                                                (i.prototype.writeUInt32BE = function (e, t, n) {
                                                    _(this, e, t, !1, n)
                                                }),
                                                (i.prototype.writeInt8 = function (e, t, n) {
                                                    n || (Z(e !== undefined && e !== null, 'missing value'), Z(t !== undefined && t !== null, 'missing offset'), Z(t < this.length, 'Trying to write beyond buffer length'), G(e, 127, -128))
                                                    if (t >= this.length) return
                                                    e >= 0 ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n)
                                                }),
                                                (i.prototype.writeInt16LE = function (e, t, n) {
                                                    D(this, e, t, !0, n)
                                                }),
                                                (i.prototype.writeInt16BE = function (e, t, n) {
                                                    D(this, e, t, !1, n)
                                                }),
                                                (i.prototype.writeInt32LE = function (e, t, n) {
                                                    P(this, e, t, !0, n)
                                                }),
                                                (i.prototype.writeInt32BE = function (e, t, n) {
                                                    P(this, e, t, !1, n)
                                                }),
                                                (i.prototype.writeFloatLE = function (e, t, n) {
                                                    H(this, e, t, !0, n)
                                                }),
                                                (i.prototype.writeFloatBE = function (e, t, n) {
                                                    H(this, e, t, !1, n)
                                                }),
                                                (i.prototype.writeDoubleLE = function (e, t, n) {
                                                    B(this, e, t, !0, n)
                                                }),
                                                (i.prototype.writeDoubleBE = function (e, t, n) {
                                                    B(this, e, t, !1, n)
                                                }),
                                                (i.prototype.fill = function (e, t, n) {
                                                    e || (e = 0), t || (t = 0), n || (n = this.length), typeof e == 'string' && (e = e.charCodeAt(0)), Z(typeof e == 'number' && !isNaN(e), 'value is not a number'), Z(n >= t, 'end < start')
                                                    if (n === t) return
                                                    if (this.length === 0) return
                                                    Z(t >= 0 && t < this.length, 'start out of bounds'), Z(n >= 0 && n <= this.length, 'end out of bounds')
                                                    for (var r = t; r < n; r++) this[r] = e
                                                }),
                                                (i.prototype.inspect = function () {
                                                    var e = [],
                                                        t = this.length
                                                    for (var r = 0; r < t; r++) {
                                                        e[r] = z(this[r])
                                                        if (r === n.INSPECT_MAX_BYTES) {
                                                            e[r + 1] = '...'
                                                            break
                                                        }
                                                    }
                                                    return '<Buffer ' + e.join(' ') + '>'
                                                }),
                                                (i.prototype.toArrayBuffer = function () {
                                                    if (typeof Uint8Array != 'undefined') {
                                                        if (i._useTypedArrays) return new i(this).buffer
                                                        var e = new Uint8Array(this.length)
                                                        for (var t = 0, n = e.length; t < n; t += 1) e[t] = this[t]
                                                        return e.buffer
                                                    }
                                                    throw new Error('Buffer.toArrayBuffer not supported in this browser')
                                                })
                                            var F = i.prototype
                                            i._augment = function (e) {
                                                return (
                                                    (e._isBuffer = !0),
                                                    (e._get = e.get),
                                                    (e._set = e.set),
                                                    (e.get = F.get),
                                                    (e.set = F.set),
                                                    (e.write = F.write),
                                                    (e.toString = F.toString),
                                                    (e.toLocaleString = F.toString),
                                                    (e.toJSON = F.toJSON),
                                                    (e.copy = F.copy),
                                                    (e.slice = F.slice),
                                                    (e.readUInt8 = F.readUInt8),
                                                    (e.readUInt16LE = F.readUInt16LE),
                                                    (e.readUInt16BE = F.readUInt16BE),
                                                    (e.readUInt32LE = F.readUInt32LE),
                                                    (e.readUInt32BE = F.readUInt32BE),
                                                    (e.readInt8 = F.readInt8),
                                                    (e.readInt16LE = F.readInt16LE),
                                                    (e.readInt16BE = F.readInt16BE),
                                                    (e.readInt32LE = F.readInt32LE),
                                                    (e.readInt32BE = F.readInt32BE),
                                                    (e.readFloatLE = F.readFloatLE),
                                                    (e.readFloatBE = F.readFloatBE),
                                                    (e.readDoubleLE = F.readDoubleLE),
                                                    (e.readDoubleBE = F.readDoubleBE),
                                                    (e.writeUInt8 = F.writeUInt8),
                                                    (e.writeUInt16LE = F.writeUInt16LE),
                                                    (e.writeUInt16BE = F.writeUInt16BE),
                                                    (e.writeUInt32LE = F.writeUInt32LE),
                                                    (e.writeUInt32BE = F.writeUInt32BE),
                                                    (e.writeInt8 = F.writeInt8),
                                                    (e.writeInt16LE = F.writeInt16LE),
                                                    (e.writeInt16BE = F.writeInt16BE),
                                                    (e.writeInt32LE = F.writeInt32LE),
                                                    (e.writeInt32BE = F.writeInt32BE),
                                                    (e.writeFloatLE = F.writeFloatLE),
                                                    (e.writeFloatBE = F.writeFloatBE),
                                                    (e.writeDoubleLE = F.writeDoubleLE),
                                                    (e.writeDoubleBE = F.writeDoubleBE),
                                                    (e.fill = F.fill),
                                                    (e.inspect = F.inspect),
                                                    (e.toArrayBuffer = F.toArrayBuffer),
                                                    e
                                                )
                                            }
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js', '/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer')
                                    },
                                    { 'IrXUsu': 12, 'base64-js': 10, 'buffer': 9, 'ieee754': 11 }
                                ],
                                10: [
                                    function (e, t, n) {
                                        ;(function (e, t, r, i, s, o, u, a, f) {
                                            var l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
                                            ;(function (e) {
                                                'use strict'
                                                function f(e) {
                                                    var t = e.charCodeAt(0)
                                                    if (t === n || t === u) return 62
                                                    if (t === r || t === a) return 63
                                                    if (t < i) return -1
                                                    if (t < i + 10) return t - i + 26 + 26
                                                    if (t < o + 26) return t - o
                                                    if (t < s + 26) return t - s + 26
                                                }
                                                function c(e) {
                                                    function c(e) {
                                                        u[l++] = e
                                                    }
                                                    var n, r, i, s, o, u
                                                    if (e.length % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
                                                    var a = e.length
                                                    ;(o = '=' === e.charAt(a - 2) ? 2 : '=' === e.charAt(a - 1) ? 1 : 0), (u = new t((e.length * 3) / 4 - o)), (i = o > 0 ? e.length - 4 : e.length)
                                                    var l = 0
                                                    for (n = 0, r = 0; n < i; n += 4, r += 3) (s = (f(e.charAt(n)) << 18) | (f(e.charAt(n + 1)) << 12) | (f(e.charAt(n + 2)) << 6) | f(e.charAt(n + 3))), c((s & 16711680) >> 16), c((s & 65280) >> 8), c(s & 255)
                                                    return o === 2 ? ((s = (f(e.charAt(n)) << 2) | (f(e.charAt(n + 1)) >> 4)), c(s & 255)) : o === 1 && ((s = (f(e.charAt(n)) << 10) | (f(e.charAt(n + 1)) << 4) | (f(e.charAt(n + 2)) >> 2)), c((s >> 8) & 255), c(s & 255)), u
                                                }
                                                function h(e) {
                                                    function o(e) {
                                                        return l.charAt(e)
                                                    }
                                                    function u(e) {
                                                        return o((e >> 18) & 63) + o((e >> 12) & 63) + o((e >> 6) & 63) + o(e & 63)
                                                    }
                                                    var t,
                                                        n = e.length % 3,
                                                        r = '',
                                                        i,
                                                        s
                                                    for (t = 0, s = e.length - n; t < s; t += 3) (i = (e[t] << 16) + (e[t + 1] << 8) + e[t + 2]), (r += u(i))
                                                    switch (n) {
                                                        case 1:
                                                            ;(i = e[e.length - 1]), (r += o(i >> 2)), (r += o((i << 4) & 63)), (r += '==')
                                                            break
                                                        case 2:
                                                            ;(i = (e[e.length - 2] << 8) + e[e.length - 1]), (r += o(i >> 10)), (r += o((i >> 4) & 63)), (r += o((i << 2) & 63)), (r += '=')
                                                    }
                                                    return r
                                                }
                                                var t = typeof Uint8Array != 'undefined' ? Uint8Array : Array,
                                                    n = '+'.charCodeAt(0),
                                                    r = '/'.charCodeAt(0),
                                                    i = '0'.charCodeAt(0),
                                                    s = 'a'.charCodeAt(0),
                                                    o = 'A'.charCodeAt(0),
                                                    u = '-'.charCodeAt(0),
                                                    a = '_'.charCodeAt(0)
                                                ;(e.toByteArray = c), (e.fromByteArray = h)
                                            })(typeof n == 'undefined' ? (this.base64js = {}) : n)
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js', '/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib')
                                    },
                                    { IrXUsu: 12, buffer: 9 }
                                ],
                                11: [
                                    function (e, t, n) {
                                        ;(function (e, t, r, i, s, o, u, a, f) {
                                            ;(n.read = function (e, t, n, r, i) {
                                                var s,
                                                    o,
                                                    u = i * 8 - r - 1,
                                                    a = (1 << u) - 1,
                                                    f = a >> 1,
                                                    l = -7,
                                                    c = n ? i - 1 : 0,
                                                    h = n ? -1 : 1,
                                                    p = e[t + c]
                                                ;(c += h), (s = p & ((1 << -l) - 1)), (p >>= -l), (l += u)
                                                for (; l > 0; s = s * 256 + e[t + c], c += h, l -= 8);
                                                ;(o = s & ((1 << -l) - 1)), (s >>= -l), (l += r)
                                                for (; l > 0; o = o * 256 + e[t + c], c += h, l -= 8);
                                                if (s === 0) s = 1 - f
                                                else {
                                                    if (s === a) return o ? NaN : (p ? -1 : 1) * Infinity
                                                    ;(o += Math.pow(2, r)), (s -= f)
                                                }
                                                return (p ? -1 : 1) * o * Math.pow(2, s - r)
                                            }),
                                                (n.write = function (e, t, n, r, i, s) {
                                                    var o,
                                                        u,
                                                        a,
                                                        f = s * 8 - i - 1,
                                                        l = (1 << f) - 1,
                                                        c = l >> 1,
                                                        h = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                                                        p = r ? 0 : s - 1,
                                                        d = r ? 1 : -1,
                                                        v = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0
                                                    ;(t = Math.abs(t)), isNaN(t) || t === Infinity ? ((u = isNaN(t) ? 1 : 0), (o = l)) : ((o = Math.floor(Math.log(t) / Math.LN2)), t * (a = Math.pow(2, -o)) < 1 && (o--, (a *= 2)), o + c >= 1 ? (t += h / a) : (t += h * Math.pow(2, 1 - c)), t * a >= 2 && (o++, (a /= 2)), o + c >= l ? ((u = 0), (o = l)) : o + c >= 1 ? ((u = (t * a - 1) * Math.pow(2, i)), (o += c)) : ((u = t * Math.pow(2, c - 1) * Math.pow(2, i)), (o = 0)))
                                                    for (; i >= 8; e[n + p] = u & 255, p += d, u /= 256, i -= 8);
                                                    ;(o = (o << i) | u), (f += i)
                                                    for (; f > 0; e[n + p] = o & 255, p += d, o /= 256, f -= 8);
                                                    e[n + p - d] |= v * 128
                                                })
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js', '/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754')
                                    },
                                    { IrXUsu: 12, buffer: 9 }
                                ],
                                12: [
                                    function (e, t, n) {
                                        ;(function (e, n, r, i, s, o, u, a, f) {
                                            function l() {}
                                            var e = (t.exports = {})
                                            ;(e.nextTick = (function () {
                                                var e = typeof window != 'undefined' && window.setImmediate,
                                                    t = typeof window != 'undefined' && window.postMessage && window.addEventListener
                                                if (e)
                                                    return function (e) {
                                                        return window.setImmediate(e)
                                                    }
                                                if (t) {
                                                    var n = []
                                                    return (
                                                        window.addEventListener(
                                                            'message',
                                                            function (e) {
                                                                var t = e.source
                                                                if ((t === window || t === null) && e.data === 'process-tick') {
                                                                    e.stopPropagation()
                                                                    if (n.length > 0) {
                                                                        var r = n.shift()
                                                                        r()
                                                                    }
                                                                }
                                                            },
                                                            !0
                                                        ),
                                                        function (t) {
                                                            n.push(t), window.postMessage('process-tick', '*')
                                                        }
                                                    )
                                                }
                                                return function (t) {
                                                    setTimeout(t, 0)
                                                }
                                            })()),
                                                (e.title = 'browser'),
                                                (e.browser = !0),
                                                (e.env = {}),
                                                (e.argv = []),
                                                (e.on = l),
                                                (e.addListener = l),
                                                (e.once = l),
                                                (e.off = l),
                                                (e.removeListener = l),
                                                (e.removeAllListeners = l),
                                                (e.emit = l),
                                                (e.binding = function (e) {
                                                    throw new Error('process.binding is not supported')
                                                }),
                                                (e.cwd = function () {
                                                    return '/'
                                                }),
                                                (e.chdir = function (e) {
                                                    throw new Error('process.chdir is not supported')
                                                })
                                        }).call(this, e('IrXUsu'), typeof self != 'undefined' ? self : typeof window != 'undefined' ? window : {}, e('buffer').Buffer, arguments[3], arguments[4], arguments[5], arguments[6], '/node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js', '/node_modules/gulp-browserify/node_modules/browserify/node_modules/process')
                                    },
                                    { IrXUsu: 12, buffer: 9 }
                                ]
                            },
                            {},
                            [1]
                        ),
                        (e.Protoplast = Protoplast)
                    )
                }.apply(e, arguments)
            })
        })(this),
        n('model/recognition-data', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    allMatches: null,
                    bestMatch: null,
                    $create: function (e) {
                        ;(this.allMatches = e),
                            (this.bestMatch = null),
                            e.forEach(function (e) {
                                this.bestMatch != null ? (this.bestMatch = e.value > this.bestMatch.value ? e : this.bestMatch) : (this.bestMatch = e)
                            }, this)
                    }
                })
            return n
        }),
        n('../js/recogniser/default-recogniser', ['require', 'p', 'model/recognition-data'], function (e) {
            var t = e('p'),
                n = e('model/recognition-data'),
                r = t.extend([t.Dispatcher], {
                    _sampler: null,
                    patterns: null,
                    sampler: {
                        set: function (e) {
                            this._sampler !== null && this._removeSampler(), (this._sampler = e), this._initSampler()
                        }
                    },
                    $create: function () {
                        this._clear()
                    },
                    register: function (e) {
                        if (this.patterns[e.name]) throw new Error('Pattern with name ' + e.name + ' is already registered!')
                        this.patterns[e.name] = e
                    },
                    _initSampler: function () {
                        ;(this.__onSamplingFinished = this._onSamplingFinished.bind(this)), this._sampler.on('finished', this.__onSamplingFinished)
                    },
                    _removeSampler: function () {
                        this._sampler.off('finished', this.__onSamplingFinished), (this._sampler = null)
                    },
                    _onSamplingFinished: function (e) {
                        this.dispatch('recognised', this._recognise(e))
                    },
                    _recognise: function (e) {
                        var t = []
                        for (var r in this.patterns) t.push(this.patterns[r].algorithm.match(this.patterns[r], e))
                        return n.create(t)
                    },
                    _clear: function () {
                        this.patterns = {}
                    }
                })
            return r
        }),
        n('../js/model/directions', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({ UP: 1, RIGHT_UP: 2, RIGHT: 3, RIGHT_DOWN: 4, DOWN: 5, LEFT_DOWN: 6, LEFT: 7, LEFT_UP: 8, NO_MOVE: 0 })
            return n
        }),
        n('../js/model/match', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    value: null,
                    pattern: null,
                    recognised: !1,
                    $create: function (e, t, n) {
                        ;(this.pattern = e), (this.value = t), (this.recognised = n)
                    }
                })
            return n
        }),
        n('model/directions', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({ UP: 1, RIGHT_UP: 2, RIGHT: 3, RIGHT_DOWN: 4, DOWN: 5, LEFT_DOWN: 6, LEFT: 7, LEFT_UP: 8, NO_MOVE: 0 })
            return n
        }),
        n('util/math', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    distance: function (e, t) {
                        var n = e.x - t.x,
                            r = e.y - t.y
                        return Math.sqrt(n * n + r * r)
                    },
                    threePointsAngle: function (e, t, n) {
                        var r = e.subtract(t),
                            i = n.subtract(t),
                            s = r.x * i.x + r.y * i.y,
                            o = s / (r.length * i.length)
                        return Math.acos(o)
                    }
                })
            return n
        }),
        n('model/point', ['require', 'p', 'util/math'], function (e) {
            var t = e('p'),
                n = e('util/math'),
                r = t.extend({
                    x: null,
                    y: null,
                    $create: function (e, t) {
                        ;(this.x = e), (this.y = t)
                    },
                    subtract: function (e) {
                        return r.create(this.x - e.x, this.y - e.y)
                    },
                    length: {
                        get: function () {
                            return n.distance(this, r.create(0, 0))
                        }
                    },
                    toString: function () {
                        return '(' + this.x + ',' + this.y + ')'
                    }
                })
            return r
        }),
        n('util/direction', ['require', 'p', 'model/directions', 'model/point'], function (e) {
            var t = e('p'),
                n = e('model/directions'),
                r = e('model/point'),
                i = t.extend({
                    twoPointsDirection: function (e, t) {
                        var i = t.subtract(e)
                        if (e.x === t.x && e.y === t.y) return 0
                        var s = r.create(0, -1),
                            o = i.x * s.x + i.y * s.y,
                            u = o / (i.length * s.length),
                            a = this._eight(Math.acos(u))
                        if (i.x < 0)
                            switch (a) {
                                case 0:
                                    return n.UP
                                case 1:
                                case 2:
                                    return n.LEFT_UP
                                case 3:
                                case 4:
                                    return n.LEFT
                                case 5:
                                case 6:
                                    return n.LEFT_DOWN
                                case 7:
                                    return n.DOWN
                            }
                        else
                            switch (a) {
                                case 0:
                                    return n.UP
                                case 1:
                                case 2:
                                    return n.RIGHT_UP
                                case 3:
                                case 4:
                                    return n.RIGHT
                                case 5:
                                case 6:
                                    return n.RIGHT_DOWN
                                case 7:
                                    return n.DOWN
                            }
                    },
                    PI8: Math.PI / 8,
                    _eight: function (e) {
                        var t = e / this.PI8
                        return t === 8 ? 7 : Math.floor(t)
                    }
                })
            return i
        }),
        n('algorithm/moses-fit', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    _reducedPatternData: null,
                    _reducedSamplingData: null,
                    $create: function (e, t) {
                        this._mosesFit(e, t)
                    },
                    getReducedPatternData: function () {
                        return this._reducedPatternData
                    },
                    getReducedSamplingData: function () {
                        return this._reducedSamplingData
                    },
                    _mosesFit: function (e, t) {
                        var n
                        e.length >= t.length ? ((n = (e.length - 1) / (t.length - 1)), (this._reducedPatternData = this._reduceList(e, n == Infinity ? (n = t.length) : n)), (this._reducedSamplingData = t)) : ((n = (t.length - 1) / (e.length - 1)), (this._reducedPatternData = e), (this._reducedSamplingData = this._reduceList(t, n == Infinity ? (n = e.length) : n)))
                    },
                    _reduceList: function (e, t) {
                        var n = [],
                            r = 0,
                            i = 0
                        while (i < e.length - 1) n.push(e[i]), (r += t), (i = Math.round(r))
                        return n.push(e[e.length - 1]), n
                    }
                })
            return n
        }),
        n('model/match', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    value: null,
                    pattern: null,
                    recognised: !1,
                    $create: function (e, t, n) {
                        ;(this.pattern = e), (this.value = t), (this.recognised = n)
                    }
                })
            return n
        }),
        n('algorithm/default-moses-algorithm', ['require', 'p', 'util/direction', 'algorithm/moses-fit', 'model/match'], function (e) {
            var t = e('p'),
                n = e('util/direction'),
                r = e('algorithm/moses-fit'),
                i = e('model/match'),
                s = t.extend({
                    _threshold: null,
                    _minSamplerPoints: null,
                    $create: function (e, t) {
                        ;(this._threshold = e || 0.5), (this._minSamplerPoints = t || 5)
                    },
                    match: function (e, t) {
                        var n = this._matchingValue(e.data, t),
                            r = n >= this._threshold && t.length >= this._minSamplerPoints
                        return i.create(e, n, r)
                    },
                    _matchingValue: function (e, t) {
                        var n = r.create(e.slice(), t.slice()),
                            i = this._preparePatternData(n.getReducedPatternData()),
                            s = this._prepareSamplingData(n.getReducedSamplingData()),
                            o = this._pointsToDirections(i),
                            u = this._pointsToDirections(s),
                            a = this._calculateMosesSimilarity(o, u)
                        return a
                    },
                    _preparePatternData: function (e) {
                        return e
                    },
                    _prepareSamplingData: function (e) {
                        return e
                    },
                    _pointsToDirections: function (e) {
                        var t = []
                        for (var r = 0; r < e.length - 1; r++) t.push(n.twoPointsDirection(e[r], e[r + 1]))
                        return t
                    },
                    _calculateMosesSimilarity: function (e, t) {
                        var n = e.length,
                            r = 0
                        for (var i = 0; i < n; i++) {
                            var s = e[i],
                                o = t[i]
                            if (s == o) r++
                            else {
                                var u = Math.abs(s - o)
                                r += u == 7 || u == 1 ? 0.5 : 0
                            }
                        }
                        return r / n
                    }
                })
            return s
        }),
        n('util/array', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    compare: function (e, t) {
                        if (e.length !== t.length) return !1
                        for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1
                        return !0
                    }
                })
            return n
        }),
        n('model/polyline', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    $create: function () {
                        ;(this.segments = []), (this.vertices = []), (this.closed = !1)
                    }
                })
            return n
        }),
        n('model/segment', ['require', 'p', 'util/direction'], function (e) {
            var t = e('p'),
                n = e('util/direction'),
                r = t.extend({
                    $create: function (e, t) {
                        ;(this.start = e), (this.end = t)
                    },
                    vector: {
                        get: function () {
                            return this.end.subtract(this.start)
                        }
                    },
                    direction: {
                        get: function () {
                            return n.twoPointsDirection(this.start, this.end)
                        }
                    }
                })
            return r
        }),
        n('util/segment', ['require', 'p', 'model/segment'], function (e) {
            var t = e('p'),
                n = e('model/segment'),
                r = t.extend({
                    merge: function (e, t, n) {},
                    mergeWithPrev: function (e, t) {
                        var n
                        return (
                            (e = e.concat()),
                            t === 0
                                ? ((n = this.mergeSegments(e[0], e[1])), (e = [n].concat(e.slice(2))))
                                : ((n = this.mergeSegments(e[t - 1], e[t])),
                                  (e = e
                                      .slice(0, t - 1)
                                      .concat([n])
                                      .concat(e.slice(t + 1)))),
                            e
                        )
                    },
                    mergeSegments: function (e, t) {
                        return n.create(e.start, t.end)
                    }
                })
            return r
        }),
        n('algorithm/polygonal-line-algorithm', ['require', 'p', 'util/array', 'util/direction', 'model/point', 'model/polyline', 'model/segment', 'util/segment', 'model/match', 'util/math'], function (e) {
            var t = e('p'),
                n = e('util/array'),
                r = e('util/direction'),
                i = e('model/point'),
                s = e('model/polyline'),
                o = e('model/segment'),
                u = e('util/segment'),
                a = e('model/match'),
                f = e('util/math'),
                l = t.extend({
                    $create: function (e) {
                        ;(e = e || {}), (this.tolerance = e.tolerance || Math.PI / 12), (this.minLength = e.minLength || 30), (this.closedTolerance = e.closedTolerance || 30)
                    },
                    match: function (e, t) {
                        var n = a.create(e, 0, !1)
                        n.polyline = s.create()
                        if (t.length < 3) return n
                        var r = this._getJointIndicies(t)
                        return (
                            (n.polyline.segments = this._getSegments(r, t)),
                            (n.polyline.segments = this._smoothSegments(n.polyline.segments)),
                            (n.polyline.segments = this._mergeShortSegments(n.polyline.segments)),
                            (n.polyline.segments = this._smoothSegments(n.polyline.segments)),
                            (n.polyline.vertices = [n.polyline.segments[0].start].concat(
                                n.polyline.segments.map(function (e) {
                                    return e.end
                                })
                            )),
                            (n.polyline.closed = f.distance(n.polyline.vertices[0], n.polyline.vertices[n.polyline.vertices.length - 1]) < this.closedTolerance),
                            (n.recognised = this._recognise(e.data || {}, n.polyline)),
                            (n.value = n.recognised ? 1 : 0),
                            n
                        )
                    },
                    _recognise: function (e, t) {
                        var r = !0,
                            i,
                            s
                        return (
                            e.segments !== undefined && (r = e.segments === t.segments.length),
                            r &&
                                e.directions !== undefined &&
                                ((s = t.segments.map(function (e) {
                                    return e.direction
                                })),
                                (i = e.directions.some(function (e) {
                                    return n.compare(e, s)
                                })),
                                (r = i)),
                            r && e.closed !== undefined && (r = t.closed === e.closed),
                            r && e.test !== undefined && (r = e.test(t)),
                            r
                        )
                    },
                    _mergeShortSegments: function (e) {
                        var t = e.concat(),
                            n
                        while (t.length > 1 && (n = this._indexOfShortSegment(t)) !== -1) t = u.mergeWithPrev(t, n)
                        return t
                    },
                    _indexOfShortSegment: function (e) {
                        var t = -1
                        return (
                            e.forEach(function (e, n) {
                                e.vector.length < this.minLength && (t = n)
                            }, this),
                            t
                        )
                    },
                    _smoothSegments: function (e) {
                        var t = this._segmentsToPoints(e),
                            n = this._getJointIndicies(t),
                            r = this._getSegments(n, t)
                        return r
                    },
                    _segmentsToPoints: function (e) {
                        var t = []
                        return (
                            e.length &&
                                ((t = [e[0].start]),
                                e.forEach(function (e) {
                                    t.push(e.end)
                                })),
                            t
                        )
                    },
                    _getSegments: function (e, t) {
                        var n = [],
                            r,
                            i,
                            s
                        for (var u = 1; u < e.length; u++) (i = t[e[u - 1]]), (s = t[e[u]]), (r = o.create(i, s)), n.push(r)
                        return n
                    },
                    _getJointIndicies: function (e) {
                        var t = this._getAngles(e),
                            n = this._anglesToJointIndicies(t)
                        return n
                    },
                    _getSegmentAngles: function (e) {
                        var t = []
                        for (var n = 1; n < e.length; n++) t.push(f.threePointsAngle(e[n - 1].start, e[n - 1].end, e[n].end))
                        return t
                    },
                    _getAngles: function (e) {
                        var t = []
                        for (var n = 2; n < e.length; n++) t.push(f.threePointsAngle(e[n - 2], e[n - 1], e[n]))
                        return t
                    },
                    _anglesToJointIndicies: function (e) {
                        var t = e.map(function (e) {
                            return !this._isStraight(e)
                        }, this)
                        t = [!0].concat(t).concat(!0)
                        var n = t.reduce(function (e, t, n) {
                            return t && e.push(n), e
                        }, [])
                        return n
                    },
                    _isStraight: function (e) {
                        return Math.abs(Math.PI - e) <= this.tolerance
                    }
                })
            return l
        }),
        n('algorithm/shifted-points-moses-algorithm', ['require', 'algorithm/default-moses-algorithm'], function (e) {
            var t = e('algorithm/default-moses-algorithm'),
                n = t.extend({
                    _preparePatternData: function (e) {
                        return this._shiftData(e)
                    },
                    _prepareSamplingData: function (e) {
                        return this._shiftData(e)
                    },
                    _shiftData: function (e) {
                        return this._shiftRight(e, this._upperLeftPointIndex(e)), e
                    },
                    _shiftRight: function (e, t) {
                        for (var n = 0; n < t; n++) {
                            var r = e.shift()
                            e.push(r)
                        }
                    },
                    _upperLeftPointIndex: function (e) {
                        var t = Infinity,
                            n = Infinity,
                            r = -1
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i]
                            if (s.y < n || (s.y == n && s.x < t)) (t = s.x), (n = s.y), (r = i)
                        }
                        return r
                    }
                })
            return n
        }),
        n('algorithm/straight-line-algorithm', ['require', 'p', 'model/point', 'model/match'], function (e) {
            var t = e('p'),
                n = e('model/point'),
                r = e('model/match'),
                i = t.extend({
                    $create: function (e) {
                        this._tolerance = e || 10
                    },
                    match: function (e, t) {
                        var n = t.map(function (e) {
                                return e.x
                            }),
                            i = t.map(function (e) {
                                return e.y
                            }),
                            s = this._calculateMovement(n),
                            o = this._calculateMovement(i),
                            u = this._pointsInDirection(n, s),
                            a = this._pointsInDirection(i, o),
                            f = u + a,
                            l = n.length + i.length,
                            c = f / l,
                            h = r.create(e, c, c > 0.8)
                        return (h.vertical = s === 0), (h.horizontal = o === 0), h
                    },
                    _delta: function (e) {
                        var t = Math.min.apply(null, e),
                            n = Math.max.apply(null, e)
                        return n - t
                    },
                    _calculateMovement: function (e) {
                        var t = this._delta(e)
                        return Math.abs(t) <= this._tolerance ? 0 : e[0] - e[e.length - 1] > 0 ? -1 : 1
                    },
                    _pointsInDirection: function (e, t) {
                        var n = 1
                        return t
                            ? (e.reduce(
                                  function (e, r, i) {
                                      return i === 0 ? n++ : t === 1 ? (n += r > e ? 1 : r === e ? 0.5 : 0) : t === -1 && (n += r < e ? 1 : r === e ? 0.5 : 0), r
                                  }.bind(this)
                              ),
                              n)
                            : e.length
                    }
                })
            return i
        }),
        n('algorithm/reversed-moses-algorithm', ['require', 'algorithm/default-moses-algorithm'], function (e) {
            var t = e('algorithm/default-moses-algorithm'),
                n = t.extend({
                    _matchingValue: function (e, n) {
                        var r = e.slice()
                        r.reverse()
                        var i = t._matchingValue.call(this, e, n),
                            s = t._matchingValue.call(this, r, n)
                        return i > s ? i : s
                    }
                })
            return n
        }),
        n('model/pattern', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    name: null,
                    data: null,
                    algorithm: null,
                    $create: function (e, t, n) {
                        ;(this.name = e), (this.data = t), (this.algorithm = n)
                    }
                })
            return n
        }),
        n('algorithm/pattern-collection-algorithm', ['require', 'p', 'model/match'], function (e) {
            var t = e('p'),
                n = e('model/match'),
                r = t.extend({
                    match: function (e, t) {
                        var r, i
                        return (
                            e.patterns.forEach(function (e) {
                                ;(i = e.algorithm.match(e, t)), r != null ? (r = i.value > r.value ? i : r) : (r = i)
                            }),
                            n.create(e, r.value, r.recognised)
                        )
                    }
                })
            return r
        }),
        n('model/pattern-collection', ['require', 'p', 'algorithm/pattern-collection-algorithm'], function (e) {
            var t = e('p'),
                n = e('algorithm/pattern-collection-algorithm'),
                r = t.extend({
                    patterns: null,
                    $create: function (e) {
                        this.name = e
                        var t = Array.prototype.slice.call(arguments).slice(1)
                        ;(this.patterns = t), (this.algorithm = n.create())
                    }
                })
            return r
        }),
        n('model/pattern-factory', ['require', 'p', 'model/point', 'model/pattern'], function (e) {
            var t = e('p'),
                n = e('model/point'),
                r = e('model/pattern'),
                i = t.extend({
                    fromFlatArray: function (e, t, i) {
                        if (t.length % 2 != 0) throw Error('You must provide even number of coordinates!')
                        var s = []
                        for (var o = 0; o < t.length; o += 2) s.push(n.create(t[o], t[o + 1]))
                        return r.create(e, s, i)
                    }
                })
            return i
        }),
        n('../js/model/moses-patterns', ['require', 'p', 'model/directions', 'algorithm/default-moses-algorithm', 'algorithm/polygonal-line-algorithm', 'algorithm/shifted-points-moses-algorithm', 'algorithm/straight-line-algorithm', 'algorithm/reversed-moses-algorithm', 'model/pattern', 'model/pattern-collection', 'model/pattern-factory'], function (e) {
            var t = e('p'),
                n = e('model/directions'),
                r = e('algorithm/default-moses-algorithm'),
                i = e('algorithm/polygonal-line-algorithm'),
                s = e('algorithm/shifted-points-moses-algorithm'),
                o = e('algorithm/straight-line-algorithm'),
                u = e('algorithm/reversed-moses-algorithm'),
                a = e('model/pattern'),
                f = e('model/pattern-collection'),
                l = e('model/pattern-factory'),
                c = t.extend({
                    $create: function () {
                        ;(this.CIRCLE = f.create('Circle', this.CIRCLE_CLOCKWISE, this.CIRCLE_COUNTER_CLOCKWISE)), (this.SQUARE = f.create('Square', this.LEFT_TOP_SQUARE, this.RIGHT_TOP_SQUARE, this.LEFT_BOTTOM_SQUARE, this.RIGHT_BOTTOM_SQUARE))
                    },
                    CIRCLE_CLOCKWISE: { value: l.fromFlatArray('Circle (clockwise)', [0, -100, 17, -98.5, 34, -94, 50, -86.6, 64.2, -76.6, 76.6, -64.2, 86.6, -50, 94, -34, 98.5, -17.7, 100, 0, 98.5, 17.7, 94, 34, 86.6, 50, 76.6, 64.2, 64.2, 76.6, 50, 86.6, 34, 94, 17, 98.5, 0, 100, -17, 98.5, -34, 94, -50, 86.6, -64.2, 76.6, -76.6, 64.2, -86.6, 50, -94, 34, -98.5, 17.7, -100, 0, -98.5, -17.7, -94, -34, -86.6, -50, -76.6, -64.2, -64.2, -76.6, -50, -86.6, -34, -94, -17, -98.5, 0, -100], s.create(0.6, 10)) },
                    CIRCLE_COUNTER_CLOCKWISE: { value: l.fromFlatArray('Circle (counter clockwise)', [0, -100, -17, -98.5, -34, -94, -50, -86.6, -64.2, -76.6, -76.6, -64.2, -86.6, -50, -94, -34, -98.5, -17.7, -100, 0, -98.5, 17.7, -94, 34, -86.6, 50, -76.6, 64.2, -64.2, 76.6, -50, 86.6, -34, 94, -17, 98.5, 0, 100, 17, 98.5, 34, 94, 50, 86.6, 64.2, 76.6, 76.6, 64.2, 86.6, 50, 94, 34, 98.5, 17.7, 100, 0, 98.5, -17.7, 94, -34, 86.6, -50, 76.6, -64.2, 64.2, -76.6, 50, -86.6, 34, -94, 17, -98.5, 0, -100], s.create(0.6, 10)) },
                    LEFT_TOP_SQUARE: { value: l.fromFlatArray('Square (from left top corner)', [0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 90, 10, 90, 20, 90, 30, 90, 40, 90, 50, 90, 60, 90, 70, 90, 80, 90, 90, 80, 90, 70, 90, 60, 90, 50, 90, 40, 90, 30, 90, 20, 90, 10, 90, 0, 90, 0, 80, 0, 70, 0, 60, 0, 50, 0, 40, 0, 30, 0, 20, 0, 10, 0, 0], u.create(0.7, 4)) },
                    RIGHT_TOP_SQUARE: { value: l.fromFlatArray('Square (from right top corner)', [90, 0, 90, 10, 90, 20, 90, 30, 90, 40, 90, 50, 90, 60, 90, 70, 90, 80, 90, 90, 80, 90, 70, 90, 60, 90, 50, 90, 40, 90, 30, 90, 20, 90, 10, 90, 0, 90, 0, 80, 0, 70, 0, 60, 0, 50, 0, 40, 0, 30, 0, 20, 0, 10, 0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0], u.create(0.7, 4)) },
                    LEFT_BOTTOM_SQUARE: { value: l.fromFlatArray('Square (from left bottom corner)', [0, 90, 0, 80, 0, 70, 0, 60, 0, 50, 0, 40, 0, 30, 0, 20, 0, 10, 0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 90, 10, 90, 20, 90, 30, 90, 40, 90, 50, 90, 60, 90, 70, 90, 80, 90, 90, 80, 90, 70, 90, 60, 90, 50, 90, 40, 90, 30, 90, 20, 90, 10, 90, 0, 90], u.create(0.7, 4)) },
                    RIGHT_BOTTOM_SQUARE: { value: l.fromFlatArray('Square (from right bottom corner)', [90, 90, 80, 90, 70, 90, 60, 90, 50, 90, 40, 90, 30, 90, 20, 90, 10, 90, 0, 90, 0, 80, 0, 70, 0, 60, 0, 50, 0, 40, 0, 30, 0, 20, 0, 10, 0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 90, 10, 90, 20, 90, 30, 90, 40, 90, 50, 90, 60, 90, 70, 90, 80, 90, 90], u.create(0.7, 4)) },
                    V: { value: l.fromFlatArray('V', [-50, -100, -45, -90, -40, -80, -35, -70, -30, -60, -25, -50, -20, -40, -15, -30, -10, -20, -5, -10, 0, 0, 5, -10, 10, -20, 15, -30, 20, -40, 25, -50, 30, -60, 35, -70, 40, -80, 45, -90, 50, -100], r.create(0.6, 4)) },
                    DASH: { value: l.fromFlatArray('Chevron', [-50, 100, -45, 90, -40, 80, -35, 70, -30, 60, -25, 50, -20, 40, -15, 30, -10, 20, -5, 10, 0, 0, 5, 10, 10, 20, 15, 30, 20, 40, 25, 50, 30, 60, 35, 70, 40, 80, 45, 90, 50, 100], r.create(0.6, 4)) },
                    SEVEN: { value: l.fromFlatArray('Seven', [0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 100, 0, 90, 10, 80, 20, 70, 30, 60, 40, 50, 50, 40, 60, 30, 70, 20, 80, 10, 90, 0, 100], r.create(0.7, 2)) },
                    Z: { value: l.fromFlatArray('Z', [0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 100, 0, 90, 10, 80, 20, 70, 30, 60, 40, 50, 50, 40, 60, 30, 70, 20, 80, 10, 90, 0, 100, 10, 100, 20, 100, 30, 100, 40, 100, 50, 100, 60, 100, 70, 100, 80, 100, 90, 100], r.create(0.65, 4)) },
                    LINE_UP_DOWN: { value: l.fromFlatArray('Up-down', [0, 0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 100], r.create(0.7, 2)) },
                    LINE_DOWN_UP: { value: l.fromFlatArray('Down-up', [0, 0, 0, -10, 0, -20, 0, -30, 0, -40, 0, -50, 0, -60, 0, -70, 0, -80, 0, -90, 0, -100], r.create(0.7, 2)) },
                    LINE_LEFT_RIGHT: { value: l.fromFlatArray('Left-right', [0, 0, 10, 0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70, 0, 80, 0, 90, 0, 100, 0], r.create(0.7, 2)) },
                    LINE_RIGHT_LEFT: { value: l.fromFlatArray('Right-left', [0, 0, -10, 0, -20, 0, -30, 0, -40, 0, -50, 0, -60, 0, -70, 0, -80, 0, -90, 0, -100, 0], r.create(0.7, 2)) },
                    STRAIGHT_LINE: { value: a.create('Straight line', [], o.create()) },
                    POLYGONAL: {
                        value: {
                            LINE: a.create('Straight line', { segments: 1 }, i.create()),
                            Z: a.create('Z', { segments: 3, closed: !1, directions: [[n.RIGHT, n.LEFT_DOWN, n.RIGHT]] }, i.create()),
                            TRIANGLE: a.create('Triangle', { segments: 3, closed: !0 }, i.create()),
                            TWO_LINES: a.create('Two lines', { segments: 2, closed: !1 }, i.create()),
                            DOUBLE_LINE: a.create('Double line', { segments: 2, closed: !0 }, i.create()),
                            RECTANGLE: a.create(
                                'Rectangle',
                                {
                                    segments: 4,
                                    closed: !0,
                                    directions: [
                                        [n.RIGHT, n.DOWN, n.LEFT, n.UP],
                                        [n.DOWN, n.LEFT, n.UP, n.RIGHT],
                                        [n.LEFT, n.UP, n.RIGHT, n.DOWN],
                                        [n.UP, n.RIGHT, n.DOWN, n.LEFT],
                                        [n.DOWN, n.RIGHT, n.UP, n.LEFT],
                                        [n.RIGHT, n.UP, n.LEFT, n.DOWN],
                                        [n.UP, n.LEFT, n.DOWN, n.RIGHT],
                                        [n.LEFT, n.DOWN, n.RIGHT, n.UP]
                                    ]
                                },
                                i.create()
                            )
                        }
                    }
                })
            return c
        }),
        n('../js/model/pattern-collection', ['require', 'p', 'algorithm/pattern-collection-algorithm'], function (e) {
            var t = e('p'),
                n = e('algorithm/pattern-collection-algorithm'),
                r = t.extend({
                    patterns: null,
                    $create: function (e) {
                        this.name = e
                        var t = Array.prototype.slice.call(arguments).slice(1)
                        ;(this.patterns = t), (this.algorithm = n.create())
                    }
                })
            return r
        }),
        n('../js/model/pattern-factory', ['require', 'p', 'model/point', 'model/pattern'], function (e) {
            var t = e('p'),
                n = e('model/point'),
                r = e('model/pattern'),
                i = t.extend({
                    fromFlatArray: function (e, t, i) {
                        if (t.length % 2 != 0) throw Error('You must provide even number of coordinates!')
                        var s = []
                        for (var o = 0; o < t.length; o += 2) s.push(n.create(t[o], t[o + 1]))
                        return r.create(e, s, i)
                    }
                })
            return i
        }),
        n('../js/model/pattern', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    name: null,
                    data: null,
                    algorithm: null,
                    $create: function (e, t, n) {
                        ;(this.name = e), (this.data = t), (this.algorithm = n)
                    }
                })
            return n
        }),
        n('../js/model/point', ['require', 'p', 'util/math'], function (e) {
            var t = e('p'),
                n = e('util/math'),
                r = t.extend({
                    x: null,
                    y: null,
                    $create: function (e, t) {
                        ;(this.x = e), (this.y = t)
                    },
                    subtract: function (e) {
                        return r.create(this.x - e.x, this.y - e.y)
                    },
                    length: {
                        get: function () {
                            return n.distance(this, r.create(0, 0))
                        }
                    },
                    toString: function () {
                        return '(' + this.x + ',' + this.y + ')'
                    }
                })
            return r
        }),
        n('../js/model/polyline', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    $create: function () {
                        ;(this.segments = []), (this.vertices = []), (this.closed = !1)
                    }
                })
            return n
        }),
        n('../js/model/recognition-data', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    allMatches: null,
                    bestMatch: null,
                    $create: function (e) {
                        ;(this.allMatches = e),
                            (this.bestMatch = null),
                            e.forEach(function (e) {
                                this.bestMatch != null ? (this.bestMatch = e.value > this.bestMatch.value ? e : this.bestMatch) : (this.bestMatch = e)
                            }, this)
                    }
                })
            return n
        }),
        n('../js/model/segment', ['require', 'p', 'util/direction'], function (e) {
            var t = e('p'),
                n = e('util/direction'),
                r = t.extend({
                    $create: function (e, t) {
                        ;(this.start = e), (this.end = t)
                    },
                    vector: {
                        get: function () {
                            return this.end.subtract(this.start)
                        }
                    },
                    direction: {
                        get: function () {
                            return n.twoPointsDirection(this.start, this.end)
                        }
                    }
                })
            return r
        }),
        n('sampler/sampler', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend([t.Dispatcher], {
                    _data: null,
                    getData: function () {
                        return this._data
                    },
                    activate: function () {
                        ;(this._data = []), this.dispatch('activated', this._data)
                    },
                    deactivate: function () {
                        ;(this._data = []), this.dispatch('deactivated', this._data)
                    },
                    _dispatchSampled: function () {
                        this.dispatch('sampled', this._data)
                    },
                    _dispatchStarted: function () {
                        this.dispatch('started', this._data)
                    },
                    _dispatchFinished: function () {
                        this.dispatch('finished', this._data)
                    }
                })
            return n
        }),
        n('sampler/dom-sampler', ['require', 'sampler/sampler', 'model/point'], function (e) {
            var t = e('sampler/sampler'),
                n = e('model/point'),
                r = t.extend({
                    _element: null,
                    _pointerId: null,
                    $create: function (e) {
                        this._element = e
                    },
                    activate: function () {
                        ;(this.__startScreening = this._startScreening.bind(this)), this._element.addEventListener('pointerdown', this.__startScreening), t.activate.call(this)
                    },
                    deactivate: function () {
                        this._element.removeEventListener('pointerdown', this.__startScreening), t.deactivate.call(this)
                    },
                    _mousePosition: function (e) {
                        return n.create(e.pageX - this._element.offsetLeft, e.pageY - this._element.offsetTop)
                    },
                    _addMousePosition: function (e) {
                        this._data.push(this._mousePosition(e))
                    },
                    _continueScreening: function (e) {
                        this._addMousePosition(e), this._dispatchSampled()
                    },
                    getLastPosition: function () {
                        return this._data.length > 0 ? this._data[this._data.length - 1] : null
                    },
                    _startScreening: function (e) {
                        this._pointerId || ((this._pointerId = e.pointerId), (this._data = []), this._addMousePosition(e), (this.__continueScreening = this._continueScreening.bind(this)), this._element.addEventListener('pointermove', this.__continueScreening), (this.__endScreening = this._endScreening.bind(this)), this._element.addEventListener('pointerup', this.__endScreening), this._dispatchStarted())
                    },
                    _deactivateScreening: function () {
                        this._element.removeEventListener('pointermove', this.__continueScreening), this._element.removeEventListener('pointerup', this.__endScreening), (this._pointerId = null)
                    },
                    _endScreening: function () {
                        this._deactivateScreening(), this._dispatchFinished()
                    }
                })
            return r
        }),
        n('../js/sampler/distance-sampler', ['require', 'sampler/dom-sampler', 'util/math'], function (e) {
            var t = e('sampler/dom-sampler'),
                n = e('util/math'),
                r = t.extend({
                    distance: null,
                    $create: function (e, t) {
                        this.distance = t
                    },
                    _continueScreening: function (e) {
                        var r = this.getLastPosition(),
                            i = this._mousePosition(e)
                        r !== null && n.distance(r, i) >= this.distance && t._continueScreening.call(this, e)
                    }
                })
            return r
        }),
        n('../js/sampler/sampler', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend([t.Dispatcher], {
                    _data: null,
                    getData: function () {
                        return this._data
                    },
                    activate: function () {
                        ;(this._data = []), this.dispatch('activated', this._data)
                    },
                    deactivate: function () {
                        ;(this._data = []), this.dispatch('deactivated', this._data)
                    },
                    _dispatchSampled: function () {
                        this.dispatch('sampled', this._data)
                    },
                    _dispatchStarted: function () {
                        this.dispatch('started', this._data)
                    },
                    _dispatchFinished: function () {
                        this.dispatch('finished', this._data)
                    }
                })
            return n
        }),
        n('../js/sampler/time-sampler', ['require', 'sampler/dom-sampler'], function (e) {
            var t = e('sampler/dom-sampler'),
                n = t.extend({
                    interval: null,
                    _timer: null,
                    _lastEvent: null,
                    $create: function (e, t) {
                        this.interval = t || 100
                    },
                    _startScreening: function (e) {
                        t._startScreening.call(this, e), (this._lastEvent = null), (this._timer = setInterval(this._sample.bind(this), this.interval))
                    },
                    _continueScreening: function (e) {
                        this._lastEvent = e
                    },
                    _sample: function () {
                        this._lastEvent && (this._addMousePosition(this._lastEvent), this._dispatchSampled())
                    },
                    _endScreening: function (e) {
                        t._endScreening.call(this, e), clearInterval(this._timer)
                    }
                })
            return n
        }),
        n('../js/sampler/dom-sampler', ['require', 'sampler/sampler', 'model/point'], function (e) {
            var t = e('sampler/sampler'),
                n = e('model/point'),
                r = t.extend({
                    _element: null,
                    _pointerId: null,
                    $create: function (e) {
                        this._element = e
                    },
                    activate: function () {
                        ;(this.__startScreening = this._startScreening.bind(this)), this._element.addEventListener('pointerdown', this.__startScreening), t.activate.call(this)
                    },
                    deactivate: function () {
                        this._element.removeEventListener('pointerdown', this.__startScreening), t.deactivate.call(this)
                    },
                    _mousePosition: function (e) {
                        return n.create(e.pageX - this._element.offsetLeft, e.pageY - this._element.offsetTop)
                    },
                    _addMousePosition: function (e) {
                        this._data.push(this._mousePosition(e))
                    },
                    _continueScreening: function (e) {
                        this._addMousePosition(e), this._dispatchSampled()
                    },
                    getLastPosition: function () {
                        return this._data.length > 0 ? this._data[this._data.length - 1] : null
                    },
                    _startScreening: function (e) {
                        this._pointerId || ((this._pointerId = e.pointerId), (this._data = []), this._addMousePosition(e), (this.__continueScreening = this._continueScreening.bind(this)), this._element.addEventListener('pointermove', this.__continueScreening), (this.__endScreening = this._endScreening.bind(this)), this._element.addEventListener('pointerup', this.__endScreening), this._dispatchStarted())
                    },
                    _deactivateScreening: function () {
                        this._element.removeEventListener('pointermove', this.__continueScreening), this._element.removeEventListener('pointerup', this.__endScreening), (this._pointerId = null)
                    },
                    _endScreening: function () {
                        this._deactivateScreening(), this._dispatchFinished()
                    }
                })
            return r
        }),
        n('../js/algorithm/default-moses-algorithm', ['require', 'p', 'util/direction', 'algorithm/moses-fit', 'model/match'], function (e) {
            var t = e('p'),
                n = e('util/direction'),
                r = e('algorithm/moses-fit'),
                i = e('model/match'),
                s = t.extend({
                    _threshold: null,
                    _minSamplerPoints: null,
                    $create: function (e, t) {
                        ;(this._threshold = e || 0.5), (this._minSamplerPoints = t || 5)
                    },
                    match: function (e, t) {
                        var n = this._matchingValue(e.data, t),
                            r = n >= this._threshold && t.length >= this._minSamplerPoints
                        return i.create(e, n, r)
                    },
                    _matchingValue: function (e, t) {
                        var n = r.create(e.slice(), t.slice()),
                            i = this._preparePatternData(n.getReducedPatternData()),
                            s = this._prepareSamplingData(n.getReducedSamplingData()),
                            o = this._pointsToDirections(i),
                            u = this._pointsToDirections(s),
                            a = this._calculateMosesSimilarity(o, u)
                        return a
                    },
                    _preparePatternData: function (e) {
                        return e
                    },
                    _prepareSamplingData: function (e) {
                        return e
                    },
                    _pointsToDirections: function (e) {
                        var t = []
                        for (var r = 0; r < e.length - 1; r++) t.push(n.twoPointsDirection(e[r], e[r + 1]))
                        return t
                    },
                    _calculateMosesSimilarity: function (e, t) {
                        var n = e.length,
                            r = 0
                        for (var i = 0; i < n; i++) {
                            var s = e[i],
                                o = t[i]
                            if (s == o) r++
                            else {
                                var u = Math.abs(s - o)
                                r += u == 7 || u == 1 ? 0.5 : 0
                            }
                        }
                        return r / n
                    }
                })
            return s
        }),
        n('../js/algorithm/moses-fit', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    _reducedPatternData: null,
                    _reducedSamplingData: null,
                    $create: function (e, t) {
                        this._mosesFit(e, t)
                    },
                    getReducedPatternData: function () {
                        return this._reducedPatternData
                    },
                    getReducedSamplingData: function () {
                        return this._reducedSamplingData
                    },
                    _mosesFit: function (e, t) {
                        var n
                        e.length >= t.length ? ((n = (e.length - 1) / (t.length - 1)), (this._reducedPatternData = this._reduceList(e, n == Infinity ? (n = t.length) : n)), (this._reducedSamplingData = t)) : ((n = (t.length - 1) / (e.length - 1)), (this._reducedPatternData = e), (this._reducedSamplingData = this._reduceList(t, n == Infinity ? (n = e.length) : n)))
                    },
                    _reduceList: function (e, t) {
                        var n = [],
                            r = 0,
                            i = 0
                        while (i < e.length - 1) n.push(e[i]), (r += t), (i = Math.round(r))
                        return n.push(e[e.length - 1]), n
                    }
                })
            return n
        }),
        n('../js/algorithm/pattern-collection-algorithm', ['require', 'p', 'model/match'], function (e) {
            var t = e('p'),
                n = e('model/match'),
                r = t.extend({
                    match: function (e, t) {
                        var r, i
                        return (
                            e.patterns.forEach(function (e) {
                                ;(i = e.algorithm.match(e, t)), r != null ? (r = i.value > r.value ? i : r) : (r = i)
                            }),
                            n.create(e, r.value, r.recognised)
                        )
                    }
                })
            return r
        }),
        n('../js/algorithm/reversed-moses-algorithm', ['require', 'algorithm/default-moses-algorithm'], function (e) {
            var t = e('algorithm/default-moses-algorithm'),
                n = t.extend({
                    _matchingValue: function (e, n) {
                        var r = e.slice()
                        r.reverse()
                        var i = t._matchingValue.call(this, e, n),
                            s = t._matchingValue.call(this, r, n)
                        return i > s ? i : s
                    }
                })
            return n
        }),
        n('../js/algorithm/polygonal-line-algorithm', ['require', 'p', 'util/array', 'util/direction', 'model/point', 'model/polyline', 'model/segment', 'util/segment', 'model/match', 'util/math'], function (e) {
            var t = e('p'),
                n = e('util/array'),
                r = e('util/direction'),
                i = e('model/point'),
                s = e('model/polyline'),
                o = e('model/segment'),
                u = e('util/segment'),
                a = e('model/match'),
                f = e('util/math'),
                l = t.extend({
                    $create: function (e) {
                        ;(e = e || {}), (this.tolerance = e.tolerance || Math.PI / 12), (this.minLength = e.minLength || 30), (this.closedTolerance = e.closedTolerance || 30)
                    },
                    match: function (e, t) {
                        var n = a.create(e, 0, !1)
                        n.polyline = s.create()
                        if (t.length < 3) return n
                        var r = this._getJointIndicies(t)
                        return (
                            (n.polyline.segments = this._getSegments(r, t)),
                            (n.polyline.segments = this._smoothSegments(n.polyline.segments)),
                            (n.polyline.segments = this._mergeShortSegments(n.polyline.segments)),
                            (n.polyline.segments = this._smoothSegments(n.polyline.segments)),
                            (n.polyline.vertices = [n.polyline.segments[0].start].concat(
                                n.polyline.segments.map(function (e) {
                                    return e.end
                                })
                            )),
                            (n.polyline.closed = f.distance(n.polyline.vertices[0], n.polyline.vertices[n.polyline.vertices.length - 1]) < this.closedTolerance),
                            (n.recognised = this._recognise(e.data || {}, n.polyline)),
                            (n.value = n.recognised ? 1 : 0),
                            n
                        )
                    },
                    _recognise: function (e, t) {
                        var r = !0,
                            i,
                            s
                        return (
                            e.segments !== undefined && (r = e.segments === t.segments.length),
                            r &&
                                e.directions !== undefined &&
                                ((s = t.segments.map(function (e) {
                                    return e.direction
                                })),
                                (i = e.directions.some(function (e) {
                                    return n.compare(e, s)
                                })),
                                (r = i)),
                            r && e.closed !== undefined && (r = t.closed === e.closed),
                            r && e.test !== undefined && (r = e.test(t)),
                            r
                        )
                    },
                    _mergeShortSegments: function (e) {
                        var t = e.concat(),
                            n
                        while (t.length > 1 && (n = this._indexOfShortSegment(t)) !== -1) t = u.mergeWithPrev(t, n)
                        return t
                    },
                    _indexOfShortSegment: function (e) {
                        var t = -1
                        return (
                            e.forEach(function (e, n) {
                                e.vector.length < this.minLength && (t = n)
                            }, this),
                            t
                        )
                    },
                    _smoothSegments: function (e) {
                        var t = this._segmentsToPoints(e),
                            n = this._getJointIndicies(t),
                            r = this._getSegments(n, t)
                        return r
                    },
                    _segmentsToPoints: function (e) {
                        var t = []
                        return (
                            e.length &&
                                ((t = [e[0].start]),
                                e.forEach(function (e) {
                                    t.push(e.end)
                                })),
                            t
                        )
                    },
                    _getSegments: function (e, t) {
                        var n = [],
                            r,
                            i,
                            s
                        for (var u = 1; u < e.length; u++) (i = t[e[u - 1]]), (s = t[e[u]]), (r = o.create(i, s)), n.push(r)
                        return n
                    },
                    _getJointIndicies: function (e) {
                        var t = this._getAngles(e),
                            n = this._anglesToJointIndicies(t)
                        return n
                    },
                    _getSegmentAngles: function (e) {
                        var t = []
                        for (var n = 1; n < e.length; n++) t.push(f.threePointsAngle(e[n - 1].start, e[n - 1].end, e[n].end))
                        return t
                    },
                    _getAngles: function (e) {
                        var t = []
                        for (var n = 2; n < e.length; n++) t.push(f.threePointsAngle(e[n - 2], e[n - 1], e[n]))
                        return t
                    },
                    _anglesToJointIndicies: function (e) {
                        var t = e.map(function (e) {
                            return !this._isStraight(e)
                        }, this)
                        t = [!0].concat(t).concat(!0)
                        var n = t.reduce(function (e, t, n) {
                            return t && e.push(n), e
                        }, [])
                        return n
                    },
                    _isStraight: function (e) {
                        return Math.abs(Math.PI - e) <= this.tolerance
                    }
                })
            return l
        }),
        n('../js/algorithm/shifted-points-moses-algorithm', ['require', 'algorithm/default-moses-algorithm'], function (e) {
            var t = e('algorithm/default-moses-algorithm'),
                n = t.extend({
                    _preparePatternData: function (e) {
                        return this._shiftData(e)
                    },
                    _prepareSamplingData: function (e) {
                        return this._shiftData(e)
                    },
                    _shiftData: function (e) {
                        return this._shiftRight(e, this._upperLeftPointIndex(e)), e
                    },
                    _shiftRight: function (e, t) {
                        for (var n = 0; n < t; n++) {
                            var r = e.shift()
                            e.push(r)
                        }
                    },
                    _upperLeftPointIndex: function (e) {
                        var t = Infinity,
                            n = Infinity,
                            r = -1
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i]
                            if (s.y < n || (s.y == n && s.x < t)) (t = s.x), (n = s.y), (r = i)
                        }
                        return r
                    }
                })
            return n
        }),
        n('../js/algorithm/straight-line-algorithm', ['require', 'p', 'model/point', 'model/match'], function (e) {
            var t = e('p'),
                n = e('model/point'),
                r = e('model/match'),
                i = t.extend({
                    $create: function (e) {
                        this._tolerance = e || 10
                    },
                    match: function (e, t) {
                        var n = t.map(function (e) {
                                return e.x
                            }),
                            i = t.map(function (e) {
                                return e.y
                            }),
                            s = this._calculateMovement(n),
                            o = this._calculateMovement(i),
                            u = this._pointsInDirection(n, s),
                            a = this._pointsInDirection(i, o),
                            f = u + a,
                            l = n.length + i.length,
                            c = f / l,
                            h = r.create(e, c, c > 0.8)
                        return (h.vertical = s === 0), (h.horizontal = o === 0), h
                    },
                    _delta: function (e) {
                        var t = Math.min.apply(null, e),
                            n = Math.max.apply(null, e)
                        return n - t
                    },
                    _calculateMovement: function (e) {
                        var t = this._delta(e)
                        return Math.abs(t) <= this._tolerance ? 0 : e[0] - e[e.length - 1] > 0 ? -1 : 1
                    },
                    _pointsInDirection: function (e, t) {
                        var n = 1
                        return t
                            ? (e.reduce(
                                  function (e, r, i) {
                                      return i === 0 ? n++ : t === 1 ? (n += r > e ? 1 : r === e ? 0.5 : 0) : t === -1 && (n += r < e ? 1 : r === e ? 0.5 : 0), r
                                  }.bind(this)
                              ),
                              n)
                            : e.length
                    }
                })
            return i
        }),
        n('../js/util/array', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    compare: function (e, t) {
                        if (e.length !== t.length) return !1
                        for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1
                        return !0
                    }
                })
            return n
        }),
        n('../js/util/math', ['require', 'p'], function (e) {
            var t = e('p'),
                n = t.extend({
                    distance: function (e, t) {
                        var n = e.x - t.x,
                            r = e.y - t.y
                        return Math.sqrt(n * n + r * r)
                    },
                    threePointsAngle: function (e, t, n) {
                        var r = e.subtract(t),
                            i = n.subtract(t),
                            s = r.x * i.x + r.y * i.y,
                            o = s / (r.length * i.length)
                        return Math.acos(o)
                    }
                })
            return n
        }),
        n('../js/util/segment', ['require', 'p', 'model/segment'], function (e) {
            var t = e('p'),
                n = e('model/segment'),
                r = t.extend({
                    merge: function (e, t, n) {},
                    mergeWithPrev: function (e, t) {
                        var n
                        return (
                            (e = e.concat()),
                            t === 0
                                ? ((n = this.mergeSegments(e[0], e[1])), (e = [n].concat(e.slice(2))))
                                : ((n = this.mergeSegments(e[t - 1], e[t])),
                                  (e = e
                                      .slice(0, t - 1)
                                      .concat([n])
                                      .concat(e.slice(t + 1)))),
                            e
                        )
                    },
                    mergeSegments: function (e, t) {
                        return n.create(e.start, t.end)
                    }
                })
            return r
        }),
        n('../js/util/direction', ['require', 'p', 'model/directions', 'model/point'], function (e) {
            var t = e('p'),
                n = e('model/directions'),
                r = e('model/point'),
                i = t.extend({
                    twoPointsDirection: function (e, t) {
                        var i = t.subtract(e)
                        if (e.x === t.x && e.y === t.y) return 0
                        var s = r.create(0, -1),
                            o = i.x * s.x + i.y * s.y,
                            u = o / (i.length * s.length),
                            a = this._eight(Math.acos(u))
                        if (i.x < 0)
                            switch (a) {
                                case 0:
                                    return n.UP
                                case 1:
                                case 2:
                                    return n.LEFT_UP
                                case 3:
                                case 4:
                                    return n.LEFT
                                case 5:
                                case 6:
                                    return n.LEFT_DOWN
                                case 7:
                                    return n.DOWN
                            }
                        else
                            switch (a) {
                                case 0:
                                    return n.UP
                                case 1:
                                case 2:
                                    return n.RIGHT_UP
                                case 3:
                                case 4:
                                    return n.RIGHT
                                case 5:
                                case 6:
                                    return n.RIGHT_DOWN
                                case 7:
                                    return n.DOWN
                            }
                    },
                    PI8: Math.PI / 8,
                    _eight: function (e) {
                        var t = e / this.PI8
                        return t === 8 ? 7 : Math.floor(t)
                    }
                })
            return i
        }),
        n('../build/main', ['require', '../node_modules/handjs/hand.min', '../js/recogniser/default-recogniser', '../js/model/directions', '../js/model/match', '../js/model/moses-patterns', '../js/model/pattern-collection', '../js/model/pattern-factory', '../js/model/pattern', '../js/model/point', '../js/model/polyline', '../js/model/recognition-data', '../js/model/segment', '../js/sampler/distance-sampler', '../js/sampler/sampler', '../js/sampler/time-sampler', '../js/sampler/dom-sampler', '../js/algorithm/default-moses-algorithm', '../js/algorithm/moses-fit', '../js/algorithm/pattern-collection-algorithm', '../js/algorithm/reversed-moses-algorithm', '../js/algorithm/polygonal-line-algorithm', '../js/algorithm/shifted-points-moses-algorithm', '../js/algorithm/straight-line-algorithm', '../js/util/array', '../js/util/math', '../js/util/segment', '../js/util/direction'], function (e) {
            var t = e('../node_modules/handjs/hand.min'),
                n = e('../js/recogniser/default-recogniser'),
                r = e('../js/model/directions'),
                i = e('../js/model/match'),
                s = e('../js/model/moses-patterns'),
                o = e('../js/model/pattern-collection'),
                u = e('../js/model/pattern-factory'),
                a = e('../js/model/pattern'),
                f = e('../js/model/point'),
                l = e('../js/model/polyline'),
                c = e('../js/model/recognition-data'),
                h = e('../js/model/segment'),
                p = e('../js/sampler/distance-sampler'),
                d = e('../js/sampler/sampler'),
                v = e('../js/sampler/time-sampler'),
                m = e('../js/sampler/dom-sampler'),
                g = e('../js/algorithm/default-moses-algorithm'),
                y = e('../js/algorithm/moses-fit'),
                b = e('../js/algorithm/pattern-collection-algorithm'),
                w = e('../js/algorithm/reversed-moses-algorithm'),
                E = e('../js/algorithm/polygonal-line-algorithm'),
                S = e('../js/algorithm/shifted-points-moses-algorithm'),
                x = e('../js/algorithm/straight-line-algorithm'),
                T = e('../js/util/array'),
                N = e('../js/util/math'),
                h = e('../js/util/segment'),
                C = e('../js/util/direction')
            return { recogniser: { DefaultRecogniser: n }, model: { Directions: r, Match: i, MosesPatterns: s, PatternCollection: o, PatternFactory: u, Pattern: a, Point: f, Polyline: l, RecognitionData: c, Segment: h }, sampler: { DistanceSampler: p, Sampler: d, TimeSampler: v, DomSampler: m }, algorithm: { DefaultMosesAlgorithm: g, MosesFit: y, PatternCollectionAlgorithm: b, ReversedMosesAlgorithm: w, PolygonalLineAlgorithm: E, ShiftedPointsMosesAlgorithm: S, StraightLineAlgorithm: x }, util: { Array: T, Math: N, Segment: h, Direction: C } }
        }),
        t('../build/main')
    )
})
