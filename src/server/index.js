import express from 'express'
import cors from 'cors'
import * as React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../shared/App'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use("/", express.static(__dirname + "../../public"));

// page varibale's should be dynamically set
var title = "Aayush Garg"
var comment = "nothing"
var descriptionOfContent = "This is my personal website, i am a 14 year old software developer, involved in many projects"

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const markup = ReactDOM.renderToString(
      <StaticRouter location={req.url} context={{ data }}>
        <App />
      </StaticRouter>
    )
    res.send(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content=${descriptionOfContent}
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap"
          rel="stylesheet"
        />
        <script src="/bundle.js" defer></script>
        <link href="/main.css" rel="stylesheet">
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        <title>${title}</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="app">${markup}</div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script>
          $(document).ready(function(){
            $('.sidenav').sidenav();
          });
        </script>
      </body>
    </html>
    <!-- ${comment}-->
    `)
  }).catch(next)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})