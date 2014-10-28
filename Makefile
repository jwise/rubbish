all:
	node_modules/.bin/templatizer  -d templates/ -o client/templates.js
	moonboots moonbootsConfig.js
