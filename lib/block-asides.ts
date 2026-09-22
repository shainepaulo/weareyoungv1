/**
 * The second image that sits beside each caption word on a case page.
 *
 * Every block already carries one wide still. The word next to it — CASTING,
 * SCENOGRAPHY, TALENT — is only ~50px tall in a 380px band, so the rest of
 * that column reads as a hole. This fills it with a frame from the project's
 * own gallery chosen *because* it shows the thing the word names: the stage
 * rig for SCENOGRAPHY, a face for TALENT, the crowd for EXPERIENCE.
 *
 * Keyed by project slug; the array runs in the same order as the project's
 * `blocks`, and the comment on each line is the word it answers. `null` means
 * nothing in that gallery earns the slot — better an honest gap than a stock
 * pairing.
 */
/** One image beside the word, or two stacked in the same slot. */
export type Aside = string | string[] | null;

export const BLOCK_ASIDES: Record<string, Aside[]> = {
  "adidas-arena": [
    // BRAND CONTENT — the campaign portraits, shot for the campaign itself.
    "/way/projects/adidas-arena/gallery-1-adidas-arena-x-we-are-young-agency-1.webp",
    // PR STUNT — the line taken to the street: "UN FLOW, UNE SCÈNE, TON ARENA".
    "/way/projects/adidas-arena/gallery-2-adidas-arena-x-we-are-young-agency-2.webp",
    // EVENT — the arena itself, and the show hung inside it.
    "/way/projects/adidas-arena/gallery-5-adidas-arena-x-we-are-young-agency-5.webp",
  ],
  "adidas-this-is-new-rugby": [
    // TV SPOT — the film's money shot, the dive over the line.
    "/way/projects/adidas-this-is-new-rugby/gallery-5-adidas-this-is-new-rugby-x-way-agencyc-5.webp",
    // SOCIAL — the camera in close on the talent, where the short form comes from.
    "/way/projects/adidas-this-is-new-rugby/gallery-3-adidas-this-is-new-rugby-x-way-agencyc-3.webp",
    // EVENT — the whole squad out on the pitch.
    "/way/projects/adidas-this-is-new-rugby/gallery-4-adidas-this-is-new-rugby-x-way-agencyc-4.webp",
  ],
  "quai-54": [
    // TOURNAMENT — contested jump shot, scoreboard behind.
    "/way/projects/quai-54/gallery-3-julien-jolivet-quai54-jordan-3.webp",
    // DUNK CONTEST — the dunk itself, judges' table in frame.
    "/way/projects/quai-54/gallery-5-julien-jolivet-quai54-jordan-5.webp",
    // SHOWCASES — a showcase game, stands full.
    "/way/projects/quai-54/gallery-4-julien-jolivet-quai54-jordan-4.webp",
    // ARENA — the 20th-anniversary screen dressing the stands.
    "/way/projects/quai-54/gallery-1-julien-jolivet-quai54-jordan-1.webp",
  ],
  "women-in-tech-beyond-ceiling": [
    // FILM — the mirror, the line the whole film turns on.
    "/way/projects/women-in-tech-beyond-ceiling/gallery-4-x-jlnjlvtc4.webp",
    // PRINT — the drawing itself, the one thing on paper.
    "/way/projects/women-in-tech-beyond-ceiling/gallery-1-x-jlnjlvtc.webp",
  ],
  "saison-xi": [
    // ARENA — the gradient pitch built under the Eiffel Tower.
    "/way/projects/saison-xi/gallery-1-julien-jolivet-impulstar-1-min.webp",
    // SCENOGRAPHY — the set pieces: the branded van and the inflatable.
    "/way/projects/saison-xi/gallery-2-julien-jolivet-impulstar-2-min.webp",
    // ENTERTAINERS — a lone player working the floor between games.
    "/way/projects/saison-xi/gallery-3-julien-jolivet-impulstar-3-min.webp",
    // SHOWCASES — a showcase match on the gradient court.
    "/way/projects/saison-xi/gallery-4-julien-jolivet-impulstar-4-min.webp",
  ],
  "sns-paris-football-week": [
    // SCENOGRAPHY — the collection's type projected across the pitch floor.
    "/way/projects/sns-paris-football-week/gallery-1-sns-x-adidas-originals-paris-football-week-1-scaled.webp",
    // TOURNAMENT — the bench, then the tackle under the SNS signage.
    "/way/projects/sns-paris-football-week/gallery-3-sns-x-adidas-originals-paris-football-week-3-scaled.webp",
    // ENTERTAINMENT — the decks running the room between matches.
    "/way/projects/sns-paris-football-week/gallery-2-sns-x-adidas-originals-paris-football-week-2-scaled.webp",
  ],
  radar: [
    // SCENOGRAPHY — the rig itself: RADAR sign, LED wall, stacked speakers.
    "/way/projects/radar/gallery-3-we-are-young-x-desperados-radar3-1900x987.webp",
    // TALENT — Fianso alone on the mic.
    "/way/projects/radar/gallery-2-we-are-young-x-desperados-radar2-1900x987.webp",
    // EXPERIENCE — the crowd, from the stage.
    "/way/projects/radar/gallery-1-we-are-young-x-desperados-radar1-1900x987.webp",
  ],
  "adidas-this-is-new-rugby-flagship": [
    // SHOOTING — the studio portraits the campaign was built from, one player at a time.
    "/way/projects/adidas-this-is-new-rugby-flagship/gallery-2-adidas-this-is-new-rugby-xflagship-x-way-agency-2.webp",
    // 3D ARTWORK — the world itself: floating turf, goalposts in the clouds.
    "/way/projects/adidas-this-is-new-rugby-flagship/gallery-1-adidas-this-is-new-rugby-xflagship-x-way-agency-1.webp",
    // POST PRODUCTION — the squad composited onto the islands, every frame finished.
    "/way/projects/adidas-this-is-new-rugby-flagship/gallery-3-adidas-this-is-new-rugby-xflagship-x-way-agency-3.webp",
    // URBAN SCENOGRAPHY — the Champs-Élysées flagship wrapped in the campaign.
    "/way/projects/adidas-this-is-new-rugby-flagship/gallery-4-adidas-this-is-new-rugby-xflagship-x-way-agency-4.webp",
  ],
  "euroleague-off-court": [
    // SCENOGRAPHY — the court itself, built inside a cloud, before anyone walks on.
    "/way/projects/euroleague-off-court/gallery-1-euroleague-julien-jolivet-aka-jlnjlvt-1.webp",
    // DUNK CONTEST — up at the rim, ball still on the ring.
    "/way/projects/euroleague-off-court/gallery-3-euroleague-julien-jolivet-aka-jlnjlvt-3.webp",
    // FREESTYLERS — the mic going round the circle, shot from the floor.
    "/way/projects/euroleague-off-court/gallery-5-euroleague-julien-jolivet-aka-jlnjlvt-5.webp",
    // PARTNERSHIP — the Turkish Airlines plane flying across the set wall.
    "/way/projects/euroleague-off-court/gallery-4-euroleague-julien-jolivet-aka-jlnjlvt-4.webp",
  ],
  ucl: [
    // SCENOGRAPHY — the pitch and its stands built into the street, empty at dusk.
    "/way/projects/ucl/gallery-1-julien-jolivet-adidas-champions-league-1.webp",
    // TOURNAMENT — a tie under way, both benches and the whole terrace watching.
    "/way/projects/ucl/gallery-5-julien-jolivet-adidas-champions-league-5.webp",
    // GAME PLAY — one-on-one on the ball, the moment the match turns.
    "/way/projects/ucl/gallery-3-julien-jolivet-adidas-champions-league-3.webp",
    // FAN ZONE — the terrace itself, up on its feet.
    "/way/projects/ucl/gallery-4-julien-jolivet-adidas-champions-league-4.webp",
  ],
  "radar-red-house": [
    // CONCEPTION — the identity itself, tiled across the wall: name, date, line-up.
    "/way/projects/radar-red-house/gallery-3-radar-red-house3-scaled.webp",
    // PRODUCTION — the room as built — RADAR hung over the booth, rig and stacks in place.
    "/way/projects/radar-red-house/gallery-1-radar-red-house1-scaled.webp",
    // PROGRAMMATION — the bill, on stage: the acts that were booked, playing.
    "/way/projects/radar-red-house/gallery-4-radar-red-house4-scaled.webp",
    // INFLUENCE — a guest at the wall, posing for the camera that carries the night out.
    "/way/projects/radar-red-house/gallery-5-radar-red-house5-scaled.webp",
  ],
  "mr-a-adidas-originals": [
    // SHOOTING — the camera up and the frame being taken, out on the street.
    "/way/projects/mr-a-adidas-originals/gallery-4-andre-savaira-x-jlnjlvt-4.webp",
    // INFLUENCE — the pair that went out: Sambas painted in his own colours.
    "/way/projects/mr-a-adidas-originals/gallery-2-andre-savaira-x-jlnjlvt-2.webp",
    // EDITORIAL — the studio visit — the artist among his canvases.
    "/way/projects/mr-a-adidas-originals/gallery-3-andre-savaira-x-jlnjlvt-3.webp",
    // LIVE ART — can in hand, the wordmark going up wet on the wall.
    "/way/projects/mr-a-adidas-originals/gallery-1-andre-savaira-x-jlnjlvt-1.webp",
  ],
  "feel-the-alps-edelweiss": [
    // EXPERIENCES — the long table laid in the snow, valley underneath.
    "/way/projects/feel-the-alps-edelweiss/gallery-4-edelweiss-x-we-are-young-agencyc-5.webp",
    // SCENOGRAPHY — the set as built: signpost, cabin, snowshoes, dressed powder.
    "/way/projects/feel-the-alps-edelweiss/gallery-1-edelweiss-x-we-are-young-agencyc-1.webp",
    // LOGISTICS — a hot plate and a dessert served at altitude, gondola still overhead.
    "/way/projects/feel-the-alps-edelweiss/gallery-5-edelweiss-x-we-are-young-agencyc-6.webp",
  ],
  "henry-jacques": [
    // EVENT DESIGN — the drawing it started from: the Montaigne façade, elevation.
    "/way/projects/henry-jacques/gallery-1-henry-jacques-avenue-montaigne-x-we-are-young-agencyc1-min.webp",
    // PRODUCTION — the same façade built and dressed, awnings out, tables set.
    "/way/projects/henry-jacques/gallery-2-henry-jacques-avenue-montaigne-x-we-are-young-agencyc2-min.webp",
    // INFLUENCE — a guest taken through the perfumer's bench, one to one.
    "/way/projects/henry-jacques/gallery-5-henry-jacques-avenue-montaigne-x-we-are-young-agencyc5-min.webp",
  ],
  "adidas-originals-confirmed": [
    // CONCEPT — the conceit itself: a camera watching, the room playing back on a CRT.
    "/way/projects/adidas-originals-confirmed/gallery-5-adidas-confirmed-x-jlnjlvt-5.webp",
    // EVENT DESIGN — the shop built and blanked out — blue box, logo, nothing else.
    "/way/projects/adidas-originals-confirmed/gallery-1-adidas-confirmed-x-jlnjlvt-1.webp",
    // SOCIAL MEDIA CREATIVES — phone up, shoe in hand: the frame that goes straight to a feed.
    "/way/projects/adidas-originals-confirmed/gallery-2-adidas-confirmed-x-jlnjlvt-2.webp",
    // MEDIA PARTNERSHIP — what the announcement pulled — the line down the street on drop day.
    "/way/projects/adidas-originals-confirmed/gallery-3-adidas-confirmed-x-jlnjlvt-3.webp",
  ],
  "adidas-originals-paris-basketball": [
    // CONTENT CREATION — the hero frame: the collection shot from the floor, crest on top.
    "/way/projects/adidas-originals-paris-basketball/gallery-1-gazo-x-jlnjlvt-julien-jolivet-1.webp",
    // INFLUENCE — Gazo out front on the playground, the crew behind him.
    "/way/projects/adidas-originals-paris-basketball/gallery-4-gazo-x-jlnjlvt-julien-jolivet-4.webp",
  ],
  "gorillas-x-all-star-game": [
    // CONCEPT & AD — the idea in one lockup, lit across the rig: All Star Game by Gorillas.
    "/way/projects/gorillas-x-all-star-game/gallery-5-gorillas-x-all-star-game-we-are-young-agency-c-5.webp",
    // CONTENT PRODUCTION — the rider rig and the screens made for it, running on the floor.
    "/way/projects/gorillas-x-all-star-game/gallery-3-gorillas-x-all-star-game-we-are-young-agency-c-3.webp",
    // COMMUNICATION & INFLUENCE — the stand, the offer on the wall and the bags that left with people.
    "/way/projects/gorillas-x-all-star-game/gallery-2-gorillas-x-all-star-game-we-are-young-agency-c-2.webp",
  ],
  "messi-goats": [
    // CONTENT CREATION — the frame made on the spot: the boots held up beside a goat.
    "/way/projects/messi-goats/gallery-4-adidas-messi-goats-we-are-young-agencyc-4-1900x987.webp",
    // SOCIAL MEDIA CHALLENGE — the whole point — phone up, herd and tower in the shot.
    "/way/projects/messi-goats/gallery-2-adidas-messi-goats-we-are-young-agencyc-2-1900x987.webp",
    // EVENT DESIGN — the herd installed across the Trocadéro, facing the tower.
    "/way/projects/messi-goats/gallery-1-adidas-messi-goats-we-are-young-agencyc-1-1900x987.webp",
  ],
  "reebok-x-jul": [
    // CONTENT PRODUCTION — the set built around him — corridor, screens, Earth through the port.
    "/way/projects/reebok-x-jul/gallery-1-reebok-x-jul-jlnjlvt-1-1900x987.webp",
    // OOH — the key visual made to go up big: the TMAX, the saucer, the whole gag.
    "/way/projects/reebok-x-jul/gallery-2-reebok-x-jul-jlnjlvt-2-1900x987.webp",
    // SEEDING & INFLUENCE — the pieces that went out, worn: cap, quarter-zip, the racing mark.
    "/way/projects/reebok-x-jul/gallery-5-reebok-x-jul-jlnjlvt-5-1900x987.webp",
  ],
  "bose-x-jain": [
    // SHOOTING — the set piece of the day: the ball chair, dressed and lit.
    "/way/projects/bose-x-jain/gallery-1-bose-x-jain-x-jlnjlvt-1-1900x987.webp",
    // CONTENT CREATION — on the floor with the markers — the artwork being drawn on camera.
    "/way/projects/bose-x-jain/gallery-3-bose-x-jain-x-jlnjlvt-3-1900x987.webp",
    // SOCIAL MEDIA — the portrait cut for a feed: headphones on, light from the window.
    "/way/projects/bose-x-jain/gallery-2-bose-x-jain-x-jlnjlvt-2-1900x987.webp",
    // RETAIL GRAPHIC IDENTITY — the prints themselves — framed, stacked, ready for the wall.
    "/way/projects/bose-x-jain/gallery-5-bose-x-jain-x-jlnjlvt-5-1900x987.webp",
  ],
  "go-crazy-in-fortnite": [
    // BRAND INFLUENCE — the pairing the whole thing rested on: the streamer and the striker.
    "/way/projects/go-crazy-in-fortnite/gallery-3-epic-games-go-crazy-in-fortnite-x-we-are-young-agency3-1900x987.webp",
    // VIDEO GAME CREATION — in the game itself — headset on, hand on the keys.
    "/way/projects/go-crazy-in-fortnite/gallery-2-epic-games-go-crazy-in-fortnite-x-we-are-young-agency2-1900x987.webp",
    // CREATIVE CONTENT & DIGITAL TOOLS — the announcement asset: Paris rebuilt in the game's colours.
    "/way/projects/go-crazy-in-fortnite/gallery-1-epic-games-go-crazy-in-fortnite-x-we-are-young-agency1-1900x987.webp",
    // SOCIAL MEDIA PLANNING — straight down the lens — the frame cut for the feed.
    "/way/projects/go-crazy-in-fortnite/gallery-5-epic-games-go-crazy-in-fortnite-x-we-are-young-agency5-1900x987.webp",
  ],
  "mon-dressing-soupline": [
    // CREATIVE DIRECTION — the whole idea in one label sewn into a collar.
    "/way/projects/mon-dressing-soupline/gallery-2-mon-dressing-soupline-we-are-young-agency2-1900x987.webp",
    // SHOOTING 2D — the studio as it stood: seamless, rail, stool.
    "/way/projects/mon-dressing-soupline/gallery-1-mon-dressing-soupline-we-are-young-agency1-1900x987.webp",
    // INFLUENCE — the creator's own words on the tag, signed with his handle.
    "/way/projects/mon-dressing-soupline/gallery-4-mon-dressing-soupline-we-are-young-agency4-1900x987.webp",
    // SOCIAL MEDIA PUBLISHING — front and back, the pair that runs as one carousel.
    "/way/projects/mon-dressing-soupline/gallery-3-mon-dressing-soupline-we-are-young-agency3-1900x987.webp",
  ],
  "netflix-en-passant-pecho-hackday": [
    // CREATIVE DIRECTION — the world as dressed: neon, fake fur, a suitcase full of sweets.
    "/way/projects/netflix-en-passant-pecho-hackday/gallery-1-netflix-en-passant-pexxcho-x-we-are-young-agency-hackday-1-1900x987.webp",
    // POST PRODUCTION — the slate and the take numbers every cut is later found by.
    "/way/projects/netflix-en-passant-pecho-hackday/gallery-3-netflix-en-passant-pexxcho-x-we-are-young-agency-hackday-3-1900x987.webp",
    // SHOOTING 2D — camera low, boom up — the crew working the scene.
    "/way/projects/netflix-en-passant-pecho-hackday/gallery-2-netflix-en-passant-pexxcho-x-we-are-young-agency-hackday-2-1900x987.webp",
    // TALENT MANAGEMENT — the actors in character, playing the gag straight.
    "/way/projects/netflix-en-passant-pecho-hackday/gallery-4-netflix-en-passant-pexxcho-x-we-are-young-agency-hackday-8-1900x987.webp",
  ],
  "adidas-originals-zx-x-13-block": [
    // CREATIVE CONTENT — the crew in the yard: the frame the whole film is cut around.
    "/way/projects/adidas-originals-zx-x-13-block/gallery-5-adidas-zx-x-13block-we-are-young-agency-5-1900x987.webp",
    // 8D — the set built in layers — foil, plastic, light bouncing between planes.
    "/way/projects/adidas-originals-zx-x-13-block/gallery-4-adidas-zx-x-13block-we-are-young-agency-4-1900x987.webp",
    // RETAIL — the shopfront panels, lit from behind, box on the floor.
    "/way/projects/adidas-originals-zx-x-13-block/gallery-2-adidas-zx-x-13block-we-are-young-agency-2-1900x987.webp",
    // LIMITED EDITION — the pair on its own, parked on the seat of the bike.
    "/way/projects/adidas-originals-zx-x-13-block/gallery-1-adidas-zx-x-13block-we-are-young-agency-1-1900x987.webp",
  ],
  "courir-40ans": [
    // CREATIVE DIRECTION — the arcade built from nothing: cabinets, test card, neon.
    "/way/projects/courir-40ans/gallery-1-courir-40-years-of-sneaker-spirit--we-are-young-agency-3-1900x987.webp",
    // SHOOTING — the dance stage lit and held, one take away.
    "/way/projects/courir-40ans/gallery-5-courir-40-years-of-sneaker-spirit--we-are-young-agency-7-1900x987.webp",
    // VIDEO — two frames of the same move — how the sequence reads.
    "/way/projects/courir-40ans/gallery-4-courir-40-years-of-sneaker-spirit--we-are-young-agency-6-1900x987.webp",
    // POST PRODUCTION — the product still, graded down to arcade reds and blues.
    "/way/projects/courir-40ans/gallery-2-courir-40-years-of-sneaker-spirit--we-are-young-agency-4-1900x987.webp",
  ],
  "adidas-originals-zx-x-vald": [
    // PRODUCTION — the capture itself: the artist shot clean on white, mid-fall.
    "/way/projects/adidas-originals-zx-x-vald/gallery-4-adidas-zx-x-vald-we-are-young-agency-4-1900x987.webp",
    // 3D DESIGN — the clouds that carry everything — modelled, not photographed.
    "/way/projects/adidas-originals-zx-x-vald/gallery-3-adidas-zx-x-vald-we-are-young-agency-3-1900x987.webp",
    // ARTISTIC DIRECTION — the finished key visual, every part of the system in place.
    "/way/projects/adidas-originals-zx-x-vald/gallery-1-adidas-zx-x-vald-we-are-young-agency-1-1900x987.webp",
    // MEDIA TOOLKIT — the same idea cut to square, talent and product, ready to run.
    "/way/projects/adidas-originals-zx-x-vald/gallery-2-adidas-zx-x-vald-we-are-young-agency-2-1900x987.webp",
  ],
  "reebok-lahaine": [
    // CREATIVE DIRECTION — the tableau: a rug and a sofa on the roof, the film's own black and white.
    "/way/projects/reebok-lahaine/gallery-1-reebok-x-la-haine-takeover-we-are-young-agency-1-1900x987.webp",
    // SHOOTING — the trio taken from below, the frame that had to be got in one go.
    "/way/projects/reebok-lahaine/gallery-3-reebok-x-la-haine-takeover-we-are-young-agency-3-1900x987.webp",
    // VIDEO — wide lens through the car: a moving shot, not a still.
    "/way/projects/reebok-lahaine/gallery-4-reebok-x-la-haine-takeover-we-are-young-agency-4-1900x987.webp",
    // POST-PRODUCTION — the grade the whole set is held in: blocks and faces, same greys.
    "/way/projects/reebok-lahaine/gallery-2-reebok-x-la-haine-takeover-we-are-young-agency-2-1900x987.webp",
  ],
  "radar-drive-in": [
    // SCENOGRAPHY — the car park turned venue: stage, stacks, screens, the sign over it all.
    "/way/projects/radar-drive-in/gallery-1-radar-drive-in-x-we-are-young-agency-14-1900x987.webp",
    // TALENTS — on the mic, against the sign and the sky.
    "/way/projects/radar-drive-in/gallery-2-radar-drive-in-x-we-are-young-agency-15-1900x987.webp",
    // EXPERIENCE — from the driver's seat, mask on — the show as it was watched.
    "/way/projects/radar-drive-in/gallery-5-radar-drive-in-x-we-are-young-agency-1-1900x987.webp",
    // INFLUENCE — what it drew: every bay taken, from the lip of the stage.
    "/way/projects/radar-drive-in/gallery-4-radar-drive-in-x-we-are-young-agency-2-1900x987.webp",
  ],
  "bape_fr": [
    // LOCATION SCOUTING — the room that made the shoot: pink plaster, gilt frames, a named door.
    "/way/projects/bape_fr/gallery-1-bapexx-jlnjlvt-1-1900x987.webp",
    // SHOOTING — under the painted sky of the ceiling, the frame being taken.
    "/way/projects/bape_fr/gallery-3-bapexx-jlnjlvt-3-1900x987.webp",
    // POST PRODUCTION — the frames cut and laid over each other into one page.
    "/way/projects/bape_fr/gallery-2-bapexx-jlnjlvt-2-1900x987.webp",
  ],
  "citadium-good-games": [
    // SCENOGRAPHY — the arena built inside the shop floor: neon loops, stations, the C.
    "/way/projects/citadium-good-games/gallery-5-citadium-x-good-games-jlnjlvt-5-1900x987.webp",
    // FORTNITE TOURNAMENT — competitors at the stations, escalators still running behind.
    "/way/projects/citadium-good-games/gallery-3-citadium-x-good-games-jlnjlvt-3-1900x987.webp",
    // MAP — the store itself rebuilt in game, on the player's screen.
    "/way/projects/citadium-good-games/gallery-4-citadium-x-good-games-jlnjlvt-4-1900x987.webp",
    // LIVE TWITCH — the broadcast wall: the feed, the bracket, every player's face.
    "/way/projects/citadium-good-games/gallery-2-citadium-x-good-games-jlnjlvt-2-1900x987.webp",
  ],
  "pmu-le-grand-prix-des-heros": [
    // STORY LIVING — history walking through the public: Marianne with the flag, two poilus off the steps.
    "/way/projects/pmu-le-grand-prix-des-heros/gallery-5-pmu-le-grand-prix-des-heros-x-we-are-young-agency-5-1900x987.webp",
    // CASTING — the extras themselves — a soldier's face, a musket raised on the stairs.
    "/way/projects/pmu-le-grand-prix-des-heros/gallery-4-pmu-le-grand-prix-des-heros-x-we-are-young-agency-4-1900x987.webp",
    // STYLISM — the costume up close: collar, headdress, veil.
    "/way/projects/pmu-le-grand-prix-des-heros/gallery-1-pmu-le-grand-prix-des-heros-x-we-are-young-agency-3-1900x987.webp",
    // SCENOGRAPHY — the red stair and the smoke they were made to come down.
    "/way/projects/pmu-le-grand-prix-des-heros/gallery-3-pmu-le-grand-prix-des-heros-x-we-are-young-agency-1-1900x987.webp",
  ],
  "premiere-vision": [
    // SCENOGRAPHY — the stand as built: big top in a hall, rings hung off the truss.
    "/way/projects/premiere-vision/gallery-1-we-are-young-x-premiere-vision-winter-1-1-1900x987.webp",
    // EXPERIENCES — the juggler working the ring, the hall stopped to watch.
    "/way/projects/premiere-vision/gallery-3-we-are-young-x-premiere-vision-winter-3-1900x987.webp",
  ],
  "adidas-take-on-summer-paris-2019": [
    // NBA players — Donovan Mitchell, off duty, between the sessions.
    "/way/projects/adidas-take-on-summer-paris-2019/gallery-3-adidas-take-one-summer-paris-harden-x-mitchell-x-we-are-young-agencyxx-3-1900x987.webp",
    // SCENOGRAPHY — the set as built: branded wall, plinths, sofas, one light.
    "/way/projects/adidas-take-on-summer-paris-2019/gallery-4-adidas-take-one-summer-paris-harden-x-mitchell-x-we-are-young-agencyxx-4-1900x987.webp",
    // ENTERTAINMENT — the room where it happened — posters up, everyone sitting in.
    "/way/projects/adidas-take-on-summer-paris-2019/gallery-2-adidas-take-one-summer-paris-harden-x-mitchell-x-we-are-young-agencyxx-2-1900x987.webp",
    // TOURNAMENT — on the sticks, eyes on the screen: Harden and Mitchell playing it out.
    "/way/projects/adidas-take-on-summer-paris-2019/gallery-5-adidas-take-one-summer-paris-harden-x-mitchell-x-we-are-young-agencyxx-5-1900x987.webp",
  ],
  "levis-x-ag2r-la-mondiale-off-road": [
    // SHOOTING — between takes on the ridge: the crew, the light, the waiting.
    "/way/projects/levis-x-ag2r-la-mondiale-off-road/gallery-3-we-are-young-x-levis-ag2r-off-road-2-1900x987.webp",
    // BRAND CONTENT — the hero frame — the whole team on the climb, in colour.
    "/way/projects/levis-x-ag2r-la-mondiale-off-road/gallery-2-we-are-young-x-levis-ag2r-off-road-1-1900x987.webp",
    // WINDOW DISPLAY — the riders cut out on white with their bikes, made for glass.
    "/way/projects/levis-x-ag2r-la-mondiale-off-road/gallery-1-levis-x-ag2r-off-road-trio1-1.webp",
    // EXHIBITION — the machines themselves: chainset, bars, the team bus behind.
    "/way/projects/levis-x-ag2r-la-mondiale-off-road/gallery-5-we-are-young-x-levis-ag2r-off-road-4-1900x987.webp",
  ],
  "undiz-unexpected-beach-party": [
    // SCENOGRAPHY — a beach built indoors: sand, deckchairs, striped hut, floats in the net.
    "/way/projects/undiz-unexpected-beach-party/gallery-3-we-are-young-x-undiz-unexpected-beach-party-3-1900x1267.webp",
    // EXPERIENCES — guests in the rings on the sand — the party doing its own work.
    "/way/projects/undiz-unexpected-beach-party/gallery-4-we-are-young-x-undiz-unexpected-beach-party-4-1900x1267.webp",
    // SHOWCASES — the floor in front of the fringe wall, stack up, room full.
    "/way/projects/undiz-unexpected-beach-party/gallery-2-we-are-young-x-undiz-unexpected-beach-party-2-1900x1267.webp",
    // INFLUENCE — the shark's mouth everyone stopped to be photographed in.
    "/way/projects/undiz-unexpected-beach-party/gallery-5-we-are-young-x-undiz-unexpected-beach-party-5-1900x1267.webp",
  ],
  "reebok-doner-kebab": [
    // #SCENOGRAPHY — a real kebab shop rebranded down to the awning, street closed in front.
    "/way/projects/reebok-doner-kebab/gallery-5-we-are-young-x-reebok-doxxner-kebab-5-1900x987.webp",
    // #SHOWCASES — from behind the artist: the mic, the barrier, the whole road singing.
    "/way/projects/reebok-doner-kebab/gallery-2-we-are-young-x-reebok-doxxner-kebab-2-1900x987.webp",
    // #AMPLIFICATION — everything that came out of it, laid end to end in the campaign's own frame.
    "/way/projects/reebok-doner-kebab/gallery-1-we-are-young-x-reebok-doxxner-kebab-1-1900x987.webp",
  ],
  "clairefontaine-toutankhamon": [
    // BRAND CONTENT — the object it all led to: the notebook, the brand on the cover.
    "/way/projects/clairefontaine-toutankhamon/gallery-4-we-are-young-agency-x-clairefontaine-toutaxxnkhamon-22le-trexxsor-du-pharaon223.webp",
    // ARTISTIC DIRECTION — the look of the whole film in one frame: one figure, one light, black.
    "/way/projects/clairefontaine-toutankhamon/gallery-1-we-are-young-agency-x-clairefontaine-toutaxxnkhamon-22le-trexxsor-du-pharaon220.webp",
    // SHOOTING — the brush held up in the beam — the frame being taken.
    "/way/projects/clairefontaine-toutankhamon/gallery-2-we-are-young-agency-x-clairefontaine-toutaxxnkhamon-22le-trexxsor-du-pharaon221-1900x1267.webp",
    // DIGITAL PLATFORM — the first blue mark on paper: what the platform was built to collect.
    "/way/projects/clairefontaine-toutankhamon/gallery-5-we-are-young-agency-x-clairefontaine-toutaxxnkhamon-22le-trexxsor-du-pharaon224.webp",
  ],
  "adidas-tango-arena": [
    // DIGITAL PLAYGROUND — the floor itself — a screen the game is played on, lines drawing themselves.
    "/way/projects/adidas-tango-arena/gallery-4-adidas-tango-arena-x-we-are-young-agencyxx-93-empire-x-garde-rexxpublicaine-4.webp",
    // TOURNAMENT — the ball live, bibs on, everyone chasing it.
    "/way/projects/adidas-tango-arena/gallery-5-adidas-tango-arena-x-we-are-young-agencyxx-93-empire-x-garde-rexxpublicaine-5.webp",
    // ENTERTAINMENT — the walk-on: beams down, one player and a ball in the middle of it.
    "/way/projects/adidas-tango-arena/gallery-3-adidas-tango-arena-x-we-are-young-agencyxx-93-empire-x-garde-rexxpublicaine-3.webp",
    // WORLD REKNOWN PLAYERS — the line-up coming out under the rig, names on their backs.
    "/way/projects/adidas-tango-arena/gallery-1-adidas-tango-arena-x-we-are-young-agencyxx-93-empire-x-garde-rexxpublicaine-1-1900x1069.webp",
  ],
  "undiz-xmas-market": [
    // SCENOGRAPHY — the shopfront built as a market stall: awning, sign, queue on the pavement.
    "/way/projects/undiz-xmas-market/gallery-1-undiz-xmas-market-x-we-are-young-agencyxx-1-1900x1266.webp",
    // INFLUENCER MARKETING — candy floss in hand, fridge door open — the frame made to be posted.
    "/way/projects/undiz-xmas-market/gallery-5-undiz-xmas-market-x-we-are-young-agencyxx-5-1900x1266.webp",
    // BRAND EXPERIENCE — shopping the aisles: cereal boxes, cold cabinets, a glass in hand.
    "/way/projects/undiz-xmas-market/gallery-2-undiz-xmas-market-x-we-are-young-agencyxx-2-1900x1266.webp",
    // PRODUCT CUSTOMIZATION — the product itself, boxed as pizza and cereal, stacked on the shelf.
    "/way/projects/undiz-xmas-market/gallery-4-undiz-xmas-market-x-we-are-young-agencyxx-4-1900x1266.webp",
  ],
  "the-timberland-studio": [
    // SCENOGRAPHY — a shop built as a flat: bed, rugs, flowers strung in the window.
    "/way/projects/the-timberland-studio/gallery-3-timberland-the-studio-x-we-are-young-agencyxx-3-1900x1267.webp",
    // VISUAL MERCHANDISING — the ladder beside the rail, three pairs on three steps.
    "/way/projects/the-timberland-studio/gallery-5-timberland-the-studio-x-we-are-young-agencyxx-5-1900x1267.webp",
    // FASHION EXPERTISE — a piece taken off the rail and looked at properly, one to one.
    "/way/projects/the-timberland-studio/gallery-4-timberland-the-studio-x-we-are-young-agencyxx-4-1900x1267.webp",
    // CREATIVE WORKSHOPS — the house rule that set the tone of the room: shoes off, please.
    "/way/projects/the-timberland-studio/gallery-2-timberland-the-studio-x-we-are-young-agencyxx-2-1900x1267.webp",
  ],
  "adidas-tango-league": [
    // CREATIVE SET-UP — the build on the esplanade: colour blocks, letters, lights on the deck.
    "/way/projects/adidas-tango-league/gallery-1-adidas-tango-league-x-we-are-young-agencyxx-1-ninho-1-1900x1267.webp",
    // TOURNAMENT — one on one on the brick, the league's name on the boards behind.
    "/way/projects/adidas-tango-league/gallery-4-adidas-tango-league-x-we-are-young-agencyxx-1-ninho-4-1900x1267.webp",
    // ENTERTAINMENT — the whole square turned out, La Défense standing over the pitch.
    "/way/projects/adidas-tango-league/gallery-5-adidas-tango-league-x-we-are-young-agencyxx-1-ninho-5-1900x1267.webp",
    // E-SPORTS — the crossover shirt the tie-up was built on, phones up around it.
    "/way/projects/adidas-tango-league/gallery-2-adidas-tango-league-x-we-are-young-agencyxx-1-ninho-2-1900x1267.webp",
  ],
};

/** The frames beside one word — none, one, or two. */
export function asidesFor(slug: string, index: number): string[] {
  const entry = BLOCK_ASIDES[slug]?.[index];
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}
