# Organiser-supplied event photography

Photos in this folder were **given to us by the event's organiser** for use on
their listing. They are served from our own origin (`/photos/<file>`), not
hotlinked from anyone else's server.

This is the preferred way to illustrate a listing. The alternatives are worse:

- **Hotlinking a brand's own photo** (the `proxy(...)` rules in
  `lib/venueImages.ts`) works, but nothing in it is under a written licence. In
  September 2026 The British Motor Show asked us to stop using one of theirs —
  see the note in that file and `BLOCKED_IMAGE_HOSTS` in `lib/util.ts`.
- **Licence-free stock** (Pexels) is safe but generic, and an organiser can
  spot a wrong one instantly. Hills Ford Stages did: we put a gravel-rally photo
  on a closed-tarmac rally.

## Rules for this folder

1. **Only add a photo the organiser has given us**, and record it in the table
   below: who gave it, when, and how they asked to be credited.
2. **Credit them on the page.** `IMAGE_CREDITS` in `lib/venueImages.ts` maps an
   event title to a credit line, which the event page renders under the banner.
   A photo with no entry there shows no credit — so add both together.
3. **Resize to 1200x800 JPEG** before committing (that is the hero crop, and
   matches the other images already in `public/`). Full-size camera originals
   are several megabytes and slow the page down for no visible gain.
4. **Read what the image actually says**, not just whether we may use it. Hills
   Ford also sent a Weston Park "BOOK YOUR TICKETS TODAY" graphic with a See
   Tickets QR code on it. We list events; we do not sell tickets, and running
   that image would have said otherwise.

## Photos

| File | Event | Given by | Date | Credit as |
| --- | --- | --- | --- | --- |
| `hills-ford-stages-water-splash.jpg` | Hills Ford Stages Rally | Steve Andrews, Media Officer, Hills Ford Stages (media@hillsfordstages.co.uk) | 14 Sep 2026 | Hills Ford Stages |
