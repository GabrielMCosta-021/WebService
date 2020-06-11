// This is a JavasScript file

//ações de mudança de tela
$(document).on("click","#listar", function(){
  $(location).attr("href","listar.html");
});

// Ações de banco
$(document).on("click","#salvar",function(){
  var parametros = {
    "nome":$("#nome").val(),
    "senha":$("#senha").val(),
    "email":$("#email").val()
  }
    $.ajax({
        type:"post",//como vou enviar os dados
        url:"https://wordpress-online-2.000webhostapp.com/webservice/cadastra.php",//para onde
        data:parametros,//o que vou enviar
        //se der certo
        success: function(data){
          navigator.notification.alert(data);
          $("#nome").val(""),
          $("#senha").val(""),
          $("#email").val("")
        },
        //se der errado
        error: function(data){
          navigator.notification.alert("Erro no cadastro");
        }
    });
});

function listar(){
  $.ajax({
    type: "post",
    url: "https://wordpress-online-2.000webhostapp.com/webservice/listar.php",
    dataType: "json",//o que vou receber ou como vou receber
    success: function(data){
      var itemlista = "";
      $.each(data.pessoas, function(i,dados){
        itemlista += "<option value="+dados.codigo+">"+dados.nome+"</option>"
      });
      $("#listaPessoas").html(itemlista);
    },
      error: function(data){
          navigator.notification.alert("Erro ao busca registro");
      }  
  });
}

  $(document).on("change", "#listaPessoas",function(){
      var parametro = {
        "codigo": $("option:selected",("#listaPessoas")).val()
      }

    $.ajax({
    type: "post",
    url: "https://wordpress-online-2.000webhostapp.com/webservice/listar-um-registro.php",
    data: parametro,
    dataType: "json",//o que vou receber ou como vou receber
    success: function(data){
      $("#codigo").val(data.pessoa.codigo);
      $("#nome").val(data.pessoa.nome);
      $("#email").val(data.pessoa.email);
      $("#senha").val(data.pessoa.senha);
    },
      error: function(data){
          navigator.notification.alert("Erro ao busca registro");
      }  
    });
  });

  function habilitarCampos(){
      $("#nome").prop("readonly",false);
      $("#email").prop("readonly",false);
      $("#senha").prop("readonly",false);
  }

 function desabilitarCampos(){
      $("#nome").prop("readonly",true);
      $("#email").prop("readonly",true);
      $("#senha").prop("readonly",true);
  }

  $(document).on("click","#editar",function(){
      habilitarCampos();
  });
  
  $(document).on("click","#cancelar",function(){
      desabilitarCampos();
      });

  $(document).on("click","#salvarEdit",function(){
           var parametros = {
   "codigo":$("#codigo").val(),        
     "nome":$("#nome").val(),
    "senha":$("#senha").val(),
    "email":$("#email").val()
  }
    $.ajax({
        type:"post",//como vou enviar os dados
        url:"https://wordpress-online-2.000webhostapp.com/webservice/atualiza.php",//para onde
        data:parametros,//o que vou enviar
        //se der certo
        success: function(data){
          navigator.notification.alert(data);
          location.reload();
          desabilitarCampos();
        },
        //se der errado
        error: function(data){
          navigator.notification.alert("Erro no cadastro");
        }
    });
  });

   $(document).on("click","#excluir",function(){
           var parametros = {
   "codigo":$("#codigo").val(),        
     }
    $.ajax({
        type:"post",//como vou enviar os dados
        url:"https://wordpress-online-2.000webhostapp.com/webservice/delete.php",//para onde
        data:parametros,//o que vou enviar
        //se der certo
        success: function(data){
          navigator.notification.alert(data);
          location.reload();
          desabilitarCampos();
        },
        //se der errado
        error: function(data){
          navigator.notification.alert("Erro no cadastro");
        }
    });
  });