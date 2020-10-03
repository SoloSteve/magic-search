![alt text](client/public/icons/favicon-192x192.png)

[![GitHub Issues](https://img.shields.io/github/issues/SoloSteve/magic-search)](https://github.com/SoloSteve/magic-search/issues)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![Magic 100](https://img.shields.io/badge/magic-100%25-orange)](https://github.com/SoloSteve/magic-search)

# magic-search
Amaze people with this super simple magic trick.

Imagine going up to someone and asking to use their phone for a simple Google search. 
You type something and place their phone face down so neither you or the spectator can see the screen.
You ask them to think of anything they want, and magically, you've searched for that exact thing beforehand, 
knowing what they were thinking of before they knew it themselves!

## How it works
### Setup
1. Have this application up and running on a server.
2. You will need a friend who is in on the trick.
3. Open up the website on the friend's phone. We'll refer to him as the Mastermind from now on.
4. Select the role of Mastermind and agree on a pin that you, the performer will remember. 
5. Enter the pin on the Mastermind's phone and begin the performance.

### The Performance
This part you can play around with and make your own version, but the premise stays the same.

You make up a story about how you are able to read minds, whether because you and the spectator are long-lost twins,
or you're just very good at reading minds. Remember, you want to make this believable as possible as to not arouse suspicion.

In order to prove your claim to them,  
ask to look at their phone for a quick Google search, 
but make sure they can't see your screen.

With their phone in your hand and a browser opened, pull up your application that you set up from before.
Select the role of victim and enter the Mastermind's pin. At that point the screen will go fullscreen and turn black.

Place their phone face down on a table.

Begin a line of questioning that will eventually conclude itself with a noun.
Something that will look good in a Google image search. Like a "Red Flower", or a "Nokia 3310".

Make sure to give a signal to the Mastermind letting him know which phase is the final answer, something like:
```text
"So you're thinking of 'thing', are you sure? No going back. Okay, `thing` it is."
```

At this point the Mastermind should understand that the phrase will not change and he will then enter that string into
the search box. This will replace the black screen with a Google image search of that string.

Reveal that you new all along that he was going to pick this thing, and have him look at his phone.

Bravo!


## Things to note
* The victim will not be able to use the back button and won't be able to discover how you did it. 
However, the magic website will show up in their browser history. 
* The Mastermind cannot disconnect from the website at the moment.
* It is recommended you practice your presentation with the Mastermind ahead of time.
* It does seem to work even if the phone's screen is locked.


## Installation and Usage
### Prerequisites 
* [Node.js](https://nodejs.org/en/download/) & npm Installed
* Clone the repo or download its zip (and unzip).

### Installing Dependencies
#### Front End
Go into the client directory (`magic-search/client`) and run:
```shell script
$ npm install
```
This will download all the build dependencies.

Next we build the front end.
```shell script
$ npm run build
```
The built files will be inside the `dist` directory.

#### Back End
Go into the server directory (`magic-search/server`) and run:
```shell script
$ npm ci
```
This will download only the files needed to run the server.

Next we compile the TypeScript Files:
```shell script
$ npm run compile
```

### Usage

Quickstart: `npm start -- --port 1337 --serve ../client/dist/spa`

After you have everything all set up we can go ahead and run our server.
Simply run: `$ npm start` or `$ node dist/index.js`.

Options:
```text
Options:
  --serve <root-path>  Enables the static file server at path
  --port <port>        The server port (default: "1337")
  -h, --help           display help for command
```

If you did everything correctly you will see some info and debug logs.
You can now open up your web browser and surf to your server's URL.

#### Credits
Icons made by [Freepik](http://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/) 

