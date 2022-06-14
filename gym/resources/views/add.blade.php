@extends('layouts.master')

@section('content')
  <div class="row">
    <div class="col-xl-12">
      <div class="breadcrumb-holder">
        <h1 class="main-title float-left">{{ __('admin.admin') }}</h1>
        <ol class="breadcrumb float-right">
            <li class="breadcrumb-item"><a href="{{ route('admin.home') }}">{{ __('admin.dashboard') }}</a></li>
            <li class="breadcrumb-item active">{{ __('admin.admin') }}</li>
        </ol>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

  <div class="row">

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="card mb-3">
        <div class="card-header">
          <h3><i class="fa fa-table"></i> {{ __('admin.admin') }} {{ __('admin.information') }}</h3>
        </div>

        <div class="card-body">
          <form class="" action="{!! route('admin.admin.store') !!}" method="post">
            @csrf
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="name">{{ __('admin.name') }} <span class="text-danger">*</span></label>
                <input type="text" name="name" id="name" class="form-control" placeholder="{{ __('admin.name') }}" value="{{ old('name') }}" required>
                @if($errors->has('name'))
                  <div class="alert alert-danger">{{ $errors->first('name') }}</div>
                @endif
              </div>

              <div class="form-group col-md-4">
                <label for="email">{{ __('admin.email') }} <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="email" name="email" placeholder="{{ __('admin.email') }}" value="{{ old('email') }}" required>
                @if($errors->has('email'))
                  <div class="alert alert-danger">{{ $errors->first('email') }}</div>
                @endif
              </div>

              <div class="form-group col-md-4">
                <label for="username">{{ __('admin.username') }} <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="username" name="username" placeholder="{{ __('admin.username') }}" value="{{ old('username') }}" required>
                @if($errors->has('username'))
                  <div class="alert alert-danger">{{ $errors->first('username') }}</div>
                @endif
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="phone">{{ __('admin.phone') }} <span class="text-danger">*</span></label>
                <input type="text" name="phone" id="phone" class="form-control" placeholder="{{ __('admin.phone') }}" value="{{ old('phone') }}" required>
                @if($errors->has('phone'))
                  <div class="alert alert-danger">{{ $errors->first('phone') }}</div>
                @endif
              </div>

              <div class="form-group col-md-4">
                <label for="admin_role">{{ __('admin.type') }} <span class="text-danger">*</span></label>
                <select name="admin_role" id="admin_role" class="form-control" required>
                  <option value="" disabled>-- {{ __('admin.select') }} {{ __('admin.account') }} {{ __('admin.type') }} --</option>
                  <option value="1" {{ (old('admin_role') == 1 ? 'selected="selected"' : '') }}>{{ __('admin.super_admin') }}</option>
                  <option value="2" {{ (old('admin_role') == 2 ? 'selected="selected"' : '') }}>{{ __('admin.admin') }}</option>
                  <option value="3" {{ (old('admin_role') == 3 ? 'selected="selected"' : '') }}>{{ __('admin.user') }}</option>
                </select>
                @if($errors->has('admin_role'))
                  <div class="alert alert-danger">{{ $errors->first('admin_role') }}</div>
                @endif
              </div>

              <div class="form-group col-md-4">
                <label for="password">{{ __('admin.password') }} <span class="text-danger">*</span></label>
                <input type="password" name="password" id="password" class="form-control" placeholder="{{ __('admin.password') }}" required>
                @if($errors->has('password'))
                  <div class="alert alert-danger">{{ $errors->first('password') }}</div>
                @endif
              </div>
            </div>

            <button type="submit" class="btn btn-success btn-lg float-right">{{ __('admin.save') }}</button>
          </form>
        </div>
      </div><!-- end card-->
    </div>

  </div>

@endsection
