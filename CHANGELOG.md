# Changelog

## V1.2.6 — 2026-06-02

Targeted runtime/UI consistency and source-registry cleanup release following V1.2.5.

### Included

- Fixed runtime restoration of nested `savedState.B` box records when a generated config does not also include the optional redundant `savedState.SP` copy.
- Centralized box-level Measure/Evaluation Question association lookups so lists, detail panes, and Page View under-box display read the same box-level `measures` / `evalQuestions` source of truth.
- Confirmed the association display path for This-Then Boxes, How Boxes, and Final Outcome boxes while preserving default-off Page View options.
- Refined Sources registry completion so fixed package-controlled help, training, repository, trademark, and support URLs are not auto-added as board evidence sources.
- Preserved genuine board-content URL completion, normalized URL deduplication, explicitly titled Sources entries, builder-created validation stamps, strict-generated mode, no-level Cross-Link How Page checks, link-text checks, and Documentation Page clone checks.
- Added builder regression assertions and a browser-backed Measure/Evaluation Question runtime fixture.

### Preserved behaviours

- The saved-state schema is unchanged. The runtime fix is a narrow compatibility helper for existing box-level association arrays.
- Save / Download Board, Copy HTML Board, Create and Save New Empty Board, Create Read-Only Copy, Board Chat, Print, Documentation clone runtime behaviour, This-Then semantics, How Page numbering, and default Page View settings remain unchanged.

### Validation limits

- Builder validation and the browser-backed fixture are deterministic technical checks. They do not prove content quality, source accuracy, security, approval, endorsement, certification, or Official DoView® status.

## V1.2.5 — 2026-06-02

Targeted reliability and traceability release following the V1.2.4 builder/preflight enforcement release.

### Included

- Added a builder-created `builderValidation` stamp to successful standalone HTML output. The stamp records builder version, validation version, validation mode, timestamp, checks run, warnings, and reported safe auto-fixes.
- Added a quiet `Builder validation: confirmed` / `Builder validation: not confirmed` line in Board info. Older unstamped boards continue to open normally and show `not confirmed`.
- Added high-confidence baseline checks that run even when `generationChecks` is absent, while preserving the compatibility path for older configs.
- Strengthened baseline detection for repeated This-Then link Display Text, repeated How-link Display Text, known boilerplate phrases, and Documentation Pages that claim clones without real engine-supported `.doc-clone` blocks.
- Added visible-URL Sources registry completion. The builder scans displayed content, deduplicates URL-bearing source entries, safely adds missing URLs using the URL as a fallback title, and reports the changes without inventing URLs.
- Updated the prompt workflow so final standalone HTML is not returned until builder validation passes and the builder-created stamp is present.
- Completed a focused text and version audit for the V1.2.5 public package.

### Preserved behaviours

- Existing saved-state/schema and runtime behaviours are preserved except for additive builder-validation metadata and the unobtrusive Board info status line.
- Save / Download Board, Copy HTML Board, Create and Save New Empty Board, Create Read-Only Copy, Board Chat, Print, Documentation clone runtime behaviour, This-Then semantics, How Page numbering, Measures/Evaluation Questions UI, and Page View behaviour remain unchanged.
- Older configs without `generationChecks` remain supported through compatibility mode. Compatibility stamps do not claim strict-generated validation.

### Validation limits

- Builder validation is deterministic technical validation and traceability metadata. It does not prove content quality, source accuracy, security, approval, endorsement, certification, or Official DoView® status.

## V1.2.4 — 2026-06-02

Public enforcement release following internal V1.2.2 and V1.2.3 validation builds.

Prompt-only validation in V1.2.2 and V1.2.3 was insufficient: generated boards could still assign numbered levels to Cross-Link How Pages and repeat generic link Display Text. V1.2.4 supersedes those internal validation builds and adds deterministic builder/preflight enforcement before standalone HTML output.

### Included

