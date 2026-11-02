# Prompt 1 of 4 (hardest): Orbit Lab, Physics

You are building **Orbit Lab**, a gravity sandbox for a high school physics class. It is one of four labs in the Amplitude team's entry for the Pomfret School Fall Hack-a-Thon 2026. The audience is physics teachers: first they watch a demo, then they should want to use it in class.

- Folder: `physics/`. Department pill: "Physics". Accent: violet #8B5CF6 with cyan #22D3EE.

## The idea
Students fling planets around a star with a slingshot drag, watch real orbits form, and see Newton's law of gravitation and Kepler's three laws appear live on screen.

## Physics model (get this right first)
- `engine.gravity.scale = 0`, sleeping off. Every body: frictionAir 0 (or orbits spiral in), friction 0, isSensor true so bodies pass through each other and you handle collisions yourself.
- In beforeUpdate, apply Newtonian gravity between every pair with `Body.applyForce`: a = G·M / (r² + ε²) with a small softening ε. In Matter 0.20 each step does velocity += (force / mass) · Δt², with Δt in ms (1000/60). So to get an acceleration a in px per step², apply force = mass · a / Δt². If unsure, read Body.update in the CDN source.
- Units shown to students: AU, years, solar masses (M☉). Scale it so 1 AU = 200 world px and a circular orbit at 1 AU around 1 M☉ takes 1 year = 8 seconds at 1× speed. Then Kepler's third law reads T² = a³ / M exactly, and the lab can prove it.
- Acceptance test: the "Circular orbit" scenario must hold its radius within 2% for 5 orbits. Fix the scaling until it does.
- Collisions: on collisionStart between two bodies, queue a merge and apply it after the step. Conserve mass and momentum, new radius from the combined area, particle burst and flash. A planet that hits the star is absorbed and the star pulses.
- Time warp: pause, 0.5×, 1×, 2×, 4×, 8×, done with substeps, never by increasing Δt.
- Cap about 80 bodies. Asteroids are test particles: they feel gravity but exert none, so a belt is cheap.

## Interaction
- Drag on empty space = slingshot launch. Pull back and release: the planet flies opposite the pull, speed proportional to pull length. While dragging, show:
  - A predicted path: integrate a ghost particle 2 to 3 orbits ahead against the current bodies (held fixed for the preview), dotted and fading. Green if bound (total energy < 0), orange if it will escape.
  - A speed gauge: launch speed as a multiple of circular speed v_c = √(GM/r), with tick marks at v_c and escape speed v_esc = √(2GM/r) for that distance.
- Click a body to select it (Matter.Query.point): it gets a ring and its numbers fill Live data. Scroll zooms around the cursor, right-drag or space+drag pans, F follows the selected body, R resets the view, 1 to 7 load scenarios, Space pauses, Delete removes the selected body.
- Controls: G strength, star mass (0.5 to 5 M☉), next planet mass, time warp, Clear, Add asteroid belt.

## Layers (each toggles in the Layers section and with its key)
1. Space (always on): 3-layer parallax starfield with gentle twinkle and a faint nebula gradient. The star has a pulsing corona and bloom. Planets are shaded with a radial gradient lit from the star's direction.
2. Trails (T): fading glowing trails with additive blending.
3. Vectors (V): velocity arrows (cyan) and gravity force arrows (violet) on each body, scaled to stay readable.
4. Gravity well (G): a spacetime grid that bends toward masses (displace grid points toward each mass, capped). The Lesson panel says it is a picture of field strength, not real general relativity.
5. Kepler sweep (K): on the selected planet, shade the area swept by the star-to-planet line in equal time slices, alternating two colors, and label each slice's area. Equal numbers = Kepler's second law.
6. X-ray (X): Matter.Render debug overlay (see shared rules).

## Live data
- Selected body: distance (AU), speed, kinetic, potential and total energy, bound or escaping, measured orbital period (count angle wraps), eccentricity estimate. A small live chart of KE, PE and total energy, so students see the total stay flat while KE and PE trade.
- Kepler table: every orbiting planet's a (AU), measured T (years), T², a³ and T² ÷ (a³/M). The last column should sit near 1.00. "Copy as CSV" button.

## Scenarios (each loads instantly, with a one-line caption in the top HUD)
1. Circular orbit
2. Ellipse and Kepler's second law (sweep layer on)
3. Four planets and Kepler's third law (table open)
4. Escape velocity: three probes launched at 0.9, 1.0 and 1.1 × v_esc
5. Gravity assist: a probe swings behind a moving planet and leaves faster, and its speed graph jumps. Tune until it visibly works.
6. Binary stars with a planet orbiting both
7. Three-body figure-eight: three equal masses with the known G = 1 initial conditions x₁ = (−0.97000436, 0.24308753), x₂ = −x₁, x₃ = (0, 0), v₃ = (−0.93240737, −0.86473146), v₁ = v₂ = −v₃/2, scaled to the world. Caption: stable for a few loops, then chaos, which is the point.

## Lesson panel (for the teacher)
Predict, Observe, Explain cards for three activities (double the star's mass; launch at exactly v_esc; compare inner and outer planet periods), the key equations (F = Gm₁m₂/r², v_c, v_esc, T² = a³/M), and three discussion questions.

## Build phases (push after each)
1. About 10 minutes: engine, gravity, star, slingshot launch, trails, starfield, top bar and sidebar shell. The circular-orbit test passes.
2. Prediction path, speed gauge, selection, Live data, energy chart, scenarios 1 to 4, time warp, camera.
3. Kepler sweep and table, gravity well, vectors, merges, scenarios 5 to 7, X-ray, Lesson, intro card, Present and Help, polish.

---

## Shared rules (identical in all four Amplitude Labs prompts)

### Where the code goes
- Repo: https://github.com/CaydenAuyang/hackathon-physics (public). If you are not already inside a clone of it, `git clone` it and work there.
- Create ONLY `physics/index.html`. Do not create, edit or delete anything else in the repo: three teammates are pushing their own labs to the same repo right now.
- One self-contained file with inline CSS and JS. The only external resources allowed are Matter.js `https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js` and Google Fonts (Inter, JetBrains Mono). No other libraries, no build step, no image files. It must work on GitHub Pages and when the file is double-clicked.
- After each working phase: `git add physics && git commit -m "<short message>" && git pull --rebase && git push`. If the push is refused for permissions, keep building and tell me at the end.
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
- Reply with what you built, the live link https://caydenauyang.github.io/hackathon-physics/physics/ (it updates about a minute after a push), and three sentences I can say in the demo.
