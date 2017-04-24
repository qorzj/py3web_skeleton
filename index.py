import web
from controller import add_book, update_book, detail_book, list_book, delete_book

web.config.allow_remote_ajax = True
web.config.static_path = './www'

app = web.application()

app.add_mapping('/book/add', post=add_book)
app.add_mapping('/book/(?<id>[0-9]+)', get=detail_book, put=update_book, delete=delete_book)
app.add_mapping('/book/list', get=list_book)
app.add_mapping('/apidoc', get=lambda: web.apidoc)

app.run()
