@extends('layouts.master')

@section('content')
  <div class="row">
    <div class="col-xl-12">
      <div class="breadcrumb-holder">
        <h1 class="main-title float-left">Admin</h1>
        <ol class="breadcrumb float-right">
            <li class="breadcrumb-item"><a href=""></a></li>
            <li class=""></li>
        </ol>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

  <div class="row">

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="card mb-3">
        <div class="card-header">
          <h3><i class="fa fa-table"></i> </h3>
          <a href="" class="btn btn-success btn-sm float-right"> </a>
        </div>

        <div class="card-body">
         
     <h3 class="text-center bg-light"> Welcome to Fitness Traiing Center Admin Panel</h3>
        </div>

      

      </div><!-- end card-->
    </div>

  </div>

    <div class="m-auto text-center"> 
    <img src="{!! asset('images/gym.png') !!}" alt="Profile image" class="">
     </div>

@endsection

@section('scripts')
  <script>
  $(document).ready(function() {
    $('#table').DataTable();
  } );
  </script>
@endsection
