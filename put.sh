curl --header "Content-Type: application/json" \
  --header "token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUG9tcGV1IiwiZW1haWwiOiJpYUBuZXQuY29tIiwiaWF0IjoxNjMwMDk4MTgyfQ.vggoE3VPeFsspeITHdBGCnFSbzwFqFQTXQ1Re5vHYFY " \
  --request PUT \
  --data '{"name": "Pompeu", "email": "ia@net.com"}' \
  http://localhost:3000/api/user/6126bafd316bd782bd9c5ba8
