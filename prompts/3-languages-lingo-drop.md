# Prompt 3 of 4: Lingo Drop, World Languages (Spanish and French)

You are building **Lingo Drop**, a physics vocabulary and grammar game for high school Spanish and French classes. It is one of four labs in the Amplitude team's entry for the Pomfret School Fall Hack-a-Thon 2026. The audience is language teachers: first they watch a demo, then they should want to use it in class.

- Folder: `languages/`. Department pill: "World Languages". Accent follows the language: Español is warm (#F97316 with #FACC15), Français is cool (#3B82F6 with #F43F5E). Use emerald #10B981 on the intro card.

## The idea
Word cards in Spanish or French rain into a physics playfield. Students grab each card and fling it into the right bin before the pile overflows. Three modes cover what teachers actually drill: vocabulary themes, noun gender and verb conjugation. Every card can be heard aloud with a native-accent voice.

## Physics
- Cards: rounded rectangles (Bodies.rectangle with chamfer) sized to the word, dropped with a little spin into a central tray where they stack and tumble. Sleeping on for settled cards.
- Bins: 2 to 6 glass bins along the bottom and sides. Each is a compound body (Body.create with parts: two walls and a floor) with a sensor inside. A card reaching the sensor gets checked.
- Grab with your own constraint (see shared rules) and fling by releasing while moving. A Shake button applies random impulses to the tray.
- Correct: the bin glows, the card bursts into accent-colored particles, points with a combo multiplier, a soft Web Audio chime.
- Wrong: the card is ejected back into play with an impulse, the bin shakes red, and a toast shows the right answer (for example "la manzana: feminine, the apple").
- Pressure: the spawn rate ramps up. If the pile stays above a danger line for 3 seconds, the round ends. Options: timed round (60 or 120 seconds) and a calm Practice mode with no fail.

## Modes
1. Themes: bins are themes labeled in the target language, 4 per round, drawn from: la comida / la nourriture, la familia / la famille, la ropa / les vêtements, la casa / la maison, el cuerpo / le corps, los colores / les couleurs.
2. Gender: two bins, masculine and feminine (el / la, le / la). Cards show the noun without its article. An optional "Tricky words" set, flagged as such:
   - Spanish: el día, el mapa, el problema, el idioma, el planeta, la mano, la foto, la moto, el agua (a feminine noun that takes el; explain this in the toast).
   - French: le musée, le lycée, le silence, le problème, la plage, la page, la fin, la main, la mer, la photo.
3. Conjugation: bins are subject pronouns (Spanish: yo, tú, él/ella/usted, nosotros, vosotros, ellos/ustedes; French: je, tu, il/elle/on, nous, vous, ils/elles). Cards are present-tense forms of regular -ar/-er/-ir verbs (Spanish) or -er/-ir/-re verbs (French), plus ser, estar, tener, ir and être, avoir, aller, faire. A form counts as correct in every bin where it is valid: French je parle and il parle are identical, and the toast points that out. The infinitive and its meaning show small under each card.

## Content
- Built-in word banks: at least 15 words per theme per language and at least 30 gender words per language, all common high school vocabulary with standard, unambiguous gender. Avoid words whose gender changes the meaning (le/la tour, le/la livre, el/la capital). Double-check every article, accent and conjugation: a teacher will spot any mistake.
- Teacher list: a panel where a teacher pastes lines in the form `word | bin | hint (optional)`. Bins are created from the distinct bin labels (2 to 6). Saved in localStorage. This makes the lab work for any lesson: ser vs estar, past tenses, anything.

## Speech
speechSynthesis with lang es-ES or fr-FR (pick the best matching voice available) speaks a card when it is picked up, and the answer in the toast. On/off toggle and a rate slider. If the browser has no voice for the language, hide the feature quietly.

## Layers (each toggles in the Layers section and with its key)
1. Scene (always on): a gradient that shifts with the language, a slow parallax of faint drifting accented characters in the background (á é í ó ú ñ ¿ ¡ for Spanish, é è ê à ç œ « » for French), glossy cards with soft shadows, glass bins with glowing labels.
2. Hints (H): English meaning on each card. Off by default.
3. Heat (E): tint each bin by the class's accuracy for it, so the teacher sees which category is hardest.
4. X-ray (X): Matter.Render debug overlay (see shared rules).

## Live data
Score, combo, accuracy, cards sorted, best streak, accuracy per bin. End-of-round summary card: accuracy, time, best streak and "Words to review" with the correct answers, plus a "Copy results" button.

## Lesson panel (for the teacher)
How to run it with a class (projector with one student at the board, or teams taking turns), and the grammar rule behind each mode in one short paragraph each, for Spanish and for French.

## Build phases (push after each)
1. About 10 minutes: sidebar shell, tray, card spawning, grab and fling, compound bins with sensors, Gender mode working in Spanish.
2. French, Themes and Conjugation modes, scoring and combo, toasts, speech, end-of-round summary.
3. Teacher list, Tricky words, layers, X-ray, Lesson, intro card, Present and Help, polish.

---

## Shared rules (identical in all four Amplitude Labs prompts)

### Where the code goes
- Repo: https://github.com/CaydenAuyang/amplitude-labs (public). If you are not already inside a clone of it, `git clone` it and work there.
- Create ONLY `languages/index.html`. Do not create, edit or delete anything else in the repo: three teammates are pushing their own labs to the same repo right now.
- One self-contained file with inline CSS and JS. The only external resources allowed are Matter.js `https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js` and Google Fonts (Inter, JetBrains Mono). No other libraries, no build step, no image files. It must work on GitHub Pages and when the file is double-clicked.
- After each working phase: `git add languages && git commit -m "<short message>" && git pull --rebase && git push`. If the push is refused for permissions, keep building and tell me at the end.
- If you have no file or terminal access (a chat window), reply with the complete file in a single code block instead.
- Time box: about 30 minutes total. Phase 1 must be working and pushed within about 10 minutes. Never leave the file broken between phases: a working lab with fewer features beats a broken ambitious one.

### Look and feel (all four labs must look like one product called "Amplitude Labs")
- Dark, cinematic, premium. Background #070A12 with a soft radial glow in this lab's accent color. Panels are glass: rgba(255,255,255,0.04) fill, 1px rgba(255,255,255,0.08) border, backdrop-filter blur(14px), 14px radius. Text #E8EDF6, muted text #8A94A7. Inter for UI, JetBrains Mono for every number.
- Full-viewport app, no page scroll. Top bar (56px): a "← Amplitude Labs" link to `../`, the lab name, a department pill, and on the right: Layers, Present (P) and Help (?) buttons. The simulation canvas fills the left. A 340px right sidebar holds collapsible sections in this order: Scenarios, Controls, Layers, Live data, Lesson, Under the hood.
- Custom-styled controls only: sliders with JetBrains Mono value readouts, segmented buttons, toggle switches. No default browser-styled widgets. Hover and active states, 150 to 250ms transitions.
- Canvas: sharp on HiDPI screens (devicePixelRatio) and resizes with the window. Use a fixed logical world (for example 1600×900) scaled to fit, so the lab looks the same on a projector and a laptop.
- Draw the main view with your own Canvas 2D renderer: gradients, glow (shadowBlur or 'lighter' blending), particle bursts, eased animations. Never ship Matter's default flat look as the main view.
- First load: a centered intro card (lab name, one-sentence purpose, three "Try this" bullets, a Start button) over a blurred live preview. Help overlay (?) lists every shortcut. Present mode (P) hides the sidebar and enlarges the HUD text for a projector.
- Respect prefers-reduced-motion (fewer particles). Buttons get aria-labels. Hold 60 fps on a school laptop.

### Matter.js depth (this is the point of the hackathon)
- Run physics in your own requestAnimationFrame loop with a fixed step, `Matter.Engine.update(engine, 1000 / 60)`, using extra substeps for speed-up.
- X-ray layer (key X): a second transparent canvas on top, driven by `Matter.Render` with wireframes, showVelocity, showCollisions, showAngleIndicator (and showSleeping where sleeping is on), aligned exactly with your art layer by calling `Render.lookAt` with the visible world bounds. Toggle it with Render.run and Render.stop. This lets teachers see the real bodies, constraints and contacts under the art.
- Pointer input: convert pointer events to world coordinates yourself with one screenToWorld function that accounts for scale and letterboxing. To drag a body, pick it with `Matter.Query.point` and attach your own `Matter.Constraint` from the pointer to the body. Do not rely on Matter.Mouse, whose coordinate math breaks on scaled HiDPI canvases. Test dragging near all four corners.
- "Under the hood" sidebar section: list every Matter.js module you used, with one line on what it does in this lab.
- Put every tunable number in one commented CONFIG object at the top of the script so a beginner can tweak it.

### Before you finish
- Serve the page (`python3 -m http.server`) and confirm the browser console shows zero errors. If you cannot run a browser, at least extract the script and run `node --check` on it.
- Checklist: every button works, every layer toggles, every scenario loads, Present and Help work, no console errors, and it looks finished, not like a prototype.
- Reply with what you built, the live link https://caydenauyang.github.io/amplitude-labs/languages/ (it updates about a minute after a push), and three sentences I can say in the demo.
