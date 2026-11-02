# Hackathon Physics Game

Our group's Matter.js project for the ADV Computer Coding Hack-a-Thon (Mr. Lake, D block).

**Play it:** https://caydenauyang.github.io/hackathon-physics/

**Code:** https://github.com/CaydenAuyang/hackathon-physics

## Team

| Person | Role | Owns these files |
| --- | --- | --- |
| Cayden | Lead and integrator | `js/main.js`, `js/config.js`, `index.html` |
| Teammate 1 | World builder | `js/world.js` |
| Teammate 2 | Controls | `js/controls.js` |
| Teammate 3 | Rules and look | `js/rules.js`, `style.css` |

**Rule #1: only edit your own file.** That way nobody overwrites anyone else.

## How to run it

- Easiest: open the GitHub Pages link above. It updates about a minute after each commit.
- On your laptop: download the repo (green Code button, Download ZIP), unzip, double-click `index.html`.

## How to make a change (no git needed)

1. Open the repo on github.com and click your file (for example `js/world.js`).
2. Click the pencil icon to edit.
3. Make your change, then click **Commit changes**, write a short message like "add ramp", and commit to `main`.
4. Wait a minute, refresh the Pages link, and check it still works.

If it breaks, open the browser console (right-click, Inspect, Console) and read the red error. Tell Cayden if you're stuck for more than 5 minutes.

## How the code fits together

- `config.js` makes one shared object called `Game` (size, colors, score, helpers).
- `world.js` adds bodies: walls, platforms, boxes, the player, the goal.
- `controls.js` handles keyboard and mouse.
- `rules.js` listens for collisions and changes the score or message.
- `main.js` starts Matter.js and calls the three functions above.

Matter.js docs: https://brm.io/matter-js/docs/ and demos: https://brm.io/matter-js/demo/
