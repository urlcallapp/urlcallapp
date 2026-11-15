# Designed share card preview

Isolated test version. Production files outside `test/` are unchanged.

- The share button opens a sheet: optional recipient name for the message text, and a live preview of the share image.
- The share image IS the card the link opens: a 1080x1080 PNG rendered locally on a canvas from the same data as the landing page - action icon in its color, the card's title (with the name when one was entered), its detail (phone/email/text), and its action button. No generic wrapper.
- Share uses the Web Share API with the image file + a short personal text + the generated link. Feature-detected fallbacks: text+link share when image sharing is unsupported, clipboard copy when there is no Web Share API at all.
- Optional download of the card as a PNG.
- QR on the card: ready behind a flag (WANT_QR), pending owner confirmation - a small locally generated QR of the card's URL so the share text can drop the link.
- Everything is generated in the browser. No server, no external service, no accounts, no paid dependencies.
- Feature promotion into the production root must wait for owner approval.
