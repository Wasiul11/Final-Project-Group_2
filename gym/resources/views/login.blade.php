


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Log In - GYM</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <link href="admin.css" rel="stylesheet" type="text/css" media="all"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    
    

    
    
    
    
    
        <body class=""> <h4 class="text-center m-auto" >
                                                    @if(session()->has('reset'))
                                                   {{Session::get('reset')}}
                                                    @endif </h4>
    
    
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }} - GYM Management System</div>

                <div class="card-body text-center ">
                    <form method="POST" action="{{ route('adminLogin') }}">
                        @csrf

<div class="form-group "><label class="d-inline small text-dark mb-1" for="inputEmailAddress">Email</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="email" name="email" placeholder="Enter your email" id="inputEmailAddress" 
                                            value="{{ old('email') }}" autocomplete="email" autofocus  /></div>
                                            
                                       

                                                                                        
                                                                                        
                                            <div class=" @error('password') is-invalid @enderror form-group"><label class=" d-inline text-dark small mb-1" for="inputPassword">Password</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-4 my-2 px-2" name="password" id="inputPassword" type="password" placeholder="Enter password"
                                            value=""            /></div>
                                            

                                          

                                          @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                           @enderror

                                       
                                            <div class="form-group d-flex align-items-center justify-content-between mt-5 mb-0">
                                            @if (Route::has('forgetPass')) 
                                            <a href="{{ route('password.request') }}" class="text">Forgot password ?</a> @endif
                                            
                                            <input style="margin-left: 210px; background: aliceblue;border-radius: 20px; " type="submit"class=" -4 w-50 btn btn-info text-dark d-block font-weight-bold " href="" name="Login" value="Login" /></div>
                    </form>




  


                </div>
            </div>
        </div>
    </div>
</div>


       <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    
    </body>
</html>