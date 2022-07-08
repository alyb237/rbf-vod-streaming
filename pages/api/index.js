export default function handler(request, response) {
  console.log(request);
  response.send('ok');
  response
    .status(200)
    .json({ session: `http://${request.headers.host}/session` });
}
