# Getting Started with HTR SPORTS
By: Kevin, Carlos, Junior, Mariglen, Haley

## Steps
git clone https://github.com/KevinFernandez16/htr_sports_front
cd htr_sports_front
cd htr_sports
npm install @material-ui/core
npm i -S @react-google-maps/api
npm install react-scripts
For the 3 npm commands, you may have to add --force to the end of each command
npm start

### Bugs
- The css <p> tags are always red despite our attempts to change it
- The geolocation does not track the user's location. It has to be inserted manually into the code
- Some bugs in the project mainly include stuff with the API. For example, in the main soccer page, soccer.jsx, when searching for a country
  you would have to specifically write the name of the country the way it is spelt inside the API. For example if you were to write 
  'United States' and then search for the soccer leagues, it would not display anything. Instead you would have to type in 'USA' for any
  leagues to show up. Another issue that is mainly due to the API is that some values in the API were empty.
- The form email validation sometimes accepts wrong email format.
- When you click on the "My Profile" tab too quicky, it doesn't lead to your actual profile but instead to a dummy one
- The StreetView doesn't work on the map
- Login link for "already have an account" on "SignUp" page leads to an old file
- Soccer News takes a while to appear and then may randomly crash