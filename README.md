# Maneth Amarasinghe | Portfolio Website
 
A personal portfolio site for Maneth Amarasinghe, a BSc (Hons) Computer Science undergraduate at the Informatics Institute of Technology (IIT Campus), Sri Lanka. It is plain HTML, CSS and JavaScript with no build step and no dependencies.
 
## Pages
 
| File | Page |
| --- | --- |
| `index.html` | Home: intro, skills I'm developing, learning journey |
| `projects.html` | Projects: Thaari Solutions (featured), StudySprint, FestConnect, The Ocean's Pulse, PsyCare, Gundown, Recipe Book Manager |
| `skills.html` | Technical and professional skills |
| `education.html` | Education timeline and leadership |
| `certifications.html` | 15 courses with search and category filters |
| `contact.html` | Email, WhatsApp, LinkedIn, GitHub |
 
## Project structure
 
```
.
├── index.html
├── projects.html
├── skills.html
├── education.html
├── certifications.html
├── contact.html
├── style.css              # theme, layout, cards, buttons, responsive rules
├── footer.css             # footer, social buttons, Thaari feature card, shared hover ring, contact icons
├── script.js              # menu, copy email, certificate filter, hero cursor motion
├── footer-snippet.html    # the footer markup, pasted into every page
├── logo.png               # logo (green lettering)
├── logo-black.png         # alternative logo (black lettering)
└── (assets you add, see below)
```
 
### Assets the pages expect
 
These files are referenced by the HTML and must sit in the same folder:
 
- `favicon.svg`
- `maneth-amarasinghe.jpg` (home page portrait, 422 x 520)
- `Maneth-Amarasinghe-CV.pdf` (Download CV button)
- `thaari-logo.png` (featured project card)
- `recipe-book.jpg` (optional, falls back to an online image, then to the "RB" tile)
## Run locally
 
Open `index.html` in any browser. For a local server instead:
 
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
 
## Deploy
 
Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). For GitHub Pages: push the files to a repository, then go to Settings > Pages and choose the branch and root folder.
 
## Customising
 
- **Colours:** edit the variables at the top of `style.css` (`--forest`, `--leaf`, `--mint`, and so on).
- **Footer:** the footer is repeated in every page. Edit `footer-snippet.html`, then paste the change into each page.
- **Certificates:** add a card inside the matching `.cgroup` section in `certifications.html`, with `data-cat` set to `se`, `ai`, `ms`, `ux` or `cm`. Update the "All (15)" count and the page description.
- **Logo lettering:** to use the black version, rename `logo-black.png` to `logo.png`.
- **Hero motion:** the tilt and magnet values are in `script.js` under "Home hero". The effect only runs on devices with a mouse and is turned off when the visitor prefers reduced motion.
## Behaviour notes
 
- Every card and box gets a green-teal ring on hover, keyboard focus or tap. The last box clicked keeps the ring until you click elsewhere.
- The mobile menu closes on link click, on Escape, and when the window grows past 820px.
- "Copy email" falls back to an older copy method when the Clipboard API is unavailable.
- The layout uses `calc()` and `max-width` instead of `min()` for wider browser support, and includes `-webkit-` prefixes for Safari.
- Certificate buttons open the LinkedIn posts I shared. They are not independently verified credentials.
## Contact
 
- Email: manethamarasinghe@gmail.com
- LinkedIn: https://www.linkedin.com/in/maneth-amarasinghe/
- GitHub: https://github.com/maneth-amarasinghe-cyber
&copy; 2026 Maneth Amarasinghe. All rights reserved.
 