# Nippon Toyota customer experience redesign

Date: 2026-08-28
Status: Design approved in conversation. Awaiting written spec review.

## Goal

Make Nippon Toyota's website at least as useful as the current public site, while making the customer journey clearer, faster, and more appealing to an 18-35 audience. The main business outcome is more qualified vehicle enquiries and test-drive leads. Leads will be stored in a database. Staff tools, CRM workflows, and lead administration will be handled later.

## Audience and visitor mode

This is a customer-facing automotive dealer site in Persuade mode. The audience is broad within ages 18-35, with distinct routes for compact cars, SUVs, MPVs, hybrids, EVs, and premium vehicles. Visitors may be casually browsing on a phone, comparing cars with a partner, looking for a price or brochure, or ready to request a call or test drive.

## Product truth to preserve

- Nippon Toyota and Toyota brand identity, logo, approved photography, video, copy, and dealer information.
- Existing public-site breadth, including vehicles, test drives, price lists, buy-now enquiries, brochures, exchange, Q Service, accessories, used cars, loans, insurance, promotions, what's new, feedback, testimonials, events, driving school, careers, about, Toyota India, branch contact, and legal pages.
- Existing route slugs and legacy URLs wherever possible. Add redirects where the current Next.js route differs.
- Customer-facing lead submission and OTP verification behavior where it already exists.
- Existing in-progress local work. Do not overwrite unrelated changes in the working tree.

## Customer journey

The main path is:

`Discover -> Shortlist -> Explore in 3D -> Check price -> Enquire or book a test drive`

The home page gives visitors clear entry points into models, the virtual showroom, offers, test drives, and used cars. Model discovery supports filters for body type, budget, fuel type, seating, and use case. Visitors can compare up to three vehicles without losing the enquiry action.

Each model page presents the interactive viewer first, followed by colours, variants, price, key features, specifications, brochure access, finance, exchange, and test-drive actions. The 360 showroom lobby links into the relevant model viewer. Every major screen keeps a visible path to "Enquire now" or "Book a test drive".

## Information architecture and parity

The implementation begins with a page-by-page parity matrix. Each row records the reference URL, current local route, content source, assets, required states, customer actions, metadata, and redirect behavior.

The parity inventory includes:

- Home
- Virtual showroom
- Interactive model viewers
- Test drive
- Price list
- Buy-now enquiry
- Brochures and eBook content
- Exchange
- Q Service and the full service menu
- Accessories
- Used cars and U-Trust locations
- Loan
- Insurance
- Promotions
- What's new
- Feedback
- Testimonials
- Events
- Driving school
- Careers
- About Nippon Toyota
- Toyota India
- Contact and every branch location
- Disclaimer and legal pages

Search must work across models, services, offers, and pages. The site should not expose a search button that has no usable search experience.

## Visual world

This is a brand-preserving overhaul. The current look is evidence of existing product and brand content, not a constraint on the new composition.

- Main browsing surfaces use off-white, charcoal, silver, and Toyota red.
- Toyota red is the single action colour across the main site.
- The main site uses a simplified sans-serif type system with one display family and one UI family, building from the current Outfit and Montserrat direction where it remains appropriate.
- The layout uses real approved vehicle photography, video, and showroom assets.
- The page composition uses asymmetric hero layouts, varied model discovery arrangements, comparison views, and editorial spacing instead of repeated equal card rows.
- Browsing, comparison, finance, service, contact, and content pages use a light theme.
- The 360 and interactive 3D showroom is a dedicated dark charcoal experience. This is a deliberate route-level theme, not random section inversion.
- Buttons and controls use a consistent corner-radius system. Press feedback is immediate and subtle.

The design dials are `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6`, and `VISUAL_DENSITY: 4`. The visual variance creates a distinct showroom feel without compromising scanability. The motion level supports camera transitions, reveals, and tactile feedback. The density stays low enough for mobile browsing.

## 3D showroom

The showroom has two connected layers.

### 360 showroom lobby

- Open with a lightweight poster image and a clear "Enter showroom" action.
- Use the existing multi-resolution 360 panorama foundation.
- Keep model hotspots, but add category shortcuts for compact cars, SUVs, MPVs, hybrids, EVs, and premium vehicles.
- Selecting a hotspot opens a model preview with price, key features, and actions.
- Link directly from the preview into that model's interactive viewer.
- Keep enquiry and test-drive actions available in the lobby.

### Interactive model viewer

- Drag to orbit and pinch to zoom.
- Provide exterior, interior, and reset camera presets.
- Change exterior colour when the source model supports material variants.
- Change variant and update equipment and price.
- Add short feature hotspots without covering important vehicle details.
- Support fullscreen and a clear exit path.
- Provide a shareable configuration URL.
- Send model, colour, variant, source page, and intent with the lead.

The implementation must distinguish a true GLB/GLTF model from a 360 panorama. A true orbitable viewer requires owned or licensed 3D model files. If a model file is unavailable, the experience uses a high-quality 360 spin or approved static imagery rather than presenting a panorama as a 3D mesh.

### Performance and fallback

- Load a poster image before loading heavy 3D assets.
- Load the model after the visitor chooses to explore.
- Use compressed assets and multiple quality levels where available.
- Fall back to the existing 360 tour on weaker devices.
- Fall back to an optimized static image if WebGL or asset loading fails.
- Keep the equivalent vehicle information available as text.
- Respect reduced-motion preferences.

