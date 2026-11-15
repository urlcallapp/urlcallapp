# Designed share card preview

Isolated test version. Production files outside `test/` are unchanged.

- The share button opens a sheet: optional recipient name (prefilled from the form's name field), a live preview of a branded 1080x1080 PNG card generated locally on a canvas, personalized with the name and the action type.
- Share uses the Web Share API with the image file + a short personal text + the generated link. Feature-detected fallbacks: text+link share when image sharing is unsupported, clipboard copy when there is no Web Share API at all.
- Optional download of the card as a PNG.
- Everything is generated in the browser. No server, no external service, no accounts, no paid dependencies.
- Feature promotion into the production root must wait for owner approval.
