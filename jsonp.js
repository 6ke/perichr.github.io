---
layout: nil
---
(devp_callback({title:"{{ site.title }}"
,id:"{{ site.url }}"
,link:"{{ site.url }}"
,feed:"{{ site.url }}/Atom"
,author:"{{ site.author }}"
,email:"{{ site.email }}"
,entries:[{% for post in site.posts %}
{title:"{{ post.title }}"
,link:"{{ site.url }}{{ post.url }}"
,updated:"{{ post.date | date_to_xmlschema }}"
,id:"{{ site.url }}{{ post.id }}"
},{% endfor %}
{}]
}))