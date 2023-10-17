import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  examenId:any;
  preguntas:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  esEnviado = false;

  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService
  ){}


  ngOnInit(): void {
    this.prevenirBotonRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    
    this.preguntaService.listarPreguntasDelExamenParaEvaluar(this.examenId).subscribe({
      next: (data:any) =>{
        console.log(data);
        this.preguntas=data;
        this.timer = (this.preguntas.length * 2)*60;
        this.preguntas.forEach((p:any) => {
          p['respuestaDada'] = '';
          
        });
        this.iniciarTemporizador();
        console.log(this.preguntas);
      },
      error: (error) => {
        Swal.fire("Error","Error al cargar las preguntas de la prueba","error");
      },
      complete: () => console.log("Usuario: obtener preguntas de examen compelto")
    });
  }

  
  iniciarTemporizador(){
    let t = window.setInterval(()=>{
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }
  
  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60
    return `${mm} min : ${ss} seg`;
  }
  
  evaluarExamen(){

    this.preguntaService.evaluarExamen(this.preguntas).subscribe({
      next:(data:any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.esEnviado = true;
      },
      error:(error) => {
        console.log(error);
      },
      complete:() => console.log("evaluar examen desde el back completado")
    });

    // this.esEnviado = true;
    // this.preguntas.forEach((p:any)=>{
    //   if(p.respuestaDada == p.respuesta){
    //     this.respuestasCorrectas++;
    //     let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
    //     this.puntosConseguidos += puntos;
    //   }

    //   if(p.respuestaDada.trim() != ''){
    //     this.intentos++;
    //   }
    // })
    // console.log("Respuestas correctas: "+ this.respuestasCorrectas);
    // console.log("Puntos conseguidos: "+ this.puntosConseguidos);
    // console.log("Intentos: "+this.intentos);
    // console.log(this.preguntas);
  }

  enviarCuestionario(){
    Swal.fire({
      title:"Enviar examen",
      text:"¿Estas seguro de querer enviar el examen a calificación?",
      icon:"info",
      showCancelButton:true,
      confirmButtonColor:'#3085D6',
      cancelButtonColor:'#D33',
      confirmButtonText:"Enviar",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if(result.isConfirmed){
        this.evaluarExamen();
      }
    });
  }

  prevenirBotonRetroceso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href);
    })
  }

  imprimirPagina(){
    window.print();
  }

}
