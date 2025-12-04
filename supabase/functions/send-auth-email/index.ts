import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@4.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_AUTH_EMAIL_HOOK_SECRET') as string
const fromAddress = Deno.env.get('RESEND_FROM_ADDRESS') || 'KenteKart <onboarding@resend.dev>'

const getConfirmationEmailHtml = (confirmationUrl: string, token: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KenteKart</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #1a1a1a;">KenteKart</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #333;">Ghana's Trusted Marketplace</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #333;">Welcome to KenteKart!</h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #555;">
                Thank you for joining Ghana's fastest-growing marketplace. Please confirm your email address to get started with buying and selling.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); color: #1a1a1a; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px;">
                      Confirm Email Address
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; font-size: 14px; color: #888; text-align: center;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; font-size: 12px; color: #D4AF37; word-break: break-all; text-align: center;">
                ${confirmationUrl}
              </p>
              <p style="margin: 30px 0 0; font-size: 12px; color: #aaa; text-align: center;">
                Your confirmation code: <strong>${token}</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888;">
                © 2024 KenteKart. All rights reserved.<br>
                If you didn't create an account, please ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

const getRecoveryEmailHtml = (confirmationUrl: string, token: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - KenteKart</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #1a1a1a;">KenteKart</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #333;">Ghana's Trusted Marketplace</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #333;">Reset Your Password</h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #555;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); color: #1a1a1a; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; font-size: 14px; color: #888; text-align: center;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; font-size: 12px; color: #D4AF37; word-break: break-all; text-align: center;">
                ${confirmationUrl}
              </p>
              <p style="margin: 30px 0 0; font-size: 12px; color: #aaa; text-align: center;">
                Your reset code: <strong>${token}</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888;">
                © 2024 KenteKart. All rights reserved.<br>
                If you didn't request a password reset, please ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)
  const wh = new Webhook(hookSecret)
  
  try {
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = wh.verify(payload, headers) as {
      user: {
        email: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

    console.log('Processing auth email:', { email_action_type, email: user.email })

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const confirmationUrl = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`

    let html: string
    let subject: string

    // Generate appropriate email based on type
    if (email_action_type === 'signup' || email_action_type === 'email_change') {
      html = getConfirmationEmailHtml(confirmationUrl, token)
      subject = email_action_type === 'signup' 
        ? 'Welcome to KenteKart - Confirm your email'
        : 'KenteKart - Confirm your new email'
    } else if (email_action_type === 'recovery') {
      html = getRecoveryEmailHtml(confirmationUrl, token)
      subject = 'KenteKart - Reset your password'
    } else {
      html = getConfirmationEmailHtml(confirmationUrl, token)
      subject = 'KenteKart - Email confirmation'
    }

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Auth email sent successfully to:', user.email)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in send-auth-email function:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: error.code,
          message: error.message,
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})