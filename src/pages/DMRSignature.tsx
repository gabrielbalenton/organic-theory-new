import { useMemo, useRef, useState } from 'react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

const socials = [
  ['linkedin.png', 'LinkedIn', 'https://www.linkedin.com/company/dmr-designs-aus'],
  ['instagram.png', 'Instagram', 'https://www.instagram.com/dmrdesigns_/?hl=en'],
  ['youtube.png', 'YouTube', 'https://www.youtube.com/@dmrdesigns1'],
  ['pinterest.png', 'Pinterest', 'https://au.pinterest.com/dmrdesigns_/'],
  ['tiktok.png', 'TikTok', 'https://www.tiktok.com/@dmrdesigns_'],
  ['facebook.png', 'Facebook', 'https://www.facebook.com/DMRDESIGNS.com.au/'],
] as const;

export default function DMRSignature() {
  const signatureRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const signatureHtml = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const origin = window.location.origin;
    const asset = (name: string) => `${origin}/images/DMR%20Assets/${name}`;

    const socialHtml = socials.map(([file, label, href]) => `
      <td align="center" valign="middle" style="padding:0 4px;">
        <a href="${href}" target="_blank" style="text-decoration:none;display:block;">
          <img src="${asset(file)}" alt="${label}" width="22" height="22"
            style="display:block;border:0;width:22px;height:22px;object-fit:contain;">
        </a>
      </td>`
    ).join('');

    return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="700"
  style="width:700px;border-collapse:collapse;background:#ffffff;font-family:Montserrat,Arial,Helvetica,sans-serif;color:#111111;mso-table-lspace:0pt;mso-table-rspace:0pt;">

  <tr>
    <td colspan="3" style="padding:0;margin:0;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="700" height="250"
        style="width:700px;height:250px;border-collapse:collapse;background:#ffffff;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>

          <!-- LEFT BLACK LOGO PANEL -->
          <td width="290" height="250" valign="middle" bgcolor="#000000"
            style="width:290px;height:250px;background:#000000;padding:0 2px 0 6px;">
            <img src="${asset('dmr-logo-white.png')}" alt="DMR Designs" width="282"
              style="display:block;border:0;width:282px;height:auto;max-width:282px;">
          </td>

          <!-- EMAIL-SAFE DIAGONAL WEDGE -->
          <td width="80" height="250" valign="top"
            style="width:80px;height:250px;padding:0;background:#ffffff;">
            <img src="${asset('dmr-diagonal-wedge.png')}" alt="" width="80" height="250"
              style="display:block;border:0;width:80px;height:250px;">
          </td>

          <!-- RIGHT PHOTO FRAME: Gmail-safe TD background + rasterized portrait fallback -->
          <td width="330" height="250" valign="top" bgcolor="#f7f7f7"
            background="${asset('dmr-right-background.png')}"
            style="width:330px;height:250px;padding:0;background-color:#f7f7f7;background-image:url('${asset('dmr-right-background.png')}');background-repeat:no-repeat;background-position:left top;background-size:330px 250px;-webkit-background-size:330px 250px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="330" height="250"
              style="width:330px;height:250px;border-collapse:collapse;background:transparent;mso-table-lspace:0pt;mso-table-rspace:0pt;">
              <tr>

                <!-- CONTACT DETAILS -->
                <td width="170" height="250" valign="middle"
                  style="width:170px;height:250px;padding:0 4px 0 2px;color:#111111;">
                  <div style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:27px;line-height:30px;font-weight:700;letter-spacing:-1px;white-space:nowrap;">
                    Daniel Reid
                  </div>

                  <div style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:9px;line-height:13px;font-weight:500;letter-spacing:2.7px;white-space:nowrap;margin-top:2px;">
                    DESIGN DIRECTOR
                  </div>

                  <div style="border-top:1px solid #777777;width:170px;height:1px;line-height:1px;font-size:1px;margin:8px 0 8px;">&nbsp;</div>

                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                    style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
                    <tr>
                      <td width="26" valign="middle" style="width:26px;padding:0 6px 6px 0;">
                        <img src="${asset('icon-phone.png')}" alt="" width="20" height="20"
                          style="display:block;border:0;width:20px;height:20px;">
                      </td>
                      <td valign="middle" style="padding:0 0 6px;white-space:nowrap;">
                        <a href="tel:+61294109819"
                          style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:10px;line-height:15px;font-weight:700;color:#111111;text-decoration:none;">
                          02 9410 9819
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td width="26" valign="middle" style="width:26px;padding:0 6px 6px 0;">
                        <img src="${asset('icon-email.png')}" alt="" width="20" height="20"
                          style="display:block;border:0;width:20px;height:20px;">
                      </td>
                      <td valign="middle" style="padding:0 0 6px;white-space:nowrap;">
                        <a href="mailto:daniel@dmrdesigns.com.au"
                          style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:8.7px;line-height:15px;font-weight:700;color:#111111;text-decoration:none;">
                          daniel@dmrdesigns.com.au
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td width="26" valign="middle" style="width:26px;padding:0 6px 0 0;">
                        <img src="${asset('icon-web.png')}" alt="" width="20" height="20"
                          style="display:block;border:0;width:20px;height:20px;">
                      </td>
                      <td valign="middle" style="padding:0;white-space:nowrap;">
                        <a href="https://www.dmrdesigns.com.au/" target="_blank"
                          style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:9.5px;line-height:15px;font-weight:700;color:#111111;text-decoration:none;">
                          dmrdesigns.com.au
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- DANIEL PORTRAIT: normal IMG includes the building background so Gmail cannot strip it -->
                <td width="160" height="250" valign="bottom" align="right"
                  style="width:160px;height:250px;padding:0;background:#f7f7f7;">
                  <img src="${asset('dmr-daniel-panel.jpg')}" alt="Daniel Reid" width="160" height="250"
                    style="display:block;border:0;width:160px;height:250px;max-width:160px;">
                </td>

              </tr>
            </table>
          </td>

        </tr>
      </table>

    </td>
  </tr>

  <!-- FOOTER -->
  <tr>

    <!-- REGISTRATION -->
    <td width="230" valign="top"
      style="width:230px;padding:13px 14px 10px 15px;border-right:1px solid #8c8c8c;background:#ffffff;">
      <div style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:8.5px;line-height:11px;font-weight:500;letter-spacing:1.7px;white-space:nowrap;margin-bottom:8px;">
        PROFESSIONAL REGISTRATION
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td width="20" valign="top" style="width:20px;padding-top:1px;">
            <img src="${asset('icon-arrow.png')}" alt="" width="11" height="11"
              style="display:block;border:0;width:11px;height:11px;">
          </td>
          <td style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:7.6px;line-height:11px;color:#202020;padding-bottom:5px;">
            Registered Design Practitioner:<br>Medium Rise QRCCC315
          </td>
        </tr>
        <tr>
          <td width="20" valign="top" style="width:20px;padding-top:1px;">
            <img src="${asset('icon-arrow.png')}" alt="" width="11" height="11"
              style="display:block;border:0;width:11px;height:11px;">
          </td>
          <td style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:7.6px;line-height:11px;color:#202020;">
            BDAA Medium Rise 6490
          </td>
        </tr>
      </table>
    </td>

    <!-- QUALIFICATIONS -->
    <td width="255" valign="top"
      style="width:255px;padding:13px 14px 10px 20px;border-right:1px solid #8c8c8c;background:#ffffff;">
      <div style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:8.5px;line-height:11px;font-weight:500;letter-spacing:1.7px;white-space:nowrap;margin-bottom:8px;">
        QUALIFICATIONS
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td width="20" valign="middle"><img src="${asset('icon-arrow.png')}" alt="" width="11" height="11" style="display:block;border:0;width:11px;height:11px;"></td>
          <td style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:7.6px;line-height:12px;color:#202020;white-space:nowrap;">BDesign in Architecture (USYD)</td>
        </tr>
        <tr>
          <td width="20" valign="middle"><img src="${asset('icon-arrow.png')}" alt="" width="11" height="11" style="display:block;border:0;width:11px;height:11px;"></td>
          <td style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:7.6px;line-height:12px;color:#202020;white-space:nowrap;">Diploma Architectural Technology</td>
        </tr>
        <tr>
          <td width="20" valign="middle"><img src="${asset('icon-arrow.png')}" alt="" width="11" height="11" style="display:block;border:0;width:11px;height:11px;"></td>
          <td style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:7.6px;line-height:12px;color:#202020;white-space:nowrap;">Cert IV Building &amp; Construction</td>
        </tr>
      </table>
    </td>

    <!-- SOCIALS / LOCATION -->
    <td width="215" valign="top" align="center"
      style="width:215px;padding:13px 12px 9px;background:#ffffff;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"
        style="border-collapse:collapse;">
        <tr>
          ${socialHtml}
        </tr>
      </table>

      <div style="border-top:1px solid #909090;width:100%;height:1px;line-height:1px;font-size:1px;margin:8px 0 8px;">&nbsp;</div>

      <a href="https://maps.app.goo.gl/GujN3CKSUuL5t3Hv8" target="_blank"
        style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:7.8px;line-height:11px;font-weight:400;letter-spacing:2px;color:#111111;text-decoration:none;white-space:nowrap;">
        SYDNEY&nbsp;&nbsp; | &nbsp;&nbsp;REGIONAL NSW
      </a>
    </td>

  </tr>
</table>`;
  }, []);

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
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(signatureRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
      selection?.removeAllRanges();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <style>{`
      .dmr-signature-page,
      .dmr-signature-page * {
        cursor: default !important;
      }
      .dmr-signature-page a,
      .dmr-signature-page button {
        cursor: pointer !important;
      }
    `}</style>
    <main className="dmr-signature-page use-native-cursor" style={{
      minHeight: '100vh',
      background: '#f3f3f3',
      padding: '42px 20px 70px',
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
      color: '#111',
    }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#777', marginBottom: 8 }}>
            DMR Designs
          </div>
          <h1 style={{ margin: 0, fontSize: 30, lineHeight: 1.15, fontWeight: 700 }}>
            Email Signature Preview
          </h1>
          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.6, color: '#6b6b6b' }}>
            Gmail-safe version. 700px wide with table-based layout and explicit image sizing.
          </p>
        </div>

        <div style={{
          background: '#fff',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 18px 60px rgba(0,0,0,0.08)',
          overflowX: 'auto',
        }}>
          <div
            ref={signatureRef}
            style={{ width: 700, margin: '0 auto' }}
            dangerouslySetInnerHTML={{ __html: signatureHtml }}
          />
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
            Paste directly into Gmail → Settings → General → Signature.
          </span>
        </div>
      </div>
    </main>
  );
}
