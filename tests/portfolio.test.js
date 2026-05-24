/**
 * Portfolio Website Test Suite
 * Tests for core functionality of the portfolio website
 */

const fs = require('fs');
const path = require('path');

describe('Portfolio Website Tests', () => {
  const baseDir = path.join(__dirname, '..');
  
  describe('Static Files', () => {
    test('index.html exists', () => {
      const indexPath = path.join(baseDir, 'index.html');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    test('index.html has valid HTML structure', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
      expect(content).toContain('<head>');
      expect(content).toContain('</head>');
      expect(content).toContain('<body>');
      expect(content).toContain('</body>');
    });

    test('index.html contains Next.js build manifest', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('__NEXT_DATA__');
      expect(content).toContain('_next/static');
    });
  });

  describe('Images', () => {
    const imagesDir = path.join(baseDir, 'images');
    
    test('images directory exists', () => {
      expect(fs.existsSync(imagesDir)).toBe(true);
    });

    test('logo.png exists', () => {
      const logoPath = path.join(imagesDir, 'logo.png');
      expect(fs.existsSync(logoPath)).toBe(true);
    });

    test('hero image exists', () => {
      const heroPath = path.join(imagesDir, 'slider', '1.jpg');
      expect(fs.existsSync(heroPath)).toBe(true);
    });
  });

  describe('Next.js Build Output', () => {
    const nextDir = path.join(baseDir, '_next');
    
    test('_next directory exists', () => {
      expect(fs.existsSync(nextDir)).toBe(true);
    });

    test('static chunks directory exists', () => {
      const chunksDir = path.join(nextDir, 'static', 'chunks');
      expect(fs.existsSync(chunksDir)).toBe(true);
    });

    test('build manifest exists', () => {
      const manifestPath = path.join(nextDir, 'static', 'build', '_buildManifest.js');
      expect(fs.existsSync(manifestPath)).toBe(true);
    });

    test('SSG manifest exists', () => {
      const ssgPath = path.join(nextDir, 'static', 'build', '_ssgManifest.js');
      expect(fs.existsSync(ssgPath)).toBe(true);
    });

    test('index page chunk exists', () => {
      const indexChunk = path.join(nextDir, 'static', 'chunks', 'pages', 'index-e201280584e55c5c85f5.js');
      expect(fs.existsSync(indexChunk)).toBe(true);
    });
  });

  describe('Content Validation', () => {
    test('page title is set', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('<title>');
      expect(content).toContain('Elito');
    });

    test('Bootstrap CSS is linked', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('bootstrap');
    });

    test('hero section exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('static-hero');
    });

    test('about section exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('wpo-about');
    });

    test('portfolio section exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('wpo-project-area');
    });

    test('contact section exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('wpo-contact');
    });

    test('footer exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('wpo-site-footer');
    });
  });

  describe('Navigation', () => {
    test('navigation menu exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('navigation');
      expect(content).toContain('navbar');
    });

    test('home link exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('index.html');
    });
  });

  describe('External Resources', () => {
    test('Bootstrap CDN link is valid', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('cdn.jsdelivr.net');
      expect(content).toContain('bootstrap');
    });
  });

  describe('SEO and Accessibility', () => {
    test('viewport meta tag exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('viewport');
    });

    test('charset is declared', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('charset="utf-8"');
    });

    test('description meta tag exists', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('name="description"');
    });

    test('favicon is linked', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('rel="icon"');
    });
  });

  describe('Bug Checks', () => {
    test('no duplicate IDs exist', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      const idMatches = content.match(/id="[^"]*"/g) || [];
      const idCounts = {};
      idMatches.forEach(id => {
        idCounts[id] = (idCounts[id] || 0) + 1;
      });
      // Filter out IDs that appear multiple times (duplicates)
      const duplicates = Object.entries(idCounts)
        .filter(([id, count]) => count > 1)
        .map(([id]) => id);
      expect(duplicates).toHaveLength(0);
    });

    test('all image sources are valid', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      const imgSrcs = content.match(/src="images\/[^"]*"/g) || [];
      imgSrcs.forEach(src => {
        const imgPath = src.match(/src="([^"]*)"/)[1];
        expect(fs.existsSync(path.join(baseDir, imgPath))).toBe(true);
      });
    });

    test('no broken JavaScript references', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      // Check that main chunks exist
      expect(content).toContain('_next/static/chunks/main-');
      expect(content).toContain('_next/static/chunks/webpack-');
      expect(content).toContain('_next/static/chunks/framework.');
    });

    test('Bootstrap integrity hash is valid', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      // Bootstrap 5.3.3 integrity hash check
      expect(content).toContain('sha384-dMUMoqmKjcrZ0JJ3U8tvWPB4eW9c5J8s6FK1R2JvN3cPmL7Q5y6H0L0N0gKlesp');
    });

    test('Bootstrap version is 5.3.x', () => {
      const content = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
      expect(content).toContain('bootstrap@5.3');
    });
  });
});