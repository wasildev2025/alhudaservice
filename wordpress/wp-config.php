<?php
/**
 * WordPress Configuration - Booking Project (XAMPP Local)
 *
 * @package WordPress
 */

// ** Database settings - XAMPP defaults ** //
define( 'DB_NAME', 'booking_wp' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 * @link https://api.wordpress.org/secret-key/1.1/salt/
 */
define( 'AUTH_KEY',         'C{YaWVZeAr2InfO_Mk,95O>`L8s$VM-[7[UKIm`s^iH>l;5Ib_,TCKcNe#&`E+]<' );
define( 'SECURE_AUTH_KEY',  '}+s3|]oeLlq6X+Gb+u;Z$=EO/INz2+b`Ou8|]kU4]wHdMkPEphE5v4Xj{i[X5H$-' );
define( 'LOGGED_IN_KEY',    'adPYkD023|99|bZ+Q|i-o9 s!3M&_-]4tY(=G+7TA`I<hv|2LvhD#c%-L,yt4-C)' );
define( 'NONCE_KEY',        'C]-MYgZYj6)E-_N,J8HnuWV(^K{b FqmcNR#?QdT@}ko@Zey0h&M,l(KFcA4cVAG' );
define( 'AUTH_SALT',        '84Jo^5Tm5N`|s%Cj?F2M)3f{a!jM-< hm@^p:0NWzEsr{a6>8]<(Uh-fSIq,_zkY' );
define( 'SECURE_AUTH_SALT', '/e{Tz:(_Iu,|2{TYo+XlZc88fQQvFcs2tO.Q=VYO@VWQxz@5+d]atip85w|Kpc0;' );
define( 'LOGGED_IN_SALT',   'Vkt !RlE@z^:c~{D?1V`gkq7Gq=}ZRw~CGq2Y QZj+rr+dT.]_,h/7>+qZsb)nRq' );
define( 'NONCE_SALT',       'sm#VAs`e*x|Fc=-0$P.$rF)eag+*nQo~LKiQI@`%Z(0kvh/#[V|>*LJl0|<(&&^Y' );

/**#@-*/

$table_prefix = 'wp_';

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

/* That's all, stop editing! Happy publishing. */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
require_once ABSPATH . 'wp-settings.php';
