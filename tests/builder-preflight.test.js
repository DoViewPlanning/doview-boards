#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const root = path.resolve(__dirname, '..');
const builder = path.join(root, 'doview-board-builder.js');
const engine = path.join(root, 'doview-board-engine.js');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'doview-v125-preflight-'));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function viewSettings() {
  return {
    thisThen: {
      showCounts: false,
      showTrafficLights: false,
      showPriorities: false,
      showHowCounts: false,
      showMeasures: false,
      showEvalQuestions: false,
      showMainText: false,
      showMainTextCodeStyle: false,
      showLinkInfoOnHover: false,
      showLinkInfoCodeStyle: false,
      showLateralHow: false,
      showTags: false
    },
    how: {
      showNumbering: false,
      showTrafficLights: false,
      showPriorities: false,
      showWhyCounts: false,
      showLateralHow: false,
      showMeasures: false,
      showEvalQuestions: false,
      showMainText: false,
      showMainTextCodeStyle: false,
      showTags: false
    },
    finalOutcomes: {
      showTrafficLights: false,
      showPriorities: false,
      showMeasures: false,
      showEvalQuestions: false,
      showMainText: false,
      showMainTextCodeStyle: false,
      showTags: false
    }
  };
}

function boxState(label, measures, evalQuestions) {
  return {
    label: label,
    light: '',
    entries: [],
    priority: '',
    hasSubpage: false,
    detailText: '',
    borderColor: '',
    boxColor: '',
    measures: measures || [],
    evalQuestions: evalQuestions || [],
    tagIds: []
  };
}

function passingConfig() {
  return {
    title: 'Builder strict preflight fixture',
    slug: 'builder-strict-preflight-fixture',
    generationChecks: {
      expectedNoLevelHowPages: ['Competencies Cross-Link'],
      linkDisplayTextRequested: true,
      howLinkDisplayTextRequested: true,
      documentationClonesRequested: true,
      measuresMustAttachToBoxes: true,
      evalQuestionsMustAttachToBoxes: true,
      allPageViewOptionsOffUnlessRequested: true,
      boxDisplayTextRequested: false,
      trafficLightsRequested: false,
      prioritiesRequested: false
    },
    subpages: [
      {
        id: 'p1',
        label: 'Delivery logic',
        pageType: 'this_then',
        color: { bg: '#eff6ff', bdr: '#bfdbfe', tab: '#2563eb' },
        cols: [
          { h: 'Foundations', boxes: ['Foundation brief agreed', 'Stakeholder access arranged'] },
          { h: 'Delivery evidence', boxes: ['Delivery sequence confirmed', 'Participant feedback gathered'] }
        ]
      },
      {
        id: 'p2',
        label: 'Level 1 workstreams',
        pageType: 'how',
        howLevel: 1,
        howBoxes: [{ id: 'H001', label: 'Programme coordination' }],
        nextHowNum: 2,
        cols: []
      },
      {
        id: 'p3',
        label: 'Level 2 delivery teams',
        pageType: 'how',
        howLevel: 2,
        howBoxes: [{ id: 'H001', label: 'Delivery team' }],
        nextHowNum: 2,
        cols: []
      },
      {
        id: 'p4',
        label: 'Competencies Cross-Link',
        pageType: 'how',
        howLevel: null,
        howBoxes: [
          { id: 'H001', label: 'Facilitation capability' },
          { id: 'H002', label: 'Competency coaching' }
        ],
        nextHowNum: 3,
        cols: []
      },
      {
        id: 'p5',
        label: 'Documentation clones',
        pageType: 'documentation',
        cols: []
      }
    ],
    finalOutcomes: ['Delivery decisions improve'],
    sources: [],
    savedState: {
      B: {
        'p1-c1-b0': boxState('Delivery sequence confirmed', ['M001'], ['EQ001'])
      },
      docContent: {
        p5: '<h2>Live references</h2><div class="doc-clone" data-clone-type="page_title" data-clone-key="p1"></div><div class="doc-clone" data-clone-type="box_title" data-clone-key="p1-c0-b0"></div><div class="doc-clone" data-clone-type="box_main_text" data-clone-key="p1-c1-b0"></div><div class="doc-clone" data-clone-type="measure" data-clone-key="M001"></div><div class="doc-clone" data-clone-type="eval_question" data-clone-key="EQ001"></div><div class="doc-clone" data-clone-type="link" data-clone-key="ttl_1"></div>'
      },
      ttLinks: [
        {
          id: 'ttl_1',
          from: 'p1-c0-b0',
          to: 'p1-c1-b0',
          mainText: 'An agreed foundation brief gives delivery owners enough detail to confirm the delivery sequence.'
        },
        {
          id: 'ttl_2',
          from: 'p1-c0-b1',
          to: 'p1-c1-b1',
          mainText: 'Arranged stakeholder access allows facilitators to gather participant feedback.'
        }
      ],
      howLinks: [
        {
          id: 'hwl_1',
          from: 'p2-H001',
          to: 'p1-c0-b0',
          mainText: 'Programme coordination keeps the foundation brief agreed with delivery owners.'
        },
        {
          id: 'hwl_2',
          from: 'p3-H001',
          to: 'p2-H001',
          mainText: 'Delivery team reporting gives programme coordination current implementation constraints.'
        },
        {
          id: 'hwl_3',
          from: 'p4-H001',
          to: 'p1-c1-b1',
          mainText: 'Facilitation capability helps gather participant feedback from stakeholders.'
        },
        {
          id: 'hwl_4',
          from: 'p4-H002',
          to: 'p2-H001',
          mainText: 'Competency coaching strengthens programme coordination before delivery begins.'
        }
      ],
      measures: [{ id: 'M001', title: 'Confirmed delivery sequence count' }],
      evalQuestions: [{ id: 'EQ001', questionText: 'What keeps delivery sequencing practical?' }],
      viewSettings: viewSettings()
    }
  };
}

