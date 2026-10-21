<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AURELIA | Luxury Sanctuary & Boutique Hotel</title>
    <meta name="description" content="Stay somewhere extraordinary. Aurelia is a boutique luxury sanctuary offering curated comfort, Michelin-inspired dining, and holistic wellness.">

    <!-- Premium Fonts: Cormorant Garamond (Serif) & Plus Jakarta Sans (Sans-serif) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Favicon / Meta theme -->
    <meta name="theme-color" content="#0d0d0d">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-[#0c0d0e] text-[#e8e4de] antialiased selection:bg-[#c5a880] selection:text-[#0c0d0e]">
    <div id="root"></div>
</body>
</html>