- Added optional top-level builder-only `generationChecks` metadata for generated JSON configs. The builder uses it for strict preflight and strips it before embedding final standalone HTML.
- Added safe normalization of clearly identified Cross-Link, non-hierarchical, non-vertical, and no-level How Pages to `howLevel: null`, with reported auto-fixes.
- Added strict anti-boilerplate validation for requested This-Then `ttLinks[].mainText` and How-link `howLinks[].mainText`, including repeated text, near-repeated wording, known generic frames, endpoint-specificity checks, and relationship-specific URL checks when requested.
- Added Documentation Page clone validation for engine-supported `.doc-clone` blocks, supported `data-clone-type` values, and real `data-clone-key` references.
- Added requested Measure and Evaluation Question box-attachment validation, with explicit standalone-item opt-outs only when requested.
- Added safe Page View auto-fixes for unrequested options and hard failures for unrequested box Display Text, populated Traffic Lights, and populated priorities.
- Added `tests/builder-preflight.test.js` with passing, failing, and safe-auto-fix fixtures.
- Updated the prompt to require builder-first generation: generate JSON, include `generationChecks`, run strict preflight, revise JSON until it passes, then output builder-produced standalone HTML.
- Updated package, engine, builder, prompt, documentation, specification, and standalone example version references to `V1.2.4`.

### Preserved behaviours

- Existing saved-state/schema compatibility is preserved. `generationChecks` is builder-only input metadata, not runtime saved state.
- Runtime engine behaviour is unchanged apart from version labels.
- Save / Download Board, Create and Save New Empty Board, Board Chat, Documentation clone runtime behaviour, This-Then link semantics, How Box IDs such as `H001`, and normal numbered Vertical Link How Pages are unchanged.
- Older configs without `generationChecks` keep the compatibility validation path, plus safe baseline no-level normalization and warnings where applicable.

### Validation

- Release validation covered JavaScript syntax checks, strict preflight passing and failing fixtures, safe auto-fix fixtures, JSON parsing, all JSON example builds, standalone HTML assembly checks, version-reference checks, browser smoke checks, package manifest review, and ZIP hygiene checks.

## V1.2.3 — 2026-06-02

Internal validation build following V1.2.2. This build was not published as a GitHub release and is superseded by V1.2.4.

V1.2.2 was also used as an internal validation build and was not published as a GitHub release.

This release includes the V1.2.2 reliability fixes and further strengthens generated-board validation for This–Then link Display Text so requested link rationale/evidence is specific to the linked boxes rather than repeated template text.

### Included

- Strengthened the prompt's final saved-state validation gate so requested `ttLinks[].mainText` values are inspected before output for duplicate text, near-duplicate sentence frames, source-target specificity, relationship-specific mechanisms, and evidence/URL relevance.
- Added explicit rejection of page-level generic rationale/evidence filler, generic dependency wording, minor paraphrases of repeated templates, and generic board-level source lists pasted into many links.
- Added short good/bad examples showing the difference between repeated template text and relationship-specific link Display Text.
- Narrowly aligned the technical config reference with the strengthened anti-template link Display Text gate.
- Preserved the V1.2.2 structural validation gates for no-level Cross-Link How Pages, Documentation Page clones, Measure/Evaluation Question attachments, Page View defaults, box Display Text restraint, Traffic Light/priority restraint, and Vertical Link wording.
- Updated validation package, engine, builder, prompt, documentation, specification, and standalone example version references to `V1.2.3`.

### Preserved behaviours

- Existing runtime behaviour is unchanged apart from version labels.
- Existing saved-state/schema compatibility is preserved; link annotations continue to use `ttLinks[].mainText`.
- Builder validation, CLI behaviour, output assembly, and normalization are unchanged apart from version text.

### Validation

- Release validation covered JavaScript syntax checks, JSON parsing, builder assembly checks, prompt anti-template gate searches, a relationship-specific `ttLinks[].mainText` stress-test config, preserved V1.2.2 prompt-gate searches, version-reference checks, standalone HTML script checks, browser smoke checks, package manifest review, and ZIP hygiene checks.

