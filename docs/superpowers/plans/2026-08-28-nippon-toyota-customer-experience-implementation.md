# Nippon Toyota customer experience implementation plan

> **For agentic workers:** This plan is intended to be executed task-by-task with review checkpoints. Do not run `git add`, `git commit`, `git push`, or any other Git operation. The user owns all Git changes.

**Goal:** Rebuild Nippon Toyota's customer-facing Next.js experience around clearer model discovery, contextual lead capture, a faster 360 showroom, and true interactive 3D vehicle viewers where approved model assets exist.

**Architecture:** Keep the existing Next.js App Router and local data-driven approach. Use server-rendered page structure for static content, isolated client components for forms, search, comparison, motion, panorama controls, and 3D viewers, and a small lead repository boundary for database writes without building staff tools. Preserve current routes and legacy paths while consolidating vehicle, branch, service, and campaign data into canonical sources.

**Tech Stack:** Next.js 16.3.1, React 19, TypeScript, Tailwind CSS v4, existing `framer-motion`, existing Zustand store, existing Pannellum integration, `pg` for a Postgres lead repository when database credentials are provided, and the lightest approved GLB/GLTF viewer that supports the required controls.

## Global Constraints

- Nippon Toyota and Toyota brand identity, logo, approved photography, video, copy, and dealer information remain recognizable and accurate.
- Existing public-site breadth is preserved, including vehicles, test drives, price lists, buy-now enquiries, brochures, exchange, Q Service, accessories, used cars, loans, insurance, promotions, what's new, feedback, testimonials, events, driving school, careers, about, Toyota India, branch contact, and legal pages.
- Existing route slugs and legacy URLs remain stable wherever possible. Add redirects where the current Next.js route differs.
- The main customer journey is `Discover -> Shortlist -> Explore in 3D -> Check price -> Enquire or book a test drive`.
- Leads are stored in a database. No staff dashboard, CRM interface, payment handling, live vehicle inventory, or appointment-slot scheduling is included.
- The main site uses off-white, charcoal, silver, and Toyota red. Toyota red is the single action colour.
- The 360 and interactive 3D showroom is a dedicated dark charcoal experience.
- `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6`, and `VISUAL_DENSITY: 4`.
- All heavy viewer media has a poster, loading state, error state, and static or 360 fallback.
- All movement honors reduced-motion preferences. Interactive controls remain keyboard accessible.
- Preserve unrelated existing changes in the working tree, especially current virtual-showroom and used-cars edits.
- Before writing implementation code, read the relevant Next.js guide in `node_modules/next/dist/docs/` as required by `AGENTS.md`.
- Do not add a Git step. Validation ends with local files and command output for the user to review.

## File map

The main ownership boundaries are:

- `src/data/`: canonical model, branch, service, route, search, and asset records.
- `src/components/site/`: shared customer shell, search, mobile actions, and navigation behavior.
- `src/components/vehicle/`: discovery, comparison, model summary, configuration, and viewer controls.
- `src/lib/`: pure filters, lead contracts, database adapter, URL helpers, and metadata helpers.
- `src/app/`: route composition and page metadata. Pages should not own duplicated catalogue data.
- `public/`: approved local imagery, video, panorama tiles, GLB/GLTF models, poster images, and brochures.
- `db/migrations/`: database schema for lead persistence.
- `scripts/`: local parity, route, asset, and content validation scripts.

## Task 1: Build the route, content, and asset parity inventory

**Files:**

- Create: `src/data/siteRoutes.ts`
- Create: `src/data/assetManifest.ts`
- Create: `docs/superpowers/audits/2026-08-28-nippon-toyota-parity-matrix.md`
- Create: `scripts/verify-parity.mjs`
- Modify: `test-map.js` only if its current route checks overlap with the new manifest
- Read before editing: `AGENTS.md`, the relevant guide under `node_modules/next/dist/docs/`, current `git diff`, current `src/app/`, `src/data/`, and `public/`

**Interfaces:**

```ts
export type SiteRoute = {
  key: string;
  currentPath: string;
  legacyPaths: string[];
  kind: 'page' | 'redirect' | 'external';
  title: string;
  customerActions: Array<'explore' | 'enquire' | 'test-drive' | 'price' | 'brochure' | 'service' | 'contact'>;
};

export type AssetRecord = {
  key: string;
  kind: 'image' | 'video' | 'panorama' | 'model' | 'document';
  path: string;
  modelSlug?: string;
  sourcePage?: string;
  alt: string;
  status: 'approved-local' | 'approved-remote' | 'missing' | 'review';
};
```

