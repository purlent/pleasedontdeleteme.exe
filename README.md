# please don't delete me.exe

a cozy digital-pet game made with plain html, css, and javascript. it runs as a static website with no account, backend, paid api, or external game library.

## run it locally

1. keep the project files together in one folder.
2. open `index.html` in a current browser.
3. name your pet, optionally choose a name for yourself, select one of six colors, preview your pet, and begin.

or run a local server from the project folder with `python -m http.server 8000`, then visit `http://localhost:8000`. no build step is required.

## how to play

- **places** lets you visit the bedroom, kitchen, living room, and park without spending coins.
- **feed** works in the kitchen. buy food with coins, select it from your pantry, then feed it to restore the listed fullness and happiness.
- **play** or **play minigames** opens falling stars, memory match, and garden gathering. completed rounds award coins; each game has a 15-coin daily reward cap.
- **pet** gives your friend affection wherever you are.
- **talk** chooses a response based on mood, needs, relationship, and the current room.
- after three interactions, your friend may ask how you are. replies are selected locally from common emotional words; the game does not save the message or send it anywhere.
- **sleep** works in the bedroom and restores energy at five points per second. at 30 energy or below, the button gently highlights; it stays available at zero and wakes your friend automatically at 100.
- room activities offer calm bonding, outdoor play, and location-specific memories. the activity menu shows at most four moments at once and pages through the rest. each scene offers at most four context-specific choices with distinct dialogue and pet reactions. shared moment ids count once toward progression, and a saved recent-choice list supports later callbacks.
- the gear opens sound, appearance, backup, feedback, and reset options.
- on desktop, the number keys `1`–`5` activate feed, play, pet, talk, and sleep.

energy and fullness drift slowly while the game is open. fullness decreases by 0.03 points per active minute (1.8 per hour), about 1.5 times the previous rate; while away it decreases by 1.65 points per hour, capped at eight hours. energetic park activities and minigame rounds use energy; feeding and petting do not. a nap resumes safely after refresh using its saved start time; timer identifiers are never saved.

## adoption and appearance

new players choose a pet name, may add their own name for personalized dialogue, select a color, and preview their pet before entering the game. the color choices are lavender dream, strawberry milk, mint cloud, blue hour, butter cookie, and moonlight. existing players keep their saved names and color. use **change appearance** in settings to choose another color without resetting progress.

## rooms, food, and coins

the bedroom is for quiet moments and sleep; the kitchen contains the food shop and pantry; the living room offers calm activities and the arcade; the park has outdoor activities that improve happiness and use energy. the room selector stays available in every location. trying to feed or sleep in another room offers a direct shortcut rather than moving your pet automatically.

a new save starts with 30 coins. food prices and fullness gains are: berry biscuit (5 coins, +15), honey toast (8, +25), strawberry cake (12, +35), veggie soup (10, +30), and moonberry pudding (18, +45). buying adds one item to the pantry but does not feed your pet. a meal consumes exactly one item, never raises fullness above 100, and reports the actual amount restored.

the three games cost five energy per round. falling stars runs for 20 seconds and awards up to 6 coins by score; memory match awards 5 coins plus a 3-coin bonus for ten moves or fewer; garden gathering awards one coin per collected object, up to 8. each game can award at most 15 coins per local calendar day, and unfinished rounds do not pay out. each game can be started five times in a rolling two-hour period. the game shows the remaining plays and disables a game when all five starts are used; a play becomes available two hours after its round began. starting a round counts even if it is closed early.

## shared moments and story progression

the shared-moment counter advances through meaningful meals, conversations, room activities, petting, naps, and completed minigames—not by opening menus or changing rooms. each saved activity identifier counts once toward chapter progress; repeating it on another day can still be enjoyed, but does not inflate the shared-moment total. older saves keep their saved total while new moments are deduplicated. daily ideas rotate by local date and are optional, with no streak requirement.

chapters unlock in order after the preceding chapter is kept:

