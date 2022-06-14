@extends('layouts.master')

@section('content')

<div class="container-fluid">
	
	<div class="col-lg-12">
		<div class="row">
			<!-- FORM Panel -->
			<div class="col-md-4">
			<form action="{{ route('addtrain') }}" method="post" > @csrf
				<div class="card">
					<div class="card-header">
						    Trainer Form
				  	</div>
					<div class="card-body">
							<input type="hidden" name="id">
							<div class="form-group">
								<label class="control-label">Name</label>
								<input type="text" class="form-control" name="name">
							</div>
							<div class="form-group">
								<label class="control-label">Email</label>
								<input type="email" class="form-control" name="email">
							</div>
							<div class="form-group">
								<label class="control-label">Contact</label>
								<input type="text" class="form-control" name="contact">
							</div>
							<div class="form-group">
								<label class="control-label">Rate</label>
								<input type="number" class="form-control" name="rate">
							</div>
					</div>
							
					<div class="card-footer">
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-md btn-success col-sm-3 offset-md-3"> Save</button>
								<button class="btn btn-md btn-secondary col-sm-3" type="button" onclick="_reset()"> Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			</div>
			<!-- FORM Panel -->

			<!-- Table Panel -->
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<b>List of Trainers</b>
					</div>
					<div class="card-body">
						

						 
						  <table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th class="text-center">Name</th>
									<th class="text-center">Information</th>
									<th class="text-center">Action</th>
								</tr>
							</thead>
							
							 @foreach($trainers as $t)
							 <tbody>
								
								<tr>
									<td class="text-center">{{$t->name}}</td>
									<td class="">
										<p><i class="fa fa-user"></i> <b>Contact: {{$t->contact}}</b></p>
										<p><small><i class="fa fa-at"></i> <b>Email: {{$t->email}}</b></small></p>
										<p><small><i class="fa fa-phone-square-alt"></i> <b>Rate:{{$t->rate}}</b></small></p>
										
										
									</td>
									<td class="text-center">
										<a  data-toggle="modal" data-target="#currency{{$t->id}}" class="currency_link d-inline dropdown mb-2 text-mute btn btn-info">Edit</a>
										<a href="{{route('deltrain',$t->id)}}" class="btn btn-md btn-outline-danger delete_plan" type="button" data-id="">Delete</a>
									</td>
								</tr>
								
							</tbody>



{{-- Modal --}} @php $row=DB::table('trainers')->where('id',$t->id)->get(); @endphp 
  
  <div  class="modal fade" id="currency{{$t->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    
    
      <div class="modal-body">
     @foreach ($row as $r)  
    	<form action="{{ route('edittrain') }}" method="post" > @csrf
				<div class="card">
					<div class="card-header">
						    Trainer Form
				  	</div>
					<div class="card-body">
							<input type="hidden" name="id" name="id" value="{{$t->id}}">
							<div class="form-group">
								<label class="control-label">Name</label>
								<input type="text" class="form-control"  value="{{$t->name}}" name="name">
							</div>
							<div class="form-group">
								<label class="control-label">Email</label>
								<input type="email" class="form-control" value="{{$t->email}}" name="email">
							</div>
							<div class="form-group">
								<label class="control-label">Contact</label>
								<input type="text" class="form-control" value="{{$t->contact}}" name="contact">
							</div>
							<div class="form-group">
								<label class="control-label">Rate</label>
								<input type="number" class="form-control" value="{{$t->rate}}" name="rate">
							</div>
					</div>
							
					<div class="card-footer">
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-md btn-success col-sm-3 offset-md-3"> Save</button>
								<button class="btn btn-md btn-secondary col-sm-3" type="button" onclick="_reset()"> Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>
  @endforeach

    
      </div>
    
    
      <div class="modal-footer">
       
      </div>
    </div>
  </div>
</div>
  {{-- Modal --}}



							  @endforeach
						</table>
					</div>
				</div>
			</div>
			<!-- Table Panel -->
		</div>
	</div>	

</div>
<style>
	
	td{
		vertical-align: middle !important;
	}
	td p{
		margin:unset;
	}
</style>
<script>
	function _reset(){
		$('#manage-trainer').get(0).reset()
		$('#manage-trainer input,#manage-trainer textarea').val('')
	}
	$('#manage-trainer').submit(function(e){
		e.preventDefault()
		start_load()
		$.ajax({
			url:'ajax.php?action=save_trainer',
			data: new FormData($(this)[0]),
		    cache: false,
		    contentType: false,
		    processData: false,
		    method: 'POST',
		    type: 'POST',
			success:function(resp){
				if(resp==1){
					alert_toast("Data successfully added",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
				else if(resp==2){
					alert_toast("Data successfully updated",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
			}
		})
	})
	$('.edit_trainer').click(function(){
		start_load()
		var cat = $('#manage-trainer')
		cat.get(0).reset()
		cat.find("[name='id']").val($(this).attr('data-id'))
		cat.find("[name='name']").val($(this).attr('data-name'))
		cat.find("[name='email']").val($(this).attr('data-email'))
		cat.find("[name='contact']").val($(this).attr('data-contact'))
		cat.find("[name='rate']").val($(this).attr('data-rate'))
		end_load()
	})
	$('.delete_trainer').click(function(){
		_conf("Are you sure to delete this trainer?","delete_trainer",[$(this).attr('data-id')])
	})
	function delete_trainer($id){
		start_load()
		$.ajax({
			url:'ajax.php?action=delete_trainer',
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
	$('table').dataTable()
</script>


@endsection