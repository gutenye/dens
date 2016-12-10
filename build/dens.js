"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Den = function () {
  //{{{1
  function Den(selector) {
    _classCallCheck(this, Den);

    if (typeof selector === "string") {
      this.node = document.querySelector(selector);
    } else if (den.isNode(selector)) {
      this.node = selector;
    } else {
      // seletor === null or undefined or other
      this.node = null;
    }
  }

  _createClass(Den, [{
    key: "replace",
    value: function replace(newNode) {
      if (!this.node) return null;
      this.node.parentNode.replaceChild(newNode, this.node);
      return newNode;
    }

    // den(x).replaceTag("h1") -> newNode
    // den(x).replaceTag("")   // replace text node

  }, {
    key: "replaceTag",
    value: function replaceTag(newTag) {
      if (!this.node) return null;

      var newNode;
      if (newTag === "") {
        if (den.isText(this.node)) return this.node;
        newNode = document.createTextNode(this.node.textContent);
      } else {
        if (this.node.tagName === newTag.toUpperCase()) return this.node;
        newNode = document.createElement(newTag);
        newNode.innerHTML = this.node.innerHTML;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.node.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var attr = _step.value;

            newNode.setAttribute(attr.name, attr.value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return den(this.node).replace(newNode);
    }

    // den(parent).insertAfterElement(node, reference)

  }, {
    key: "insertAfterElement",
    value: function insertAfterElement(newNode, referenceNode) {
      if (this.node === null) return;
      this.node.insertBefore(newNode, referenceNode.nextElementSibling);
    }

    // den(node).insertNextElementSibling(newNode)

  }, {
    key: "insertNextElementSibling",
    value: function insertNextElementSibling(newNode) {
      if (this.node === null) return;
      den(this.node.parentElement).insertAfter(newNode, this.node);
    }
  }, {
    key: "insertPreviousElementSibling",
    value: function insertPreviousElementSibling(newNode) {
      if (this.node === null) return;
      this.node.parentElement.insertBefore(newNode, this.node);
    }

    // den(parent).insertAfter(node, reference)

  }, {
    key: "insertAfter",
    value: function insertAfter(newNode, referenceNode) {
      if (this.node === null) return;
      this.node.insertBefore(newNode, referenceNode.nextSibling);
    }

    // den(node).insertNextSibling(newNode)

  }, {
    key: "insertNextSibling",
    value: function insertNextSibling(newNode) {
      if (this.node === null) return;
      den(this.node.parentElement).insertAfter(newNode, this.node);
    }
  }, {
    key: "insertPreviousSibling",
    value: function insertPreviousSibling(newNode) {
      if (this.node === null) return;
      this.node.parentElement.insertBefore(newNode, this.node);
    }

    // insert child at

  }, {
    key: "insertAt",
    value: function insertAt(newNode, index) {
      if (this.node === null) return;
      this.node.insertBefore(newNode, this.node.children[index]);
    }

    // -> removed node
    // remove self

  }, {
    key: "remove",
    value: function remove() {
      if (this.node === null) return null;
      return this.node.parentElement.removeChild(this.node);
    }

    // -> removed node
    // remove child at

  }, {
    key: "removeAt",
    value: function removeAt(index) {
      if (this.node === null) return null;
      return this.node.removeChild(this.node.children[index]);
    }

    // include current node

  }, {
    key: "closest",
    value: function closest(selector) {
      if (this.node === null) return null;
      var node = den.isText(this.node) ? this.node.parentElement : this.node;
      while (node && !node.matches(selector)) {
        node = node.parentElement;
        if (den.isDocument(node)) // <#document> does not have maches() function
          node = null;
      }
      return node;
    }

    // options: {inclusive: false}

  }, {
    key: "isAncestor",
    value: function isAncestor(ancestorNode, options) {
      options = Object.assign({ inclusive: false }, options);
      if (this.node === null) {
        return false;
      } else if (this.node === ancestorNode) {
        return options.inclusive;
      }
      var node = this.node;
      while (node) {
        if (node === ancestorNode) {
          return true;
        }
        node = node.parentElement;
      }
      return false;
    }

    // index of parentElement

  }, {
    key: "index",
    value: function index() {
      if (this.node === null) return null;
      return Array.from(this.node.parentElement.children).indexOf(this.node);
    }

    // <a>hello</a><b>world</b>
    //   den(a).extend(b)  -> <a>helloworld</a>

  }, {
    key: "extend",
    value: function extend(other) {
      if (!this.node) return;
      this.node.innerHTML += other.innerHTML;
      den(other).remove();
    }

    // <a>hello</a><b>world</b>
    //   den(b).prepend(a)  -> <b>helloworld</b>

  }, {
    key: "prepend",
    value: function prepend(other) {
      if (!this.node) return;
      this.node.innerHTML = other.innerHTML + this.node.innerHTML;
      den(other).remove();
    }
  }]);

  return Den;
}();
//}}}1


var den = function den(selector) {
  //{{{1
  return new Den(selector);
};

den.INLINE_TAGS = ["B", "I", "U", "STRIKE", "A"];

den.isNode = function (obj) {
  return !!(obj && obj.nodeType);
};

den.isElement = function (obj) {
  return obj && obj.nodeType === document.ELEMENT_NODE;
};

den.isText = function (obj) {
  return obj && obj.nodeType === document.TEXT_NODE;
};

den.isDocument = function (obj) {
  return obj && obj.nodeType === document.DOCUMENT_NODE;
};

den.isDocumentFragement = function (obj) {
  return obj && obj.nodeType === document.DOCUMENT_FRAGMENT_NODE;
};

den.isWindow = function (obj) {
  return obj && obj === obj.window;
};

den.isIE = function (maxVersion) {
  version = document.documentMode;
  return version && maxVersion >= version;
};

den.isIOS = function () {
  return (/iPhone|iPad/i.test(navigator.userAgent)
  );
};

den.isMac = function () {
  return (/Mac/i.test(navigator.platform)
  );
};

// createElement(`<div class="foo">Hello</div>`) -> the div Element
den.createElement = function (html) {
  var div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstChild;
};

// TODO den.collect(startNode, endNode=null)
//
// collectSiblings(startNode) -> document-fragement  // to the end
// collectSiblings(startNode, endNode)
//
// does not include endNode
den.collectSiblings = function (startNode, endNode) {
  endNode = endNode || null;
  var ret = document.createDocumentFragment();
  var current = startNode;
  var next;
  while (current !== endNode) {
    next = current.nextSibling;
    ret.appendChild(next);
    current = next;
  }
  return ret;
};

// den.wrap(startNode, endNode, tagName|node)
//
// Example:
//
// den.wrap(startNode, endNode, "p") -> wrapper
//    <div> 1 </div>              wrap(1, 1, "b")            -> <div> <b>1</b> </div>
//    <div> 1 <a>2</a> 3 </div>   wrap(<a>2</a>, 3, "b")     -> <div> 1 <b><a>2</a> 3</b> </div>
//
// den.wrap(startNode, null, "p")     from startNode to end siblings
den.wrap = function (startNode, endNode, wrapper) {
  wrapper = den.isNode(wrapper) ? wrapper : document.createElement(wrapper);
  den(startNode).insertPreviousSibling(wrapper);
  wrapper.appendChild(den.collectSiblings(startNode, endNode));
  return wrapper;
};

// split element or text node.
// split(text)
//    "hello"        -> "llo"                it becomes "he" "llo"
//       ^
// split(element)
//    <b>hello</b>   -> <b>llo</b>           it becomes <b>he</b><b>llo</b>
den.split = function (node, offset) {
  // split Text Node
  if (den.isText(node)) {
    return node.splitText(offset);

    // split Element Node
    //
    // <b>hello</b>
    //      ^
    // 1. node is <b>hello</b>
    // 2. right is <b></b>         by cloneNode(false)
    // 3. <b>hello</b><b></b>      insert right to left's nextSibling
    // 4. <b>he</b><b>llo</b>      all right child siblings are moved into right.
  } else {
    var right = node.cloneNode(false);
    den(node).insertNextSibling(right);

    var childRight = node.firstChild.splitText(offset);
    right.appendChild(den.collectSiblings(childRight));
    // remove empty text node
    if (node.nextSibling.textContent === "") den(node.nextSibling).remove();
    return right;
  }
};

// innerHTML(documentFragment)
den.innerHTML = function (fragment) {
  var div = document.createElement("div");
  div.appendChild(fragment.cloneNode(true));
  return div.innerHTML;
};

// createDocumentFragment(nodes),(text)
den.createDocumentFragment = function (arg) {
  var ret = document.createDocumentFragment();
  if (Array.isArray(arg)) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = arg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var v = _step2.value;

        ret.appendChild(v);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } else if (typeof arg === "string") {
    var div = document.createElement("div");
    div.innerHTML = arg;
    ret = den.createDocumentFragment(Array.from(div.childNodes));
  }
  return ret;
};
//}}}1

