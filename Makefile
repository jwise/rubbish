build: worker/defaultdb.js component

worker/defaultdb.js: default.db
	(printf 'var defaultdb="'; base64 -w0 < default.db; echo '";') > worker/defaultdb.js

component:
	mkdir -p build
	component build

rsync:
	rsync -av . --progress nyus:/var/www/dgsql/