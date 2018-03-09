<!DOCTYPE html>
<html>
<head>
	<title>@yield('title')</title>
</head>
<body>
	<app clvr-id="app-container">
		@yield('content')
	</app>
	<script type="text/javascript" src="{{asset('user/js/clever.js')}}"></script>
	<script type="text/javascript">
		var clever = new Clever();
	</script>
</body>
</html>