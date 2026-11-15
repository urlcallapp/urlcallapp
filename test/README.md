# Designed share card preview

Isolated test version. Production files outside `test/` are unchanged.

- The share button opens a sheet with a live preview of the share image plus share / save / cancel actions. The shared message carries no marketing text - just the link itself alongside the image (owner-confirmed).
- The share image IS the card the link opens: a 1080x1080 PNG rendered locally on a canvas from the same data as the landing page - action icon in its color, the card's title (with the name when one was entered), its detail (phone/email/text), and its action button. No generic wrapper.
- Share uses the Web Share API with the image file + a short personal text + the generated link. Feature-detected fallbacks: text+link share when image sharing is unsupported, clipboard copy when there is no Web Share API at all.
- Optional download of the card as a PNG.
- QR on the card (owner-confirmed): a small locally generated QR of the card's URL, as a bonus on top of the link in the share text. The card headline is the entered name alone; the action is conveyed by the matching icon.
- Everything is generated in the browser. No server, no external service, no accounts, no paid dependencies.
- Feature promotion into the production root must wait for owner approval.
