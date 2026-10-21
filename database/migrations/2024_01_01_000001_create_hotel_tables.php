<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Services & Suites
        if (!Schema::hasTable('services')) {
            Schema::create('services', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('slug')->unique();
                $table->string('subtitle')->nullable();
                $table->text('short_description');
                $table->longText('full_description')->nullable();
                $table->string('image_url');
                $table->string('category')->default('Suites'); // Suites, Dining, Wellness, Experiences
                $table->string('room_type')->nullable(); // Villa, Penthouse, Suite, Estate
                $table->string('room_size')->nullable();
                $table->string('view_type')->nullable();
                $table->string('bed_type')->nullable();
                $table->integer('max_guests')->default(2);
                $table->decimal('price_per_night', 12, 2)->nullable();
                $table->string('price_indicative')->nullable();
                $table->json('features')->nullable();
                $table->json('gallery_images')->nullable();
                $table->json('facilities')->nullable();
                $table->json('services_provided')->nullable();
                $table->boolean('is_published')->default(true);
                $table->integer('sort_order')->default(0);
                $table->timestamps();
            });
        }

        // 2. Events & Facilities
        if (!Schema::hasTable('events')) {
            Schema::create('events', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('slug')->unique();
                $table->text('description');
                $table->longText('full_details')->nullable();
                $table->string('event_type'); // Wedding, Gala, Executive Retreat, Private Celebration
                $table->string('capacity')->nullable();
                $table->string('venue_area')->nullable();
                $table->string('cover_image');
                $table->json('gallery_images')->nullable();
                $table->string('status')->default('upcoming'); // upcoming, past, featured
                $table->boolean('is_featured')->default(true);
                $table->integer('sort_order')->default(0);
                $table->timestamps();
            });
        }

        // 3. Gallery Items
        if (!Schema::hasTable('gallery_items')) {
            Schema::create('gallery_items', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('media_url');
                $table->string('media_type')->default('image'); // image, video
                $table->string('category')->default('all'); // suites, dining, wellness, events, grounds
                $table->string('alt_text')->nullable();
                $table->integer('sort_order')->default(0);
                $table->boolean('is_published')->default(true);
                $table->timestamps();
            });
        }

        // 4. Contact Inquiries
        if (!Schema::hasTable('contact_inquiries')) {
            Schema::create('contact_inquiries', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email');
                $table->string('phone')->nullable();
                $table->string('subject')->nullable();
                $table->text('message');
                $table->string('status')->default('new'); // new, read, replied, archived
                $table->timestamps();
            });
        }

        // 5. Event Inquiries (Event planning & booking requests)
        if (!Schema::hasTable('event_inquiries')) {
            Schema::create('event_inquiries', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email');
                $table->string('phone');
                $table->string('event_type');
                $table->date('preferred_date')->nullable();
                $table->string('location')->nullable();
                $table->integer('guest_count')->nullable();
                $table->string('budget_range')->nullable();
                $table->text('requirements')->nullable();
                $table->string('status')->default('pending'); // pending, reviewing, confirmed, declined
                $table->timestamps();
            });
        }

        // 6. Site Settings
        if (!Schema::hasTable('site_settings')) {
            Schema::create('site_settings', function (Blueprint $table) {
                $table->id();
                $table->string('setting_key')->unique();
                $table->text('setting_value')->nullable();
                $table->timestamps();
            });
        }

        // 7. Add role / is_admin to users if not present
        if (Schema::hasTable('users') && !Schema::hasColumn('users', 'is_admin')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_admin')->default(false)->after('password');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('event_inquiries');
        Schema::dropIfExists('contact_inquiries');
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('events');
        Schema::dropIfExists('services');

        if (Schema::hasTable('users') && Schema::hasColumn('users', 'is_admin')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_admin');
            });
        }
    }
};
