# Public Figure Sources

This ledger identifies the four paper figures approved for the public project
page and their web derivatives. The originals were copied byte-for-byte from
the approved paper-figure set; no working-repository paths, private source
names, or generation intermediates are part of this release.

## Approved originals

| Public file | Dimensions | SHA-256 |
| --- | ---: | --- |
| `original/cyclic-depth-folding-metaphor.png` | 1536 x 1024 | `717c0c0603302111f49ef7247614241e2e3aeff5bcf035faba10308f9cbacebb` |
| `original/ordered-vs-mobius.png` | 1691 x 930 | `8725435ebebbf26930e7b5a5c7f929dce144d9d8924ed32cea12feb3e6b9e398` |
| `original/parallelism-comparison.png` | 3642 x 1879 | `719c42d9bbea7530718a10203d8ab19f54067ca4f95cdd843b59c8ffdd0590a2` |
| `original/validation-loss.pdf` | vector PDF | `a0767a7e277845a3b4e62751b11dadefbe61e9758a8ccb48256d8303642afadc` |

## Web derivatives

Web derivatives omit source metadata. Diagram and result derivatives use
lossless WebP. The photographic-style Möbius metaphor uses lossy WebP at
quality 84 to keep the first-view payload small.

| Public file | Dimensions | Encoding | SHA-256 |
| --- | ---: | --- | --- |
| `web/cyclic-depth-folding-metaphor-768.webp` | 768 x 512 | WebP quality 84 | `d62664375c11467d1848c92c8c4e55b130961178af1eae29c5d427861a9ae952` |
| `web/cyclic-depth-folding-metaphor-1536.webp` | 1536 x 1024 | WebP quality 84 | `21f366837426c7ea675bae29de1e04ab45667854e194584c72f7e07be34fabb5` |
| `web/ordered-vs-mobius-960.webp` | 960 x 528 | lossless WebP | `4572114ec2738566186062e4953bd4136d61ef4d7705580497b2e3108ceb6658` |
| `web/ordered-vs-mobius-1691.webp` | 1691 x 930 | lossless WebP | `8187ea370bdb635843008a1010809b13af636ec703e17bd385106808a2cd914f` |
| `web/parallelism-comparison-1200.webp` | 1200 x 619 | lossless WebP | `2807a46dc99ba8d47a557ae968021f4c9c29ccda051da29aecaf7d87db6efdff` |
| `web/parallelism-comparison-2400.webp` | 2400 x 1238 | lossless WebP | `fba76ae224560e29ab469600f5138845cd37970dc0ff94fba1e2631fac0a5e93` |
| `web/result-validation-loss-960.webp` | 960 x 662 | lossless WebP | `cbb6ef2cd2bcb73fa7b238cde86c3f6c3085941051d4ebe8a9ca3c6c1f8bab5b` |
| `web/result-validation-loss-1600.webp` | 1600 x 1104 | lossless WebP | `0f6d53d75dc2c2ec8389158a4d8d8d02f0b5a61d9d11d75422bc0d2491d0510c` |

## Derivation settings

Derivatives were produced with Sharp CLI 5.2.0 using the default Lanczos 3
resize kernel. Representative commands, run from `docs/assets/figures`, are:

```bash
npx --yes sharp-cli@5.2.0 -i original/cyclic-depth-folding-metaphor.png -o web/cyclic-depth-folding-metaphor-768.webp -f webp -q 84 resize 768
npx --yes sharp-cli@5.2.0 -i original/ordered-vs-mobius.png -o web/ordered-vs-mobius-960.webp -f webp --lossless resize 960
npx --yes sharp-cli@5.2.0 -i original/parallelism-comparison.png -o web/parallelism-comparison-1200.webp -f webp --lossless resize 1200
```

The validation-loss PDF was rasterized with Ghostscript 10.07.0 and then
encoded with Sharp's `--lossless` WebP mode at widths 960 and 1600. The
same Sharp settings were used for the corresponding larger WebP derivatives.

## Other approved release assets

| Public file | Provenance | SHA-256 |
| --- | --- | --- |
| `../social/social-card-1200x630.png` | Chromium render of `social-card-source.html` at 1200 x 630 | `936dd5e07c04a0d3db01987911a612c0dcbcc052cbee5d5a95a0651f4a436709` |

The social card is an opaque RGB PNG (651,793 bytes). It was rendered with
Playwright 1.61.1 and Chromium from the checked-in HTML source.
