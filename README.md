# PhysikOnline's Support widget

Small widget used to make it easier for people on our websites to send us support requests.

To minify and compile to es15 do
```
npm install
gulp
```
Your minified files will be placed in `./dist`, just include them to activate the widget.

`api.php` is our version of the backend api to actually send the mail and is located at http://physikonline.uni-frankfurt.de/support-mail. You have to change the url in `support-mail.js` to match your setup.

For development purposes there is also a sample `index.html` and dev-server via `gulp minify-watch` available.
