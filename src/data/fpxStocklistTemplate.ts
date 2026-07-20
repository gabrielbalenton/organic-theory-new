// FPX Weekly Stocklist — Brevo-ready email HTML template.
// Placeholder tokens ({{TOKEN}}) are replaced verbatim by src/pages/FPXStocklist.tsx.
// Do not alter structure/styles here without updating the Compose form to match.

export const FPX_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FPX Weekly Stocklist</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Lato:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#e8e4de;font-family:'Open Sans',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8e4de;">
  <tr>
    <td align="center" style="padding:32px 0;">
      <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.10);">

        <!-- HEADER -->
        <tr>
          <td style="background-color:#ffffff;padding:20px 32px 18px;border-bottom:3px solid #1a8638;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <a href="https://app.fpx.nz/" style="border:0;display:block;">
                    <img src="https://img.mailinblue.com/8981968/images/content_library/original/6a3b0ed48b57c4a126fd4f1a_2c2b85a3616578d9.png" alt="FPX Forest Products Exchange" width="130" style="display:block;height:auto;border:0;mix-blend-mode:multiply;">
                  </a>
                </td>
                <td align="right" valign="middle">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;">Weekly Stocklist</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- HERO -->
        <tr>
          <td style="background-color:#1a8638;padding:36px 32px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.55);font-family:'Lato',Arial,sans-serif;">Weekly Stocklist</p>
                  <h1 style="margin:0 0 10px;font-family:'Montserrat',Arial,sans-serif;font-size:30px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.5px;">Your curated<br>timber selection.</h1>
                  <p style="margin:0 0 22px;font-size:13px;color:rgba(255,255,255,0.78);font-family:'Open Sans',Arial,sans-serif;line-height:1.65;">Fresh stock. Direct from mill. Updated every week.</p>
                  <a href="https://app.fpx.nz/" style="display:inline-block;background-color:#ffffff;color:#1a8638;font-family:'Montserrat',Arial,sans-serif;font-size:12px;font-weight:700;padding:10px 24px;border-radius:100px;text-decoration:none;letter-spacing:0.3px;">View All Listings &rarr;</a>
                </td>
                <td width="130" align="right" valign="bottom" style="padding-left:16px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background-color:rgba(255,255,255,0.08);border-radius:6px;padding:14px 16px;text-align:center;">
                        <p style="margin:0 0 2px;font-size:26px;font-weight:800;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;line-height:1;">{{FEATURED_COUNT}}</p>
                        <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.65);font-family:'Lato',Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;">Featured<br>Lines</p>
                      </td>
                    </tr>
                    <tr><td style="height:8px;"></td></tr>
                    <tr>
                      <td style="background-color:rgba(255,255,255,0.08);border-radius:6px;padding:14px 16px;text-align:center;">
                        <p style="margin:0 0 2px;font-size:26px;font-weight:800;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;line-height:1;">17</p>
                        <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.65);font-family:'Lato',Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;">Categories<br>Available</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FEATURED STOCK HEADER -->
        <tr>
          <td style="padding:28px 32px 6px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle">
                  <h2 style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:18px;font-weight:700;color:#111111;letter-spacing:-0.2px;">Featured Stock This Week</h2>
                </td>
                <td valign="middle" align="right">
                  <a href="https://app.fpx.nz/" style="font-size:12px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;text-decoration:none;">See all &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SLOT 1 — BEST SINGLE-PACKET DEAL (GREEN) -->
        <tr>
          <td style="padding:16px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
              <tr>
                <td width="4" style="background-color:#1a8638;padding:0;">&nbsp;</td>
                <td width="148" valign="top" style="padding:0;background-color:#f7f7f5;">
                  <a href="{{SLOT1_URL}}" style="display:block;border:0;">
                    <img src="{{SLOT1_IMAGE_URL}}" alt="{{SLOT1_SIZE}}" width="148" height="155" style="display:block;width:148px;height:155px;object-fit:contain;object-position:center;border:0;padding:12px;box-sizing:border-box;">
                  </a>
                </td>
                <td valign="top" style="padding:16px 18px;border-left:1px solid #ebebeb;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px;">
                    <tr>
                      <td style="background-color:#1a8638;border-radius:100px;padding:4px 10px;line-height:1;">
                        <span style="font-size:10px;font-weight:700;color:#ffffff;text-transform:uppercase;font-family:'Lato',Arial,sans-serif;line-height:1;">Best Single-Packet Deal</span>
                      </td>
                    </tr>
                  </table>
                  <!--SLOT1_TAGS_START--><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                    <tr>
                      <!--SLOT1_CATEGORY_START--><td style="white-space:nowrap;padding:0 6px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#eef7f0;border:1px solid #cdeada;border-radius:100px;padding:4px 10px;line-height:1;text-align:center;">
                        <span style="font-size:10px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1;white-space:nowrap;">{{SLOT1_CATEGORY}}</span>
                      </td></tr></table></td><!--SLOT1_CATEGORY_END-->
                      <!--SLOT1_SAVINGS_START--><td style="padding-left:8px;white-space:nowrap;">
                        <span style="font-size:12px;font-weight:800;color:#1a8638;font-family:'Montserrat',Arial,sans-serif;">{{SLOT1_SAVINGS}}</span>
                      </td><!--SLOT1_SAVINGS_END-->
                    </tr>
                  </table><!--SLOT1_TAGS_END-->
                  <p style="margin:0 0 2px;font-family:'Montserrat',Arial,sans-serif;font-size:21px;font-weight:800;color:#111111;line-height:1.1;letter-spacing:-0.3px;">{{SLOT1_SIZE}}</p>
                  <p style="margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a8638;line-height:1;">{{SLOT1_GRADE}}</p>
                  <p style="margin:0 0 10px;font-family:'Montserrat',Arial,sans-serif;font-size:15px;font-weight:800;color:#111111;line-height:1;">{{SLOT1_PRICE_MAIN}} <span style="font-size:12px;font-weight:600;color:#888;">{{SLOT1_PRICE_SUB}}</span></p>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;border-collapse:collapse;width:100%;">
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Treatment</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT1_TREATMENT}}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Condition</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT1_CONDITION}}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Profile</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT1_PROFILE}}</td>
                    </tr>
                    <tr>
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Length</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT1_LENGTH}}</td>
                    </tr>
                  </table>
                  <p style="margin:0 0 12px;font-size:11px;color:#888;font-family:'Open Sans',Arial,sans-serif;line-height:1.6;">
                    📦 {{SLOT1_PCS}} pcs per pack &nbsp;&bull;&nbsp; 🚀 {{SLOT1_DISPATCH}}<br>
                    Min. order: 1x Packet &nbsp;&bull;&nbsp; {{SLOT1_AVAIL}} available
                  </p>
                  <a href="{{SLOT1_URL}}" style="display:inline-block;background-color:#1a8638;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:700;padding:8px 20px;border-radius:100px;text-decoration:none;letter-spacing:0.3px;">View This Listing</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SLOT 2 — BEST BULK DEAL (BLUE) -->
        <tr>
          <td style="padding:10px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
              <tr>
                <td width="4" style="background-color:#2563a8;padding:0;">&nbsp;</td>
                <td width="148" valign="top" style="padding:0;background-color:#f7f7f5;">
                  <a href="{{SLOT2_URL}}" style="display:block;border:0;">
                    <img src="{{SLOT2_IMAGE_URL}}" alt="{{SLOT2_SIZE}}" width="148" height="155" style="display:block;width:148px;height:155px;object-fit:contain;object-position:center;border:0;padding:12px;box-sizing:border-box;">
                  </a>
                </td>
                <td valign="top" style="padding:16px 18px;border-left:1px solid #ebebeb;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px;">
                    <tr>
                      <td style="background-color:#2563a8;border-radius:100px;padding:4px 10px;line-height:1;">
                        <span style="font-size:10px;font-weight:700;color:#ffffff;text-transform:uppercase;font-family:'Lato',Arial,sans-serif;line-height:1;">Best Bulk Deal</span>
                      </td>
                    </tr>
                  </table>
                  <!--SLOT2_TAGS_START--><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                    <tr>
                      <!--SLOT2_CATEGORY_START--><td style="white-space:nowrap;padding:0 6px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#eaf1fa;border:1px solid #cfe0f2;border-radius:100px;padding:4px 10px;line-height:1;text-align:center;">
                        <span style="font-size:10px;font-weight:700;color:#2563a8;font-family:'Lato',Arial,sans-serif;line-height:1;white-space:nowrap;">{{SLOT2_CATEGORY}}</span>
                      </td></tr></table></td><!--SLOT2_CATEGORY_END-->
                      <!--SLOT2_SAVINGS_START--><td style="padding-left:8px;white-space:nowrap;">
                        <span style="font-size:12px;font-weight:800;color:#2563a8;font-family:'Montserrat',Arial,sans-serif;">{{SLOT2_SAVINGS}}</span>
                      </td><!--SLOT2_SAVINGS_END-->
                    </tr>
                  </table><!--SLOT2_TAGS_END-->
                  <p style="margin:0 0 2px;font-family:'Montserrat',Arial,sans-serif;font-size:21px;font-weight:800;color:#111111;line-height:1.1;letter-spacing:-0.3px;">{{SLOT2_SIZE}}</p>
                  <p style="margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;font-size:14px;font-weight:700;color:#2563a8;line-height:1;">{{SLOT2_GRADE}}</p>
                  <p style="margin:0 0 10px;font-family:'Montserrat',Arial,sans-serif;font-size:15px;font-weight:800;color:#111111;line-height:1;">{{SLOT2_PRICE_MAIN}} <span style="font-size:12px;font-weight:600;color:#888;">{{SLOT2_PRICE_SUB}}</span></p>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;border-collapse:collapse;width:100%;">
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Treatment</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT2_TREATMENT}}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Condition</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT2_CONDITION}}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Profile</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT2_PROFILE}}</td>
                    </tr>
                    <tr>
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Length</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT2_LENGTH}}</td>
                    </tr>
                  </table>
                  <p style="margin:0 0 12px;font-size:11px;color:#888;font-family:'Open Sans',Arial,sans-serif;line-height:1.6;">
                    📦 {{SLOT2_PCS}} pcs per pack &nbsp;&bull;&nbsp; 🚀 {{SLOT2_DISPATCH}}<br>
                    Min. order: {{SLOT2_MOQ}} &nbsp;&bull;&nbsp; {{SLOT2_AVAIL}} available
                  </p>
                  <a href="{{SLOT2_URL}}" style="display:inline-block;background-color:#2563a8;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:700;padding:8px 20px;border-radius:100px;text-decoration:none;letter-spacing:0.3px;">View This Listing</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SLOT 3 — SELLING FAST (ORANGE) -->
        <!--SLOT3_START-->
        <tr>
          <td style="padding:10px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
              <tr>
                <td width="4" style="background-color:#d97706;padding:0;">&nbsp;</td>
                <td width="148" valign="top" style="padding:0;background-color:#f7f7f5;">
                  <a href="{{SLOT3_URL}}" style="display:block;border:0;">
                    <img src="{{SLOT3_IMAGE_URL}}" alt="{{SLOT3_SIZE}}" width="148" height="155" style="display:block;width:148px;height:155px;object-fit:contain;object-position:center;border:0;padding:12px;box-sizing:border-box;">
                  </a>
                </td>
                <td valign="top" style="padding:16px 18px;border-left:1px solid #ebebeb;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px;">
                    <tr>
                      <td style="background-color:#d97706;border-radius:100px;padding:4px 10px;line-height:1;">
                        <span style="font-size:10px;font-weight:700;color:#ffffff;text-transform:uppercase;font-family:'Lato',Arial,sans-serif;line-height:1;">&#9889; Selling Fast</span>
                      </td>
                    </tr>
                  </table>
                  <!--SLOT3_TAGS_START--><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                    <tr>
                      <!--SLOT3_CATEGORY_START--><td style="white-space:nowrap;padding:0 6px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#fdf1e0;border:1px solid #f3dcb2;border-radius:100px;padding:4px 10px;line-height:1;text-align:center;">
                        <span style="font-size:10px;font-weight:700;color:#d97706;font-family:'Lato',Arial,sans-serif;line-height:1;white-space:nowrap;">{{SLOT3_CATEGORY}}</span>
                      </td></tr></table></td><!--SLOT3_CATEGORY_END-->
                      <!--SLOT3_SAVINGS_START--><td style="padding-left:8px;white-space:nowrap;">
                        <span style="font-size:12px;font-weight:800;color:#d97706;font-family:'Montserrat',Arial,sans-serif;">{{SLOT3_SAVINGS}}</span>
                      </td><!--SLOT3_SAVINGS_END-->
                    </tr>
                  </table><!--SLOT3_TAGS_END-->
                  <p style="margin:0 0 2px;font-family:'Montserrat',Arial,sans-serif;font-size:21px;font-weight:800;color:#111111;line-height:1.1;letter-spacing:-0.3px;">{{SLOT3_SIZE}}</p>
                  <p style="margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;font-size:14px;font-weight:700;color:#d97706;line-height:1;">{{SLOT3_GRADE}}</p>
                  <p style="margin:0 0 10px;font-family:'Montserrat',Arial,sans-serif;font-size:15px;font-weight:800;color:#111111;line-height:1;">{{SLOT3_PRICE_MAIN}} <span style="font-size:12px;font-weight:600;color:#888;">{{SLOT3_PRICE_SUB}}</span></p>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;border-collapse:collapse;width:100%;">
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Treatment</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT3_TREATMENT}}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Condition</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT3_CONDITION}}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f0f0f0;">
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Profile</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT3_PROFILE}}</td>
                    </tr>
                    <tr>
                      <td style="font-size:11px;font-weight:700;color:#888;font-family:'Lato',Arial,sans-serif;padding:4px 10px 4px 0;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Length</td>
                      <td style="font-size:12px;color:#333;font-family:'Open Sans',Arial,sans-serif;padding:4px 0;">{{SLOT3_LENGTH}}</td>
                    </tr>
                  </table>
                  <p style="margin:0 0 12px;font-size:11px;color:#d97706;font-family:'Open Sans',Arial,sans-serif;line-height:1.6;font-weight:700;">⚠ Only {{SLOT3_QTY_AVAILABLE}} remaining — move fast.</p>
                  <p style="margin:0 0 12px;font-size:11px;color:#888;font-family:'Open Sans',Arial,sans-serif;line-height:1.6;">
                    📦 {{SLOT3_PCS}} pcs per pack &nbsp;&bull;&nbsp; 🚀 {{SLOT3_DISPATCH}}<br>
                    Min. order: {{SLOT3_MOQ}}
                  </p>
                  <a href="{{SLOT3_URL}}" style="display:inline-block;background-color:#d97706;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:700;padding:8px 20px;border-radius:100px;text-decoration:none;letter-spacing:0.3px;">View This Listing</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!--SLOT3_END-->

        <!-- BROWSE BY CATEGORY -->
        <tr>
          <td style="padding:32px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
              <tr>
                <td style="border-top:2px solid #1a8638;width:24px;"></td>
                <td style="padding:0 12px;"><h2 style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:16px;font-weight:700;color:#111111;white-space:nowrap;">Browse by Category</h2></td>
                <td style="border-top:1px solid #e8e8e8;width:100%;"></td>
              </tr>
            </table>
            <p style="margin:0 0 16px;font-size:12px;color:#999;font-family:'Lato',Arial,sans-serif;">In-stock categories updated weekly. Click to see live listings.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f5;border-radius:8px;border:1px solid #e8e8e8;overflow:hidden;">
              <tr><td style="padding:16px 16px 10px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:7px;"><tr>
                  <td width="33%" style="padding:0 4px 0 0;"><a href="https://app.fpx.nz/categories-details?recordId=rec51xrJJH8DO88vz" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Treated Timber</span></a></td>
                  <td width="33%" style="padding:0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=reccjo7MzIHJzpraW" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Scaffold Planks</span></a></td>
                  <td width="33%" style="padding:0 0 0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recRkQGH44OakERvd" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Retaining</span></a></td>
                </tr></table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:7px;"><tr>
                  <td width="33%" style="padding:0 4px 0 0;"><a href="https://app.fpx.nz/categories-details?recordId=rect7xxVm8iikptSe" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Outdoor</span></a></td>
                  <td width="33%" style="padding:0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recBZUeJBcYJVJd4d" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Stress Graded</span></a></td>
                  <td width="33%" style="padding:0 0 0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=rec7uV8ogo92OTqQB" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Sleepers, Squares &amp; Beams</span></a></td>
                </tr></table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:7px;"><tr>
                  <td width="33%" style="padding:0 4px 0 0;"><a href="https://app.fpx.nz/categories-details?recordId=recG4MIYz2eeKEgZ0" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">External Framing</span></a></td>
                  <td width="33%" style="padding:0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recR0Rtm3bul50Clo" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Decking</span></a></td>
                  <td width="33%" style="padding:0 0 0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recvG6OvANTUEkuAj" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Internal Framing</span></a></td>
                </tr></table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:7px;"><tr>
                  <td width="33%" style="padding:0 4px 0 0;"><a href="https://app.fpx.nz/categories-details?recordId=rec64FMiy69Ki8x5s" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Rails</span></a></td>
                  <td width="33%" style="padding:0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recW5w8HilkoOMDsY" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Screening</span></a></td>
                  <td width="33%" style="padding:0 0 0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recP2TX1Y3nrqx5wX" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Posts</span></a></td>
                </tr></table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:7px;"><tr>
                  <td width="33%" style="padding:0 4px 0 0;"><a href="https://app.fpx.nz/categories-details?recordId=recm7ueQOjxxQbM3F" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Pegs</span></a></td>
                  <td width="33%" style="padding:0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recWHi3OzsBKVru42" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Palings</span></a></td>
                  <td width="33%" style="padding:0 0 0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recooQcbCktBh8rJA" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Fencing</span></a></td>
                </tr></table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="33%" style="padding:0 4px 0 0;"><a href="https://app.fpx.nz/categories-details?recordId=rec7UIVl2Nlssktk9" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Balustrades</span></a></td>
                  <td width="33%" style="padding:0 4px;"><a href="https://app.fpx.nz/categories-details?recordId=recQQ4dWwJ3dKKQgn" style="display:block;text-decoration:none;background-color:#ffffff;border:1px solid #d4eed9;border-radius:5px;padding:9px 6px;text-align:center;"><span style="font-size:11px;font-weight:700;color:#1a8638;font-family:'Lato',Arial,sans-serif;line-height:1.35;display:block;">Ceiling Batten</span></a></td>
                  <td width="33%" style="padding:0 0 0 4px;"></td>
                </tr></table>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- CTA BANNER -->
        <tr>
          <td style="padding:20px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111111;border-radius:8px;overflow:hidden;">
              <tr>
                <td style="padding:22px 28px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle">
                        <p style="margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;line-height:1.2;">More stock on FPX</p>
                        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.6);font-family:'Open Sans',Arial,sans-serif;">New listings every week across all categories.</p>
                      </td>
                      <td align="right" valign="middle" style="padding-left:16px;white-space:nowrap;">
                        <a href="https://app.fpx.nz/" style="display:inline-block;background-color:#1a8638;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:12px;font-weight:700;padding:10px 22px;border-radius:100px;text-decoration:none;">Browse All &rarr;</a>
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
          <td style="padding:28px 32px 24px;text-align:center;">
            <a href="https://app.fpx.nz/" style="border:0;display:inline-block;margin-bottom:14px;">
              <img src="https://img.mailinblue.com/8981968/images/content_library/original/6a3b0ed48b57c4a126fd4f1a_2c2b85a3616578d9.png" alt="FPX Forest Products Exchange" width="100" style="display:block;height:auto;border:0;mix-blend-mode:multiply;">
            </a>
            <p style="margin:0 0 12px;font-size:11px;color:#aaa;font-family:'Open Sans',Arial,sans-serif;">Follow us on:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 18px;">
              <tr>
                <td style="padding:0 5px;"><a href="https://www.facebook.com/profile.php?id=61583101360304" target="_blank" style="display:block;text-decoration:none;"><img src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_bw/facebook_32px.png" width="32" height="32" alt="Facebook" style="display:block;border:0;"></a></td>
                <td style="padding:0 5px;"><a href="https://www.instagram.com/fpx.nz/" target="_blank" style="display:block;text-decoration:none;"><img src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_bw/instagram_32px.png" width="32" height="32" alt="Instagram" style="display:block;border:0;"></a></td>
                <td style="padding:0 5px;"><a href="https://www.linkedin.com/company/forest-products-exchange" target="_blank" style="display:block;text-decoration:none;"><img src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_bw/linkedin_32px.png" width="32" height="32" alt="LinkedIn" style="display:block;border:0;"></a></td>
              </tr>
            </table>
            <p style="margin:0;font-size:11px;color:#cccccc;font-family:'Open Sans',Arial,sans-serif;line-height:1.7;">
              Forest Products Exchange, New Zealand &nbsp;&bull;&nbsp;
              <a href="https://fpx.nz" style="color:#cccccc;text-decoration:none;">fpx.nz</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