The route manifest is consumed by search, navigation, route validation, and metadata. The asset manifest is consumed by vehicle pages and the showroom. The parity matrix records every reference URL, local route, content source, asset requirement, customer action, redirect, and current status.

- [ ] **Step 1: Record the current baseline without modifying source.**

  Run:

  ```powershell
  git diff -- src/app/used-cars/page.tsx src/app/virtual-showroom src/components/PannellumViewer.tsx
  rg --files src/app public src/data | Sort-Object
  ```

  Preserve the existing edits in the working tree and note overlaps in the parity audit.

- [ ] **Step 2: Create the typed route manifest.**

  Include the reference pages for home, virtual showroom, test drive, price list, buy-now enquiry, brochure, exchange, Q Service, accessories, used cars, loan, insurance, promotions, what's new, feedback, testimonials, events, driving school, careers, about, Toyota India, branch contact, and legal pages. Include legacy paths such as `/testdrive/`, `/pricelist/`, `/buynow/`, `/brochure/`, `/used-cars.html`, `/accessories.html`, `/apply-loan/`, `/enquire-now/`, and `/events.html`.

- [ ] **Step 3: Create the asset manifest.**

  Map existing local model images, video, showroom panorama files, service imagery, brochures, and approved reference assets. Mark a true 3D model as `model` only when a valid GLB/GLTF file exists. Do not label a panorama as a model.

- [ ] **Step 4: Add the parity validator.**

  `scripts/verify-parity.mjs` must fail when a current path is duplicated, when a manifest local path does not exist for a local asset, when a route lacks a title, or when a legacy path is listed twice. It must print missing reference functions and missing local assets in stable sorted order.

- [ ] **Step 5: Validate the inventory.**

  Run:

  ```powershell
  node scripts/verify-parity.mjs
  npm run lint
  ```

  Expected result: the manifest validator prints a complete parity summary and lint passes without changing files.

## Task 2: Establish the shared customer-facing shell and design tokens

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Create: `src/components/site/CustomerShell.tsx`
- Create: `src/components/site/MobileActionBar.tsx`
- Create: `src/components/site/SearchOverlay.tsx`
- Create: `src/lib/siteTheme.ts`
- Create: `src/lib/siteSearch.ts`

**Interfaces:**

```ts
export type CustomerAction = 'explore' | 'enquire' | 'test-drive' | 'price' | 'brochure';

export type MobileActionBarProps = {
  modelName?: string;
  onAction: (action: CustomerAction) => void;
};

export type SearchResult = {
  href: string;
  title: string;
  type: 'model' | 'service' | 'offer' | 'page';
  description: string;
  keywords: string[];
};

export function searchDocuments(documents: SearchResult[], query: string): SearchResult[];
```

- [ ] **Step 1: Define semantic tokens in `globals.css`.**

  Add tokens for off-white surface, charcoal surface, primary text, muted text, border, Toyota red, focus ring, and the shared radius scale. Pair the light browsing tokens with the dark showroom tokens without mixing themes within one page.

- [ ] **Step 2: Reduce duplicated font and spacing decisions.**

  Keep the current approved font loading through `next/font`, but expose the display and UI families through semantic classes. Remove broken or unused font aliases only after `npm run build` confirms no references remain.

- [ ] **Step 3: Rebuild the shared header.**

  Keep the existing primary navigation labels and route intent. Add a working search trigger, accessible keyboard navigation, mobile drawer focus handling, `aria-expanded`, `aria-controls`, and a close action. Keep desktop navigation on one line under 80px.

- [ ] **Step 4: Add the search overlay.**

  Consume the route and content search index from Task 7 through a typed `SearchResult[]` prop. Support query input, empty results, grouped results, Escape to close, and a direct link to the full model or service page.

- [ ] **Step 5: Add the mobile action bar.**

  Show it only on model and showroom surfaces. It exposes one enquiry action and one test-drive action, remains readable at 360px, and respects safe-area padding.

- [ ] **Step 6: Validate the shell.**

  Run:

  ```powershell
  npm run lint
  npm run build
  ```

  Check manually at 360px, 390px, 1280px, and 1440px that navigation, focus states, search, and mobile actions do not overlap or wrap incorrectly.

