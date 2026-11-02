# Prompt 2 of 4: Gravity Piano, Music

You are building **Gravity Piano**, a physics-powered piano for a high school music class. It is one of four labs in the Amplitude team's entry for the Pomfret School Fall Hack-a-Thon 2026. The audience is music teachers: first they watch a demo, then they should want to use it in class.

- Folder: `music/`. Department pill: "Music". Accent: amber #F59E0B with pink #F472B6.

## The idea
A three-octave piano where gravity plays the notes. Glowing note-balls fall onto physical keys that dip on springs and sound with a real synthesized piano tone. Students play it, watch famous melodies play themselves, build Rube Goldberg music machines, and see the theory (note names, intervals, chords, scales, frequencies) light up as it plays.

## Keyboard (Matter bodies)
- C3 to C6: 37 keys, 22 white, across the bottom of the world. Each key is a dynamic rectangle with infinite inertia, held by two spring Constraints to points above it (stiffness about 0.06, damping about 0.2), so it dips when hit and springs back. A static bed under the keys limits travel.
- Black keys are shorter and stand a few px higher than the white keys so balls hit them first, like a real piano. Keys never collide with each other (collisionFilter group) but do collide with balls.
- When a ball hits a key (collisionStart): play the note, loudness from impact speed, light the key in its note color, draw a ripple ring at the contact point, float the note name up and fade it. Let the ball bounce once (restitution about 0.3) and dissolve it into particles about 150ms after its first hit, so the key visibly dips first.

## Sound (Web Audio, no audio files)
- f = 440 · 2^((midi − 69) / 12).
- Piano voice: 5 or 6 additive partials with falling amplitudes and slight inharmonicity, a 5ms attack, an exponential decay that lasts longer for low notes, a lowpass filter whose cutoff falls during the note (brightness fades like a real string), and a 15ms filtered-noise hammer click.
- Master chain: DynamicsCompressor, then a ConvolverNode reverb built from a generated decaying-noise impulse (wet slider), then master volume.
- Instruments: Grand, Music box (bright and bell-like), Marimba (warm and short). Same pipeline, different partial recipes.
- Audio starts from the intro card's Start button (browsers require a click). Cap polyphony at about 24 voices and disconnect nodes when they finish.

## Ways to play
1. Play: click a key to strike it directly. The computer keyboard drops a ball above a key: A W S E D F T G Y H U J K = C up to the next C, and Z / X shift the octave. A "Drop height" slider shows the fall time t = √(2h/g) next to it, so physics and music meet in one line.
2. Songs: Ode to Joy, Twinkle Twinkle Little Star, Frère Jacques, and the opening of Für Elise, accurate in pitch and rhythm, with a tempo slider. Every ball drops from the same height, so the fall time is constant: release each ball exactly one fall time before its beat and the melody lands in rhythm. Measure the fall time once in a hidden Matter engine with the same settings (balls use frictionAir 0). Show the upcoming balls in a falling-notes lane above the keys.
3. Music machine: click to place a round bumper, drag to draw an angled ramp (static bodies), right-click or Delete removes one. An emitter drips balls at the tempo, so students design a contraption that plays a pattern. Presets: Waterfall (cascade of ramps), Pinball (bumpers), Staircase (ascending scale). Save the current machine in localStorage.
4. Rain: random drops across the keyboard at the tempo.
- Scale lock: Off, Major, Minor, Pentatonic, Blues, with a root note. Out-of-scale keys dim and any hit snaps to the nearest in-scale note. Lesson tip: turn on Pentatonic during Rain and ask the class why random notes suddenly sound good.

## Layers (each toggles in the Layers section and with its key)
1. Stage (always on): dark concert-hall gradient, a soft spotlight cone on the keyboard, glossy keys with highlights and shadows, glowing balls with motion trails.
2. Note names (N) on the keys and on the floating labels.
3. Theory (I): after two notes, an arc between them labeled with the interval name, semitones and frequency ratio (for example: perfect fifth, 7 semitones, 3:2). Chord mode (C): clicking a key drops a whole triad (major, minor, diminished or augmented) and shows its name and notes.
4. Spectrum (S): AnalyserNode frequency bars and waveform as a glowing band across the top.
5. Staff (M): the last 16 notes drawn correctly on a grand staff (treble and bass clef, ledger lines, sharps), scrolling left.
6. X-ray (X): Matter.Render debug overlay showing the key springs and contacts.

## Live data
Last note (name, octave, MIDI number, frequency in Hz), notes per second, active voices, current scale and its notes.

## Lesson panel (for the teacher)
Three Predict, Observe, Explain activities (an octave doubles the frequency; why the pentatonic scale sounds good over anything; how drop height changes timing) and the key facts: 12-tone equal temperament, the frequency formula, common interval ratios.

## Build phases (push after each)
1. About 10 minutes: keys on springs, ball drops, collision-to-note with the piano voice, Start card, sidebar shell, computer-keyboard play.
2. Songs with fall-time scheduling, scale lock, Rain, instruments, reverb, note names, Live data.
3. Music machine with bumpers, ramps and presets, theory arcs and chords, spectrum, staff, X-ray, Lesson, Present and Help, polish.

---

## Shared rules (identical in all four Amplitude Labs prompts)

### Where the code goes
- Repo: https://github.com/CaydenAuyang/amplitude-labs (public). If you are not already inside a clone of it, `git clone` it and work there.
- Create ONLY `music/index.html`. Do not create, edit or delete anything else in the repo: three teammates are pushing their own labs to the same repo right now.
- One self-contained file with inline CSS and JS. The only external resources allowed are Matter.js `https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js` and Google Fonts (Inter, JetBrains Mono). No other libraries, no build step, no image files. It must work on GitHub Pages and when the file is double-clicked.
- After each working phase: `git add music && git commit -m "<short message>" && git pull --rebase && git push`. If the push is refused for permissions, keep building and tell me at the end.
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
- Reply with what you built, the live link https://caydenauyang.github.io/amplitude-labs/music/ (it updates about a minute after a push), and three sentences I can say in the demo.
