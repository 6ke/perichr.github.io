'use strict';
/*
 * @js index 首页脚本
 * @author perichr
 * @version 1.0.0.0
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
		CreateGustbook( )

		CreateArchives( )
		CreateGitHub( )
		
		//添加对话框
		CreateDialog( )

		
		
		//绑定监听
		f.on(f.id('guozhao'), 'click', on_click_guozhao)
		f.on(f.id('guestbook'), 'click', on_click_guestbook)
		f.on(f.id('blog'), 'click', on_click_blog)
		f.on(f.id('github'), 'click', on_click_github)
	}
	
	P.Load(p)
	
	function CreateArchives( ){
		f.append(doc.body, content_archives = f.element('div', {
			id: 'content_archives',
			'class': 'dialog_content'
		}))
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
				f.append(content_archives, ul)
			}
		})
		
	}
	function CreateGitHub( ){
		f.append(doc.body, content_github = f.element('div', {
			id: 'content_github',
			'class': 'dialog_content'
		}))
		f.jsonp({
			url: 'https://api.github.com/users/perichr/repos',
			success: function (data) {
				var ul = f.element('ul')
				f.each(data.data, function(index,data){
					var li = f.element('li')
					li.innerHTML = '<a href="' + data.html_url + '" title="' + data.description + '">' + data.name + '</a>'
					f.append(ul, li)
				})
				f.append(content_github, ul)
			}
		})
		
	}
	function CreateGustbook( ){
		f.append(doc.body, content_gusetbook = f.element('div', {
			id: 'disqus_thread',
			'class': 'dialog_content'
		}))
		f.js('//' + o('disqus') + '.disqus.com/embed.js', null, true )
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
	function SetDialog(width,height){
		
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
	function on_click_guozhao( event ){
		event.preventDefault( )
		alert('才没有果照给你看呢……哼！')
	}
	function on_click_guestbook( event ){
		event.preventDefault( )
		ShowDialog( content_gusetbook )
	}
	function on_click_blog( event ){
		event.preventDefault( )
		ShowDialog( content_archives )
	}
	function on_click_github( event ){
		event.preventDefault( )
		ShowDialog( content_github )
	}
})(window, document, '_perichr_')