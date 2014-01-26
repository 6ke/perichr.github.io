---
layout: nil
---
(callback_archive({title:"{{ site.title }}",link:"{{ site.url.production }}",entries:[{% for post in site.posts %}{title:"{{ post.title }}",link:"{{ site.url.production }}{{ post.url }}",updated:"{{ post.date | date_to_xmlschema }}"},{% endfor %}{}]}))