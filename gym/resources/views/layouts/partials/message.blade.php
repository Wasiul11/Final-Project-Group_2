{{-- Noty -> Notification Style  --}}

{{-- @if ($errors->any())
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="alert alert-danger">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <ul>
          @foreach ($errors->all() as $error)
            <p>{{ $error }}</p>
          @endforeach
        </ul>
      </div>
    </div>
  </div>
@endif --}}

@if (Session::has('add_message'))
  <script>
    toastr.success("{{ Session::get('add_message') }}");
  </script>
@endif

@if (Session::has('update_message'))
  <script>
    toastr.success("{{ Session::get('update_message') }}");
  </script>
@endif

@if (Session::has('warning'))
  <script>
    toastr.warning("{{ Session::get('warning') }}");
  </script>
@endif

@if (Session::has('delete_message'))
  <script>
    toastr.error("{{ Session::get('delete_message') }}");
  </script>
@endif

@if (Session::has('sticky_error'))
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="alert alert-danger">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        {!! Session::get('sticky_error') !!}
      </div>
    </div>
  </div>
@endif

@if (Session::has('sticky_success'))
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="alert alert-success">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        {!! Session::get('sticky_success') !!}
      </div>
    </div>
  </div>
@endif
@if (Session::has('message'))
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="alert alert-info">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        {!! Session::get('message') !!}
      </div>
    </div>
  </div>
@endif

@if (Session::has('old_password'))
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="alert alert-danger">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        {!! Session::get('old_password') !!}
      </div>
    </div>
  </div>
@endif
