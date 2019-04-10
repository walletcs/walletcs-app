module.exports = (function(e) {
  var t = {};
  function r(o) {
    if (t[o]) return t[o].exports;
    var n = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function(e, t, o) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (r.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (r.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var n in e)
          r.d(
            o,
            n,
            function(t) {
              return e[t];
            }.bind(null, n)
          );
      return o;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = './app/main.dev.js'))
  );
})({
  './app/main.dev.js': function(e, t, r) {
    'use strict';
    r.r(t),
      r.d(t, 'default', function() {
        return a;
      });
    r('./node_modules/core-js/modules/web.dom.iterable.js');
    var o = r('electron'),
      n = r('electron-updater'),
      s = r('electron-log'),
      i = r.n(s);
    class a {
      constructor() {
        (i.a.transports.file.level = 'info'),
          (n.autoUpdater.logger = i.a),
          n.autoUpdater.checkForUpdatesAndNotify();
      }
    }
    let c = null;
    r('source-map-support').install();
    o.app.on('window-all-closed', () => {
      'darwin' !== process.platform && o.app.quit();
    }),
      o.app.on('ready', async () => {
        (c = new o.BrowserWindow({
          show: !1,
          width: 1024,
          height: 728
        })).loadURL(`file://${__dirname}/app.html`),
          c.webContents.on('did-finish-load', () => {
            if (!c) throw new Error('"mainWindow" is not defined');
            c.show(), c.focus();
          }),
          c.on('closed', () => {
            c = null;
          });
      });
  },
  './node_modules/7zip/index.js': function(e, t, r) {
    var o,
      n,
      s = r('path').resolve,
      i = r('./node_modules/7zip/package.json').bin;
    e.exports = ((o = i),
    (n = function(e) {
      return s(__dirname, e);
    }),
    Object.keys(o).reduce(function(e, t) {
      return (e[t] = n(o[t])), e;
    }, {}));
  },
  './node_modules/7zip/package.json': function(e) {
    e.exports = {
      name: '7zip',
      version: '0.0.6',
      description: '7zip Windows Package via Node.js',
      keywords: ['7z', '7zip', '7-zip', 'windows', 'install'],
      repository: 'git@github.com:fritx/win-7zip.git',
      bin: { '7z': '7zip-lite/7z.exe' },
      main: 'index.js',
      scripts: { test: 'mocha' },
      license: 'GNU LGPL'
    };
  },
  './node_modules/balanced-match/index.js': function(e, t, r) {
    'use strict';
    function o(e, t, r) {
      e instanceof RegExp && (e = n(e, r)),
        t instanceof RegExp && (t = n(t, r));
      var o = s(e, t, r);
      return (
        o && {
          start: o[0],
          end: o[1],
          pre: r.slice(0, o[0]),
          body: r.slice(o[0] + e.length, o[1]),
          post: r.slice(o[1] + t.length)
        }
      );
    }
    function n(e, t) {
      var r = t.match(e);
      return r ? r[0] : null;
    }
    function s(e, t, r) {
      var o,
        n,
        s,
        i,
        a,
        c = r.indexOf(e),
        u = r.indexOf(t, c + 1),
        l = c;
      if (c >= 0 && u > 0) {
        for (o = [], s = r.length; l >= 0 && !a; )
          l == c
            ? (o.push(l), (c = r.indexOf(e, l + 1)))
            : 1 == o.length
            ? (a = [o.pop(), u])
            : ((n = o.pop()) < s && ((s = n), (i = u)),
              (u = r.indexOf(t, l + 1))),
            (l = c < u && c >= 0 ? c : u);
        o.length && (a = [s, i]);
      }
      return a;
    }
    (e.exports = o), (o.range = s);
  },
  './node_modules/brace-expansion/index.js': function(e, t, r) {
    var o = r('./node_modules/concat-map/index.js'),
      n = r('./node_modules/balanced-match/index.js');
    e.exports = function(e) {
      if (!e) return [];
      '{}' === e.substr(0, 2) && (e = '\\{\\}' + e.substr(2));
      return (function e(t, r) {
        var s = [];
        var i = n('{', '}', t);
        if (!i || /\$$/.test(i.pre)) return [t];
        var c = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body);
        var u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body);
        var d = c || u;
        var v = i.body.indexOf(',') >= 0;
        if (!d && !v)
          return i.post.match(/,.*\}/)
            ? ((t = i.pre + '{' + i.body + a + i.post), e(t))
            : [t];
        var _;
        if (d) _ = i.body.split(/\.\./);
        else if (
          1 ===
            (_ = (function e(t) {
              if (!t) return [''];
              var r = [];
              var o = n('{', '}', t);
              if (!o) return t.split(',');
              var s = o.pre;
              var i = o.body;
              var a = o.post;
              var c = s.split(',');
              c[c.length - 1] += '{' + i + '}';
              var u = e(a);
              a.length && ((c[c.length - 1] += u.shift()), c.push.apply(c, u));
              r.push.apply(r, c);
              return r;
            })(i.body)).length &&
          1 === (_ = e(_[0], !1).map(f)).length
        ) {
          var j = i.post.length ? e(i.post, !1) : [''];
          return j.map(function(e) {
            return i.pre + _[0] + e;
          });
        }
        var y = i.pre;
        var j = i.post.length ? e(i.post, !1) : [''];
        var g;
        if (d) {
          var b = l(_[0]),
            w = l(_[1]),
            E = Math.max(_[0].length, _[1].length),
            x = 3 == _.length ? Math.abs(l(_[2])) : 1,
            O = p,
            S = w < b;
          S && ((x *= -1), (O = m));
          var k = _.some(h);
          g = [];
          for (var A = b; O(A, w); A += x) {
            var T;
            if (u) '\\' === (T = String.fromCharCode(A)) && (T = '');
            else if (((T = String(A)), k)) {
              var P = E - T.length;
              if (P > 0) {
                var R = new Array(P + 1).join('0');
                T = A < 0 ? '-' + R + T.slice(1) : R + T;
              }
            }
            g.push(T);
          }
        } else
          g = o(_, function(t) {
            return e(t, !1);
          });
        for (var L = 0; L < g.length; L++)
          for (var N = 0; N < j.length; N++) {
            var M = y + g[L] + j[N];
            (!r || d || M) && s.push(M);
          }
        return s;
      })(
        (function(e) {
          return e
            .split('\\\\')
            .join(s)
            .split('\\{')
            .join(i)
            .split('\\}')
            .join(a)
            .split('\\,')
            .join(c)
            .split('\\.')
            .join(u);
        })(e),
        !0
      ).map(d);
    };
    var s = '\0SLASH' + Math.random() + '\0',
      i = '\0OPEN' + Math.random() + '\0',
      a = '\0CLOSE' + Math.random() + '\0',
      c = '\0COMMA' + Math.random() + '\0',
      u = '\0PERIOD' + Math.random() + '\0';
    function l(e) {
      return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
    }
    function d(e) {
      return e
        .split(s)
        .join('\\')
        .split(i)
        .join('{')
        .split(a)
        .join('}')
        .split(c)
        .join(',')
        .split(u)
        .join('.');
    }
    function f(e) {
      return '{' + e + '}';
    }
    function h(e) {
      return /^-?0\d/.test(e);
    }
    function p(e, t) {
      return e <= t;
    }
    function m(e, t) {
      return e >= t;
    }
  },
  './node_modules/concat-map/index.js': function(e, t) {
    e.exports = function(e, t) {
      for (var o = [], n = 0; n < e.length; n++) {
        var s = t(e[n], n);
        r(s) ? o.push.apply(o, s) : o.push(s);
      }
      return o;
    };
    var r =
      Array.isArray ||
      function(e) {
        return '[object Array]' === Object.prototype.toString.call(e);
      };
  },
  './node_modules/core-js/modules/_a-function.js': function(e, t) {
    e.exports = function(e) {
      if ('function' != typeof e) throw TypeError(e + ' is not a function!');
      return e;
    };
  },
  './node_modules/core-js/modules/_add-to-unscopables.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_wks.js')('unscopables'),
      n = Array.prototype;
    null == n[o] && r('./node_modules/core-js/modules/_hide.js')(n, o, {}),
      (e.exports = function(e) {
        n[o][e] = !0;
      });
  },
  './node_modules/core-js/modules/_an-object.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_is-object.js');
    e.exports = function(e) {
      if (!o(e)) throw TypeError(e + ' is not an object!');
      return e;
    };
  },
  './node_modules/core-js/modules/_array-includes.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_to-iobject.js'),
      n = r('./node_modules/core-js/modules/_to-length.js'),
      s = r('./node_modules/core-js/modules/_to-absolute-index.js');
    e.exports = function(e) {
      return function(t, r, i) {
        var a,
          c = o(t),
          u = n(c.length),
          l = s(i, u);
        if (e && r != r) {
          for (; u > l; ) if ((a = c[l++]) != a) return !0;
        } else
          for (; u > l; l++)
            if ((e || l in c) && c[l] === r) return e || l || 0;
        return !e && -1;
      };
    };
  },
  './node_modules/core-js/modules/_cof.js': function(e, t) {
    var r = {}.toString;
    e.exports = function(e) {
      return r.call(e).slice(8, -1);
    };
  },
  './node_modules/core-js/modules/_core.js': function(e, t) {
    var r = (e.exports = { version: '2.6.5' });
    'number' == typeof __e && (__e = r);
  },
  './node_modules/core-js/modules/_ctx.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_a-function.js');
    e.exports = function(e, t, r) {
      if ((o(e), void 0 === t)) return e;
      switch (r) {
        case 1:
          return function(r) {
            return e.call(t, r);
          };
        case 2:
          return function(r, o) {
            return e.call(t, r, o);
          };
        case 3:
          return function(r, o, n) {
            return e.call(t, r, o, n);
          };
      }
      return function() {
        return e.apply(t, arguments);
      };
    };
  },
  './node_modules/core-js/modules/_defined.js': function(e, t) {
    e.exports = function(e) {
      if (null == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  },
  './node_modules/core-js/modules/_descriptors.js': function(e, t, r) {
    e.exports = !r('./node_modules/core-js/modules/_fails.js')(function() {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function() {
            return 7;
          }
        }).a
      );
    });
  },
  './node_modules/core-js/modules/_dom-create.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_is-object.js'),
      n = r('./node_modules/core-js/modules/_global.js').document,
      s = o(n) && o(n.createElement);
    e.exports = function(e) {
      return s ? n.createElement(e) : {};
    };
  },
  './node_modules/core-js/modules/_enum-bug-keys.js': function(e, t) {
    e.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
      ','
    );
  },
  './node_modules/core-js/modules/_export.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_global.js'),
      n = r('./node_modules/core-js/modules/_core.js'),
      s = r('./node_modules/core-js/modules/_hide.js'),
      i = r('./node_modules/core-js/modules/_redefine.js'),
      a = r('./node_modules/core-js/modules/_ctx.js'),
      c = function(e, t, r) {
        var u,
          l,
          d,
          f,
          h = e & c.F,
          p = e & c.G,
          m = e & c.S,
          v = e & c.P,
          _ = e & c.B,
          j = p ? o : m ? o[t] || (o[t] = {}) : (o[t] || {}).prototype,
          y = p ? n : n[t] || (n[t] = {}),
          g = y.prototype || (y.prototype = {});
        for (u in (p && (r = t), r))
          (d = ((l = !h && j && void 0 !== j[u]) ? j : r)[u]),
            (f =
              _ && l
                ? a(d, o)
                : v && 'function' == typeof d
                ? a(Function.call, d)
                : d),
            j && i(j, u, d, e & c.U),
            y[u] != d && s(y, u, f),
            v && g[u] != d && (g[u] = d);
      };
    (o.core = n),
      (c.F = 1),
      (c.G = 2),
      (c.S = 4),
      (c.P = 8),
      (c.B = 16),
      (c.W = 32),
      (c.U = 64),
      (c.R = 128),
      (e.exports = c);
  },
  './node_modules/core-js/modules/_fails.js': function(e, t) {
    e.exports = function(e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  },
  './node_modules/core-js/modules/_function-to-string.js': function(e, t, r) {
    e.exports = r('./node_modules/core-js/modules/_shared.js')(
      'native-function-to-string',
      Function.toString
    );
  },
  './node_modules/core-js/modules/_global.js': function(e, t) {
    var r = (e.exports =
      'undefined' != typeof window && window.Math == Math
        ? window
        : 'undefined' != typeof self && self.Math == Math
        ? self
        : Function('return this')());
    'number' == typeof __g && (__g = r);
  },
  './node_modules/core-js/modules/_has.js': function(e, t) {
    var r = {}.hasOwnProperty;
    e.exports = function(e, t) {
      return r.call(e, t);
    };
  },
  './node_modules/core-js/modules/_hide.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_object-dp.js'),
      n = r('./node_modules/core-js/modules/_property-desc.js');
    e.exports = r('./node_modules/core-js/modules/_descriptors.js')
      ? function(e, t, r) {
          return o.f(e, t, n(1, r));
        }
      : function(e, t, r) {
          return (e[t] = r), e;
        };
  },
  './node_modules/core-js/modules/_html.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_global.js').document;
    e.exports = o && o.documentElement;
  },
  './node_modules/core-js/modules/_ie8-dom-define.js': function(e, t, r) {
    e.exports =
      !r('./node_modules/core-js/modules/_descriptors.js') &&
      !r('./node_modules/core-js/modules/_fails.js')(function() {
        return (
          7 !=
          Object.defineProperty(
            r('./node_modules/core-js/modules/_dom-create.js')('div'),
            'a',
            {
              get: function() {
                return 7;
              }
            }
          ).a
        );
      });
  },
  './node_modules/core-js/modules/_iobject.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_cof.js');
    e.exports = Object('z').propertyIsEnumerable(0)
      ? Object
      : function(e) {
          return 'String' == o(e) ? e.split('') : Object(e);
        };
  },
  './node_modules/core-js/modules/_is-object.js': function(e, t) {
    e.exports = function(e) {
      return 'object' == typeof e ? null !== e : 'function' == typeof e;
    };
  },
  './node_modules/core-js/modules/_iter-create.js': function(e, t, r) {
    'use strict';
    var o = r('./node_modules/core-js/modules/_object-create.js'),
      n = r('./node_modules/core-js/modules/_property-desc.js'),
      s = r('./node_modules/core-js/modules/_set-to-string-tag.js'),
      i = {};
    r('./node_modules/core-js/modules/_hide.js')(
      i,
      r('./node_modules/core-js/modules/_wks.js')('iterator'),
      function() {
        return this;
      }
    ),
      (e.exports = function(e, t, r) {
        (e.prototype = o(i, { next: n(1, r) })), s(e, t + ' Iterator');
      });
  },
  './node_modules/core-js/modules/_iter-define.js': function(e, t, r) {
    'use strict';
    var o = r('./node_modules/core-js/modules/_library.js'),
      n = r('./node_modules/core-js/modules/_export.js'),
      s = r('./node_modules/core-js/modules/_redefine.js'),
      i = r('./node_modules/core-js/modules/_hide.js'),
      a = r('./node_modules/core-js/modules/_iterators.js'),
      c = r('./node_modules/core-js/modules/_iter-create.js'),
      u = r('./node_modules/core-js/modules/_set-to-string-tag.js'),
      l = r('./node_modules/core-js/modules/_object-gpo.js'),
      d = r('./node_modules/core-js/modules/_wks.js')('iterator'),
      f = !([].keys && 'next' in [].keys()),
      h = function() {
        return this;
      };
    e.exports = function(e, t, r, p, m, v, _) {
      c(r, t, p);
      var j,
        y,
        g,
        b = function(e) {
          if (!f && e in O) return O[e];
          switch (e) {
            case 'keys':
            case 'values':
              return function() {
                return new r(this, e);
              };
          }
          return function() {
            return new r(this, e);
          };
        },
        w = t + ' Iterator',
        E = 'values' == m,
        x = !1,
        O = e.prototype,
        S = O[d] || O['@@iterator'] || (m && O[m]),
        k = S || b(m),
        A = m ? (E ? b('entries') : k) : void 0,
        T = ('Array' == t && O.entries) || S;
      if (
        (T &&
          (g = l(T.call(new e()))) !== Object.prototype &&
          g.next &&
          (u(g, w, !0), o || 'function' == typeof g[d] || i(g, d, h)),
        E &&
          S &&
          'values' !== S.name &&
          ((x = !0),
          (k = function() {
            return S.call(this);
          })),
        (o && !_) || (!f && !x && O[d]) || i(O, d, k),
        (a[t] = k),
        (a[w] = h),
        m)
      )
        if (
          ((j = {
            values: E ? k : b('values'),
            keys: v ? k : b('keys'),
            entries: A
          }),
          _)
        )
          for (y in j) y in O || s(O, y, j[y]);
        else n(n.P + n.F * (f || x), t, j);
      return j;
    };
  },
  './node_modules/core-js/modules/_iter-step.js': function(e, t) {
    e.exports = function(e, t) {
      return { value: t, done: !!e };
    };
  },
  './node_modules/core-js/modules/_iterators.js': function(e, t) {
    e.exports = {};
  },
  './node_modules/core-js/modules/_library.js': function(e, t) {
    e.exports = !1;
  },
  './node_modules/core-js/modules/_object-create.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_an-object.js'),
      n = r('./node_modules/core-js/modules/_object-dps.js'),
      s = r('./node_modules/core-js/modules/_enum-bug-keys.js'),
      i = r('./node_modules/core-js/modules/_shared-key.js')('IE_PROTO'),
      a = function() {},
      c = function() {
        var e,
          t = r('./node_modules/core-js/modules/_dom-create.js')('iframe'),
          o = s.length;
        for (
          t.style.display = 'none',
            r('./node_modules/core-js/modules/_html.js').appendChild(t),
            t.src = 'javascript:',
            (e = t.contentWindow.document).open(),
            e.write('<script>document.F=Object</script>'),
            e.close(),
            c = e.F;
          o--;

        )
          delete c.prototype[s[o]];
        return c();
      };
    e.exports =
      Object.create ||
      function(e, t) {
        var r;
        return (
          null !== e
            ? ((a.prototype = o(e)),
              (r = new a()),
              (a.prototype = null),
              (r[i] = e))
            : (r = c()),
          void 0 === t ? r : n(r, t)
        );
      };
  },
  './node_modules/core-js/modules/_object-dp.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_an-object.js'),
      n = r('./node_modules/core-js/modules/_ie8-dom-define.js'),
      s = r('./node_modules/core-js/modules/_to-primitive.js'),
      i = Object.defineProperty;
    t.f = r('./node_modules/core-js/modules/_descriptors.js')
      ? Object.defineProperty
      : function(e, t, r) {
          if ((o(e), (t = s(t, !0)), o(r), n))
            try {
              return i(e, t, r);
            } catch (e) {}
          if ('get' in r || 'set' in r)
            throw TypeError('Accessors not supported!');
          return 'value' in r && (e[t] = r.value), e;
        };
  },
  './node_modules/core-js/modules/_object-dps.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_object-dp.js'),
      n = r('./node_modules/core-js/modules/_an-object.js'),
      s = r('./node_modules/core-js/modules/_object-keys.js');
    e.exports = r('./node_modules/core-js/modules/_descriptors.js')
      ? Object.defineProperties
      : function(e, t) {
          n(e);
          for (var r, i = s(t), a = i.length, c = 0; a > c; )
            o.f(e, (r = i[c++]), t[r]);
          return e;
        };
  },
  './node_modules/core-js/modules/_object-gpo.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_has.js'),
      n = r('./node_modules/core-js/modules/_to-object.js'),
      s = r('./node_modules/core-js/modules/_shared-key.js')('IE_PROTO'),
      i = Object.prototype;
    e.exports =
      Object.getPrototypeOf ||
      function(e) {
        return (
          (e = n(e)),
          o(e, s)
            ? e[s]
            : 'function' == typeof e.constructor && e instanceof e.constructor
            ? e.constructor.prototype
            : e instanceof Object
            ? i
            : null
        );
      };
  },
  './node_modules/core-js/modules/_object-keys-internal.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_has.js'),
      n = r('./node_modules/core-js/modules/_to-iobject.js'),
      s = r('./node_modules/core-js/modules/_array-includes.js')(!1),
      i = r('./node_modules/core-js/modules/_shared-key.js')('IE_PROTO');
    e.exports = function(e, t) {
      var r,
        a = n(e),
        c = 0,
        u = [];
      for (r in a) r != i && o(a, r) && u.push(r);
      for (; t.length > c; ) o(a, (r = t[c++])) && (~s(u, r) || u.push(r));
      return u;
    };
  },
  './node_modules/core-js/modules/_object-keys.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_object-keys-internal.js'),
      n = r('./node_modules/core-js/modules/_enum-bug-keys.js');
    e.exports =
      Object.keys ||
      function(e) {
        return o(e, n);
      };
  },
  './node_modules/core-js/modules/_property-desc.js': function(e, t) {
    e.exports = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  },
  './node_modules/core-js/modules/_redefine.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_global.js'),
      n = r('./node_modules/core-js/modules/_hide.js'),
      s = r('./node_modules/core-js/modules/_has.js'),
      i = r('./node_modules/core-js/modules/_uid.js')('src'),
      a = r('./node_modules/core-js/modules/_function-to-string.js'),
      c = ('' + a).split('toString');
    (r('./node_modules/core-js/modules/_core.js').inspectSource = function(e) {
      return a.call(e);
    }),
      (e.exports = function(e, t, r, a) {
        var u = 'function' == typeof r;
        u && (s(r, 'name') || n(r, 'name', t)),
          e[t] !== r &&
            (u && (s(r, i) || n(r, i, e[t] ? '' + e[t] : c.join(String(t)))),
            e === o
              ? (e[t] = r)
              : a
              ? e[t]
                ? (e[t] = r)
                : n(e, t, r)
              : (delete e[t], n(e, t, r)));
      })(Function.prototype, 'toString', function() {
        return ('function' == typeof this && this[i]) || a.call(this);
      });
  },
  './node_modules/core-js/modules/_set-to-string-tag.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_object-dp.js').f,
      n = r('./node_modules/core-js/modules/_has.js'),
      s = r('./node_modules/core-js/modules/_wks.js')('toStringTag');
    e.exports = function(e, t, r) {
      e &&
        !n((e = r ? e : e.prototype), s) &&
        o(e, s, { configurable: !0, value: t });
    };
  },
  './node_modules/core-js/modules/_shared-key.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_shared.js')('keys'),
      n = r('./node_modules/core-js/modules/_uid.js');
    e.exports = function(e) {
      return o[e] || (o[e] = n(e));
    };
  },
  './node_modules/core-js/modules/_shared.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_core.js'),
      n = r('./node_modules/core-js/modules/_global.js'),
      s = n['__core-js_shared__'] || (n['__core-js_shared__'] = {});
    (e.exports = function(e, t) {
      return s[e] || (s[e] = void 0 !== t ? t : {});
    })('versions', []).push({
      version: o.version,
      mode: r('./node_modules/core-js/modules/_library.js') ? 'pure' : 'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
  },
  './node_modules/core-js/modules/_to-absolute-index.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_to-integer.js'),
      n = Math.max,
      s = Math.min;
    e.exports = function(e, t) {
      return (e = o(e)) < 0 ? n(e + t, 0) : s(e, t);
    };
  },
  './node_modules/core-js/modules/_to-integer.js': function(e, t) {
    var r = Math.ceil,
      o = Math.floor;
    e.exports = function(e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? o : r)(e);
    };
  },
  './node_modules/core-js/modules/_to-iobject.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_iobject.js'),
      n = r('./node_modules/core-js/modules/_defined.js');
    e.exports = function(e) {
      return o(n(e));
    };
  },
  './node_modules/core-js/modules/_to-length.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_to-integer.js'),
      n = Math.min;
    e.exports = function(e) {
      return e > 0 ? n(o(e), 9007199254740991) : 0;
    };
  },
  './node_modules/core-js/modules/_to-object.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_defined.js');
    e.exports = function(e) {
      return Object(o(e));
    };
  },
  './node_modules/core-js/modules/_to-primitive.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_is-object.js');
    e.exports = function(e, t) {
      if (!o(e)) return e;
      var r, n;
      if (t && 'function' == typeof (r = e.toString) && !o((n = r.call(e))))
        return n;
      if ('function' == typeof (r = e.valueOf) && !o((n = r.call(e)))) return n;
      if (!t && 'function' == typeof (r = e.toString) && !o((n = r.call(e))))
        return n;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  './node_modules/core-js/modules/_uid.js': function(e, t) {
    var r = 0,
      o = Math.random();
    e.exports = function(e) {
      return 'Symbol('.concat(
        void 0 === e ? '' : e,
        ')_',
        (++r + o).toString(36)
      );
    };
  },
  './node_modules/core-js/modules/_wks.js': function(e, t, r) {
    var o = r('./node_modules/core-js/modules/_shared.js')('wks'),
      n = r('./node_modules/core-js/modules/_uid.js'),
      s = r('./node_modules/core-js/modules/_global.js').Symbol,
      i = 'function' == typeof s;
    (e.exports = function(e) {
      return o[e] || (o[e] = (i && s[e]) || (i ? s : n)('Symbol.' + e));
    }).store = o;
  },
  './node_modules/core-js/modules/es6.array.iterator.js': function(e, t, r) {
    'use strict';
    var o = r('./node_modules/core-js/modules/_add-to-unscopables.js'),
      n = r('./node_modules/core-js/modules/_iter-step.js'),
      s = r('./node_modules/core-js/modules/_iterators.js'),
      i = r('./node_modules/core-js/modules/_to-iobject.js');
    (e.exports = r('./node_modules/core-js/modules/_iter-define.js')(
      Array,
      'Array',
      function(e, t) {
        (this._t = i(e)), (this._i = 0), (this._k = t);
      },
      function() {
        var e = this._t,
          t = this._k,
          r = this._i++;
        return !e || r >= e.length
          ? ((this._t = void 0), n(1))
          : n(0, 'keys' == t ? r : 'values' == t ? e[r] : [r, e[r]]);
      },
      'values'
    )),
      (s.Arguments = s.Array),
      o('keys'),
      o('values'),
      o('entries');
  },
  './node_modules/core-js/modules/web.dom.iterable.js': function(e, t, r) {
    for (
      var o = r('./node_modules/core-js/modules/es6.array.iterator.js'),
        n = r('./node_modules/core-js/modules/_object-keys.js'),
        s = r('./node_modules/core-js/modules/_redefine.js'),
        i = r('./node_modules/core-js/modules/_global.js'),
        a = r('./node_modules/core-js/modules/_hide.js'),
        c = r('./node_modules/core-js/modules/_iterators.js'),
        u = r('./node_modules/core-js/modules/_wks.js'),
        l = u('iterator'),
        d = u('toStringTag'),
        f = c.Array,
        h = {
          CSSRuleList: !0,
          CSSStyleDeclaration: !1,
          CSSValueList: !1,
          ClientRectList: !1,
          DOMRectList: !1,
          DOMStringList: !1,
          DOMTokenList: !0,
          DataTransferItemList: !1,
          FileList: !1,
          HTMLAllCollection: !1,
          HTMLCollection: !1,
          HTMLFormElement: !1,
          HTMLSelectElement: !1,
          MediaList: !0,
          MimeTypeArray: !1,
          NamedNodeMap: !1,
          NodeList: !0,
          PaintRequestList: !1,
          Plugin: !1,
          PluginArray: !1,
          SVGLengthList: !1,
          SVGNumberList: !1,
          SVGPathSegList: !1,
          SVGPointList: !1,
          SVGStringList: !1,
          SVGTransformList: !1,
          SourceBufferList: !1,
          StyleSheetList: !0,
          TextTrackCueList: !1,
          TextTrackList: !1,
          TouchList: !1
        },
        p = n(h),
        m = 0;
      m < p.length;
      m++
    ) {
      var v,
        _ = p[m],
        j = h[_],
        y = i[_],
        g = y && y.prototype;
      if (g && (g[l] || a(g, l, f), g[d] || a(g, d, _), (c[_] = f), j))
        for (v in o) g[v] || s(g, v, o[v], !0);
    }
  },
  './node_modules/cross-unzip/index.js': function(e, t, r) {
    'use strict';
    var o = r('child_process').spawn,
      n = Array.prototype.slice,
      s =
        'win32' === process.platform
          ? function(e, t, o) {
              i(
                r('./node_modules/7zip/index.js')['7z'],
                ['x', e, '-y', '-o' + t],
                o
              );
            }
          : function(e, t, r) {
              i('unzip', ['-o', e, '-d', t], r);
            };
    function i(e, t, r) {
      var s, i;
      (s = r),
        (i = !1),
        (r = function() {
          i || ((i = !0), s.apply(this, n.call(arguments)));
        });
      var a = o(e, t, { stdio: 'ignore' });
      a.on('error', function(e) {
        r(e);
      }),
        a.on('exit', function(e) {
          r(e ? new Error('Exited with code ' + e) : null);
        });
    }
    (s.unzip = s), (e.exports = s);
  },
  './node_modules/electron-devtools-installer/dist/downloadChromeExtension.js': function(
    e,
    t,
    r
  ) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var o = c(r('fs')),
      n = c(r('path')),
      s = c(r('./node_modules/rimraf/rimraf.js')),
      i = c(r('./node_modules/cross-unzip/index.js')),
      a = r('./node_modules/electron-devtools-installer/dist/utils.js');
    function c(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.default = function e(t, r) {
      var c =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
        u = (0, a.getPath)();
      o.default.existsSync(u) || o.default.mkdirSync(u);
      var l = n.default.resolve(u + '/' + t);
      return new Promise(function(u, d) {
        if (!o.default.existsSync(l) || r) {
          o.default.existsSync(l) && s.default.sync(l);
          var f =
              'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' +
              t +
              '%26uc&prodversion=32',
            h = n.default.resolve(l + '.crx');
          (0, a.downloadFile)(f, h)
            .then(function() {
              (0, i.default)(h, l, function(e) {
                if (
                  e &&
                  !o.default.existsSync(n.default.resolve(l, 'manifest.json'))
                )
                  return d(e);
                (0, a.changePermissions)(l, 755), u(l);
              });
            })
            .catch(function(o) {
              if (
                (console.log(
                  'Failed to fetch extension, trying ' + (c - 1) + ' more times'
                ),
                c <= 1)
              )
                return d(o);
              setTimeout(function() {
                e(t, r, c - 1)
                  .then(u)
                  .catch(d);
              }, 200);
            });
        } else u(l);
      });
    };
  },
  './node_modules/electron-devtools-installer/dist/index.js': function(
    e,
    t,
    r
  ) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.MOBX_DEVTOOLS = t.APOLLO_DEVELOPER_TOOLS = t.CYCLEJS_DEVTOOL = t.REACT_PERF = t.REDUX_DEVTOOLS = t.VUEJS_DEVTOOLS = t.ANGULARJS_BATARANG = t.JQUERY_DEBUGGER = t.BACKBONE_DEBUGGER = t.REACT_DEVELOPER_TOOLS = t.EMBER_INSPECTOR = void 0);
    var o =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      n = r('electron'),
      s = d(n),
      i = d(r('fs')),
      a = d(r('path')),
      c = d(r('./node_modules/semver/semver.js')),
      u = d(
        r(
          './node_modules/electron-devtools-installer/dist/downloadChromeExtension.js'
        )
      ),
      l = r('./node_modules/electron-devtools-installer/dist/utils.js');
    function d(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var f = (n.remote || s.default).BrowserWindow,
      h = {},
      p = a.default.resolve((0, l.getPath)(), 'IDMap.json');
    if (i.default.existsSync(p))
      try {
        h = JSON.parse(i.default.readFileSync(p, 'utf8'));
      } catch (e) {
        console.error(
          'electron-devtools-installer: Invalid JSON present in the IDMap file'
        );
      }
    t.default = function e(t) {
      var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      if (Array.isArray(t))
        return Promise.all(
          t.map(function(t) {
            return e(t, r);
          })
        );
      var n = void 0;
      if ('object' === (void 0 === t ? 'undefined' : o(t)) && t.id) {
        n = t.id;
        var s = process.versions.electron.split('-')[0];
        if (!c.default.satisfies(s, t.electron))
          return Promise.reject(
            new Error(
              'Version of Electron: ' +
                s +
                ' does not match required range ' +
                t.electron +
                ' for extension ' +
                n
            )
          );
      } else {
        if ('string' != typeof t)
          return Promise.reject(
            new Error('Invalid extensionReference passed in: "' + t + '"')
          );
        n = t;
      }
      var a = h[n],
        l = a && f.getDevToolsExtensions && f.getDevToolsExtensions()[a];
      return !r && l
        ? Promise.resolve(h[n])
        : (0, u.default)(n, r).then(function(e) {
            l && f.removeDevToolsExtension(a);
            var t,
              r,
              o,
              s = f.addDevToolsExtension(e);
            return (
              i.default.writeFileSync(
                p,
                JSON.stringify(
                  Object.assign(
                    h,
                    ((o = s),
                    (r = n) in (t = {})
                      ? Object.defineProperty(t, r, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0
                        })
                      : (t[r] = o),
                    t)
                  )
                )
              ),
              Promise.resolve(s)
            );
          });
    };
    (t.EMBER_INSPECTOR = {
      id: 'bmdblncegkenkacieihfhpjfppoconhi',
      electron: '>=1.2.1'
    }),
      (t.REACT_DEVELOPER_TOOLS = {
        id: 'fmkadmapgofadopljbjfkapdkoienihi',
        electron: '>=1.2.1'
      }),
      (t.BACKBONE_DEBUGGER = {
        id: 'bhljhndlimiafopmmhjlgfpnnchjjbhd',
        electron: '>=1.2.1'
      }),
      (t.JQUERY_DEBUGGER = {
        id: 'dbhhnnnpaeobfddmlalhnehgclcmjimi',
        electron: '>=1.2.1'
      }),
      (t.ANGULARJS_BATARANG = {
        id: 'ighdmehidhipcmcojjgiloacoafjmpfk',
        electron: '>=1.2.1'
      }),
      (t.VUEJS_DEVTOOLS = {
        id: 'nhdogjmejiglipccpnnnanhbledajbpd',
        electron: '>=1.2.1'
      }),
      (t.REDUX_DEVTOOLS = {
        id: 'lmhkpmbekcpmknklioeibfkpmmfibljd',
        electron: '>=1.2.1'
      }),
      (t.REACT_PERF = {
        id: 'hacmcodfllhbnekmghgdlplbdnahmhmm',
        electron: '>=1.2.6'
      }),
      (t.CYCLEJS_DEVTOOL = {
        id: 'dfgplfmhhmdekalbpejekgfegkonjpfp',
        electron: '>=1.2.1'
      }),
      (t.APOLLO_DEVELOPER_TOOLS = {
        id: 'jdkknkkbebbapilgoeccciglkfbmbnfm',
        electron: '>=1.2.1'
      }),
      (t.MOBX_DEVTOOLS = {
        id: 'pfgnfdagidkfgccljigdamigbcnndkod',
        electron: '>=1.2.1'
      });
  },
  './node_modules/electron-devtools-installer/dist/utils.js': function(
    e,
    t,
    r
  ) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.changePermissions = t.downloadFile = t.getPath = void 0);
    var o = r('electron'),
      n = c(o),
      s = c(r('fs')),
      i = c(r('path')),
      a = c(r('https'));
    function c(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.getPath = function() {
      var e = (o.remote || n.default).app.getPath('userData');
      return i.default.resolve(e + '/extensions');
    };
    var u = (o.remote || n.default).net,
      l = u ? u.request : a.default.get;
    (t.downloadFile = function e(t, r) {
      return new Promise(function(o, n) {
        var i = l(t);
        i.on('response', function(t) {
          if (t.statusCode >= 300 && t.statusCode < 400 && t.headers.location)
            return e(t.headers.location, r)
              .then(o)
              .catch(n);
          t.pipe(s.default.createWriteStream(r)).on('close', o);
        }),
          i.on('error', n),
          i.end();
      });
    }),
      (t.changePermissions = function e(t, r) {
        s.default.readdirSync(t).forEach(function(o) {
          var n = i.default.join(t, o);
          s.default.chmodSync(n, parseInt(r, 8)),
            s.default.statSync(n).isDirectory() && e(n, r);
        });
      });
  },
  './node_modules/fs.realpath/index.js': function(e, t, r) {
    (e.exports = l),
      (l.realpath = l),
      (l.sync = d),
      (l.realpathSync = d),
      (l.monkeypatch = function() {
        (o.realpath = l), (o.realpathSync = d);
      }),
      (l.unmonkeypatch = function() {
        (o.realpath = n), (o.realpathSync = s);
      });
    var o = r('fs'),
      n = o.realpath,
      s = o.realpathSync,
      i = process.version,
      a = /^v[0-5]\./.test(i),
      c = r('./node_modules/fs.realpath/old.js');
    function u(e) {
      return (
        e &&
        'realpath' === e.syscall &&
        ('ELOOP' === e.code || 'ENOMEM' === e.code || 'ENAMETOOLONG' === e.code)
      );
    }
    function l(e, t, r) {
      if (a) return n(e, t, r);
      'function' == typeof t && ((r = t), (t = null)),
        n(e, t, function(o, n) {
          u(o) ? c.realpath(e, t, r) : r(o, n);
        });
    }
    function d(e, t) {
      if (a) return s(e, t);
      try {
        return s(e, t);
      } catch (r) {
        if (u(r)) return c.realpathSync(e, t);
        throw r;
      }
    }
  },
  './node_modules/fs.realpath/old.js': function(e, t, r) {
    var o = r('path'),
      n = 'win32' === process.platform,
      s = r('fs'),
      i = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function a(e) {
      return 'function' == typeof e
        ? e
        : (function() {
            var e;
            if (i) {
              var t = new Error();
              e = function(e) {
                e && ((t.message = e.message), r((e = t)));
              };
            } else e = r;
            return e;
            function r(e) {
              if (e) {
                if (process.throwDeprecation) throw e;
                if (!process.noDeprecation) {
                  var t = 'fs: missing callback ' + (e.stack || e.message);
                  process.traceDeprecation
                    ? console.trace(t)
                    : console.error(t);
                }
              }
            }
          })();
    }
    o.normalize;
    if (n) var c = /(.*?)(?:[\/\\]+|$)/g;
    else c = /(.*?)(?:[\/]+|$)/g;
    if (n) var u = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    else u = /^[\/]*/;
    (t.realpathSync = function(e, t) {
      if (((e = o.resolve(e)), t && Object.prototype.hasOwnProperty.call(t, e)))
        return t[e];
      var r,
        i,
        a,
        l,
        d = e,
        f = {},
        h = {};
      function p() {
        var t = u.exec(e);
        (r = t[0].length),
          (i = t[0]),
          (a = t[0]),
          (l = ''),
          n && !h[a] && (s.lstatSync(a), (h[a] = !0));
      }
      for (p(); r < e.length; ) {
        c.lastIndex = r;
        var m = c.exec(e);
        if (
          ((l = i),
          (i += m[0]),
          (a = l + m[1]),
          (r = c.lastIndex),
          !(h[a] || (t && t[a] === a)))
        ) {
          var v;
          if (t && Object.prototype.hasOwnProperty.call(t, a)) v = t[a];
          else {
            var _ = s.lstatSync(a);
            if (!_.isSymbolicLink()) {
              (h[a] = !0), t && (t[a] = a);
              continue;
            }
            var j = null;
            if (!n) {
              var y = _.dev.toString(32) + ':' + _.ino.toString(32);
              f.hasOwnProperty(y) && (j = f[y]);
            }
            null === j && (s.statSync(a), (j = s.readlinkSync(a))),
              (v = o.resolve(l, j)),
              t && (t[a] = v),
              n || (f[y] = j);
          }
          (e = o.resolve(v, e.slice(r))), p();
        }
      }
      return t && (t[d] = e), e;
    }),
      (t.realpath = function(e, t, r) {
        if (
          ('function' != typeof r && ((r = a(t)), (t = null)),
          (e = o.resolve(e)),
          t && Object.prototype.hasOwnProperty.call(t, e))
        )
          return process.nextTick(r.bind(null, null, t[e]));
        var i,
          l,
          d,
          f,
          h = e,
          p = {},
          m = {};
        function v() {
          var t = u.exec(e);
          (i = t[0].length),
            (l = t[0]),
            (d = t[0]),
            (f = ''),
            n && !m[d]
              ? s.lstat(d, function(e) {
                  if (e) return r(e);
                  (m[d] = !0), _();
                })
              : process.nextTick(_);
        }
        function _() {
          if (i >= e.length) return t && (t[h] = e), r(null, e);
          c.lastIndex = i;
          var o = c.exec(e);
          return (
            (f = l),
            (l += o[0]),
            (d = f + o[1]),
            (i = c.lastIndex),
            m[d] || (t && t[d] === d)
              ? process.nextTick(_)
              : t && Object.prototype.hasOwnProperty.call(t, d)
              ? g(t[d])
              : s.lstat(d, j)
          );
        }
        function j(e, o) {
          if (e) return r(e);
          if (!o.isSymbolicLink())
            return (m[d] = !0), t && (t[d] = d), process.nextTick(_);
          if (!n) {
            var i = o.dev.toString(32) + ':' + o.ino.toString(32);
            if (p.hasOwnProperty(i)) return y(null, p[i], d);
          }
          s.stat(d, function(e) {
            if (e) return r(e);
            s.readlink(d, function(e, t) {
              n || (p[i] = t), y(e, t);
            });
          });
        }
        function y(e, n, s) {
          if (e) return r(e);
          var i = o.resolve(f, n);
          t && (t[s] = i), g(i);
        }
        function g(t) {
          (e = o.resolve(t, e.slice(i))), v();
        }
        v();
      });
  },
  './node_modules/glob/common.js': function(e, t, r) {
    function o(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    (t.alphasort = u),
      (t.alphasorti = c),
      (t.setopts = function(e, t, r) {
        r || (r = {});
        if (r.matchBase && -1 === t.indexOf('/')) {
          if (r.noglobstar) throw new Error('base matching requires globstar');
          t = '**/' + t;
        }
        (e.silent = !!r.silent),
          (e.pattern = t),
          (e.strict = !1 !== r.strict),
          (e.realpath = !!r.realpath),
          (e.realpathCache = r.realpathCache || Object.create(null)),
          (e.follow = !!r.follow),
          (e.dot = !!r.dot),
          (e.mark = !!r.mark),
          (e.nodir = !!r.nodir),
          e.nodir && (e.mark = !0);
        (e.sync = !!r.sync),
          (e.nounique = !!r.nounique),
          (e.nonull = !!r.nonull),
          (e.nosort = !!r.nosort),
          (e.nocase = !!r.nocase),
          (e.stat = !!r.stat),
          (e.noprocess = !!r.noprocess),
          (e.absolute = !!r.absolute),
          (e.maxLength = r.maxLength || 1 / 0),
          (e.cache = r.cache || Object.create(null)),
          (e.statCache = r.statCache || Object.create(null)),
          (e.symlinks = r.symlinks || Object.create(null)),
          (function(e, t) {
            (e.ignore = t.ignore || []),
              Array.isArray(e.ignore) || (e.ignore = [e.ignore]);
            e.ignore.length && (e.ignore = e.ignore.map(l));
          })(e, r),
          (e.changedCwd = !1);
        var s = process.cwd();
        o(r, 'cwd')
          ? ((e.cwd = n.resolve(r.cwd)), (e.changedCwd = e.cwd !== s))
          : (e.cwd = s);
        (e.root = r.root || n.resolve(e.cwd, '/')),
          (e.root = n.resolve(e.root)),
          'win32' === process.platform && (e.root = e.root.replace(/\\/g, '/'));
        (e.cwdAbs = i(e.cwd) ? e.cwd : d(e, e.cwd)),
          'win32' === process.platform &&
            (e.cwdAbs = e.cwdAbs.replace(/\\/g, '/'));
        (e.nomount = !!r.nomount),
          (r.nonegate = !0),
          (r.nocomment = !0),
          (e.minimatch = new a(t, r)),
          (e.options = e.minimatch.options);
      }),
      (t.ownProp = o),
      (t.makeAbs = d),
      (t.finish = function(e) {
        for (
          var t = e.nounique,
            r = t ? [] : Object.create(null),
            o = 0,
            n = e.matches.length;
          o < n;
          o++
        ) {
          var s = e.matches[o];
          if (s && 0 !== Object.keys(s).length) {
            var i = Object.keys(s);
            t
              ? r.push.apply(r, i)
              : i.forEach(function(e) {
                  r[e] = !0;
                });
          } else if (e.nonull) {
            var a = e.minimatch.globSet[o];
            t ? r.push(a) : (r[a] = !0);
          }
        }
        t || (r = Object.keys(r));
        e.nosort || (r = r.sort(e.nocase ? c : u));
        if (e.mark) {
          for (var o = 0; o < r.length; o++) r[o] = e._mark(r[o]);
          e.nodir &&
            (r = r.filter(function(t) {
              var r = !/\/$/.test(t),
                o = e.cache[t] || e.cache[d(e, t)];
              return r && o && (r = 'DIR' !== o && !Array.isArray(o)), r;
            }));
        }
        e.ignore.length &&
          (r = r.filter(function(t) {
            return !f(e, t);
          }));
        e.found = r;
      }),
      (t.mark = function(e, t) {
        var r = d(e, t),
          o = e.cache[r],
          n = t;
        if (o) {
          var s = 'DIR' === o || Array.isArray(o),
            i = '/' === t.slice(-1);
          if (
            (s && !i ? (n += '/') : !s && i && (n = n.slice(0, -1)), n !== t)
          ) {
            var a = d(e, n);
            (e.statCache[a] = e.statCache[r]), (e.cache[a] = e.cache[r]);
          }
        }
        return n;
      }),
      (t.isIgnored = f),
      (t.childrenIgnored = function(e, t) {
        return (
          !!e.ignore.length &&
          e.ignore.some(function(e) {
            return !(!e.gmatcher || !e.gmatcher.match(t));
          })
        );
      });
    var n = r('path'),
      s = r('./node_modules/minimatch/minimatch.js'),
      i = r('./node_modules/path-is-absolute/index.js'),
      a = s.Minimatch;
    function c(e, t) {
      return e.toLowerCase().localeCompare(t.toLowerCase());
    }
    function u(e, t) {
      return e.localeCompare(t);
    }
    function l(e) {
      var t = null;
      if ('/**' === e.slice(-3)) {
        var r = e.replace(/(\/\*\*)+$/, '');
        t = new a(r, { dot: !0 });
      }
      return { matcher: new a(e, { dot: !0 }), gmatcher: t };
    }
    function d(e, t) {
      var r = t;
      return (
        (r =
          '/' === t.charAt(0)
            ? n.join(e.root, t)
            : i(t) || '' === t
            ? t
            : e.changedCwd
            ? n.resolve(e.cwd, t)
            : n.resolve(t)),
        'win32' === process.platform && (r = r.replace(/\\/g, '/')),
        r
      );
    }
    function f(e, t) {
      return (
        !!e.ignore.length &&
        e.ignore.some(function(e) {
          return e.matcher.match(t) || !(!e.gmatcher || !e.gmatcher.match(t));
        })
      );
    }
  },
  './node_modules/glob/glob.js': function(e, t, r) {
    e.exports = y;
    var o = r('fs'),
      n = r('./node_modules/fs.realpath/index.js'),
      s = r('./node_modules/minimatch/minimatch.js'),
      i = (s.Minimatch, r('./node_modules/inherits/inherits.js')),
      a = r('events').EventEmitter,
      c = r('path'),
      u = r('assert'),
      l = r('./node_modules/path-is-absolute/index.js'),
      d = r('./node_modules/glob/sync.js'),
      f = r('./node_modules/glob/common.js'),
      h = (f.alphasort, f.alphasorti, f.setopts),
      p = f.ownProp,
      m = r('./node_modules/inflight/inflight.js'),
      v = (r('util'), f.childrenIgnored),
      _ = f.isIgnored,
      j = r('./node_modules/once/once.js');
    function y(e, t, r) {
      if (
        ('function' == typeof t && ((r = t), (t = {})), t || (t = {}), t.sync)
      ) {
        if (r) throw new TypeError('callback provided to sync glob');
        return d(e, t);
      }
      return new b(e, t, r);
    }
    y.sync = d;
    var g = (y.GlobSync = d.GlobSync);
    function b(e, t, r) {
      if (('function' == typeof t && ((r = t), (t = null)), t && t.sync)) {
        if (r) throw new TypeError('callback provided to sync glob');
        return new g(e, t);
      }
      if (!(this instanceof b)) return new b(e, t, r);
      h(this, e, t), (this._didRealPath = !1);
      var o = this.minimatch.set.length;
      (this.matches = new Array(o)),
        'function' == typeof r &&
          ((r = j(r)),
          this.on('error', r),
          this.on('end', function(e) {
            r(null, e);
          }));
      var n = this;
      if (
        ((this._processing = 0),
        (this._emitQueue = []),
        (this._processQueue = []),
        (this.paused = !1),
        this.noprocess)
      )
        return this;
      if (0 === o) return a();
      for (var s = !0, i = 0; i < o; i++)
        this._process(this.minimatch.set[i], i, !1, a);
      function a() {
        --n._processing,
          n._processing <= 0 &&
            (s
              ? process.nextTick(function() {
                  n._finish();
                })
              : n._finish());
      }
      s = !1;
    }
    (y.glob = y),
      (y.hasMagic = function(e, t) {
        var r = (function(e, t) {
          if (null === t || 'object' != typeof t) return e;
          for (var r = Object.keys(t), o = r.length; o--; ) e[r[o]] = t[r[o]];
          return e;
        })({}, t);
        r.noprocess = !0;
        var o = new b(e, r).minimatch.set;
        if (!e) return !1;
        if (o.length > 1) return !0;
        for (var n = 0; n < o[0].length; n++)
          if ('string' != typeof o[0][n]) return !0;
        return !1;
      }),
      (y.Glob = b),
      i(b, a),
      (b.prototype._finish = function() {
        if ((u(this instanceof b), !this.aborted)) {
          if (this.realpath && !this._didRealpath) return this._realpath();
          f.finish(this), this.emit('end', this.found);
        }
      }),
      (b.prototype._realpath = function() {
        if (!this._didRealpath) {
          this._didRealpath = !0;
          var e = this.matches.length;
          if (0 === e) return this._finish();
          for (var t = this, r = 0; r < this.matches.length; r++)
            this._realpathSet(r, o);
        }
        function o() {
          0 == --e && t._finish();
        }
      }),
      (b.prototype._realpathSet = function(e, t) {
        var r = this.matches[e];
        if (!r) return t();
        var o = Object.keys(r),
          s = this,
          i = o.length;
        if (0 === i) return t();
        var a = (this.matches[e] = Object.create(null));
        o.forEach(function(r, o) {
          (r = s._makeAbs(r)),
            n.realpath(r, s.realpathCache, function(o, n) {
              o
                ? 'stat' === o.syscall
                  ? (a[r] = !0)
                  : s.emit('error', o)
                : (a[n] = !0),
                0 == --i && ((s.matches[e] = a), t());
            });
        });
      }),
      (b.prototype._mark = function(e) {
        return f.mark(this, e);
      }),
      (b.prototype._makeAbs = function(e) {
        return f.makeAbs(this, e);
      }),
      (b.prototype.abort = function() {
        (this.aborted = !0), this.emit('abort');
      }),
      (b.prototype.pause = function() {
        this.paused || ((this.paused = !0), this.emit('pause'));
      }),
      (b.prototype.resume = function() {
        if (this.paused) {
          if (
            (this.emit('resume'), (this.paused = !1), this._emitQueue.length)
          ) {
            var e = this._emitQueue.slice(0);
            this._emitQueue.length = 0;
            for (var t = 0; t < e.length; t++) {
              var r = e[t];
              this._emitMatch(r[0], r[1]);
            }
          }
          if (this._processQueue.length) {
            var o = this._processQueue.slice(0);
            this._processQueue.length = 0;
            for (t = 0; t < o.length; t++) {
              var n = o[t];
              this._processing--, this._process(n[0], n[1], n[2], n[3]);
            }
          }
        }
      }),
      (b.prototype._process = function(e, t, r, o) {
        if ((u(this instanceof b), u('function' == typeof o), !this.aborted))
          if ((this._processing++, this.paused))
            this._processQueue.push([e, t, r, o]);
          else {
            for (var n, i = 0; 'string' == typeof e[i]; ) i++;
            switch (i) {
              case e.length:
                return void this._processSimple(e.join('/'), t, o);
              case 0:
                n = null;
                break;
              default:
                n = e.slice(0, i).join('/');
            }
            var a,
              c = e.slice(i);
            null === n
              ? (a = '.')
              : l(n) || l(e.join('/'))
              ? ((n && l(n)) || (n = '/' + n), (a = n))
              : (a = n);
            var d = this._makeAbs(a);
            if (v(this, a)) return o();
            c[0] === s.GLOBSTAR
              ? this._processGlobStar(n, a, d, c, t, r, o)
              : this._processReaddir(n, a, d, c, t, r, o);
          }
      }),
      (b.prototype._processReaddir = function(e, t, r, o, n, s, i) {
        var a = this;
        this._readdir(r, s, function(c, u) {
          return a._processReaddir2(e, t, r, o, n, s, u, i);
        });
      }),
      (b.prototype._processReaddir2 = function(e, t, r, o, n, s, i, a) {
        if (!i) return a();
        for (
          var u = o[0],
            l = !!this.minimatch.negate,
            d = u._glob,
            f = this.dot || '.' === d.charAt(0),
            h = [],
            p = 0;
          p < i.length;
          p++
        ) {
          if ('.' !== (v = i[p]).charAt(0) || f)
            (l && !e ? !v.match(u) : v.match(u)) && h.push(v);
        }
        var m = h.length;
        if (0 === m) return a();
        if (1 === o.length && !this.mark && !this.stat) {
          this.matches[n] || (this.matches[n] = Object.create(null));
          for (p = 0; p < m; p++) {
            var v = h[p];
            e && (v = '/' !== e ? e + '/' + v : e + v),
              '/' !== v.charAt(0) || this.nomount || (v = c.join(this.root, v)),
              this._emitMatch(n, v);
          }
          return a();
        }
        o.shift();
        for (p = 0; p < m; p++) {
          v = h[p];
          e && (v = '/' !== e ? e + '/' + v : e + v),
            this._process([v].concat(o), n, s, a);
        }
        a();
      }),
      (b.prototype._emitMatch = function(e, t) {
        if (!this.aborted && !_(this, t))
          if (this.paused) this._emitQueue.push([e, t]);
          else {
            var r = l(t) ? t : this._makeAbs(t);
            if (
              (this.mark && (t = this._mark(t)),
              this.absolute && (t = r),
              !this.matches[e][t])
            ) {
              if (this.nodir) {
                var o = this.cache[r];
                if ('DIR' === o || Array.isArray(o)) return;
              }
              this.matches[e][t] = !0;
              var n = this.statCache[r];
              n && this.emit('stat', t, n), this.emit('match', t);
            }
          }
      }),
      (b.prototype._readdirInGlobStar = function(e, t) {
        if (!this.aborted) {
          if (this.follow) return this._readdir(e, !1, t);
          var r = this,
            n = m('lstat\0' + e, function(o, n) {
              if (o && 'ENOENT' === o.code) return t();
              var s = n && n.isSymbolicLink();
              (r.symlinks[e] = s),
                s || !n || n.isDirectory()
                  ? r._readdir(e, !1, t)
                  : ((r.cache[e] = 'FILE'), t());
            });
          n && o.lstat(e, n);
        }
      }),
      (b.prototype._readdir = function(e, t, r) {
        if (!this.aborted && (r = m('readdir\0' + e + '\0' + t, r))) {
          if (t && !p(this.symlinks, e)) return this._readdirInGlobStar(e, r);
          if (p(this.cache, e)) {
            var n = this.cache[e];
            if (!n || 'FILE' === n) return r();
            if (Array.isArray(n)) return r(null, n);
          }
          o.readdir(
            e,
            (function(e, t, r) {
              return function(o, n) {
                o ? e._readdirError(t, o, r) : e._readdirEntries(t, n, r);
              };
            })(this, e, r)
          );
        }
      }),
      (b.prototype._readdirEntries = function(e, t, r) {
        if (!this.aborted) {
          if (!this.mark && !this.stat)
            for (var o = 0; o < t.length; o++) {
              var n = t[o];
              (n = '/' === e ? e + n : e + '/' + n), (this.cache[n] = !0);
            }
          return (this.cache[e] = t), r(null, t);
        }
      }),
      (b.prototype._readdirError = function(e, t, r) {
        if (!this.aborted) {
          switch (t.code) {
            case 'ENOTSUP':
            case 'ENOTDIR':
              var o = this._makeAbs(e);
              if (((this.cache[o] = 'FILE'), o === this.cwdAbs)) {
                var n = new Error(t.code + ' invalid cwd ' + this.cwd);
                (n.path = this.cwd),
                  (n.code = t.code),
                  this.emit('error', n),
                  this.abort();
              }
              break;
            case 'ENOENT':
            case 'ELOOP':
            case 'ENAMETOOLONG':
            case 'UNKNOWN':
              this.cache[this._makeAbs(e)] = !1;
              break;
            default:
              (this.cache[this._makeAbs(e)] = !1),
                this.strict && (this.emit('error', t), this.abort()),
                this.silent || console.error('glob error', t);
          }
          return r();
        }
      }),
      (b.prototype._processGlobStar = function(e, t, r, o, n, s, i) {
        var a = this;
        this._readdir(r, s, function(c, u) {
          a._processGlobStar2(e, t, r, o, n, s, u, i);
        });
      }),
      (b.prototype._processGlobStar2 = function(e, t, r, o, n, s, i, a) {
        if (!i) return a();
        var c = o.slice(1),
          u = e ? [e] : [],
          l = u.concat(c);
        this._process(l, n, !1, a);
        var d = this.symlinks[r],
          f = i.length;
        if (d && s) return a();
        for (var h = 0; h < f; h++) {
          if ('.' !== i[h].charAt(0) || this.dot) {
            var p = u.concat(i[h], c);
            this._process(p, n, !0, a);
            var m = u.concat(i[h], o);
            this._process(m, n, !0, a);
          }
        }
        a();
      }),
      (b.prototype._processSimple = function(e, t, r) {
        var o = this;
        this._stat(e, function(n, s) {
          o._processSimple2(e, t, n, s, r);
        });
      }),
      (b.prototype._processSimple2 = function(e, t, r, o, n) {
        if ((this.matches[t] || (this.matches[t] = Object.create(null)), !o))
          return n();
        if (e && l(e) && !this.nomount) {
          var s = /[\/\\]$/.test(e);
          '/' === e.charAt(0)
            ? (e = c.join(this.root, e))
            : ((e = c.resolve(this.root, e)), s && (e += '/'));
        }
        'win32' === process.platform && (e = e.replace(/\\/g, '/')),
          this._emitMatch(t, e),
          n();
      }),
      (b.prototype._stat = function(e, t) {
        var r = this._makeAbs(e),
          n = '/' === e.slice(-1);
        if (e.length > this.maxLength) return t();
        if (!this.stat && p(this.cache, r)) {
          var s = this.cache[r];
          if ((Array.isArray(s) && (s = 'DIR'), !n || 'DIR' === s))
            return t(null, s);
          if (n && 'FILE' === s) return t();
        }
        var i = this.statCache[r];
        if (void 0 !== i) {
          if (!1 === i) return t(null, i);
          var a = i.isDirectory() ? 'DIR' : 'FILE';
          return n && 'FILE' === a ? t() : t(null, a, i);
        }
        var c = this,
          u = m('stat\0' + r, function(n, s) {
            if (s && s.isSymbolicLink())
              return o.stat(r, function(o, n) {
                o ? c._stat2(e, r, null, s, t) : c._stat2(e, r, o, n, t);
              });
            c._stat2(e, r, n, s, t);
          });
        u && o.lstat(r, u);
      }),
      (b.prototype._stat2 = function(e, t, r, o, n) {
        if (r && ('ENOENT' === r.code || 'ENOTDIR' === r.code))
          return (this.statCache[t] = !1), n();
        var s = '/' === e.slice(-1);
        if (
          ((this.statCache[t] = o),
          '/' === t.slice(-1) && o && !o.isDirectory())
        )
          return n(null, !1, o);
        var i = !0;
        return (
          o && (i = o.isDirectory() ? 'DIR' : 'FILE'),
          (this.cache[t] = this.cache[t] || i),
          s && 'FILE' === i ? n() : n(null, i, o)
        );
      });
  },
  './node_modules/glob/sync.js': function(e, t, r) {
    (e.exports = p), (p.GlobSync = m);
    var o = r('fs'),
      n = r('./node_modules/fs.realpath/index.js'),
      s = r('./node_modules/minimatch/minimatch.js'),
      i = (s.Minimatch,
      r('./node_modules/glob/glob.js').Glob,
      r('util'),
      r('path')),
      a = r('assert'),
      c = r('./node_modules/path-is-absolute/index.js'),
      u = r('./node_modules/glob/common.js'),
      l = (u.alphasort, u.alphasorti, u.setopts),
      d = u.ownProp,
      f = u.childrenIgnored,
      h = u.isIgnored;
    function p(e, t) {
      if ('function' == typeof t || 3 === arguments.length)
        throw new TypeError(
          'callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167'
        );
      return new m(e, t).found;
    }
    function m(e, t) {
      if (!e) throw new Error('must provide pattern');
      if ('function' == typeof t || 3 === arguments.length)
        throw new TypeError(
          'callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167'
        );
      if (!(this instanceof m)) return new m(e, t);
      if ((l(this, e, t), this.noprocess)) return this;
      var r = this.minimatch.set.length;
      this.matches = new Array(r);
      for (var o = 0; o < r; o++) this._process(this.minimatch.set[o], o, !1);
      this._finish();
    }
    (m.prototype._finish = function() {
      if ((a(this instanceof m), this.realpath)) {
        var e = this;
        this.matches.forEach(function(t, r) {
          var o = (e.matches[r] = Object.create(null));
          for (var s in t)
            try {
              (s = e._makeAbs(s)), (o[n.realpathSync(s, e.realpathCache)] = !0);
            } catch (t) {
              if ('stat' !== t.syscall) throw t;
              o[e._makeAbs(s)] = !0;
            }
        });
      }
      u.finish(this);
    }),
      (m.prototype._process = function(e, t, r) {
        a(this instanceof m);
        for (var o, n = 0; 'string' == typeof e[n]; ) n++;
        switch (n) {
          case e.length:
            return void this._processSimple(e.join('/'), t);
          case 0:
            o = null;
            break;
          default:
            o = e.slice(0, n).join('/');
        }
        var i,
          u = e.slice(n);
        null === o
          ? (i = '.')
          : c(o) || c(e.join('/'))
          ? ((o && c(o)) || (o = '/' + o), (i = o))
          : (i = o);
        var l = this._makeAbs(i);
        f(this, i) ||
          (u[0] === s.GLOBSTAR
            ? this._processGlobStar(o, i, l, u, t, r)
            : this._processReaddir(o, i, l, u, t, r));
      }),
      (m.prototype._processReaddir = function(e, t, r, o, n, s) {
        var a = this._readdir(r, s);
        if (a) {
          for (
            var c = o[0],
              u = !!this.minimatch.negate,
              l = c._glob,
              d = this.dot || '.' === l.charAt(0),
              f = [],
              h = 0;
            h < a.length;
            h++
          ) {
            if ('.' !== (v = a[h]).charAt(0) || d)
              (u && !e ? !v.match(c) : v.match(c)) && f.push(v);
          }
          var p = f.length;
          if (0 !== p)
            if (1 !== o.length || this.mark || this.stat) {
              o.shift();
              for (h = 0; h < p; h++) {
                var m;
                v = f[h];
                (m = e ? [e, v] : [v]), this._process(m.concat(o), n, s);
              }
            } else {
              this.matches[n] || (this.matches[n] = Object.create(null));
              for (var h = 0; h < p; h++) {
                var v = f[h];
                e && (v = '/' !== e.slice(-1) ? e + '/' + v : e + v),
                  '/' !== v.charAt(0) ||
                    this.nomount ||
                    (v = i.join(this.root, v)),
                  this._emitMatch(n, v);
              }
            }
        }
      }),
      (m.prototype._emitMatch = function(e, t) {
        if (!h(this, t)) {
          var r = this._makeAbs(t);
          if (
            (this.mark && (t = this._mark(t)),
            this.absolute && (t = r),
            !this.matches[e][t])
          ) {
            if (this.nodir) {
              var o = this.cache[r];
              if ('DIR' === o || Array.isArray(o)) return;
            }
            (this.matches[e][t] = !0), this.stat && this._stat(t);
          }
        }
      }),
      (m.prototype._readdirInGlobStar = function(e) {
        if (this.follow) return this._readdir(e, !1);
        var t, r;
        try {
          r = o.lstatSync(e);
        } catch (e) {
          if ('ENOENT' === e.code) return null;
        }
        var n = r && r.isSymbolicLink();
        return (
          (this.symlinks[e] = n),
          n || !r || r.isDirectory()
            ? (t = this._readdir(e, !1))
            : (this.cache[e] = 'FILE'),
          t
        );
      }),
      (m.prototype._readdir = function(e, t) {
        if (t && !d(this.symlinks, e)) return this._readdirInGlobStar(e);
        if (d(this.cache, e)) {
          var r = this.cache[e];
          if (!r || 'FILE' === r) return null;
          if (Array.isArray(r)) return r;
        }
        try {
          return this._readdirEntries(e, o.readdirSync(e));
        } catch (t) {
          return this._readdirError(e, t), null;
        }
      }),
      (m.prototype._readdirEntries = function(e, t) {
        if (!this.mark && !this.stat)
          for (var r = 0; r < t.length; r++) {
            var o = t[r];
            (o = '/' === e ? e + o : e + '/' + o), (this.cache[o] = !0);
          }
        return (this.cache[e] = t), t;
      }),
      (m.prototype._readdirError = function(e, t) {
        switch (t.code) {
          case 'ENOTSUP':
          case 'ENOTDIR':
            var r = this._makeAbs(e);
            if (((this.cache[r] = 'FILE'), r === this.cwdAbs)) {
              var o = new Error(t.code + ' invalid cwd ' + this.cwd);
              throw ((o.path = this.cwd), (o.code = t.code), o);
            }
            break;
          case 'ENOENT':
          case 'ELOOP':
          case 'ENAMETOOLONG':
          case 'UNKNOWN':
            this.cache[this._makeAbs(e)] = !1;
            break;
          default:
            if (((this.cache[this._makeAbs(e)] = !1), this.strict)) throw t;
            this.silent || console.error('glob error', t);
        }
      }),
      (m.prototype._processGlobStar = function(e, t, r, o, n, s) {
        var i = this._readdir(r, s);
        if (i) {
          var a = o.slice(1),
            c = e ? [e] : [],
            u = c.concat(a);
          this._process(u, n, !1);
          var l = i.length;
          if (!this.symlinks[r] || !s)
            for (var d = 0; d < l; d++) {
              if ('.' !== i[d].charAt(0) || this.dot) {
                var f = c.concat(i[d], a);
                this._process(f, n, !0);
                var h = c.concat(i[d], o);
                this._process(h, n, !0);
              }
            }
        }
      }),
      (m.prototype._processSimple = function(e, t) {
        var r = this._stat(e);
        if ((this.matches[t] || (this.matches[t] = Object.create(null)), r)) {
          if (e && c(e) && !this.nomount) {
            var o = /[\/\\]$/.test(e);
            '/' === e.charAt(0)
              ? (e = i.join(this.root, e))
              : ((e = i.resolve(this.root, e)), o && (e += '/'));
          }
          'win32' === process.platform && (e = e.replace(/\\/g, '/')),
            this._emitMatch(t, e);
        }
      }),
      (m.prototype._stat = function(e) {
        var t = this._makeAbs(e),
          r = '/' === e.slice(-1);
        if (e.length > this.maxLength) return !1;
        if (!this.stat && d(this.cache, t)) {
          var n = this.cache[t];
          if ((Array.isArray(n) && (n = 'DIR'), !r || 'DIR' === n)) return n;
          if (r && 'FILE' === n) return !1;
        }
        var s = this.statCache[t];
        if (!s) {
          var i;
          try {
            i = o.lstatSync(t);
          } catch (e) {
            if (e && ('ENOENT' === e.code || 'ENOTDIR' === e.code))
              return (this.statCache[t] = !1), !1;
          }
          if (i && i.isSymbolicLink())
            try {
              s = o.statSync(t);
            } catch (e) {
              s = i;
            }
          else s = i;
        }
        this.statCache[t] = s;
        n = !0;
        return (
          s && (n = s.isDirectory() ? 'DIR' : 'FILE'),
          (this.cache[t] = this.cache[t] || n),
          (!r || 'FILE' !== n) && n
        );
      }),
      (m.prototype._mark = function(e) {
        return u.mark(this, e);
      }),
      (m.prototype._makeAbs = function(e) {
        return u.makeAbs(this, e);
      });
  },
  './node_modules/inflight/inflight.js': function(e, t, r) {
    var o = r('./node_modules/wrappy/wrappy.js'),
      n = Object.create(null),
      s = r('./node_modules/once/once.js');
    e.exports = o(function(e, t) {
      return n[e]
        ? (n[e].push(t), null)
        : ((n[e] = [t]),
          (function(e) {
            return s(function t() {
              var r = n[e],
                o = r.length,
                s = (function(e) {
                  for (var t = e.length, r = [], o = 0; o < t; o++) r[o] = e[o];
                  return r;
                })(arguments);
              try {
                for (var i = 0; i < o; i++) r[i].apply(null, s);
              } finally {
                r.length > o
                  ? (r.splice(0, o),
                    process.nextTick(function() {
                      t.apply(null, s);
                    }))
                  : delete n[e];
              }
            });
          })(e));
    });
  },
  './node_modules/inherits/inherits.js': function(e, t, r) {
    try {
      var o = r('util');
      if ('function' != typeof o.inherits) throw '';
      e.exports = o.inherits;
    } catch (t) {
      e.exports = r('./node_modules/inherits/inherits_browser.js');
    }
  },
  './node_modules/inherits/inherits_browser.js': function(e, t) {
    'function' == typeof Object.create
      ? (e.exports = function(e, t) {
          (e.super_ = t),
            (e.prototype = Object.create(t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            }));
        })
      : (e.exports = function(e, t) {
          e.super_ = t;
          var r = function() {};
          (r.prototype = t.prototype),
            (e.prototype = new r()),
            (e.prototype.constructor = e);
        });
  },
  './node_modules/minimatch/minimatch.js': function(e, t, r) {
    (e.exports = p), (p.Minimatch = m);
    var o = { sep: '/' };
    try {
      o = r('path');
    } catch (e) {}
    var n = (p.GLOBSTAR = m.GLOBSTAR = {}),
      s = r('./node_modules/brace-expansion/index.js'),
      i = {
        '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
        '?': { open: '(?:', close: ')?' },
        '+': { open: '(?:', close: ')+' },
        '*': { open: '(?:', close: ')*' },
        '@': { open: '(?:', close: ')' }
      },
      a = '[^/]',
      c = a + '*?',
      u = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?',
      l = '(?:(?!(?:\\/|^)\\.).)*?',
      d = '().*{}+?[]^$\\!'.split('').reduce(function(e, t) {
        return (e[t] = !0), e;
      }, {});
    var f = /\/+/;
    function h(e, t) {
      (e = e || {}), (t = t || {});
      var r = {};
      return (
        Object.keys(t).forEach(function(e) {
          r[e] = t[e];
        }),
        Object.keys(e).forEach(function(t) {
          r[t] = e[t];
        }),
        r
      );
    }
    function p(e, t, r) {
      if ('string' != typeof t)
        throw new TypeError('glob pattern string required');
      return (
        r || (r = {}),
        !(!r.nocomment && '#' === t.charAt(0)) &&
          ('' === t.trim() ? '' === e : new m(t, r).match(e))
      );
    }
    function m(e, t) {
      if (!(this instanceof m)) return new m(e, t);
      if ('string' != typeof e)
        throw new TypeError('glob pattern string required');
      t || (t = {}),
        (e = e.trim()),
        '/' !== o.sep && (e = e.split(o.sep).join('/')),
        (this.options = t),
        (this.set = []),
        (this.pattern = e),
        (this.regexp = null),
        (this.negate = !1),
        (this.comment = !1),
        (this.empty = !1),
        this.make();
    }
    function v(e, t) {
      if (
        (t || (t = this instanceof m ? this.options : {}),
        void 0 === (e = void 0 === e ? this.pattern : e))
      )
        throw new TypeError('undefined pattern');
      return t.nobrace || !e.match(/\{.*\}/) ? [e] : s(e);
    }
    (p.filter = function(e, t) {
      return (
        (t = t || {}),
        function(r, o, n) {
          return p(r, e, t);
        }
      );
    }),
      (p.defaults = function(e) {
        if (!e || !Object.keys(e).length) return p;
        var t = p,
          r = function(r, o, n) {
            return t.minimatch(r, o, h(e, n));
          };
        return (
          (r.Minimatch = function(r, o) {
            return new t.Minimatch(r, h(e, o));
          }),
          r
        );
      }),
      (m.defaults = function(e) {
        return e && Object.keys(e).length ? p.defaults(e).Minimatch : m;
      }),
      (m.prototype.debug = function() {}),
      (m.prototype.make = function() {
        if (this._made) return;
        var e = this.pattern,
          t = this.options;
        if (!t.nocomment && '#' === e.charAt(0))
          return void (this.comment = !0);
        if (!e) return void (this.empty = !0);
        this.parseNegate();
        var r = (this.globSet = this.braceExpand());
        t.debug && (this.debug = console.error);
        this.debug(this.pattern, r),
          (r = this.globParts = r.map(function(e) {
            return e.split(f);
          })),
          this.debug(this.pattern, r),
          (r = r.map(function(e, t, r) {
            return e.map(this.parse, this);
          }, this)),
          this.debug(this.pattern, r),
          (r = r.filter(function(e) {
            return -1 === e.indexOf(!1);
          })),
          this.debug(this.pattern, r),
          (this.set = r);
      }),
      (m.prototype.parseNegate = function() {
        var e = this.pattern,
          t = !1,
          r = this.options,
          o = 0;
        if (r.nonegate) return;
        for (var n = 0, s = e.length; n < s && '!' === e.charAt(n); n++)
          (t = !t), o++;
        o && (this.pattern = e.substr(o));
        this.negate = t;
      }),
      (p.braceExpand = function(e, t) {
        return v(e, t);
      }),
      (m.prototype.braceExpand = v),
      (m.prototype.parse = function(e, t) {
        if (e.length > 65536) throw new TypeError('pattern is too long');
        var r = this.options;
        if (!r.noglobstar && '**' === e) return n;
        if ('' === e) return '';
        var o,
          s = '',
          u = !!r.nocase,
          l = !1,
          f = [],
          h = [],
          p = !1,
          m = -1,
          v = -1,
          j =
            '.' === e.charAt(0)
              ? ''
              : r.dot
              ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))'
              : '(?!\\.)',
          y = this;
        function g() {
          if (o) {
            switch (o) {
              case '*':
                (s += c), (u = !0);
                break;
              case '?':
                (s += a), (u = !0);
                break;
              default:
                s += '\\' + o;
            }
            y.debug('clearStateChar %j %j', o, s), (o = !1);
          }
        }
        for (var b, w = 0, E = e.length; w < E && (b = e.charAt(w)); w++)
          if ((this.debug('%s\t%s %s %j', e, w, s, b), l && d[b]))
            (s += '\\' + b), (l = !1);
          else
            switch (b) {
              case '/':
                return !1;
              case '\\':
                g(), (l = !0);
                continue;
              case '?':
              case '*':
              case '+':
              case '@':
              case '!':
                if ((this.debug('%s\t%s %s %j <-- stateChar', e, w, s, b), p)) {
                  this.debug('  in class'),
                    '!' === b && w === v + 1 && (b = '^'),
                    (s += b);
                  continue;
                }
                y.debug('call clearStateChar %j', o),
                  g(),
                  (o = b),
                  r.noext && g();
                continue;
              case '(':
                if (p) {
                  s += '(';
                  continue;
                }
                if (!o) {
                  s += '\\(';
                  continue;
                }
                f.push({
                  type: o,
                  start: w - 1,
                  reStart: s.length,
                  open: i[o].open,
                  close: i[o].close
                }),
                  (s += '!' === o ? '(?:(?!(?:' : '(?:'),
                  this.debug('plType %j %j', o, s),
                  (o = !1);
                continue;
              case ')':
                if (p || !f.length) {
                  s += '\\)';
                  continue;
                }
                g(), (u = !0);
                var x = f.pop();
                (s += x.close),
                  '!' === x.type && h.push(x),
                  (x.reEnd = s.length);
                continue;
              case '|':
                if (p || !f.length || l) {
                  (s += '\\|'), (l = !1);
                  continue;
                }
                g(), (s += '|');
                continue;
              case '[':
                if ((g(), p)) {
                  s += '\\' + b;
                  continue;
                }
                (p = !0), (v = w), (m = s.length), (s += b);
                continue;
              case ']':
                if (w === v + 1 || !p) {
                  (s += '\\' + b), (l = !1);
                  continue;
                }
                if (p) {
                  var O = e.substring(v + 1, w);
                  try {
                    RegExp('[' + O + ']');
                  } catch (e) {
                    var S = this.parse(O, _);
                    (s = s.substr(0, m) + '\\[' + S[0] + '\\]'),
                      (u = u || S[1]),
                      (p = !1);
                    continue;
                  }
                }
                (u = !0), (p = !1), (s += b);
                continue;
              default:
                g(),
                  l ? (l = !1) : !d[b] || ('^' === b && p) || (s += '\\'),
                  (s += b);
            }
        p &&
          ((O = e.substr(v + 1)),
          (S = this.parse(O, _)),
          (s = s.substr(0, m) + '\\[' + S[0]),
          (u = u || S[1]));
        for (x = f.pop(); x; x = f.pop()) {
          var k = s.slice(x.reStart + x.open.length);
          this.debug('setting tail', s, x),
            (k = k.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(e, t, r) {
              return r || (r = '\\'), t + t + r + '|';
            })),
            this.debug('tail=%j\n   %s', k, k, x, s);
          var A = '*' === x.type ? c : '?' === x.type ? a : '\\' + x.type;
          (u = !0), (s = s.slice(0, x.reStart) + A + '\\(' + k);
        }
        g(), l && (s += '\\\\');
        var T = !1;
        switch (s.charAt(0)) {
          case '.':
          case '[':
          case '(':
            T = !0;
        }
        for (var P = h.length - 1; P > -1; P--) {
          var R = h[P],
            L = s.slice(0, R.reStart),
            N = s.slice(R.reStart, R.reEnd - 8),
            M = s.slice(R.reEnd - 8, R.reEnd),
            I = s.slice(R.reEnd);
          M += I;
          var D = L.split('(').length - 1,
            C = I;
          for (w = 0; w < D; w++) C = C.replace(/\)[+*?]?/, '');
          var G = '';
          '' === (I = C) && t !== _ && (G = '$');
          var $ = L + N + I + G + M;
          s = $;
        }
        '' !== s && u && (s = '(?=.)' + s);
        T && (s = j + s);
        if (t === _) return [s, u];
        if (!u) return e.replace(/\\(.)/g, '$1');
        var F = r.nocase ? 'i' : '';
        try {
          var B = new RegExp('^' + s + '$', F);
        } catch (e) {
          return new RegExp('$.');
        }
        return (B._glob = e), (B._src = s), B;
      });
    var _ = {};
    (p.makeRe = function(e, t) {
      return new m(e, t || {}).makeRe();
    }),
      (m.prototype.makeRe = function() {
        if (this.regexp || !1 === this.regexp) return this.regexp;
        var e = this.set;
        if (!e.length) return (this.regexp = !1), this.regexp;
        var t = this.options,
          r = t.noglobstar ? c : t.dot ? u : l,
          o = t.nocase ? 'i' : '',
          s = e
            .map(function(e) {
              return e
                .map(function(e) {
                  return e === n
                    ? r
                    : 'string' == typeof e
                    ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
                    : e._src;
                })
                .join('\\/');
            })
            .join('|');
        (s = '^(?:' + s + ')$'), this.negate && (s = '^(?!' + s + ').*$');
        try {
          this.regexp = new RegExp(s, o);
        } catch (e) {
          this.regexp = !1;
        }
        return this.regexp;
      }),
      (p.match = function(e, t, r) {
        var o = new m(t, (r = r || {}));
        return (
          (e = e.filter(function(e) {
            return o.match(e);
          })),
          o.options.nonull && !e.length && e.push(t),
          e
        );
      }),
      (m.prototype.match = function(e, t) {
        if ((this.debug('match', e, this.pattern), this.comment)) return !1;
        if (this.empty) return '' === e;
        if ('/' === e && t) return !0;
        var r = this.options;
        '/' !== o.sep && (e = e.split(o.sep).join('/'));
        (e = e.split(f)), this.debug(this.pattern, 'split', e);
        var n,
          s,
          i = this.set;
        for (
          this.debug(this.pattern, 'set', i), s = e.length - 1;
          s >= 0 && !(n = e[s]);
          s--
        );
        for (s = 0; s < i.length; s++) {
          var a = i[s],
            c = e;
          r.matchBase && 1 === a.length && (c = [n]);
          var u = this.matchOne(c, a, t);
          if (u) return !!r.flipNegate || !this.negate;
        }
        return !r.flipNegate && this.negate;
      }),
      (m.prototype.matchOne = function(e, t, r) {
        var o = this.options;
        this.debug('matchOne', { this: this, file: e, pattern: t }),
          this.debug('matchOne', e.length, t.length);
        for (
          var s = 0, i = 0, a = e.length, c = t.length;
          s < a && i < c;
          s++, i++
        ) {
          this.debug('matchOne loop');
          var u,
            l = t[i],
            d = e[s];
          if ((this.debug(t, l, d), !1 === l)) return !1;
          if (l === n) {
            this.debug('GLOBSTAR', [t, l, d]);
            var f = s,
              h = i + 1;
            if (h === c) {
              for (this.debug('** at the end'); s < a; s++)
                if (
                  '.' === e[s] ||
                  '..' === e[s] ||
                  (!o.dot && '.' === e[s].charAt(0))
                )
                  return !1;
              return !0;
            }
            for (; f < a; ) {
              var p = e[f];
              if (
                (this.debug('\nglobstar while', e, f, t, h, p),
                this.matchOne(e.slice(f), t.slice(h), r))
              )
                return this.debug('globstar found match!', f, a, p), !0;
              if ('.' === p || '..' === p || (!o.dot && '.' === p.charAt(0))) {
                this.debug('dot detected!', e, f, t, h);
                break;
              }
              this.debug('globstar swallow a segment, and continue'), f++;
            }
            return !(
              !r ||
              (this.debug('\n>>> no match, partial?', e, f, t, h), f !== a)
            );
          }
          if (
            ('string' == typeof l
              ? ((u = o.nocase ? d.toLowerCase() === l.toLowerCase() : d === l),
                this.debug('string match', l, d, u))
              : ((u = d.match(l)), this.debug('pattern match', l, d, u)),
            !u)
          )
            return !1;
        }
        if (s === a && i === c) return !0;
        if (s === a) return r;
        if (i === c) return s === a - 1 && '' === e[s];
        throw new Error('wtf?');
      });
  },
  './node_modules/once/once.js': function(e, t, r) {
    var o = r('./node_modules/wrappy/wrappy.js');
    function n(e) {
      var t = function() {
        return t.called
          ? t.value
          : ((t.called = !0), (t.value = e.apply(this, arguments)));
      };
      return (t.called = !1), t;
    }
    function s(e) {
      var t = function() {
          if (t.called) throw new Error(t.onceError);
          return (t.called = !0), (t.value = e.apply(this, arguments));
        },
        r = e.name || 'Function wrapped with `once`';
      return (
        (t.onceError = r + " shouldn't be called more than once"),
        (t.called = !1),
        t
      );
    }
    (e.exports = o(n)),
      (e.exports.strict = o(s)),
      (n.proto = n(function() {
        Object.defineProperty(Function.prototype, 'once', {
          value: function() {
            return n(this);
          },
          configurable: !0
        }),
          Object.defineProperty(Function.prototype, 'onceStrict', {
            value: function() {
              return s(this);
            },
            configurable: !0
          });
      }));
  },
  './node_modules/path-is-absolute/index.js': function(e, t, r) {
    'use strict';
    function o(e) {
      return '/' === e.charAt(0);
    }
    function n(e) {
      var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(
          e
        ),
        r = t[1] || '',
        o = Boolean(r && ':' !== r.charAt(1));
      return Boolean(t[2] || o);
    }
    (e.exports = 'win32' === process.platform ? n : o),
      (e.exports.posix = o),
      (e.exports.win32 = n);
  },
  './node_modules/rimraf/rimraf.js': function(e, t, r) {
    (e.exports = f), (f.sync = _);
    var o = r('assert'),
      n = r('path'),
      s = r('fs'),
      i = r('./node_modules/glob/glob.js'),
      a = parseInt('666', 8),
      c = { nosort: !0, silent: !0 },
      u = 0,
      l = 'win32' === process.platform;
    function d(e) {
      ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'].forEach(function(
        t
      ) {
        (e[t] = e[t] || s[t]), (e[(t += 'Sync')] = e[t] || s[t]);
      }),
        (e.maxBusyTries = e.maxBusyTries || 3),
        (e.emfileWait = e.emfileWait || 1e3),
        !1 === e.glob && (e.disableGlob = !0),
        (e.disableGlob = e.disableGlob || !1),
        (e.glob = e.glob || c);
    }
    function f(e, t, r) {
      'function' == typeof t && ((r = t), (t = {})),
        o(e, 'rimraf: missing path'),
        o.equal(typeof e, 'string', 'rimraf: path should be a string'),
        o.equal(typeof r, 'function', 'rimraf: callback function required'),
        o(t, 'rimraf: invalid options argument provided'),
        o.equal(typeof t, 'object', 'rimraf: options should be object'),
        d(t);
      var n = 0,
        s = null,
        a = 0;
      if (t.disableGlob || !i.hasMagic(e)) return c(null, [e]);
      function c(e, o) {
        return e
          ? r(e)
          : 0 === (a = o.length)
          ? r()
          : void o.forEach(function(e) {
              h(e, t, function o(i) {
                if (i) {
                  if (
                    ('EBUSY' === i.code ||
                      'ENOTEMPTY' === i.code ||
                      'EPERM' === i.code) &&
                    n < t.maxBusyTries
                  )
                    return (
                      n++,
                      setTimeout(function() {
                        h(e, t, o);
                      }, 100 * n)
                    );
                  if ('EMFILE' === i.code && u < t.emfileWait)
                    return setTimeout(function() {
                      h(e, t, o);
                    }, u++);
                  'ENOENT' === i.code && (i = null);
                }
                (u = 0),
                  (function(e) {
                    (s = s || e), 0 == --a && r(s);
                  })(i);
              });
            });
      }
      t.lstat(e, function(r, o) {
        if (!r) return c(null, [e]);
        i(e, t.glob, c);
      });
    }
    function h(e, t, r) {
      o(e),
        o(t),
        o('function' == typeof r),
        t.lstat(e, function(o, n) {
          return o && 'ENOENT' === o.code
            ? r(null)
            : (o && 'EPERM' === o.code && l && p(e, t, o, r),
              n && n.isDirectory()
                ? v(e, t, o, r)
                : void t.unlink(e, function(o) {
                    if (o) {
                      if ('ENOENT' === o.code) return r(null);
                      if ('EPERM' === o.code)
                        return l ? p(e, t, o, r) : v(e, t, o, r);
                      if ('EISDIR' === o.code) return v(e, t, o, r);
                    }
                    return r(o);
                  }));
        });
    }
    function p(e, t, r, n) {
      o(e),
        o(t),
        o('function' == typeof n),
        r && o(r instanceof Error),
        t.chmod(e, a, function(o) {
          o
            ? n('ENOENT' === o.code ? null : r)
            : t.stat(e, function(o, s) {
                o
                  ? n('ENOENT' === o.code ? null : r)
                  : s.isDirectory()
                  ? v(e, t, r, n)
                  : t.unlink(e, n);
              });
        });
    }
    function m(e, t, r) {
      o(e), o(t), r && o(r instanceof Error);
      try {
        t.chmodSync(e, a);
      } catch (e) {
        if ('ENOENT' === e.code) return;
        throw r;
      }
      try {
        var n = t.statSync(e);
      } catch (e) {
        if ('ENOENT' === e.code) return;
        throw r;
      }
      n.isDirectory() ? j(e, t, r) : t.unlinkSync(e);
    }
    function v(e, t, r, s) {
      o(e),
        o(t),
        r && o(r instanceof Error),
        o('function' == typeof s),
        t.rmdir(e, function(i) {
          !i ||
          ('ENOTEMPTY' !== i.code && 'EEXIST' !== i.code && 'EPERM' !== i.code)
            ? i && 'ENOTDIR' === i.code
              ? s(r)
              : s(i)
            : (function(e, t, r) {
                o(e),
                  o(t),
                  o('function' == typeof r),
                  t.readdir(e, function(o, s) {
                    if (o) return r(o);
                    var i,
                      a = s.length;
                    if (0 === a) return t.rmdir(e, r);
                    s.forEach(function(o) {
                      f(n.join(e, o), t, function(o) {
                        if (!i)
                          return o
                            ? r((i = o))
                            : void (0 == --a && t.rmdir(e, r));
                      });
                    });
                  });
              })(e, t, s);
        });
    }
    function _(e, t) {
      var r;
      if (
        (d((t = t || {})),
        o(e, 'rimraf: missing path'),
        o.equal(typeof e, 'string', 'rimraf: path should be a string'),
        o(t, 'rimraf: missing options'),
        o.equal(typeof t, 'object', 'rimraf: options should be object'),
        t.disableGlob || !i.hasMagic(e))
      )
        r = [e];
      else
        try {
          t.lstatSync(e), (r = [e]);
        } catch (o) {
          r = i.sync(e, t.glob);
        }
      if (r.length)
        for (var n = 0; n < r.length; n++) {
          e = r[n];
          try {
            var s = t.lstatSync(e);
          } catch (r) {
            if ('ENOENT' === r.code) return;
            'EPERM' === r.code && l && m(e, t, r);
          }
          try {
            s && s.isDirectory() ? j(e, t, null) : t.unlinkSync(e);
          } catch (r) {
            if ('ENOENT' === r.code) return;
            if ('EPERM' === r.code) return l ? m(e, t, r) : j(e, t, r);
            if ('EISDIR' !== r.code) throw r;
            j(e, t, r);
          }
        }
    }
    function j(e, t, r) {
      o(e), o(t), r && o(r instanceof Error);
      try {
        t.rmdirSync(e);
      } catch (s) {
        if ('ENOENT' === s.code) return;
        if ('ENOTDIR' === s.code) throw r;
        ('ENOTEMPTY' !== s.code && 'EEXIST' !== s.code && 'EPERM' !== s.code) ||
          (function(e, t) {
            o(e),
              o(t),
              t.readdirSync(e).forEach(function(r) {
                _(n.join(e, r), t);
              });
            var r = l ? 100 : 1,
              s = 0;
            for (;;) {
              var i = !0;
              try {
                var a = t.rmdirSync(e, t);
                return (i = !1), a;
              } finally {
                if (++s < r && i) continue;
              }
            }
          })(e, t);
      }
    }
  },
  './node_modules/semver/semver.js': function(e, t) {
    var r;
    (t = e.exports = W),
      (r =
        'object' == typeof process &&
        process.env &&
        process.env.NODE_DEBUG &&
        /\bsemver\b/i.test(process.env.NODE_DEBUG)
          ? function() {
              var e = Array.prototype.slice.call(arguments, 0);
              e.unshift('SEMVER'), console.log.apply(console, e);
            }
          : function() {}),
      (t.SEMVER_SPEC_VERSION = '2.0.0');
    var o = 256,
      n = Number.MAX_SAFE_INTEGER || 9007199254740991,
      s = (t.re = []),
      i = (t.src = []),
      a = 0,
      c = a++;
    i[c] = '0|[1-9]\\d*';
    var u = a++;
    i[u] = '[0-9]+';
    var l = a++;
    i[l] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
    var d = a++;
    i[d] = '(' + i[c] + ')\\.(' + i[c] + ')\\.(' + i[c] + ')';
    var f = a++;
    i[f] = '(' + i[u] + ')\\.(' + i[u] + ')\\.(' + i[u] + ')';
    var h = a++;
    i[h] = '(?:' + i[c] + '|' + i[l] + ')';
    var p = a++;
    i[p] = '(?:' + i[u] + '|' + i[l] + ')';
    var m = a++;
    i[m] = '(?:-(' + i[h] + '(?:\\.' + i[h] + ')*))';
    var v = a++;
    i[v] = '(?:-?(' + i[p] + '(?:\\.' + i[p] + ')*))';
    var _ = a++;
    i[_] = '[0-9A-Za-z-]+';
    var j = a++;
    i[j] = '(?:\\+(' + i[_] + '(?:\\.' + i[_] + ')*))';
    var y = a++,
      g = 'v?' + i[d] + i[m] + '?' + i[j] + '?';
    i[y] = '^' + g + '$';
    var b = '[v=\\s]*' + i[f] + i[v] + '?' + i[j] + '?',
      w = a++;
    i[w] = '^' + b + '$';
    var E = a++;
    i[E] = '((?:<|>)?=?)';
    var x = a++;
    i[x] = i[u] + '|x|X|\\*';
    var O = a++;
    i[O] = i[c] + '|x|X|\\*';
    var S = a++;
    i[S] =
      '[v=\\s]*(' +
      i[O] +
      ')(?:\\.(' +
      i[O] +
      ')(?:\\.(' +
      i[O] +
      ')(?:' +
      i[m] +
      ')?' +
      i[j] +
      '?)?)?';
    var k = a++;
    i[k] =
      '[v=\\s]*(' +
      i[x] +
      ')(?:\\.(' +
      i[x] +
      ')(?:\\.(' +
      i[x] +
      ')(?:' +
      i[v] +
      ')?' +
      i[j] +
      '?)?)?';
    var A = a++;
    i[A] = '^' + i[E] + '\\s*' + i[S] + '$';
    var T = a++;
    i[T] = '^' + i[E] + '\\s*' + i[k] + '$';
    var P = a++;
    i[P] =
      '(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])';
    var R = a++;
    i[R] = '(?:~>?)';
    var L = a++;
    (i[L] = '(\\s*)' + i[R] + '\\s+'), (s[L] = new RegExp(i[L], 'g'));
    var N = a++;
    i[N] = '^' + i[R] + i[S] + '$';
    var M = a++;
    i[M] = '^' + i[R] + i[k] + '$';
    var I = a++;
    i[I] = '(?:\\^)';
    var D = a++;
    (i[D] = '(\\s*)' + i[I] + '\\s+'), (s[D] = new RegExp(i[D], 'g'));
    var C = a++;
    i[C] = '^' + i[I] + i[S] + '$';
    var G = a++;
    i[G] = '^' + i[I] + i[k] + '$';
    var $ = a++;
    i[$] = '^' + i[E] + '\\s*(' + b + ')$|^$';
    var F = a++;
    i[F] = '^' + i[E] + '\\s*(' + g + ')$|^$';
    var B = a++;
    (i[B] = '(\\s*)' + i[E] + '\\s*(' + b + '|' + i[S] + ')'),
      (s[B] = new RegExp(i[B], 'g'));
    var q = a++;
    i[q] = '^\\s*(' + i[S] + ')\\s+-\\s+(' + i[S] + ')\\s*$';
    var V = a++;
    i[V] = '^\\s*(' + i[k] + ')\\s+-\\s+(' + i[k] + ')\\s*$';
    var z = a++;
    i[z] = '(<|>)?=?\\s*\\*';
    for (var U = 0; U < 35; U++) r(U, i[U]), s[U] || (s[U] = new RegExp(i[U]));
    function Q(e, t) {
      if (
        ((t && 'object' == typeof t) ||
          (t = { loose: !!t, includePrerelease: !1 }),
        e instanceof W)
      )
        return e;
      if ('string' != typeof e) return null;
      if (e.length > o) return null;
      if (!(t.loose ? s[w] : s[y]).test(e)) return null;
      try {
        return new W(e, t);
      } catch (e) {
        return null;
      }
    }
    function W(e, t) {
      if (
        ((t && 'object' == typeof t) ||
          (t = { loose: !!t, includePrerelease: !1 }),
        e instanceof W)
      ) {
        if (e.loose === t.loose) return e;
        e = e.version;
      } else if ('string' != typeof e)
        throw new TypeError('Invalid Version: ' + e);
      if (e.length > o)
        throw new TypeError('version is longer than ' + o + ' characters');
      if (!(this instanceof W)) return new W(e, t);
      r('SemVer', e, t), (this.options = t), (this.loose = !!t.loose);
      var i = e.trim().match(t.loose ? s[w] : s[y]);
      if (!i) throw new TypeError('Invalid Version: ' + e);
      if (
        ((this.raw = e),
        (this.major = +i[1]),
        (this.minor = +i[2]),
        (this.patch = +i[3]),
        this.major > n || this.major < 0)
      )
        throw new TypeError('Invalid major version');
      if (this.minor > n || this.minor < 0)
        throw new TypeError('Invalid minor version');
      if (this.patch > n || this.patch < 0)
        throw new TypeError('Invalid patch version');
      i[4]
        ? (this.prerelease = i[4].split('.').map(function(e) {
            if (/^[0-9]+$/.test(e)) {
              var t = +e;
              if (t >= 0 && t < n) return t;
            }
            return e;
          }))
        : (this.prerelease = []),
        (this.build = i[5] ? i[5].split('.') : []),
        this.format();
    }
    (t.parse = Q),
      (t.valid = function(e, t) {
        var r = Q(e, t);
        return r ? r.version : null;
      }),
      (t.clean = function(e, t) {
        var r = Q(e.trim().replace(/^[=v]+/, ''), t);
        return r ? r.version : null;
      }),
      (t.SemVer = W),
      (W.prototype.format = function() {
        return (
          (this.version = this.major + '.' + this.minor + '.' + this.patch),
          this.prerelease.length &&
            (this.version += '-' + this.prerelease.join('.')),
          this.version
        );
      }),
      (W.prototype.toString = function() {
        return this.version;
      }),
      (W.prototype.compare = function(e) {
        return (
          r('SemVer.compare', this.version, this.options, e),
          e instanceof W || (e = new W(e, this.options)),
          this.compareMain(e) || this.comparePre(e)
        );
      }),
      (W.prototype.compareMain = function(e) {
        return (
          e instanceof W || (e = new W(e, this.options)),
          X(this.major, e.major) ||
            X(this.minor, e.minor) ||
            X(this.patch, e.patch)
        );
      }),
      (W.prototype.comparePre = function(e) {
        if (
          (e instanceof W || (e = new W(e, this.options)),
          this.prerelease.length && !e.prerelease.length)
        )
          return -1;
        if (!this.prerelease.length && e.prerelease.length) return 1;
        if (!this.prerelease.length && !e.prerelease.length) return 0;
        var t = 0;
        do {
          var o = this.prerelease[t],
            n = e.prerelease[t];
          if ((r('prerelease compare', t, o, n), void 0 === o && void 0 === n))
            return 0;
          if (void 0 === n) return 1;
          if (void 0 === o) return -1;
          if (o !== n) return X(o, n);
        } while (++t);
      }),
      (W.prototype.inc = function(e, t) {
        switch (e) {
          case 'premajor':
            (this.prerelease.length = 0),
              (this.patch = 0),
              (this.minor = 0),
              this.major++,
              this.inc('pre', t);
            break;
          case 'preminor':
            (this.prerelease.length = 0),
              (this.patch = 0),
              this.minor++,
              this.inc('pre', t);
            break;
          case 'prepatch':
            (this.prerelease.length = 0),
              this.inc('patch', t),
              this.inc('pre', t);
            break;
          case 'prerelease':
            0 === this.prerelease.length && this.inc('patch', t),
              this.inc('pre', t);
            break;
          case 'major':
            (0 === this.minor &&
              0 === this.patch &&
              0 !== this.prerelease.length) ||
              this.major++,
              (this.minor = 0),
              (this.patch = 0),
              (this.prerelease = []);
            break;
          case 'minor':
            (0 === this.patch && 0 !== this.prerelease.length) || this.minor++,
              (this.patch = 0),
              (this.prerelease = []);
            break;
          case 'patch':
            0 === this.prerelease.length && this.patch++,
              (this.prerelease = []);
            break;
          case 'pre':
            if (0 === this.prerelease.length) this.prerelease = [0];
            else {
              for (var r = this.prerelease.length; --r >= 0; )
                'number' == typeof this.prerelease[r] &&
                  (this.prerelease[r]++, (r = -2));
              -1 === r && this.prerelease.push(0);
            }
            t &&
              (this.prerelease[0] === t
                ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0])
                : (this.prerelease = [t, 0]));
            break;
          default:
            throw new Error('invalid increment argument: ' + e);
        }
        return this.format(), (this.raw = this.version), this;
      }),
      (t.inc = function(e, t, r, o) {
        'string' == typeof r && ((o = r), (r = void 0));
        try {
          return new W(e, r).inc(t, o).version;
        } catch (e) {
          return null;
        }
      }),
      (t.diff = function(e, t) {
        if (K(e, t)) return null;
        var r = Q(e),
          o = Q(t);
        if (r.prerelease.length || o.prerelease.length) {
          for (var n in r)
            if (
              ('major' === n || 'minor' === n || 'patch' === n) &&
              r[n] !== o[n]
            )
              return 'pre' + n;
          return 'prerelease';
        }
        for (var n in r)
          if (
            ('major' === n || 'minor' === n || 'patch' === n) &&
            r[n] !== o[n]
          )
            return n;
      }),
      (t.compareIdentifiers = X);
    var J = /^[0-9]+$/;
    function X(e, t) {
      var r = J.test(e),
        o = J.test(t);
      return (
        r && o && ((e = +e), (t = +t)),
        r && !o ? -1 : o && !r ? 1 : e < t ? -1 : e > t ? 1 : 0
      );
    }
    function Y(e, t, r) {
      return new W(e, r).compare(new W(t, r));
    }
    function Z(e, t, r) {
      return Y(e, t, r) > 0;
    }
    function H(e, t, r) {
      return Y(e, t, r) < 0;
    }
    function K(e, t, r) {
      return 0 === Y(e, t, r);
    }
    function ee(e, t, r) {
      return 0 !== Y(e, t, r);
    }
    function te(e, t, r) {
      return Y(e, t, r) >= 0;
    }
    function re(e, t, r) {
      return Y(e, t, r) <= 0;
    }
    function oe(e, t, r, o) {
      var n;
      switch (t) {
        case '===':
          'object' == typeof e && (e = e.version),
            'object' == typeof r && (r = r.version),
            (n = e === r);
          break;
        case '!==':
          'object' == typeof e && (e = e.version),
            'object' == typeof r && (r = r.version),
            (n = e !== r);
          break;
        case '':
        case '=':
        case '==':
          n = K(e, r, o);
          break;
        case '!=':
          n = ee(e, r, o);
          break;
        case '>':
          n = Z(e, r, o);
          break;
        case '>=':
          n = te(e, r, o);
          break;
        case '<':
          n = H(e, r, o);
          break;
        case '<=':
          n = re(e, r, o);
          break;
        default:
          throw new TypeError('Invalid operator: ' + t);
      }
      return n;
    }
    function ne(e, t) {
      if (
        ((t && 'object' == typeof t) ||
          (t = { loose: !!t, includePrerelease: !1 }),
        e instanceof ne)
      ) {
        if (e.loose === !!t.loose) return e;
        e = e.value;
      }
      if (!(this instanceof ne)) return new ne(e, t);
      r('comparator', e, t),
        (this.options = t),
        (this.loose = !!t.loose),
        this.parse(e),
        this.semver === se
          ? (this.value = '')
          : (this.value = this.operator + this.semver.version),
        r('comp', this);
    }
    (t.rcompareIdentifiers = function(e, t) {
      return X(t, e);
    }),
      (t.major = function(e, t) {
        return new W(e, t).major;
      }),
      (t.minor = function(e, t) {
        return new W(e, t).minor;
      }),
      (t.patch = function(e, t) {
        return new W(e, t).patch;
      }),
      (t.compare = Y),
      (t.compareLoose = function(e, t) {
        return Y(e, t, !0);
      }),
      (t.rcompare = function(e, t, r) {
        return Y(t, e, r);
      }),
      (t.sort = function(e, r) {
        return e.sort(function(e, o) {
          return t.compare(e, o, r);
        });
      }),
      (t.rsort = function(e, r) {
        return e.sort(function(e, o) {
          return t.rcompare(e, o, r);
        });
      }),
      (t.gt = Z),
      (t.lt = H),
      (t.eq = K),
      (t.neq = ee),
      (t.gte = te),
      (t.lte = re),
      (t.cmp = oe),
      (t.Comparator = ne);
    var se = {};
    function ie(e, t) {
      if (
        ((t && 'object' == typeof t) ||
          (t = { loose: !!t, includePrerelease: !1 }),
        e instanceof ie)
      )
        return e.loose === !!t.loose &&
          e.includePrerelease === !!t.includePrerelease
          ? e
          : new ie(e.raw, t);
      if (e instanceof ne) return new ie(e.value, t);
      if (!(this instanceof ie)) return new ie(e, t);
      if (
        ((this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease),
        (this.raw = e),
        (this.set = e
          .split(/\s*\|\|\s*/)
          .map(function(e) {
            return this.parseRange(e.trim());
          }, this)
          .filter(function(e) {
            return e.length;
          })),
        !this.set.length)
      )
        throw new TypeError('Invalid SemVer Range: ' + e);
      this.format();
    }
    function ae(e) {
      return !e || 'x' === e.toLowerCase() || '*' === e;
    }
    function ce(e, t, r, o, n, s, i, a, c, u, l, d, f) {
      return (
        (t = ae(r)
          ? ''
          : ae(o)
          ? '>=' + r + '.0.0'
          : ae(n)
          ? '>=' + r + '.' + o + '.0'
          : '>=' + t) +
        ' ' +
        (a = ae(c)
          ? ''
          : ae(u)
          ? '<' + (+c + 1) + '.0.0'
          : ae(l)
          ? '<' + c + '.' + (+u + 1) + '.0'
          : d
          ? '<=' + c + '.' + u + '.' + l + '-' + d
          : '<=' + a)
      ).trim();
    }
    function ue(e, t, o) {
      for (var n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
      if ((o || (o = {}), t.prerelease.length && !o.includePrerelease)) {
        for (n = 0; n < e.length; n++)
          if (
            (r(e[n].semver),
            e[n].semver !== se && e[n].semver.prerelease.length > 0)
          ) {
            var s = e[n].semver;
            if (
              s.major === t.major &&
              s.minor === t.minor &&
              s.patch === t.patch
            )
              return !0;
          }
        return !1;
      }
      return !0;
    }
    function le(e, t, r) {
      try {
        t = new ie(t, r);
      } catch (e) {
        return !1;
      }
      return t.test(e);
    }
    function de(e, t, r, o) {
      var n, s, i, a, c;
      switch (((e = new W(e, o)), (t = new ie(t, o)), r)) {
        case '>':
          (n = Z), (s = re), (i = H), (a = '>'), (c = '>=');
          break;
        case '<':
          (n = H), (s = te), (i = Z), (a = '<'), (c = '<=');
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (le(e, t, o)) return !1;
      for (var u = 0; u < t.set.length; ++u) {
        var l = t.set[u],
          d = null,
          f = null;
        if (
          (l.forEach(function(e) {
            e.semver === se && (e = new ne('>=0.0.0')),
              (d = d || e),
              (f = f || e),
              n(e.semver, d.semver, o)
                ? (d = e)
                : i(e.semver, f.semver, o) && (f = e);
          }),
          d.operator === a || d.operator === c)
        )
          return !1;
        if ((!f.operator || f.operator === a) && s(e, f.semver)) return !1;
        if (f.operator === c && i(e, f.semver)) return !1;
      }
      return !0;
    }
    (ne.prototype.parse = function(e) {
      var t = this.options.loose ? s[$] : s[F],
        r = e.match(t);
      if (!r) throw new TypeError('Invalid comparator: ' + e);
      (this.operator = r[1]),
        '=' === this.operator && (this.operator = ''),
        r[2]
          ? (this.semver = new W(r[2], this.options.loose))
          : (this.semver = se);
    }),
      (ne.prototype.toString = function() {
        return this.value;
      }),
      (ne.prototype.test = function(e) {
        return (
          r('Comparator.test', e, this.options.loose),
          this.semver === se ||
            ('string' == typeof e && (e = new W(e, this.options)),
            oe(e, this.operator, this.semver, this.options))
        );
      }),
      (ne.prototype.intersects = function(e, t) {
        if (!(e instanceof ne)) throw new TypeError('a Comparator is required');
        var r;
        if (
          ((t && 'object' == typeof t) ||
            (t = { loose: !!t, includePrerelease: !1 }),
          '' === this.operator)
        )
          return (r = new ie(e.value, t)), le(this.value, r, t);
        if ('' === e.operator)
          return (r = new ie(this.value, t)), le(e.semver, r, t);
        var o = !(
            ('>=' !== this.operator && '>' !== this.operator) ||
            ('>=' !== e.operator && '>' !== e.operator)
          ),
          n = !(
            ('<=' !== this.operator && '<' !== this.operator) ||
            ('<=' !== e.operator && '<' !== e.operator)
          ),
          s = this.semver.version === e.semver.version,
          i = !(
            ('>=' !== this.operator && '<=' !== this.operator) ||
            ('>=' !== e.operator && '<=' !== e.operator)
          ),
          a =
            oe(this.semver, '<', e.semver, t) &&
            ('>=' === this.operator || '>' === this.operator) &&
            ('<=' === e.operator || '<' === e.operator),
          c =
            oe(this.semver, '>', e.semver, t) &&
            ('<=' === this.operator || '<' === this.operator) &&
            ('>=' === e.operator || '>' === e.operator);
        return o || n || (s && i) || a || c;
      }),
      (t.Range = ie),
      (ie.prototype.format = function() {
        return (
          (this.range = this.set
            .map(function(e) {
              return e.join(' ').trim();
            })
            .join('||')
            .trim()),
          this.range
        );
      }),
      (ie.prototype.toString = function() {
        return this.range;
      }),
      (ie.prototype.parseRange = function(e) {
        var t = this.options.loose;
        e = e.trim();
        var o = t ? s[V] : s[q];
        (e = e.replace(o, ce)),
          r('hyphen replace', e),
          (e = e.replace(s[B], '$1$2$3')),
          r('comparator trim', e, s[B]),
          (e = (e = (e = e.replace(s[L], '$1~')).replace(s[D], '$1^'))
            .split(/\s+/)
            .join(' '));
        var n = t ? s[$] : s[F],
          i = e
            .split(' ')
            .map(function(e) {
              return (function(e, t) {
                return (
                  r('comp', e, t),
                  (e = (function(e, t) {
                    return e
                      .trim()
                      .split(/\s+/)
                      .map(function(e) {
                        return (function(e, t) {
                          r('caret', e, t),
                            (t && 'object' == typeof t) ||
                              (t = { loose: !!t, includePrerelease: !1 });
                          var o = t.loose ? s[G] : s[C];
                          return e.replace(o, function(t, o, n, s, i) {
                            var a;
                            return (
                              r('caret', e, t, o, n, s, i),
                              ae(o)
                                ? (a = '')
                                : ae(n)
                                ? (a = '>=' + o + '.0.0 <' + (+o + 1) + '.0.0')
                                : ae(s)
                                ? (a =
                                    '0' === o
                                      ? '>=' +
                                        o +
                                        '.' +
                                        n +
                                        '.0 <' +
                                        o +
                                        '.' +
                                        (+n + 1) +
                                        '.0'
                                      : '>=' +
                                        o +
                                        '.' +
                                        n +
                                        '.0 <' +
                                        (+o + 1) +
                                        '.0.0')
                                : i
                                ? (r('replaceCaret pr', i),
                                  '-' !== i.charAt(0) && (i = '-' + i),
                                  (a =
                                    '0' === o
                                      ? '0' === n
                                        ? '>=' +
                                          o +
                                          '.' +
                                          n +
                                          '.' +
                                          s +
                                          i +
                                          ' <' +
                                          o +
                                          '.' +
                                          n +
                                          '.' +
                                          (+s + 1)
                                        : '>=' +
                                          o +
                                          '.' +
                                          n +
                                          '.' +
                                          s +
                                          i +
                                          ' <' +
                                          o +
                                          '.' +
                                          (+n + 1) +
                                          '.0'
                                      : '>=' +
                                        o +
                                        '.' +
                                        n +
                                        '.' +
                                        s +
                                        i +
                                        ' <' +
                                        (+o + 1) +
                                        '.0.0'))
                                : (r('no pr'),
                                  (a =
                                    '0' === o
                                      ? '0' === n
                                        ? '>=' +
                                          o +
                                          '.' +
                                          n +
                                          '.' +
                                          s +
                                          ' <' +
                                          o +
                                          '.' +
                                          n +
                                          '.' +
                                          (+s + 1)
                                        : '>=' +
                                          o +
                                          '.' +
                                          n +
                                          '.' +
                                          s +
                                          ' <' +
                                          o +
                                          '.' +
                                          (+n + 1) +
                                          '.0'
                                      : '>=' +
                                        o +
                                        '.' +
                                        n +
                                        '.' +
                                        s +
                                        ' <' +
                                        (+o + 1) +
                                        '.0.0')),
                              r('caret return', a),
                              a
                            );
                          });
                        })(e, t);
                      })
                      .join(' ');
                  })(e, t)),
                  r('caret', e),
                  (e = (function(e, t) {
                    return e
                      .trim()
                      .split(/\s+/)
                      .map(function(e) {
                        return (function(e, t) {
                          (t && 'object' == typeof t) ||
                            (t = { loose: !!t, includePrerelease: !1 });
                          var o = t.loose ? s[M] : s[N];
                          return e.replace(o, function(t, o, n, s, i) {
                            var a;
                            return (
                              r('tilde', e, t, o, n, s, i),
                              ae(o)
                                ? (a = '')
                                : ae(n)
                                ? (a = '>=' + o + '.0.0 <' + (+o + 1) + '.0.0')
                                : ae(s)
                                ? (a =
                                    '>=' +
                                    o +
                                    '.' +
                                    n +
                                    '.0 <' +
                                    o +
                                    '.' +
                                    (+n + 1) +
                                    '.0')
                                : i
                                ? (r('replaceTilde pr', i),
                                  '-' !== i.charAt(0) && (i = '-' + i),
                                  (a =
                                    '>=' +
                                    o +
                                    '.' +
                                    n +
                                    '.' +
                                    s +
                                    i +
                                    ' <' +
                                    o +
                                    '.' +
                                    (+n + 1) +
                                    '.0'))
                                : (a =
                                    '>=' +
                                    o +
                                    '.' +
                                    n +
                                    '.' +
                                    s +
                                    ' <' +
                                    o +
                                    '.' +
                                    (+n + 1) +
                                    '.0'),
                              r('tilde return', a),
                              a
                            );
                          });
                        })(e, t);
                      })
                      .join(' ');
                  })(e, t)),
                  r('tildes', e),
                  (e = (function(e, t) {
                    return (
                      r('replaceXRanges', e, t),
                      e
                        .split(/\s+/)
                        .map(function(e) {
                          return (function(e, t) {
                            (e = e.trim()),
                              (t && 'object' == typeof t) ||
                                (t = { loose: !!t, includePrerelease: !1 });
                            var o = t.loose ? s[T] : s[A];
                            return e.replace(o, function(t, o, n, s, i, a) {
                              r('xRange', e, t, o, n, s, i, a);
                              var c = ae(n),
                                u = c || ae(s),
                                l = u || ae(i),
                                d = l;
                              return (
                                '=' === o && d && (o = ''),
                                c
                                  ? (t =
                                      '>' === o || '<' === o ? '<0.0.0' : '*')
                                  : o && d
                                  ? (u && (s = 0),
                                    l && (i = 0),
                                    '>' === o
                                      ? ((o = '>='),
                                        u
                                          ? ((n = +n + 1), (s = 0), (i = 0))
                                          : l && ((s = +s + 1), (i = 0)))
                                      : '<=' === o &&
                                        ((o = '<'),
                                        u ? (n = +n + 1) : (s = +s + 1)),
                                    (t = o + n + '.' + s + '.' + i))
                                  : u
                                  ? (t =
                                      '>=' + n + '.0.0 <' + (+n + 1) + '.0.0')
                                  : l &&
                                    (t =
                                      '>=' +
                                      n +
                                      '.' +
                                      s +
                                      '.0 <' +
                                      n +
                                      '.' +
                                      (+s + 1) +
                                      '.0'),
                                r('xRange return', t),
                                t
                              );
                            });
                          })(e, t);
                        })
                        .join(' ')
                    );
                  })(e, t)),
                  r('xrange', e),
                  (e = (function(e, t) {
                    return r('replaceStars', e, t), e.trim().replace(s[z], '');
                  })(e, t)),
                  r('stars', e),
                  e
                );
              })(e, this.options);
            }, this)
            .join(' ')
            .split(/\s+/);
        return (
          this.options.loose &&
            (i = i.filter(function(e) {
              return !!e.match(n);
            })),
          (i = i.map(function(e) {
            return new ne(e, this.options);
          }, this))
        );
      }),
      (ie.prototype.intersects = function(e, t) {
        if (!(e instanceof ie)) throw new TypeError('a Range is required');
        return this.set.some(function(r) {
          return r.every(function(r) {
            return e.set.some(function(e) {
              return e.every(function(e) {
                return r.intersects(e, t);
              });
            });
          });
        });
      }),
      (t.toComparators = function(e, t) {
        return new ie(e, t).set.map(function(e) {
          return e
            .map(function(e) {
              return e.value;
            })
            .join(' ')
            .trim()
            .split(' ');
        });
      }),
      (ie.prototype.test = function(e) {
        if (!e) return !1;
        'string' == typeof e && (e = new W(e, this.options));
        for (var t = 0; t < this.set.length; t++)
          if (ue(this.set[t], e, this.options)) return !0;
        return !1;
      }),
      (t.satisfies = le),
      (t.maxSatisfying = function(e, t, r) {
        var o = null,
          n = null;
        try {
          var s = new ie(t, r);
        } catch (e) {
          return null;
        }
        return (
          e.forEach(function(e) {
            s.test(e) &&
              ((o && -1 !== n.compare(e)) || (n = new W((o = e), r)));
          }),
          o
        );
      }),
      (t.minSatisfying = function(e, t, r) {
        var o = null,
          n = null;
        try {
          var s = new ie(t, r);
        } catch (e) {
          return null;
        }
        return (
          e.forEach(function(e) {
            s.test(e) && ((o && 1 !== n.compare(e)) || (n = new W((o = e), r)));
          }),
          o
        );
      }),
      (t.validRange = function(e, t) {
        try {
          return new ie(e, t).range || '*';
        } catch (e) {
          return null;
        }
      }),
      (t.ltr = function(e, t, r) {
        return de(e, t, '<', r);
      }),
      (t.gtr = function(e, t, r) {
        return de(e, t, '>', r);
      }),
      (t.outside = de),
      (t.prerelease = function(e, t) {
        var r = Q(e, t);
        return r && r.prerelease.length ? r.prerelease : null;
      }),
      (t.intersects = function(e, t, r) {
        return (e = new ie(e, r)), (t = new ie(t, r)), e.intersects(t);
      }),
      (t.coerce = function(e) {
        if (e instanceof W) return e;
        if ('string' != typeof e) return null;
        var t = e.match(s[P]);
        return null == t
          ? null
          : Q((t[1] || '0') + '.' + (t[2] || '0') + '.' + (t[3] || '0'));
      });
  },
  './node_modules/wrappy/wrappy.js': function(e, t) {
    e.exports = function e(t, r) {
      if (t && r) return e(t)(r);
      if ('function' != typeof t) throw new TypeError('need wrapper function');
      Object.keys(t).forEach(function(e) {
        o[e] = t[e];
      });
      return o;
      function o() {
        for (var e = new Array(arguments.length), r = 0; r < e.length; r++)
          e[r] = arguments[r];
        var o = t.apply(this, e),
          n = e[e.length - 1];
        return (
          'function' == typeof o &&
            o !== n &&
            Object.keys(n).forEach(function(e) {
              o[e] = n[e];
            }),
          o
        );
      }
    };
  },
  assert: function(e, t) {
    e.exports = require('assert');
  },
  child_process: function(e, t) {
    e.exports = require('child_process');
  },
  electron: function(e, t) {
    e.exports = require('electron');
  },
  'electron-debug': function(e, t) {
    e.exports = require('electron-debug');
  },
  'electron-log': function(e, t) {
    e.exports = require('electron-log');
  },
  'electron-updater': function(e, t) {
    e.exports = require('electron-updater');
  },
  events: function(e, t) {
    e.exports = require('events');
  },
  fs: function(e, t) {
    e.exports = require('fs');
  },
  https: function(e, t) {
    e.exports = require('https');
  },
  path: function(e, t) {
    e.exports = require('path');
  },
  'source-map-support': function(e, t) {
    e.exports = require('source-map-support');
  },
  util: function(e, t) {
    e.exports = require('util');
  }
});
//# sourceMappingURL=main.prod.js.map
