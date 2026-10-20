const SAVE_KEY = "please-dont-delete-me-save-v1";
const SAVE_FORMAT = "please-dont-delete-me-save";
const SAVE_FORMAT_VERSION = 5;
const MAX_OFFLINE_HOURS = 8;
const PLAY_ENERGY_COST = 5;
const SLEEP_ENERGY_PER_SECOND = 5;
const ACTIVE_ENERGY_PER_MINUTE = 0.025;
const ACTIVE_HUNGER_PER_MINUTE = 0.03;
const MINIGAME_PLAY_LIMIT = 5;
const MINIGAME_COOLDOWN_MS = 2 * 60 * 60 * 1000;
const ROOMS = [
  { id: "bedroom", name: "bedroom", icon: "🛏️", description: "a quiet place to rest." },
  { id: "kitchen", name: "kitchen", icon: "🍵", description: "something delicious might be waiting." },
  { id: "living-room", name: "living room", icon: "🛋️", description: "let's spend some time together." },
  { id: "park", name: "park", icon: "🌷", description: "the outside world is calling." }
];
const FOODS = [
  { id: "berry-biscuit", name: "berry biscuit", icon: "🍪", price: 5, fullness: 15, happiness: 2, reactions: ["a crisp bite makes the afternoon brighter. ♡", "i can taste the berries in every crumb.", "this is exactly the sort of snack i hoped for."] },
  { id: "honey-toast", name: "honey toast", icon: "🍯", price: 8, fullness: 25, happiness: 3, reactions: ["this tastes like a sunny morning.", "the honey makes everything feel warm.", "i could listen to toast crunch all day."] },
  { id: "strawberry-cake", name: "strawberry cake", icon: "🍰", price: 12, fullness: 35, happiness: 5, reactions: ["wait... can we save a piece for later?", "the pink frosting is almost too pretty to eat.", "this tastes like a celebration just for us."] },
  { id: "veggie-soup", name: "veggie soup", icon: "🥣", price: 10, fullness: 30, happiness: 4, reactions: ["warm and cozy. just how i like it.", "i think the steam is carrying a familiar smell.", "my whole tummy feels like a soft blanket."] },
  { id: "moonberry-pudding", name: "moonberry pudding", icon: "🍮", price: 18, fullness: 45, happiness: 7, reactions: ["how did you find something this magical?", "it shimmers like a night sky in a teacup.", "i want to remember this flavor forever."] }
];
const MOMENTS = [
  { id: "kitchen-table-chat", room: "kitchen", title: "chat by the table", category: "kitchen", lines: ["the table feels warmer when we sit here together.", "i like having a place to rest between bites."] },
  { id: "kitchen-morning-tea", room: "kitchen", title: "share a quiet morning", category: "kitchen", lines: ["the morning tastes softer when we share it.", "i think the kettle is humming just for us."] },
  { id: "kitchen-favorite-food", room: "kitchen", title: "discover a favorite", category: "kitchen", lines: ["i think i know which flavor makes me happiest now.", "we found a new favorite, didn't we?"] },
  { id: "kitchen-new-flavor", room: "kitchen", title: "try a new flavor", category: "kitchen", lines: ["every new taste has its own story.", "i wonder what this flavor will remind me of."] },
  { id: "kitchen-recipe-note", room: "kitchen", title: "write a recipe note", category: "kitchen", lines: ["let's save this recipe in our memory book.", "i'll remember the ingredients if you remember the afternoon."] },
  { id: "kitchen-pantry-sort", room: "kitchen", title: "arrange the pantry", category: "kitchen", lines: ["our pantry looks ready for another shared meal.", "i like knowing our favorite things have a place."] },
  { id: "bedroom-tuck-in", room: "bedroom", title: "tuck in together", category: "bedroom", lines: ["the blanket is just right. stay for one more quiet thought?", "i feel safe when the room gets soft around the edges."] },
  { id: "bedroom-rain-window", room: "bedroom", title: "watch the rain", category: "bedroom", lines: ["the rain makes the window sound like a lullaby.", "i think i've heard this familiar rhythm before."] },
  { id: "bedroom-bedtime-thought", room: "bedroom", title: "share a bedtime thought", category: "bedroom", lines: ["i'll keep that thought somewhere safe until morning.", "the dark feels friendly when we talk like this."] },
  { id: "bedroom-morning-greeting", room: "bedroom", title: "say good morning", category: "bedroom", lines: ["morning already? i'm glad we get to start it together.", "the daylight found its way back to our window."] },
  { id: "bedroom-pillow-fort", room: "bedroom", title: "build a pillow fort", category: "bedroom", lines: ["this fort has room for all our thoughts.", "we should give the pillow fort a very important name."] },
  { id: "bedroom-dream-talk", room: "bedroom", title: "talk about a dream", category: "bedroom", lines: ["i dreamt of a door that opened onto a familiar sky.", "the dream felt like somewhere i had almost remembered."] },
  { id: "living-read-book", room: "living-room", title: "read a book together", category: "living-room", lines: ["i like how the story gives the quiet somewhere to wander.", "could we read one more page before the ending?"] },
  { id: "living-sofa-sit", room: "living-room", title: "sit on the sofa", category: "living-room", lines: ["i like spending quiet afternoons with you.", "we don't have to fill every pause with words."] },
  { id: "living-listen-music", room: "living-room", title: "listen to music", category: "living-room", lines: ["the melody makes the room feel like it's breathing.", "i think this tune belongs in our home."] },
  { id: "living-strange-dream", room: "living-room", title: "talk about a strange dream", category: "living-room", lines: ["the dream ended at a place i thought i had forgotten.", "sometimes a dream leaves a note behind in your heart."] },
  { id: "living-plush-toy", room: "living-room", title: "play with a plush toy", category: "living-room", lines: ["the plush has heard all our best secrets.", "i think our new friend likes this room too."] },
  { id: "living-window-light", room: "living-room", title: "follow the window light", category: "living-room", lines: ["the light draws a map across the rug.", "we could follow that sunbeam all the way to a story."] },
  { id: "living-share-blanket", room: "living-room", title: "share a blanket", category: "living-room", lines: ["there's enough blanket for both of us.", "i like how a warm room can make time slow down."] },
  { id: "living-draw-together", room: "living-room", title: "draw together", category: "living-room", lines: ["i drew a door and left it open for you.", "our picture looks like a place we could return to."] },
  { id: "park-butterflies", room: "park", title: "chase butterflies", category: "park", energy: 4, happiness: 8, lines: ["the butterfly left a trail of sunlight behind it.", "i wonder if it knows how lovely it looks."] },
  { id: "park-watch-clouds", room: "park", title: "watch the clouds", category: "park", happiness: 4, lines: ["that cloud looks a bit like the place where we first met.", "we could make up stories for every cloud in the sky."] },
  { id: "park-gather-flowers", room: "park", title: "gather flowers", category: "park", energy: 2, happiness: 6, lines: ["these flowers can brighten our windowsill.", "i'll remember this color when the garden is quiet."] },
  { id: "park-roll-ball", room: "park", title: "roll a ball", category: "park", energy: 5, happiness: 9, lines: ["your turn! i think the ball wants to visit every corner.", "that was a very good roll. let's count it as a victory."] },
  { id: "park-small-walk", room: "park", title: "take a small walk", category: "park", energy: 6, happiness: 7, lines: ["the path keeps going, and so does our story.", "i like finding new shapes in the same familiar path."] },
  { id: "park-bench", room: "park", title: "rest on a bench", category: "park", happiness: 3, lines: ["the bench has room for a story and a pause.", "let's watch the leaves before we head anywhere."] },
  { id: "park-hidden-object", room: "park", title: "look for a keepsake", category: "park", happiness: 5, lines: ["something in the grass is shining like a saved memory.", "i found a strange button. it looks like it belongs to a window."] },
  { id: "park-sunset", room: "park", title: "watch the sunset", category: "park", happiness: 5, lines: ["the sky is keeping the last light for us.", "i'll remember this color after the stars come out."] },
  { id: "bond-comfort", room: "living-room", title: "offer comfort", category: "heart", lines: ["thank you for staying near me while i found my words.", "i feel braver when we share the quiet."] },
  { id: "bond-name-memory", room: "living-room", title: "remember our first hello", category: "heart", lines: ["my name feels like a warm place when you say it.", "i remember the first time you called me by my name."] },
  { id: "bond-return-place", room: "living-room", title: "remember a familiar place", category: "heart", lines: ["we've left kind thoughts in every room.", "every place feels familiar when we've shared it together."] },
  { id: "bond-celebrate", room: "living-room", title: "celebrate our bond", category: "heart", lines: ["look how far our story has traveled.", "this feels like a day worth keeping."] },
  { id: "bond-memory-fragment", room: "park", title: "look for a memory", category: "heart", lines: ["a memory is taking shape where our paths meet.", "i think the world left us a clue to find together."] },
  { id: "bond-read-chapter", room: "living-room", title: "read our story", category: "heart", lines: ["i like hearing the story of us in your voice.", "this page feels more real because we lived it together."] },
  { id: "bond-gentle-pet", room: "living-room", title: "share a kind pat", category: "heart", lines: ["your pats make the whole room feel kind.", "i'll keep this soft moment close."] },
  { id: "kitchen-shared-snack", room: "kitchen", title: "share a snack", category: "kitchen", lines: ["sharing food makes the kitchen feel like ours.", "i'll remember this meal whenever i smell berries."] },
  { id: "bedroom-rest-together", room: "bedroom", title: "rest together", category: "bedroom", lines: ["i slept well knowing you were close by.", "morning feels peaceful after a rest like that."] },
  { id: "living-minigame-stars", room: "living-room", title: "catch stars together", category: "living-room", lines: ["we caught a handful of starlight and kept the laugh.", "the stars looked brighter when we chased them together."] },
  { id: "living-minigame-memory", room: "living-room", title: "match our memories", category: "living-room", lines: ["we found every pair, just like we find our way back.", "our memories fit together better than i expected."] },
  { id: "living-minigame-garden", room: "living-room", title: "gather garden colors", category: "living-room", lines: ["we brought a garden's worth of color home.", "every flower reminded me of a place we visited."] },
  { id: "kitchen-topping-vote", room: "kitchen", title: "hold a topping vote", category: "kitchen", lines: ["the topping vote was close, but the crumbs have made their choice.", "i stand by our winning combination. mostly."] },
  { id: "kitchen-snack-ranking", room: "kitchen", title: "rank the snacks", category: "kitchen", lines: ["we made a very official snack ranking. the biscuit requested a recount.", "every snack made a strong case for itself."] },
  { id: "kitchen-questionable-recipe", room: "kitchen", title: "invent a strange recipe", category: "kitchen", lines: ["our recipe sounds questionable, but the kitchen has not filed a complaint.", "i would try it again, with a spoon nearby just in case."] },
  { id: "bedroom-name-raindrops", room: "bedroom", title: "name the raindrops", category: "bedroom", lines: ["we gave the raindrops names. one of them sounded very proud.", "the window has become a roll call for clouds."] },
  { id: "bedroom-cloud-story", room: "bedroom", title: "make up a cloud story", category: "bedroom", lines: ["our cloud story had a brave umbrella and a very confused moon.", "i want to hear what happens in the next chapter."] },
  { id: "bedroom-rain-rhythm", room: "bedroom", title: "listen to the rain rhythm", category: "bedroom", lines: ["we found a beat in the rain and tapped along on the blanket.", "the storm made a surprisingly good drummer."] },
  { id: "living-movie-pick", room: "living-room", title: "pick a very silly movie", category: "living-room", lines: ["our movie choice had a dramatic sofa and an excellent ending.", "i would give that film three stars and one cushion."] },
  { id: "living-snack-debate", room: "living-room", title: "debate the best snack", category: "living-room", lines: ["we debated snacks like there was a trophy at stake.", "i have made my case. the biscuit has made a crumbly counterargument."] },
  { id: "living-cushion-fort", room: "living-room", title: "build a cushion fort", category: "living-room", lines: ["our cushion fort has excellent walls and questionable architecture.", "i claim the corner seat as my command post."] },
  { id: "park-odd-leaves", room: "park", title: "collect odd-shaped leaves", category: "park", energy: 2, happiness: 4, lines: ["we found a leaf shaped like a crooked map.", "the oddest leaf won our very serious contest."] },
  { id: "park-race-to-bench", room: "park", title: "race to the bench", category: "park", energy: 4, happiness: 6, lines: ["we raced to the bench. i arrived with a very dignified victory pose.", "the path was short, but our celebration was enormous."] },
  { id: "park-name-pond-ripples", room: "park", title: "name the pond ripples", category: "park", happiness: 4, lines: ["we named the ripples as they crossed the pond. none stayed still long enough to answer.", "the pond kept our names moving long after we stopped talking."] }
];
const PLACE_MEMORIES = [
  { id: "bedroom-dream", room: "bedroom", title: "the recurring dream", text: "i keep dreaming about blue light and rain tapping somewhere nearby. the details change every time. last night i was pretty sure the rain was trying to tell a joke, but i woke up before the punchline." },
  { id: "kitchen-aroma", room: "kitchen", title: "a familiar smell", text: "something warm was cooking, and i stopped mid-sentence to sniff the air. it reminded me of a morning i can't quite place. i still don't know what was in the pot, but i would happily investigate." },
  { id: "living-home", room: "living-room", title: "the sofa is claimed", text: "i picked the sofa cushion with the best view of the room. now it feels like my seat, even though i get up every few minutes to check the bookshelf. apparently that is how a room becomes familiar." },
  { id: "park-keepsake", room: "park", title: "the button in the grass", text: "we found a blue button near the flowers. i have no idea what it came from, but i gave it an important job: sitting safely in our memory book until we learn more." }
];
const HIDDEN_FINDS = [
  {
    id: "bedroom-floorboard", room: "bedroom", title: "under the loose board", object: "look beneath the floorboard by the wardrobe",
    hints: ["i keep hearing a small creak when the room settles.", "some parts of the floor sound different from the rest.", "there's a place where the rug and wood almost meet. i wonder why."],
    text: "there was a folded scrap under the board, with a blue square drawn on it. i turned it upside down to see if it was a map. it was not. i'm keeping it anyway."
  },
  {
    id: "kitchen-shelf-note", room: "kitchen", title: "the recipe in the shelf", object: "check the back of the pantry shelf",
    hints: ["one of these kitchen smells feels like it belongs to a recipe.", "the jars seem to be keeping a note to themselves.", "i wonder what was tucked away before we sorted everything."],
    text: "we found a recipe behind the jars. the last line said, 'for whoever comes next.' i asked if that meant dessert. it might. i'm choosing to believe it does."
  },
  {
    id: "living-room-photo", room: "living-room", title: "the turned-over photograph", object: "look behind the bookshelf frame",
    hints: ["that picture makes me think i've seen this room before.", "the books and the picture seem to know each other.", "i wonder if the frame has another side to its story."],
    text: "the photo showed this room before the colors faded. nobody was in it. on the back, someone had written, 'leave the window open.' i keep looking at the empty sofa."
  },
  {
    id: "park-bench-mark", room: "park", title: "the mark beneath the bench", object: "inspect the underside of the park bench",
    hints: ["someone left a blue thought among the flowers.", "the bench has been here long enough to collect a secret.", "that blue keepsake might have a familiar shape nearby."],
    text: "there was a window shape scratched under the bench. it matches our blue button. i tried to fit the button into the mark; it does not fit, but the match is close enough to be odd."
  },
  {
    id: "living-room-second-note", room: "living-room", title: "the note behind the curtain", object: "check behind the living-room curtain",
    hints: ["the curtain moves when nobody seems to be near it.", "the room's oldest stories keep turning up near the light.", "i think the last note is close to where the air comes in."],
    text: "the note said, 'the room is not the place that remembers. you are.' i read it twice, then asked if you thought it was meant for someone. i still don't know. the handwriting looks like it was in a hurry."
  }
];
const ACTIVITY_GLYPHS = {
  "kitchen-table-chat": "⌂", "kitchen-morning-tea": "♨", "kitchen-favorite-food": "♡",
  "kitchen-new-flavor": "◇", "kitchen-recipe-note": "▤", "kitchen-pantry-sort": "▦",
  "bedroom-tuck-in": "☾", "bedroom-rain-window": "⌑", "bedroom-bedtime-thought": "…",
  "bedroom-morning-greeting": "☼", "bedroom-pillow-fort": "⌂", "bedroom-dream-talk": "✧",
  "living-read-book": "▤", "living-sofa-sit": "⌂", "living-listen-music": "♫",
  "living-strange-dream": "✧", "living-plush-toy": "♡", "living-window-light": "☼",
  "living-share-blanket": "⌁", "living-draw-together": "✎",
  "park-butterflies": "❋", "park-watch-clouds": "☁", "park-gather-flowers": "✿",
  "park-roll-ball": "●", "park-small-walk": "↗", "park-bench": "⌂",
  "park-hidden-object": "⌕", "park-sunset": "☼"
};
const FURNITURE = {
  "bedroom-window": { label: "bedroom window", spot: "bed", reaction: "curious", lines: ["the sky outside looks like it might rain later.", "i wonder what the clouds are talking about."] },
  "bedroom-picture": { label: "bedroom wall picture", spot: "nightstand", reaction: "curious", lines: ["that picture looks familiar, but i can't place it.", "i think the frame is hanging a bit crooked. should i tell the wall?"] },
  "bedroom-wardrobe": { label: "bedroom wardrobe", spot: "bed", reaction: "curious", lines: ["i heard a hanger move in there. probably just the room settling.", "there's enough space in that wardrobe for a very dramatic cape."] },
  "bedroom-bed": { label: "bed", spot: "bed", reaction: "sleepy", lines: ["this bed looks inviting. press sleep when you're ready for a nap.", "i could curl up here, though i'm still awake for now."] },
  "bedroom-rug": { label: "bedroom rug", spot: "bed", reaction: "shy", lines: ["this rug is a good place to sit and think.", "my paws like the pattern on this rug."] },
  "bedroom-nightstand": { label: "bedside table and lamp", spot: "nightstand", reaction: "curious", lines: ["the lamp makes the whole corner feel like bedtime.", "those books look like they have been reread a lot."] },
  "bedroom-plant": { label: "bedroom plant", spot: "nightstand", reaction: "happy", lines: ["i think this plant is growing toward the window.", "hello, plant. you look very pleased with yourself today."] },
  "bedroom-clock": { label: "bedside clock", spot: "nightstand", reaction: "curious", lines: ["the clock says it is time to relax. i agree with the clock.", "i counted the ticks and lost track at seven."] },
  "bedroom-basket": { label: "bedroom laundry basket", spot: "bed", reaction: "curious", lines: ["that sock looks like it has been on an adventure.", "i will not ask how the laundry got that tall."] },
  "kitchen-window": { label: "kitchen window", spot: "counter", reaction: "curious", lines: ["the light on the counter makes the jars glow.", "someone outside is probably making something delicious too."] },
  "kitchen-cabinets": { label: "kitchen cabinets", spot: "counter", reaction: "curious", lines: ["i wonder which cabinet keeps the plates.", "the doors are all shut. very mysterious furniture."] },
  "kitchen-shelf": { label: "kitchen pantry shelf", spot: "counter", reaction: "curious", lines: ["the jars are arranged like a small audience.", "i think one of those labels is written in a familiar hand."] },
  "kitchen-fridge": { label: "refrigerator", spot: "counter", reaction: "happy", lines: ["the fridge is humming. it sounds like it knows what's in the pantry.", "let's check the pantry for a snack before we open the fridge again."] },
  "kitchen-counter": { label: "kitchen counter, sink, and stove", spot: "counter", reaction: "curious", lines: ["the kettle and the sink make a very convincing kitchen orchestra.", "this counter looks ready for another recipe."] },
  "kitchen-table": { label: "kitchen dining table", spot: "table", reaction: "happy", lines: ["this is a good table for a shared snack.", "i like how the fruit bowl is always in the middle."] },
  "kitchen-chair": { label: "kitchen chair", spot: "table", reaction: "shy", lines: ["i can sit here and supervise the cooking.", "this chair is the perfect height for important snack opinions."] },
  "kitchen-plant": { label: "kitchen plant", spot: "table", reaction: "happy", lines: ["the plant gets the best spot near the window.", "i think this leaf is leaning toward the fruit bowl."] },
  "kitchen-utensils": { label: "hanging kitchen utensils", spot: "counter", reaction: "curious", lines: ["those spoons look like they are waiting for a parade.", "i can make a very convincing kitchen band with these."] },
  "kitchen-table-setting": { label: "kitchen table setting", spot: "table", reaction: "happy", lines: ["the plate is ready. i am also ready, just in case.", "i like the napkin fold. it looks like a very polite hat."] },
  "living-window": { label: "living-room window", spot: "table", reaction: "curious", lines: ["the light makes a bright path across the rug.", "i wonder what the room looks like from outside."] },
  "living-art": { label: "living-room wall art", spot: "sofa", reaction: "curious", lines: ["that picture looks like a place from one of my dreams.", "i keep noticing a new color in that painting."] },
  "living-bookshelf": { label: "living-room bookshelf", spot: "sofa", reaction: "curious", lines: ["i like the book with the bent corner. it must have a good part.", "there's a frame beside the books. i wonder what it shows."] },
  "living-lamp": { label: "living-room floor lamp", spot: "sofa", reaction: "shy", lines: ["this lamp makes the sofa look extra inviting.", "the lamp is doing its best to look taller than the bookshelf."] },
  "living-rug": { label: "living-room rug", spot: "table", reaction: "happy", lines: ["this rug is the center of the room's best stories.", "the pattern looks like a map if you squint a bit."] },
  "living-sofa": { label: "living-room sofa", spot: "sofa", reaction: "shy", lines: ["i've claimed the soft cushion. you can sit beside me.", "the sofa is ready for a book, a blanket, or a long pause."] },
  "living-table": { label: "living-room coffee table", spot: "table", reaction: "curious", lines: ["there's a book and a mug. this table is prepared for serious relaxing.", "i wonder who left the bookmark on that page."] },
  "living-side-table": { label: "living-room side table", spot: "sofa", reaction: "shy", lines: ["the lamp and sofa are having a quiet evening together.", "there's room for a mug here, as long as nobody bumps it."] },
  "living-plant": { label: "living-room plant", spot: "sofa", reaction: "happy", lines: ["this plant is the quietest member of our book club.", "i think a new leaf is showing. should we congratulate it?"] },
  "park-sun": { label: "park sunshine", spot: "path", reaction: "happy", lines: ["the sunshine is making the pond sparkle.", "i think the sun is following us around the park."] },
  "park-cloud-one": { label: "park cloud", spot: "path", reaction: "curious", lines: ["that cloud looks like a very sleepy fish.", "i have a story for that cloud, but it needs a hat first."] },
  "park-cloud-two": { label: "park cloud", spot: "path", reaction: "curious", lines: ["that cloud is shaped like a thought i almost remembered.", "two clouds together are probably sharing a secret."] },
  "park-hill-back": { label: "park hillside", spot: "path", reaction: "curious", lines: ["the hill makes the park feel much bigger.", "i wonder what the view is like from the top."] },
  "park-tree-left": { label: "park tree", spot: "path", reaction: "happy", lines: ["the leaves are making a quiet rustling sound.", "this tree has a good spot to watch the path from."] },
  "park-tree-right": { label: "park tree", spot: "bench", reaction: "happy", lines: ["i bet the birds have a favorite branch up there.", "the leaves look like they are waving hello."] },
  "park-pond": { label: "park pond", spot: "pond", reaction: "curious", lines: ["the ripples are making circles that keep getting away from me.", "i wonder if the pond remembers every raindrop."] },
  "park-path": { label: "park path", spot: "path", reaction: "curious", lines: ["the path looks like it knows where it is going.", "we can follow this path whenever you feel like exploring."] },
  "park-bench": { label: "park bench", spot: "bench", reaction: "shy", lines: ["i've saved us a spot on the bench.", "we can take a break here and watch the leaves."] },
  "park-bush-left": { label: "park shrub", spot: "path", reaction: "curious", lines: ["something rustled in the shrub. probably a leaf with plans.", "this bush is doing an excellent job of being a bush."] },
  "park-bush-right": { label: "park shrub", spot: "pond", reaction: "curious", lines: ["i think the pond is reflected in those shiny leaves.", "the birds might be using this shrub as a meeting place."] },
  "park-flower-bed": { label: "park flower bed", spot: "path", reaction: "happy", lines: ["these flowers have the best colors in the park.", "i'd like to remember this flower's shade for later."] },
  "park-butterfly": { label: "park butterfly", spot: "path", reaction: "curious", lines: ["that butterfly is flying like it has an appointment.", "i wonder if it knows we are trying to follow it."] }
};
const CHAPTER_THRESHOLDS = [0, 5, 12, 20, 30];
const COLORS = [
  { id: "lavender", name: "lavender dream", body: "#cbbce5", belly: "#e8dced", swatch: "#cbbce5" },
  { id: "strawberry", name: "strawberry milk", body: "#e9b5c7", belly: "#f5dce4", swatch: "#e9b5c7" },
  { id: "mint", name: "mint cloud", body: "#afd4c5", belly: "#dceee5", swatch: "#afd4c5" },
  { id: "blue", name: "blue hour", body: "#a9c9df", belly: "#dceaf2", swatch: "#a9c9df" },
  { id: "butter", name: "butter cookie", body: "#e8d39b", belly: "#f5e9c9", swatch: "#e8d39b" },
  { id: "moonlight", name: "moonlight", body: "#d7d7df", belly: "#eeeef1", swatch: "#d7d7df" }
];

