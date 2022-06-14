@extends('layouts.master')

@section('content')


<div class="container-fluid">
	
	<div class="row">
	<div class="col-lg-12">
			<button class="btn btn-success float-right btn-sm" id="new_user"></button>
	</div>
	</div>
	<br>
	<div class="row">
		<div class="card col-lg-12">
			<div class="card-body">
				<table class="table-striped table-bordered w-100">
			<thead>
				<tr>
					<th class="text-center">#</th>
					<th class="text-center">Name</th>
					<th class="text-center">Email</th>
					<th class="text-center">Type</th>
					<th class="text-center">Action</th>
				</tr>
			</thead>
			
@foreach($users as $u)
			<tbody class="w-100">
				
				 <tr>
				 	<td class="text-center">
				 		{{$u->id}}
				 	</td>
				 	<td>
				 		{{$u->name}}
				 	</td>
				 	
				 	<td>
				 		{{$u->email}}
				 	</td>
				 	<td>
				 		{{$u->type}}
				 	</td>
			
				 </tr>
				
			</tbody>
			@endforeach

		</table>
			</div>
		</div>
	</div>

<h3 class=" my-4 mr-5 text-center">Add User </h3>


<div class="container w-50 m-auto">
	<form method="POST" action="{{ route('adduser') }}">
                        @csrf

<div class="form-group "><label class="d-inline small text-dark mb-1" for="inputEmailAddress">Name</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="name" name="name" placeholder="" id="inputEmailAddress" 
                                            value="" autocomplete="email" autofocus  /></div>                                                                                                 
                                            <div class=" @error('password') is-invalid @enderror form-group"><label class=" ml-4 d-inline text-dark small mb-1" for="inputPassword">Email</label> 
                                            
                                            <input class=" d-inline w-50 form-control ml-4 my-2 px-2" name="email" id="inputPassword" type="email" placeholder=""
                                            value=""            /></div>

                                            <div class=" @error('password') is-invalid @enderror form-group"><label class=" d-inline text-dark small mb-1" for="inputPassword">Password</label>
                                            
                                            <input class=" d-inline w-50 form-control ml-4 my-2 px-2" name="password" id="inputPassword" type="password" placeholder=""
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
<script>
	$('table').dataTable();
$('#new_user').click(function(){
	uni_modal('New User','manage_user.php')
})
$('.edit_user').click(function(){
	uni_modal('Edit User','manage_user.php?id='+$(this).attr('data-id'))
})
$('.delete_user').click(function(){
		_conf("Are you sure to delete this user?","delete_user",[$(this).attr('data-id')])
	})
	function delete_user($id){
		start_load()
		$.ajax({
			url:'ajax.php?action=delete_user',
			method:'POST',
			data:{id:$id},
			success:function(resp){
				if(resp==1){
					alert_toast("Data successfully deleted",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
			}
		})
	}
</script>


@endsection