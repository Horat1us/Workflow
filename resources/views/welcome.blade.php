<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Workflow</title>
    <link href="/css/app.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="app"></div>
<script type="application/javascript" src="/js/app.js?<?= filemtime(public_path('js'.DIRECTORY_SEPARATOR.'app.js')) ?>"></script>
</body>
</html>
