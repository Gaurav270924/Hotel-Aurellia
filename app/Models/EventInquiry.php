<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventInquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'event_type',
        'preferred_date',
        'location',
        'guest_count',
        'budget_range',
        'requirements',
        'status',
    ];

    protected $casts = [
        'preferred_date' => 'date',
        'guest_count' => 'integer',
    ];
}
