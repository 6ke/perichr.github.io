'use strict';
/*
 * @js index 首页脚本
 * @author perichr
 * @version 1.1.0.15
 * @link http://perichr.org
 */

/*
 * 前置补丁
 
HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
	return this.ownerDocument.defaultView.getComputedStyle(this, null); 
});
 */

(function(root, doc, perichr, undefined) {
	var P = root[perichr], f, o, dialog, dialog_background, content_gusetbook,content_archives,content_github,
		p = {
			id: 'index.js'
		}
	p.Init = function() {
		f = this.fn
		o = this.Options

		//添加留言板链接
		f.qs('#links ul').innerHTML += '<li><a href="#disqus_thread" id="guestbook">GuestBook</a></li>'

		CreateDialog( )
		bindlink('guozhao', function(cb){
			cb({
				on: function(){
					alert('才没有果照给你看呢……哼！')
				}
			})
		})
		bindlink('guestbook', function(cb){
			var content = f.element('div', {
				id: 'disqus_thread'
			})
			f.js('//' + o('disqus') + '.disqus.com/embed.js', null, true )
			cb({
				content : content
			})
		})
		bindlink('blog', function(cb){
			var content = f.element('div')
			f.jsonp({
				url: '/jsonp.js',
				data: {
					callback:'callback_archive'
				},
				success: function (data) {
					data.entries.pop()
					var ul = f.element('ul'), times = Math.min(10, data.entries.length)
					f.times(times, function (i) {
						var entry = data.entries[i]
						var li = f.element('li')
						li.innerHTML = '<a href="' + entry.link + '" title="' + entry.title + '"><time pubdate datetime="' + entry.updated + '"></time>' + entry.title + '</a>'
						f.append(ul, li)
					})
					f.append(content, ul)
					cb({
						content : content
					})
				}
			})
		})
		bindlink('github', function(cb){
			var content = f.element('div')
			f.jsonp({
				url: 'https://api.github.com/users/perichr/repos',
				success: function (data) {
					var ul = f.element('ul')
					f.each(data.data, function(index,data){
						var li = f.element('li')
						li.innerHTML = '<a href="' + data.html_url + '" title="' + data.description + '">' + data.name + '</a>'
						f.append(ul, li)
					})
					f.append(content, ul)
					cb({
						content : content
					})
				}
			})
		})
	}
	P.Load(p)
	function bindlink(id, init){
		var element = f.id(id)
		init(function(options){
			if(options.content){
				f.addclass(options.content, 'dialog_content')
				f.append(doc.body, options.content)
				options.on = function(){
					ShowDialog( options.content )
				}
			}
			if(options.on){
				f.on(element, 'click', function(event){
					event.preventDefault( )
					options.on()
				})
			}
		})
	}
	function CreateDialog( ){
		var body = f.qs('body')
		dialog = f.element('div', {
			id: 'dialog',
			'class': 'hide'
		})
		dialog_background = f.element('div', {
			id: 'dialog_background',
			'class': 'hide'
		})
		f.on(dialog_background, 'click', HideDialog)
		f.append(doc.body, dialog_background)
		f.append(body, dialog)
	}
	function ShowDialog( content ) {
		if(content){
			dialog.innerHTML = ''
			f.append(dialog, content)
		}
		f.rmclass(dialog, 'hide')
		f.rmclass(dialog_background, 'hide')
	}
	function HideDialog( ) {
		f.addclass(dialog, 'hide')
		f.addclass(dialog_background, 'hide')
	}
})(window, document, '_perichr_')