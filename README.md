# Amplitude Labs

Team Amplitude's entry for the Pomfret School Fall Hack-a-Thon 2026: four interactive Matter.js labs, one per department.

**All labs:** https://caydenauyang.github.io/hackathon-physics/

| # | Lab | Department | Live link | Prompt |
| --- | --- | --- | --- | --- |
| 1 | Orbit Lab | Physics | https://caydenauyang.github.io/hackathon-physics/physics/ | [prompts/1-physics-orbit-lab.md](prompts/1-physics-orbit-lab.md) |
| 2 | Gravity Piano | Music | https://caydenauyang.github.io/hackathon-physics/music/ | [prompts/2-music-gravity-piano.md](prompts/2-music-gravity-piano.md) |
| 3 | Lingo Drop | World Languages (Spanish, French) | https://caydenauyang.github.io/hackathon-physics/languages/ | [prompts/3-languages-lingo-drop.md](prompts/3-languages-lingo-drop.md) |
| 4 | Galton Lab | Statistics | https://caydenauyang.github.io/hackathon-physics/stats/ | [prompts/4-stats-galton-lab.md](prompts/4-stats-galton-lab.md) |

Prompts go from hardest (1) to simplest (4).

## Team

Cayden (lead), Christoph, Ronan, James H.

## How to build your lab

1. Accept the GitHub invite (email, or https://github.com/CaydenAuyang/hackathon-physics/invitations).
2. Open your prompt file above, click the copy icon ("Copy raw file"), and paste it into Claude Code or Cursor's agent. It clones the repo, builds your lab in its own folder and pushes after each phase.
3. No coding tool? Paste the prompt into claude.ai, download the file it gives you, then on github.com open your lab's folder and use Add file > Upload files to add it as `index.html`.

**Rule #1: only touch your own folder.** Four people push to this repo at the same time.

Each lab is one self-contained `index.html` using Matter.js 0.20.0 from cdnjs. No build step.
