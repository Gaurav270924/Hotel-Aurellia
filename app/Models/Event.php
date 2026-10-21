<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'full_details',
        'event_type',
        'capacity',
        'venue_area',
        'cover_image',
        'gallery_images',
        'status',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];
}