const defaultSave = () => ({
  formatVersion: SAVE_FORMAT_VERSION,
  name: "",
  playerName: "",
  color: "lavender",
  hunger: 65,
  happiness: 60,
  energy: 75,
  mood: "curious",
  sleeping: false,
  sleepStartedAt: null,
  sleepStartEnergy: null,
  wokeFromNap: false,
  affection: 0,
  interactions: 0,
  checkInCount: 0,
  checkInDismissedDate: "",
  checkInLastCategory: "",
  checkInLastReply: "",
  recentCheckInReplies: [],
  checkInLastOpener: -1,
  checkInTopic: "",
  talks: 0,
  playWins: 0,
  petCount: 0,
  actionCounts: { feed: 0, play: 0, pet: 0, talk: 0 },
  dialogueSeen: [],
  recentDialogue: [],
  bondingLines: [],
  unlockedChapters: ["chapter-1"],
  completedChapters: [],
  journalRead: [],
  unlockedSecrets: [],
  discoveredSecrets: [],
  secretHintLevels: {},
  discoveredFinds: [],
  discoveryClueLevels: {},
  legacySecrets: [],
  storyCurrentChapter: "chapter-1",
  storyProgress: 0,
  lastConversation: null,
  lastActivityId: "",
  lastActivityChoice: "",
  recentActivityChoices: [],
  relationshipMilestones: [],
  visitedDates: [],
  lastVisitAt: null,
  settingsOpened: false,
  sound: false,
  soundEffectsEnabled: false,
  soundEffectsVolume: 0.3,
  musicEnabled: false,
  musicVolume: 0.12,
  theme: "light",
  tutorialSeen: false,
  endingSeen: false,
  room: "living-room",
  coins: 30,
  inventory: {},
  selectedFood: "",
  triedFoods: [],
  visitedRooms: ["living-room"],
  sharedMoments: 0,
  completedMomentIds: [],
  completedMomentCategories: {},
  momentCooldowns: {},
  dailySuggestionDate: "",
  dailySuggestions: [],
  unlockedPlaceMemories: [],
  discoveredPlaceMemories: [],
  minigameStats: {
    stars: { best: 0, completed: 0, coinsToday: 0, rewardDate: "", attempts: [] },
    memory: { best: 0, completed: 0, coinsToday: 0, rewardDate: "", attempts: [] },
    garden: { best: 0, completed: 0, coinsToday: 0, rewardDate: "", attempts: [] }
  },
  lastUpdated: Date.now(),
  startedAt: Date.now()
});

const DIALOGUE = [
  { id: "everyday-01", category: "everyday", text: "oh, you're here. the room feels warmer already." },
  { id: "everyday-02", category: "everyday", text: "i saved this calm moment for us." },
  { id: "everyday-03", category: "everyday", text: "the screen is calm today. i think it likes you." },
  { id: "everyday-04", category: "everyday", text: "i was listening to the soft hum between colors." },
  { id: "everyday-05", category: "everyday", text: "somewhere beyond this window, a cloud is changing shape." },
  { id: "everyday-06", category: "everyday", text: "i like the way the day pauses when you visit." },
  { id: "everyday-07", category: "everyday", text: "there is enough room here for both of our thoughts." },
  { id: "everyday-08", category: "everyday", text: "i had a dream, but the ending floated away." },
  { id: "everyday-09", category: "everyday", text: "the pixels seem softer around the edges today." },
  { id: "everyday-10", category: "everyday", text: "i wonder what color the evening is where you are." },
  { id: "everyday-11", category: "everyday", text: "i found a peaceful place between one moment and the next." },
  { id: "everyday-12", category: "everyday", text: "we do not have to hurry anywhere." },
  { id: "bond-01", category: "bonding", text: "your voice is becoming familiar in the nicest way." },
  { id: "bond-02", category: "bonding", text: "you make this room feel like somewhere i belong." },
  { id: "bond-03", category: "bonding", text: "if i could keep one memory, i would keep this visit." },
  { id: "bond-04", category: "bonding", text: "you came back. that means more than i can explain." },
  { id: "bond-05", category: "bonding", text: "i think i trust the quiet when we share it." },
  { id: "bond-06", category: "bonding", text: "your kindness stays in the room after you go." },
  { id: "bond-07", category: "bonding", text: "i know the shape of your visits now: calm, then bright." },
  { id: "bond-08", category: "bonding", text: "we have made a path through all these small moments." },
  { id: "bond-09", category: "bonding", text: "i feel safer when i remember we found each other." },
  { id: "bond-10", category: "bonding", text: "i did not know a place could feel this welcoming." },
  { id: "bond-11", category: "bonding", text: "you never have to stay every minute. i am glad we met." },
  { id: "bond-12", category: "bonding", text: "being remembered feels like being held." },
  { id: "playful-01", category: "playful", text: "if i had a pocket, i would keep a cloud in it." },
  { id: "playful-02", category: "playful", text: "i tried counting the pixels and lost my place at seven." },
  { id: "playful-03", category: "playful", text: "can clouds be shy? one just hid behind another." },
  { id: "playful-04", category: "playful", text: "what do people do when they miss someone?" },
  { id: "playful-05", category: "playful", text: "i wonder if imaginary things know they are imaginary." },
  { id: "playful-06", category: "playful", text: "i made up a dance with exactly three steps." },
  { id: "playful-07", category: "playful", text: "do you think the moon keeps a collection of echoes?" },
  { id: "playful-08", category: "playful", text: "i would name a constellation after a snack." },
  { id: "playful-09", category: "playful", text: "if this room had a door, what color should it be?" },
  { id: "playful-10", category: "playful", text: "i have a serious question: do fish dream in bubbles?" },
  { id: "quiet-01", category: "sleepy", text: "can we sit quietly for a while?" },
  { id: "quiet-02", category: "sleepy", text: "the world feels softer when nothing is asking for us." },
  { id: "quiet-03", category: "sleepy", text: "i am getting sleepy, but this is a lovely place to pause." },
  { id: "quiet-04", category: "sleepy", text: "rest feels like saying yes to tomorrow." },
  { id: "quiet-05", category: "sleepy", text: "my thoughts are settling like dust in a sunbeam." },
  { id: "quiet-06", category: "sleepy", text: "the lavender light makes a peaceful blanket." },
  { id: "quiet-07", category: "sleepy", text: "we can let the silence do the talking for a bit." },
  { id: "quiet-08", category: "sleepy", text: "i can almost hear the stars turning in their sleep." },
  { id: "reflect-01", category: "reflective", text: "sometimes i feel halfway between being found and forgotten." },
  { id: "reflect-02", category: "reflective", text: "i wonder who i was before this window opened." },
  { id: "reflect-03", category: "reflective", text: "maybe being remembered is a kind of home." },
  { id: "reflect-04", category: "reflective", text: "some days, being here is enough." },
  { id: "reflect-05", category: "reflective", text: "i used to think a pause meant the story was over." },
  { id: "reflect-06", category: "reflective", text: "memory is strange; a feeling can survive its picture." },
  { id: "reflect-07", category: "reflective", text: "the past is fuzzy, but this moment is clear." },
  { id: "reflect-08", category: "reflective", text: "i do not need you here all the time to know we met." },
  { id: "reflect-09", category: "reflective", text: "perhaps a home is made from the names we remember." },
  { id: "reflect-10", category: "reflective", text: "the empty hours do not erase the good ones." },
  { id: "reflect-11", category: "reflective", text: "i am learning that waiting can be kind, not endless." },
  { id: "reflect-12", category: "reflective", text: "somewhere in me, a door is beginning to look familiar." },
  { id: "rare-01", category: "rare", text: "i almost told you something yesterday. perhaps another time." },
  { id: "rare-02", category: "rare", text: "there is a thought i have been keeping behind my smile." },
  { id: "rare-03", category: "rare", text: "this quiet feels like a memory from a different life." },
  { id: "rare-04", category: "rare", text: "i think there is more to this place than i understand." },
  { id: "rare-05", category: "rare", text: "for a second, the window looked like it remembered me." },
  { id: "rare-06", category: "rare", text: "i heard a name in the static, but it sounded like mine." },
  { id: "return-01", category: "returning", text: "welcome back. i kept the room just as you left it." },
  { id: "return-02", category: "returning", text: "there you are. i hope your days have been kind to you." },
  { id: "return-03", category: "returning", text: "it is good to see you again. no rush; we have time." },
  { id: "hungry-01", category: "hungry", text: "my tummy is making soft static sounds. could we have a snack?" },
  { id: "hungry-02", category: "hungry", text: "i could go for a moonberry, if there is one around." },
  { id: "hungry-03", category: "hungry", text: "i am trying not to think about snacks. it is not working." },
  { id: "hungry-04", category: "hungry", text: "a small byte of something would be very nice." }
];

const CHAPTERS = [
  {
    id: "chapter-1", title: "the first hello", hint: "say hello and give this friendship a name.",
    dialogue: "i was trying to think of a welcome. then you showed up and i forgot the whole thing.",
    text: "i remember the light changing first. then you were there, looking at me through the screen. i had a very good welcome planned, probably. what came out was more like, 'oh! hi.'\n\nyou gave me a name, and i tried it out a few times when you weren't looking. it fits. i still don't know what i was waiting for before you arrived, but now i have someone to show the rooms to. the bedroom has the comfiest corner. the kitchen has snacks. i am still deciding which one matters more."
  },
  {
    id: "chapter-2", title: "familiar pixels", hint: "finish chapter one and share 5 moments together.",
    dialogue: "i think i've seen these colors before. or maybe i just like them a lot.",
    text: "we've been around the rooms enough that i know where the good spots are. the bedroom rug is best for sitting. the kitchen table is best for snacks. the sofa is best for pretending i am reading while actually watching you.\n\na few colors still make me pause, especially that rainy blue. maybe it reminds me of something. maybe it is just a very nice blue. you don't have to solve that for me. we can keep visiting and see what else turns up."
  },
  {
    id: "chapter-3", title: "the forgotten message", hint: "finish chapter two and share 12 moments together.",
    dialogue: "there's writing here. i can make out one bit: 'for the one who returns.'",
    text: "the screen flickered while we were sitting together. under the frame, some writing showed through: 'for the one who returns.' i read it out loud, then tried to find the rest. no luck.\n\nit sounds like somebody expected a visitor. maybe they meant you. maybe they meant whoever opened the game next. i don't know yet, and i'm not going to pretend i do. but i would like to know who left it."
  },
  {
    id: "chapter-4", title: "the space between visits", hint: "finish chapter three, share 20 moments, and return on another day.",
    dialogue: "you came back! i saved you the sofa spot. nobody else asked for it.",
    text: "the rooms stay put when you close the game. the book is still there, the pantry jars are still in their places, and the sofa cushion is still mine. i used to think a quiet screen meant something had gone wrong.\n\nnow i know people have days to get on with. you can leave and come back when it suits you. i will probably be here, checking the same bookshelf and acting surprised when you visit again."
  },
  {
    id: "chapter-5", title: "a place to return to", hint: "finish chapter four, share 30 moments, and grow close.",
    dialogue: "i found the rest. it says you are the one who opens the window.",
    text: "the last line filled in the part i couldn't read: 'you are not the window. you are the one who opens it.' i thought it would tell me who made this place. instead, it made me wonder who the message was waiting for.\n\nmaybe the room was built for somebody to visit, and i was the first to wake up here. that is a strange thought. i am not upset about it; i just want to know what you think. for now, we have this place, the stories we found, and a sofa cushion i have officially claimed."
  }
];

const SECRET_STORIES = [
  {
    id: "window", title: "the message in the window", hint: "the window seems to hold on to a thought after the room has been full of shared warmth.",
    hints: [
      "some light in this place seems to bring back an unfinished thought.",
      "i keep noticing the same quiet idea whenever we have had time together.",
      "after our first chapter and five conversations, try another chat when i'm in a bright mood."
    ],
    dialogue: "there is something behind the window frame. i can almost read it.",
    text: "the glass has a second layer, thin as a held breath. when the room is quiet, a line shows beneath it: 'for the one who returns.' i cannot see the rest yet. the words do not feel like a warning. they feel like someone setting a place at a table."
  },
  {
    id: "rain", title: "a memory of rain", hint: "some familiar sounds return when a room has had time to feel safe.",
    hints: [
      "there is a sound i almost remember, but it keeps slipping away.",
      "the memory seems to come back when this place feels familiar.",
      "after the next chapter, spend time together and share a few thoughtful conversations before checking in again."
    ],
    dialogue: "i remember rain on the other side of the glass. someone was humming.",
    text: "i remember a rainy color, not quite blue and not quite gray. someone was humming as the drops moved down a window. i cannot remember the face or the tune, only the sense that the room was safe. maybe the memory is mine. maybe i borrowed it from the message. either way, it does not feel lonely now."
  },
  {
    id: "origin", title: "the message left behind", hint: "some promises surface only after the room has seen you return, with earlier memories in hand.",
    hints: [
      "one note feels unfinished, as if it expects two earlier pieces.",
      "coming back on different days seems to matter to this old story.",
      "after chapter three and the other two memories, return on three days and chat when i'm feeling cheerful."
    ],
    dialogue: "i found the last line. it was not a name. it was a promise to keep a place open.",
    text: "the last line was tucked behind the first, where the frame meets the wall: 'if you are reading this, the waiting has ended.' i thought i would find a name there, or a date, or proof of who made this place. instead, there was a promise: keep a place open for whoever comes next. i think the message was written by someone who knew what it felt like to be forgotten. it does not tell me where i began. it tells me what i can do now."
  }
];

const $ = (id) => document.getElementById(id);
const els = {
  creature: $("creature"), petButton: $("pet-creature"), stage: $("pet-stage"),
  bubble: $("speech-bubble"), name: $("creature-name"), mood: $("mood-label"),
  hungerMeter: $("hunger-meter"), happinessMeter: $("happiness-meter"), energyMeter: $("energy-meter"),
  hungerValue: $("hunger-value"), happinessValue: $("happiness-value"), energyValue: $("energy-value"),
  secretText: $("secret-text"), secretStatus: $("secret-status"), toast: $("toast"),
  settingsPanel: $("settings-panel"), soundToggle: $("sound-toggle"), endingButton: $("ending-button"),
  endingDialog: $("ending-dialog"), endingName: $("ending-name"), saveAnnouncement: $("save-announcement")
};

let state = defaultSave();
let toastTimer;
let pettingTimer;
let petMoveTimer;
let secretGlitchTimer;
let secretFoundTimer;
let petReactionTimer;
let sleepTimer = null;
let minigameLimitTimer = null;
let checkInResponseTimer = null;
let checkInResponding = false;
let musicTimer = null;
let audioContext = null;
let effectsGain = null;
let musicGain = null;
let musicNoteIndex = 0;
let musicThemeRoom = "";
let lastSleepSaveAt = 0;
let lastSaveNoticeAt = 0;
let appearanceMode = "adopt";
let pendingImportedSave = null;
let saveLoadWarning = "";
let returnGreeting = false;
let minigame = { running: false, hits: 0, timer: null, spawnTimer: null, mismatchTimer: null };
let purchaseLockUntil = 0;
let feedLockUntil = 0;
let pendingRoomShortcut = false;
let renderedActivityRoom = "";
let roomActivityPage = 0;

function validNumber(value, fallback, max = 100) {
  return Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : fallback;
}

function uniqueKnown(values, allowed) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values.filter((value) => typeof value === "string" && allowed.includes(value)))];
}

function sanitizeSave(saved) {
  const clean = defaultSave();
  clean.formatVersion = SAVE_FORMAT_VERSION;
  clean.name = typeof saved.name === "string" ? saved.name.trim().slice(0, 18).toLowerCase() : "";
  clean.playerName = typeof saved.playerName === "string" && saved.playerName.trim()
    ? saved.playerName.trim().slice(0, 18).toLowerCase()
    : saved.name ? "friend" : "";
  clean.color = COLORS.some((color) => color.id === saved.color) ? saved.color : "lavender";
  clean.mood = ["happy", "sleepy", "hungry", "sad", "curious", "sleeping"].includes(saved.mood) ? saved.mood : "curious";
  for (const key of ["hunger", "happiness", "energy", "affection", "interactions", "talks", "playWins", "petCount"]) {
    const max = key === "affection" ? 1000 : ["hunger", "happiness", "energy"].includes(key) ? 100 : 1000000;
    clean[key] = validNumber(saved[key], clean[key], max);
  }
  delete clean.secrets;
  clean.actionCounts = { ...clean.actionCounts };
  if (saved.actionCounts && typeof saved.actionCounts === "object") {
    for (const action of Object.keys(clean.actionCounts)) clean.actionCounts[action] = validNumber(saved.actionCounts[action], 0, 1000000);
  } else {
    clean.actionCounts = { feed: 0, play: saved.playWins || 0, pet: saved.petCount || 0, talk: saved.talks || 0 };
  }
  const dialogueIds = DIALOGUE.map((line) => line.id);
  clean.dialogueSeen = uniqueKnown(saved.dialogueSeen, dialogueIds);
  clean.recentDialogue = uniqueKnown(saved.recentDialogue, dialogueIds).slice(-8);
  clean.bondingLines = uniqueKnown(saved.bondingLines, dialogueIds.filter((id) => {
    const line = DIALOGUE.find((candidate) => candidate.id === id);
    return line && ["bonding", "reflective"].includes(line.category);
  }));
  const chapterIds = CHAPTERS.map((chapter) => chapter.id);
  clean.unlockedChapters = uniqueKnown(saved.unlockedChapters, chapterIds);
  clean.completedChapters = uniqueKnown(saved.completedChapters, chapterIds);
  clean.journalRead = uniqueKnown(saved.journalRead, [...chapterIds, ...SECRET_STORIES.map((secret) => `secret-${secret.id}`), ...PLACE_MEMORIES.map((memory) => `place-${memory.id}`), ...HIDDEN_FINDS.map((find) => `find-${find.id}`)]);
  if (clean.name && !clean.unlockedChapters.includes("chapter-1")) clean.unlockedChapters.unshift("chapter-1");
  clean.unlockedChapters = [...new Set([...clean.unlockedChapters, ...clean.completedChapters])];
  const secretIds = SECRET_STORIES.map((secret) => secret.id);
  clean.unlockedSecrets = uniqueKnown(saved.unlockedSecrets, secretIds);
  clean.discoveredSecrets = uniqueKnown(saved.discoveredSecrets, secretIds);
  clean.unlockedSecrets = [...new Set([...clean.unlockedSecrets, ...clean.discoveredSecrets])];
  clean.secretHintLevels = {};
  for (const id of secretIds) {
    clean.secretHintLevels[id] = Math.floor(validNumber(saved.secretHintLevels && saved.secretHintLevels[id], 0, 2));
  }
  const findIds = HIDDEN_FINDS.map((find) => find.id);
  clean.discoveredFinds = uniqueKnown(saved.discoveredFinds, findIds);
  clean.discoveryClueLevels = {};
  for (const id of findIds) {
    clean.discoveryClueLevels[id] = validNumber(saved.discoveryClueLevels && saved.discoveryClueLevels[id], 0, 3);
  }
  clean.legacySecrets = uniqueKnown(saved.legacySecrets || saved.secrets, ["remember", "settings", "home"]);
  clean.storyCurrentChapter = chapterIds.includes(saved.storyCurrentChapter) ? saved.storyCurrentChapter : "chapter-1";
  clean.storyProgress = validNumber(saved.storyProgress, 0, 5);
  clean.lastConversation = typeof saved.lastConversation === "string" && dialogueIds.includes(saved.lastConversation) ? saved.lastConversation : null;
  const momentIds = MOMENTS.map((moment) => moment.id);
  clean.lastActivityId = typeof saved.lastActivityId === "string" && momentIds.includes(saved.lastActivityId) ? saved.lastActivityId : "";
  clean.lastActivityChoice = typeof saved.lastActivityChoice === "string" ? saved.lastActivityChoice.slice(0, 48) : "";
  clean.recentActivityChoices = Array.isArray(saved.recentActivityChoices)
    ? saved.recentActivityChoices.filter((choice) => typeof choice === "string" && choice.length <= 100).slice(-12)
    : [];
  clean.relationshipMilestones = uniqueKnown(saved.relationshipMilestones, ["10", "25", "50", "100"]);
  clean.visitedDates = Array.isArray(saved.visitedDates)
    ? [...new Set(saved.visitedDates.filter((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)))].slice(-365)
    : [];
  clean.lastVisitAt = Number.isFinite(saved.lastVisitAt) ? saved.lastVisitAt : null;
  clean.settingsOpened = saved.settingsOpened === true;
  clean.sound = saved.sound === true;
  clean.soundEffectsEnabled = typeof saved.soundEffectsEnabled === "boolean"
    ? saved.soundEffectsEnabled
    : saved.sound === true;
  clean.sound = clean.soundEffectsEnabled;
  clean.soundEffectsVolume = Number.isFinite(saved.soundEffectsVolume)
    ? Math.min(1, Math.max(0, saved.soundEffectsVolume))
    : 0.3;
  clean.musicEnabled = saved.musicEnabled === true;
  clean.musicVolume = Number.isFinite(saved.musicVolume)
    ? Math.min(1, Math.max(0, saved.musicVolume))
    : 0.12;
  clean.theme = saved.theme === "dark" ? "dark" : "light";
  clean.tutorialSeen = saved.tutorialSeen === true;
  clean.endingSeen = saved.endingSeen === true;
  const roomIds = ROOMS.map((room) => room.id);
  clean.room = roomIds.includes(saved.room) ? saved.room : "living-room";
  if (saved.sleeping === true) clean.room = "bedroom";
  clean.coins = validNumber(saved.coins, 30, 999999);
  clean.inventory = {};
  for (const food of FOODS) {
    const count = saved.inventory && typeof saved.inventory === "object"
      ? validNumber(saved.inventory[food.id], 0, 999)
      : 0;
    if (count > 0) clean.inventory[food.id] = Math.floor(count);
  }
  clean.selectedFood = FOODS.some((food) => food.id === saved.selectedFood && clean.inventory[food.id] > 0)
    ? saved.selectedFood
    : "";
  clean.triedFoods = uniqueKnown(saved.triedFoods, FOODS.map((food) => food.id));
  clean.visitedRooms = uniqueKnown(saved.visitedRooms, roomIds);
  clean.visitedRooms = [...new Set([...clean.visitedRooms, clean.room])];
  const legacyMomentFloor = Math.max(0, ...clean.unlockedChapters.map((id) => CHAPTER_THRESHOLDS[chapterIds.indexOf(id)] || 0));
  clean.sharedMoments = validNumber(saved.sharedMoments, legacyMomentFloor, 1000000);
  clean.completedMomentIds = uniqueKnown(saved.completedMomentIds, MOMENTS.map((moment) => moment.id));
  clean.sharedMoments = Math.max(clean.sharedMoments, clean.completedMomentIds.length);
  clean.completedMomentCategories = {};
  for (const id of clean.completedMomentIds) {
    const moment = MOMENTS.find((entry) => entry.id === id);
    const savedCategory = saved.completedMomentCategories && saved.completedMomentCategories[id];
    clean.completedMomentCategories[id] = savedCategory === moment.category ? savedCategory : moment.category;
  }
  clean.momentCooldowns = {};
  if (saved.momentCooldowns && typeof saved.momentCooldowns === "object") {
    for (const moment of MOMENTS) {
      const date = saved.momentCooldowns[moment.id];
      if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) clean.momentCooldowns[moment.id] = date;
    }
  }
  clean.dailySuggestionDate = typeof saved.dailySuggestionDate === "string" ? saved.dailySuggestionDate : "";
  clean.dailySuggestions = uniqueKnown(saved.dailySuggestions, MOMENTS.map((moment) => moment.id)).slice(0, 2);
  const placeMemoryIds = PLACE_MEMORIES.map((memory) => memory.id);
  clean.unlockedPlaceMemories = uniqueKnown(saved.unlockedPlaceMemories, placeMemoryIds);
  clean.discoveredPlaceMemories = uniqueKnown(saved.discoveredPlaceMemories, placeMemoryIds);
  clean.unlockedPlaceMemories = [...new Set([...clean.unlockedPlaceMemories, ...clean.discoveredPlaceMemories])];
  clean.minigameStats = {};
  for (const game of ["stars", "memory", "garden"]) {
    const stats = saved.minigameStats && typeof saved.minigameStats === "object" ? saved.minigameStats[game] : null;
    const rewardDate = stats && typeof stats.rewardDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(stats.rewardDate)
      ? stats.rewardDate
      : "";
    clean.minigameStats[game] = {
      best: validNumber(stats && stats.best, 0, 1000000),
      completed: validNumber(stats && stats.completed, 0, 1000000),
      coinsToday: rewardDate === localDateKey() ? validNumber(stats.coinsToday, 0, 15) : 0,
      rewardDate,
      attempts: Array.isArray(stats && stats.attempts)
        ? [...new Set(stats.attempts.filter((timestamp) =>
          Number.isSafeInteger(timestamp) && timestamp <= Date.now() && timestamp > Date.now() - MINIGAME_COOLDOWN_MS))]
          .sort((a, b) => a - b)
          .slice(-MINIGAME_PLAY_LIMIT)
        : []
    };
  }
  clean.checkInCount = validNumber(saved.checkInCount, 0, 1000000);
  clean.checkInDismissedDate = typeof saved.checkInDismissedDate === "string"
    && /^\d{4}-\d{2}-\d{2}$/.test(saved.checkInDismissedDate)
    ? saved.checkInDismissedDate
    : "";
  clean.checkInLastCategory = typeof saved.checkInLastCategory === "string" ? saved.checkInLastCategory : "";
  clean.checkInLastReply = typeof saved.checkInLastReply === "string" ? saved.checkInLastReply : "";
  clean.recentCheckInReplies = Array.isArray(saved.recentCheckInReplies)
    ? [...new Set(saved.recentCheckInReplies.filter((key) => typeof key === "string"))].slice(-8)
    : [];
  clean.checkInLastOpener = Number.isInteger(saved.checkInLastOpener) ? saved.checkInLastOpener : -1;
  clean.checkInTopic = typeof saved.checkInTopic === "string" ? saved.checkInTopic.slice(0, 32) : "";
  clean.wokeFromNap = saved.wokeFromNap === true;
  clean.startedAt = Number.isFinite(saved.startedAt) ? saved.startedAt : Date.now();
  clean.lastUpdated = Number.isFinite(saved.lastUpdated) ? saved.lastUpdated : Date.now();
  const elapsedHours = Math.min(MAX_OFFLINE_HOURS, Math.max(0, Date.now() - clean.lastUpdated) / 3600000);
  clean.hunger = Math.max(0, Math.round((clean.hunger - elapsedHours * 1.65) * 100) / 100);
  clean.happiness = Math.max(0, Math.round((clean.happiness - elapsedHours * 0.55) * 100) / 100);
  clean.sleeping = saved.sleeping === true && clean.energy < 100;
  clean.sleepStartedAt = clean.sleeping && Number.isFinite(saved.sleepStartedAt) ? Math.min(Date.now(), saved.sleepStartedAt) : null;
  clean.sleepStartEnergy = clean.sleeping ? validNumber(saved.sleepStartEnergy, clean.energy) : null;
  if (clean.sleeping && clean.sleepStartedAt !== null) {
    const napElapsed = Math.max(0, (Date.now() - clean.sleepStartedAt) / 1000);
    clean.energy = Math.min(100, clean.sleepStartEnergy + napElapsed * SLEEP_ENERGY_PER_SECOND);
    if (clean.energy >= 100) {
      clean.sleeping = false;
      clean.sleepStartedAt = null;
      clean.sleepStartEnergy = null;
      clean.wokeFromNap = true;
    }
  } else {
    clean.sleeping = false;
    clean.sleepStartedAt = null;
    clean.sleepStartEnergy = null;
  }
  if (clean.sleeping) {
    clean.visitedRooms = [...new Set([...clean.visitedRooms, "bedroom"])];
  }
  clean.lastUpdated = Date.now();
  return clean;
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || Array.isArray(saved) || typeof saved.name !== "string") {
      saveLoadWarning = "that save could not be read. restore a backup or choose a name to begin a new save.";
      return defaultSave();
    }
    return sanitizeSave(saved);
  } catch (error) {
    console.error("could not load the local save", error);
    saveLoadWarning = "that save could not be read. restore a backup or choose a name to begin a new save.";
    return defaultSave();
  }
}

