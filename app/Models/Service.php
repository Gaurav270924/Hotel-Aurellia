<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'short_description',
        'full_description',
        'image_url',
        'category',
        'room_type',
        'room_size',
        'view_type',
        'bed_type',
        'max_guests',
        'price_per_night',
        'price_indicative',
        'features',
        'gallery_images',
        'facilities',
        'services_provided',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'features' => 'array',
        'gallery_images' => 'array',
        'facilities' => 'array',
        'services_provided' => 'array',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
        'price_per_night' => 'float',
        'max_guests' => 'integer',
    ];
}
