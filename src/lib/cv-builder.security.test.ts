import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  escapeHtml,
  renderUserCvHtml,
  richTextToHtml,
  sanitizeEmail,
  sanitizeHttpUrl,
  sanitizePhotoDataUrl,
  type UserCvDraft,
} from './cv-builder.ts';

function baseDraft(over: Partial<UserCvDraft> = {}): UserCvDraft {
  return {
    version: 1,
    fullName: 'Alex',
    label: 'Dev',
    location: 'BA',
    summary: 'Hola',
    linkedinUrl: '',
    linkedinLabel: '',
    portfolioUrl: '',
    portfolioLabel: '',
    githubUrl: '',
    githubLabel: '',
    email: '',
    jobs: [],
    education: [],
    simulations: [],
    hardSkills: 'TS',
    softSkills: 'Team',
    labels: {
      work: 'Work History',
      education: 'Education',
      simulations: 'Job Simulations',
      hardSkills: 'Hard Skills',
      softSkills: 'Soft Skills',
    },
    ...over,
  };
}

describe('cv-builder sanitizers', () => {
  it('rejects dangerous URL schemes', () => {
    assert.equal(sanitizeHttpUrl('javascript:alert(1)'), '');
    assert.equal(sanitizeHttpUrl('data:text/html,<script>x</script>'), '');
    assert.equal(sanitizeHttpUrl('vbscript:msgbox(1)'), '');
    assert.equal(sanitizeHttpUrl('https://user:pass@evil.com/'), '');
    assert.equal(sanitizeHttpUrl('https://arceprog.dev/x'), 'https://arceprog.dev/x');
  });

  it('rejects malformed emails usable in attributes', () => {
    assert.equal(sanitizeEmail('a@b.com"><img src=x onerror=1>'), '');
    assert.equal(sanitizeEmail('alex@example.dev'), 'alex@example.dev');
  });

  it('only allows jpeg/png/webp data URLs for photos', () => {
    assert.equal(sanitizePhotoDataUrl('javascript:alert(1)'), '');
    assert.equal(
      sanitizePhotoDataUrl('data:image/svg+xml;base64,PHN2Zy9vbmxvYWQ9YWxlcnQoMSk+'),
      '',
    );
    assert.equal(
      sanitizePhotoDataUrl('data:image/jpeg;base64,abc'),
      'data:image/jpeg;base64,abc',
    );
  });

  it('escapes HTML before rich-text strong tags', () => {
    assert.equal(richTextToHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
    assert.equal(
      richTextToHtml('**</strong><img src=x onerror=alert(1)>**'),
      '<strong>&lt;/strong&gt;&lt;img src=x onerror=alert(1)&gt;</strong>',
    );
    assert.equal(escapeHtml('"><img src=x onerror=1>'), '&quot;&gt;&lt;img src=x onerror=1&gt;');
  });

  it('renderUserCvHtml does not emit executable markup from hostile draft fields', () => {
    const html = renderUserCvHtml(
      baseDraft({
        fullName: '<img src=x onerror=alert(1)>',
        label: '"><script>alert(1)</script>',
        summary: '<b>hi</b>',
        linkedinUrl: 'javascript:alert(1)',
        linkedinLabel: 'x',
        portfolioUrl: 'https://ok.example',
        portfolioLabel: '<img src=x onerror=1>',
        jobs: [
          {
            company: '<script>',
            title: 'Dev',
            startDate: '2024-01-01',
            endDate: '',
            description: '**React**<img src=x onerror=1>',
          },
        ],
        simulations: ['<script>alert(1)</script>'],
        labels: {
          work: '<script>',
          education: 'Education',
          simulations: 'Sims',
          hardSkills: 'Hard Skills',
          softSkills: 'Soft Skills',
        },
      }),
      'Present',
      'javascript:alert(1)',
    );

    assert.equal(html.includes('<script>'), false);
    assert.equal(html.toLowerCase().includes('javascript:'), false);
    assert.equal(html.includes('<img src=x'), false);
    assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
    assert.match(html, /href="https:\/\/ok\.example\/"/);
    assert.equal(html.includes('cv-photo'), false);
  });
});