## V1.2.2 — 2026-06-02

Internal validation build for the targeted prompt/package reliability patch. This build was not published as a GitHub release and is superseded by V1.2.4.

### Included

- Reinforced the V1.2.1 generation rules with a mandatory final saved-state/config validation gate before generated-board output.
- Added hard validation that Cross-Link, non-hierarchical, non-vertical, and no-level How Pages use explicit `howLevel: null`, remain outside the numbered vertical hierarchy, and display `No level`.
- Added hard validation that requested link Display Text is tailored to each exact source/target relationship rather than repeated filler, and that requested evidence or URLs are relevant rather than invented.
- Added hard validation that requested Documentation Page clones use exact engine-supported `.doc-clone` blocks with supported `data-clone-type` values and real `data-clone-key` references.
- Added hard validation that requested Measures and Evaluation Questions are attached to at least one relevant box unless standalone or unattached items were explicitly requested.
- Added hard validation that generated Page View options remain off unless explicitly requested, box Display Text remains blank/omitted unless requested, and Traffic Lights/priorities remain hidden and unpopulated unless requested.
- Removed `adjacent` from the higher-level and lower-level Vertical Link popup title wording without changing Vertical Link behaviour.
- Updated validation package, engine, builder, prompt, documentation, specification, and standalone example version references to `V1.2.2`.

### Preserved behaviours

- Existing saved-state/schema compatibility is preserved.
- Existing numbered vertical How Pages, Cross-Link behaviour, Vertical Link behaviour, and How Box IDs such as `H001` remain unchanged.
- Builder validation, CLI behaviour, output assembly, and normalization are unchanged apart from version text.
- Existing This–Then, Documentation Page clone, Measure/Evaluation Question, Page View, Traffic Light, priority, save/copy/read-only, print, presentation, Board Chat, and navigation runtime behaviour is preserved apart from the two popup title wording changes and version labels.

### Validation

- Release validation covered JavaScript syntax checks, JSON parsing, builder assembly checks, mandatory prompt-gate searches, no-level How Page structure and rendering, tailored link Display Text, Documentation Page clone blocks, Measure/Evaluation Question box associations, Page View off-by-default state, box Display Text restraint, neutral Traffic Light/priority state, Vertical Link wording searches, version-reference checks, standalone HTML script checks, browser-like load checks, package manifest review, and ZIP hygiene checks.

## V1.2.1 — 2026-06-02

Conservative prompt/package patch release for the DoView Boards reference package.

### Included

- Strengthened prompt and config guidance so no-level, cross-link, and non-hierarchical How Pages use explicit `howLevel: null`, remain outside the numbered vertical hierarchy, and display `No level`.
- Strengthened link-annotation guidance so requested This–Then rationale, evidence, assumptions, supporting information, or explanations are specific to each exact source/target relationship, without repeated boilerplate or invented evidence.
- Strengthened Documentation Page clone guidance so explicit clone requests create real `.doc-clone` blocks in `savedState.docContent` using supported clone types and valid source keys.
- Strengthened box Display Text guidance so `detailText` stays blank/omitted unless the user asks for box-level supporting text; link rationale stays on links.
- Strengthened Traffic Light and priority guidance so optional overlays, display settings, and underlying fields remain neutral/unset unless explicitly requested.
- Corrected the Overview hint wording to say that How Pages show actions being taken to change outcomes.
- Updated public package, engine, builder, prompt, documentation, specification, and standalone example version references to `V1.2.1`.
- Updated the How Page JSON example so its cross-link page uses explicit `howLevel: null`.

### Preserved behaviours

- Existing saved-state/schema compatibility is preserved.
- Existing numbered vertical How Pages and How Box IDs such as `H001` remain unchanged.
- Builder validation, CLI behaviour, output assembly, and normalization are unchanged apart from version text.
- Existing This–Then, How, Documentation Page, clone, Display Text, Traffic Light, priority, save/copy/read-only, print, presentation, Board Chat, and Page View runtime behaviour is preserved apart from the Overview wording correction and version labels.