The current repo already contains a Pannellum wrapper, a 360 showroom route, showroom hotspot data, and per-model routes. The redesign should improve those boundaries rather than replace them without evidence.

## Enquiry and test-drive flow

The lead flow stays short and contextual. Model pages prefill the selected car. The 3D viewer also carries colour and variant into the form.

The core fields remain:

1. Name
2. Mobile number
3. Email
4. City or branch
5. Interested car
6. Intent, such as test drive, price, finance, exchange, or general enquiry
7. Phone verification
8. Consent

Optional fields, such as preferred callback time or current car, appear only when they help the chosen intent. Visitors do not need an account.

The form must include stable loading, inline validation, OTP errors, retry without losing entered values, success confirmation, and a useful failure state. The lead endpoint stores model, branch, intent, colour, variant, referral page, and campaign metadata along with the entered contact details. No staff dashboard or CRM interface is included in this phase.

## Content and data model

Use canonical content sources instead of repeating values inside page components.

- Model catalogue: names, images, variants, colours, prices, specifications, features, brochures, and viewer assets.
- Branch catalogue: names, addresses, phones, hours, maps, service types, and enquiry routing values.
- Service catalogue: Q Service programmes, service menu items, warranty, roadside assistance, parts, and body and paint content.
- Campaign content: promotions, events, what's new, testimonials, and news.
- Lead metadata: intent, model, configuration, branch, source page, campaign, and timestamp.

Content review must resolve stale-looking prices, inconsistent model names, placeholder branch details, broken character encoding, and unclear disclaimers. The UI must not invent specifications, prices, offers, or availability.

## Architecture boundaries

- Keep the existing Next.js App Router and package manager.
- Read the repository's current Next.js guide under `node_modules/next/dist/docs/` before writing implementation code, as required by `AGENTS.md`.
- Use Server Components for static page content and isolated Client Components for 3D, forms, motion, menus, and other interactive state.
- Keep the 360 panorama viewer in a dedicated client leaf.
- Use the lightest viable 3D viewer for the supplied asset format. Prefer a standard GLB/GLTF viewer for ordinary model controls. Use custom Three.js work only when the assets or configurator behavior require it.
- Keep lead persistence behind a small API and data adapter so a future admin or CRM layer can be added without changing customer-facing components.
- Do not add staff dashboards, CRM integration, payment handling, live vehicle inventory, or appointment-slot scheduling in this phase.

## Motion and interaction rules

Motion communicates hierarchy, state change, or feedback. It does not block the next action.

- Use short ease-out transitions for menus, tabs, popovers, and buttons.
- Use smooth camera transitions inside the viewer when changing presets or colours.
- Use scroll reveal only for content entering the viewport.
- Use immediate press feedback on buttons and controls.
- Use reduced-motion fallbacks for all movement and camera animation.
- Avoid continuous loops except where they communicate an active viewer state.

## Accessibility, responsive behavior, and quality

- Design mobile layouts explicitly at 360px and 390px widths.
- Validate desktop layouts at 1280px and 1440px widths.
- Keep desktop navigation on one line and under 80px high.
- Keep form labels above inputs, with visible focus states and inline errors.
- Provide keyboard access to menus, tabs, viewer controls, colour choices, and form submission.
- Check contrast for body copy, controls, placeholders, focus rings, and error messages.
- Provide static and text alternatives for 3D content.
- Reserve image and viewer space to avoid layout shift.
- Lazy-load heavy viewer assets and below-the-fold media.
- Test slow networks, failed 3D assets, disabled WebGL, failed submissions, empty content, and recovery.
- Check route parity, redirects, metadata, structured data, and Core Web Vitals.

## Implementation phases

1. Audit the reference site, local routes, assets, data, and current working tree.
2. Build the parity matrix and canonical content inventory.
3. Establish the shared customer-facing design system and responsive shell.
4. Rebuild the homepage, model discovery, comparison, and enquiry entry points.
5. Rework model pages and connect the 360 lobby to the improved model viewers.
6. Add true 3D viewers for models with valid GLB/GLTF assets, with 360 and static fallbacks.
7. Rebuild supporting parity pages using the same design system.
8. Connect and verify database-backed lead submission.
9. Run accessibility, responsive, 3D fallback, SEO, performance, and visual QA.

## Success criteria

- Visitors can find a suitable model through more than one clear path.
- Visitors can compare models without losing access to an enquiry action.
- Visitors can explore a model in 360 or true 3D when assets support it.
- A visitor can submit a contextual test-drive or enquiry lead from the home page, model page, showroom, or supporting page.
- The lead retains the visitor's selected model and configuration.
- Every reference-site customer-facing function has a local route or an intentional redirect.
- The experience remains usable when heavy media fails or the device cannot run WebGL.
- The redesigned site feels recognisably Nippon Toyota while being easier to use on mobile.

## Reference sources

- [Nippon Toyota home](https://www.nippon-toyota.com/)
- [Nippon Toyota enquiry flow](https://www.nippon-toyota.com/enquire-now/)
- [Nippon Toyota virtual showroom](https://www.nippon-toyota.com/virtual-showroom/)
- [Nippon Toyota sitemap](https://www.nippon-toyota.com/sitemap.xml)