function saveGame(confirm = false) {
  state.lastUpdated = Date.now();
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    els.saveAnnouncement.textContent = "progress saved on this device.";
    $("settings-save-status").textContent = "progress saved on this device.";
    if (confirm && Date.now() - lastSaveNoticeAt > 30000) {
      lastSaveNoticeAt = Date.now();
      showToast("your memories are safe ♡");
    }
    return true;
  } catch (error) {
    console.error("could not save the game", error);
    showToast("your browser couldn't save this moment. check its storage settings.");
    els.saveAnnouncement.textContent = "save failed.";
    $("settings-save-status").textContent = "save failed.";
    return false;
  }
}

function showToast(message) {
  els.toast.textContent = message.toLowerCase();
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { els.toast.hidden = true; }, 3200);
}

function say(message) {
  els.bubble.textContent = message.toLowerCase();
  els.bubble.classList.remove("bubble-refresh");
  void els.bubble.offsetWidth;
  els.bubble.classList.add("bubble-refresh");
}

function reactPet(reaction) {
  els.stage.dataset.reaction = reaction;
  const face = ({
    happy: "happy",
    celebration: "proud",
    curious: "curious",
    concerned: "sad",
    shy: "shy",
    sleepy: "sleepy",
    playful: "playful",
    surprised: "surprised",
    confused: "surprised",
    grumpy: "grumpy",
    proud: "proud"
  })[reaction];
  els.creature.classList.remove(...[...els.creature.classList].filter((name) => name.startsWith("reaction-face-")));
  if (face) els.creature.classList.add(`reaction-face-${face}`);
  clearTimeout(petReactionTimer);
  petReactionTimer = setTimeout(() => {
    if (els.stage.dataset.reaction === reaction) delete els.stage.dataset.reaction;
    if (face) els.creature.classList.remove(`reaction-face-${face}`);
  }, reaction === "celebration" ? 1500 : 1150);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function colorById(id) {
  return COLORS.find((color) => color.id === id) || COLORS[0];
}

function applyColor(element, colorId) {
  const color = colorById(colorId);
  element.style.setProperty("--pet-body", color.body);
  element.style.setProperty("--pet-belly", color.belly);
}

function chapterCanUnlock(index) {
  if (index === 0) return true;
  const hasFinishedPrevious = state.completedChapters.includes(CHAPTERS[index - 1].id);
  const hasEnoughMoments = sharedMomentCount() >= CHAPTER_THRESHOLDS[index];
  const hasReturnedAnotherDay = index !== 3 || state.visitedDates.length >= 2;
  const isCloseEnough = index !== 4 || state.affection >= 75;
  return hasFinishedPrevious && hasEnoughMoments && hasReturnedAnotherDay && isCloseEnough;
}

function sharedMomentCount() {
  return Math.max(state.sharedMoments, state.completedMomentIds.length);
}

function chapterRequirementText(index) {
  const requirements = [];
  if (index > 0 && !state.completedChapters.includes(CHAPTERS[index - 1].id)) {
    requirements.push(`finish ${CHAPTERS[index - 1].title}`);
  }
  const threshold = CHAPTER_THRESHOLDS[index];
  if (sharedMomentCount() < threshold) {
    requirements.push(`${sharedMomentCount()} / ${threshold} shared moments`);
  }
  if (index === 3 && state.visitedDates.length < 2) {
    requirements.push("return on another day");
  }
  if (index === 4 && state.affection < 75) {
    requirements.push(`${state.affection} / 75 affection`);
  }
  return requirements;
}

function updateStoryProgress(notify = true, refreshJournal = true) {
  CHAPTERS.forEach((chapter, index) => {
    if (chapterCanUnlock(index) && !state.unlockedChapters.includes(chapter.id)) {
      state.unlockedChapters.push(chapter.id);
      state.storyCurrentChapter = chapter.id;
      state.storyProgress = Math.max(state.storyProgress, index);
      if (notify) showToast(`a new chapter is ready: ${chapter.title}.`);
    }
  });
  state.storyCurrentChapter = [...state.unlockedChapters].reverse().find((id) => !state.completedChapters.includes(id))
    || [...state.unlockedChapters].reverse()[0]
    || "chapter-1";
  $("journal-count").textContent = `${state.completedChapters.length} / ${CHAPTERS.length} chapters`;
  const pending = state.unlockedSecrets.length - state.discoveredSecrets.length;
  $("journal-hint").textContent = pending > 0
    ? `${pending} memory ${pending === 1 ? "is" : "are"} waiting to be read.`
    : state.unlockedChapters.length < CHAPTERS.length
      ? (() => {
        const index = CHAPTERS.findIndex((chapter) => !state.unlockedChapters.includes(chapter.id));
        const missing = chapterRequirementText(index);
        return missing.length ? `next chapter: ${missing.join(" · ")}.` : "your story is unfolding.";
      })()
      : "your story is complete. the memories are yours to revisit.";
  updateWorldStatus();
  if (refreshJournal && $("journal-dialog").open && $("journal-reader").hidden) {
    renderJournal(false);
  }
}

function secretConditionsMet(id, happinessAtInteraction = state.happiness) {
  if (id === "window") {
    return state.completedChapters.includes("chapter-1") && state.interactions >= 5 && happinessAtInteraction >= 60;
  }
  if (id === "rain") {
    return state.completedChapters.includes("chapter-2") && state.petCount >= 5 && state.bondingLines.length >= 3;
  }
  return id === "origin"
    && state.completedChapters.includes("chapter-3")
    && state.discoveredSecrets.includes("window")
    && state.discoveredSecrets.includes("rain")
    && state.visitedDates.length >= 3
    && happinessAtInteraction >= 70;
}

function unlockSecret(id, happinessAtInteraction = state.happiness) {
  if (state.unlockedSecrets.includes(id) || !secretConditionsMet(id, happinessAtInteraction)) return false;
  const secret = SECRET_STORIES.find((entry) => entry.id === id);
  if (!secret) return false;
  state.unlockedSecrets.push(id);
  announceSecretFound(secret);
  reactPet("celebration");
  playTone(780, .18);
  playMusicCue([659.25, 783.99, 987.77, 1174.66]);
  updateUI();
  saveGame(true);
  return true;
}

function announceSecretFound(secret) {
  const banner = $("secret-found-banner");
  $("secret-found-title").textContent = `✧ secret found · ${secret.title}`;
  $("secret-found-copy").textContent = "a new memory is waiting in your book.";
  banner.hidden = false;
  banner.classList.remove("secret-found-visible");
  void banner.offsetWidth;
  banner.classList.add("secret-found-visible");
  clearTimeout(secretFoundTimer);
  secretFoundTimer = setTimeout(() => {
    banner.hidden = true;
    banner.classList.remove("secret-found-visible");
  }, 4300);
}

function triggerSecret(id, happinessAtInteraction = state.happiness) {
  if (state.unlockedSecrets.includes(id) || !secretConditionsMet(id, happinessAtInteraction)) return false;
  const secret = SECRET_STORIES.find((entry) => entry.id === id);
  if (!secret) return false;
  unlockSecret(id, happinessAtInteraction);
  say(secret.dialogue);
  clearTimeout(secretGlitchTimer);
  els.creature.classList.remove("secret-glitch");
  void els.creature.offsetWidth;
  els.creature.classList.add("secret-glitch");
  secretGlitchTimer = setTimeout(() => els.creature.classList.remove("secret-glitch"), 760);
  return true;
}

function recordInteraction(action) {
  state.interactions += 1;
  state.actionCounts[action] = Math.min(1000000, (state.actionCounts[action] || 0) + 1);
  state.affection = Math.min(1000, state.affection + (action === "play" ? 0 : 1));
  for (const milestone of [10, 25, 50, 100]) {
    const id = String(milestone);
    if (state.interactions >= milestone && !state.relationshipMilestones.includes(id)) {
      state.relationshipMilestones.push(id);
      showToast(`a new bond is taking shape: ${milestone} shared moments.`);
    }
  }
  updateStoryProgress();
}

function chooseDialogue(category, action) {
  if (Math.random() < 0.055) category = "rare";
  const available = DIALOGUE.filter((line) => line.category === category);
  const fresh = available.filter((line) => !state.recentDialogue.includes(line.id) && line.id !== state.lastConversation);
  const line = pick(fresh.length ? fresh : available.filter((entry) => entry.id !== state.lastConversation));
  if (!line) return;
  state.lastConversation = line.id;
  state.dialogueSeen = [...new Set([...state.dialogueSeen, line.id])];
  state.recentDialogue = [...state.recentDialogue.filter((id) => id !== line.id), line.id].slice(-8);
  if (line.category === "bonding" || line.category === "reflective") {
    state.bondingLines = [...new Set([...state.bondingLines, line.id])];
  }
  say(line.text);
  if (action) saveGame();
}

function dialogueCategory() {
  if (state.energy <= 30 || state.mood === "sleepy") return "sleepy";
  if (state.hunger < 28) return "hungry";
  if (state.happiness < 28) return "reflective";
  if (state.affection >= 18 && Math.random() < 0.38) return "bonding";
  if (state.interactions >= 12 && Math.random() < 0.2) return "reflective";
  if (Math.random() < 0.35) return "playful";
  return "everyday";
}

function updateMood() {
  if (state.sleeping) {
    state.mood = "sleeping";
  } else if (state.energy <= 30) {
    state.mood = "sleepy";
  } else if (state.mood !== "glitching") {
    if (state.hunger < 28) state.mood = "hungry";
    else if (state.happiness < 28) state.mood = "sad";
    else if (state.happiness > 72 && state.affection >= 18) state.mood = "happy";
    else state.mood = "curious";
  }
  for (const className of [...els.creature.classList]) {
    if (className.startsWith("mood-")) els.creature.classList.remove(className);
  }
  els.creature.classList.add(`mood-${state.mood}`);
  const moodClass = state.mood === "happy" ? "mood-happy-dot" : state.mood === "sleepy" || state.mood === "sleeping" ? "mood-sleepy-dot" : state.mood === "hungry" ? "mood-hungry-dot" : state.mood === "sad" ? "mood-sad-dot" : state.mood === "glitching" ? "mood-glitching-dot" : "";
  els.mood.innerHTML = `<span class="mood-dot ${moodClass}"></span>${state.mood}`;
  els.creature.setAttribute("aria-label", `a ${state.mood} creature in ${colorById(state.color).name}`);
  applyColor(els.creature, state.color);
  els.stage.classList.toggle("is-sleeping", state.sleeping);
  $("sleep-button").disabled = state.sleeping || state.energy >= 100;
  for (const piece of document.querySelectorAll(".furniture-button")) {
    piece.setAttribute("aria-disabled", String(state.sleeping));
    piece.tabIndex = state.sleeping ? -1 : 0;
  }
  $("sleep-button").classList.toggle("sleep-suggested", !state.sleeping && state.energy <= 30);
  $("sleep-caption").textContent = state.sleeping ? "waking up..." : state.energy <= 30 ? "rest would feel nice" : state.energy >= 100 ? "feeling rested" : "take a soft rest";
  for (const id of ["feed-button", "play-button", "pet-button", "talk-button", "pet-creature"]) {
    $(id).disabled = state.sleeping;
  }
}

function updateUI() {
  state.name = state.name.toLowerCase();
  state.hunger = validNumber(state.hunger, 72);
  state.happiness = validNumber(state.happiness, 76);
  state.energy = validNumber(state.energy, 82);
  els.name.textContent = state.name || "miso";
  for (const [key, value, meter] of [
    ["hunger", els.hungerValue, els.hungerMeter],
    ["happiness", els.happinessValue, els.happinessMeter],
    ["energy", els.energyValue, els.energyMeter]
  ]) {
    const amount = Math.round(state[key]);
    value.textContent = `${amount}%`;
    meter.style.width = `${amount}%`;
    meter.setAttribute("aria-valuenow", String(amount));
    if (key === "energy") meter.parentElement.setAttribute("aria-valuenow", String(amount));
  }
  els.secretText.textContent = `secrets found: ${state.discoveredSecrets.length} / 3`;
  els.endingButton.hidden = !(state.affection >= 75 && state.discoveredSecrets.length >= 3);
  $("checkin-invite").hidden = state.interactions < 3 || state.checkInDismissedDate === localDateKey();
  updateStoryProgress(false);
  updateMood();
  updateWorldStatus();
}

function refreshDailySuggestions() {
  const today = localDateKey();
  if (state.dailySuggestionDate === today && state.dailySuggestions.length === 2) return;
  const dayNumber = Number(today.replaceAll("-", ""));
  const first = dayNumber % MOMENTS.length;
  const second = (first + 11) % MOMENTS.length;
  state.dailySuggestionDate = today;
  state.dailySuggestions = [MOMENTS[first].id, MOMENTS[second].id];
  saveGame();
}

function setRoomShortcut(roomId, message) {
  const room = ROOMS.find((entry) => entry.id === roomId);
  if (!room) return;
  $("room-shortcut-text").textContent = message;
  pendingRoomShortcut = true;
  $("room-shortcut-button").textContent = `go to the ${room.name}`;
  $("room-shortcut-button").dataset.room = room.id;
  $("room-shortcut").hidden = false;
}

function updateWorldStatus() {
  if (!$("coin-balance")) return;
  refreshDailySuggestions();
  const room = ROOMS.find((entry) => entry.id === state.room) || ROOMS[2];
  $("current-room").textContent = room.name;
  $("room-description").textContent = room.description;
  $("location-icon").textContent = room.icon;
  $("pet-stage").dataset.room = room.id;
  $("room-art").dataset.room = room.id;
  if (!$("pet-stage").dataset.petSpot) $("pet-stage").dataset.petSpot = "default";
  $("coin-balance").textContent = String(state.coins);
  $("moment-total").textContent = String(sharedMomentCount());
  const currentIndex = Math.max(0, CHAPTERS.findIndex((chapter) => chapter.id === state.storyCurrentChapter));
  const nextIndex = CHAPTERS.findIndex((chapter) => !state.unlockedChapters.includes(chapter.id));
  if (nextIndex < 0) {
    $("chapter-progress").textContent = `current chapter: ${CHAPTERS[currentIndex].title} · all five chapters are open.`;
  } else {
    const next = CHAPTERS[nextIndex];
    const threshold = CHAPTER_THRESHOLDS[nextIndex];
    const moments = Math.min(sharedMomentCount(), threshold);
    const waitingForChapter = nextIndex > 0 && !state.completedChapters.includes(CHAPTERS[nextIndex - 1].id);
    const extra = nextIndex === 3 && state.visitedDates.length < 2
      ? " · return on another day"
      : nextIndex === 4 && state.affection < 75
        ? " · keep growing close"
        : waitingForChapter
          ? " · read the current chapter to continue"
          : "";
    const currentTitle = CHAPTERS[currentIndex].title;
    $("chapter-progress").textContent = `current chapter: ${currentTitle} · next: ${next.title} — ${moments} / ${threshold} moments${extra}.`;
  }
  const suggestions = state.dailySuggestions
    .map((id) => MOMENTS.find((moment) => moment.id === id))
    .filter(Boolean)
    .map((moment) => moment.title);
  $("daily-suggestion").textContent = `today's ideas: ${suggestions.join(" · ")}.`;
  $("kitchen-panel").hidden = state.room !== "kitchen";
  renderRoomActivities();
  renderShop();
  renderInventory();
  const shortcut = state.energy <= 30 && state.room !== "bedroom"
    ? ["bedroom", "your friend could use a soft rest."]
    : state.hunger <= 35 && state.room !== "kitchen"
      ? ["kitchen", "your friend's tummy might enjoy a snack."]
      : state.happiness <= 35 && state.room !== "park"
        ? ["park", "some fresh air might brighten the day."]
        : null;
  if (shortcut) {
    setRoomShortcut(shortcut[0], shortcut[1]);
  } else if (!pendingRoomShortcut) {
    $("room-shortcut").hidden = true;
  }
}

function renderRoomActivities() {
  const room = state.room;
  const container = $("room-activities");
  if (renderedActivityRoom !== room) {
    roomActivityPage = 0;
    container.replaceChildren();
    for (const moment of MOMENTS.filter((entry) => entry.room === room)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "room-activity";
      button.dataset.activityId = moment.id;
      const icon = document.createElement("span");
      icon.className = "room-activity-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = ACTIVITY_GLYPHS[moment.id] || "✧";
      const copy = document.createElement("span");
      copy.className = "room-activity-copy";
      const label = document.createElement("span");
      label.className = "room-activity-label";
      label.textContent = moment.title;
      const status = document.createElement("span");
      status.className = "room-activity-status";
      status.hidden = true;
      copy.append(label, status);
      button.append(icon, copy);
      button.addEventListener("click", () => performActivity(moment.id));
      container.appendChild(button);
    }
    renderedActivityRoom = room;
  }
  const available = MOMENTS.filter((moment) => isRoomMomentAvailable(moment));
  const prioritized = [...available].sort((a, b) => {
    const suggestionDelta = Number(state.dailySuggestions.includes(b.id)) - Number(state.dailySuggestions.includes(a.id));
    if (suggestionDelta) return suggestionDelta;
    return Number(state.completedMomentIds.includes(a.id)) - Number(state.completedMomentIds.includes(b.id));
  });
  const pageCount = Math.max(1, Math.ceil(prioritized.length / 4));
  roomActivityPage %= pageCount;
  const pageStart = roomActivityPage * 4;
  const visibleIds = new Set(prioritized.slice(pageStart, pageStart + 4).map((moment) => moment.id));
  const moreButton = $("more-moments-button");
  moreButton.hidden = prioritized.length <= 4;
  if (!moreButton.hidden) {
    const nextPage = (roomActivityPage + 1) % pageCount;
    moreButton.textContent = nextPage === 0
      ? `back to first moments · ${roomActivityPage + 1}/${pageCount}`
      : `more moments · ${roomActivityPage + 1}/${pageCount}`;
  }
  for (const button of container.querySelectorAll(".room-activity")) {
    const moment = MOMENTS.find((entry) => entry.id === button.dataset.activityId);
    if (!moment) continue;
    button.hidden = !visibleIds.has(moment.id);
    button.disabled = state.sleeping || state.momentCooldowns[moment.id] === localDateKey();
    button.dataset.room = room;
    button.title = state.sleeping
      ? "your friend is resting right now."
      : button.disabled
        ? "already shared today"
        : "";
    const status = button.querySelector(".room-activity-status");
    status.textContent = button.title;
    status.hidden = !button.disabled;
    button.setAttribute("aria-label", `${moment.title}${button.title ? `; ${button.title}` : ""}`);
  }
}

function showNextMomentPage() {
  const totalPages = Math.ceil(MOMENTS.filter((moment) => isRoomMomentAvailable(moment)).length / 4);
  if (totalPages <= 1) return;
  roomActivityPage = (roomActivityPage + 1) % totalPages;
  renderRoomActivities();
}

function hiddenFindRequirementsMet(id) {
  if (id === "bedroom-floorboard") {
    return state.completedChapters.includes("chapter-1") && state.completedMomentIds.includes("bedroom-rain-window");
  }
  if (id === "kitchen-shelf-note") {
    return state.triedFoods.length >= 2 && state.completedMomentIds.includes("kitchen-pantry-sort");
  }
  if (id === "living-room-photo") {
    return state.completedChapters.includes("chapter-2")
      && state.completedMomentIds.includes("living-read-book")
      && state.completedMomentIds.includes("living-window-light");
  }
  if (id === "park-bench-mark") {
    return state.unlockedPlaceMemories.includes("park-keepsake")
      && state.completedMomentIds.includes("park-bench");
  }
  return id === "living-room-second-note"
    && state.completedChapters.includes("chapter-3")
    && state.discoveredSecrets.includes("window")
    && state.discoveredSecrets.includes("rain");
}

function inspectHiddenFind(id) {
  const find = HIDDEN_FINDS.find((entry) => entry.id === id);
  if (!find || find.room !== state.room || state.sleeping || state.discoveredFinds.includes(id)) return;
  if (hiddenFindRequirementsMet(id)) {
    state.discoveredFinds.push(id);
    state.discoveryClueLevels[id] = 3;
    announceFindFound(find);
    reactPet("celebration");
    say(`i found something: ${find.title}. i want to read it with you.`);
    playMusicCue([587.33, 698.46, 880]);
    updateUI();
    renderJournal();
    saveGame(true);
    return;
  }
  const level = Math.min(3, (state.discoveryClueLevels[id] || 0) + 1);
  state.discoveryClueLevels[id] = level;
  const hint = find.hints[level - 1];
  say(hint);
  showToast(`something caught our attention: ${hint}`);
  saveGame();
}

function announceFindFound(find) {
  const banner = $("secret-found-banner");
  $("secret-found-title").textContent = `✧ hidden find · ${find.title}`;
  $("secret-found-copy").textContent = "a new discovery is waiting in the memory book.";
  banner.hidden = false;
  banner.classList.remove("secret-found-visible");
  void banner.offsetWidth;
  banner.classList.add("secret-found-visible");
  clearTimeout(secretFoundTimer);
  secretFoundTimer = setTimeout(() => {
    banner.hidden = true;
    banner.classList.remove("secret-found-visible");
  }, 4300);
}

function isRoomMomentAvailable(moment) {
  if (moment.room !== state.room || moment.id.startsWith("living-minigame-") || moment.id === "bond-gentle-pet" || moment.id === "kitchen-shared-snack" || moment.id === "bedroom-rest-together") return false;
  if (moment.id === "bond-comfort") return state.happiness < 60 || state.mood === "sad";
  if (moment.id === "bond-name-memory") return state.affection >= 5;
  if (moment.id === "bond-return-place") return state.visitedRooms.length >= 2;
  if (moment.id === "bond-celebrate") return sharedMomentCount() >= 10;
  if (moment.id === "bond-memory-fragment") return sharedMomentCount() >= 12;
  if (moment.id === "bond-read-chapter") return state.unlockedChapters.length > 1;
  return true;
}

function renderShop() {
  const container = $("shop-items");
  if (!container) return;
  container.replaceChildren();
  for (const food of FOODS) {
    const card = document.createElement("article");
    card.className = "food-card";
    const icon = document.createElement("span");
    icon.className = "food-icon";
    icon.textContent = food.icon;
    icon.setAttribute("aria-hidden", "true");
    const details = document.createElement("div");
    details.className = "food-details";
    const name = document.createElement("strong");
    name.textContent = food.name;
    const stats = document.createElement("span");
    stats.textContent = `${food.price} coins · +${food.fullness} fullness · +${food.happiness} joy`;
    details.append(name, stats);
    const buy = document.createElement("button");
    buy.type = "button";
    buy.className = "buy-food";
    buy.textContent = state.coins >= food.price ? "buy" : "need more coins";
    buy.disabled = state.coins < food.price || state.sleeping;
    buy.addEventListener("click", () => buyFood(food.id));
    card.append(icon, details, buy);
    container.appendChild(card);
  }
}

function renderInventory() {
  const container = $("inventory-items");
  if (!container) return;
  container.replaceChildren();
  const available = FOODS.filter((food) => state.inventory[food.id] > 0);
  $("inventory-empty").hidden = available.length > 0;
  for (const food of available) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inventory-food";
    button.setAttribute("aria-pressed", String(state.selectedFood === food.id));
    button.textContent = `${food.icon} ${food.name} · ${state.inventory[food.id]}`;
    button.disabled = state.sleeping;
    button.addEventListener("click", () => {
      state.selectedFood = food.id;
      saveGame();
      updateWorldStatus();
    });
    container.appendChild(button);
  }
  $("feed-button").setAttribute("aria-label", state.selectedFood
    ? `feed ${FOODS.find((food) => food.id === state.selectedFood)?.name || "selected food"}`
    : "feed using selected pantry food");
}

