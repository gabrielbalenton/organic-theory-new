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
  { file: 'linkedin.png', label: 'LinkedIn', href: 'https://www.linkedin.com/company/dmr-designs-aus' },
  { file: 'instagram.png', label: 'Instagram', href: 'https://www.instagram.com/dmrdesigns_/?hl=en' },
  { file: 'youtube.png', label: 'YouTube', href: 'https://www.youtube.com/@dmrdesigns1' },
  { file: 'pinterest.png', label: 'Pinterest', href: 'https://au.pinterest.com/dmrdesigns_/' },
  { file: 'tiktok.png', label: 'TikTok', href: 'https://www.tiktok.com/@dmrdesigns_' },
  { file: 'facebook.png', label: 'Facebook', href: 'https://www.facebook.com/DMRDESIGNS.com.au/' },
] as const;

const registration = [
  <>Registered Design Practitioner:<br />Medium Rise QRCCC315</>,
  <>BDAA Medium Rise 6490</>,
];

const qualifications = [
  'BDesign in Architecture (USYD)',
  'Diploma Architectural Technology',
  'Cert IV Building & Construction',
];

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
        padding: '42px 20px 70px',
        fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
        color: '#111',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#777', marginBottom: 8 }}>
            DMR Designs
          </div>
          <h1 style={{ margin: 0, fontSize: 30, lineHeight: 1.15, fontWeight: 700 }}>
            Email Signature Preview
          </h1>
          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.6, color: '#6b6b6b' }}>
            Final approved layout. Copy the rendered signature below, then paste it into Gmail.
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
          <div
            ref={signatureRef}
            style={{
              width: 1066,
              height: 524,
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden',
              background: '#fff',
              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
            }}
          >
            {/* TOP */}
            <div
              style={{
                position: 'relative',
                width: 1066,
                height: 390,
                overflow: 'hidden',
                background: '#fff',
              }}
            >
              {/* Right architectural background */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 390,
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.54), rgba(255,255,255,0.54)), url("${asset('dmr-right-background.jpg')}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              />

              {/* Black left panel */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#000',
                  clipPath: 'polygon(0 0, 54.5% 0, 38% 100%, 0 100%)',
                  zIndex: 2,
                }}
              />

              {/* Uploaded divider is vertical; rotate it into the approved diagonal */}
              <img
                src={asset('diagonal-divider.png')}
                alt=""
                style={{
                  position: 'absolute',
                  zIndex: 3,
                  width: 24,
                  height: 470,
                  left: 484,
                  top: -39,
                  objectFit: 'fill',
                  transform: 'rotate(24deg)',
                  transformOrigin: 'center center',
                  pointerEvents: 'none',
                  display: 'block',
                }}
              />

              {/* Logo asset already includes the tagline */}
              <img
                src={asset('dmr-logo-white.png')}
                alt="DMR Designs"
                style={{
                  position: 'absolute',
                  zIndex: 5,
                  left: 10,
                  top: 98,
                  width: 440,
                  height: 'auto',
                  display: 'block',
                  border: 0,
                }}
              />

              {/* Daniel contact block */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 6,
                  left: 540,
                  top: 143,
                  width: 260,
                  color: '#000',
                }}
              >
                <div style={{ margin: 0, fontSize: 42, lineHeight: '44px', fontWeight: 700, letterSpacing: '-1.8px', whiteSpace: 'nowrap' }}>
                  Daniel Reid
                </div>

                <div style={{ marginTop: 5, fontSize: 15, lineHeight: '20px', fontWeight: 500, letterSpacing: '4px', whiteSpace: 'nowrap' }}>
                  DESIGN DIRECTOR
                </div>

                <div style={{ width: 240, height: 1, background: '#777', margin: '14px 0' }} />

                <table role="presentation" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    {contactRows.map((row) => (
                      <tr key={row.label}>
                        <td style={{ width: 44, padding: '0 13px 6px 0', verticalAlign: 'middle' }}>
                          <img
                            src={asset(row.icon)}
                            alt=""
                            width="31"
                            height="31"
                            style={{ display: 'block', border: 0, width: 31, height: 31, objectFit: 'contain' }}
                          />
                        </td>
                        <td style={{ padding: '0 0 6px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <a
                            href={row.href}
                            target={row.href.startsWith('http') ? '_blank' : undefined}
                            rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
                            style={{
                              color: '#111',
                              textDecoration: 'none',
                              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                              fontSize: row.label.includes('@') ? 12 : 14,
                              lineHeight: '20px',
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

              {/* Daniel cutout */}
              <img
                src={asset('daniel-reid-cutout.png')}
                alt="Daniel Reid"
                style={{
                  position: 'absolute',
                  zIndex: 7,
                  right: -5,
                  bottom: 0,
                  width: 287,
                  height: 'auto',
                  display: 'block',
                  border: 0,
                }}
              />
            </div>

            {/* FOOTER */}
            <table
              role="presentation"
              width="1066"
              height="134"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: 1066,
                height: 134,
                borderCollapse: 'collapse',
                background: '#fff',
                zIndex: 10,
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              }}
            >
              <tbody>
                <tr>
                  <td
                    width="354"
                    valign="top"
                    style={{
                      width: 354,
                      padding: '20px 22px 14px',
                      borderRight: '1px solid #858585',
                      color: '#111',
                    }}
                  >
                    <div style={{ marginBottom: 11, fontSize: 12, lineHeight: '15px', fontWeight: 500, letterSpacing: '2.6px', whiteSpace: 'nowrap' }}>
                      PROFESSIONAL REGISTRATION
                    </div>

                    {registration.map((item, index) => (
                      <table key={index} role="presentation" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', marginBottom: 7 }}>
                        <tbody>
                          <tr>
                            <td width="26" valign="top" style={{ paddingTop: 1 }}>
                              <img src={asset('icon-arrow.png')} alt="" width="15" height="15" style={{ display: 'block', border: 0, objectFit: 'contain' }} />
                            </td>
                            <td style={{ fontSize: 11, lineHeight: '16px', fontWeight: 400, color: '#202020' }}>
                              {item}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </td>

                  <td
                    width="392"
                    valign="top"
                    style={{
                      width: 392,
                      padding: '20px 22px 14px',
                      borderRight: '1px solid #858585',
                      color: '#111',
                    }}
                  >
                    <div style={{ marginBottom: 11, fontSize: 12, lineHeight: '15px', fontWeight: 500, letterSpacing: '2.6px', whiteSpace: 'nowrap' }}>
                      QUALIFICATIONS
                    </div>

                    {qualifications.map((item) => (
                      <table key={item} role="presentation" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', marginBottom: 7 }}>
                        <tbody>
                          <tr>
                            <td width="26" valign="top" style={{ paddingTop: 1 }}>
                              <img src={asset('icon-arrow.png')} alt="" width="15" height="15" style={{ display: 'block', border: 0, objectFit: 'contain' }} />
                            </td>
                            <td style={{ fontSize: 11, lineHeight: '16px', fontWeight: 400, color: '#202020', whiteSpace: 'nowrap' }}>
                              {item}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </td>

                  <td
                    width="320"
                    valign="top"
                    align="center"
                    style={{ width: 320, padding: '20px 28px 14px', color: '#111' }}
                  >
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr>
                          {socials.map((social) => (
                            <td key={social.file} align="center" style={{ padding: '1px 5px 11px' }}>
                              <a href={social.href} target="_blank" rel="noreferrer" style={{ display: 'block', lineHeight: 0 }}>
                                <img
                                  src={asset(social.file)}
                                  alt={social.label}
                                  width="31"
                                  height="31"
                                  style={{ display: 'block', border: 0, width: 31, height: 31, objectFit: 'contain' }}
                                />
                              </a>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ width: '100%', height: 1, background: '#808080' }} />

                    <div style={{ marginTop: 14, textAlign: 'center', fontSize: 11, lineHeight: '14px', fontWeight: 400, letterSpacing: '3.2px', whiteSpace: 'nowrap' }}>
                      <a
                        href="https://maps.app.goo.gl/GujN3CKSUuL5t3Hv8"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#111', textDecoration: 'none' }}
                      >
                        SYDNEY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;REGIONAL NSW
                      </a>
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
      </div>
    </main>
  );
}