## Task 3: Rebuild model discovery, filters, and comparison

**Files:**

- Modify: `src/components/Vehicles.tsx`
- Modify: `src/data/carDetails.ts`
- Create: `src/components/vehicle/VehicleDiscovery.tsx`
- Create: `src/components/vehicle/VehicleCompareTray.tsx`
- Create: `src/lib/vehicleFilters.ts`
- Create: `src/lib/vehicleTypes.ts`

**Interfaces:**

```ts
export type VehicleFilter = {
  categories: Array<'car' | 'suv' | 'mpv' | 'hybrid' | 'ev'>;
  maxPriceLakhs?: number;
  fuelTypes: string[];
  seating?: number;
  query: string;
};

export type VehicleSummary = {
  slug: string;
  name: string;
  image: string;
  categories: string[];
  basePrice: string;
  fuelTypes: string[];
  seating?: number;
};

export function filterVehicles(vehicles: VehicleSummary[], filter: VehicleFilter): VehicleSummary[];
export function compareVehicles(vehicles: VehicleSummary[], slugs: string[]): VehicleSummary[];
```

- [ ] **Step 1: Normalize vehicle records.**

  Make the existing `carDetails` catalogue the source for model pages. Add explicit categories, searchable keywords, fuel types, seating, image alt text, and price display status. Replace mojibake currency and trademark strings with valid UTF-8 values.

- [ ] **Step 2: Implement pure filter and comparison helpers.**

  Matching must be case-insensitive. Missing optional values must not match a constrained filter. Comparison must preserve the visitor's selection order and cap the selection at three vehicles.

- [ ] **Step 3: Build the discovery surface.**

  Replace the current single active-car carousel with a responsive discovery surface. Use varied composition for featured vehicles, a compact filter row, visible result count, and a clear empty state with a reset action. Keep a direct test-drive action for the selected model.

- [ ] **Step 4: Build the comparison tray.**

  Add keyboard-accessible selection controls, a tray that collapses on mobile, a clear comparison table grouped by price, fuel, transmission, seating, and featured equipment, and a direct enquiry action that carries the selected models.

- [ ] **Step 5: Validate discovery behavior.**

  Run:

  ```powershell
  npm run lint
  npm run build
  ```

  Manually verify no-result filters, three-model maximum, mobile horizontal controls, keyboard selection, and direct links into model pages.

## Task 4: Rebuild model pages around configuration and conversion

**Files:**

- Modify: `src/app/virtual-showroom/[slug]/page.tsx`
- Create: `src/components/vehicle/VehicleConfigurator.tsx`
- Create: `src/components/vehicle/VehicleSummary.tsx`
- Create: `src/components/vehicle/VehicleTabs.tsx`
- Create: `src/components/vehicle/ConfigurationShare.tsx`
- Create: `src/lib/vehicleConfiguration.ts`

**Interfaces:**

```ts
export type VehicleConfiguration = {
  modelSlug: string;
  variantId: string;
  colourId: string;
  viewerMode: 'model' | '360' | 'static';
};

export function encodeConfiguration(config: VehicleConfiguration): string;
export function decodeConfiguration(value: string): VehicleConfiguration | null;
```

- [ ] **Step 1: Move configuration state into a dedicated client component.**

  Keep the route page responsible for loading the model record and metadata. Keep selected variant, colour, viewer mode, and open tab inside `VehicleConfigurator` so the route remains readable and the state has one owner.

- [ ] **Step 2: Build the above-the-fold model stage.**

  Put the viewer or fallback poster first. Show model name, current variant, price disclaimer, colour, and the two customer actions. Make the model and configuration available to the lead form without requiring a second selection.

- [ ] **Step 3: Add model information sections.**

  Use tabs or disclosures for overview, variants, colours, features, specs, brochure, finance, and exchange. Preserve factual copy and disclaimers. Group long specifications instead of rendering a dense border on every row.

- [ ] **Step 4: Add shareable configuration links.**

  Encode only known model, variant, colour, and viewer values in query parameters. Invalid values fall back to the model's first valid option. Copy feedback must have a visible success and failure state.

- [ ] **Step 5: Validate model page states.**

  Run:

  ```powershell
  npm run lint
  npm run build
  ```

  Check a compact model, a hybrid, an EV, and a premium model at mobile and desktop widths. Verify invalid slugs still return the existing not-found behavior.