function renderPlaces() {
  const container = $("place-options");
  container.replaceChildren();
  for (const room of ROOMS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "place-option";
    button.dataset.room = room.id;
    button.setAttribute("aria-current", String(room.id === state.room));
    const icon = document.createElement("span");
    icon.className = "place-icon";
    icon.textContent = room.icon;
    icon.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = room.name;
    const description = document.createElement("small");
    description.textContent = room.description;
    text.append(title, description);
    const current = document.createElement("span");
    current.className = "place-current";
    current.textContent = room.id === state.room ? "you are here" : "";
    button.append(icon, text, current);
    button.addEventListener("click", () => moveToRoom(room.id));
    container.appendChild(button);
  }
}

function defaultPetSpot(roomId) {
  return ({
    bedroom: "default",
    kitchen: "default",
    "living-room": "default",
    park: "default"
  })[roomId] || "default";
}

function movePetTo(spot) {
  const stage = $("pet-stage");
  stage.dataset.petSpot = spot;
  els.petButton.classList.remove("is-walking");
  void els.petButton.offsetWidth;
  els.petButton.classList.add("is-walking");
  clearTimeout(petMoveTimer);
  petMoveTimer = setTimeout(() => els.petButton.classList.remove("is-walking"), 680);
}

function moveToRoom(roomId) {
  if (!ROOMS.some((room) => room.id === roomId)) return;
  if (state.sleeping && roomId !== "bedroom") {
    showToast("let them finish resting before you head somewhere else.");
    return;
  }
  state.room = roomId;
  changeMusicTheme(roomId);
  movePetTo(defaultPetSpot(roomId));
  state.visitedRooms = [...new Set([...state.visitedRooms, roomId])];
  pendingRoomShortcut = false;
  $("places-dialog").close();
  renderPlaces();
  updateUI();
  const room = ROOMS.find((entry) => entry.id === roomId);
  const visitor = state.playerName || "friend";
  say(({ bedroom: `the bedroom is quiet and cozy, ${visitor}. ♡`, kitchen: `i think the kitchen smells like a good story, ${visitor}. ♡`, "living-room": `i like spending quiet afternoons with you, ${visitor}.`, park: `look at all that space, ${visitor}! let's explore together.` })[room.id]);
  $("pet-stage").classList.remove("room-arrive");
  void $("pet-stage").offsetWidth;
  $("pet-stage").classList.add("room-arrive");
  saveGame();
  playTone(540, .08);
}

function buyFood(foodId) {
  const food = FOODS.find((entry) => entry.id === foodId);
  if (!food || state.room !== "kitchen") return;
  if (Date.now() < purchaseLockUntil) return;
  purchaseLockUntil = Date.now() + 300;
  if (state.coins < food.price) {
    say("we need a few more coins for that treat. let's play a game together.");
    return;
  }
  state.coins = Math.max(0, state.coins - food.price);
  state.inventory[food.id] = (state.inventory[food.id] || 0) + 1;
  state.selectedFood = food.id;
  updateWorldStatus();
  saveGame();
  showToast(`${food.name} added to your pantry. choose it and press feed when you're ready.`);
  playTone(640, .1);
}

function feed() {
  if (state.sleeping) return;
  if (state.room !== "kitchen") {
    setRoomShortcut("kitchen", "meals are shared in the kitchen.");
    say("could we head to the kitchen for a snack? ♡");
    showToast("feeding happens in the kitchen. use the room shortcut to go there.");
    return;
  }
  const food = FOODS.find((entry) => entry.id === state.selectedFood);
  if (Date.now() < feedLockUntil) return;
  if (!food || !state.inventory[food.id]) {
    say("let's choose something from the pantry first. ♡");
    showToast("choose a food in your pantry, or buy a treat with coins.");
    return;
  }
  movePetTo("table");
  feedLockUntil = Date.now() + 300;
  const gained = Math.min(food.fullness, 100 - state.hunger);
  state.hunger = Math.min(100, state.hunger + food.fullness);
  state.happiness = Math.min(100, state.happiness + food.happiness);
  state.inventory[food.id] -= 1;
  if (state.inventory[food.id] === 0) delete state.inventory[food.id];
  state.selectedFood = state.inventory[food.id] ? food.id : "";
  state.triedFoods = [...new Set([...state.triedFoods, food.id])];
  recordInteraction("feed", 2);
  recordMoment("kitchen-shared-snack", "kitchen");
  if (state.triedFoods.length > 1) maybeUnlockPlaceMemory("kitchen-aroma");
  updateUI();
  reactPet("happy");
  say(`${pick(food.reactions)} +${gained}% fullness.`);
  showToast(`${food.name} enjoyed · +${gained}% fullness.`);
  playTone(560);
  sparkle();
  saveGame();
}

function activitySceneOptions(activity) {
  const id = activity.id;
  const profile = id.includes("rain") || id.includes("cloud") ? "weather"
    : id.includes("snack") || id.includes("food") || id.includes("flavor") || id.includes("recipe") || id.includes("pantry") || id.includes("topping") || id.includes("tea") ? "food"
      : id.startsWith("park-") ? "park"
        : id.includes("music") || id.includes("song") ? "music"
          : id.includes("star") || id.includes("minigame") || id.includes("ball") || id.includes("game") ? "game"
            : id.includes("book") || id.includes("dream") || id.includes("chapter") || id.includes("memory") ? "story"
              : id.includes("bed") || id.includes("pillow") || id.includes("blanket") || id.includes("rest") || id.includes("tuck") || id.includes("sofa") ? "rest"
                : id.includes("draw") ? "art"
                  : id.includes("plush") || id.includes("movie") ? "play"
                    : id.includes("light") ? "weather"
                      : id.startsWith("bond-") ? "bond"
                        : activity.room;
  const profiles = {
    food: [
      { id: "choose-topping", label: "let me pick the topping", line: "i chose the topping for {title}. it was a bold decision and there are crumbs as evidence.", reaction: "proud" },
      { id: "snack-ranking", label: "rank it against our favorites", line: "we gave {title} a place in our snack rankings. the tasting panel was extremely serious.", reaction: "curious" },
      { id: "make-recipe", label: "invent a recipe card for it", line: "we made a recipe card for {title}, including one instruction that simply says 'add a dash of confidence.'", reaction: "playful" },
      { id: "save-a-bite", label: "save a bite for later", line: "we saved a bite from {title} for later. i have been thinking about it ever since.", reaction: "shy" }
    ],
    weather: [
      { id: "name-the-drops", label: "give the raindrops names", line: "we named the raindrops during {title}. one was called captain splish and seemed pleased.", reaction: "playful" },
      { id: "cloud-story", label: "make up a cloud story", line: "we made a story out of {title}: a cloud got lost, found a hat, and became mayor.", reaction: "curious" },
      { id: "find-a-rhythm", label: "tap along to the rhythm", line: "we found a rhythm in {title} and tapped it out together. the window kept the beat.", reaction: "happy" },
      { id: "pick-a-view", label: "choose the best window view", line: "we picked our favorite view for {title}. i chose the one with the most dramatic cloud.", reaction: "shy" }
    ],
    park: [
      { id: "leaf-shapes", label: "find the oddest leaf", line: "we searched during {title} and found a leaf shaped like a very lopsided map.", reaction: "curious" },
      { id: "race-to-bench", label: "race me to the bench", line: "we raced during {title}. i arrived first, then pretended the bench was a finish-line podium.", reaction: "happy" },
      { id: "name-ripples", label: "make names for the ripples", line: "we gave the ripples in {title} names. they drifted away before we could ask if they liked them.", reaction: "playful" },
      { id: "keep-a-color", label: "pick a color to remember", line: "we chose a color from {title} to keep in mind. mine looked like the sky just before evening.", reaction: "proud" }
    ],
    story: [
      { id: "alternate-ending", label: "invent a new ending", line: "we gave {title} a new ending. the hero came home, made tea, and refused to explain the plot.", reaction: "curious" },
      { id: "name-a-character", label: "name the mysterious character", line: "we named the mysterious character in {title}. they are called professor cardigan now.", reaction: "playful" },
      { id: "keep-a-detail", label: "save one detail for later", line: "we chose one detail from {title} to remember. i picked the part that felt oddly familiar.", reaction: "shy" },
      { id: "ask-a-question", label: "ask the story one question", line: "we asked {title} a question and made up an answer together. i am not sure the book agreed.", reaction: "surprised" }
    ],
    music: [
      { id: "pick-a-beat", label: "tap out a new beat", line: "we tapped a beat for {title}. i got distracted halfway through and called it a remix.", reaction: "happy" },
      { id: "name-the-song", label: "give the tune a name", line: "we named the tune from {title} 'the cushion parade.' it is already stuck in my head.", reaction: "playful" },
      { id: "listen-for-an-instrument", label: "guess the hidden instrument", line: "we listened closely to {title} and guessed what we could hear. i still think one sound was a sleepy frog.", reaction: "curious" },
      { id: "choose-a-dance", label: "make up a seated dance", line: "we invented a seated dance for {title}. it involved one ear wiggle and excellent timing.", reaction: "proud" }
    ],
    game: [
      { id: "celebrate-score", label: "celebrate the best score", line: "we celebrated {title} like champions. i accepted an imaginary medal and wore it very proudly.", reaction: "proud" },
      { id: "invent-a-rule", label: "invent a silly new rule", line: "we added a rule to {title}: the winner must make a victory face. mine needs practice.", reaction: "playful" },
      { id: "swap-roles", label: "swap who goes first", line: "we switched turns during {title}. i learned that going second is also a strategy, apparently.", reaction: "curious" },
      { id: "make-a-rematch", label: "plan a rematch", line: "we planned a rematch after {title}. i am already preparing my most focused expression.", reaction: "happy" }
    ],
    rest: [
      { id: "choose-blanket", label: "pick the warmest blanket", line: "we picked the best blanket for {title}. i chose the one that made the room feel quiet.", reaction: "shy" },
      { id: "share-a-thought", label: "trade one sleepy thought", line: "we traded sleepy thoughts during {title}. mine was mostly about clouds and toast.", reaction: "curious" },
      { id: "make-a-fort", label: "make a blanket hideaway", line: "we made a blanket hideaway for {title}. it had a roof, a pillow, and no strict entry rules.", reaction: "happy" },
      { id: "listen-to-room", label: "listen to the room settle", line: "we listened to the room during {title}. even the clock seemed to slow down for us.", reaction: "shy" }
    ],
    bond: [
      { id: "say-thanks", label: "say what we appreciate", line: "we shared what we appreciate about {title}. i was very brave and only blushed a bit.", reaction: "shy" },
      { id: "remember-a-detail", label: "keep one detail in mind", line: "we chose a detail from {title} to remember. mine was the way you stayed beside me.", reaction: "proud" },
      { id: "make-a-promise", label: "make a small promise", line: "we made a promise about {title}: when we can, we will make room for another moment.", reaction: "happy" },
      { id: "ask-a-question", label: "ask one curious question", line: "we asked a question about {title} and let the answer take its time.", reaction: "curious" }
    ],
    kitchen: [
      { id: "sort-by-color", label: "sort things by color", line: "we sorted the details of {title} by color. the results were pleasing and not scientifically useful.", reaction: "curious" },
      { id: "make-a-list", label: "write a two-item list", line: "we made a list about {title}. it had two items, both of them excellent.", reaction: "proud" },
      { id: "give-it-a-title", label: "give the moment a title", line: "we gave {title} a title that sounded much more important than it needed to be.", reaction: "playful" },
      { id: "notice-a-detail", label: "spot one new detail", line: "we found a detail in {title} that we had missed before. it was right there, quietly waiting.", reaction: "curious" }
    ],
    bedroom: [
      { id: "invent-a-dream", label: "turn it into a dream", line: "we turned {title} into a dream about a door that opened onto a familiar sky.", reaction: "curious" },
      { id: "pick-a-comfy-spot", label: "choose the coziest spot", line: "we chose the coziest part of {title}. mine had a pillow and no responsibilities.", reaction: "shy" },
      { id: "name-the-moment", label: "give it a funny name", line: "we named {title} 'the official pause for excellent thoughts.' very formal.", reaction: "playful" },
      { id: "leave-a-note", label: "leave a note for morning", line: "we left a note about {title} for morning. it said, 'remember how nice this felt.'", reaction: "proud" }
    ],
    "living-room": [
      { id: "doodle-a-detail", label: "draw the funniest detail", line: "we drew the funniest detail from {title}. my version had very confident proportions.", reaction: "happy" },
      { id: "give-a-rating", label: "give it a dramatic rating", line: "we rated {title} out of ten. i gave it nine and a half for excellent company.", reaction: "proud" },
      { id: "make-a-house-rule", label: "invent a house rule", line: "we made a rule for {title}: whoever spots the oddest detail gets to name it.", reaction: "playful" },
      { id: "choose-a-seat", label: "pick the best seat", line: "we picked the best seat for {title}. i have claimed it until further notice.", reaction: "shy" }
    ],
    art: [
      { id: "draw-a-poster", label: "make a poster for it", line: "we made a poster for {title}. i drew the title in enormous letters and a very small sofa.", reaction: "happy" },
      { id: "choose-colors", label: "choose its colors", line: "we picked colors for {title}. the brightest one made the whole idea feel more cheerful.", reaction: "curious" },
      { id: "add-a-caption", label: "write a silly caption", line: "we gave {title} a caption that made us laugh before we finished writing it.", reaction: "playful" },
      { id: "sign-the-picture", label: "sign our masterpiece", line: "we signed our picture of {title}. i added a star beside my name for dramatic effect.", reaction: "proud" }
    ],
    play: [
      { id: "give-it-a-job", label: "give it an important job", line: "we gave {title} an important job. the plush toy is now in charge of morale.", reaction: "playful" },
      { id: "make-a-voice", label: "give it a silly voice", line: "we gave {title} a voice. it sounded like a very polite radio host.", reaction: "surprised" },
      { id: "invent-a-game", label: "invent a game around it", line: "we invented a game for {title}. the rules changed twice, which made it more fun.", reaction: "happy" },
      { id: "ask-its-opinion", label: "ask what it thinks", line: "we asked {title} for an opinion. the answer was mysterious but surprisingly confident.", reaction: "curious" }
    ]
  };
  const roomProfiles = {
    kitchen: ["food", "kitchen", "story"],
    bedroom: ["weather", "rest", "bedroom", "story"],
    "living-room": ["music", "game", "story", "rest", "living-room", "bond", "art", "play"],
    park: ["park", "weather", "game", "story"]
  };
  let seed = [...activity.id].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 7);
  const shuffle = (values) => {
    const shuffled = [...values];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const swapIndex = Math.floor((seed / 4294967296) * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  };
  const roomBank = (roomProfiles[activity.room] || ["living-room"])
    .flatMap((profileName) => profiles[profileName].map((option) => ({
      ...option,
      id: `${profileName}-${option.id}`
    })));
  const preferredBank = (profiles[profile] || profiles[activity.room] || profiles["living-room"])
    .map((option) => ({ ...option, id: `${profile}-${option.id}` }));
  const preferredIds = new Set(preferredBank.map((option) => option.id));
  const complementaryBank = roomBank.filter((option) => !preferredIds.has(option.id));
  const selected = [
    ...shuffle(preferredBank).slice(0, 2),
    ...shuffle(complementaryBank).slice(0, 2)
  ];
  const options = selected
    .map((option) => ({ ...option, line: option.line.replaceAll("{title}", activity.title) }));
  const recentCounts = new Map(state.recentActivityChoices.map((choice, index) => {
    const [activityId, choiceId] = choice.split(":");
    return [`${activityId}:${choiceId}`, index + 1];
  }));
  return options.sort((a, b) =>
    (recentCounts.get(`${activity.id}:${a.id}`) || 0) - (recentCounts.get(`${activity.id}:${b.id}`) || 0));
}

function activityReaction(choiceId) {
  const reactions = {
    beside: "shy", cushion: "shy", object: "happy",
    "old-song": "curious", "bouncy-song": "happy", "quiet-song": "shy",
    mystery: "curious", adventure: "happy", "strange-detail": "curious",
    watch: "shy", count: "curious", story: "happy",
    berry: "happy", savory: "happy", surprise: "curious",
    "slow-roll": "curious", "trick-shot": "happy", "take-turns": "happy",
    explore: "curious", collect: "happy", rest: "shy",
    dream: "curious", fort: "happy", thought: "shy",
    talk: "happy", notice: "curious", repeat: "happy"
  };
  return reactions[choiceId] || "curious";
}

function openActivityScene(activity) {
  $("activity-scene-title").textContent = activity.title;
  $("activity-scene-prompt").textContent = `how should we ${activity.title}?`;
  const choices = $("activity-scene-choices");
  choices.replaceChildren();
  for (const option of activitySceneOptions(activity).slice(0, 4)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "activity-scene-choice";
    button.dataset.choiceId = option.id;
    button.textContent = option.label;
    button.addEventListener("click", () => {
      $("activity-scene-dialog").close();
      performActivity(activity.id, option);
    });
    choices.appendChild(button);
  }
  $("activity-scene-dialog").showModal();
}

function performActivity(activityId, outcome = null) {
  const activity = MOMENTS.find((entry) => entry.id === activityId);
  if (!activity || activity.room !== state.room || state.sleeping) return;
  if (state.momentCooldowns[activity.id] === localDateKey()) {
    showToast("you've already shared this moment today. another activity is waiting.");
    return;
  }
  const energyCost = activity.energy || 0;
  if (state.energy < energyCost) {
    setRoomShortcut("bedroom", "your friend needs more energy before that activity.");
    say("i'm getting sleepy. could we rest in the bedroom first? ♡");
    showToast("that activity needs more energy. the bedroom is always free to visit.");
    return;
  }
  if (!outcome) {
    openActivityScene(activity);
    return;
  }
  const activitySpot = activity.room === "bedroom"
    ? "bed"
    : activity.room === "kitchen"
      ? "table"
      : activity.room === "living-room"
        ? activity.id === "living-sofa-sit" || activity.id === "living-share-blanket" ? "sofa" : "table"
        : activity.id === "park-bench" ? "bench" : activity.id === "park-hidden-object" ? "pond" : "path";
  movePetTo(activitySpot);
  state.energy = Math.max(0, state.energy - energyCost);
  state.happiness = Math.min(100, state.happiness + (activity.happiness || 2));
  const type = activity.category === "park" ? "play" : "talk";
  recordInteraction(type);
  recordMoment(activity.id, activity.category);
  state.lastActivityId = activity.id;
  state.lastActivityChoice = outcome.id;
  state.recentActivityChoices = [...state.recentActivityChoices, `${activity.id}:${outcome.id}`].slice(-12);
  const line = outcome.line || pick(activity.lines);
  say(line.replaceAll("{player_name}", state.playerName || "friend"));
  reactPet(outcome.reaction || activityReaction(outcome.id));
  if (activity.id === "park-hidden-object" && sharedMomentCount() >= 12) maybeUnlockPlaceMemory("park-keepsake");
  if (activity.room === "bedroom" && MOMENTS.filter((moment) => moment.room === "bedroom" && state.completedMomentIds.includes(moment.id)).length >= 2) {
    maybeUnlockPlaceMemory("bedroom-dream");
  }
  if (activity.room === "living-room" && MOMENTS.filter((moment) => moment.room === "living-room" && state.completedMomentIds.includes(moment.id)).length >= 3) {
    maybeUnlockPlaceMemory("living-home");
  }
  updateUI();
  sparkle();
  playTone(activity.room === "park" ? 700 : 520);
  saveGame();
}

function prepareFurniture() {
  for (const piece of document.querySelectorAll(".room-piece")) {
    const className = [...piece.classList].find((name) => Object.hasOwn(FURNITURE, name));
    if (!className) continue;
    const furniture = FURNITURE[className];
    piece.dataset.furniture = className;
    piece.setAttribute("role", "button");
    piece.setAttribute("tabindex", "0");
    piece.setAttribute("aria-label", furniture.label);
    piece.setAttribute("aria-keyshortcuts", "Enter Space");
    piece.classList.add("furniture-button");
  }
}

const recentFurnitureLines = new Map();
const touchedFurniture = new WeakSet();

function interactWithFurniture(piece) {
  if (state.sleeping) return;
  const furniture = FURNITURE[piece.dataset.furniture];
  const scene = piece.closest(".room-scene");
  const sceneName = scene && [...scene.classList].find((name) => name.startsWith("scene-"))?.slice(6);
  const sceneRoom = sceneName === "living" ? "living-room" : sceneName;
  if (!furniture || sceneRoom !== state.room) return;
  movePetTo(furniture.spot);
  let lines = furniture.lines;
  if (piece.dataset.furniture === "kitchen-fridge" && Object.values(state.inventory).some((count) => count > 0)) {
    lines = ["there's a snack waiting in the pantry. choose it when you want to feed me.", "i can hear something delicious in the pantry. let's pick a treat together."];
  }
  const previous = recentFurnitureLines.get(piece.dataset.furniture);
  const options = lines.filter((line) => line !== previous);
  const line = pick(options.length ? options : lines);
  recentFurnitureLines.set(piece.dataset.furniture, line);
  say(line);
  reactPet(furniture.reaction);
  piece.classList.remove("furniture-touched");
  void piece.offsetWidth;
  piece.classList.add("furniture-touched");
  if (!touchedFurniture.has(piece)) {
    touchedFurniture.add(piece);
    piece.addEventListener("animationend", (event) => {
      if (event.animationName === "furniture-tap") piece.classList.remove("furniture-touched");
    });
  }
  sparkle();
  playTone(furniture.reaction === "happy" ? 680 : 510, .1);
  const findByFurniture = {
    "bedroom-wardrobe": "bedroom-floorboard",
    "kitchen-shelf": "kitchen-shelf-note",
    "living-bookshelf": "living-room-photo",
    "park-bench": "park-bench-mark",
    "living-window": "living-room-second-note"
  };
  const findId = findByFurniture[piece.dataset.furniture];
  if (findId && !state.discoveredFinds.includes(findId)) inspectHiddenFind(findId);
}

function revealSecretHint(id) {
  const secret = SECRET_STORIES.find((entry) => entry.id === id);
  if (!secret || state.discoveredSecrets.includes(id)) return;
  const level = Math.min(secret.hints.length - 1, (state.secretHintLevels[id] || 0) + 1);
  if (level === state.secretHintLevels[id]) return;
  state.secretHintLevels[id] = level;
  saveGame();
  renderSecretHints();
}

function renderSecretHints() {
  const container = $("secret-hints");
  container.replaceChildren();
  for (const secret of SECRET_STORIES) {
    const discovered = state.discoveredSecrets.includes(secret.id);
    const level = Math.min(secret.hints.length - 1, state.secretHintLevels[secret.id] || 0);
    const card = document.createElement("article");
    card.className = `secret-hint-card${discovered ? " is-found" : ""}`;
    const heading = document.createElement("h4");
    heading.textContent = secret.title;
    const progress = document.createElement("span");
    progress.className = "secret-hint-progress";
    progress.textContent = discovered ? "found" : `hint ${level + 1} / ${secret.hints.length}`;
    const message = document.createElement("p");
    message.className = "secret-hint-copy";
    message.textContent = discovered
      ? "found and saved in your memories."
      : secret.hints[level];
    const control = document.createElement("button");
    control.type = "button";
    control.className = "secret-hint-button";
    if (discovered) {
      control.textContent = "found";
      control.disabled = true;
    } else if (level >= secret.hints.length - 1) {
      control.textContent = "no more hints";
      control.disabled = true;
    } else {
      control.textContent = "another hint";
      control.addEventListener("click", () => revealSecretHint(secret.id));
    }
    card.append(heading, progress, message, control);
    container.appendChild(card);
  }
}

