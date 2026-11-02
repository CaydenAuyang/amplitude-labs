# Prompt 4 of 4 (simplest): Galton Lab, Statistics

You are building **Galton Lab**, a probability and statistics lab for a high school math class. It is one of four labs in the Amplitude team's entry for the Pomfret School Fall Hack-a-Thon 2026. The audience is math teachers: first they watch a demo, then they should want to use it in class.

- Folder: `stats/`. Department pill: "Statistics". Accent: sky #38BDF8 with violet #A78BFA.

## The idea
A Galton board where every falling ball is a coin-flip experiment. The physical stacks in the bins become a histogram, and the statistics (binomial distribution, normal curve, empirical rule, law of large numbers, sampling distributions, Pascal's triangle) are drawn live on top.

## Physics
- A funnel at the top, a triangular grid of static circular pegs (Rows slider, 4 to 16, rebuilds the board), and one bin per possible outcome (rows + 1) made of static dividers.
- Each peg row is one Bernoulli trial. On collisionStart between a ball and a peg, set the ball's horizontal velocity (Body.setVelocity) so it heads one peg gap right with probability p and left otherwise, plus a small random wobble. Tune restitution, friction and nudge strength so a ball makes exactly one decision per row. Record each ball's path as a string like LRRLR.
- Acceptance test: with p = 0.5, 12 rows and 2000 balls, the sample SD lands within 10% of √(np(1−p)) and the sample mean within 0.3 of np. Fix the tuning until it does.
- Pure physics toggle: no nudges. Instead a Tilt slider tilts the board (engine.gravity.x) and the lab estimates p̂ from the data. This sets up a model vs reality discussion.
- Performance: once a ball settles in a bin, remove its body and draw it as part of a packed stack, so active bodies stay under about 250 while totals reach thousands. Sleeping on.
- Drop buttons: 1, 10, 100, 1000 (streamed at an adjustable rate), and Reset.

## Layers (each toggles in the Layers section and with its key)
1. Board (always on): a glass board, glowing pegs that pulse when hit, balls colored by bin along a smooth gradient, bins as glass tubes, faint graph-paper background.
2. Histogram (H): count and relative frequency above each bin.
3. Binomial (B): the expected counts N · C(n,k) · p^k · (1−p)^(n−k) as glowing dots on each bin.
4. Normal curve (N): N(np, np(1−p)) scaled to the counts as a smooth glowing line, with a mean line and ±1σ, ±2σ, ±3σ markers.
5. Empirical rule (E): shaded σ bands with the live percentage inside 1σ, 2σ and 3σ next to 68%, 95% and 99.7%.
6. Pascal (P): Pascal's triangle numbers on the pegs and the number of paths to each bin, C(n,k), under it. Highlight one ball's path live: its pegs light up and its LR string shows.
7. X-ray (X): Matter.Render debug overlay (see shared rules), with showSleeping.

## Charts (a bottom strip under the board)
- Law of large numbers: the running mean against the number of balls, converging to np inside a shrinking band.
- Sampling distribution: draw random samples of size k (slider 1 to 30) from the results and plot the distribution of the sample means. Show its SD next to σ/√k so students see they match.

## Live data
N, mean, SD, theoretical mean and SD, p̂, skewness, and a chi-square goodness-of-fit statistic with its p-value. "Copy counts as CSV" button.

## Scenarios (each loads instantly, with a one-line caption in the top HUD)
1. Bell curve (p = 0.5, 12 rows)
2. Skew it (p = 0.25)
3. Few vs many rows (4 rows, then 16)
4. Empirical rule
5. Law of large numbers
6. Sampling distribution
7. Pure physics vs the model

## Lesson panel (for the teacher)
Predict, Observe, Explain activities (sketch the shape before dropping 1000 balls; what changes as p moves; why more rows look more normal), the formulas P(X = k) = C(n,k) p^k (1−p)^(n−k), μ = np and σ = √(np(1−p)), and three discussion questions.

## Build phases (push after each)
1. About 10 minutes: sidebar shell, board, pegs, bins, drops with the p nudge, stacking, histogram counts. The acceptance test passes.
2. Binomial dots, normal curve, σ bands, Live data, scenarios, Rows and p sliders, settled-ball baking for performance.
3. Pascal layer and path highlight, law of large numbers and sampling charts, chi-square, Pure physics mode, X-ray, Lesson, intro card, Present and Help, polish.

---

## Shared rules (identical in all four Amplitude Labs prompts)

### Where the code goes
- Repo: https://github.com/CaydenAuyang/hackathon-physics (public). If you are not already inside a clone of it, `git clone` it and work there.
- Create ONLY `stats/index.html`. Do not create, edit or delete anything else in the repo: three teammates are pushing their own labs to the same repo right now.
- One self-contained file with inline CSS and JS. The only external resources allowed are Matter.js `https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js` and Google Fonts (Inter, JetBrains Mono). No other libraries, no build step, no image files. It must work on GitHub Pages and when the file is double-clicked.
- After each working phase: `git add stats && git commit -m "<short message>" && git pull --rebase && git push`. If the push is refused for permissions, keep building and tell me at the end.
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
- Reply with what you built, the live link https://caydenauyang.github.io/hackathon-physics/stats/ (it updates about a minute after a push), and three sentences I can say in the demo.
