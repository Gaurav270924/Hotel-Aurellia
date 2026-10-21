<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Service;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\ContactInquiry;
use App\Models\EventInquiry;
use App\Models\SiteSetting;

class AdminController extends Controller
{
    /**
     * Admin Login
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials provided.',
            ], 401);
        }

        if (!$user->is_admin) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied: Administrative privileges required.',
            ], 403);
        }

        // Create Sanctum Token
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Authentication successful.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ],
        ]);
    }

    /**
     * Current authenticated admin info
     */
    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ],
        ]);
    }

    /**
     * Admin Logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Dashboard Overview Stats
     */
    public function getStats()
    {
        return response()->json([
            'success' => true,
            'stats' => [
                'total_contact_inquiries' => ContactInquiry::count(),
                'new_contact_inquiries' => ContactInquiry::where('status', 'new')->count(),
                'total_event_inquiries' => EventInquiry::count(),
                'pending_event_inquiries' => EventInquiry::where('status', 'pending')->count(),
                'total_services' => Service::count(),
                'total_events' => Event::count(),
                'total_gallery_items' => GalleryItem::count(),
            ],
        ]);
    }

    // ==========================================
    // CONTACT INQUIRIES
    // ==========================================
    public function getContactInquiries(Request $request)
    {
        $query = ContactInquiry::orderBy('created_at', 'desc');

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('subject', 'like', "%{$s}%");
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(20),
        ]);
    }

    public function updateContactStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string|in:new,read,replied,archived']);
        $inquiry = ContactInquiry::findOrFail($id);
        $inquiry->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Inquiry status updated.',
            'data' => $inquiry,
        ]);
    }

    public function deleteContactInquiry($id)
    {
        $inquiry = ContactInquiry::findOrFail($id);
        $inquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Inquiry removed successfully.',
        ]);
    }

    // ==========================================
    // EVENT INQUIRIES
    // ==========================================
    public function getEventInquiries(Request $request)
    {
        $query = EventInquiry::orderBy('created_at', 'desc');

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('event_type', 'like', "%{$s}%");
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(20),
        ]);
    }

    public function updateEventInquiryStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string|in:pending,reviewing,confirmed,declined']);
        $inquiry = EventInquiry::findOrFail($id);
        $inquiry->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Event inquiry status updated.',
            'data' => $inquiry,
        ]);
    }

    public function deleteEventInquiry($id)
    {
        $inquiry = EventInquiry::findOrFail($id);
        $inquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event inquiry removed successfully.',
        ]);
    }

    // ==========================================
    // SERVICES MANAGEMENT
    // ==========================================
    public function getServices()
    {
        return response()->json([
            'success' => true,
            'data' => Service::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'subtitle' => 'nullable|string|max:150',
            'short_description' => 'required|string',
            'full_description' => 'nullable|string',
            'image_url' => 'required|url',
            'category' => 'required|string',
            'price_indicative' => 'nullable|string',
            'features' => 'nullable|array',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(4);
        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully.',
            'data' => $service,
        ], 201);
    }

    public function updateService(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:150',
            'subtitle' => 'nullable|string|max:150',
            'short_description' => 'sometimes|required|string',
            'full_description' => 'nullable|string',
            'image_url' => 'sometimes|required|url',
            'category' => 'sometimes|required|string',
            'price_indicative' => 'nullable|string',
            'features' => 'nullable|array',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully.',
            'data' => $service,
        ]);
    }

    public function deleteService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully.',
        ]);
    }

    // ==========================================
    // EVENTS MANAGEMENT
    // ==========================================
    public function getEvents()
    {
        return response()->json([
            'success' => true,
            'data' => Event::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    public function storeEvent(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'full_details' => 'nullable|string',
            'event_type' => 'required|string',
            'capacity' => 'nullable|string',
            'venue_area' => 'nullable|string',
            'cover_image' => 'required|url',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(4);
        $event = Event::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event added successfully.',
            'data' => $event,
        ], 201);
    }

    public function updateEvent(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:150',
            'description' => 'sometimes|required|string',
            'full_details' => 'nullable|string',
            'event_type' => 'sometimes|required|string',
            'capacity' => 'nullable|string',
            'venue_area' => 'nullable|string',
            'cover_image' => 'sometimes|required|url',
            'status' => 'sometimes|required|string',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $event->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event updated successfully.',
            'data' => $event,
        ]);
    }

    public function deleteEvent($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully.',
        ]);
    }

    // ==========================================
    // GALLERY MANAGEMENT
    // ==========================================
    public function getGallery()
    {
        return response()->json([
            'success' => true,
            'data' => GalleryItem::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    public function storeGallery(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'media_url' => 'required|url',
            'media_type' => 'required|string|in:image,video',
            'category' => 'required|string',
            'alt_text' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $item = GalleryItem::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Gallery item added.',
            'data' => $item,
        ], 201);
    }

    public function updateGallery(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:150',
            'description' => 'nullable|string',
            'media_url' => 'sometimes|required|url',
            'media_type' => 'sometimes|required|string|in:image,video',
            'category' => 'sometimes|required|string',
            'alt_text' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $item->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Gallery item updated.',
            'data' => $item,
        ]);
    }

    public function deleteGallery($id)
    {
        $item = GalleryItem::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item deleted.',
        ]);
    }

    // ==========================================
    // SETTINGS
    // ==========================================
    public function getSettings()
    {
        return response()->json([
            'success' => true,
            'data' => SiteSetting::all(),
        ]);
    }

    public function updateSettings(Request $request)
    {
        $settings = $request->input('settings', []);

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['setting_key' => $key],
                ['setting_value' => $value]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully.',
        ]);
    }
}
