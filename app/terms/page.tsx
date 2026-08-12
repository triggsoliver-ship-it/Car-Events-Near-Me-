import Link from "next/link";
import "../legal.css";

export const metadata = {
  title: "Terms of use",
  description:
    "Terms of use for careventsnearme.uk. Car Events Near Me is a directory: every booking is completed on the event organiser's own website and the ticket contract is with them, not with us.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "12 August 2026";

export default function TermsPage() {
  return (
    <main className="detail legal" id="main-content">
      <h1>Terms of use</h1>
      <p className="updated">Last updated: {UPDATED}</p>

      <p>
        These terms apply to your use of careventsnearme.uk (the &ldquo;site&rdquo;). Please read
        them before using the site. By using the site you accept them.
      </p>

      <h2>1. Who we are</h2>
      <p>
        The site is operated by <strong>Keelson Holdings Ltd</strong>, trading as Car Events Near
        Me, a company registered in England and Wales with company number <strong>17359226</strong>,
        registered office 71-75 Shelton Street, Covent Garden, London WC2H 9JQ. In these terms
        &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean Keelson Holdings Ltd. You can
        contact us at <a href="mailto:info@careventsnearme.uk">info@careventsnearme.uk</a>.
      </p>

      <h2>2. We do not sell tickets &mdash; the organiser does</h2>
      <div className="callout">
        <strong>
          Car Events Near Me is a directory. Every booking is completed on the event
          organiser&rsquo;s own website. If you book, your contract is with that organiser, on the
          organiser&rsquo;s own terms. We are not a party to it, we are not selling you the ticket
          or the entry, and we never take payment for an event: no money for a booking passes
          through us or through Keelson Holdings Ltd.
        </strong>
      </div>
      <p>
        This means that <strong>the organiser</strong>, not us, is responsible for:
      </p>
      <ul>
        <li>taking your booking and your payment, and issuing your ticket;</li>
        <li>the price you pay, and what is and is not included;</li>
        <li>refunds, cancellations, transfers, date or venue changes and rescheduling;</li>
        <li>entry conditions, age or vehicle restrictions, and conditions on the day;</li>
        <li>running the event itself, and your safety and experience at it.</li>
      </ul>
      <p>
        Your rights in relation to a booking &mdash; including any refund or cancellation rights
        &mdash; are rights against the organiser, under their terms and the law that applies to
        their contract with you. If something goes wrong with a booking, contact the organiser
        directly. We can often point you to their published contact details, but we cannot cancel,
        change or refund a booking, and we do not hold your money.
      </p>
      <p>
        Where we have introduced a booking, the organiser may pay us a commission out of their own
        revenue. That is an arrangement between us and the organiser: it adds nothing to the price
        you pay, and it does not make us a party to your booking.
      </p>

      <h2>3. Event listings and accuracy</h2>
      <p>
        Event details on this site come from organisers and from publicly available sources. We take
        reasonable care to keep listings accurate and up to date, but we do not warrant that any
        date, time, venue, price, description or photograph is correct, current or complete. Prices
        are usually shown as a &ldquo;from&rdquo; price; they can change or sell out, and they may
        not include booking or other fees charged by the organiser.
      </p>
      <p>
        <strong>The organiser&rsquo;s own website is the authoritative source.</strong> Always check
        there before booking, and before travelling to an event. A listing here is not an
        endorsement of an event, an organiser or a venue, and it does not mean the event will go
        ahead.
      </p>

      <h2>4. Using the site</h2>
      <p>
        You may use the site for your own personal, non-commercial use. You may not copy or extract
        our listings in bulk, scrape or systematically harvest the site, re-publish our content as a
        competing directory, or run automated tools against the site other than well-behaved
        search-engine crawlers that respect our robots.txt.
      </p>
      <p>
        You must not misuse the site &mdash; for example by introducing malicious code, attempting
        to gain unauthorised access to it or to any system behind it, or submitting content that is
        unlawful, misleading, offensive or infringes anyone&rsquo;s rights.
      </p>
      <p>
        The site is provided free of charge and on an &ldquo;as is&rdquo; basis. We do not promise
        that it will always be available or uninterrupted, and we may change, suspend or withdraw
        any part of it.
      </p>

      <h2>5. If you are an organiser listing an event</h2>
      <p>
        Anyone can submit an event using our <Link href="/list">List your event</Link> form. Listing
        is free. By submitting an event you confirm that:
      </p>
      <ul>
        <li>you are authorised to submit it and to have it published on this site;</li>
        <li>
          the details you give are accurate and not misleading, and you will tell us if they change
          or the event is cancelled;
        </li>
        <li>
          any photograph or image link you supply may lawfully be used to illustrate the listing and
          does not infringe anyone&rsquo;s copyright or other rights;
        </li>
        <li>
          you grant us a non-exclusive, royalty-free licence to display, reproduce and adapt the
          listing and image on this site and in related promotion of it, for as long as the listing
          is published.
        </li>
      </ul>
      <p>
        We review every submission before it goes live. We may edit a listing for length, accuracy
        or house style, refuse it, or remove it at any time &mdash; for example if it is inaccurate,
        duplicated, unlawful, or not a car event.
      </p>
      <p>
        <strong>Commission.</strong> Where we agree a commercial arrangement with you, commission on
        bookings we introduce is payable by you as the organiser, at the rate and on the terms
        agreed with you in writing. Commission is never charged to attendees. We are not registered
        for VAT, so no VAT is charged on our commission.
      </p>
      <p>
        You remain responsible for your own obligations to the people who book with you, including
        your consumer-law, ticketing, licensing, insurance and health-and-safety obligations. We are
        not your agent and we do not contract with attendees on your behalf.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The design, layout, text and compilation of this site are owned by or licensed to Keelson
        Holdings Ltd. Event names, logos, trade marks and organiser-supplied photographs remain the
        property of their owners and are used to identify and illustrate the events listed. If you
        believe something on the site infringes your rights, email{" "}
        <a href="mailto:info@careventsnearme.uk">info@careventsnearme.uk</a> and we will look into
        it promptly.
      </p>

      <h2>7. Links to other websites</h2>
      <p>
        The site links out to organisers&rsquo; websites, ticketing platforms and search results. We
        do not control those sites and are not responsible for their content, their terms or how
        they handle your personal data. Once you follow a link you are on someone else&rsquo;s site,
        and their terms and privacy notice apply.
      </p>

      <h2>8. Our responsibility to you</h2>
      <p>
        Nothing in these terms limits or excludes our liability for death or personal injury caused
        by our negligence, for fraud or fraudulent misrepresentation, or for anything else that
        cannot lawfully be limited or excluded. Nothing in these terms affects your statutory rights
        as a consumer.
      </p>
      <p>
        Because we do not sell tickets, run events or take payment, we are not responsible for the
        acts or omissions of any organiser or venue, for any event being cancelled, postponed or
        changed, or for any booking made on someone else&rsquo;s website.
      </p>
      <p>
        If you are a consumer and we fail to comply with these terms, we are responsible for loss or
        damage you suffer that is a foreseeable result of our breaking them. We are not responsible
        for loss or damage that is not foreseeable.
      </p>
      <p>
        If you are using the site in the course of a business (including as an organiser), we
        exclude all implied warranties, we are not liable to you for loss of profit, loss of
        business, loss of goodwill, business interruption or any indirect or consequential loss, and
        our total liability to you in connection with the site is limited to &pound;100.
      </p>

      <h2>9. Privacy</h2>
      <p>
        How we handle personal data is set out in our <Link href="/privacy">privacy notice</Link>.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The version published here is the one that
        applies to your use of the site, and the date at the top shows when it last changed.
      </p>

      <h2>11. Law and jurisdiction</h2>
      <p>
        These terms, and any dispute arising out of them or out of your use of the site, are
        governed by the law of England and Wales, and the courts of England and Wales have
        jurisdiction. If you are a consumer resident in Scotland or Northern Ireland, you may also
        bring proceedings in the courts of the part of the United Kingdom where you live.
      </p>

      <h2>12. Contact</h2>
      <p>
        Keelson Holdings Ltd, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ.
        <br />
        Email: <a href="mailto:info@careventsnearme.uk">info@careventsnearme.uk</a>
      </p>
    </main>
  );
}
