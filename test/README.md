# Contact card + QR preview

Isolated test version. Production files outside `test/` are unchanged.

- One contact-card link with a name, phone action buttons and optional email.
- Phone action buttons can be selected individually. At least one usable contact action is required.
- Contact details are encoded in the URL fragment, not stored in an app database. Anyone holding the complete link or QR can read them. No secrets.
- Local QR generation and PNG download for every generated link. No external QR service, backend, accounts or paid dependencies.
- QR library: `qrcode` (MIT), bundled in `vendor/qr.js`, license alongside it.
- Static link previews are generic. Personal names are not rendered in social thumbnails.
- This preview does not auto-open a contact action. The recipient chooses a button.
- Feature promotion into the production root must wait for owner approval.