- chapter 1, **the first hello**, is available when the game begins.
- chapter 2, **familiar pixels**, requires 5 shared moments.
- chapter 3, **the forgotten message**, requires 12 shared moments.
- chapter 4, **the space between visits**, requires 20 shared moments and visits on two different local calendar days.
- chapter 5, **a place to return to**, requires 30 shared moments and 75 affection.

the journal shows each chapter's remaining requirements, including the previous chapter, moment threshold, return-date, or affection requirement as applicable. its moment count uses the same saved progression value as the main-screen counter. four separate place memories can be discovered through bedroom, kitchen, living-room, and park activities. they appear in the journal independently of the three existing secret stories, whose unlock conditions remain unchanged.

## stories and memories

the memory book contains five connected chapters and three secret memories. open a chapter and select **keep this chapter** to complete it. later chapters unlock in order:

- chapter 1 is available when the game begins.
- chapter 2 requires chapter 1 complete and 5 shared moments.
- chapter 3 requires chapter 2 complete and 12 shared moments.
- chapter 4 requires chapter 3 complete, 20 shared moments, and visits on two different local calendar days.
- chapter 5 requires chapter 4 complete, 30 shared moments, and 75 affection.

secrets unlock separately from discovery. an unlocked secret becomes discovered only after opening and reading it. each locked entry offers an indirect clue; the matching story condition is checked during the associated conversations or actions:

- **the message in the window:** complete chapter 1, reach five interactions, then talk while happiness is at least 60.
- **a memory of rain:** complete chapter 2, pet five times, and have three distinct bonding or reflective conversation lines. then pet or talk.
- **the message left behind:** complete chapter 3, discover the first two secrets, visit on three different local calendar days, then talk while happiness is at least 70.

the journal keeps unlocked stories available after reading and shows hints for locked entries. the first time a secret unlocks, a distinct on-screen notice appears; a secret cannot unlock more than once. visits on the same local date count once. the ending preview appears after all three secrets are discovered and affection reaches 75.

## creator note and check-in

the creator note opens from the tappable footer below the game. the optional check-in opens after three interactions and can be dismissed for the day. it accepts free-text messages and uses a local phrase matcher with varied response pools for greetings, jokes, questions about the pet, activities, food, sleep, memories, and common feelings. it can refer to the latest shared activity and keeps a short category/topic context for follow-ups. close it at any time, or choose listening, a cheer-up, a distraction, or help thinking something through. recent replies and openers are rotated to reduce repetition. this is not an ai or a substitute for a human conversation; typed messages stay in the current page and are removed when the conversation closes. press enter to send; use shift+enter for a new line.

## activity scenes, discoveries, and pet reactions

room activities open a short choice scene. the selected response changes the pet's dialogue, saved activity choice, and visible reaction. the pet moves to the matching furniture or park location before the scene plays.

five optional room discoveries have their own gameplay requirements. tap or keyboard-activate their related furniture to get staged clues and check for a discovery; there is no separate inspection button. the journal records discoveries separately from the three existing story secrets. each find is saved once and uses the same distinct notification treatment as story secrets. the memory book also has free, tiered hints for each undiscovered story secret; hint levels persist locally and viewing a hint never unlocks a secret. hints are intentionally indirect.

the pet has idle blinking and ear movements, plus short happy, curious, concerned, and shy reactions. room furniture and environmental details can be tapped or keyboard-activated for contextual comments and pet movement; these interactions do not spend coins, energy, or shared-moment progress. reduced-motion preferences disable these animations.

## saves and backups

progress is saved automatically in local storage for the current browser on the current device. each browser profile has its own save; saves are not shared with other visitors and are not cloud saves. private browsing, clearing browser data, or switching browsers or devices can make a save unavailable. export a backup if you want to keep a portable copy.

in settings, **export my memories** downloads `please-dont-delete-me-save.json`. the file contains a format version and export timestamp as well as both names, room, coins, food inventory, needs, shared moments, minigame records, story progress, memories, settings, and other saved progress. **import my memories** checks the selected json file and asks before replacing the current save. malformed or unsupported files are rejected with an in-game message. imported data is treated as data, never executed as code.