### Validation

- Release validation covered JavaScript syntax checks, JSON parsing, builder assembly checks, no-level How Page rendering, relationship-specific link annotations, Documentation Page clone blocks, neutral default Display Text/Traffic Light/priority state, Overview wording checks, version-reference checks, standalone HTML script checks, browser-like load smoke checks, package manifest review, and ZIP hygiene checks.

## V1.2.0 — 2026-05-22

Public release update for the DoView Boards reference package.

### Included

- Updated public package, app, builder, prompt, documentation, specification, and example version references to `V1.2.0`.
- Added Measure and Evaluation Question Traffic Lights using the existing Traffic Light states, including compact under-box display where set.
- Hardened prompt/schema guidance for generated-board assembly, This–Then link tags, Measure/Evaluation Question `trafficLight`, and generated-board safety checks.
- Applied targeted runtime hardening for safe board-title insertion, escaped print output, exported-state JSON escaping, Documentation Page rich-text sanitisation, custom colour sanitisation, and API-key non-persistence.
- Preserved ghost/context source-reference box colour inheritance, including page/column-inherited and custom source colours.
- Corrected Measure/Evaluation Question Display Text editing so titles remain standard fields and Display Text uses the larger Display Text editor pattern.
- Added a narrow data-quality guard so a single box does not retain duplicate references to the same Measure or Evaluation Question.
- Changed Page View Select All so it does not enable code-style Display Text view; code-style Display Text remains manually selectable.
- Fixed Create and Save New Empty Board so the entered board name becomes the board's internal title and slug and persists through later Save HTML Board, Copy HTML Board, and Create Read-Only Copy exports.
- Clarified Board Chat security wording: Board Chat is optional and inactive unless configured and used; provider-transmission risk arises when a user configures an endpoint/API key and sends content through Board Chat.
- Clarified hosted/shared-board guidance for active HTML/JavaScript files, untrusted board sources, isolated origins, CSP, endpoint governance, privacy/security/compliance review, and approved data-handling arrangements.
- Rebuilt the existing standalone HTML examples with the V1.2.0 reference engine.

### Preserved behaviours

- Existing saved-state/schema compatibility is preserved.
- Board Chat remains optional and user-triggered.
- Read-only copies remain a convenience feature, not a security boundary.
- Existing Save HTML Board, Copy HTML Board, Create Read-Only Copy, print, page navigation, link tags, BAU priority, Box/Link Display Text, Measure/Evaluation Question Traffic Lights, and Page View behaviours are preserved except for the corrected new-board title/slug persistence.

### Validation

- Release validation covered JavaScript syntax checks, builder/example rebuild checks, version-reference checks, package hygiene checks, example load smoke checks, save/copy/read-only smoke checks, Board Chat no-unsolicited-provider-call checks, API-key non-persistence checks, and targeted Create and Save New Empty Board title/slug persistence checks.

## V1.1.0 — 2026-05-08

Initial public release of the DoView Boards prompt package.

### Included

- DoView Board building prompt.
- Canonical JavaScript reference engine.
- Plain Node.js board builder.
- Simple standalone HTML example.
- Complex standalone HTML example.
- Developer-facing specification and documentation.
- Apache-2.0 licence.
- Trademark and attribution guidance.

### Security and use notes

- Generated standalone boards are active HTML/JavaScript files, not passive documents.
- The prototype is intended for experimentation, learning, proof-of-concept work, and non-confidential information in low-risk environments.
- Read-only copies are a convenience feature, not a security boundary.
- Board Chat is optional; users with privacy, confidentiality, security, compliance, API-key, or external-data-sharing concerns should avoid using Board Chat unless they have appropriate arrangements in place.
- Checksums or signed release verification are planned for a future release.

### Compatibility note

- This release establishes the first public DoView Boards reference package and minimum standard.
- Earlier internal builds are not part of the public changelog.
