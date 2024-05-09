import { Resend } from 'resend';

const resend = new Resend(process.env.REACT_APP_RESEND_ID);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'test@test.re',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});