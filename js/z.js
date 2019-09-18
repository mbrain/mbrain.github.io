/*
Embed URI: https://cdn.zarat.ml/js/z.js
*/
(function(window, undefined) {
    var domReadyStack = [];
    function handleDOMReady(fn) {
        return document.readyState === 'complete' ? fn.call(document) : domReadyStack.push(fn);
    }
    document.addEventListener('DOMContentLoaded', function onDOMReady() {
        document.removeEventListener('DOMContentLoaded', onDOMReady);
        while (domReadyStack.length) {
            domReadyStack.shift().call(document);
        }
    });
    function proto(selector) {
        if (!(this instanceof proto)) return new proto(selector);
        if (typeof selector === 'function') return handleDOMReady(selector);
        this.length = 0;
        this.nodes = [];
        if (selector instanceof HTMLElement || selector instanceof NodeList) {
            this.nodes = selector.length > 1 ? [].slice.call(selector) : [selector];
        } else if (typeof selector === 'string') {

            if (selector[0] === '<' && selector[selector.length - 1] === ">") this.nodes = [createNode(selector)];
            else this.nodes = [].slice.call(document.querySelectorAll(selector));

            //this.nodes = [].slice.call(document.querySelectorAll(selector));
        } else if(typeof selector === 'object') {
            this.nodes = [selector];
        }
        if (this.nodes.length) {
            this.length = this.nodes.length;
            for (var i = 0; i < this.nodes.length; i++) {
                this[i] = this.nodes[i];
            }
        }
    }

    function createNode(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    }
    proto.fn = proto.prototype;
    // function each() 
    // can be called on $('.class'), $('#id') or $(array)
    proto.fn.each = function(callback) {
        if(Array.isArray(this[0])) Array.prototype.forEach.call(this[0], callback); 
        else Array.prototype.forEach.call(this, callback);
    };
    proto.fn.addClass = function(classes) {
        //return this.each(function() { this.className += ' ' + classes; });
        return this.each(function(el) { 
            if(!el.className.match('/' + classes + '/g')) {                
                if(el.className != '' && el.className != ' ') el.className += ' ' + classes;
                else el.className = classes;               
            } else {
                el.className.replace(new RegExp('\\b' + classes + '\\b', 'g'), '');
            }
        });
    };
    proto.fn.removeClass = function(className) {
        //return this.each(function() { this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), ''); });
        return this.each(function(el) { 
            el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        });
    };
    proto.fn.attr = function(val) {
        return this[0].getAttribute(val);
    };
    proto.fn.append = function(el) { 
        this[0].appendChild(el[0]);
    };
    proto.fn.prepend = function(el) {
        this[0].insertBefore(el[0], this[0].childNodes[0]);
    };
    proto.fn.text = function(str) {
        return this[0].innerText = str;
    };
    proto.fn.html = function(str) {
        return this[0].innerHTML = str;
    };
    // on()
    // @param name can be click, mouseover, mouseenter, and so on
    // @param handler the callback function
    proto.fn.on = function(name, handler) {
        return this.each(function(e) {
            e.addEventListener(name, handler);
        });
    };
    proto.fn.wait = function(s, f) {
        window.setTimeout(f, s);    
    };
    proto.fn.ajax = function(config) {
        var http = new XMLHttpRequest();
        config.method = (config.method) ? config.method : 'GET';
        http.onreadystatechange = function() { if(http.readyState == 4 && http.status == 200) if(config.success) { config.success(http); } };
        if(config.method == 'get' || config.method == 'GET') (config.data == '' || !config.data) ? http.open(config.method, config.action, true) : http.open(config.method, config.actproto + '?' + config.data, true);
        else http.open(config.method, config.action, true);
        if(config.contentType) http.setRequestHeader("Content-type", config.contentType);
        if(config.method == 'get' || config.method == 'GET') http.send();
        else (config.data == '' || !config.data) ? http.send() : http.send(config.data);
    };
    proto.fn.log = function(str) {
        console.log('log: ' + str);
    };
    proto.fn.hasClass = function(_class) {        
      return (this[0].className.indexOf(_class) != -1) ? true : false;
    };
    proto.fn.toggle = function(el) {
        if(el.hasClass('z-hide')) {
            el.addClass('z-show'); 
            el.removeClass('z-hide');
        } else {
            el.addClass('z-hide');
            el.removeClass('z-show');
        }
    };
    window.$ = proto;
})(window);