## Task 5: Improve the 360 showroom and add true model viewing where assets support it

**Files:**

- Modify: `src/components/PannellumViewer.tsx`
- Modify: `src/app/virtual-showroom/page.tsx`
- Create: `src/components/vehicle/InteractiveCarViewer.tsx`
- Create: `src/components/vehicle/ViewerFallback.tsx`
- Create: `src/components/vehicle/ViewerControls.tsx`
- Create: `src/lib/viewerAssets.ts`
- Modify: `src/data/assetManifest.ts`
- Add approved assets under: `public/assets/vehicles/` and `public/assets/toyota-360/`
- Modify: `package.json` only if a GLB/GLTF viewer dependency is required after asset inspection

**Interfaces:**

```ts
export type ViewerAsset = {
  modelSlug: string;
  mode: 'model' | '360' | 'static';
  poster: string;
  modelUrl?: string;
  panoramaConfig?: unknown;
  colourMaterials?: Record<string, string>;
};

export type InteractiveCarViewerProps = {
  asset: ViewerAsset;
  configuration: VehicleConfiguration;
  onConfigurationChange: (next: VehicleConfiguration) => void;
  onEnquire: () => void;
  onTestDrive: () => void;
};
```

`VehicleConfiguration` is imported from `src/lib/vehicleConfiguration.ts` created in Task 4.

- [ ] **Step 1: Inspect the approved asset set.**

  Confirm which models have true GLB/GLTF files, which have 360 panorama tiles, and which have only still imagery. Record each result in `assetManifest.ts`. Keep the current Pannellum panorama data for entries without a true model.

- [ ] **Step 2: Improve `PannellumViewer` as a reusable client leaf.**

  Keep script loading and destruction isolated. Add an explicit loading poster, retry action, resize handling, keyboard focus behavior for surrounding controls, and a reduced-motion mode that disables auto-rotation. Do not move heavy viewer work into the route component.

- [ ] **Step 3: Add the interactive model viewer.**

  Use the lightest viewer that supports the supplied GLB/GLTF assets. Support orbit, pinch zoom, reset, fullscreen, camera presets, material colour selection, feature hotspots, and model-level loading and error states. If the selected asset lacks a model URL, render `ViewerFallback` with the 360 or static asset.

- [ ] **Step 4: Connect viewer state to the model configuration.**

  A colour or variant change must update the visible state when the asset supports it. Unsupported material changes must keep the selected value in the text configuration only when the catalogue explicitly marks that option as available. Never show a colour change that the asset cannot render.

- [ ] **Step 5: Add showroom category shortcuts and model previews.**

  Keep the 360 lobby as the entry point, then add category filtering, accessible hotspot labels, selected model preview, direct model-page navigation, and persistent enquiry and test-drive actions. Do not require a visitor to understand hotspot controls before they can browse the range.

- [ ] **Step 6: Validate media fallbacks.**

  Run:

  ```powershell
  npm run lint
  npm run build
  ```

  Test a model asset, a panorama-only asset, a missing asset, a slow network, disabled WebGL, keyboard controls, touch gestures, fullscreen, and reduced motion. Check that the poster appears before heavy media.

## Task 6: Make lead capture database-backed without building staff tools

**Files:**

- Modify: `src/app/api/lead/route.ts`
- Modify: `src/components/LeadCaptureForm.tsx`
- Modify: `src/components/GlobalLeadModal.tsx`
- Modify: `src/components/TestDrivePipeline.tsx`
- Modify: `src/components/ExchangePipeline.tsx`
- Modify: `src/components/BrochurePipeline.tsx`
- Modify: `src/components/PriceListPipeline.tsx`
- Modify: `src/store/useLeadStore.ts`
- Create: `src/lib/leadTypes.ts`
- Create: `src/lib/leads.ts`
- Create: `src/lib/database.ts`
- Create: `db/migrations/001_create_leads.sql`
- Modify: `.env.example` or create it if missing
- Modify: `package.json` only after checking the package is absent

**Interfaces:**

