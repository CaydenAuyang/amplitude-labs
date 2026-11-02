# Team guide for the Hack-a-Thon

For Cayden (Advanced, group lead) and three Intro teammates. Class is D block, 1:55 to 3:00.
Mr. Lake grades engagement when he walks around: discuss options, listen, compromise, include everyone, and make sure the Intro students can actually work in the GitHub repo (or that Cayden has another way to get their work in).

## Before class (Cayden, 10 minutes)

1. Create a public repo on GitHub, for example `hackathon-physics`.
2. Upload every file from this starter folder (Add file, Upload files), keeping the `js` folder.
3. Settings > Pages > Source: Deploy from a branch, Branch: `main`, folder `/ (root)`, Save.
4. Fill in the real Pages link at the top of `README.md`.
5. Settings > Collaborators > Add people, and add each teammate by GitHub username. They have to accept the email invite before they can commit.

## First 10 minutes in class: agree on the idea

Read Mr. Lake's prompt out loud together. Then each person suggests one idea in a sentence, and the group picks one in two minutes. Physics ideas that fit an hour:

- Knock-down: launch the ball to topple a tower of boxes.
- Stack it: drop shapes and build the tallest tower that doesn't fall.
- Marble run: build ramps so a ball reaches the goal.
- Dodge: stay on a platform while things fall from the sky.

Then confirm roles (table in README) and check everyone can open the repo and edit their file. Anyone without a GitHub account makes one now. If that takes too long, they paste their code into the group chat and Cayden commits it.

## Roles and first tasks

**Cayden, lead and integrator.** Keeps time, checks on each person every 10 minutes, reads the Pages link after each commit, fixes anything that breaks, and adds glue code in `main.js` or `config.js` when two parts need to talk.

**World builder (`js/world.js`).** Lay out the level for the chosen idea: move or add platforms, ramps (`Bodies.rectangle` with `angle`), stacks (`Composites.stack`), and the goal.

**Controls (`js/controls.js`).** Make the player feel right for the idea: tune move force and jump, or swap to a launch (drag and release, or click to shoot with `Body.setVelocity`).

**Rules and look (`js/rules.js`, `style.css`).** Decide how you win or lose and show it: scoring on collisions, a timer, a "You win" message, colors and the title.

## Timeline

| Time | What happens |
| --- | --- |
| 1:55 to 2:05 | Read the prompt, pick the idea, confirm roles, everyone opens their file |
| 2:05 to 2:35 | Build. Commit small changes often. Cayden checks in at 2:15 and 2:25 |
| 2:35 to 2:45 | Feature freeze. Only fixes. Cayden plays it end to end |
| 2:45 to 3:00 | Demo prep: one sentence each on what you built, then present |

## Rules that keep it from breaking

- Edit only your own file. If you need something in someone else's file, ask them.
- Commit small and often, and check the Pages link after each one.
- If the page goes blank, the last commit broke it. Open the console, read the error, or ask Cayden to undo it (History, pick the commit, Revert).

## Stretch ideas if you finish early

- Levels: a second `buildWorld` layout after the first goal.
- Sound on collisions.
- Explosions: `Body.applyForce` on all boxes when something hits.
