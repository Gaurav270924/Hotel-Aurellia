<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\ContactInquiry;
use App\Models\EventInquiry;
use App\Models\SiteSetting;

class PublicController extends Controller
{
    /**
     * Get published services / suites
     */
    public function getServices(Request $request)
    {
        $query = Service::where('is_published', true)->orderBy('sort_order', 'asc');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Get specific service by slug
     */
    public function getServiceBySlug($slug)
    {
        $service = Service::where('slug', $slug)->where('is_published', true)->first();

        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Service not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $service]);
    }

    /**
     * Get events
     */
    public function getEvents(Request $request)
    {
        $query = Event::orderBy('sort_order', 'asc');

        if ($request->has('type') && $request->type !== 'all') {
            $query->where('event_type', $request->type);
        }

        if ($request->boolean('featured_only')) {
            $query->where('is_featured', true);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Get specific event by slug
     */
    public function getEventBySlug($slug)
    {
        $event = Event::where('slug', $slug)->first();

        if (!$event) {
            return response()->json(['success' => false, 'message' => 'Event not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $event]);
    }

    /**
     * Get gallery items
     */
    public function getGallery(Request $request)
    {
        $query = GalleryItem::where('is_published', true)->orderBy('sort_order', 'asc');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Get public site settings
     */
    public function getSettings()
    {
        $settings = SiteSetting::all()->pluck('setting_value', 'setting_key');
        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Submit Contact Inquiry
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:40',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string|min:10|max:5000',
        ]);

        $inquiry = ContactInquiry::create([
            'name' => strip_tags($validated['name']),
            'email' => $validated['email'],
            'phone' => isset($validated['phone']) ? strip_tags($validated['phone']) : null,
            'subject' => isset($validated['subject']) ? strip_tags($validated['subject']) : 'General Concierge Inquiry',
            'message' => strip_tags($validated['message']),
            'status' => 'new',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been received by our concierge. We will respond promptly.',
            'reference_id' => 'AUR-CNT-' . str_pad($inquiry->id, 5, '0', STR_PAD_LEFT),
        ], 201);
    }

    /**
     * Submit Event Inquiry
     */
    public function submitEventInquiry(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:40',
            'event_type' => 'required|string|max:100',
            'preferred_date' => 'nullable|date',
            'location' => 'nullable|string|max:150',
            'guest_count' => 'nullable|integer|min:1|max:500',
            'budget_range' => 'nullable|string|max:100',
            'requirements' => 'nullable|string|max:5000',
        ]);

        $inquiry = EventInquiry::create([
            'name' => strip_tags($validated['name']),
            'email' => $validated['email'],
            'phone' => strip_tags($validated['phone']),
            'event_type' => strip_tags($validated['event_type']),
            'preferred_date' => $validated['preferred_date'] ?? null,
            'location' => isset($validated['location']) ? strip_tags($validated['location']) : 'Aurelia Grounds',
            'guest_count' => $validated['guest_count'] ?? null,
            'budget_range' => isset($validated['budget_range']) ? strip_tags($validated['budget_range']) : 'Custom Proposal',
            'requirements' => isset($validated['requirements']) ? strip_tags($validated['requirements']) : null,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your private event inquiry has been logged. Our Private Event Director will prepare a customized proposal.',
            'reference_id' => 'AUR-EVT-' . str_pad($inquiry->id, 5, '0', STR_PAD_LEFT),
        ], 201);
    }

    /**
     * Submit Newsletter
     */
    public function submitNewsletter(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:150',
        ]);

        // Could store in contact_inquiries or dedicated table
        ContactInquiry::firstOrCreate(
            ['email' => $validated['email'], 'subject' => 'Newsletter Subscription'],
            [
                'name' => 'Newsletter Subscriber',
                'message' => 'Subscriber joined Aurelia Private Dispatch newsletter list.',
                'status' => 'new',
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Welcome to the Aurelia Private Dispatch. You will receive our seasonal reflections.',
        ]);
    }
}
