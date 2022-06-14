
@if(Session::get('user_id')==''))
@php
 header("Location: " . URL::to('/'), true, 302);
        exit(); @endphp   
@else 

@endif
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Fitness | Admin</title>
  <meta name="description" content="Demo | Demo Admin">
  <meta name="author" content="Demo Web Development - https://domain">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>

  @include('layouts.partials.styles')

  @yield('styles')
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>

</head>

<body class="adminbody">

  <div id="main" class="bg-light">

    <!-- top bar navigation -->
    @include('layouts.partials.nav')
    <!-- End Navigation -->


    <!-- Left Sidebar -->
      @include('layouts.partials.sidebar')
    <!-- End Sidebar -->


    <div class="content-page">

      <!-- Start content -->
      <div class="content">

        <div class="container-fluid">

          @section('content')
          @show


        </div>
        <!-- END container-fluid -->

      </div>
      <!-- END content -->

    </div>
    <!-- END content-page -->

  @include('layouts.partials.footer')

  </div>
  <!-- END main -->

  @include('layouts.partials.scripts')

  @yield('scripts')
  
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
     <script>

</body>
</html>
