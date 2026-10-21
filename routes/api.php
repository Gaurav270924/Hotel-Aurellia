<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ==========================================
// PUBLIC ROUTES
// ==========================================
Route::prefix('v1')->group(function () {
    // Services / Suites
    Route::get('/services', [PublicController::class, 'getServices']);
    Route::get('/services/{slug}', [PublicController::class, 'getServiceBySlug']);

    // Events
    Route::get('/events', [PublicController::class, 'getEvents']);
    Route::get('/events/{slug}', [PublicController::class, 'getEventBySlug']);

    // Gallery
    Route::get('/gallery', [PublicController::class, 'getGallery']);

    // Site Settings
    Route::get('/settings', [PublicController::class, 'getSettings']);

    // Inquiries
    Route::post('/contact', [PublicController::class, 'submitContact']);
    Route::post('/event-inquiries', [PublicController::class, 'submitEventInquiry']);
    Route::post('/newsletter', [PublicController::class, 'submitNewsletter']);

    // Admin Auth
    Route::post('/admin/login', [AdminController::class, 'login']);
});

// Also keep direct /api/services, etc. for frontend convenience
Route::get('/services', [PublicController::class, 'getServices']);
Route::get('/services/{slug}', [PublicController::class, 'getServiceBySlug']);
Route::get('/events', [PublicController::class, 'getEvents']);
Route::get('/events/{slug}', [PublicController::class, 'getEventBySlug']);
Route::get('/gallery', [PublicController::class, 'getGallery']);
Route::get('/settings', [PublicController::class, 'getSettings']);
Route::post('/contact', [PublicController::class, 'submitContact']);
Route::post('/event-inquiries', [PublicController::class, 'submitEventInquiry']);
Route::post('/newsletter', [PublicController::class, 'submitNewsletter']);
Route::post('/admin/login', [AdminController::class, 'login']);

// ==========================================
// PROTECTED ADMIN ROUTES (Sanctum)
// ==========================================
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/me', [AdminController::class, 'me']);
    Route::post('/logout', [AdminController::class, 'logout']);
    Route::get('/stats', [AdminController::class, 'getStats']);

    // Contact Inquiries
    Route::get('/contact-inquiries', [AdminController::class, 'getContactInquiries']);
    Route::patch('/contact-inquiries/{id}', [AdminController::class, 'updateContactStatus']);
    Route::delete('/contact-inquiries/{id}', [AdminController::class, 'deleteContactInquiry']);

    // Event Inquiries
    Route::get('/event-inquiries', [AdminController::class, 'getEventInquiries']);
    Route::patch('/event-inquiries/{id}', [AdminController::class, 'updateEventInquiryStatus']);
    Route::delete('/event-inquiries/{id}', [AdminController::class, 'deleteEventInquiry']);

    // Services CRUD
    Route::get('/services', [AdminController::class, 'getServices']);
    Route::post('/services', [AdminController::class, 'storeService']);
    Route::put('/services/{id}', [AdminController::class, 'updateService']);
    Route::delete('/services/{id}', [AdminController::class, 'deleteService']);

    // Events CRUD
    Route::get('/events', [AdminController::class, 'getEvents']);
    Route::post('/events', [AdminController::class, 'storeEvent']);
    Route::put('/events/{id}', [AdminController::class, 'updateEvent']);
    Route::delete('/events/{id}', [AdminController::class, 'deleteEvent']);

    // Gallery CRUD
    Route::get('/gallery', [AdminController::class, 'getGallery']);
    Route::post('/gallery', [AdminController::class, 'storeGallery']);
    Route::put('/gallery/{id}', [AdminController::class, 'updateGallery']);
    Route::delete('/gallery/{id}', [AdminController::class, 'deleteGallery']);

    // Settings
    Route::get('/settings', [AdminController::class, 'getSettings']);
    Route::post('/settings', [AdminController::class, 'updateSettings']);
});
