import { useRef, useState } from 'react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

const assetPath = '/images/DMR%20Assets';

function asset(name: string) {
  if (typeof window === 'undefined') return `${assetPath}/${name}`;
  return new URL(`${assetPath}/${name}`, window.location.origin).href;
}

const contactRows = [
  { icon: 'icon-phone.png', label: '02 9410 9819', href: 'tel:+61294109819' },
  { icon: 'icon-email.png', label: 'daniel@dmrdesigns.com.au', href: 'mailto:daniel@dmrdesigns.com.au' },
  { icon: 'icon-web.png', label: 'dmrdesigns.com.au', href: 'https://www.dmrdesigns.com.au/' },
];

const socials = [
  ['linkedin.png', 'LinkedIn'],
  ['instagram.png', 'Instagram'],
  ['youtube.png', 'YouTube'],
  ['pinterest.png', 'Pinterest'],
  ['tiktok.png', 'TikTok'],
  ['facebook.png', 'Facebook'],
] as const;

export default function DMRSignature() {
  const signatureRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copySignature = async () => {
    if (!signatureRef.current) return;

    const html = signatureRef.current.innerHTML;
    const text = signatureRef.current.innerText;

    try {
      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([text], { type: 'text/plain' }),
          }),
        ]);
      } else {
        const range = document.createRange();
        range.selectNodeContents(signatureRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(signatureRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
      selection?.removeAllRanges();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f3f3f3',
        padding: '48px 20px 72px',
        fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
        color: '#111',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#666', marginBottom: 8 }}>
            DMR Designs
          </div>
          <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.15, fontWeight: 700 }}>
            Email Signature Preview
          </h1>
          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.6, color: '#666' }}>
            This fixed-size preview is the signature itself. Copy it, then paste it into the Gmail signature editor.
          </p>
        </div>

        <div
          style={{
            background: '#fff',
            padding: 24,
            borderRadius: 16,
            boxShadow: '0 18px 60px rgba(0,0,0,0.08)',
            overflowX: 'auto',
          }}
        >
          <div ref={signatureRef} style={{ width: 740, margin: '0 auto' }}>
            <div
              style={{
                width: 740,
                height: 245,
                position: 'relative',
                overflow: 'hidden',
                background: '#fff',
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              }}
            >
              {/* Right architectural photo frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: '0 0 0 300px',
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.70), rgba(255,255,255,0.70)), url("${asset('dmr-right-background.jpg')}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center right',
                  backgroundRepeat: 'no-repeat',
                }}
              />

              {/* Dark left panel with the exact slanted silhouette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#050505',
                  clipPath: 'polygon(0 0, 55% 0, 38% 100%, 0 100%)',
                }}
              />

              {/* White diagonal divider. Source file is vertical; code supplies the angle. */}
              <img
                src={asset('diagonal-divider.png')}
                alt=""
                style={{
                  position: 'absolute',
                  zIndex: 3,
                  width: 24,
                  height: 315,
                  objectFit: 'fill',
                  left: 342,
                  top: -36,
                  transform: 'rotate(22deg)',
                  transformOrigin: 'center center',
                  display: 'block',
                }}
              />

              {/* DMR logo */}
              <img
                src={asset('dmr-logo-white.png')}
                alt="DMR Designs"
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  left: 14,
                  top: 43,
                  width: 304,
                  height: 'auto',
                  display: 'block',
                  border: 0,
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  left: 11,
                  top: 194,
                  color: '#fff',
                  fontSize: 9.5,
                  lineHeight: '14px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  letterSpacing: '0.25px',
                  whiteSpace: 'nowrap',
                }}
              >
                Creating Beautiful, Sustainable &amp; Efficient Buildings
              </div>

              {/* Daniel details */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 5,
                  left: 378,
                  top: 58,
                  width: 220,
                  color: '#000',
                }}
              >
                <div style={{ fontSize: 26, lineHeight: '28px', fontWeight: 700, letterSpacing: '-1px', whiteSpace: 'nowrap' }}>
                  Daniel Reid
                </div>
                <div
                  style={{
                    marginTop: 3,
                    fontSize: 10,
                    lineHeight: '14px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  DESIGN DIRECTOR
                </div>
                <div style={{ width: 166, borderTop: '1px solid #777', margin: '9px 0 9px' }} />

                <table role="presentation" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    {contactRows.map((row) => (
                      <tr key={row.label}>
                        <td style={{ width: 26, padding: '0 7px 6px 0', verticalAlign: 'middle' }}>
                          <img src={asset(row.icon)} alt="" width="20" height="20" style={{ display: 'block', border: 0 }} />
                        </td>
                        <td style={{ padding: '0 0 6px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <a
                            href={row.href}
                            style={{
                              color: '#111',
                              textDecoration: 'none',
                              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                              fontSize: row.label.includes('@') ? 8.4 : 9.5,
                              lineHeight: '14px',
                              fontWeight: 500,
                            }}
                          >
                            {row.label}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Daniel portrait independent of background */}
              <img
                src={asset('daniel-reid-cutout.png')}
                alt="Daniel Reid"
                style={{
                  position: 'absolute',
                  zIndex: 6,
                  right: 5,
                  bottom: 0,
                  width: 171,
                  height: 'auto',
                  display: 'block',
                  border: 0,
                }}
              />
            </div>

            {/* Footer */}
            <table
              role="presentation"
              width="740"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: 740,
                height: 111,
                borderCollapse: 'collapse',
                background: '#fff',
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              }}
            >
              <tbody>
                <tr>
                  <td
                    width="246"
                    valign="top"
                    style={{
                      width: 246,
                      padding: '14px 18px 9px 18px',
                      borderRight: '1px solid #9e9e9e',
                      color: '#111',
                    }}
                  >
                    <div style={{ fontSize: 9, lineHeight: '12px', letterSpacing: '2px', fontWeight: 500, marginBottom: 8, whiteSpace: 'nowrap' }}>
                      PROFESSIONAL REGISTRATION
                    </div>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                      <tbody>
                        <tr>
                          <td width="22" valign="top" style={{ paddingTop: 2 }}>
                            <img src={asset('icon-arrow.png')} alt="" width="12" style={{ display: 'block', border: 0 }} />
                          </td>
                          <td style={{ fontSize: 8.2, lineHeight: '12px', paddingBottom: 5, color: '#222' }}>
                            Registered Design Practitioner:<br />
                            Medium Rise QRCCC315
                          </td>
                        </tr>
                        <tr>
                          <td width="22" valign="top" style={{ paddingTop: 2 }}>
                            <img src={asset('icon-arrow.png')} alt="" width="12" style={{ display: 'block', border: 0 }} />
                          </td>
                          <td style={{ fontSize: 8.2, lineHeight: '12px', color: '#222' }}>BDAA Medium Rise 6490</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td
                    width="246"
                    valign="top"
                    style={{
                      width: 246,
                      padding: '14px 18px 9px 22px',
                      borderRight: '1px solid #9e9e9e',
                      color: '#111',
                    }}
                  >
                    <div style={{ fontSize: 9, lineHeight: '12px', letterSpacing: '2px', fontWeight: 500, marginBottom: 8 }}>
                      QUALIFICATIONS
                    </div>
                    {[
                      'BDesign in Architecture (USYD)',
                      'Diploma Architectural Technology',
                      'Cert IV Building & Construction',
                    ].map((item) => (
                      <table key={item} role="presentation" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr>
                            <td width="22" valign="middle">
                              <img src={asset('icon-arrow.png')} alt="" width="12" style={{ display: 'block', border: 0 }} />
                            </td>
                            <td style={{ fontSize: 8.1, lineHeight: '13px', color: '#222', whiteSpace: 'nowrap' }}>{item}</td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </td>

                  <td width="248" valign="top" align="center" style={{ width: 248, padding: '14px 12px 8px' }}>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} align="center">
                      <tbody>
                        <tr>
                          {socials.map(([file, label]) => (
                            <td key={file} style={{ padding: '0 5px' }}>
                              <img src={asset(file)} alt={label} width="24" height="24" style={{ display: 'block', border: 0, objectFit: 'contain' }} />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ width: '100%', borderTop: '1px solid #999', margin: '10px 0 9px' }} />
                    <div style={{ fontSize: 8.6, lineHeight: '12px', letterSpacing: '2.6px', whiteSpace: 'nowrap', color: '#222' }}>
                      SYDNEY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;REGIONAL NSW
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 18, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={copySignature}
            style={{
              appearance: 'none',
              border: 0,
              borderRadius: 999,
              background: '#111',
              color: '#fff',
              padding: '12px 18px',
              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {copied ? 'Copied to clipboard' : 'Copy signature for Gmail'}
          </button>
          <span style={{ fontSize: 12, color: '#777' }}>
            Gmail → Settings → See all settings → General → Signature → paste.
          </span>
        </div>

        <p style={{ marginTop: 16, fontSize: 12, lineHeight: 1.6, color: '#777' }}>
          Note: the diagonal divider uses the uploaded vertical PNG and is rotated 22° in the preview. This Gmail test will tell us whether the editor preserves that transform; if it does not, the divider can be converted to a pre-angled PNG for maximum compatibility.
        </p>
      </div>
    </main>
  );
}
