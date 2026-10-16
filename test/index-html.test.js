const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('raw metadata panel is visible by default', () => {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

    assert.match(indexHtml, /class="field-group full-raw"/);
    assert.doesNotMatch(indexHtml, /<div class="field-group full-raw hidden">/);
});

test('loads ExifReader and ComfyUI parser scripts directly and configures Tauri drag region', () => {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
    const stylesCss = fs.readFileSync(path.resolve(__dirname, '../src/styles.css'), 'utf8');
    const rendererJs = fs.readFileSync(path.resolve(__dirname, '../src/renderer.js'), 'utf8');

    assert.match(indexHtml, /data-tauri-drag-region/);
    assert.match(indexHtml, /<script src="exif-reader\.js"><\/script>/);
    assert.match(indexHtml, /<script src="comfy-parser\.js"><\/script>/);
    assert.match(indexHtml, /<script src="renderer\.js"><\/script>/);
    assert.match(stylesCss, /body\.native-titlebar \.title-bar/);
    assert.match(rendererJs, /document\.body\.classList\.add\('native-titlebar'\)/);
});
