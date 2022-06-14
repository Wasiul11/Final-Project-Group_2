<!-- Favicon -->
<link href="{!! asset('public/images/favicon.png') !!}" rel="icon">

<!-- Bootstrap CSS -->
<link href="{!! asset('public/admin/assets/css/bootstrap.min.css') !!}" rel="stylesheet" type="text/css" />

<!-- Font Awesome CSS -->
<link href="{!! asset('public/admin/assets/font-awesome/css/font-awesome.min.css') !!}" rel="stylesheet" type="text/css" />

<!-- Custom CSS -->
<link href="{!! asset('public/admin/assets/css/style.css') !!}" rel="stylesheet" type="text/css" />

<!-- BEGIN CSS for this page -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css"/>
{{-- <link rel="stylesheet" href="{{asset('public/css/noty.css')}}"> --}}

<link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
<script src="{!! asset('public/admin/assets/js/jquery.min.js') !!}"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

{{-- Custom CSS --}}
<link href="{!! asset('public/admin/assets/css/custom.css') !!}" rel="stylesheet" type="text/css" />

<script type="text/javascript">
	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": true,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
</script>
