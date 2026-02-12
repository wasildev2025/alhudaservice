<?php
/**
 * Template: FAQ — Professional Design
 * Slug: faq
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>

<div class="booking-page-banner">
	<h1>Frequently Asked Questions</h1>
	<p>Find answers to common questions about our services</p>
</div>

<main id="content" class="site-main">
	<section class="booking-page-section">
		<div class="booking-faq-list">

			<!-- Pick & Drop -->
			<div style="margin-bottom:32px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:12px;">Pick &amp; Drop</span>

				<div class="booking-faq-item active">
					<div class="booking-faq-q">How do I book a Pick & Drop?</div>
					<div class="booking-faq-a">Fill in the booking form on our <a href="<?php echo esc_url( home_url( '/pick-drop/' ) ); ?>">Pick & Drop page</a>. We'll confirm your booking via WhatsApp within minutes.</div>
				</div>
				<div class="booking-faq-item">
					<div class="booking-faq-q">What vehicles are available?</div>
					<div class="booking-faq-a">We offer Sedans (up to 4 passengers), Vans (up to 7), and Hiace (up to 14). All vehicles are air-conditioned and well-maintained.</div>
				</div>
				<div class="booking-faq-item">
					<div class="booking-faq-q">Can I book for a group?</div>
					<div class="booking-faq-a">Yes! You can specify the number of passengers and we'll assign the right vehicle. For large groups (15+), contact us on WhatsApp for custom arrangements.</div>
				</div>
			</div>

			<!-- Ziyarat -->
			<div style="margin-bottom:32px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:12px;">Ziyarat Packages</span>

				<div class="booking-faq-item">
					<div class="booking-faq-q">What's included in Ziyarat packages?</div>
					<div class="booking-faq-a">Each package includes comfortable transport, an experienced guide, and visits to all listed sites. Some packages include meals. Check individual package pages for full details.</div>
				</div>
				<div class="booking-faq-item">
					<div class="booking-faq-q">Can I create a custom tour?</div>
					<div class="booking-faq-a">Absolutely! Send us your preferred sites and dates via the inquiry form or WhatsApp, and we'll create a personalized itinerary for you.</div>
				</div>
			</div>

			<!-- Khajoor -->
			<div style="margin-bottom:32px;">
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:12px;">Khajoor &amp; Shop</span>

				<div class="booking-faq-item">
					<div class="booking-faq-q">Do you deliver Khajoor?</div>
					<div class="booking-faq-a">Yes, we support delivery to major cities in Saudi Arabia. Use the bulk inquiry form on the <a href="<?php echo esc_url( home_url( '/khajoor/' ) ); ?>">Khajoor page</a> or contact us for international shipping.</div>
				</div>
				<div class="booking-faq-item">
					<div class="booking-faq-q">Can I order gift boxes?</div>
					<div class="booking-faq-a">Yes! We offer beautifully packaged gift boxes perfect for Hajj/Umrah gifts, Ramadan, or any special occasion. Use the Gift Box inquiry form.</div>
				</div>
			</div>

			<!-- General -->
			<div>
				<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:12px;">General</span>

				<div class="booking-faq-item">
					<div class="booking-faq-q">What payment methods do you accept?</div>
					<div class="booking-faq-a">We accept bank transfers and cash. Online payment gateway is coming soon. Contact us on WhatsApp for payment details.</div>
				</div>
				<div class="booking-faq-item">
					<div class="booking-faq-q">What languages do you support?</div>
					<div class="booking-faq-a">Our team speaks English, Urdu, Arabic, and Hindi. Our website is available in English and Urdu.</div>
				</div>
				<div class="booking-faq-item">
					<div class="booking-faq-q">How can I contact you?</div>
					<div class="booking-faq-a">The fastest way is WhatsApp (tap the green button). You can also use our <a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>">contact form</a> or email us.</div>
				</div>
			</div>

		</div>
	</section>

	<!-- CTA -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner" style="text-align:center;padding:40px 24px;">
			<h2 style="color:var(--booking-green-dark);margin:0 0 12px;">Still Have Questions?</h2>
			<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto 24px;">We're happy to help. Reach out anytime.</p>
			<a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>" class="booking-btn booking-btn-primary">Contact Us</a>
		</div>
	</section>
</main>

<!-- FAQ Accordion Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.booking-faq-q').forEach(function(q) {
		q.addEventListener('click', function() {
			var item = q.parentElement;
			var wasActive = item.classList.contains('active');
			// Close all in same group
			item.parentElement.querySelectorAll('.booking-faq-item').forEach(function(i) {
				i.classList.remove('active');
			});
			if (!wasActive) item.classList.add('active');
		});
	});
});
</script>

<?php get_footer(); ?>
