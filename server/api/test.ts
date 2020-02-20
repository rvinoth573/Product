
//IMPORT REFERENCE FILES FROM NODE_MODULES
import { Router, Request, Response } from 'express';
// Import the axios library, to make HTTP requests
const axios = require('axios')

const router: Router = Router();
const clientID = 'e4df81b40dff70508363';
const clientSecret = '4b14fa48db60bffaf5d4a5213d5573b0c4ec9b51'

router.get('/getData', (req: Request, res: Response) => {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!'
  });
  res.end();
});


// This line is wrong too - ask a separate question if needed
var requestTime = Date.now;

router.post('/messages', async function (req: Request, res: Response) {
  console.log("received request");

  // handle the response
  var body = req.body;
  res.status(200).send({ success: true });
  console.log("sent response");

  // Method 1:
  await performComplexTasks()

  // Method 2:
  setTimeout(() => performComplexTasks(), 0);
})

async function performComplexTasks() {
  // The line below is required if using the `await` method -
  // it breaks execution and allows your previous function to
  // continue, otherwise we will only resume the other function after
  // this function is completed.
  await new Promise(resolve => setTimeout(resolve, 1));

  // perform data with body data here;
  console.log("finished tasks:", Date.now(), "ms");
}



// Declare the redirect route
router.get('/oauth/redirect', (req: any, res: any) => {
  console.log('started!')
  console.log('code' + req.query.code)
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response: any) => {
    // Once we get the response, extract the access token from
    // the response body
    console.log('test success again!')
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.redirect(`http://localhost:4201/home=${accessToken}`)
  })
})

module.exports = router;