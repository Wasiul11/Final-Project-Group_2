@extends('layouts.master')

@section('content')
  <div class="row">
    
<h3 style="display: block; margin-right: 100px;" class="text-center" > Add a member </h3> <br> <br>





<div class="container w-50 m-auto">
  <form method="POST" action="{{ route('add_members') }}">
                        @csrf

<div class="form-group ">

  <label class="d-inline small text-dark mb-1 ml-1" for="inputEmailAddress">Name</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="name" name="name" id="inputEmailAddress" 
                                           autocomplete="email" autofocus  /></div>   

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">member_id</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-4 px-2 my-2" type="number" name="member_id" id="inputEmailAddress" 
                                             autocomplete="email" autofocus  /></div>    

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">plan_id</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="number" name="plan_id"  id="inputEmailAddress" 
                                           autocomplete="email" autofocus  /></div>    

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">Address</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="text" name="address"  id="inputEmailAddress" 
                                            autocomplete="email" autofocus  /></div>    

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">Gender</label>
                                            
                                           <select class="ml-5" name="gender">
                                             <option value="male">Male</option>
                                             <option value="female">Female</option>

                                           </select>
                                           </div>    

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">Contact</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="number" name="contact"  id="inputEmailAddress" 
                                            autocomplete="email" autofocus  /></div>                                                                                                  


                                            <div class=" @error('password') is-invalid @enderror form-group"><label class=" ml-2 d-inline text-dark small mb-1" for="inputPassword">Email</label> 
                                            
                                            <input class=" ml-5 d-inline w-50 form-control ml-4 my-2 px-2" name="email" id="inputPassword" type="email" placeholder="Enter Email"
                                            value=""            /></div>

                                          

                                          @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                           @enderror

                  
                                            <div class="form-group d-flex align-items-center justify-content-between mt-5 mb-0">
                                            @if (Route::has('forgetPass')) 
                                            <a href="{{ route('password.request') }}" class="text">Forgot password ?</a> @endif
                                            
                                            <input style="margin-left: 100px;background: aliceblue;border-radius: 20px; " type="submit"class=" w-25 btn btn-info text-dark d-block font-weight-bold " href="" name="add" value="Add" /></div>
                    </form>

                </div>



  </div>

@endsection

@section('scripts')
  <script>
  $(document).ready(function() {
    $('#table').DataTable();
  } );
  </script>
@endsection
