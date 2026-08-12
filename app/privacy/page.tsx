import Link from "next/link";
import "../legal.css";

export const metadata = {
  title: "Privacy notice",
  description:
    "How Keelson Holdings Ltd, trading as Car Events Near Me, handles personal data on careventsnearme.uk: what we collect, why, how long we keep it, and your rights under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "12 August 2026";

export default function PrivacyPage() {
  return (
    <main className="detail legal" id="main-content">
      <h1>Privacy notice</h1>
      <p className="updated">Last updated: {UPDATED}</p>

      <p>
        This notice explains what personal data we collect through careventsnearme.uk, why we
        collect it, who we share it with, how long we keep it and what rights you have. It is given
        under Article 13 of the UK GDPR.
      </p>

      <div className="callout">
        <strong>The short version.</strong> You can browse the whole site without telling us
        anything about yourself. We do not take bookings or payments &mdash; you book on the event
        organiser&rsquo;s own website &mdash; so we never see your card details. We set no cookies,
        run no advertising and sell no data. The only form that collects personal data is the
        &ldquo;List your event&rdquo; form.
      </div>

      <h2>1. Who we are</h2>
      <p>
        The controller of your personal data is <strong>Keelson Holdings Ltd</strong>, trading as
        Car Events Near Me, a company registered in England and Wales with company number{" "}
        <strong>17359226</strong>, registered office 71-75 Shelton Street, Covent Garden, London
        WC2H 9JQ. We are registered with the Information Commissioner&rsquo;s Office under
        reference <strong>ICO:00015117984</strong>.
      </p>
      <p>
        For anything to do with this notice or your personal data, email{" "}
        <a href="mailto:info@careventsnearme.uk">info@careventsnearme.uk</a> or write to us at the
        registered office above. We have not appointed a data protection officer, as we are not
        required to.
      </p>

      <h2>2. What we collect, why, and our lawful basis</h2>

      <h3>a. When you submit an event</h3>
      <p>
        The <Link href="/list">List your event</Link> form sends what you type to our own server,
        which stores it in our database. The form asks for the event name, type, region, county,
        town, venue, start and end dates, organiser name, a &ldquo;from&rdquo; price, a booking or
        information link, a link to a photo, a one-line description, and{" "}
        <strong>your email address</strong> so we can confirm the listing with you. Personal data in
        that set is normally your email address, the organiser name if it is a person&rsquo;s name,
        and anything personal you choose to put in the free-text fields.
      </p>
      <p>
        We use it to review the submission, publish the listing if we approve it, contact you about
        it, and keep a record of who submitted what. <strong>Your email address is not
        published</strong> &mdash; it is stored with the submission and visible only to us. The
        event details, organiser name, description, photo and booking link are published on the
        site once approved.
      </p>
      <p>
        <strong>Lawful basis:</strong> Article 6(1)(b) UK GDPR &mdash; processing necessary to take
        steps at your request before entering into a listing arrangement with you, and to perform
        it. Where you submit an event you do not yourself organise, or where we contact you to
        verify details, we rely on Article 6(1)(f) &mdash; our legitimate interest in running an
        accurate, moderated directory of UK car events and in preventing spam and fraudulent
        listings.
      </p>
      <p>
        The form is the only place on this site where we ask for personal data. If our database is
        unavailable, the form tells you so and nothing is stored.
      </p>

      <h3>b. When you email us</h3>
      <p>
        If you email us we keep the message and your address so we can reply and keep a record of
        the correspondence. <strong>Lawful basis:</strong> Article 6(1)(f) &mdash; our legitimate
        interest in responding to enquiries and keeping business records; or Article 6(1)(b) where
        the email is about a listing arrangement with you.
      </p>

      <h3>c. Server logs</h3>
      <p>
        Our hosting provider, Vercel, records technical information about every request to the site
        &mdash; typically your IP address, the page requested, the time, your browser type and the
        referring page. We use this to keep the site running, investigate errors and protect it
        from abuse. <strong>Lawful basis:</strong> Article 6(1)(f) &mdash; our legitimate interest
        in the security, availability and correct operation of the site.
      </p>

      <h3>d. Audience measurement</h3>
      <p>
        We use <strong>Vercel Web Analytics</strong> to count page views and see which pages,
        countries, referrers and device types are popular. It does not use cookies and does not
        track you across other websites. Vercel derives a temporary identifier from your request
        (including your IP address and browser type) so that a visit is not counted twice; that
        identifier is not usable to identify you and is not retained beyond the day. We only ever
        see aggregate statistics. <strong>Lawful basis:</strong> Article 6(1)(f) &mdash; our
        legitimate interest in understanding, at an aggregate level, how the site is used so we can
        improve it. We do not profile you or make automated decisions about you.
      </p>

      <h3>e. What we do not collect</h3>
      <ul>
        <li>
          <strong>No payment data.</strong> We do not take bookings or payments. Every booking is
          completed on the organiser&rsquo;s own website, so card and payment details never reach
          us.
        </li>
        <li>
          <strong>No accounts.</strong> There is no way to register or log in. The
          &ldquo;Sign in&rdquo; page is a placeholder that collects nothing.
        </li>
        <li>
          <strong>No location tracking, no advertising, no data broking.</strong> We do not use
          advertising or social-media tracking pixels, we do not build profiles, and we never sell
          or rent personal data.
        </li>
        <li>
          <strong>No special category data.</strong> Please do not send us health, political or
          other sensitive information &mdash; we have no need for it.
        </li>
      </ul>

      <h2>3. Cookies and storage on your device</h2>
      <p>
        <strong>This site sets no cookies</strong> &mdash; not for analytics, not for advertising,
        not for anything. Two things are stored on your device by the site itself:
      </p>
      <ul>
        <li>
          <strong>An app-install reminder flag.</strong> If you dismiss the &ldquo;Get the Car
          Events app&rdquo; banner, we store the date you dismissed it in your browser&rsquo;s local
          storage, under the key <code>cenm-install-dismissed</code>, so we do not nag you again for
          a fortnight.
        </li>
        <li>
          <strong>An offline cache.</strong> The site is installable as an app, so a service worker
          keeps a copy of the pages you have visited and of static files such as the icon and
          stylesheet, in a browser cache named <code>cenm-v2</code>. This lets the site work when
          you are offline. Nothing in that cache is sent to us or to anyone else &mdash; it stays in
          your browser.
        </li>
      </ul>
      <p>
        Both are strictly necessary to provide features you have asked for, so we do not ask for
        consent for them. You can remove both at any time by clearing site data for
        careventsnearme.uk in your browser settings. If we ever add cookies or storage that are not
        strictly necessary, we will ask for your consent first.
      </p>

      <h2>4. Who else is involved</h2>
      <p>We use a small number of service providers, who process data on our instructions:</p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> &mdash; hosting for the website, server logs and Vercel Web
          Analytics.
        </li>
        <li>
          <strong>Supabase Inc.</strong> &mdash; the managed Postgres database that stores event
          listings and event submissions, including the contact email you give on the submission
          form.
        </li>
      </ul>
      <p>
        We do not use a third-party email marketing platform, a customer relationship management
        system or a third-party form processor. We do not use Google Fonts or any other hosted web
        font, so no font provider sees your visit.
      </p>
      <p>
        Two other things are worth knowing, because they involve your browser talking to someone
        else:
      </p>
      <ul>
        <li>
          <strong>Event photographs.</strong> Some listing images are stock photographs loaded
          directly from <strong>Pexels</strong> (images.pexels.com), so your browser makes a request
          to Pexels and they will see your IP address and browser type. Photographs taken from
          organisers&rsquo; own sites are fetched by our server and re-served from our domain, so
          those sites do not see you.
        </li>
        <li>
          <strong>Outbound booking links.</strong> When you click through to book, you go to the
          organiser&rsquo;s website (or, if we do not hold a direct link, to a Google search for
          their official tickets). From that point their privacy notice applies, not ours.
        </li>
      </ul>
      <p>
        We may also disclose personal data where we are legally required to, or to establish,
        exercise or defend legal claims. If our business is ever sold or reorganised, data may pass
        to the buyer under the same protections.
      </p>
      <p>
        <strong>Transfers outside the UK.</strong> Vercel and Supabase are US-headquartered and
        their infrastructure and support may involve access to data from outside the UK. Where that
        happens, transfers are covered by the safeguards in those providers&rsquo; standard data
        processing terms &mdash; the UK International Data Transfer Addendum to the EU Standard
        Contractual Clauses, or an equivalent approved mechanism.
      </p>

      <h2>5. How long we keep things</h2>
      <ul>
        <li>
          <strong>Published listings</strong> &mdash; kept while the event is upcoming. Past events
          drop off the site automatically once the end date has passed, and the record is retained
          afterwards as part of our archive of what we have published.
        </li>
        <li>
          <strong>The contact email on a submission</strong> &mdash; kept while the listing is live
          and for up to 12 months after the event, then deleted.
        </li>
        <li>
          <strong>Submissions we reject</strong> &mdash; kept for up to 6 months so we can recognise
          duplicates and repeat spam, then deleted.
        </li>
        <li>
          <strong>Emails</strong> &mdash; kept for up to 24 months, longer where we need them for a
          legal or accounting reason.
        </li>
        <li>
          <strong>Server logs and analytics</strong> &mdash; kept for the short period our hosting
          provider retains them; the analytics we see are aggregate figures only.
        </li>
      </ul>

      <h2>6. Your rights</h2>
      <p>Under the UK GDPR you have the right to:</p>
      <ul>
        <li>ask what personal data we hold about you and get a copy of it (access);</li>
        <li>have inaccurate data corrected (rectification);</li>
        <li>have data deleted, for example a listing you no longer want published (erasure);</li>
        <li>ask us to restrict how we use it while a concern is resolved (restriction);</li>
        <li>
          object to processing we carry out on the basis of legitimate interests, including our
          audience measurement (objection);
        </li>
        <li>
          receive data you gave us in a portable, machine-readable form, where we rely on your
          contract or consent (portability);
        </li>
        <li>withdraw consent at any time, where we ever rely on consent.</li>
      </ul>
      <p>
        Email <a href="mailto:info@careventsnearme.uk">info@careventsnearme.uk</a> to exercise any of
        these. We will respond within one month, and it is free. We may ask you to confirm your
        identity &mdash; usually just replying from the address you submitted with is enough. We do
        not carry out automated decision-making or profiling that produces legal or similarly
        significant effects.
      </p>

      <h2>7. Complaints</h2>
      <p>
        If you are unhappy with how we have handled your personal data, please tell us first so we
        can put it right. You also have the right to complain to the Information
        Commissioner&rsquo;s Office, the UK supervisory authority, at{" "}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        , by phone on 0303 123 1113, or by post to Information Commissioner&rsquo;s Office, Wycliffe
        House, Water Lane, Wilmslow, Cheshire SK9 5AF.
      </p>

      <h2>8. Children</h2>
      <p>
        This site is aimed at adults planning trips to car events. We do not knowingly collect
        personal data from children. If you believe a child has sent us personal data, email us and
        we will delete it.
      </p>

      <h2>9. Changes to this notice</h2>
      <p>
        We will update this notice when what we do changes. The date at the top shows when it last
        changed. If a change materially affects how we use personal data you have given us, we will
        make that clear on the site.
      </p>

      <h2>10. Contact</h2>
      <p>
        Keelson Holdings Ltd, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ.
        <br />
        Email: <a href="mailto:info@careventsnearme.uk">info@careventsnearme.uk</a>
        <br />
        Company number 17359226 &middot; ICO registration reference ICO:00015117984
      </p>
      <p>
        See also our <Link href="/terms">terms of use</Link>.
      </p>
    </main>
  );
}