```ts
export type LeadPayload = {
  leadType: 'SALES' | 'SERVICE' | 'TEST_DRIVE' | 'EXCHANGE' | 'BROCHURE' | 'PRICE_LIST' | 'LOAN' | 'INSURANCE' | 'FEEDBACK' | 'CAREERS' | 'PROMOTION';
  name: string;
  phone: string;
  email?: string;
  city?: string;
  branchId?: string;
  targetCar?: string;
  variantId?: string;
  colourId?: string;
  sourcePage: string;
  sourceCampaign?: string;
  currentCar?: string;
  extraInfo?: string;
  consent: boolean;
};

export type StoredLead = LeadPayload & {
  id: string;
  createdAt: string;
  otpStatus: 'not-required' | 'pending' | 'verified' | 'not-configured';
};

export interface LeadRepository {
  createLead(payload: LeadPayload): Promise<StoredLead>;
}

export interface OtpProvider {
  sendCode(phone: string): Promise<void>;
  verifyCode(phone: string, code: string): Promise<boolean>;
}
```

- [ ] **Step 1: Decide the deployment database before adding the driver.**

  The implementation must use a Postgres-compatible `DATABASE_URL` because the current repo has no durable database provider configured and a local filesystem database would not be safe for a deployed Next.js site. If the deployment provider supplies another Postgres-compatible connection, keep the SQL and repository contract unchanged.

- [ ] **Step 2: Add the lead schema and migration.**

  Create a `leads` table with a generated or application UUID, timestamps, lead type, contact details, city, branch, model, variant, colour, source page, campaign, exchange details, extra information, consent, and OTP status. Add indexes on `created_at`, `lead_type`, `target_car`, and `branch_id`.

- [ ] **Step 3: Implement validation and repository writes.**

  Reject missing name, phone, lead type, source page, or consent with status 400. Normalize phone whitespace, trim text fields, cap free-text lengths, and never log contact details. Return a stable lead ID and timestamp after the insert. Return status 503 when production database configuration is absent instead of claiming a mock success.

- [ ] **Step 4: Update every customer form to use the shared payload.**

  Preserve the existing visible field order where it matches the reference flow: name, mobile, email, city, interested car, then intent-specific details and consent. Carry model, colour, variant, source page, and campaign context from discovery and the viewer.

- [ ] **Step 5: Implement customer-facing states.**

  Keep values after failures, show field-level errors below fields, expose a stable loading state, show a clear success state with the returned request reference, and provide a retry action. If an OTP provider is configured, use an `OtpProvider` boundary with `sendCode(phone)` and `verifyCode(phone, code)`. If it is not configured, do not claim phone verification occurred.

- [ ] **Step 6: Validate lead persistence.**

  Run:

  ```powershell
  npm run lint
  npm run build
  ```

  With a test database, submit one lead for each major intent and verify the stored model, branch, source page, colour, and variant. Test invalid payloads, missing consent, duplicate submits, database outage, and failed OTP without exposing contact details in logs.

## Task 7: Complete route-level parity pages and working search

**Files:**

- Create: `src/app/testdrive/page.tsx`
- Create: `src/app/pricelist/page.tsx`
- Create: `src/app/buynow/page.tsx`
- Create: `src/app/brochure/page.tsx`
- Create: `src/app/accessories/page.tsx`
- Modify: `src/app/loan/page.tsx`
- Modify: `src/app/insurance/page.tsx`
- Modify: `src/app/promotions/page.tsx`
- Modify: `src/app/whats-new/page.tsx`
- Modify: `src/app/feedback/page.tsx`
- Modify: `src/app/testimonials/page.tsx`
- Modify: `src/app/events/page.tsx`
- Modify: `src/app/driving-school/page.tsx`
- Modify: `src/app/careers/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/toyota-india/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/used-cars/page.tsx`
- Modify: `src/app/service/page.tsx`
- Modify: `src/app/service/full-menu/page.tsx`
- Create: `src/data/searchIndex.ts`
- Modify: `src/components/site/SearchOverlay.tsx`

**Interfaces:**

```ts
import type { SearchResult } from '@/lib/siteSearch';

export const searchIndex: SearchResult[];
```

- [ ] **Step 1: Create route-level pages for currently missing public functions.**

  Each page must render a useful customer experience and connect to the shared lead flow. Test drive must prefill test-drive intent. Price list and brochure must prefill their intent. Buy-now must provide a clear model selection and enquiry path. Accessories must link to approved accessory content or the approved Toyota accessory destination.

- [ ] **Step 2: Recompose supporting pages into the shared design system.**

  Preserve page facts, branch information, service names, promotion copy, testimonials, event details, and legal wording. Replace generic filler, broken encoding, and dead buttons. Use a page-specific layout rather than forcing every section into an equal card grid.

