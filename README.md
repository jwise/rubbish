# dgjs2

This app is the second generation of the Death Guild browser.  To run it, you should:

1. Make sure your have Node installed on your system.
1. Install the dependencies: `npm install`
1. Grab a database to use with it -- either a [prebuilt one](http://nyus.joshuawise.com/dgjs2/db.json), or [build your own](https://github.com/jwise/rubbish/tree/dg-scraper) -- and put it in `public/db.json`.
1. Launch the local web server: `npm start`
1. Open http://localhost:3000 in a browser.

If you want to build a "release" version, `make` should put all the build products in `build/`, all ready for you to copy to a web server.
