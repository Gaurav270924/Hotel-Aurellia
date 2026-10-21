<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Service;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\ContactInquiry;
use App\Models\EventInquiry;
use App\Models\SiteSetting;

class HotelDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Admin
        User::updateOrCreate(
            ['email' => 'admin@aureliahotel.com'],
            [
                'name' => 'Aurelia Concierge Admin',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ]
        );

        // 2. Seed Suites, Villas & Sanctuary Accommodations (ALL IN INR)
        $services = [
            [
                'title' => 'Cliffside Infinity Villa',
                'slug' => 'cliffside-infinity-villa',
                'subtitle' => 'ULTRA-EXCLUSIVE PRIVATE CLIFF RESIDENCE',
                'short_description' => 'Suspended over turquoise waters with private heated limestone plunge pool, dedicated royal butler, and outdoor sunken firepit.',
                'full_description' => 'The Cliffside Infinity Villa commands unbroken views of the Mediterranean horizon. Spanning 220 m² of bespoke indoor-outdoor living, it features hand-honed travertine walls, custom Italian linen bedding, a master marble bath with standalone soaking tub, and an expansive teak terrace with a private heated mineral pool.',
                'image_url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
                'category' => 'Suites',
                'room_type' => 'Villa',
                'room_size' => '220 m² / 2,368 sq ft',
                'view_type' => 'Panoramic Coastal & Sunset View',
                'bed_type' => 'Master King Bed + Daybed',
                'max_guests' => 3,
                'price_per_night' => 215000,
                'price_indicative' => '₹2,15,000 / night',
                'features' => [
                    '220 m² Panoramic Living Space',
                    'Private Heated Infinity Plunge Pool',
                    '24/7 Dedicated Butler Service',
                    'Freestanding Chiseled Stone Tub',
                    'Curated Rare Vintage Bar',
                    'Private Teak Sun Deck & Firepit'
                ],
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
                ],
                'facilities' => [
                    'Private heated mineral infinity pool (32°C)',
                    'Custom Italian Rivolta Carmignani linen bedding',
                    'Freestanding solid limestone deep soaking tub',
                    'Acoustically tuned Bang & Olufsen sound system',
                    'Walk-in dressing room with double travertine vanity',
                    'High-speed fiber-optic Wi-Fi & motorized blackout curtains',
                    'Dyson Supersonic styling bar & custom organic botanical toiletries',
                    'Nespresso Atelier coffee atelier with rare single-origin roasts',
                    'In-room biometric security safe & sommelier wine chiller'
                ],
                'services_provided' => [
                    '24/7 dedicated personal butler anticipating all requests',
                    'Complimentary unpack & repack garment care service',
                    'In-suite Michelin-starred private breakfast daily',
                    'VIP Nice airport private limousine or speedboat sea transfer',
                    'Evening artisanal cocktail mixology ritual prepared in-villa',
                    'Priority reservations at L’Horizon 3★ and Thermal Bathhouse',
                    'Complimentary private yoga session on the villa deck'
                ],
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Azure Ocean Penthouse',
                'slug' => 'azure-ocean-penthouse',
                'subtitle' => 'TOP-FLOOR PANORAMIC SKY HAVEN',
                'short_description' => 'Unrivaled 360-degree panorama of the coastline with wrap-around cantilevered glass terrace and starlit hot tub.',
                'full_description' => 'Perched atop Aurelia’s crowning architectural crest, the Azure Ocean Penthouse offers total seclusion and breathless cinematic vistas. Featuring private direct elevator access, acoustically isolated master suite, sommelier display cabinet, and a sky-deck lounge with private starlit Jacuzzi.',
                'image_url' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=85',
                'category' => 'Suites',
                'room_type' => 'Penthouse',
                'room_size' => '185 m² / 1,991 sq ft',
                'view_type' => '360° Azure Coastal & Cap d’Antibes View',
                'bed_type' => 'Grand Super King Bed',
                'max_guests' => 2,
                'price_per_night' => 280000,
                'price_indicative' => '₹2,80,000 / night',
                'features' => [
                    '185 m² Penthouse Suite',
                    'Private Rooftop Sky Deck with Heated Spa',
                    'Direct Private Elevator Access',
                    'Bang & Olufsen Beosound Theater',
                    'Bespoke Temperature Wine Display',
                    'Wrap-Around Glass Cantilever Terrace'
                ],
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                ],
                'facilities' => [
                    'Private rooftop thermal hydro-spa with starlight views',
                    'Private key-coded elevator straight into penthouse foyer',
                    'Panoramic open-flame bioethanol marble fireplace',
                    'Custom Italian marble dual rain shower with chromotherapy',
                    'Designer bar stocked with rare whiskeys and vintage champagnes',
                    'Motorized floor-to-ceiling glass walls opening to terrace',
                    'Marshall Bluetooth acoustic soundscape monitors',
                    'Pillow concierge menu featuring 7 natural down fills'
                ],
                'services_provided' => [
                    'Dedicated master butler & private sommelier consultations',
                    'Private helicopter transfer arrival coordination',
                    'Champagne & Oscietra caviar welcome ceremony',
                    'Private chef multi-course dinner served under the sky deck stars',
                    '24-hour in-suite bespoke dining and turn-down aromatics',
                    'Full laundry, pressing, and shoe shine service'
                ],
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'The Royal Olive Sanctuary',
                'slug' => 'royal-olive-sanctuary',
                'subtitle' => 'HISTORIC BOTANICAL PRIVATE ESTATE',
                'short_description' => 'Nestled within a 300-year-old secluded olive orchard with private walled courtyards and fragrant citrus gardens.',
                'full_description' => 'Designed for guests seeking profound peace and nature-immersed luxury. The Royal Olive Sanctuary blends rustic stone heritage with ultra-modern architectural minimalist interiors, private outdoor shower, and secluded pergola dining lounge.',
                'image_url' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85',
                'category' => 'Suites',
                'room_type' => 'Estate',
                'room_size' => '160 m² / 1,722 sq ft',
                'view_type' => 'Botanical Grove & Sea Vista',
                'bed_type' => 'Handcrafted King Bed',
                'max_guests' => 2,
                'price_per_night' => 165000,
                'price_indicative' => '₹1,65,000 / night',
                'features' => [
                    '160 m² Garden Haven & Courtyard',
                    'Private Olive Grove Sunken Walled Garden',
                    'Al Fresco Marble Rain Shower',
                    'Handcrafted Natural Fireplace',
                    'Chauffeured Electric Buggy',
                    'Pergola Outdoor Living Pavilion'
                ],
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                ],
                'facilities' => [
                    'Secluded private walled botanical garden courtyard',
                    'Outdoor hand-carved stone rain shower under olive canopies',
                    'Rustic fireplace with seasoned almond and olive wood',
                    'Freestanding copper soaking tub with garden vistas',
                    'Bespoke artisanal bar with homemade herbal botanical syrups',
                    'Private electric sanctuary buggy for estate transit'
                ],
                'services_provided' => [
                    'Personal estate host on call 24 hours',
                    'Private botanical garden breakfast served in the courtyard',
                    'Evening lavender aromatherapy sleep therapy ritual',
                    'Custom olive oil tasting experience with estate master',
                    'Private chauffeured transfers to Cap d’Antibes lighthouse'
                ],
                'is_published' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Deluxe Mediterranean Horizon Suite',
                'slug' => 'deluxe-mediterranean-suite',
                'subtitle' => 'TIMELESS COASTAL ELEGANCE',
                'short_description' => 'Uninterrupted seaside tranquility featuring floor-to-ceiling sliding glass, travertine double vanity, and spacious oceanview sun terrace.',
                'full_description' => 'An immaculate blend of understated elegance and coastal stillness. Each Deluxe Horizon Suite opens entirely to sea breezes through cantilevered glass frames, decorated with raw linen textiles, bleached oak, and curated ceramic sculptures by Provencal artisans.',
                'image_url' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=85',
                'category' => 'Suites',
                'room_type' => 'Suite',
                'room_size' => '95 m² / 1,022 sq ft',
                'view_type' => 'Direct Oceanfront Horizon',
                'bed_type' => 'Custom King Bed',
                'max_guests' => 2,
                'price_per_night' => 110000,
                'price_indicative' => '₹1,10,000 / night',
                'features' => [
                    '95 m² Oceanfront Suite',
                    'Private Deep Seaward Sun Terrace',
                    'Dual Travertine Rain Showers',
                    'Artisanal Bar & Wine Chiller',
                    'Interactive Smart Room Lighting'
                ],
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
                ],
                'facilities' => [
                    'Private furnished sun terrace with teak loungers',
                    'Limestone dual vanity bathroom with oversized rain shower',
                    'Luxury Acqua di Parma amenities and plush linen robes',
                    'Marshall Bluetooth speaker and high-definition smart display',
                    'In-room safe, gourmet snack pantry, and pillow selection'
                ],
                'services_provided' => [
                    'Daily morning artisanal breakfast served on your terrace',
                    'Dedicated concierge assistance for excursions and dining',
                    'Nightly aromatherapy turn-down service',
                    'Complimentary access to the Thermal Bathhouse hydro-circuit'
                ],
                'is_published' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'The Grand Presidential Sea Villa',
                'slug' => 'grand-presidential-sea-villa',
                'subtitle' => 'THE PINNACLE OF MEDITERRANEAN LUXURY',
                'short_description' => 'Two-story private compound featuring dual heated pools, private jetty access, private cinema, and dedicated 24-hour staff team.',
                'full_description' => 'The ultimate expression of coastal luxury on the French Riviera. Spanning 450 m² across two architectural levels with direct private beach access, a private 15-meter heated swimming pool, secondary plunge pool, full professional chef kitchen, and master suites with 270-degree ocean views.',
                'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
                'category' => 'Suites',
                'room_type' => 'Villa',
                'room_size' => '450 m² / 4,843 sq ft',
                'view_type' => '270° Unbroken Peninsula & Sea View',
                'bed_type' => '3 Master King Suites',
                'max_guests' => 6,
                'price_per_night' => 380000,
                'price_indicative' => '₹3,80,000 / night',
                'features' => [
                    '450 m² Two-Level Private Compound',
                    '15-Meter Private Heated Pool + Plunge Pool',
                    'Direct Private Sea Jetty & Tender Access',
                    'Full Private Staff: Butler, Chef & Chauffeur',
                    'Private Screening Cinema & Wine Cellar',
                    'Gated High-Security Private Driveway'
                ],
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
                ],
                'facilities' => [
                    '15m private heated lap pool and hydrotherapy spa',
                    'Private Dolby Atmos sound screening room with velvet seating',
                    'Commercial-grade Gaggenau kitchen for private chef dining',
                    'Direct private jetty capable of docking 50ft yachts',
                    'Three palatial master suites with individual marble ensuite baths',
                    'Biometric security perimeter and secure luggage vault'
                ],
                'services_provided' => [
                    'Dedicated full-time private chef, butler, and chauffeur team',
                    'Unlimited airport limousine and Riva speedboat transfers',
                    'Private in-villa 3-Star Michelin dinner experiences included',
                    'Custom daily wellness sessions and in-villa somatic massages',
                    'Personalized sommelier selections from the subterranean cellar'
                ],
                'is_published' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Coastal Garden Sanctuary Suite',
                'slug' => 'coastal-garden-sanctuary',
                'subtitle' => 'PINE FOREST & SEASIDE HARMONY',
                'short_description' => 'Surrounded by fragrant umbrella pines and lavender bushes with private shaded patio, stone outdoor daybed, and garden rain bath.',
                'full_description' => 'A serene haven blending pine forest scents with gentle waves. Featuring natural cedar accents, hand-woven wool rugs, expansive bathroom with garden view, and direct garden pathway to the private pebble cove.',
                'image_url' => 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=85',
                'category' => 'Suites',
                'room_type' => 'Suite',
                'room_size' => '85 m² / 914 sq ft',
                'view_type' => 'Pine Forest & Coastal Garden',
                'bed_type' => 'Plush King Bed',
                'max_guests' => 2,
                'price_per_night' => 95000,
                'price_indicative' => '₹95,000 / night',
                'features' => [
                    '85 m² Garden Sanctuary',
                    'Private Shaded Pergola Patio',
                    'Freestanding Stone Garden Tub',
                    'Direct Private Cove Pathway',
                    'Artisanal Herbal Tea Atelier'
                ],
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
                ],
                'facilities' => [
                    'Private shaded pergola patio with outdoor lounge',
                    'Natural stone garden soaking tub and rain shower',
                    'Artisanal bar with freshly brewed Provencal infusions',
                    'Organic bamboo cotton linens and silk eye masks'
                ],
                'services_provided' => [
                    'Daily breakfast served in your private pergola',
                    'Concierge host dedicated to your stay',
                    'Thermal bathhouse passes included'
                ],
                'is_published' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], $srv);
        }

        // 3. Seed Events & Facilities (INR)
        $events = [
            [
                'title' => 'Mediterranean Sunset Weddings & Galas',
                'slug' => 'mediterranean-sunset-weddings',
                'description' => 'Exclusive resort buyout or cliffside amphitheater celebrations where vows are framed by azure horizons and candlelit olive groves.',
                'full_details' => 'From intimate exchanges of vows for 30 distinguished guests to lavish multi-day celebrations for 180, Aurelia’s dedicated event couture team orchestrates every floral arch, Michelin-starred banquet, and live symphonic quartet with effortless elegance.',
                'event_type' => 'Weddings & Celebrations',
                'capacity' => 'Up to 200 Guests',
                'venue_area' => 'The Cliff Amphitheater & Lower Terraces',
                'cover_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
                ],
                'status' => 'featured',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'The Annual Solstice Wine & Truffle Gala',
                'slug' => 'solstice-wine-truffle-gala',
                'description' => 'A legendary evening welcoming acclaimed winemakers, rare vintage tastings under the stars, and live string chamber performances.',
                'full_details' => 'An annual gathering of culinary connoisseurs celebrating the summer solstice. Guests savor limited allocations from Provence and Piedmont paired with rare black truffles and sea harvests.',
                'event_type' => 'Curated Galas',
                'capacity' => '80 Guests (By Invitation)',
                'venue_area' => 'L’Horizon Grand Pavilion',
                'cover_image' => 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
                ],
                'status' => 'upcoming',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Executive Strategic Summits & Board Retreats',
                'slug' => 'executive-summits-retreats',
                'description' => 'High-security, acoustically isolated pavilions for confidential board deliberations, visionary retreats, and private family office summits.',
                'full_details' => 'Equipped with encrypted audiovisual technology, private dedicated catering, and immediate access to the wellness bathhouse for restorative breaks between intense strategy sessions.',
                'event_type' => 'Corporate & Private Summits',
                'capacity' => '15 to 45 Leaders',
                'venue_area' => 'The Horizon Glass Saloon',
                'cover_image' => 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
                ],
                'status' => 'featured',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Private Villa Soirées & Anniversaries',
                'slug' => 'private-villa-soirees',
                'description' => 'Tailor-made private dinners with jazz trios, bespoke cocktail mixology, and customized fireworks displays launched from offshore barges.',
                'full_details' => 'Whether honoring a milestone birthday, wedding anniversary, or private art collector gathering, our culinary and production team transforms our seaside villas into magical worlds of illumination.',
                'event_type' => 'Intimate Celebrations',
                'capacity' => '10 to 60 Guests',
                'venue_area' => 'Private Cliffside Villa Lawns',
                'cover_image' => 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=85',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
                ],
                'status' => 'upcoming',
                'is_featured' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($events as $ev) {
            Event::updateOrCreate(['slug' => $ev['slug']], $ev);
        }

        // 4. Seed Gallery Items
        $gallery = [
            [
                'title' => 'Cliffside Villa Infinity Edge',
                'description' => 'Natural limestone pool blending seamlessly with the Mediterranean horizon at sunset.',
                'media_url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'suites',
                'alt_text' => 'Aurelia Cliffside Villa Infinity Pool',
                'sort_order' => 1,
                'is_published' => true,
            ],
            [
                'title' => 'Master Bedroom Sanctuary',
                'description' => 'Linen draping, floor-to-ceiling panoramic glass, and handcrafted teak furnishings.',
                'media_url' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'suites',
                'alt_text' => 'Luxury Oceanview Suite Bedroom',
                'sort_order' => 2,
                'is_published' => true,
            ],
            [
                'title' => 'L’Horizon Michelin Degustation',
                'description' => 'Artisanal coastal harvest presented with delicate edible botanicals and heirloom glaze.',
                'media_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'dining',
                'alt_text' => 'Fine Dining Plate by Chef Marc Évrard',
                'sort_order' => 3,
                'is_published' => true,
            ],
            [
                'title' => 'The Sommelier Reserve Cellar',
                'description' => 'Rare biodynamic vintages and historic champagne reserves aged in chiseled stone.',
                'media_url' => 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'dining',
                'alt_text' => 'Aurelia Wine Cellar with Vintage Bottles',
                'sort_order' => 4,
                'is_published' => true,
            ],
            [
                'title' => 'Thermal Bathhouse Hot Mineral Springs',
                'description' => 'Steaming basalt pools illuminated by ambient golden lanterns and natural acoustics.',
                'media_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'wellness',
                'alt_text' => 'Thermal Bathhouse Mineral Pools',
                'sort_order' => 5,
                'is_published' => true,
            ],
            [
                'title' => 'Seaside Yoga & Sound Meditation Deck',
                'description' => 'Morning somatic sound therapy accompanied by the whisper of the morning tides.',
                'media_url' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'wellness',
                'alt_text' => 'Sound Meditation Deck at Dawn',
                'sort_order' => 6,
                'is_published' => true,
            ],
            [
                'title' => 'Sunset Wedding Gala on the Terrace',
                'description' => 'Candlelit long tables dressed in white florals beneath the twilight sky.',
                'media_url' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'events',
                'alt_text' => 'Wedding Gala Banquet Terrace',
                'sort_order' => 7,
                'is_published' => true,
            ],
            [
                'title' => 'Intimate Coastal Celebration',
                'description' => 'Private fireside lounge overlooking the bay during a celebratory soirée.',
                'media_url' => 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'events',
                'alt_text' => 'Private Fireside Event Lounge',
                'sort_order' => 8,
                'is_published' => true,
            ],
            [
                'title' => 'Ancient Olive Groves & Stone Walkway',
                'description' => 'Centuries-old olive trees leading towards the private sea cabanas.',
                'media_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'grounds',
                'alt_text' => 'Aurelia Coastal Resort Grounds and Beach',
                'sort_order' => 9,
                'is_published' => true,
            ],
            [
                'title' => 'Architectural Limestone Atrium',
                'description' => 'Brutalist minimalism harmonizing with natural light and tranquil water features.',
                'media_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                'media_type' => 'image',
                'category' => 'grounds',
                'alt_text' => 'Minimalist Architecture and Water Atrium',
                'sort_order' => 10,
                'is_published' => true,
            ],
        ];

        foreach ($gallery as $g) {
            GalleryItem::updateOrCreate(['title' => $g['title']], $g);
        }

        // 5. Seed Site Settings (INR Currency)
        $settings = [
            'hotel_name' => 'AURELIA Resort & Sanctuary',
            'tagline' => 'Where Luxury Feels Effortless',
            'phone' => '+33 (0)4 93 61 00 00',
            'email' => 'concierge@aureliahotel.com',
            'address' => "Cap d'Antibes Peninsula, 06600 Antibes, Côte d'Azur, France",
            'business_hours' => 'Concierge & Private Butler Services: 24 Hours Daily',
            'instagram' => 'https://instagram.com/aureliasanctuary',
            'facebook' => 'https://facebook.com/aureliahotel',
            'currency' => 'INR (₹)',
            'check_in_time' => '15:00',
            'check_out_time' => '12:00',
        ];

        foreach ($settings as $key => $val) {
            SiteSetting::updateOrCreate(['setting_key' => $key], ['setting_value' => $val]);
        }

        // 6. Seed Sample Initial Inquiries
        ContactInquiry::updateOrCreate(
            ['email' => 'helena.v@vanderbilt-capital.com'],
            [
                'name' => 'Helena Vanderbilt',
                'phone' => '+1 (212) 555-0199',
                'subject' => 'Private Residence Booking for August',
                'message' => 'We are interested in booking the Cliffside Infinity Villa for 14 nights in mid-August. Could you please confirm yacht transfer availability from Nice airport?',
                'status' => 'new',
            ]
        );

        EventInquiry::updateOrCreate(
            ['email' => 'julien.rossi@luxe-events.fr'],
            [
                'name' => 'Julien Rossi',
                'phone' => '+33 6 12 34 56 78',
                'event_type' => 'Weddings & Celebrations',
                'preferred_date' => now()->addMonths(4)->format('Y-m-d'),
                'location' => 'The Cliff Amphitheater',
                'guest_count' => 120,
                'budget_range' => '₹85,00,000 - ₹2,00,00,000',
                'requirements' => 'Full resort buyout inquiry for 3 nights with 3-star Michelin welcome gala dinner and fireworks on Saturday night.',
                'status' => 'reviewing',
            ]
        );
    }
}