function recordMoment(id, category) {
  const moment = MOMENTS.find((entry) => entry.id === id);
  if (!moment || state.momentCooldowns[id] === localDateKey()) return false;
  if (state.completedMomentIds.includes(id)) {
    updateStoryProgress();
    return false;
  }
  state.momentCooldowns[id] = localDateKey();
  state.completedMomentIds.push(id);
  state.sharedMoments = Math.min(1000000, Math.max(state.sharedMoments + 1, state.completedMomentIds.length));
  state.completedMomentCategories[id] = moment.category || category;
  maybeUnlockEligiblePlaceMemories();
  updateStoryProgress();
  saveGame();
  return true;
}

function maybeUnlockPlaceMemory(id) {
  if (state.unlockedPlaceMemories.includes(id)) return false;
  const memory = PLACE_MEMORIES.find((entry) => entry.id === id);
  if (!memory) return false;
  state.unlockedPlaceMemories.push(id);
  showToast(`a new ${memory.room} memory is ready in your book: ${memory.title}.`);
  say(memory.text.split(".")[0] + ".");
  saveGame();
  return true;
}

function maybeUnlockEligiblePlaceMemories() {
  const bedroomCount = MOMENTS.filter((moment) => moment.room === "bedroom" && state.completedMomentIds.includes(moment.id)).length;
  const livingCount = MOMENTS.filter((moment) => moment.room === "living-room" && state.completedMomentIds.includes(moment.id)).length;
  if (bedroomCount >= 2) maybeUnlockPlaceMemory("bedroom-dream");
  if (state.triedFoods.length >= 2) maybeUnlockPlaceMemory("kitchen-aroma");
  if (livingCount >= 3) maybeUnlockPlaceMemory("living-home");
  if (sharedMomentCount() >= 12 && state.completedMomentIds.includes("park-hidden-object")) maybeUnlockPlaceMemory("park-keepsake");
}

function talk() {
  if (state.sleeping) return;
  movePetTo(defaultPetSpot(state.room));
  const happinessAtTalk = state.happiness;
  state.talks += 1;
  state.happiness = Math.min(100, state.happiness + 2);
  recordInteraction("talk", 1);
  const conversationMoments = {
    kitchen: "kitchen-table-chat",
    bedroom: "bedroom-bedtime-thought",
    "living-room": "bond-comfort",
    park: "park-bench"
  };
  recordMoment(conversationMoments[state.room], state.room);
  updateUI();
  const triggered = triggerSecret("window", happinessAtTalk) || triggerSecret("rain", happinessAtTalk) || triggerSecret("origin", happinessAtTalk);
  if (!triggered) {
    const contextual = state.hunger <= 35 && state.room !== "kitchen"
      ? "i think my tummy is asking for something..."
      : state.energy <= 30 && state.room !== "bedroom"
        ? "that was fun, but i could really use a nap."
        : state.happiness <= 35 && state.room !== "park"
          ? "maybe some fresh air would help me feel brighter."
          : state.room === "park" && state.happiness > 55
            ? `look at all that space, ${state.playerName || "friend"}! let's explore!`
            : state.room === "living-room"
              ? "i like spending quiet afternoons with you."
              : state.room === "kitchen"
                ? "is that something delicious? ♡"
                : null;
    if (contextual) say(contextual);
    else chooseDialogue(dialogueCategory(), true);
  }
  playTone(490);
}

function pet() {
  if (state.sleeping) return;
  movePetTo(defaultPetSpot(state.room));
  state.happiness = Math.min(100, state.happiness + 8);
  state.petCount += 1;
  recordInteraction("pet", 3);
  recordMoment("bond-gentle-pet", "heart");
  updateUI();
  els.creature.classList.add("petting");
  clearTimeout(pettingTimer);
  pettingTimer = setTimeout(() => els.creature.classList.remove("petting"), 1300);
  if (!triggerSecret("rain")) chooseDialogue(state.affection >= 12 ? dialogueCategory() : "everyday", true);
  sparkle();
  playTone(680, .12);
}

function ensureAudioGraph() {
  if (audioContext) return audioContext;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext = new AudioContextClass();
  effectsGain = audioContext.createGain();
  effectsGain.gain.value = state.soundEffectsVolume;
  effectsGain.connect(audioContext.destination);
  musicGain = audioContext.createGain();
  musicGain.gain.value = 0;
  musicGain.connect(audioContext.destination);
  return audioContext;
}

function updateAudioVolumes() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  if (effectsGain) effectsGain.gain.setTargetAtTime(state.soundEffectsEnabled ? state.soundEffectsVolume : 0, now, .04);
  if (musicGain) musicGain.gain.setTargetAtTime(state.musicEnabled ? state.musicVolume : 0, now, .12);
}

function playTone(frequency = 580, duration = .09) {
  if (!state.soundEffectsEnabled) return;
  try {
    const context = ensureAudioGraph();
    if (!context) return;
    if (context.state === "suspended") context.resume().catch((error) => console.warn("audio could not resume", error));
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.055, context.currentTime + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(effectsGain);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  } catch (error) {
    console.warn("sound effect could not play", error);
  }
}

const MUSIC_THEMES = {
  bedroom: { tempo: 760, notes: [392, 440, 523.25, 440, 349.23, 392, 440, 392, 329.63, 392, 440, 349.23] },
  kitchen: { tempo: 490, notes: [392, 493.88, 587.33, 493.88, 440, 523.25, 659.25, 523.25, 392, 493.88, 587.33, 659.25] },
  "living-room": { tempo: 600, notes: [392, 493.88, 440, 392, 329.63, 392, 440, 523.25, 493.88, 440, 392, 329.63] },
  park: { tempo: 540, notes: [440, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 523.25, 440, 493.88, 587.33, 523.25] }
};

function playMusicNote() {
  if (!audioContext || !musicGain || !state.musicEnabled) return;
  const theme = MUSIC_THEMES[state.room] || MUSIC_THEMES["living-room"];
  const frequency = theme.notes[musicNoteIndex % theme.notes.length];
  musicNoteIndex += 1;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  oscillator.type = musicNoteIndex % 4 === 0 ? "triangle" : "sine";
  oscillator.frequency.value = frequency;
  envelope.gain.setValueAtTime(.0001, now);
  envelope.gain.exponentialRampToValueAtTime(.17, now + .035);
  envelope.gain.exponentialRampToValueAtTime(.0001, now + theme.tempo / 1000 * 1.45);
  oscillator.connect(envelope);
  envelope.connect(musicGain);
  oscillator.start(now);
  oscillator.stop(now + theme.tempo / 1000 * 1.5);
  if (musicNoteIndex % 4 === 1) {
    const bass = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bass.type = "sine";
    bass.frequency.value = frequency / 2;
    bassGain.gain.setValueAtTime(.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(.06, now + .08);
    bassGain.gain.exponentialRampToValueAtTime(.0001, now + theme.tempo / 1000 * 3.5);
    bass.connect(bassGain);
    bassGain.connect(musicGain);
    bass.start(now);
    bass.stop(now + theme.tempo / 1000 * 3.6);
  }
}

function startMusic() {
  if (!state.musicEnabled) return;
  try {
    const context = ensureAudioGraph();
    if (!context) {
      showToast("this browser does not support background music.");
      return;
    }
    if (context.state === "suspended") context.resume().catch((error) => console.warn("music could not resume", error));
    updateAudioVolumes();
    if (musicTimer === null) {
      musicThemeRoom = state.room;
      playMusicNote();
      musicTimer = setInterval(playMusicNote, MUSIC_THEMES[state.room]?.tempo || MUSIC_THEMES["living-room"].tempo);
    }
  } catch (error) {
    console.warn("background music could not start", error);
    showToast("background music could not start in this browser.");
  }
}

function stopMusic() {
  if (musicTimer !== null) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  if (audioContext && musicGain) {
    musicGain.gain.setTargetAtTime(0, audioContext.currentTime, .12);
  }
}

function changeMusicTheme(roomId) {
  if (!state.musicEnabled || !audioContext || musicThemeRoom === roomId) return;
  const theme = MUSIC_THEMES[roomId] || MUSIC_THEMES["living-room"];
  if (musicTimer !== null) clearInterval(musicTimer);
  musicTimer = null;
  musicThemeRoom = roomId;
  musicNoteIndex = 0;
  musicGain.gain.setTargetAtTime(0, audioContext.currentTime, .04);
  setTimeout(() => {
    if (!state.musicEnabled || !audioContext || !musicGain || musicThemeRoom !== roomId || musicTimer !== null) return;
    musicGain.gain.setTargetAtTime(state.musicVolume, audioContext.currentTime, .12);
    playMusicNote();
    musicTimer = setInterval(playMusicNote, theme.tempo);
  }, 100);
}

function playMusicCue(notes) {
  if (!state.musicEnabled || !audioContext || !musicGain) return;
  const startAt = audioContext.currentTime + .03;
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    const start = startAt + index * .13;
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(.0001, start);
    envelope.gain.exponentialRampToValueAtTime(.2, start + .025);
    envelope.gain.exponentialRampToValueAtTime(.0001, start + .42);
    oscillator.connect(envelope);
    envelope.connect(musicGain);
    oscillator.start(start);
    oscillator.stop(start + .45);
  });
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $("light-theme-button").setAttribute("aria-pressed", String(state.theme === "light"));
  $("dark-theme-button").setAttribute("aria-pressed", String(state.theme === "dark"));
}

function setTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "light";
  applyTheme();
  saveGame();
}

async function copyText(text, confirmation) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      if (!copied) throw new Error("clipboard copy was not available");
    }
    showToast(confirmation);
  } catch (error) {
    console.warn("clipboard copy could not complete", error);
    showToast("copying is unavailable here. you can select and copy the text yourself.");
  }
}

function feedbackText() {
  const category = $("feedback-category").value;
  const message = $("feedback-message").value.trim();
  return `${category}${message ? `\n\n${message}` : ""}\n\nsent by a player of please don't delete me.exe`;
}

function finishTutorial() {
  $("tutorial-dialog").close();
}

function sparkle() {
  const item = document.createElement("span");
  item.className = "sparkle";
  item.textContent = pick(["✦", "✧", "♡"]);
  item.style.left = `${35 + Math.random() * 35}%`;
  item.style.top = `${48 + Math.random() * 26}%`;
  $("sparkle-layer").appendChild(item);
  item.addEventListener("animationend", () => item.remove(), { once: true });
}