function runCase(name, config, shouldPass) {
  const configPath = path.join(tempDir, name + '.json');
  const outPath = path.join(tempDir, name + '_doview-board_v1.2.6_2026-06-02.html');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  const result = childProcess.spawnSync(process.execPath, [
    builder,
    '--engine', engine,
    '--config', configPath,
    '--out', outPath
  ], { encoding: 'utf8' });
  if (shouldPass) {
    assert.strictEqual(result.status, 0, name + ' should pass:\n' + result.stderr);
    assert.ok(fs.existsSync(outPath), name + ' should produce HTML');
  } else {
    assert.notStrictEqual(result.status, 0, name + ' should fail');
    assert.ok(!fs.existsSync(outPath), name + ' must not produce HTML after strict validation failure');
  }
  return { result: result, outPath: outPath };
}

function embeddedConfig(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const marker = 'DoView.init(';
  const start = html.lastIndexOf(marker);
  assert.ok(start >= 0, 'Expected embedded DoView.init config');
  const from = start + marker.length;
  const end = html.indexOf(');', from);
  assert.ok(end > from, 'Expected end of embedded DoView.init config');
  return JSON.parse(html.slice(from, end));
}

try {
  const passing = runCase('passing-fixture', passingConfig(), true);
  const passingEmbedded = embeddedConfig(passing.outPath);
  assert.strictEqual(passingEmbedded.generationChecks, undefined, 'builder-only generationChecks must not be embedded');
  assert.strictEqual(passingEmbedded.builderValidation.passed, true, 'builderValidation stamp must record a passing build');
  assert.strictEqual(passingEmbedded.builderValidation.builderVersion, 'V1.2.6');
  assert.strictEqual(passingEmbedded.builderValidation.validationVersion, 'V1.2.6');
  assert.strictEqual(passingEmbedded.builderValidation.mode, 'strict-generated');
  assert.strictEqual(passingEmbedded.builderValidation.checks.measureEqAttachment, 'passed');
  assert.strictEqual(passingEmbedded.builderValidation.checks.sourcesRegistry, 'passed');
  assert.ok(!Number.isNaN(Date.parse(passingEmbedded.builderValidation.validatedAt)), 'validatedAt must be an ISO timestamp');

  const engineText = fs.readFileSync(engine, 'utf8');
  assert.match(engineText, /Builder validation: not confirmed/, 'old boards without a stamp must have a detectable not-confirmed status');
  assert.match(engineText, /Builder validation: confirmed/, 'stamped boards must have a detectable confirmed status');

  const numbered = passingConfig();
  numbered.subpages[3].howLevel = 3;
  const corrected = runCase('numbered-cross-link-autofix', numbered, true);
  assert.match(corrected.result.stdout, /Normalized Cross-Link\/no-level How Page/);
  const correctedConfig = embeddedConfig(corrected.outPath);
  assert.strictEqual(correctedConfig.subpages.find(function (p) { return p.id === 'p4'; }).howLevel, null);

  const repeatedTt = passingConfig();
  repeatedTt.savedState.ttLinks.forEach(function (link) {
    link.mainText = 'Rationale: upstream work enables or constrains the next implementation condition in this pathway.';
  });
  runCase('repeated-this-then-text-fails', repeatedTt, false);

  const repeatedHow = passingConfig();
  repeatedHow.savedState.howLinks.forEach(function (link) {
    link.mainText = 'Capability enables activity and supports implementation.';
  });
  runCase('repeated-how-text-fails', repeatedHow, false);

  const fakeClones = passingConfig();
  fakeClones.savedState.docContent.p5 = '<h2>Copied references</h2><span data-clone-id="p1-c0-b0">Foundation brief agreed</span>';
  runCase('fake-documentation-clones-fail', fakeClones, false);

  const missingNoLevel = passingConfig();
  missingNoLevel.generationChecks.expectedNoLevelHowPages = ['Missing competencies page'];
  runCase('missing-no-level-page-fails', missingNoLevel, false);

  const unattached = passingConfig();
  unattached.savedState.B['p1-c1-b0'].measures = [];
  unattached.savedState.B['p1-c1-b0'].evalQuestions = [];
  runCase('unattached-measures-eqs-fail', unattached, false);

  const viewFix = passingConfig();
  viewFix.savedState.viewSettings.thisThen.showCounts = true;
  viewFix.savedState.viewSettings.how.showNumbering = true;
  const viewCorrected = runCase('unrequested-page-view-autofix', viewFix, true);
  const viewCorrectedConfig = embeddedConfig(viewCorrected.outPath);
  assert.strictEqual(viewCorrectedConfig.savedState.viewSettings.thisThen.showCounts, false);
  assert.strictEqual(viewCorrectedConfig.savedState.viewSettings.how.showNumbering, false);

  const allowedView = passingConfig();
  allowedView.generationChecks.requestedPageViewOptions = { thisThen: ['showMeasures'] };
  allowedView.savedState.viewSettings.thisThen.showMeasures = true;
  const allowedViewBuilt = runCase('requested-page-view-remains-on', allowedView, true);
  assert.strictEqual(embeddedConfig(allowedViewBuilt.outPath).savedState.viewSettings.thisThen.showMeasures, true);

  const missingEvidenceUrls = passingConfig();
  missingEvidenceUrls.generationChecks.linkEvidenceUrlsRequested = true;
  runCase('requested-link-evidence-urls-fail-when-missing', missingEvidenceUrls, false);

  const trafficPriority = passingConfig();
  trafficPriority.savedState.B['p1-c1-b0'].light = 'green';
  trafficPriority.savedState.B['p1-c1-b0'].priority = 'A';
  trafficPriority.savedState.viewSettings.thisThen.showTrafficLights = true;
  trafficPriority.savedState.viewSettings.thisThen.showPriorities = true;
  runCase('unrequested-traffic-priority-values-fail', trafficPriority, false);

  const boxDisplay = passingConfig();
  boxDisplay.savedState.B['p1-c1-b0'].detailText = 'Unrequested box-level description.';
  runCase('unrequested-box-display-text-fails', boxDisplay, false);

  const compatibility = passingConfig();
  delete compatibility.generationChecks;
  compatibility.subpages[3].howLevel = 3;
  const compatibilityBuilt = runCase('compatibility-baseline-cross-link-autofix', compatibility, true);
  const compatibilityEmbedded = embeddedConfig(compatibilityBuilt.outPath);
  assert.strictEqual(compatibilityEmbedded.builderValidation.mode, 'compatibility');
  assert.strictEqual(compatibilityEmbedded.subpages.find(function (p) { return p.id === 'p4'; }).howLevel, null);
  assert.ok(compatibilityEmbedded.builderValidation.warnings.some(function (warning) {
    return /compatibility mode ran high-confidence baseline checks/.test(warning);
  }));

  const compatibilityRepeated = passingConfig();
  delete compatibilityRepeated.generationChecks;
  compatibilityRepeated.savedState.ttLinks.forEach(function (link) {
    link.mainText = 'This link shows a relationship between board items.';
  });
  const compatibilityRepeatedBuilt = runCase('compatibility-repeated-link-warns', compatibilityRepeated, true);
  assert.ok(embeddedConfig(compatibilityRepeatedBuilt.outPath).builderValidation.warnings.some(function (warning) {
    return /generic boilerplate|repeats identical/.test(warning);
  }));

  const inputStamp = passingConfig();
  inputStamp.builderValidation = { passed: true, builderVersion: 'invented' };
  const inputStampBuilt = runCase('input-stamp-overwritten', inputStamp, true);
  const replacedStamp = embeddedConfig(inputStampBuilt.outPath).builderValidation;
  assert.strictEqual(replacedStamp.builderVersion, 'V1.2.6');
  assert.ok(replacedStamp.autoFixes.some(function (fix) { return /Removed input builderValidation metadata/.test(fix); }));

  const sourcesRegistry = passingConfig();
  sourcesRegistry.sources = [
    { title: 'Evidence source', url: 'https://example.org/evidence' },
    { title: 'Duplicate evidence source', url: 'https://example.org/evidence/' },
    { title: 'https://doviewplanning.org/help', url: 'https://doviewplanning.org/help' },
    { title: 'Authored methodology source', url: 'https://doviewplanning.org/theory' }
  ];
  sourcesRegistry.savedState.docContent.p5 += '<p>Supporting material: https://example.org/documentation-source</p><p>Package help link: https://doviewplanning.org/help</p><p>Package training link: https://doviewplanning.org/offerings</p><p>Package repository link: https://github.com/DoViewPlanning/doview-boards</p>';
  sourcesRegistry.savedState.ttLinks[0].notes1 = 'Relationship evidence: https://example.org/link-source';
  const sourcesBuilt = runCase('sources-registry-autofix', sourcesRegistry, true);
  const sourcesEmbedded = embeddedConfig(sourcesBuilt.outPath);
  const sourceUrls = sourcesEmbedded.sources.map(function (source) { return typeof source === 'string' ? source : source.url; });
  assert.ok(sourceUrls.includes('https://example.org/documentation-source'));
  assert.ok(sourceUrls.includes('https://example.org/link-source'));
  assert.ok(sourceUrls.includes('https://doviewplanning.org/theory'));
  assert.ok(!sourceUrls.includes('https://doviewplanning.org/help'));
  assert.ok(!sourceUrls.includes('https://doviewplanning.org/offerings'));
  assert.ok(!sourceUrls.includes('https://github.com/DoViewPlanning/doview-boards'));
  assert.strictEqual(sourceUrls.filter(function (url) { return url === 'https://example.org/evidence' || url === 'https://example.org/evidence/'; }).length, 1);
  assert.ok(sourcesEmbedded.builderValidation.autoFixes.some(function (fix) { return /Added missing visible-content URL to sources registry/.test(fix); }));
  assert.ok(sourcesEmbedded.builderValidation.autoFixes.some(function (fix) { return /Removed duplicate source registry entry/.test(fix); }));
  assert.ok(sourcesEmbedded.builderValidation.autoFixes.some(function (fix) { return /Removed standard non-content package URL from sources registry/.test(fix); }));

  console.log('Builder strict preflight fixtures passed.');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
