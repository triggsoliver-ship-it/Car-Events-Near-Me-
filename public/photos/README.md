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
**Check the filename it actually lands under after upload** before wiring it
into a listing — GitHub's web UI doesn't always keep the exact name a file was
staged under locally (this tripped us up with the Aynho photos on 15 Oct 2026).

## Photos

| File | Event | Given by | Date | Credit as |
| --- | --- | --- | --- | --- |
| `wheelfest-27-banner.jpg` | Wheelfest 27, Pontefract (seed id 1717) — in use as `imgUrl` (car-and-bike artwork cropped from the Wheelfest 27 poster, 1400x800) | Karen, Wheelfest Team, Pontefract Civic Society (events@pontefractcivicsociety.org.uk) | 19 Nov 2026 | — (sent "our two posters for the event" with the listing request; no credit asked for) |
| `wheelfest-27-poster.jpg` | Wheelfest 27 (seed id 1717) — full poster, 900px wide, spare | Karen (as above) | 19 Nov 2026 | — |
| `wheelfest-27-1940s-ropergate-poster.jpg` | Wheelfest 27 (seed id 1717) — the 1940s Ropergate poster (same day), 900px wide, spare | Karen (as above) | 19 Nov 2026 | — |
| `nlr-vintage-transport-day-1.jpg` | Vintage Transport Day, Northampton & Lamport Railway (events/1716) — in use as `imgUrl` (his "2025_event_2.jpg", three cars by the platform) | Dan Callis, event organiser, Northampton & Lamport Railway (daniel.callis@hotmail.co.uk) | 18 Nov 2026 | — ("in case useful"; no credit asked for) |
| `nlr-vintage-transport-day-2.jpg` | Vintage Transport Day (events/1716) — spare, not currently used (his "2026_-_9.jpg") | Dan Callis (as above) | 18 Nov 2026 | — |
| `nlr-vintage-transport-day-3.jpg` | Vintage Transport Day (events/1716) — spare, not currently used (his "2026_-_2.jpg") | Dan Callis (as above) | 18 Nov 2026 | — |
| `nlr-vintage-transport-day-4.jpg` | Vintage Transport Day (events/1716) — spare, not currently used (his "2026_-_5.jpg") | Dan Callis (as above) | 18 Nov 2026 | — |
| `hebden-bridge-vintage-weekend.jpg` | Hebden Bridge Vintage Weekend (events/1715) — in use as `imgUrl` | Neil, Rotary Club of Hebden Bridge (rotaryclubofhebdenbridge@gmail.com) — his "2026_Vintage_Weekend-Sunday_1.jpg", resized to 1200x798. He also sent a Saturday Triumph line-up photo and the event logo, kept in Oli's files, not uploaded | 18 Nov 2026 | — ("Feel free to use them as you see fit"; no credit asked for) |
| `dorset-blind-association-motor-show.jpg` | Dorset Blind Association Motor Show (events/57200) — in use as `imgUrl` | Sam Baker, Community Relations Officer, Dorset Blind Association (communityrelations@dorsetblind.org.uk) | 16 Nov 2026 | — (no credit asked for or needed) |
| `hills-ford-stages-water-splash.jpg` | Hills Ford Stages Rally | Steve Andrews, Media Officer, Hills Ford Stages (media@hillsfordstages.co.uk) | 14 Sep 2026 | Hills Ford Stages |
| `godalming-classic-car-show.jpg` | Godalming Classic Car Show (events/45467) | Stefan Reynolds (stef.reynolds@gmail.com) | 26 Sep 2026 | — (their own 2027 logo; no credit asked for or needed) |
| `ThreeCastles26WA-7807.jpeg` | Three Castles Trial (events/1703) — in use as `imgUrl` | Ian Crammond, Event Director, Three Castles (ian@three-castles.co.uk) | 15 Oct 2026 | Three Castles / Will Aron |
| `ThreeCastles26WA-7665.jpeg` | Three Castles Trial (events/1703) — spare, not currently used | Ian Crammond, Event Director, Three Castles (ian@three-castles.co.uk) | 15 Oct 2026 | Three Castles / Will Aron |
| `ThreeCastles26WA-3117.jpeg` | Three Castles Trial (events/1703) — spare, not currently used | Ian Crammond, Event Director, Three Castles (ian@three-castles.co.uk) | 15 Oct 2026 | Three Castles / Will Aron |
| `ThreeCastles26WA-3584.jpeg` | Three Castles Trial (events/1703) — spare, not currently used | Ian Crammond, Event Director, Three Castles (ian@three-castles.co.uk) | 15 Oct 2026 | Three Castles / Will Aron |
| `AynhoClassicCarShow26-2.jpeg` | Aynho Classic Car Show (events/1705) — in use as `imgUrl` | Jerry Stephenson (Jerry.stephenson@aynho-pc.gov.uk) | 15 Oct 2026 | — (no credit asked for or needed) |
| `AynhoClassicCarShow26-1.jpeg` | Aynho Classic Car Show (events/1705) — spare, not currently used | Jerry Stephenson (Jerry.stephenson@aynho-pc.gov.uk) | 15 Oct 2026 | — (no credit asked for or needed) |
| `AynhoClassicCarShow26-3.jpeg` | Aynho Classic Car Show (events/1705) — spare, not currently used | Jerry Stephenson (Jerry.stephenson@aynho-pc.gov.uk) | 15 Oct 2026 | — (no credit asked for or needed) |

**Note on `dorset-blind-association-motor-show.jpg`:** added via the `file_upload` route (an attachment forwarded through Claude in chat), not a local drag-and-drop, so the usual "resize before uploading" step in rule 5 wasn't available — only the exact attachment file could be uploaded, not a recompressed copy. It landed at ~1.19 MB, well over the 40–280 KB guideline. Works fine, just heavier than it should be. Worth swapping for a resized version (≈1200×800, optimised JPEG) next time anyone's in there.

**Note on `hebden-bridge-vintage-weekend.jpg` and `nlr-vintage-transport-day-*.jpg`:** also added via the Chrome `file_upload` route, but the attachments were resized in the cloud workspace first and the resized copies uploaded, so they land at ~220-350 KB. That is the way to do it.