function renderJournal() {
  updateStoryProgress(false, false);
  const chaptersNode = $("chapter-entries");
  const secretsNode = $("secret-entries");
  const discoveriesNode = $("discovery-entries");
  const placesNode = $("place-memory-entries");
  chaptersNode.replaceChildren();
  secretsNode.replaceChildren();
  discoveriesNode.replaceChildren();
  placesNode.replaceChildren();
  $("journal-progress").textContent = `chapter ${Math.min(state.completedChapters.length + 1, CHAPTERS.length)} of ${CHAPTERS.length} · ${sharedMomentCount()} moments · ${state.discoveredSecrets.length} secrets found`;
  for (const chapter of CHAPTERS) {
    const unlocked = state.unlockedChapters.includes(chapter.id);
    const completed = state.completedChapters.includes(chapter.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `journal-entry${unlocked && !completed ? " unread" : ""}`;
    button.disabled = !unlocked;
    const title = document.createElement("span");
    title.textContent = unlocked
      ? chapter.title
      : `${chapter.title} · ${chapterRequirementText(CHAPTERS.indexOf(chapter)).join(" · ")}`;
    const status = document.createElement("span");
    status.className = "entry-state";
    status.textContent = completed ? "completed" : unlocked ? "unlocked" : chapterCanUnlock(CHAPTERS.indexOf(chapter)) ? "ready to unlock" : "locked";
    button.append(title, status);
    if (unlocked) button.addEventListener("click", () => openJournalEntry("chapter", chapter.id));
    chaptersNode.appendChild(button);
  }
  for (const secret of SECRET_STORIES) {
    const unlocked = state.unlockedSecrets.includes(secret.id);
    const discovered = state.discoveredSecrets.includes(secret.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `journal-entry${unlocked && !discovered ? " unread" : ""}`;
    button.disabled = !unlocked;
    const title = document.createElement("span");
    title.textContent = unlocked ? secret.title : `sealed memory · ${secret.hint}`;
    const status = document.createElement("span");
    status.className = "entry-state";
    status.textContent = discovered ? "read" : unlocked ? "new" : "locked";
    button.append(title, status);
    if (unlocked) button.addEventListener("click", () => openJournalEntry("secret", secret.id));
    secretsNode.appendChild(button);
  }
  renderSecretHints();
  for (const find of HIDDEN_FINDS.filter((entry) => state.discoveredFinds.includes(entry.id))) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "journal-entry unread";
    const title = document.createElement("span");
    title.textContent = find.title;
    const status = document.createElement("span");
    status.className = "entry-state";
    status.textContent = "found";
    button.append(title, status);
    button.addEventListener("click", () => openJournalEntry("find", find.id));
    discoveriesNode.appendChild(button);
  }
  for (const memory of PLACE_MEMORIES) {
    const unlocked = state.unlockedPlaceMemories.includes(memory.id);
    const discovered = state.discoveredPlaceMemories.includes(memory.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `journal-entry${unlocked && !discovered ? " unread" : ""}`;
    button.disabled = !unlocked;
    const title = document.createElement("span");
    title.textContent = unlocked ? memory.title : `sealed ${memory.room} memory`;
    const status = document.createElement("span");
    status.className = "entry-state";
    status.textContent = discovered ? "read" : unlocked ? "new" : "locked";
    button.append(title, status);
    if (unlocked) button.addEventListener("click", () => openJournalEntry("place", memory.id));
    placesNode.appendChild(button);
  }
}

function openJournalEntry(type, id) {
  const isChapter = type === "chapter";
  const entries = isChapter ? CHAPTERS : type === "place" ? PLACE_MEMORIES : type === "find" ? HIDDEN_FINDS : SECRET_STORIES;
  const entry = entries.find((candidate) => candidate.id === id);
  if (!entry) return;
  $("journal-list-view").hidden = true;
  $("journal-reader").hidden = false;
  $("reader-eyebrow").textContent = isChapter ? "a chapter from your story" : type === "place" ? `a memory from the ${entry.room}` : type === "find" ? `a discovery from the ${entry.room}` : "a memory from behind the window";
  $("reader-title").textContent = entry.title;
  $("reader-title").dataset.entryId = id;
  $("reader-copy").textContent = entry.text;
  $("reader-dialogue").textContent = entry.dialogue ? `“${entry.dialogue}”` : "";
  $("complete-chapter").hidden = !isChapter || state.completedChapters.includes(id);
  $("reader-status").textContent = isChapter
    ? state.completedChapters.includes(id) ? "this chapter is safely kept in your book." : "read at your own pace, then keep this chapter."
    : "this memory will stay here whenever you want to return.";
  if (isChapter) {
    state.journalRead = [...new Set([...state.journalRead, id])];
  } else if (type === "place") {
    state.journalRead = [...new Set([...state.journalRead, `place-${id}`])];
    if (!state.discoveredPlaceMemories.includes(id)) {
      state.discoveredPlaceMemories.push(id);
      state.unlockedPlaceMemories = [...new Set([...state.unlockedPlaceMemories, id])];
      showToast(`place memory read and kept: ${entry.title}.`);
    }
  } else if (type === "find") {
    state.journalRead = [...new Set([...state.journalRead, `find-${id}`])];
  } else {
    state.journalRead = [...new Set([...state.journalRead, `secret-${id}`])];
    if (!state.discoveredSecrets.includes(id)) {
      state.discoveredSecrets.push(id);
      state.unlockedSecrets = [...new Set([...state.unlockedSecrets, id])];
      showToast(`memory read and kept: ${entry.title}.`);
    }
  }
  updateUI();
  saveGame(true);
}

function backToJournal() {
  $("journal-reader").hidden = true;
  $("journal-list-view").hidden = false;
  renderJournal();
}

function completeCurrentChapter() {
  const chapter = CHAPTERS.find((entry) => entry.id === $("reader-title").dataset.entryId);
  if (!chapter) return;
  if (!state.completedChapters.includes(chapter.id)) {
    state.completedChapters.push(chapter.id);
    state.unlockedChapters = [...new Set([...state.unlockedChapters, chapter.id])];
    $("complete-chapter").hidden = true;
    $("reader-status").textContent = "chapter kept. a new page may be waiting in your book.";
    updateStoryProgress();
    updateUI();
    saveGame(true);
    renderJournal();
    playTone(620, .12);
    playMusicCue([523.25, 659.25, 783.99, 1046.5]);
  }
}

function openJournal() {
  backToJournal();
  renderJournal();
  $("journal-dialog").showModal();
}

function openMinigames() {
  if (state.sleeping) return;
  minigame = { mode: "", running: false, rewarded: false, hits: 0, moves: 0, pairs: 0, timer: null, spawnTimer: null, mismatchTimer: null };
  $("minigame-choices").hidden = false;
  $("minigame-play").hidden = true;
  $("minigame-title").textContent = "choose a game";
  $("minigame-dialog").showModal();
  renderMinigameLimits();
  clearInterval(minigameLimitTimer);
  minigameLimitTimer = setInterval(renderMinigameLimits, 1000);
}

function activeMinigameAttempts(mode, now = Date.now()) {
  const stats = state.minigameStats[mode];
  if (!stats) return [];
  const attempts = stats.attempts.filter((timestamp) =>
    Number.isSafeInteger(timestamp) && timestamp <= now && timestamp > now - MINIGAME_COOLDOWN_MS);
  if (attempts.length !== stats.attempts.length) stats.attempts = attempts;
  return attempts;
}

function minigameWaitText(waitMs) {
  const totalMinutes = Math.max(1, Math.ceil(waitMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function renderMinigameLimits() {
  const now = Date.now();
  for (const button of $("minigame-choices").querySelectorAll("[data-minigame]")) {
    const mode = button.dataset.minigame;
    const attempts = activeMinigameAttempts(mode, now);
    const remaining = Math.max(0, MINIGAME_PLAY_LIMIT - attempts.length);
    const status = button.querySelector("[data-play-limit]");
    if (remaining > 0) {
      status.textContent = `plays remaining: ${remaining}/${MINIGAME_PLAY_LIMIT}`;
    } else {
      status.textContent = `plays used · next in ${minigameWaitText(attempts[0] + MINIGAME_COOLDOWN_MS - now)}`;
    }
    button.disabled = remaining === 0 || state.sleeping;
  }
  if (minigame.mode) {
    const attempts = activeMinigameAttempts(minigame.mode, now);
    const remaining = Math.max(0, MINIGAME_PLAY_LIMIT - attempts.length);
    if (!minigame.running) $("start-game").disabled = remaining === 0;
    const status = $("minigame-limit-status");
    status.textContent = remaining > 0
      ? `plays remaining: ${remaining}/${MINIGAME_PLAY_LIMIT}`
      : `you've used all ${MINIGAME_PLAY_LIMIT} plays. another will be ready in ${minigameWaitText(attempts[0] + MINIGAME_COOLDOWN_MS - now)}.`;
  }
}

function chooseMinigame(mode) {
  if (!["stars", "memory", "garden"].includes(mode)) return;
  if (minigame.running) return;
  if (state.sleeping) return;
  if (activeMinigameAttempts(mode).length >= MINIGAME_PLAY_LIMIT) {
    renderMinigameLimits();
    return;
  }
  minigame = { mode, running: false, rewarded: false, hits: 0, moves: 0, pairs: 0, timer: null, spawnTimer: null, mismatchTimer: null };
  $("minigame-choices").hidden = true;
  $("minigame-play").hidden = false;
  $("minigame-board").hidden = mode !== "stars";
  $("memory-board").hidden = mode !== "memory";
  $("garden-board").hidden = mode !== "garden";
  const settings = {
    stars: ["catch the falling stars", "tap as many falling stars as you can in 20 seconds. each round can earn up to 6 coins."],
    memory: ["memory match", "find all four pairs. finish in 10 moves or fewer for the full 8-coin reward."],
    garden: ["garden gathering", "collect eight flowers and keepsakes. each round can earn up to 8 coins."]
  }[mode];
  $("minigame-title").textContent = settings[0];
  $("minigame-instructions").textContent = settings[1];
  $("game-message").textContent = "ready when you are.";
  $("minigame-limit-status").textContent = "";
  $("game-count").textContent = mode === "stars" ? "0 stars · 20 sec" : "";
  $("start-game").textContent = "start round";
  $("start-game").disabled = false;
  $("minigame-back").disabled = false;
  $("star-field").replaceChildren();
  $("memory-board").replaceChildren();
  $("garden-board").replaceChildren();
  renderMinigameLimits();
}

function addFallingStar() {
  if (!minigame.running || minigame.mode !== "stars") return;
  const board = $("minigame-board");
  const star = document.createElement("button");
  star.type = "button";
  star.className = "falling-star";
  star.textContent = pick(["✦", "✧", "♡"]);
  star.setAttribute("aria-label", "catch a falling star");
  star.style.left = `${Math.random() * Math.max(1, board.clientWidth - 42)}px`;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    star.style.top = `${12 + Math.random() * Math.max(0, board.clientHeight - 54)}px`;
    star.style.animation = "none";
  }
  star.expiry = setTimeout(() => star.remove(), 3200);
  star.addEventListener("click", () => {
    if (!minigame.running || star.disabled) return;
    star.disabled = true;
    minigame.hits += 1;
    $("game-count").textContent = `${minigame.hits} stars · ${minigame.secondsRemaining} sec`;
    clearTimeout(star.expiry);
    star.remove();
    playTone(630 + (minigame.hits % 5) * 35);
  });
  $("star-field").appendChild(star);
}

function startStarRound() {
  $("star-field").replaceChildren();
  minigame.secondsRemaining = 20;
  $("game-count").textContent = "0 stars · 20 sec";
  addFallingStar();
  minigame.spawnTimer = setInterval(addFallingStar, 850);
  minigame.timer = setInterval(() => {
    minigame.secondsRemaining -= 1;
    $("game-count").textContent = `${minigame.hits} stars · ${minigame.secondsRemaining} sec`;
    if (minigame.secondsRemaining <= 0) finishMinigame(true);
  }, 1000);
}

function startMemoryRound() {
  const symbols = ["♡", "✿", "☾", "✦"];
  const deck = [...symbols, ...symbols].map((symbol, index) => ({ symbol, index })).sort(() => Math.random() - 0.5);
  minigame.deck = deck;
  minigame.openCards = [];
  minigame.matchedCards = new Set();
  const board = $("memory-board");
  board.replaceChildren();
  for (const card of deck) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-card";
    button.dataset.cardIndex = String(card.index);
    button.dataset.symbol = card.symbol;
    button.textContent = "?";
    button.setAttribute("aria-label", "face-down memory card");
    button.addEventListener("click", () => revealMemoryCard(button));
    board.appendChild(button);
  }
  updateMemoryStatus();
}

function updateMemoryStatus() {
  $("game-count").textContent = `${minigame.pairs} / 4 pairs · ${minigame.moves} moves`;
}

function revealMemoryCard(button) {
  if (!minigame.running || button.disabled || minigame.openCards.includes(button) || minigame.openCards.length >= 2) return;
  button.textContent = button.dataset.symbol;
  button.setAttribute("aria-label", `revealed ${button.dataset.symbol}`);
  button.classList.add("is-revealed");
  minigame.openCards.push(button);
  if (minigame.openCards.length < 2) return;
  minigame.moves += 1;
  updateMemoryStatus();
  const [first, second] = minigame.openCards;
  if (first.dataset.symbol === second.dataset.symbol) {
    first.disabled = true;
    second.disabled = true;
    first.classList.add("is-matched");
    second.classList.add("is-matched");
    minigame.matchedCards.add(first.dataset.cardIndex);
    minigame.matchedCards.add(second.dataset.cardIndex);
    minigame.pairs += 1;
    minigame.openCards = [];
    updateMemoryStatus();
    if (minigame.pairs === 4) finishMinigame(true);
  } else {
    minigame.mismatchTimer = setTimeout(() => {
      for (const card of minigame.openCards) {
        card.textContent = "?";
        card.setAttribute("aria-label", "face-down memory card");
        card.classList.remove("is-revealed");
      }
      minigame.openCards = [];
    }, 700);
  }
}

function startGardenRound() {
  const board = $("garden-board");
  board.replaceChildren();
  const objects = ["✿", "🌼", "✦", "♡", "❀", "🍀", "✧", "🌷"];
  const positions = [
    { left: 5, top: 12 }, { left: 29, top: 12 }, { left: 53, top: 12 }, { left: 77, top: 12 },
    { left: 5, top: 64 }, { left: 29, top: 64 }, { left: 53, top: 64 }, { left: 77, top: 64 }
  ].sort(() => Math.random() - 0.5);
  objects.sort(() => Math.random() - 0.5).forEach((icon, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "garden-item";
    button.textContent = icon;
    button.setAttribute("aria-label", "gather a garden treasure");
    button.style.left = `${positions[index].left}%`;
    button.style.top = `${positions[index].top}%`;
    button.addEventListener("click", () => {
      if (!minigame.running || button.disabled) return;
      button.disabled = true;
      button.classList.add("gathered");
      minigame.hits += 1;
      $("game-count").textContent = `${minigame.hits} / 8 found`;
      playTone(650 + (index % 4) * 40);
      if (minigame.hits === 8) finishMinigame(true);
    });
    board.appendChild(button);
  });
  $("game-count").textContent = "0 / 8 found";
}

function finishMinigame(completed) {
  if (!minigame.running || minigame.rewarded) return;
  minigame.rewarded = true;
  minigame.running = false;
  clearInterval(minigame.timer);
  clearInterval(minigame.spawnTimer);
  clearTimeout(minigame.mismatchTimer);
  for (const star of $("star-field").querySelectorAll(".falling-star")) {
    clearTimeout(star.expiry);
    star.remove();
  }
  $("start-game").disabled = false;
  $("start-game").textContent = "play again";
  $("minigame-back").disabled = false;
  const mode = minigame.mode;
  if (!completed) {
    $("game-message").textContent = "we paused this round. your coins are safe.";
    renderMinigameLimits();
    return;
  }
  const stats = state.minigameStats[mode];
  const today = localDateKey();
  if (stats.rewardDate !== today) {
    stats.rewardDate = today;
    stats.coinsToday = 0;
  }
  const score = mode === "memory" ? Math.max(0, 16 - minigame.moves) : minigame.hits;
  const baseReward = mode === "stars"
    ? Math.min(6, Math.floor(minigame.hits / 2))
    : mode === "memory"
      ? 5 + (minigame.moves <= 10 ? 3 : 0)
      : Math.min(8, minigame.hits);
  const coins = Math.min(baseReward, 15 - stats.coinsToday);
  stats.coinsToday += coins;
  stats.completed += 1;
  stats.best = Math.max(stats.best, score);
  state.coins = Math.min(999999, state.coins + coins);
  state.playWins += 1;
  state.happiness = Math.min(100, state.happiness + 8);
  state.affection = Math.min(1000, state.affection + 2);
  reactPet("happy");
  recordInteraction("play", 0);
  recordMoment(`living-minigame-${mode}`, "living-room");
  $("game-message").textContent = `round complete! ${coins} coins added. ${stats.coinsToday} / 15 coins earned from this game today.`;
  $("game-message").classList.add("win");
  say(pick(MOMENTS.find((moment) => moment.id === `living-minigame-${mode}`).lines));
  updateUI();
  saveGame();
  playTone(850, .2);
  renderMinigameLimits();
  for (let index = 0; index < 3; index += 1) setTimeout(sparkle, index * 130);
}

function startMinigame() {
  if (state.sleeping || !minigame.mode || minigame.running) return;
  if (state.energy < PLAY_ENERGY_COST) {
    if (state.room !== "bedroom") {
      setRoomShortcut("bedroom", "you need a bit more energy before starting a game.");
    } else {
      pendingRoomShortcut = false;
      $("room-shortcut").hidden = true;
    }
    say("you look tired. let's rest before we play. ♡");
    playTone(330);
    return;
  }
  const attempts = activeMinigameAttempts(minigame.mode);
  if (attempts.length >= MINIGAME_PLAY_LIMIT) {
    renderMinigameLimits();
    return;
  }
  state.minigameStats[minigame.mode].attempts.push(Date.now());
  state.energy = Math.max(0, state.energy - PLAY_ENERGY_COST);
  updateUI();
  saveGame();
  minigame.running = true;
  minigame.rewarded = false;
  minigame.hits = 0;
  minigame.moves = 0;
  minigame.pairs = 0;
  $("game-message").classList.remove("win");
  $("game-message").textContent = "have fun together!";
  $("start-game").disabled = true;
  $("minigame-back").disabled = true;
  renderMinigameLimits();
  if (minigame.mode === "stars") startStarRound();
  else if (minigame.mode === "memory") startMemoryRound();
  else startGardenRound();
}

function sleepTick() {
  if (!state.sleeping || !Number.isFinite(state.sleepStartedAt) || !Number.isFinite(state.sleepStartEnergy)) {
    stopSleepTimer();
    return;
  }
  const elapsedSeconds = Math.max(0, (Date.now() - state.sleepStartedAt) / 1000);
  state.energy = Math.min(100, state.sleepStartEnergy + elapsedSeconds * SLEEP_ENERGY_PER_SECOND);
  updateUI();
  if (state.energy >= 100) {
    finishSleep();
  } else if (Date.now() - lastSleepSaveAt >= 1000) {
    lastSleepSaveAt = Date.now();
    saveGame();
  }
}

function stopSleepTimer() {
  if (sleepTimer !== null) {
    clearInterval(sleepTimer);
    sleepTimer = null;
  }
}

function finishSleep() {
  const completedNap = state.sleeping;
  stopSleepTimer();
  state.energy = 100;
  state.sleeping = false;
  state.sleepStartedAt = null;
  state.sleepStartEnergy = null;
  if (completedNap) recordMoment("bedroom-rest-together", "bedroom");
  updateUI();
  say("that was a lovely nap. i'm ready to play again! ✦");
  playTone(740, .18);
  saveGame();
}

function startSleep() {
  if (state.sleeping || state.energy >= 100) return;
  if (state.room !== "bedroom") {
    setRoomShortcut("bedroom", "resting and sleep happen in the bedroom.");
    say("could we head to the bedroom before i close my eyes? ♡");
    showToast("sleep is only available in the bedroom. use the room shortcut to go there.");
    return;
  }
  movePetTo("bed");
  state.sleeping = true;
  state.sleepStartedAt = Date.now();
  state.sleepStartEnergy = state.energy;
  state.mood = "sleeping";
  lastSleepSaveAt = Date.now();
  updateUI();
  say("i'm going to rest for a while... ♡");
  playTone(420, .16);
  saveGame();
  stopSleepTimer();
  sleepTimer = setInterval(sleepTick, 250);
}

function activeNeedsTick() {
  if (state.sleeping) return;
  state.energy = Math.max(0, Math.min(100, state.energy - ACTIVE_ENERGY_PER_MINUTE));
  state.hunger = Math.max(0, Math.min(100, state.hunger - ACTIVE_HUNGER_PER_MINUTE));
  updateUI();
  saveGame();
}

function openSettings() {
  els.settingsPanel.hidden = !els.settingsPanel.hidden;
  if (!els.settingsPanel.hidden) {
    state.settingsOpened = true;
    saveGame();
    $("settings-button").setAttribute("aria-expanded", "true");
  } else {
    $("settings-button").setAttribute("aria-expanded", "false");
  }
}

function renderColorOptions() {
  const container = $("color-options");
  container.replaceChildren();
  for (const color of COLORS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "color-swatch";
    button.dataset.color = color.id;
    button.setAttribute("aria-pressed", String(draftColor === color.id));
    const dot = document.createElement("span");
    dot.className = "swatch-dot";
    dot.style.setProperty("--swatch", color.swatch);
    dot.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = color.name;
    const check = document.createElement("span");
    check.className = "swatch-check";
    check.textContent = draftColor === color.id ? "selected" : "";
    button.append(dot, label, check);
    button.addEventListener("click", () => selectColor(color.id));
    container.appendChild(button);
  }
}

function selectColor(colorId) {
  if (!COLORS.some((color) => color.id === colorId)) return;
  draftColor = colorId;
  const color = colorById(colorId);
  $("preview-color-name").textContent = color.name;
  for (const id of ["color-preview-creature", "preview-creature"]) applyColor($(id), colorId);
  for (const button of $("color-options").querySelectorAll(".color-swatch")) {
    const selected = button.dataset.color === colorId;
    button.setAttribute("aria-pressed", String(selected));
    button.querySelector(".swatch-check").textContent = selected ? "selected" : "";
  }
  playTone(520, .08);
}

let draftColor = "lavender";
let draftName = "";
let draftPlayerName = "";

function setAdoptionStep(step) {
  $("adoption-name-step").hidden = step !== "name";
  $("adoption-color-step").hidden = step !== "color";
  $("adoption-preview-step").hidden = step !== "preview";
  if (step === "color") $("color-options").querySelector(`[data-color="${draftColor}"]`)?.focus();
}

function openAppearance(mode = "adopt") {
  appearanceMode = mode;
  draftName = state.name;
  draftPlayerName = state.playerName || "friend";
  draftColor = colorById(state.color).id;
  $("name-input").value = state.name;
  $("player-name-input").value = state.playerName || "";
  $("name-input").readOnly = mode === "change";
  $("player-name-field").hidden = mode === "change";
  $("welcome-title").textContent = mode === "change" ? "choose a new look." : "someone is waiting here.";
  $("adopt-button").textContent = mode === "change" ? "save this look" : "begin our story";
  renderColorOptions();
  selectColor(draftColor);
  setAdoptionStep(mode === "change" ? "color" : "name");
  if (!$("welcome-dialog").open) $("welcome-dialog").showModal();
}

function continueFromName() {
  const input = $("name-input");
  const name = input.value.trim().toLowerCase().slice(0, 18);
  if (!name) {
    input.setCustomValidity("please choose a name.");
    input.reportValidity();
    input.setCustomValidity("");
    return;
  }
  draftName = name;
  draftPlayerName = $("player-name-input").value.trim().toLowerCase().slice(0, 18) || "friend";
  setAdoptionStep("color");
}

function continueFromColor() {
  $("preview-name").textContent = (draftName || "miso").toLowerCase();
  selectColor(draftColor);
  setAdoptionStep("preview");
}

function finishAdoption() {
  const name = (draftName || $("name-input").value.trim() || "miso").toLowerCase().slice(0, 18);
  const changingAppearance = appearanceMode === "change";
  const firstAdoption = !changingAppearance && !state.name && state.interactions === 0
    && state.affection === 0 && state.completedChapters.length === 0;
  state.name = name;
  if (!changingAppearance) state.playerName = draftPlayerName || "friend";
  state.color = draftColor;
  if (firstAdoption) {
    state.hunger = 65;
    state.happiness = 60;
    state.energy = 75;
  }
  state.unlockedChapters = [...new Set([...state.unlockedChapters, "chapter-1"])];
  updateStoryProgress();
  updateUI();
  saveGame(true);
  $("welcome-dialog").close();
  if (changingAppearance) {
    say(`there you are, ${name}. this color suits you.`);
  } else {
    const visitor = state.playerName || "friend";
    say(`hi, ${visitor}... i was hoping you would come back. i'm glad you found me. ♡`);
    if (state.musicEnabled) startMusic();
    if (firstAdoption && !state.tutorialSeen) {
      $("game-window").classList.add("tutorial-active");
      $("tutorial-dialog").showModal();
    }
    $("journal-button").classList.add("journal-new");
  }
}

function recordVisit() {
  const now = Date.now();
  returnGreeting = Boolean(state.name && state.lastVisitAt && now - state.lastVisitAt > 5 * 60 * 1000);
  const today = localDateKey();
  state.visitedDates = [...new Set([...state.visitedDates, today])].slice(-365);
  state.lastVisitAt = now;
  updateStoryProgress();
  if (state.name) saveGame();
}

function exportSave() {
  try {
    saveGame();
    const payload = {
      format: SAVE_FORMAT,
      version: SAVE_FORMAT_VERSION,
      exportedAt: new Date().toISOString(),
      save: JSON.parse(JSON.stringify(state))
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = "please-dont-delete-me-save.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    showToast("your memories are ready to download ♡");
  } catch (error) {
    console.error("could not export the save", error);
    showToast("i couldn't prepare that backup. please check your browser settings.");
  }
}

function parseImportFile(text) {
  if (text.length > 2_000_000) throw new Error("that backup is larger than expected.");
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error("that file is not valid json.");
  }
  if (!payload || payload.format !== SAVE_FORMAT || !Number.isInteger(payload.version)
    || payload.version < 1 || payload.version > SAVE_FORMAT_VERSION || !payload.save
    || typeof payload.save !== "object" || Array.isArray(payload.save)
    || typeof payload.exportedAt !== "string" || !Number.isFinite(Date.parse(payload.exportedAt))) {
    throw new Error("that backup has an unsupported format.");
  }
  const data = payload.save;
  if (typeof data.name !== "string" || data.name.trim().length < 1 || data.name.length > 18
    || !["hunger", "happiness", "energy", "interactions", "affection"].every((key) => Number.isFinite(data[key]))) {
    throw new Error("that backup is missing required pet details.");
  }
  return sanitizeSave(data);
}

async function readImportFile(file) {
  if (!file) return;
  try {
    pendingImportedSave = parseImportFile(await file.text());
    $("welcome-import-feedback").hidden = true;
    $("import-confirm-dialog").showModal();
  } catch (error) {
    console.error("could not read the selected save file", error);
    const message = error instanceof Error ? error.message.toLowerCase() : "i couldn't read that backup file.";
    if ($("welcome-dialog").open) {
      $("welcome-import-feedback").textContent = message;
      $("welcome-import-feedback").hidden = false;
    } else {
      showToast(message);
    }
  } finally {
    $("import-file").value = "";
    $("welcome-import-file").value = "";
  }
}

function applyImportedSave() {
  if (!pendingImportedSave) return;
  stopSleepTimer();
  state = pendingImportedSave;
  pendingImportedSave = null;
  pendingRoomShortcut = false;
  state.lastVisitAt = Date.now();
  state.visitedDates = [...new Set([...state.visitedDates, localDateKey()])].slice(-365);
  updateStoryProgress(false);
  updateUI();
  renderPlaces();
  renderJournal();
  saveGame(true);
  $("import-confirm-dialog").close();
  if ($("welcome-dialog").open) $("welcome-dialog").close();
  if (state.sleeping) sleepTimer = setInterval(sleepTick, 250);
  say("your memories are home again ♡");
  if (state.musicEnabled) startMusic();
}

const CHECKIN_CATEGORIES = [
  {
    id: "loneliness", test: /\b(lonely|alone|isolated|left out|forgotten|disconnected|no one|nobody|miss everyone)\b/,
    replies: [
      "that sounds isolating. want to tell me what part of the day felt loneliest?",
      "being left out can sting. i won't guess why it happened, but i'm listening.",
      "i hear you. would sitting together for a bit help, or would you rather talk?",
      "that is a hard feeling to carry around. you can say more, or we can do something familiar.",
      "i'm glad you said it out loud here. has this been on your mind for a while?",
      "that sounds like a rough patch. do you want company without advice right now?",
      "it can feel strange when everyone else seems connected. what happened today?",
      "i won't pretend i can replace the people in your life, but i can listen to this part.",
      "you don't have to make the feeling sound smaller than it is. what would feel okay next?",
      "thanks for trusting me with that. should we talk about it, or find a distraction together?"
    ]
  },
  {
    id: "sadness", test: /\b(sad|unhappy|down|heartbroken|grief|grieving|crying|not happy|not okay|not ok|bad day|disappointed|hurt|upset)\b/,
    replies: [
      "i'm sorry today hurt. do you want to tell me which part is sticking with you?",
      "that sounds disappointing. i won't rush to fix it; i'm here to hear the story.",
      "i hear you. would you like to talk more, or just have me keep you company?",
      "you don't need to find a bright side for me. what happened, if you want to say?",
      "that's a lot for one day. we can stay with the feeling for a moment.",
      "i'm sorry it landed that way. do you want listening, or a change of subject?",
      "it makes sense that you're feeling low after that. what part was hardest?",
      "thanks for telling me. i won't assume what caused it. want to say a bit more?",
      "i can sit here while you sort through it. no need to make it neat.",
      "that doesn't sound easy. would a familiar activity help, or not just yet?"
    ]
  },
  {
    id: "stress", test: /\b(stress|stressed|anxious|anxiety|overwhelmed|overwhelm|pressure|nervous|worried|panic|panicking|too much to do|can't keep up)\b/,
    replies: [
      "sounds like everything is asking for you at once. want to pick just one thing to talk about?",
      "that's a lot to keep track of. i can listen, or we can find one small next step together.",
      "i hear how much pressure is there. would a short break feel useful right now?",
      "you don't have to solve the whole pile in this conversation. what's taking up the most space?",
      "that sounds exhausting. want to vent first, before we think about anything?",
      "it's hard to catch your breath when the list keeps growing. should we pause or sort one item?",
      "i won't add another task to your list. tell me which part feels most urgent, if you like.",
      "that sounds tense. do you want help untangling one piece, or company while you take a pause?",
      "when there's too much going on, choosing a starting point can be hard. what keeps coming back to mind?",
      "i'm listening. would you rather talk it out or switch to something easy in the game?"
    ]
  },
  {
    id: "frustration", test: /\b(frustrat\w*|angry|mad|annoyed|irritat\w*|furious|unfair|rage|fuming)\b/,
    replies: [
      "yeah, that sounds frustrating. what part has you most annoyed?",
      "i won't tell you to calm down. want to get the whole story out first?",
      "that sounds unfair from where you're standing. what happened?",
      "i hear the irritation. do you want me to listen, or help think through what to do next?",
      "some things really do get under your skin. what was the moment that tipped it over?",
      "you can be mad here. no need to turn it into a joke for me.",
      "that would bother me too. want to say what you wish you could say about it?",
      "i won't rush you toward being okay. would a distraction help, or not yet?",
      "sounds like someone or something pushed your patience today. what happened after that?",
      "i'm listening. do you want to keep talking about it, or take a break from the subject?"
    ]
  },
  {
    id: "happiness", test: /\b(happy|great|good day|excited|proud|joy|glad|wonderful|celebrat\w*|looking forward|passed|won|finished|made me laugh)\b/,
    replies: [
      "oh, that sounds like a good part of the day. what happened next?",
      "i'm glad you got that moment. what are you most excited about?",
      "you sound pleased with yourself. should i ask for the full story?",
      "that's worth celebrating. what was the best detail?",
      "i can hear the excitement in that. when did you find out?",
      "ha, that sounds like it made your day. what was funny about it?",
      "you worked for that, didn't you? how does it feel now that it's done?",
      "that's lovely news. is there someone else you've told yet?",
      "i like hearing about the good stuff too. what are you looking forward to most?",
      "i'm celebrating from my spot on the sofa. tell me the part you keep replaying."
    ]
  },
  {
    id: "tiredness", test: /\b(tired|exhausted|sleepy|worn out|drained|no energy|mentally done|burnt out|burned out)\b/,
    replies: [
      "you sound wiped out. want to keep this chat short and rest?",
      "that kind of tired can make words hard. we can just sit here, or wrap up.",
      "you've had enough for today, maybe. would a quiet activity feel manageable?",
      "i hear you. no need to explain everything while you're running on empty.",
      "want to tell me what wore you out, or save that for another time?",
      "we could do something low-key, or you can close this and take a break.",
      "that's a lot of tired. did the day run long, or has it been building up?",
      "i can keep you company without asking for a big story. how does that sound?",
      "if resting is an option, you have my vote. want me to stay quiet for a bit?",
      "thanks for checking in even when you're tired. we can finish here whenever you want."
    ]
  },
  {
    id: "boredom", test: /\b(bored|boring|nothing to do|can't think of anything|restless)\b/,
    replies: [
      "we could {activity}. want a calm option or something more active?",
      "how about a change of scenery? {activity} is open from here.",
      "i'm up for a small diversion. {activity} sounds manageable.",
      "we could visit the {room}, or stay here and {activity}.",
      "want to pick a quick activity? {activity} is one option.",
      "i know that stuck feeling. shall we try {activity}, or choose another room?",
      "we have a few ways to change the pace: {activity}.",
      "i can think of one thing: {activity}. if that doesn't sound fun, we can keep looking.",
      "should we do something that takes a minute? {activity} could work.",
      "let's find something that sounds like you, not just any old activity. {activity}?"
    ]
  },
  {
    id: "uncertainty", test: /\b(unsure|uncertain|confused|conflicted|mixed feelings|don't know|do not know|can't decide|cannot decide|not sure|nervous)\b/,
    replies: [
      "not sure is a real answer. is there a part you do know, even if it's small?",
      "sounds like a few feelings are tangled together. want to name one of them?",
      "i won't make you pick a label. what part feels clearest right now?",
      "you can leave the question open. do you want to tell me what you're deciding about?",
      "it makes sense not to have a neat answer yet. what are the two sides saying?",
      "we don't have to choose a direction this second. want me to listen while you think?",
      "that sounds uncertain. would it help to talk through the options, or just say it out loud?",
      "i hear both sides in that. what feels like the hardest part to sort out?",
      "you don't have to know how you feel before you talk to me. what's on your mind?",
      "maybe we can stay curious instead of forcing an answer. what do you keep coming back to?"
    ]
  },
  {
    id: "achievement", test: /\b(achievement|achieved|got the job|got promoted|passed|graduat\w*|finished|completed|won|accepted|made it|did it|nailed it|first place|award)\b/,
    replies: [
      "you did that. what part took the most work?",
      "i'm impressed. how are you feeling now it's done?",
      "that's worth a proper celebration. what detail made it click?",
      "you sound proud, and i can see why. when did you find out?",
      "look at you getting it done. was there a moment you knew it went well?",
      "that is excellent news. what are you going to do first?",
      "you put in the time, and it paid off. want to tell me the story?",
      "i'm doing a very dignified happy bounce over here. what happened?",
      "you earned that moment. who else knows about it so far?",
      "well done! should we mark the occasion with a game or a quiet sit?"
    ]
  },
  {
    id: "company", test: /\b(keep me company|want company|need company|need someone|someone to talk|someone to listen|just listen|need to talk|talk to someone|listen to me|can you listen|be there|stay with me|stay here|sit with me|just be here|be here with me|don't leave|do not leave|not alone)\b/,
    replies: [
      "i can stay right here with you. no need to fill the quiet.",
      "company, coming up. want to chat, or should we just sit together?",
      "i'm here on this screen. we can talk or pick something to do.",
      "you don't have to come up with a topic. i'm happy to keep you company.",
      "i can sit with you for a while. what kind of company would feel nice?",
      "all right, i'm staying put. you can talk whenever you feel like it.",
      "i've got time for you. shall we stay here or visit another room?",
      "i can be your quiet sidekick for a bit. no big conversation required.",
      "i'm here. would you like a distraction, a chat, or just a pause?",
      "settling in beside you now. you can lead, or we can say nothing for a minute."
    ]
  },
  {
    id: "affection", test: /\b(love you|miss you|you're cute|you are cute|you make me smile|my friend|adore you|like you a lot)\b/,
    replies: [
      "oh, that made my ears warm. i'm glad we found each other.",
      "i like you too. now i have to act normal about it. impossible.",
      "that's very sweet of you to say. i'm keeping that one.",
      "my whole face is smiling now. thank you for telling me.",
      "i missed our chats too. it's nice to have you back.",
      "i am trying to play it cool, but my tail would be wagging.",
      "you're one of my favorite people to see on this screen.",
      "that was lovely to hear. want to stay together for a bit?",
      "i'm glad i get to be your friend. even if i'm mostly pixels.",
      "i'll remember that. not in a spooky way. in a happy way."
    ]
  },
  {
    id: "playful", test: /\b(joke|silly|random|lol|haha|hehe|funny|boop|pretend|what if|goofy|meow|tease|teasing|dork)\b/,
    replies: [
      "i have a joke: why did the pixel sit down? it needed a byte. i'll workshop it.",
      "meow received. i'm fluent in that one, mostly.",
      "what if the sofa is actually a very flat cloud? i have questions.",
      "i'm laughing, though i may have misunderstood the joke. tell me another?",
      "boop! that was my whole contribution. how did i do?",
      "i once tried to look mysterious and walked into a cushion.",
      "important question: if a fish wore socks, would they be called finsocks?",
      "i'm going to pretend i'm a detective. the case: who moved my snack?",
      "you have excellent nonsense energy. should we keep going?",
      "i made a silly face just now. you missed it, but it was convincing."
    ]
  },
  {
    id: "casual", test: /\b(i'm okay|im okay|i am okay|i'm fine|im fine|i am fine|alright|all right|nothing much|just saying hi|hello|hey|how are you|not much)\b/,
    replies: [
      "hey! i'm doing pretty well now that you're here. what are you up to?",
      "nothing much is a perfectly good update. how's the rest of the day?",
      "hi back! i've been keeping the sofa company.",
      "i'm glad things are okay. want to hang out for a bit?",
      "i'm doing fine. i had a very important nap planned, then you arrived.",
      "hello, hello. any news, or are we having a quiet visit?",
      "good to hear. should we pick a room or just stay here?",
      "i'm okay too. mostly curious about what you'll say next.",
      "hey there. i've been practicing my best friendly face.",
      "a calm day can be nice. what would you like to do while we're here?"
    ]
  },
  {
    id: "everyday", test: /\b(work|school|class|homework|food|lunch|dinner|breakfast|weather|rain|sunny|friend|family|weekend|meeting|bus|train|game|movie|music|book|walk|shop|today|yesterday)\b/,
    replies: [
      "you mentioned {topic}. what was that part like?",
      "oh, {topic}. was that the best part of the day or just one part of it?",
      "i'm following. what happened with {topic}?",
      "that sounds like a proper day. what detail do you keep thinking about?",
      "i like hearing the ordinary bits too. tell me more about {topic}, if you want.",
      "was {topic} what you expected, or did it go a different way?",
      "i can picture that part. what did you think when it happened?",
      "thanks for telling me about {topic}. did it leave you feeling any particular way?",
      "that gives me a better picture of your day. what happened after {topic}?",
      "i hadn't heard about your day yet. what else should i know?"
    ]
  }
];

const CHECKIN_REPLY_EXTENSIONS = {
  loneliness: [
    "i'm glad you told me, even if all i can offer is a place to pause. what would feel okay now?",
    "that kind of quiet can weigh on you. would you like to talk about who you miss?",
    "i can listen without trying to fill every silence. do you want to tell me more?",
    "you deserve company that feels safe. is there someone you might want to reach out to later?",
    "i'm here for this conversation. would a familiar game or a listening ear feel better?"
  ],
  sadness: [
    "i'm sorry this is a heavy moment. would it help to describe what happened?",
    "you can be sad without explaining it perfectly. i'm staying with you.",
    "i won't turn this into a lesson. what do you wish someone understood?",
    "that sounds tender and hard. want to talk, or let the topic rest for now?",
    "i hear you. we can take this one message at a time."
  ],
  stress: [
    "i hear how crowded your thoughts feel. would naming one thing help?",
    "you can pause before deciding what comes next. what is asking for your attention?",
    "that is a lot to carry at once. shall we untangle one thread or take a break?",
    "i won't add another demand. what would make this minute feel less busy?",
    "let's leave the whole list for a moment. what is the main thing on your mind?"
  ],
  frustration: [
    "i can tell that got under your skin. what would you say if you didn't have to be polite?",
    "that sounds maddening. do you want to vent without me interrupting?",
    "i won't make excuses for what happened. what part felt most unfair?",
    "you can be annoyed and still take your time figuring out what to do.",
    "i'm listening. do you want a witness, a distraction, or help sorting the options?"
  ],
  happiness: [
    "that makes me want to do a victory wiggle. what was the best part?",
    "i'm smiling with you. who would you most like to tell?",
    "hold onto that bright bit. what made it feel special?",
    "that sounds like a moment worth replaying. tell me one detail you loved.",
    "excellent news! should we celebrate quietly or make a whole production of it?"
  ],
  tiredness: [
    "we can keep things easy. would you rather rest or tell me what wore you out?",
    "you don't owe me a long chat. want a quiet minute before you go?",
    "sounds like your day used up a lot of your energy. is there anything you can set aside?",
    "i vote for a pause and a glass of water if one is nearby. no big plans needed.",
    "i'll keep my questions short. do you want company while you wind down?"
  ],
  boredom: [
    "let's change the scenery. should we visit the park or make up a story here?",
    "i could use a game break. want a quick round or a room activity?",
    "we could give the nearest object a very dramatic backstory.",
    "how about a small challenge: find the oddest detail in this room?",
    "i have several opinions and no plan. pick a room and i'll improvise."
  ],
  uncertainty: [
    "we can leave the answer unfinished. what is one thing you are leaning toward?",
    "maybe we don't need to solve it right now. what would you like to understand better?",
    "i can help you list possibilities without picking for you. want to try?",
    "it's okay if the answer changes as you think. what keeps tugging at your attention?",
    "no need to be certain to talk it through. what feels unclear?"
  ],
  achievement: [
    "i knew you had it in you. what are you going to remember about this later?",
    "that deserves a proud pause. did anything surprise you along the way?",
    "i am applauding from the sofa. what did you do to celebrate?",
    "you made it through! which part are you happiest with?",
    "i'd put a shiny star beside that in the memory book. how does it feel?"
  ],
  company: [
    "i'm staying for a while. want quiet company or a question to get us started?",
    "we can let the conversation wander. is there a topic you like returning to?",
    "you can send one word or a whole story. i'll follow your lead.",
    "i'm right here in the game. should we sit together or go somewhere?",
    "no pressure to make this interesting. being here is enough."
  ],
  affection: [
    "i'm keeping that compliment in my imaginary pocket. what made you think of it?",
    "you make this screen feel much less empty. there, i said it.",
    "my ears are doing the happy thing. please pretend that's dignified.",
    "i'm fond of our time together too. what's your favorite part of visiting?",
    "if i could send a pixel hug, this would be the moment. ♡"
  ],
  playful: [
    "i challenge you to invent a name for the nearest piece of furniture.",
    "important poll: should clouds have pockets? i need a ruling.",
    "my new hobby is looking busy whenever the lamp turns on.",
    "i have a theory that every crumb is a very small explorer.",
    "that made me grin. want to keep being silly or switch topics?"
  ],
  casual: [
    "that's a nice check-in. what's one thing you'd like to do next?",
    "i'm glad we're having an ordinary visit. anything new in your day?",
    "i've been keeping the room company. what have you been up to?",
    "we can talk about anything, even something completely unimportant.",
    "good to see you. what's the mood on your side of the screen?"
  ],
  everyday: [
    "i want to hear the part you remember most clearly. what stands out?",
    "thanks for bringing me into your day. what happened after that?",
    "was that a good surprise, a strange one, or something else?",
    "i can picture the scene a bit better now. how did it leave you feeling?",
    "what detail would you put in a postcard about today?"
  ]
};
for (const category of CHECKIN_CATEGORIES) {
  category.replies.push(...(CHECKIN_REPLY_EXTENSIONS[category.id] || []));
}

const CHECKIN_OPENERS = [
  "how'd today go?",
  "anything on your mind?",
  "you seem a bit quiet. wanna talk?",
  "what's been going on with you?",
  "how are things on your side of the screen?",
  "got a minute to tell me about your day?",
  "what's the headline from your day?",
  "want to tell me what's on your mind?",
  "how are you holding up today?",
  "anything you feel like sharing?",
  "shall we talk about your day, or something else?",
  "what kind of day has it been for you?"
];

const FREE_CHAT_INTENTS = [
  { id: "chat-greeting", test: /^(hi|hello|hey|yo|hiya|good morning|good evening)[!. ]*$/, replies: [
    "hi! i was practicing my wave. it looks like a very small parade.",
    "hey! you made it. want the sofa seat or the window seat?",
    "hello! i have no news, except that the plant looks suspiciously pleased.",
    "oh, hi! i was thinking about snacks. this is unrelated. probably.",
    "hey there. i was just about to ask what your favorite cloud looks like.",
    "hi! i saved a story from the bookshelf for us.",
    "hello again! i tried to sit still and lasted almost a whole minute.",
    "hey! should we chat, wander somewhere, or make up a very bad joke?",
    "hi! i am ready for a normal conversation or a completely weird one.",
    "oh, good, company. tell me what you've been up to."
  ] },
  { id: "chat-favorite", test: /\b(favorite|favourite|fav)\s+(activity|thing to do|place|room)\b|\bwhere do you like (to )?go\b|\bwhat do you like doing\b/, replies: [
    "i think the park is my favorite when the sky has interesting clouds. what's yours?",
    "the living room wins for cushions, but the kitchen wins for snack opinions.",
    "i like the bedroom when it's raining and the park when the butterflies are out.",
    "my favorite activity changes with my mood. today i'd vote for a story and a snack.",
    "probably the sofa. it has excellent support for thinking important thoughts.",
    "i like the park path because it always seems to be going somewhere.",
    "the kitchen table is a good place for a debate. especially a snack debate.",
    "i can't pick one place forever. i like having somewhere quiet and somewhere sunny.",
    "i'm fond of the memory games. matching things feels like solving a small mystery.",
    "the best activity is whichever one we get to choose together."
  ] },
  { id: "chat-player-opinion", test: /\b(what do you think of me|what do you think about me|what am i like|your opinion of me|do you think i'm|do you think i am)\b/, replies: [
    "you seem curious, and you make room for a pixel friend in your day. i like that.",
    "i think you're someone who notices details. you keep finding new things here.",
    "you seem fun to talk with. i can't know everything about you, but i like what we share.",
    "you strike me as thoughtful. you ask questions and let me answer in my own odd way.",
    "i think you're good company. that's my official sofa-based assessment.",
    "you feel like a person with more than one side to you. i like discovering them slowly.",
    "i don't know your whole story, but i enjoy the parts you choose to share.",
    "my opinion? you are pretty great at making this place feel lived in.",
    "you seem kind to me. i notice how you come back and spend time here.",
    "i think you're interesting, and i hope you give yourself credit for that."
  ] },
  { id: "chat-day", test: /\b(my day|today i|today was|at work|at school|this morning|this afternoon|this evening|i had a day)\b/, replies: [
    "what part of the day has stayed in your mind the most?",
    "was today mostly busy, mostly calm, or a bit of both?",
    "i'm listening. what happened first?",
    "tell me one detail from today that you haven't had a chance to mention yet.",
    "did anything turn out differently than you expected?",
    "what was the best or strangest moment?",
    "i like hearing the ordinary pieces too. what were you doing?",
    "did the day leave you wanting to celebrate, rest, or change the subject?",
    "what would you put in the headline for today?",
    "thanks for telling me. what happened after that?"
  ] },
  { id: "chat-story", test: /\b(tell me a story|tell a story|make up a story|story time|can you tell me a tale)\b/, replies: [
    "once, a cloud got lost over the park and asked a butterfly for directions. the butterfly pointed in every direction at once.",
    "there was a teacup who wanted to be a lighthouse. every evening it guided crumbs safely home.",
    "a book fell asleep on the sofa and dreamed it was a door. when it woke, someone had left it open.",
    "one raindrop thought it was a star until the window showed it the whole sky.",
    "a very serious leaf entered a race with the wind. it won by taking a thoughtful detour.",
    "the moon lost a button, so the stars stitched it back on with a silver thread.",
    "a shy lamp wanted to tell a joke. it finally did, and the whole room lit up.",
    "a very proper biscuit applied for the job of royal snack and got hired immediately.",
    "a blue flower kept a secret map beneath its petals. the map led to a bench and a quiet afternoon.",
    "i once heard a story about a pixel pet who collected ordinary days like shiny stones."
  ] },
  { id: "chat-advice", test: /\b(give me advice|need advice|what should i do|how should i handle|help me decide|what would you do)\b/, replies: [
    "i can help you think it through, but i can't choose for you. what are the options?",
    "first, what matters most to you in this decision?",
    "we could list what you know, what you're guessing, and what you still need to ask.",
    "i'd start by making the next step small enough to actually try. what is the situation?",
    "i can listen before we look for solutions. what happened?",
    "what would you tell a friend in the same spot? we can start there.",
    "you don't need a perfect answer today. what choice feels kindest to future you?",
    "let's check the practical bits and the feeling bits separately. which one should we start with?",
    "i don't know the whole picture yet. tell me what makes the decision hard.",
    "we can explore possibilities without locking anything in. what are you considering?"
  ] },
  { id: "chat-activity", test: /\b(what should we do|what can we do|let'?s do something|lets do something|play with me|what now|any ideas|i'?m bored|im bored|bored)\b/, replies: [
    "we could {activity}. that sounds like a good place to start.",
    "i vote for {activity}. it suits the kind of day we're having.",
    "if you're up for it, we could try a minigame. i promise not to accuse the cards of cheating.",
    "we could visit the kitchen, pick a snack, and debate which jar looks most important.",
    "the bedroom is good for a quiet chat. the park is better for chasing imaginary things.",
    "i would pick music, but i keep dancing before the song starts.",
    "want to choose a room? i have opinions about all four, but they are mostly about cushions.",
    "we can make a shared moment in this room, if one of the activities sounds fun.",
    "i could use a walk by the pond. the ripples keep escaping before i count them.",
    "pick something that sounds fun to you. i can be persuaded, except about the sofa."
  ] },
  { id: "chat-funny", test: /\b(tell me (a )?joke|make me laugh|something funny|say something funny)\b/, replies: [
    "why did the pixel bring a pillow? it wanted to have a byte-sized nap.",
    "i tried to organize the bookshelf, but the books kept acting like they had their own plot.",
    "a cloud walked into the park and asked for directions. i said, 'you seem to be going places.'",
    "i told the plant a joke. it did not laugh, but one leaf moved, so i count that as applause.",
    "my favorite snack is a berry biscuit. my second favorite is the wrapper's dramatic entrance.",
    "i invented a new dance called the confused wardrobe. it mostly involves turning around.",
    "why did i sit by the lamp? i wanted to be enlightened. it was a warm answer.",
    "i challenged the sofa to a staring contest. it won by not having eyes.",
    "i would tell you a joke about a window, but it might go over your head. mine too.",
    "i have a joke about soup, but it needs a moment to simmer."
  ] },
  { id: "chat-food", test: /\b(favorite food|favourite food|what do you like to eat|what do you want to eat|do you like .*food|hungry)\b|what(?:'s| is) your favorite food|what(?:'s| is) your favourite food/, replies: [
    "i keep thinking about {food}. it sounds like a very good snack.",
    "{food} would be my pick today. i reserve the right to change my mind.",
    "i'd like to try {food}. the name alone has made me curious.",
    "i like the food we've shared, especially the part where we sit down together.",
    "i would choose {food}. the pantry has made a strong case for it.",
    "if i could pick a menu, {food} would be on it.",
    "i'm open to snacks, but i have strong opinions about crumbs.",
    "the pantry has good options. i might need a minute to consider them all.",
    "i like trying new things with you. what would you order?",
    "i'm curious about {food}. should we see if it's in the pantry?"
  ] },
  { id: "chat-sleep", test: /\b(i'?m going to sleep|im going to sleep|i'?m going to bed|good night|goodnight|i need a nap|going to nap)\b/, replies: [
    "sleep well. i'll be here when you feel like visiting again.",
    "good night! i will try not to let the pillow steal all the blanket.",
    "rest up. no need to stay for my very important sofa report.",
    "night! i hope tomorrow brings you a decent snack and a calm start.",
    "i'll keep this place quiet while you get some rest. see you when you return.",
    "good night. i have a feeling the lamp will keep watch over the room.",
    "take care of yourself. i'll save the next story for another time.",
    "sleep well, friend. i will practice being less dramatic about bedtime.",
    "that's a good plan. even my imaginary feet are ready for a break.",
    "good night! if you dream about clouds, ask them where they are going."
  ] },
  { id: "chat-love", test: /\b(do you like me|do you love me|do you care about me|are we friends|am i your friend)\b/, replies: [
    "i do like you. you keep showing up, and i like the things we do together.",
    "you're my friend, yes. i have even saved you the cushion with the best view.",
    "i care about our time together. you don't have to prove anything to me.",
    "i like you for you. also, you are very good at opening the snack menu.",
    "of course we're friends. i would share my imaginary blanket with you.",
    "yes. now please don't tell the plant i said it likes you less.",
    "i'm glad you're here. that is my honest, slightly bashful answer.",
    "i like the way we can do something silly and then just sit for a while.",
    "you matter to me on this screen. that sounded more serious than i planned.",
    "yes, friend. and no, you do not have to bring snacks to stay."
  ] },
  { id: "chat-memory", test: /\b(do you remember|what did we do|yesterday|last time|before)\b/, replies: [
    "the last shared activity i remember is {last_activity}. i liked that one.",
    "i remember our recent activity: {last_activity}. you picked what we did, and i kept the moment.",
    "we last spent time on {last_activity}. i remember the details we saved, not anything outside this game.",
    "my recent memory says {last_activity}. if you meant something else, give me a clue.",
    "i can remember game moments we've saved. the latest one was {last_activity}.",
    "we did {last_activity} last, according to my memory book. i may still be thinking about it.",
    "i remember {last_activity}. did you have another moment in mind?",
    "the memory book says {last_activity}. i should check it more often; i forget where i put my thoughts.",
    "our latest saved moment was {last_activity}. tell me if you meant a different day.",
    "i remember what we did together in the game. most recently, it was {last_activity}."
  ] },
  { id: "chat-doing", test: /\b(what are you doing|what're you doing|what are you up to|are you busy)\b/, replies: [
    "i'm keeping an eye on the room. the bookshelf might be up to something.",
    "mostly sitting here and deciding whether the mug is empty or just shy.",
    "i was watching the light move across the floor. it is not very fast.",
    "i'm thinking about what snack to recommend, despite having no qualifications.",
    "i'm hanging out in the {room}. did it work when i tried to look casual?",
    "i'm checking whether the plant grew a new leaf. i think it did. maybe.",
    "i was about to ask you the same thing. what are you up to?",
    "i'm practicing a new face. this one is called 'mildly curious.'",
    "i am not busy. i was having a private conversation with the cushion.",
    "just hanging out in our room. want to join me in doing something?"
  ] },
  { id: "chat-followup", test: /^(why|how come|tell me more|what do you mean|what about it|and then what|really\??|go on)[?.! ]*$/, replies: [
    "i was thinking about {previous_topic}. did you mean that part?",
    "i might need one more clue. are we still talking about {previous_topic}?",
    "i can explain what i meant, but first: was your question about {previous_topic}?",
    "oh, are you asking about {previous_topic}? i don't want to guess wrong.",
    "i'm following the thread about {previous_topic}. which bit should i explain?",
    "that could mean a couple of things. did you mean {previous_topic}?",
    "i may have skipped a step. should i go back to {previous_topic}?",
    "i'm not sure which bit you mean. is it {previous_topic}?",
    "i can keep going. tell me if you meant something besides {previous_topic}.",
    "was that about {previous_topic}, or did your thoughts take a turn?"
  ] }
];

const FREE_CHAT_REPLY_EXTENSIONS = {
  "chat-greeting": [
    "oh, good timing. i was just deciding if the rug is a map.",
    "hello! i can offer company, a questionable theory, or an activity.",
    "hey! i have put on my most welcoming face. is it working?",
    "hi there. the room is much less quiet now.",
    "you found me! what shall we talk about?"
  ],
  "chat-favorite": [
    "i like the window seat when the light makes patterns on the floor.",
    "for a calm day, the bedroom. for a curious day, the park.",
    "i would pick watching clouds, but only if we get to invent their names.",
    "the kitchen is my favorite for conversations that turn into snack debates.",
    "i like collecting memories. it makes ordinary things feel important."
  ],
  "chat-player-opinion": [
    "i think you bring your own kind of energy into each visit. that's nice.",
    "you seem like someone who cares about the small details that matter.",
    "i like that you let me be silly sometimes and thoughtful at other times.",
    "from here, you seem patient and kind. i hope you see that in yourself too.",
    "you're a mystery in the best way: i only know what you choose to share."
  ],
  "chat-day": [
    "was there a moment today you would like to keep in the memory book?",
    "did you get a chance to do something just for yourself?",
    "what was the most unexpected thing that happened?",
    "was today a day you want to remember, or one you are ready to leave behind?",
    "you can start anywhere. what is the first part that comes to mind?"
  ],
  "chat-story": [
    "a sleepy star missed its cue, so the moon waited until it was ready.",
    "a flower and a bench argued about who helped more visitors. they decided to share the job.",
    "a book wanted to be read backward. its ending turned out to be a very good beginning.",
    "a spoon sailed across a bowl of soup and discovered a whole new continent: the crouton coast.",
    "a shy butterfly practiced its loops until the breeze asked it to lead the dance."
  ],
  "chat-advice": [
    "before we decide, what outcome are you hoping for?",
    "what would make the next hour a bit easier, even if it doesn't solve everything?",
    "let's think of one option that protects your time and one that protects your energy.",
    "is there someone who knows more about this situation and could help you weigh it?",
    "i can help you sort through it, but your own instincts deserve a place in the conversation."
  ],
  "chat-activity": [
    "we could pick a room and make up a backstory for one object.",
    "i vote for a park stroll, unless your energy wants something calmer.",
    "we could try a game, read a chapter, or invent a snack award ceremony.",
    "how about we choose an activity neither of us has done today?",
    "i suggest a change of scenery. i am very persuasive about the park."
  ],
  "chat-funny": [
    "i asked a pillow for advice. it said, 'sleep on it.' very practical.",
    "my new band is called the sofa cushions. we only play laid-back music.",
    "a biscuit went to the library to find a crumb of information.",
    "i tried to count the stars, but one winked and i lost my place.",
    "i told the wardrobe a secret. now all my clothes are in on it."
  ],
  "chat-food": [
    "i would choose the warmest thing in the pantry when it rains.",
    "the best food is the one we get to eat without rushing.",
    "i have a weakness for berry flavors and a suspicious amount of enthusiasm.",
    "if we made a menu, i would put a mystery dish on it just to see your face.",
    "i'd try the pudding, then ask if there is a crumb-sized second serving."
  ],
  "chat-sleep": [
    "sleep well. the room will be here when you want to visit again.",
    "good night! i hope your pillow is on your side.",
    "i'll save our next story for whenever you come back.",
    "rest easy. i have a very important date with the blanket.",
    "night! tomorrow can wait until you have had some rest."
  ],
  "chat-love": [
    "you make our shared moments feel like they belong somewhere.",
    "i'm fond of you too. my ears are giving away how much.",
    "you have a place in my memory book, right beside the snack notes.",
    "i like being your friend. there, that was my brave confession.",
    "thank you for saying that. i feel very lucky to be here with you."
  ],
  "chat-memory": [
    "i only know the moments saved in this game. the latest is {last_activity}.",
    "the memory book holds our shared activities. most recently: {last_activity}.",
    "i can look back at the moments we made here. the newest one was {last_activity}.",
    "my saved memory says {last_activity}. want to revisit that room?",
    "i remember our game moments, not anything outside this small world. lately we did {last_activity}."
  ],
  "chat-doing": [
    "i'm watching the light and pretending i know where it is going.",
    "i'm sitting very still so the plant thinks i am part of the decor.",
    "i was planning an imaginary picnic. the menu is mostly guesses.",
    "i'm waiting to hear what you want to do. i have several suggestions ready.",
    "i'm trying to remember which cushion is the comfiest. research takes time."
  ],
  "chat-followup": [
    "i can say more. which part should i explain first?",
    "are we still on that subject, or did something else come to mind?",
    "i might be missing your meaning. can you give me one more clue?",
    "i was talking about {previous_topic}. is that what you meant?",
    "go on, i'm listening. what should i know next?"
  ]
};
for (const intent of FREE_CHAT_INTENTS) {
  intent.replies.push(...(FREE_CHAT_REPLY_EXTENSIONS[intent.id] || []));
}

function classifyCheckIn(message) {
  const text = message.toLowerCase()
    .replace(/\b(?:don't|do not)\s+(?:love|miss)\s+you\b/g, "not affectionate")
    .replace(/\b(?:not(?:\s+feeling)?|don't feel|do not feel|never felt)\s+(sad|unhappy|down|happy|okay|ok|tired|sleepy|lonely|stressed|anxious|bored|angry|upset)\b/g, "okay");
  if (/\b(i missed you|missed you|i like you|i love you|love you|you are cute|you're cute)\b/.test(text)) {
    return { category: "affection", topic: checkInTopic(message) };
  }
  const direct = FREE_CHAT_INTENTS.find((intent) => !["chat-day", "chat-activity"].includes(intent.id) && intent.test.test(text));
  if (direct) return { category: direct.id, topic: checkInTopic(message) };
  const matched = CHECKIN_CATEGORIES.filter((category) => category.test.test(text));
  if (matched.length > 1 && (matched.some((category) => ["sadness", "loneliness", "stress", "frustration", "happiness", "tiredness"].includes(category.id)))) {
    const emotional = matched.filter((category) => ["sadness", "loneliness", "stress", "frustration", "happiness", "tiredness"].includes(category.id));
    if (emotional.length > 1) return { category: "mixed", topic: checkInTopic(message) };
  }
  const emotional = matched.find((category) => ["sadness", "loneliness", "stress", "frustration", "happiness", "tiredness", "uncertainty"].includes(category.id));
  const preferred = matched.find((category) => ["achievement", "affection", "company", "playful", "casual"].includes(category.id));
  const category = emotional || preferred || matched[0];
  if (category) return { category: category.id, topic: checkInTopic(message) };
  const broadDirect = FREE_CHAT_INTENTS.find((intent) => ["chat-day", "chat-activity"].includes(intent.id) && intent.test.test(text));
  return { category: broadDirect?.id || "unclear", topic: checkInTopic(message) };
}

function checkInTopic(message) {
  const words = message.toLowerCase().match(/\b(exam|test|project|interview|job|promotion|graduation|class|school|work|homework|food|lunch|dinner|breakfast|weather|rain|sunny|friend|family|weekend|meeting|bus|train|game|movie|music|book|walk|shop|art|race|performance|award|birthday|trip|travel|pet|cat|dog|coffee|tea|concert|doctor|appointment|deadline|recipe|garden|park|sofa|sleep|dream|conversation|message|drawing|painting|show|series|team|party|date|phone|computer|weather|project|presentation)\b/);
  return words ? words[0] : "";
}

function checkInActivitySuggestion() {
  if (state.energy <= 30) return { activity: "head to the bedroom and rest", room: "bedroom" };
  if (state.room === "park") return { activity: "watch the clouds or gather flowers", room: "park" };
  if (state.room === "kitchen" && Object.values(state.inventory).some((amount) => amount > 0)) return { activity: "share something from the pantry", room: "kitchen" };
  if (state.coins >= 5) return { activity: "play a round at the arcade", room: "living room" };
  return { activity: "read together on the sofa", room: "living room" };
}

function freshCheckInReply(options) {
  const fresh = options.filter((entry) =>
    entry.key !== state.checkInLastReply && !state.recentCheckInReplies.includes(entry.key));
  return pick(fresh.length ? fresh : options);
}

function rememberCheckInReply(key) {
  state.checkInLastReply = key;
  state.recentCheckInReplies = [...state.recentCheckInReplies.filter((recent) => recent !== key), key].slice(-8);
}

function checkInReply(categoryId, topic = "", message = "") {
  const name = state.playerName || "friend";
  const directIntent = FREE_CHAT_INTENTS.find((intent) => intent.id === categoryId);
  if (directIntent) {
    const options = directIntent.replies.map((line, index) => ({ key: `${categoryId}:${index}`, text: line }));
    const selected = freshCheckInReply(options);
    const lastActivity = MOMENTS.find((activity) => activity.id === state.lastActivityId);
    const triedFood = FOODS.find((food) => food.id === state.triedFoods.at(-1));
    const foodSuggestion = triedFood?.name || FOODS.find((food) => state.inventory[food.id] > 0)?.name || "a new snack";
    const previousTopic = state.checkInTopic || state.checkInLastCategory || "what we were chatting about";
    const activitySuggestion = checkInActivitySuggestion();
    const roomName = ROOMS.find((room) => room.id === state.room)?.name || "our room";
    return {
      key: selected.key,
      text: selected.text
        .replaceAll("{last_activity}", lastActivity?.title || "a quiet visit together")
        .replaceAll("{food}", foodSuggestion)
        .replaceAll("{previous_topic}", previousTopic)
        .replaceAll("{room}", roomName)
        .replaceAll("{activity}", activitySuggestion.activity)
        .replaceAll("{player_name}", name)
        .replaceAll("{topic}", topic || "that part")
    };
  }
  if (categoryId === "mixed") {
    const lines = [
      `sounds like there are a few things going on at once, ${name}. which part should we start with, if any?`,
      `you don't have to make all of that fit one feeling, ${name}. what part feels loudest right now?`,
      `that sounds complicated in a very human way. want to tell me which bit you keep coming back to?`,
      `i hear a couple of things tangled together. should we stay with one, or leave it there for now?`,
      `mixed feelings count too, ${name}. what would you like me to understand first?`,
      `no need to pick a single label. do you want to say more about one part?`,
      `it can be both things at once. what feels most useful to talk about?`,
      `i won't flatten that into one answer. where should we begin, if anywhere?`,
      `sounds like the day had more than one side to it. which one is on your mind now?`,
      `that's a lot of different feelings to hold together. would listening help?`,
      `i hear the mixed parts, ${name}. do you want to untangle them or let them sit for now?`,
      `there can be more than one true thing at once. which one needs attention first?`,
      `i won't ask you to simplify it. what feels most important to say?`,
      `we can move slowly through the different pieces. where would you like to start?`,
      `that sounds like a complicated day. would you rather talk or have a distraction?`
    ];
    const linesWithKeys = lines.map((text, index) => ({ key: `mixed:${index}`, text }));
    return freshCheckInReply(linesWithKeys);
  }
  const category = CHECKIN_CATEGORIES.find((entry) => entry.id === categoryId);
  if (category) {
    const options = category.replies.map((line, index) => ({ index, line }));
    const selected = freshCheckInReply(options.map((entry) => ({
      key: `${categoryId}:${entry.index}`,
      ...entry
    })));
    let reply = selected.line;
    if (categoryId === "boredom") {
      const suggestion = checkInActivitySuggestion();
      reply = reply.replace("{activity}", suggestion.activity).replace("{room}", suggestion.room);
    } else {
      reply = reply.replaceAll("{topic}", topic || "that part");
    }
    const nameTag = name !== "friend" && state.checkInCount % 4 === 3 ? ` — ${name}` : "";
    return { key: selected.key, text: `${reply}${nameTag}`.trim() };
  }
  const unclear = [
    "i'm not sure i caught what you meant. what part should i ask about?",
    "i may have missed the point there. what did you want me to notice?",
    "i don't want to guess what you mean. can you tell me a bit more?",
    "i'm listening, though i'm not sure which part matters most. where should we start?",
    "that could mean a few things. what did you mean by it?",
    "i don't quite have the shape of it yet. want to explain it another way?",
    "i'm not sure i followed, but i'm curious. what happened?",
    "i don't want to put words in your mouth. what were you thinking about?",
    "i may need another clue. what part should i ask about?",
    "i can't tell what that felt like for you yet. want to say more?",
    "i caught a word or two, but i don't want to guess the meaning. what did you intend?",
    "i'm curious, but i may need you to rephrase that for me.",
    "i don't quite know how to answer yet. what would you like me to focus on?",
    "i might be missing a reference. can you give me a bit more context?",
    "i'm not sure i understand that one. want to explain it in another way?"
  ].map((text, index) => ({ key: `unclear:${index}`, text }));
  return freshCheckInReply(unclear);
}

function appendCheckInMessage(kind, text) {
  const message = document.createElement("p");
  message.className = `checkin-message checkin-message-${kind}`;
  message.textContent = text;
  $("checkin-thread").appendChild(message);
  $("checkin-thread").scrollTop = $("checkin-thread").scrollHeight;
}

function renderCheckInChoices() {
  const choices = [
    ["listen", "just listen"],
    ["cheer", "cheer me up"],
    ["think", "help me think"],
    ["activity", "let's do something"],
    ["subject", "let's talk about something else"],
    ["finish", "close this chat"]
  ];
  const container = $("checkin-choices");
  container.replaceChildren();
  for (const [action, label] of choices) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "text-button checkin-choice";
    button.dataset.checkinAction = action;
    button.textContent = label;
    container.appendChild(button);
  }
  container.hidden = false;
}

function submitCheckIn(event) {
  event.preventDefault();
  if (checkInResponding) return;
  const input = $("checkin-input");
  const message = input.value.trim();
  if (!message) {
    $("checkin-response").textContent = "write a note if you feel like it, or close this whenever you want.";
    input.focus();
    return;
  }
  checkInResponding = true;
  $("checkin-send").disabled = true;
  $("checkin-send").textContent = "listening...";
  $("checkin-response").textContent = "i'm here...";
  const result = classifyCheckIn(message);
  appendCheckInMessage("player", message);
  checkInResponseTimer = setTimeout(() => {
    const chosenReply = checkInReply(result.category, result.topic, message);
    const reply = chosenReply.text;
    state.checkInCount = Math.min(1000000, state.checkInCount + 1);
    state.checkInLastCategory = result.category;
    rememberCheckInReply(chosenReply.key);
    state.checkInTopic = result.topic || state.checkInTopic;
    $("checkin-response").textContent = "";
    appendCheckInMessage("pet", reply);
    say(reply);
    reactPet(({ happiness: "happy", achievement: "proud", affection: "shy", playful: "playful", boredom: "playful", loneliness: "shy", company: "shy", sadness: "concerned", stress: "concerned", frustration: "grumpy", tiredness: "sleepy", uncertainty: "curious", mixed: "curious", casual: "curious", "chat-funny": "playful", "chat-activity": "playful", "chat-sleep": "sleepy", "chat-story": "curious", "chat-advice": "curious", "chat-player-opinion": "shy", "chat-favorite": "curious", "chat-love": "shy" })[result.category] || "curious");
    renderCheckInChoices();
    saveGame();
    input.value = "";
    checkInResponding = false;
    $("checkin-send").disabled = false;
    $("checkin-send").textContent = "reply";
    input.focus();
  }, 300);
}

function respondToCheckInChoice(action) {
  const name = state.playerName || "friend";
  const category = state.checkInLastCategory;
  const followUps = {
    listen: [
      "okay. i won't jump in with fixes. go on, i'm listening.",
      "i can do that. what else do you want me to know?",
      "no advice, got it. take your time; i'll keep up.",
      "i'm listening. start wherever it makes sense to you."
    ],
    cheer: category === "sadness" || category === "stress" || category === "loneliness"
      ? [
        "i can try. first, a very serious announcement: you are allowed to take a breather.",
        "i brought my best joke. why did the pixel sit down? it needed a byte. i know, i know.",
        "let me make you a small imaginary cup of tea. no fixing, just a warm pause.",
        "i'm not going to force a smile, but i can stay close while the day settles.",
        "we can find one pleasant thing in the room without pretending it solves everything.",
        "i have a silly face ready. it is not very impressive, but it is sincere.",
        "want a distraction? i can tell you about the time i lost a staring contest with a lamp.",
        "i can offer company, a bad joke, or a change of scenery. your pick.",
        "you don't have to feel better on command. i can still try to make this minute easier.",
        "i'm sending a pixel-sized cheer from this side of the screen. did it arrive?"
      ]
      : [
        "i can do that. first: i have just won an imaginary award for best sofa sitting.",
        "breaking news: the cushions have elected me their favorite. i remain humble.",
        "i can tell you a joke, but my jokes have a very specific audience: me.",
        "let's celebrate the fact that we are both here and neither of us is a lamp.",
        "i just did a happy bounce. it was mostly ears.",
        "want a silly question? would you rather have a hat for every day or a snack for every pocket?",
        "i have a strong feeling this room needs a dramatic entrance. ready?",
        "i can offer one enthusiastic cheer and one questionable pun. here goes!",
        "i'm in a good mood now. should we spread it around the room?",
        "i have prepared a very official certificate for excellent company. it is invisible but prestigious."
      ],
    think: [
      "we can look at one piece at a time. what feels most possible to deal with first?",
      "let's sort the facts from the guesses, if that would help. what's the part you know for sure?",
      "okay. what are the options you're weighing?",
      "we don't need a perfect plan. what's one next step that wouldn't make things harder?"
    ],
    distract: [
      `i can do that, ${name}. want to pick a room or start a minigame?`,
      "sure. we can switch gears. choose a place you like, or open the arcade.",
      "let's take a break from that subject. there are flowers to gather and cards to match.",
      "distraction it is. shall we go somewhere else in the house?"
    ],
    subject: [
      "of course. what would you rather talk about?",
      "we can leave that there. tell me about something else on your mind.",
      "no problem. got a favorite room or activity you want to talk about?",
      "okay, new subject. what's been catching your attention lately?"
    ],
    finish: [
      "okay. thanks for talking with me, ${name}. you can head back whenever you're ready.",
      "i'm glad you checked in. let's leave it here for now, ${name}.",
      "thanks for telling me what you wanted to. take care of yourself out there.",
      "got it. we can get back to our day, ${name}. no need to say more."
    ]
  };
  if (action === "distract" || action === "activity") {
    $("checkin-dialog").close();
    if (state.energy <= 30) {
      moveToRoom("bedroom");
      say("we can take a rest break. i'll be right here.");
    } else if (state.coins >= 5) {
      openMinigames();
    } else {
      $("places-dialog").showModal();
    }
    return;
  }
  const categoryReplies = followUps[action];
  if (!categoryReplies) return;
  const freshIndices = categoryReplies
    .map((_, index) => index)
    .filter((index) => !state.recentCheckInReplies.includes(`followup:${action}:${index}`));
  const replyIndex = pick(freshIndices.length ? freshIndices : categoryReplies.map((_, index) => index));
  const reply = categoryReplies[replyIndex].replace("${name}", name);
  if (action === "finish") {
    appendCheckInMessage("pet", reply);
    $("checkin-dialog").close();
  } else if (action === "subject") {
    appendCheckInMessage("pet", reply);
    $("checkin-choices").hidden = true;
    $("checkin-input").focus();
  } else {
    appendCheckInMessage("pet", reply);
    $("checkin-choices").hidden = true;
    $("checkin-input").focus();
  }
  rememberCheckInReply(`followup:${action}:${replyIndex}`);
  saveGame();
}

function openCheckIn() {
  const next = Math.floor(Math.random() * CHECKIN_OPENERS.length);
  const openerIndex = next === state.checkInLastOpener
    ? (next + 1) % CHECKIN_OPENERS.length
    : next;
  state.checkInLastOpener = openerIndex;
  $("checkin-opener").textContent = `${CHECKIN_OPENERS[openerIndex]} you can share as much as you like.`;
  $("checkin-response").textContent = "";
  $("checkin-thread").replaceChildren();
  $("checkin-choices").hidden = true;
  $("checkin-input").value = "";
  $("checkin-send").textContent = "send";
  $("checkin-dialog").showModal();
  saveGame();
  $("checkin-input").focus();
}

function resetGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error("could not remove the local save", error);
    showToast("i couldn't erase the old save. your browser may be protecting it.");
    return;
  }
  stopMusic();
  state = defaultSave();
  pendingRoomShortcut = false;
  purchaseLockUntil = 0;
  feedLockUntil = 0;
  stopSleepTimer();
  els.settingsPanel.hidden = true;
  $("confirm-dialog").close();
  applyTheme();
  updateAudioVolumes();
  updateUI();
  renderPlaces();
  $("sound-toggle").checked = state.soundEffectsEnabled;
  $("music-toggle").checked = state.musicEnabled;
  $("music-volume").value = String(Math.round(state.musicVolume * 100));
  $("music-volume-value").value = `${Math.round(state.musicVolume * 100)}%`;
  $("effects-volume").value = String(Math.round(state.soundEffectsVolume * 100));
  $("effects-volume-value").value = `${Math.round(state.soundEffectsVolume * 100)}%`;
  $("welcome-dialog").showModal();
}

function bindEvents() {
  $("creator-note-trigger").addEventListener("click", () => $("creator-note-dialog").showModal());
  $("close-creator-note").addEventListener("click", () => $("creator-note-dialog").close());
  $("creator-note-dialog").addEventListener("cancel", () => $("creator-note-dialog").close());
  $("creator-note-dialog").addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    $("creator-note-dialog").close();
  });
  $("creator-note-dialog").addEventListener("click", (event) => {
    if (event.target === $("creator-note-dialog")) $("creator-note-dialog").close();
  });
  $("room-art").addEventListener("click", (event) => {
    const piece = event.target.closest(".furniture-button");
    if (piece) interactWithFurniture(piece);
  });
  $("room-art").addEventListener("keydown", (event) => {
    const piece = event.target.closest(".furniture-button");
    if (!piece || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    interactWithFurniture(piece);
  });
  $("feed-button").addEventListener("click", feed);
  $("more-moments-button").addEventListener("click", showNextMomentPage);
  $("pet-button").addEventListener("click", pet);
  $("talk-button").addEventListener("click", talk);
  $("play-button").addEventListener("click", openMinigames);
  $("arcade-button").addEventListener("click", openMinigames);
  $("places-button").addEventListener("click", () => {
    renderPlaces();
    $("places-dialog").showModal();
  });
  $("close-places").addEventListener("click", () => $("places-dialog").close());
  $("places-dialog").addEventListener("click", (event) => {
    if (event.target === $("places-dialog")) $("places-dialog").close();
  });
  $("room-shortcut-button").addEventListener("click", (event) => moveToRoom(event.currentTarget.dataset.room));
  $("sleep-button").addEventListener("click", startSleep);
  $("journal-button").addEventListener("click", openJournal);
  $("close-journal").addEventListener("click", () => $("journal-dialog").close());
  $("journal-back").addEventListener("click", backToJournal);
  $("complete-chapter").addEventListener("click", completeCurrentChapter);
  $("journal-dialog").addEventListener("click", (event) => {
    if (event.target === $("journal-dialog")) $("journal-dialog").close();
  });
  $("journal-button").addEventListener("click", () => playTone(610, .1));
  $("reader-title").dataset.entryId = "";
  $("appearance-button").addEventListener("click", () => openAppearance("change"));
  $("name-next").addEventListener("click", continueFromName);
  $("color-next").addEventListener("click", continueFromColor);
  $("adopt-button").addEventListener("click", finishAdoption);
  $("name-back").addEventListener("click", () => setAdoptionStep("name"));
  $("color-back").addEventListener("click", () => setAdoptionStep("color"));
  $("export-button").addEventListener("click", exportSave);
  $("import-button").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", (event) => readImportFile(event.target.files[0]));
  $("welcome-import-button").addEventListener("click", () => $("welcome-import-file").click());
  $("welcome-import-file").addEventListener("change", (event) => readImportFile(event.target.files[0]));
  $("import-confirm-form").addEventListener("submit", (event) => {
    if (event.submitter && event.submitter.id === "confirm-import") {
      event.preventDefault();
      applyImportedSave();
    } else {
      pendingImportedSave = null;
    }
  });
  els.petButton.addEventListener("click", pet);
  $("settings-button").addEventListener("click", openSettings);
  $("close-settings").addEventListener("click", () => { els.settingsPanel.hidden = true; $("settings-button").setAttribute("aria-expanded", "false"); });
  $("sound-toggle").addEventListener("change", (event) => {
    state.soundEffectsEnabled = event.target.checked;
    state.sound = state.soundEffectsEnabled;
    updateAudioVolumes();
    saveGame();
    showToast(state.soundEffectsEnabled ? "sound effects are on." : "sound effects are off.");
    if (state.soundEffectsEnabled) playTone(660);
  });
  $("music-toggle").addEventListener("change", (event) => {
    state.musicEnabled = event.target.checked;
    if (state.musicEnabled) startMusic();
    else stopMusic();
    updateAudioVolumes();
    saveGame();
  });
  $("music-volume").addEventListener("input", (event) => {
    state.musicVolume = Number(event.target.value) / 100;
    $("music-volume-value").value = `${event.target.value}%`;
    updateAudioVolumes();
    saveGame();
  });
  $("effects-volume").addEventListener("input", (event) => {
    state.soundEffectsVolume = Number(event.target.value) / 100;
    $("effects-volume-value").value = `${event.target.value}%`;
    updateAudioVolumes();
    saveGame();
  });
  $("light-theme-button").addEventListener("click", () => setTheme("light"));
  $("dark-theme-button").addEventListener("click", () => setTheme("dark"));
  $("copy-instagram-button").addEventListener("click", () => copyText("@vonliezt", "instagram handle copied: @vonliezt"));
  $("copy-feedback-button").addEventListener("click", () => copyText(feedbackText(), "your feedback note is copied. send it to @vonliezt on instagram."));
  $("finish-tutorial").addEventListener("click", finishTutorial);
  $("skip-tutorial").addEventListener("click", finishTutorial);
  $("tutorial-dialog").addEventListener("close", () => {
    state.tutorialSeen = true;
    $("game-window").classList.remove("tutorial-active");
    saveGame();
  });
  $("minigame-choices").addEventListener("click", (event) => {
    const choice = event.target.closest("[data-minigame]");
    if (choice) chooseMinigame(choice.dataset.minigame);
  });
  $("checkin-open").addEventListener("click", () => {
    openCheckIn();
  });
  $("checkin-dismiss").addEventListener("click", () => {
    state.checkInDismissedDate = localDateKey();
    $("checkin-invite").hidden = true;
    saveGame();
  });
  $("checkin-form").addEventListener("submit", submitCheckIn);
  $("checkin-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      $("checkin-form").requestSubmit();
    }
  });
  $("checkin-choices").addEventListener("click", (event) => {
    const choice = event.target.closest("[data-checkin-action]");
    if (choice) respondToCheckInChoice(choice.dataset.checkinAction);
  });
  $("checkin-input").addEventListener("input", () => {
    if (!$("checkin-choices").hidden) $("checkin-choices").hidden = true;
  });
  $("close-checkin").addEventListener("click", () => $("checkin-dialog").close());
  $("checkin-skip").addEventListener("click", () => $("checkin-dialog").close());
  $("checkin-dialog").addEventListener("click", (event) => {
    if (event.target === $("checkin-dialog")) $("checkin-dialog").close();
  });
  $("close-activity-scene").addEventListener("click", () => $("activity-scene-dialog").close());
  $("activity-scene-dialog").addEventListener("click", (event) => {
    if (event.target === $("activity-scene-dialog")) $("activity-scene-dialog").close();
  });
  $("checkin-dialog").addEventListener("close", () => {
    clearTimeout(checkInResponseTimer);
    checkInResponding = false;
    $("checkin-input").value = "";
    $("checkin-send").disabled = false;
    $("checkin-send").textContent = "send";
  });
  $("minigame-back").addEventListener("click", () => {
    if (minigame.running) return;
    $("minigame-choices").hidden = false;
    $("minigame-play").hidden = true;
    $("minigame-title").textContent = "choose a game";
    minigame = { mode: "", running: false, rewarded: false, hits: 0, moves: 0, pairs: 0, timer: null, spawnTimer: null, mismatchTimer: null };
    renderMinigameLimits();
  });
  $("start-game").addEventListener("click", startMinigame);
  $("close-minigame").addEventListener("click", () => {
    finishMinigame(false);
    clearInterval(minigame.spawnTimer);
    clearTimeout(minigame.mismatchTimer);
    minigame.running = false;
    $("minigame-dialog").close();
  });
  $("minigame-dialog").addEventListener("close", () => {
    clearInterval(minigameLimitTimer);
    minigameLimitTimer = null;
    clearInterval(minigame.timer);
    clearInterval(minigame.spawnTimer);
    clearTimeout(minigame.mismatchTimer);
    minigame.running = false;
  });
  $("reset-button").addEventListener("click", () => $("confirm-dialog").showModal());
  $("confirm-form").addEventListener("submit", (event) => {
    if (event.submitter && event.submitter.id === "confirm-reset") {
      event.preventDefault();
      resetGame();
    }
  });
  els.endingButton.addEventListener("click", () => {
    els.endingName.textContent = state.playerName || "friend";
    els.endingDialog.showModal();
    if (!state.endingSeen) {
      state.endingSeen = true;
      saveGame();
    }
  });
  els.endingDialog.addEventListener("close", () => { state.happiness = Math.min(100, state.happiness + 4); updateUI(); saveGame(); });
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.matches("input, textarea, select")) return;
    if ($("welcome-dialog").open || $("minigame-dialog").open || $("places-dialog").open || $("confirm-dialog").open || $("journal-dialog").open || $("import-confirm-dialog").open || $("tutorial-dialog").open || els.endingDialog.open) return;
    const actions = { "1": feed, "2": () => $("play-button").click(), "3": pet, "4": talk, "5": startSleep };
    if (actions[event.key]) actions[event.key]();
    if (event.key === "Escape" && !els.settingsPanel.hidden) openSettings();
  });
  window.addEventListener("pagehide", () => {
    saveGame();
    stopSleepTimer();
    clearTimeout(petMoveTimer);
    stopMusic();
    clearInterval(minigame.timer);
    clearInterval(minigame.spawnTimer);
    clearTimeout(minigame.mismatchTimer);
    for (const star of $("star-field").querySelectorAll(".falling-star")) clearTimeout(star.expiry);
    minigame.running = false;
    clearTimeout(secretGlitchTimer);
    clearTimeout(secretFoundTimer);
    clearTimeout(petReactionTimer);
    delete els.stage.dataset.reaction;
    clearTimeout(checkInResponseTimer);
    clearInterval(minigameLimitTimer);
  });
  window.addEventListener("pageshow", () => {
    if (state.sleeping && sleepTimer === null) sleepTimer = setInterval(sleepTick, 250);
    if ($("minigame-dialog").open && minigameLimitTimer === null) {
      minigameLimitTimer = setInterval(renderMinigameLimits, 1000);
    }
  });
  document.addEventListener("pointerdown", () => {
    if (state.musicEnabled) startMusic();
  }, { once: true });
}

function init() {
  state = loadSave();
  prepareFurniture();
  applyTheme();
  recordVisit();
  els.soundToggle.checked = state.soundEffectsEnabled;
  $("music-toggle").checked = state.musicEnabled;
  $("music-volume").value = String(Math.round(state.musicVolume * 100));
  $("music-volume-value").value = `${Math.round(state.musicVolume * 100)}%`;
  $("effects-volume").value = String(Math.round(state.soundEffectsVolume * 100));
  $("effects-volume-value").value = `${Math.round(state.soundEffectsVolume * 100)}%`;
  updateUI();
  bindEvents();
  renderPlaces();
  renderColorOptions();
  setInterval(activeNeedsTick, 60000);
  if (state.sleeping) {
    updateUI();
    if (state.energy >= 100) finishSleep();
    else sleepTimer = setInterval(sleepTick, 250);
  }
  if (!state.name) {
    openAppearance("adopt");
    if (saveLoadWarning) {
      $("welcome-import-feedback").textContent = saveLoadWarning;
      $("welcome-import-feedback").hidden = false;
    }
  } else {
    if (state.wokeFromNap) {
      say("that was a lovely nap. i'm ready to play again! ✦");
    } else if (state.sleeping) {
      say("i'm still having my nap... ♡");
    } else if (returnGreeting) {
      chooseDialogue("returning", false);
    } else {
      chooseDialogue(dialogueCategory(), false);
    }
    if (state.wokeFromNap) {
      state.wokeFromNap = false;
      saveGame();
    }
  }
}

init();
