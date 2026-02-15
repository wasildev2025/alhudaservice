<?php
/**
 * Template: Donations — Professional Design
 * Slug: donations
 */
defined( 'ABSPATH' ) || exit;
get_header();

$wa_number = get_theme_mod( 'booking_whatsapp_number', '966500000000' );
$wa_clean = preg_replace( '/[^0-9]/', '', $wa_number );
?>

<div class="booking-page-banner" style="background:linear-gradient(135deg, #281A15 0%, #3E2723 40%, #5D4037 100%);">
	<h1>Support Our Mission</h1>
	<p>Your Sadaqah &amp; donations help us serve the Ummah — every contribution matters</p>
</div>

<main id="content" class="site-main">
	<!-- Impact Cards -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Impact</span>
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Where Your Donation Goes</h2>
			<p style="color:var(--booking-text-light);max-width:520px;margin:0 auto;">Your generous contributions support these vital community services.</p>
		</div>
		<div class="booking-grid-3">
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:2.5rem;margin-bottom:16px;">🕌</div>
				<h3>Masjid Support</h3>
				<p>Help maintain and improve local mosques, Quran programs, and community facilities.</p>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:2.5rem;margin-bottom:16px;">📚</div>
				<h3>Education</h3>
				<p>Fund Islamic education, Hifz scholarships, and youth development programs.</p>
			</div>
			<div class="booking-card" style="text-align:center;padding:40px 24px;">
				<div style="font-size:2.5rem;margin-bottom:16px;">🤲</div>
				<h3>Community Aid</h3>
				<p>Support families in need — food distribution, medical aid, and emergency relief.</p>
			</div>
		</div>
	</section>

	<!-- Quranic Ayah -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner" style="text-align:center;max-width:700px;margin:0 auto;padding:40px 24px;">
			<p style="font-family:'Amiri',serif;font-size:1.75rem;color:var(--booking-gold-dark);margin:0 0 16px;line-height:1.6;direction:rtl;">مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ</p>
			<p style="color:var(--booking-text-light);font-style:italic;margin:0;">"The example of those who spend their wealth in the cause of Allah is like a seed that produces seven ears, each ear having a hundred grains." — Surah Al-Baqarah 2:261</p>
		</div>
	</section>

	<!-- Donation Form -->
	<section class="booking-page-section">
		<div style="text-align:center;margin-bottom:40px;">
			<span style="display:inline-block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--booking-gold);margin-bottom:8px;">Donate</span>
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Make a Contribution</h2>
			<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto;">Choose an amount and submit. We will contact you to confirm payment details.</p>
		</div>
		<?php echo do_shortcode( '[booking_donation]' ); ?>
	</section>

	<!-- Dua Request -->
	<section class="booking-page-section bg-cream">
		<div class="booking-inner" style="text-align:center;padding:40px 24px;">
			<h2 style="color:var(--booking-green-dark);margin:0 0 8px;">Dua Request</h2>
			<p style="color:var(--booking-text-light);max-width:480px;margin:0 auto 24px;">If you'd like us to make a special dua on your behalf during our visits to the sacred sites, please contact us.</p>
			<a href="https://wa.me/<?php echo esc_attr( $wa_clean ); ?>?text=<?php echo rawurlencode( 'Assalamu Alaikum, I have a dua request.' ); ?>" target="_blank" class="booking-btn booking-btn-gold">Send Dua Request</a>
		</div>
	</section>
</main>

<?php get_footer(); ?>