- [ ] **Step 3: Build the search index.**

  Include all models, route titles, service offerings, promotions, events, and branch pages. Export the records as `searchIndex` using the `SearchResult` type from `src/lib/siteSearch.ts`. Search must ignore case and surrounding whitespace, match title and keywords, rank exact title matches first, and return an intentional empty state.

- [ ] **Step 4: Add legacy route redirects.**

  Map the reference paths to the new route pages with Next.js redirects or route handlers. Preserve query values such as exchange intent where the target page supports them.

- [ ] **Step 5: Validate parity pages.**

  Run:

  ```powershell
  node scripts/verify-parity.mjs
  npm run lint
  npm run build
  ```

  Open every route from the parity matrix and confirm it has a working navigation path, a page title, a useful primary action, and no dead customer-facing button.

## Task 8: Finish metadata, accessibility, performance, and local QA

**Files:**

- Modify: `src/app/layout.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/metadata.ts`
- Create: `scripts/verify-routes.mjs`
- Create: `scripts/verify-assets.mjs`
- Modify: `README.md` with local validation and environment setup

**Interfaces:**

```ts
import type { SiteRoute } from '@/data/siteRoutes';

export function buildVehicleMetadata(slug: string): {
  title: string;
  description: string;
  image?: string;
};

export function buildPageMetadata(route: SiteRoute): {
  title: string;
  description: string;
};
```

- [ ] **Step 1: Add route metadata and structured data.**

  Set unique titles and descriptions for home, model, service, branch, promotion, and content pages. Add vehicle, local business, offer, and breadcrumb JSON-LD only from canonical records. Use trusted site origin configuration for absolute URLs.

- [ ] **Step 2: Add sitemap and robots output.**

  Generate sitemap entries from the route manifest and canonical model records. Exclude redirects and unsupported external destinations. Keep legacy redirects discoverable only through their canonical target.

- [ ] **Step 3: Add route and asset verification.**

  `verify-routes.mjs` must request or inspect every canonical route and report missing pages, 500 responses, and duplicate canonical paths. `verify-assets.mjs` must report missing local images, posters, brochures, panorama tiles, and model files referenced by manifests.

- [ ] **Step 4: Run accessibility and responsive checks.**

  Check keyboard navigation, focus visibility, labels above fields, error text below fields, contrast, reduced motion, touch targets, dialog Escape behavior, mobile safe-area spacing, and the 360px and 390px layouts.

- [ ] **Step 5: Run performance checks.**

  Confirm the hero poster or priority image is reserved, heavy viewer assets are lazy, no route blocks on 3D initialization, and the main pages have no avoidable layout shift. Run the project build and use a local Lighthouse pass when the preview server is available.

- [ ] **Step 6: Run final local validation.**

  Run:

  ```powershell
  node scripts/verify-parity.mjs
  node scripts/verify-routes.mjs
  node scripts/verify-assets.mjs
  npm run lint
  npm run build
  ```

  Review the homepage, model discovery, comparison, one compact model, one hybrid or EV, the 360 lobby, one true 3D model when available, a fallback model, test drive, price list, brochure, used cars, service, contact, and the lead success and failure states.

## Dependency and data decisions

- Do not add a 3D dependency until the asset manifest confirms a true GLB/GLTF use case. Keep the existing Pannellum integration for panoramas.
- Do not add an ORM when a typed repository plus parameterized SQL is sufficient.
- Use Postgres-compatible persistence through `DATABASE_URL`. The implementation must receive the actual deployment connection before production lead capture is enabled.
- Keep OTP provider code behind an adapter. The provider and credentials must be configured before claiming phone verification in production.
- Keep admin, CRM, payments, live inventory, and appointment-slot scheduling out of this implementation.

## Coverage review

The plan covers the approved spec as follows:

- Customer journey and design system: Tasks 2, 3, and 4.
- Route and content parity: Tasks 1 and 7.
- 360 showroom and true 3D viewer: Task 5.
- Contextual database-backed leads: Task 6.
- Fallback, accessibility, reduced motion, responsive behavior, SEO, and performance: Tasks 5 and 8.
- Preservation of current routes and local work: Global Constraints, Task 1, and Task 7.
- No staff tools or Git operations: Global Constraints, Task 6, and the plan header.
