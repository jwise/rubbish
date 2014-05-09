defaultdb.js: default.db
	(printf 'var defaultdb="'; base64 -w0 < default.db; echo '";') > defaultdb.js