// Den Selection Library

var Dens = function () {
  //{{{1
  function Dens() {
    _classCallCheck(this, Dens);

    this.s = getSelection();
  }

  _createClass(Dens, [{
    key: "closest",
    value: function closest(selector) {
      return den(this.node1).closest(selector);
    }
  }, {
    key: "setRange",
    value: function setRange(range) {
      this.s.removeAllRanges();
      this.s.addRange(range);
    }

    // dens.split() -> <densplit>
    //    <b>hello</b>  -> <b>he<densplit>ll</densplit>o</b>
    //         ~~
    //
    //
    // depends den.INLINE_TAGS

  }, {
    key: "split",
    value: function split() {
      // hello <b>world</b> guten                    case 1: split text
      //   ~~~                                       -> he<denslipt>llo</denslipt>
      //   ~~~~~~~~~~~~~~~~~~~~~~                    -> he<denslipt>llo <b>world</b> guten</densplit>
      //            ~~                               -> ..
      //           ~~~~~                             -> hello <b><denslipt>world</denslipt></b> guten
      //
      // hello <b>world</b> <b>guten</b>             case 2: split element
      //   ~~~~~~~~                                  -> he<densplit>llo <b>w</b><densplit><b>orld</b>
      //         ~~~~~~~~~~~~~~                      -> ..

      if (!this.hasSelection) return null;

      // copy current value
      // var {node1, node2, element1, element2, offset1, offset2} = this
      var node1 = this.node1;
      var node2 = this.node2;
      var element1 = this.element1;
      var element2 = this.element2;
      var offset1 = this.offset1;
      var offset2 = this.offset2;

      // node1 = node1 or element1
      if (element1 !== element2) {
        if (den.INLINE_TAGS.indexOf(element1.tagName) !== -1) node1 = element1;
        if (den.INLINE_TAGS.indexOf(element2.tagName) !== -1) node2 = element2;
      }

      var newNode2, newNode3;
      if (den.getSelectionDirection() === "forward") {
        newNode3 = den.split(node2, offset2);
        newNode2 = den.split(node1, offset1);
      } else {
        newNode3 = den.split(node1, offset1);
        newNode2 = den.split(node2, offset2);
      }

      var densplit = den.wrap(newNode2, newNode3, "densplit");
      // remove empty text nodes
      densplit.parentNode.normalize();
      return densplit;
    }

    // select(node|selector)
    // select(startNode, startOffset, endNode, endOffset)

  }, {
    key: "select",
    value: function select(startNode, startOffset, endNode, endOffset) {
      startNode = den(startNode).node;
      if (startNode === null) return null;
      var range = document.createRange();
      if (arguments.length === 1) {
        range.selectNodeContents(startNode);
      } else if (arguments.length === 2) {
        range.setStart(startNode, startOffset);
      } else {
        endNode = den(endNode).node;
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
      }
      this.setRange(range);
      return range;
    }

    // moveCursor(node, [offset=0])

  }, {
    key: "moveCursor",
    value: function moveCursor(node, offset) {
      return this.select(node, offset || 0);
    }
  }, {
    key: "moveCursorAfter",
    value: function moveCursorAfter(node) {
      node = den(node).node;
      if (!node) return null;
      var range = document.createRange();
      range.setStartAfter(node);
      this.setRange(range);
      return range;
    }
  }, {
    key: "node1",
    get: function get() {
      return this.isForward ? this.s.anchorNode : this.s.focusNode;
    }

    // return Element, not TextNode

  }, {
    key: "element1",
    get: function get() {
      return den.isText(this.node1) ? this.node1.parentElement : this.node1;
    }
  }, {
    key: "offset1",
    get: function get() {
      return this.isForward ? this.s.anchorOffset : this.s.focusOffset;
    }
  }, {
    key: "node2",
    get: function get() {
      return this.isForward ? this.s.focusNode : this.s.anchorNode;
    }
  }, {
    key: "element2",
    get: function get() {
      return den.isText(this.node2) ? this.node2.parentElement : this.node2;
    }
  }, {
    key: "offset2",
    get: function get() {
      return this.isForward ? this.s.focusOffset : this.s.anchorOffset;
    }
  }, {
    key: "text",
    get: function get() {
      return this.s.toString();
    }
  }, {
    key: "range",
    get: function get() {
      return this.hasSelection ? this.s.getRangeAt(0) : null;
    }

    // type: "None", Caret, Range

  }, {
    key: "type",
    get: function get() {
      return this.s.type;
    }

    // CARE: right click don't depend on it
    //   first right click: false.
    //   second right click: true.

  }, {
    key: "hasCaret",
    get: function get() {
      return this.type === "Caret";
    }
  }, {
    key: "hasRange",
    get: function get() {
      return this.type === "Range";
    }
  }, {
    key: "hasSelection",
    get: function get() {
      return this.type !== "None";
    }

    // is selection direction is forward

  }, {
    key: "isForward",
    get: function get() {
      if (!this.hasSelection) return false;
      var sel = getSelection();
      var position = sel.anchorNode.compareDocumentPosition(sel.focusNode);
      var forward = true;
      // position == 0 if nodes are the same
      if (!position && sel.anchorOffset > sel.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) forward = false;
      return forward;
    }
  }]);

  return Dens;
}();
//}}}1


var dens = new Dens();

if (window.$ === undefined && window.$$ === undefined) {
  window.$ = function (selector) {
    return typeof selector === "string" ? document.querySelector(selector) : selector || null;
  };
  window.$$ = function (selector) {
    return Array.from(document.querySelectorAll(selector));
  };
}

// fix chrome for..of
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
NamedNodeMap.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

exports.den = den;
exports.dens = dens;

// vim: fdm=marker commentstring=//%s