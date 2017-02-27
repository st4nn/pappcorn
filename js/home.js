function funcion_Inicio()
{
    $('#tblHome_Tabla1').footable();

    alimentarTablar1();

    $("#btnHome_AddUser").click(function(event) 
    {
        event.preventDefault();
        $("#cntHome_Crear").modal("show");
        $("#lblHome_Crear_Titulo").text("Agregar");
        $("#frmHome_Crear")[0].reset();
        $("#txtHome_Crear_id").val("");
        $('#txtHome_Crear_Deportes').selectpicker("refresh");
        $("#txtHome_Crear_Pais").trigger('change');

        var tFecha = obtenerFecha().substring(0, 10);
        
        $("#txtHome_Crear_Fecha").val(tFecha);
        $("#cntHome_Crear_Fecha").datepicker('update', tFecha);
    });

    $("#txtHome_Crear_Pais").on('change', function()
    {
      $("#imgHome_Crear_Pais").attr("src", 'images/flags/' + $(this).val() + '.png');
    });

    $("#cntHome_Crear_Fecha").datepicker();

    $("#cntHome_Crear_Fecha").on("changeDate", function(event) {
        $("#txtHome_Crear_Fecha").val(
            $("#cntHome_Crear_Fecha").datepicker('getFormattedDate')
        );
    });


    $("#btnHome_Crear_AgregarDeporte").on("click", function(evento)
    {
        evento.preventDefault();            
        $("#cntHome_Crear_AgregarDeporte").modal("show");
    });

    $(".selectpicker").selectpicker({
      style: 'btn-default',
      size: 4
    });

    $("#frmHome_CrearDeporte").on("submit", function(evento)
    {
        evento.preventDefault();
        if ($("#txtHome_CrearDeporte_Nombre").val() != "")
        {
            crearDeporte($("#txtHome_CrearDeporte_Nombre").val(), function(idDeporte)
            {
                $("#txtHome_Crear_Deportes").append('<option val="' + idDeporte + '">' + $("#txtHome_CrearDeporte_Nombre").val() + '</option>');
                $('#txtHome_Crear_Deportes').selectpicker("refresh");
                $("#cntHome_Crear_AgregarDeporte").modal("hide");
            });
        } else
        {
            swal("Hey!", "Debes ponerle algún nombre al Deporte.", "error");
        }
    });

    $(document).delegate('.btnHome_Tabla1_Editar', 'click', function(event) 
    {
        event.preventDefault();
        var objFila = $(this).parent("td").parent("tr").find("td");
        $("#cntHome_Crear").modal("show");
        $("#lblHome_Crear_Titulo").text("Editar");
        
        $("#txtHome_Crear_id").val($(objFila[0]).text());
        $("#txtHome_Crear_Pais").val($(objFila[2]).attr("idPais"));
        $("#txtHome_Crear_Pais").trigger('change');

        var idDeportes = $(objFila[4]).attr("idDeportes");
        if (idDeportes != "")
        {
            idDeportes = idDeportes.split(",");
            $.each(idDeportes, function(index, val) 
            {
                $("#txtHome_Crear_Deportes").find("option[value=" + val +"]").prop("selected", "selected");
            });
        }
        $('#txtHome_Crear_Deportes').selectpicker("refresh");

        $("#txtHome_Crear_Fecha").val($(objFila[5]).attr("Fecha"));
        $("#cntHome_Crear_Fecha").datepicker("update", $(objFila[4]).attr("Fecha"));

        $("#txtHome_Crear_Nombre").val($(objFila[3]).text());
    });


    $(document).delegate('.btnHome_Tabla1_Borrar', 'click', function(event) 
    {
    	var obj = this;
        swal({
                title: "¿Estas seguro?",
                text: "No podrás recuperar éste registro despues!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sí, borralo!",
                cancelButtonText: "No, espera plx!",
                closeOnConfirm: false,
                closeOnCancel: true },
            function (isConfirm) {
                if (isConfirm) 
                {
                    var objFila = $(obj).parent("td").parent("tr").find("td");
                    borrarUsuario($(objFila[0]).text(), function()
                	{
                		console.log(obj);
                		$(obj).parent("td").parent("tr").remove();
                	});
                    swal("Borrado!", "El registro ha sido borrado.", "success");
                } 
            });
    });

    $("#frmHome_Crear").on("submit", function(evento)
    {
        evento.preventDefault();
        if ($("#txtHome_Crear_id").val() == "")
        {
        	$("#txtHome_Crear_id").val("null");	
        }

        $("#frmHome_Crear").generarDatosEnvio("txtHome_Crear_", function(datos)
        {
            crearUsuario(datos, function(nuevoId)
            {
            	$("#txtHome_Crear_id").val(nuevoId);

                /*var tds = "<tr>";
                tds += '<td>' + nuevoId + '</td>';
                tds += '<td idPais="' + datos.Pais + '"><img src="images/flags/' + datos.Pais + '.png">' + $("#txtHome_Crear_Pais option:selected").text() + '</td>';
                tds += '<td>' + datos.Nombre + '</td>';
                tds += '<td idDeportes="' + datos.Deportes + '"></td>';
                tds += '<td Fecha="' + datos.Fecha + '">' + calcularEdad(datos.Fecha).anios + '</td>';
                tds += '<td>';
                    tds += '<button class="btn btn-xs btn-danger btn-circle btnHome_Tabla1_Borrar" type="button"></button>';
                tds += '</td>';
                tds += '<td>';
                    tds += '<button class="btn btn-xs btn-success btn-circle btnHome_Tabla1_Editar" type="button"></button>';
                tds += '</td></tr>';
                $("#tblHome_Tabla1 tbody").append(tds);*/
                alimentarTablar1();
                $("#cntHome_Crear").modal("hide");
            });
        });
    });
}

function alimentarTablar1()
{
    cargarUsuarios(function(Usuarios)
    {
        $('#tblHome_Tabla1 tbody tr').remove();
        if (Usuarios.length > 0)
        {
            var tds = "";
            $.each(Usuarios, function(index, val) 
            {
                tds += '<tr>';
                    tds += '<td>' + val.id + '</td>';
                    tds += '<td><img src="images/flags/' + val.idPais + '.png"></td>';
                    tds += '<td idPais="' + val.idPais + '">' + val.Pais + '</td>';
                    tds += '<td>' + val.Nombre + '</td>';
                    tds += '<td idDeportes="' + val.idDeportes + '">' + val.Deportes + '</td>';
                    tds += '<td Fecha="' + val.Fecha + '">' + parseInt(val.Edad) + '</td>';
                    tds += '<td>';
                        tds += '<button class="btn btn-xs btn-danger btn-circle btnHome_Tabla1_Borrar" type="button"></button>';
                    tds += '</td>';
                    tds += '<td>';
                        tds += '<button class="btn btn-xs btn-success btn-circle btnHome_Tabla1_Editar" type="button"></button>';
                    tds += '</td>'
                tds += '</tr>';
            });
            
            $("#tblHome_Tabla1 tbody").append(tds);
        }
    });
}