older saves are migrated with safe defaults, including the default lavender color, starting coins, a home room, and a reasonable moment count based on already-open chapters. existing names, stats, chapter states, secrets, and settings are retained. invalid optional fields are repaired without intentionally clearing other progress. if a save cannot be parsed, the game explains that and does not overwrite it during startup; import a backup or choose a name to begin a new save. if local storage is unavailable or full, the game displays a save error instead of reporting success.

## test energy and sleep

to test a specific energy value, open the browser developer tools console on the game page and run this snippet, replacing `0` with `1`, `30`, `99`, or `100` as needed:

```js
const key = "please-dont-delete-me-save-v1";
const save = JSON.parse(localStorage.getItem(key));
save.energy = 0;
save.sleeping = false;
save.sleepStartedAt = null;
save.sleepStartEnergy = null;
localStorage.setItem(key, JSON.stringify(save));
location.reload();
```

at 0–30 energy, confirm the sleep button is highlighted. at 0–4, confirm play politely refuses to start. sleep from zero and watch the meter rise to 100; confirm the nap ends and regular actions return. at 99, recovery takes about a fifth of a second; at 100, sleep is disabled because no energy is missing. to test refresh recovery, start a nap and refresh before it ends. confirm that the nap resumes and that the saved data contains `sleeping`, `sleepStartedAt`, and `sleepStartEnergy`, but no timer identifier.

## test the story and backups

- use a fresh browser profile to test name entry, all six swatches, the live preview, and color persistence after refresh.
- use **change appearance** and verify that stats, chapters, and memories remain unchanged.
- complete chapters by opening each available entry and keeping it; use the journal hints to check the next unlock conditions.
- test each secret with its conditions above. reading a secret should increment the discovered count once; reopening it should not count it again.
- refresh on the same day to confirm that repeated visits add only one local date.
- export a backup, change the pet's color, then import the file and confirm replacement. also try malformed json and cancel the replacement prompt.
- test the page at 360px, 390px, 768px, and 1366px widths, using both touch and mouse where available.

## test the world and economy

- open **places**, visit each room, and confirm the room name, illustrated furniture, activities, and available panels change. confirm feeding moves the pet toward the kitchen table, sleep moves it to the bed, sofa activities move it to the sofa, and park activities move it to their outdoor spot. try feed and sleep from the wrong room and use the offered shortcut.
- in the kitchen, buy a berry biscuit, verify the balance drops by 5, feed it, and check that one item is removed and fullness never exceeds 100. try to buy a food you cannot afford.
- in the park, take a walk and confirm happiness rises, energy falls by 6, and the same activity is unavailable for another shared moment until the next local calendar day.
- play each arcade game to completion. verify its score and reward, try finishing the same round twice, and confirm there is only one payout. test falling stars with reduced motion enabled.
- start five rounds of one minigame and confirm its choice is disabled with the cooldown shown; start another game and verify its separate count. refresh to confirm counts remain, then test an old attempt timestamp to verify it expires after two hours.
- submit blank, `hi`, `i'm bored`, `i had a bad day`, `i'm happy today`, `do you like me?`, `tell me something funny`, `what should we do?`, `i don't know what to say`, `i missed you`, `i'm going to sleep`, `what's your favorite food?`, a memory question, and an unrecognized message. verify empty text is rejected, replies vary, duplicate submissions are blocked during the response delay, enter sends, shift+enter inserts a line break, the dialog can be closed, and typed text is absent from local storage.
- try different choices in multiple room activity scenes and confirm labels, dialogue, and pet reactions are specific to each activity and option. tap or keyboard-activate related room objects for clues, then refresh and confirm found entries remain in the journal without repeating their notice.
- open the memory book, reveal additional secret hints, refresh, and confirm hint levels remain saved. view a hint alone and verify that the secret count does not change; read a genuinely unlocked secret to confirm it is counted once.
- open the creator note from the footer by mouse and keyboard, then close it with its button and the escape key. check that the full note remains readable on a phone-sized viewport.
- click or keyboard-activate objects in each room and confirm contextual dialogue and pet movement, without changing coins, energy, or shared-moment totals.
- read and keep each unlocked chapter. check the journal's moment thresholds at 5, 12, 20, and 30; a repeated activity must not raise the total twice. chapter 4 also requires a second visit date, and chapter 5 still needs 75 affection.
- discover place memories through their room activities, read them in the journal, refresh, and confirm room, coins, inventory, moments, memories, and chapter states remain saved.
- export the save and confirm the json includes room, coins, inventory, minigame records, names, and moment progress. import it into a test save and verify those fields return.
- repeat room, shop, minigame, and journal checks at 360px, 390px, 768px, and 1366px. use a touchscreen or browser touch emulation, and check dark mode and reduced motion.

