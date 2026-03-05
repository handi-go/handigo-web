import secrets

HANDIGO_PRIMARY_COLOR = "#124096"


def generate_otp_code() -> str:
    # Keep it 4-digit and numeric, preserving leading zeros.
    return f"{secrets.randbelow(10000):04d}"


def build_verification_email_template(first_name: str, otp_code: str) -> str:
    safe_first_name = first_name.strip() if first_name else "there"
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Handigo Verification Code</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;color:#101828;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:{HANDIGO_PRIMARY_COLOR};padding:24px 28px;color:#ffffff;">
              <h1 style="margin:0;font-size:26px;line-height:1.2;">handigo</h1>
              <p style="margin:8px 0 0;font-size:14px;opacity:0.95;">Welcome Back! Your Next Connection Awaits</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h2 style="margin:0 0 12px;font-size:24px;color:#111827;">Verification Code</h2>
              <p style="margin:0 0 20px;font-size:16px;line-height:1.5;">
                Hi {safe_first_name}, a verification code has been sent to you.
                Use this code to complete your registration.
              </p>
              <div style="display:inline-block;padding:12px 20px;border:1px solid #d0d5dd;border-radius:10px;background:#f9fafb;">
                <span style="font-size:32px;letter-spacing:10px;color:{HANDIGO_PRIMARY_COLOR};font-weight:700;">{otp_code}</span>
              </div>
              <p style="margin:20px 0 0;font-size:13px;color:#667085;">
                This code expires soon. If you did not initiate this request, please ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
""".strip()
