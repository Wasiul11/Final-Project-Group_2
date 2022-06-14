<script src="{!! asset('public/admin/assets/js/modernizr.min.js') !!}"></script>
<script src="{!! asset('public/admin/assets/js/moment.min.js') !!}"></script>

<script src="{!! asset('public/admin/assets/js/popper.min.js') !!}"></script>
<script src="{!! asset('public/admin/assets/js/bootstrap.min.js') !!}"></script>

<script src="{!! asset('public/admin/assets/js/detect.js') !!}"></script>
<script src="{!! asset('public/admin/assets/js/fastclick.js') !!}"></script>
<script src="{!! asset('public/admin/assets/js/jquery.blockUI.js') !!}"></script>
<script src="{!! asset('public/admin/assets/js/jquery.nicescroll.js') !!}"></script>

<!-- App js -->
<script src="{!! asset('public/admin/assets/js/pikeadmin.js') !!}"></script>

<!-- BEGIN Java Script for this page -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>

<!-- Counter-Up-->
<script src="{!! asset('public/admin/assets/plugins/waypoints/lib/jquery.waypoints.min.js') !!}"></script>
<script src="{!! asset('public/admin/assets/plugins/counterup/jquery.counterup.min.js') !!}"></script>

<!-- FOR CKEDITOR -->
<script src="{!! asset('public/admin/assets/plugins/ckeditor-5/ckeditor.js') !!}"></script>
<script src="{!! asset('public/admin/assets/plugins/ckfinder/ckfinder.js') !!}"></script>

<!-- CUSTOM JS -->
<script src="{!! asset('public/admin/assets/js/custom.js') !!}"></script>


{{-- For Datatable --}}
<script>
  $(document).ready(function() {
    var table = $('#datatable').DataTable( {
      // "scrollY": "350px",
      "paging": true,
      "pageLength": 50,
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    } );

    $('a.toggle-vis').on( 'click', function (e) {
      e.preventDefault();

        // Get the column API object
        var column = table.column( $(this).attr('data-column') );

        // Toggle the visibility
        column.visible( ! column.visible() );
      } );
  } );
</script>