export interface SlotFields {
  name: string;
  url: string;
  imageUrl: string;
  size: string;
  grade: string;
  treatment: string;
  condition: string;
  profile: string;
  pcs: string;
  minOrder: string;
  availability: string;
  dispatch: string;
  category: string;
  savingsPct: string;
  price: string;
  length: string;
  /** Numeric quantity actually available. Used only for Slot 3 (Selling Fast)
   * to decide whether the deal is shown at all — see minOrderQty below. */
  qtyAvailable: string;
  /** Numeric min-order threshold, parsed from minOrder's leading number.
   * If left blank, falls back to parsing the leading number out of minOrder. */
  minOrderQty: string;
}

// Pulls the first integer out of a free-text quantity string, e.g.
// "2x Packets" -> 2, "12" -> 12. Returns null if nothing numeric is found.
function parseLeadingInt(text: string): number | null {
  const m = text.match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

// "treated timber" / "TREATED TIMBER" -> "Treated Timber", regardless of
// how it was typed into the details blob.
function toTitleCase(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(' ');
}

// "15" / "15%" / "15% OFF" -> "15% off", one consistent format
// regardless of how it was typed into the details blob.
function formatSavingsBadge(text: string): string {
  const m = text.match(/(\d+(?:\.\d+)?)/);
  return m ? `${m[1]}% off` : '';
}

// Splits "$924/M3 ($4.62/LM)" into a bold main part and a lighter
// secondary part, matching the two-tone price line in the template.
// Falls back to putting the whole string in the main part if there's
// no trailing "(...)" to split off.
function splitPrice(text: string): { main: string; sub: string } {
  const m = text.trim().match(/^(.*?)\s*(\(.+\))$/);
  if (m) return { main: m[1].trim(), sub: m[2].trim() };
  return { main: text.trim(), sub: '' };
}

// Removes a <!--MARKER_START-->...<!--MARKER_END--> block entirely when
// value is blank, otherwise just strips the marker comments — used to hide
// the Category/Savings pills instead of rendering an empty badge.
function stripIfEmpty(html: string, marker: string, value: string): string {
  const block = new RegExp(`<!--${marker}_START-->[\\s\\S]*?<!--${marker}_END-->`);
  if (!value.trim()) return html.replace(block, '');
  return html.replace(`<!--${marker}_START-->`, '').replace(`<!--${marker}_END-->`, '');
}

export function renderFpxTemplate(weekLabel: string, slot1: SlotFields, slot2: SlotFields, slot3: SlotFields): string {
  const qtyAvailable = parseLeadingInt(slot3.qtyAvailable) ?? parseLeadingInt(slot3.availability);
  const minOrderQty = parseLeadingInt(slot3.minOrderQty) ?? parseLeadingInt(slot3.minOrder);
  // If we know both numbers and the deal doesn't clear the min order, don't feature it.
  const showSlot3 = !(qtyAvailable !== null && minOrderQty !== null && qtyAvailable < minOrderQty);

  const category1 = toTitleCase(slot1.category);
  const category2 = toTitleCase(slot2.category);
  const category3 = toTitleCase(slot3.category);
  const savings1 = formatSavingsBadge(slot1.savingsPct);
  const savings2 = formatSavingsBadge(slot2.savingsPct);
  const savings3 = formatSavingsBadge(slot3.savingsPct);
  const price1 = splitPrice(slot1.price);
  const price2 = splitPrice(slot2.price);
  const price3 = splitPrice(slot3.price);

  const replacements: Record<string, string> = {
    WEEK_LABEL: weekLabel,
    FEATURED_COUNT: showSlot3 ? '3' : '2',
    SLOT1_URL: slot1.url,
    SLOT1_IMAGE_URL: slot1.imageUrl,
    SLOT1_SIZE: slot1.size,
    SLOT1_GRADE: slot1.grade,
    SLOT1_TREATMENT: slot1.treatment,
    SLOT1_CONDITION: slot1.condition,
    SLOT1_PROFILE: slot1.profile,
    SLOT1_PCS: slot1.pcs,
    SLOT1_DISPATCH: slot1.dispatch,
    SLOT1_AVAIL: slot1.availability,
    SLOT1_CATEGORY: category1,
    SLOT1_SAVINGS: savings1,
    SLOT1_PRICE_MAIN: price1.main,
    SLOT1_PRICE_SUB: price1.sub,
    SLOT1_LENGTH: slot1.length,
    SLOT2_URL: slot2.url,
    SLOT2_IMAGE_URL: slot2.imageUrl,
    SLOT2_SIZE: slot2.size,
    SLOT2_GRADE: slot2.grade,
    SLOT2_TREATMENT: slot2.treatment,
    SLOT2_CONDITION: slot2.condition,
    SLOT2_PROFILE: slot2.profile,
    SLOT2_PCS: slot2.pcs,
    SLOT2_DISPATCH: slot2.dispatch,
    SLOT2_MOQ: slot2.minOrder,
    SLOT2_AVAIL: slot2.availability,
    SLOT2_CATEGORY: category2,
    SLOT2_SAVINGS: savings2,
    SLOT2_PRICE_MAIN: price2.main,
    SLOT2_PRICE_SUB: price2.sub,
    SLOT2_LENGTH: slot2.length,
    SLOT3_URL: slot3.url,
    SLOT3_IMAGE_URL: slot3.imageUrl,
    SLOT3_SIZE: slot3.size,
    SLOT3_GRADE: slot3.grade,
    SLOT3_TREATMENT: slot3.treatment,
    SLOT3_CONDITION: slot3.condition,
    SLOT3_PROFILE: slot3.profile,
    SLOT3_PCS: slot3.pcs,
    SLOT3_DISPATCH: slot3.dispatch,
    SLOT3_MOQ: slot3.minOrder,
    SLOT3_AVAIL: slot3.availability,
    SLOT3_CATEGORY: category3,
    SLOT3_SAVINGS: savings3,
    SLOT3_PRICE_MAIN: price3.main,
    SLOT3_PRICE_SUB: price3.sub,
    SLOT3_LENGTH: slot3.length,
    SLOT3_QTY_AVAILABLE: slot3.qtyAvailable,
  };
  let html = FPX_TEMPLATE;
  if (!showSlot3) {
    html = html.replace(/<!--SLOT3_START-->[\s\S]*?<!--SLOT3_END-->/, '');
  } else {
    html = html.replace(/<!--SLOT3_START-->|<!--SLOT3_END-->/g, '');
  }
  html = stripIfEmpty(html, 'SLOT1_CATEGORY', category1);
  html = stripIfEmpty(html, 'SLOT1_SAVINGS', savings1);
  html = stripIfEmpty(html, 'SLOT2_CATEGORY', category2);
  html = stripIfEmpty(html, 'SLOT2_SAVINGS', savings2);
  html = stripIfEmpty(html, 'SLOT3_CATEGORY', category3);
  html = stripIfEmpty(html, 'SLOT3_SAVINGS', savings3);
  html = stripIfEmpty(html, 'SLOT1_TAGS', category1 + savings1);
  html = stripIfEmpty(html, 'SLOT2_TAGS', category2 + savings2);
  html = stripIfEmpty(html, 'SLOT3_TAGS', category3 + savings3);
  for (const [token, value] of Object.entries(replacements)) {
    html = html.split(`{{${token}}}`).join(value ?? '');
  }
  return html;
}
