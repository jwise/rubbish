all:
	node_modules/.bin/templatizer  -d templates/ -o client/templates.js
	node_modules/.bin/moonboots moonbootsConfig.js
