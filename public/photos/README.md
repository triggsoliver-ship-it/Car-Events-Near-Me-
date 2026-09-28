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
2. **Credit them on the page** when they asked for a credit. `IMAGE_CREDITS` in
   `lib/venueImages.ts` maps an image URL to a credit line, which the event page
   renders under the banner. A photo with no entry there shows no credit — so
   add both together. A logo needs no credit: it says whose it is already.
3. **Size it for BOTH crops.** The same image is cropped two ways: `1080x340`
   on the event page (`.dbanner`, which crops top and bottom) and about
   `300x188` on a card (`.card .imgwrap`, which crops the sides). A photograph
   is forgiving — `1200x800` is fine. Anything with edges that matter is not:
   keep the subject inside the region both crops keep, and remember the banner
   lays a dark scrim and the event title across the bottom left.
4. **A logo is not a photo.** Composite it onto a canvas in its own brand
   colour rather than letting the crop slice it. `godalming-classic-car-show.jpg`
   is the worked example: a 2.2:1 winged logo on `1600x700` of its own dark
   green, artwork held inside the shared safe region and sat high so the title
   lands on clear colour instead of across the lettering.
5. **Keep the file small.** These are around 40-280 KB. Full-size camera
   originals are several megabytes and slow the page down for no visible gain.
6. **Read what the image actually says**, not just whether we may use it. Hills
   Ford also sent a Weston Park "BOOK YOUR TICKETS TODAY" graphic with a See
   Tickets QR code on it. We list events; we do not sell tickets, and running
   that image would have said otherwise.

## How to add one

The GitHub API path we normally commit with mangles binaries, so use the GitHub
web UI: `https://github.com/<owner>/<repo>/upload/main/public/photos`. Then set
the listing's photo URL to `https://careventsnearme.uk/photos/<file>` — in
`/admin` for a database listing, or `imgUrl` in `lib/seed*.ts` for a seed one.

## Photos

| File | Event | Given by | Date | Credit as |
| --- | --- | --- | --- | --- |
| `hills-ford-stages-water-splash.jpg` | Hills Ford Stages Rally | Steve Andrews, Media Officer, Hills Ford Stages (media@hillsfordstages.co.uk) | 14 Sep 2026 | Hills Ford Stages |
| `godalming-classic-car-show.jpg` | Godalming Classic Car Show (events/45467) | Stefan Reynolds (stef.reynolds@gmail.com) | 26 Sep 2026 | — (their own 2027 logo; no credit asked for or needed) |
