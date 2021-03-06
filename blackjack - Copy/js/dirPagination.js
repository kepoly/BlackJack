!function () {
    function e(e, t, n) {
        function a(a, u) {
            var l = u.dirPaginate, d = l.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), p = /\|\s*itemsPerPage\s*:[^|]*/;
            if (null === d[2].match(p))throw"pagination directive: the 'itemsPerPage' filter must be set.";
            var f = d[2].replace(p, ""), h = t(f);
            o(a);
            var m = u.paginationId || c;
            return n.registerInstance(m), function (a, o, u) {
                var d = t(u.paginationId)(a) || u.paginationId || c;
                n.registerInstance(d);
                var p = i(l, d);
                r(o, u, p), g(o);
                var f = e(o), m = s(a, u, d);
                n.setCurrentPageParser(d, m, a), "undefined" != typeof u.totalItems ? (n.setAsyncModeTrue(d), a.$watch(function () {
                    return t(u.totalItems)(a)
                }, function (e) {
                    e >= 0 && n.setCollectionLength(d, e)
                })) : a.$watchCollection(function () {
                    return h(a)
                }, function (e) {
                    e && n.setCollectionLength(d, e.length)
                }), f(a)
            }
        }

        function i(e, t) {
            var n, a = !!e.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);
            return n = t === c || a ? e : e.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + t + "'")
        }

        function r(e, t, n) {
            e[0].hasAttribute("dir-paginate-start") || e[0].hasAttribute("data-dir-paginate-start") ? (t.$set("ngRepeatStart", n), e.eq(e.length - 1).attr("ng-repeat-end", !0)) : t.$set("ngRepeat", n)
        }

        function o(e) {
            angular.forEach(e, function (e) {
                e.nodeType === Node.ELEMENT_NODE && angular.element(e).attr("dir-paginate-no-compile", !0)
            })
        }

        function g(e) {
            angular.forEach(e, function (e) {
                e.nodeType === Node.ELEMENT_NODE && angular.element(e).removeAttr("dir-paginate-no-compile")
            }), e.eq(0).removeAttr("dir-paginate-start").removeAttr("dir-paginate").removeAttr("data-dir-paginate-start").removeAttr("data-dir-paginate"), e.eq(e.length - 1).removeAttr("dir-paginate-end").removeAttr("data-dir-paginate-end")
        }

        function s(e, n, a) {
            var i;
            if (n.currentPage)i = t(n.currentPage); else {
                var r = a + "__currentPage";
                e[r] = 1, i = t(r)
            }
            return i
        }

        return {terminal: !0, multiElement: !0, compile: a}
    }

    function t() {
        return {priority: 5e3, terminal: !0}
    }

    function n(e) {
        e.put("angularUtils.directives.dirPagination.template", '<ul class="pagination" ng-if="1 < pages.length"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by $index" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>')
    }

    function a(e, t) {
        function n(t, n, i) {
            function o(n) {
                u(n) && (t.pages = a(n, e.getCollectionLength(d), e.getItemsPerPage(d), f), t.pagination.current = n, s(), t.onPageChange && t.onPageChange({newPageNumber: n}))
            }

            function g() {
                var n = parseInt(e.getCurrentPage(d)) || 1;
                t.pages = a(n, e.getCollectionLength(d), e.getItemsPerPage(d), f), t.pagination.current = n, t.pagination.last = t.pages[t.pages.length - 1], t.pagination.last < t.pagination.current ? t.setCurrent(t.pagination.last) : s()
            }

            function s() {
                var n = e.getCurrentPage(d), a = e.getItemsPerPage(d), i = e.getCollectionLength(d);
                t.range.lower = (n - 1) * a + 1, t.range.upper = Math.min(n * a, i), t.range.total = i
            }

            function u(e) {
                return r.test(e) && e > 0 && e <= t.pagination.last
            }

            var l = i.paginationId || c, d = t.paginationId || i.paginationId || c;
            if (!e.isRegistered(d) && !e.isRegistered(l)) {
                var p = d !== c ? " (id: " + d + ") " : " ";
                throw"pagination directive: the pagination controls" + p + "cannot be used without the corresponding pagination directive."
            }
            t.maxSize || (t.maxSize = 9), t.directionLinks = angular.isDefined(i.directionLinks) ? t.$parent.$eval(i.directionLinks) : !0, t.boundaryLinks = angular.isDefined(i.boundaryLinks) ? t.$parent.$eval(i.boundaryLinks) : !1;
            var f = Math.max(t.maxSize, 5);
            t.pages = [], t.pagination = {last: 1, current: 1}, t.range = {
                lower: 1,
                upper: 1,
                total: 1
            }, t.$watch(function () {
                return (e.getCollectionLength(d) + 1) * e.getItemsPerPage(d)
            }, function (e) {
                e > 0 && g()
            }), t.$watch(function () {
                return e.getItemsPerPage(d)
            }, function (e, n) {
                e != n && "undefined" != typeof n && o(t.pagination.current)
            }), t.$watch(function () {
                return e.getCurrentPage(d)
            }, function (e, t) {
                e != t && o(e)
            }), t.setCurrent = function (t) {
                u(t) && (t = parseInt(t, 10), e.setCurrentPage(d, t))
            }
        }

        function a(e, t, n, a) {
            var r, o = [], g = Math.ceil(t / n), s = Math.ceil(a / 2);
            r = s >= e ? "start" : e > g - s ? "end" : "middle";
            for (var c = g > a, u = 1; g >= u && a >= u;) {
                var l = i(u, e, a, g), d = 2 === u && ("middle" === r || "end" === r), p = u === a - 1 && ("middle" === r || "start" === r);
                o.push(c && (d || p) ? "..." : l), u++
            }
            return o
        }

        function i(e, t, n, a) {
            var i = Math.ceil(n / 2);
            return e === n ? a : 1 === e ? e : a > n ? t > a - i ? a - n + e : t > i ? t - i + e : e : e
        }

        var r = /^\d+$/;
        return {
            restrict: "AE", templateUrl: function (e, n) {
                return n.templateUrl || t.getPath()
            }, scope: {maxSize: "=?", onPageChange: "&?", paginationId: "=?"}, link: n
        }
    }

    function i(e) {
        return function (t, n, a) {
            if ("undefined" == typeof a && (a = c), !e.isRegistered(a))throw"pagination directive: the itemsPerPage id argument (id: " + a + ") does not match a registered pagination-id.";
            var i, r;
            return t instanceof Array ? (n = parseInt(n) || 9999999999, r = e.isAsyncMode(a) ? 0 : (e.getCurrentPage(a) - 1) * n, i = r + n, e.setItemsPerPage(a, n), t.slice(r, i)) : t
        }
    }

    function r() {
        var e, t = {};
        this.registerInstance = function (n) {
            "undefined" == typeof t[n] && (t[n] = {asyncMode: !1}, e = n)
        }, this.isRegistered = function (e) {
            return "undefined" != typeof t[e]
        }, this.getLastInstanceId = function () {
            return e
        }, this.setCurrentPageParser = function (e, n, a) {
            t[e].currentPageParser = n, t[e].context = a
        }, this.setCurrentPage = function (e, n) {
            t[e].currentPageParser.assign(t[e].context, n)
        }, this.getCurrentPage = function (e) {
            var n = t[e].currentPageParser;
            return n ? n(t[e].context) : 1
        }, this.setItemsPerPage = function (e, n) {
            t[e].itemsPerPage = n
        }, this.getItemsPerPage = function (e) {
            return t[e].itemsPerPage
        }, this.setCollectionLength = function (e, n) {
            t[e].collectionLength = n
        }, this.getCollectionLength = function (e) {
            return t[e].collectionLength
        }, this.setAsyncModeTrue = function (e) {
            t[e].asyncMode = !0
        }, this.isAsyncMode = function (e) {
            return t[e].asyncMode
        }
    }

    function o() {
        var e = "angularUtils.directives.dirPagination.template";
        this.setPath = function (t) {
            e = t
        }, this.$get = function () {
            return {
                getPath: function () {
                    return e
                }
            }
        }
    }

    var g, s = "angularUtils.directives.dirPagination", c = "__default";
    try {
        g = angular.module(s)
    } catch (u) {
        g = angular.module(s, [])
    }
    g.directive("dirPaginate", ["$compile", "$parse", "paginationService", e]).directive("dirPaginateNoCompile", t).directive("dirPaginationControls", ["paginationService", "paginationTemplate", a]).filter("itemsPerPage", ["paginationService", i]).service("paginationService", r).provider("paginationTemplate", o).run(["$templateCache", n])
}();