## customize it

- edit the dialogue lists near the top of `script.js` to change what your friend says.
- edit the chapter and secret story entries in `script.js` to change the narrative or unlock conditions.
- adjust need changes, energy balance, and minigame rewards in `script.js`.
- change colors, spacing, and animations in `style.css`.
- the creature is an inline svg in `index.html`; its expressions are styled by mood classes in `style.css`.
- keep visible game copy lowercase to preserve the intended look.

## publish it

### github pages

1. create a github repository and add the project files.
2. open the repository's **settings**, then **pages**.
3. choose a branch and root folder, then save.
4. when github pages finishes publishing, open the provided site link.

### netlify

1. sign in to netlify and choose **add new site**.
2. import the repository, or drag the project folder into the manual deploy area.
3. leave the build command empty and set the publish directory to the project root.
4. deploy and open the site url netlify provides.

the game is client-side, so publish the static project files as they are.

## accessibility and privacy

buttons have accessible labels and visible keyboard focus styles, the game supports reduced-motion preferences, and the star game works with mouse or touch. the game does not access the camera, microphone, contacts, or private files. optional soft tones are generated in the browser and can be switched off.

## themes, audio, and feedback

settings are grouped into appearance, audio, game preferences, your memories, and send feedback. choose `☀ light mode` or `☾ dark mode` to change the palette immediately. the selected theme is saved with the pet and is not overridden by the device theme.

background music uses original melodies generated with the web audio api, with a different sequence for each room and short cues for story and discovery events. sound effects use generated tones too; no audio tracks or sound files are bundled. browsers may wait for a user gesture before playing audio, so enable music in settings or interact with the game to begin playback. music and effects have separate switches and volume sliders, and the choices are saved locally. the audio controls are independent of the existing sleep and gameplay systems.

the `audio-assets` folder contains notes for adding properly licensed local recordings later. it does not currently contain audio files. if you add any, include the license or attribution information alongside them.

the first adoption now starts with fullness at 65, happiness at 60, and energy at 75. the optional tutorial appears after the first meeting and can be skipped. returning saves and appearance changes keep their existing stats and story progress.

the settings feedback section does not send messages to a service. players can open the creator's instagram profile at [@vonliezt](https://www.instagram.com/vonliezt/) and send a message themselves, or copy the handle or a prepared feedback note to share.

## test themes, audio, and first adoption

- reset only a test save, then adopt a new pet and confirm the starting values are 65, 60, and 75. skip the tutorial and refresh; it should not appear again.
- change between light and dark mode, refresh, and confirm the selected palette remains active.
- enable background music and sound effects separately, adjust both volume sliders, refresh, and verify their settings persist. playback may wait until the first click, key press, or touch because of browser audio restrictions.
- with music enabled, visit all four rooms and confirm the melody changes with the location. turn music off and confirm story and discovery cues do not play.
- try the feedback category, type a note, copy the handle and prepared note, and confirm that no control claims the note was sent.
- test the decoration layout at mobile and desktop widths and enable reduced motion in the operating system or browser to check that decorative movement becomes still.
